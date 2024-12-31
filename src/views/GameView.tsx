import {GameState, ViewProps} from "../app.tsx";
import {Block} from "../components/block/Block.tsx";
import {PaginationDots} from "../components/pagination-dots/PaginationDots.tsx";
import {useEffect, useState} from "preact/hooks";
import {range, shuffle} from "../utils/math.ts";
import {LoadingDialog} from "../components/loading-dialog/LoadingDialog.tsx";

const totalRounds = 3


function getFaceUrls(count: number, smiling: boolean): Array<string> {
    const urlPrefix = 'https://raw.githubusercontent.com/zjor/assets/refs/heads/master/smile-hunter/faces'
    const dir = smiling ? 'smiling' : 'normal'
    return Array.from({length: count}).map((_, i) => `${urlPrefix}/${dir}/${i + 1}.jpg`)
}

const FACE_URLS = {
    normal: getFaceUrls(23, false),
    smiling: getFaceUrls(10, true),
}

interface Face {
    url: string
    isSmiling: boolean
}

function generateRound(): Face[] {
    const normal = shuffle(range(0, 23)).slice(0, 8).map(ix => ({
        url: FACE_URLS.normal[ix],
        isSmiling: false
    }))
    const smile = {
        url: FACE_URLS.smiling[shuffle(range(0, 10))[0]],
        isSmiling: true
    }
    return shuffle([...normal, ...[smile]]) as Face[]
}

function generateGame(rounds: number): Face[][] {
    return Array.from({length: rounds}).map(_ => generateRound());
}

export function GameView({setGameState}: ViewProps) {
    const [roundNumber, setRoundNumber] = useState<number>(1)
    const [loadingProgress, setLoadingProgress] = useState<number>(0)
    const [game, setGame] = useState({
        rounds: generateGame(3),
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
                await i.decode()
                loadedCount++
                setLoadingProgress(loadedCount / allFaces.length * 100)
            })
            await Promise.all(promises)
            setGame({...game, ...{loading: false}})
        }
        fetchImages().catch(console.log)
    }, []);

    const _onClick = (correct: boolean) => {
        if (correct) {
            if (roundNumber == totalRounds) {
                setGameState(GameState.FINISHED)
            } else {
                setRoundNumber(roundNumber + 1)
            }
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