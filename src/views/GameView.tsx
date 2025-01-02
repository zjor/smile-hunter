import {Block} from "../components/block/Block.tsx";
import {PaginationDots} from "../components/pagination-dots/PaginationDots.tsx";
import {useEffect, useState} from "preact/hooks";
import {range, shuffle} from "../utils/math.ts";
import {LoadingDialog} from "../components/loading-dialog/LoadingDialog.tsx";
import {useAtom} from "jotai";
import {ActiveView, activeViewAtom, gameStatsAtom} from "../state/state.ts";

const totalRounds = 5

function getFaceUrls(count: number, smiling: boolean): Array<string> {
    const urlPrefix = 'https://raw.githubusercontent.com/zjor/assets/refs/heads/master/smile-hunter/faces'
    const dir = smiling ? 'smiling' : 'normal'
    return Array.from({length: count}).map((_, i) => `${urlPrefix}/${dir}/${i + 1}.jpg`)
}

const NORMAL_FACES_COUNT = 153
const SMILING_FACES_COUNT = 26

const FACE_URLS = {
    normal: getFaceUrls(NORMAL_FACES_COUNT, false),
    smiling: getFaceUrls(SMILING_FACES_COUNT, true),
}

interface Face {
    url: string
    isSmiling: boolean
}

function generateRound(): Face[] {
    const normal = shuffle(range(0, NORMAL_FACES_COUNT)).slice(0, 8).map(ix => ({
        url: FACE_URLS.normal[ix],
        isSmiling: false
    }))
    const smile = {
        url: FACE_URLS.smiling[shuffle(range(0, SMILING_FACES_COUNT))[0]],
        isSmiling: true
    }
    return shuffle([...normal, ...[smile]]) as Face[]
}

function generateGame(rounds: number): Face[][] {
    return Array.from({length: rounds}).map(_ => generateRound());
}

export function GameView() {
    const [_, setActiveView] = useAtom(activeViewAtom)
    const [gameStats, setGameStats] = useAtom(gameStatsAtom)

    const [roundNumber, setRoundNumber] = useState<number>(1)
    const [loadingProgress, setLoadingProgress] = useState<number>(0)
    const [game, setGame] = useState({
        rounds: generateGame(totalRounds),
        loading: false
    });

    useEffect(() => {
        const fetchImages = async () => {
            setGame({...game, ...{loading: true}})
            const allFaces = game.rounds.flatMap(it => it)
            let loadedCount = 0
            const promises = allFaces.map(async (face: Face) => {
                const i = new Image()
                i.src = face.url
                try {
                    await i.decode()
                } catch (e) {
                    console.error(`Failed to decode image. URL: ${face.url}`, e)
                }
                loadedCount++
                setLoadingProgress(loadedCount / allFaces.length * 100)
            })
            await Promise.all(promises)
            setGame({...game, ...{loading: false}})
            setGameStats({
                totalFaces: allFaces.length,
                erroneousSmiles: 0,
                startTime: (new Date()).getTime(),
                endTime: 0
            })
        }
        fetchImages().catch(console.log)
    }, []);

    const _onClick = (correct: boolean) => {
        if (correct) {
            if (roundNumber == totalRounds) {
                setGameStats({...gameStats, ...{endTime: (new Date().getTime())}})
                setActiveView(ActiveView.RESULT_VIEW)
            } else {
                setRoundNumber(roundNumber + 1)
            }
        } else {
            setGameStats({...gameStats, ...{erroneousSmiles: gameStats.erroneousSmiles + 1}})
        }
    }

    return (
        <div className="w-full h-[100vh] flex flex-col items-center justify-center bg-amber-100">
            {game.loading && <LoadingDialog progress={loadingProgress}/>}
            <div className="grid grid-cols-3 gap-2">
                {game.rounds[roundNumber - 1].map(({url, isSmiling}) => (
                    <Block
                        url={game.loading ? undefined : url}
                        correct={isSmiling}
                        onClick={() => _onClick(isSmiling)}
                    />
                ))}
            </div>
            <div className="pt-10">
                <PaginationDots total={totalRounds} filled={roundNumber}/>
            </div>
        </div>
    )
}