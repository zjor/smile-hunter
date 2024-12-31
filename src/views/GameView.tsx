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

function generateRound() {
    const normal = shuffle(range(0, 23)).slice(0, 8).map(ix => ({url: FACE_URLS.normal[ix], isSmiling: false, loaded: false}))
    const smile = {
        url: FACE_URLS.smiling[shuffle(range(0, 10))[0]],
        isSmiling: true,
        loaded: false
    }
    return shuffle([...normal, ...[smile]])
}

export function GameView({setGameState}: ViewProps) {
    const [roundNumber, setRoundNumber] = useState<number>(1)
    const [loadingProgress, setLoadingProgress] = useState<number>(0)
    const [faces, setFaces] = useState({
        images: generateRound(),
        loading: true
    });

    useEffect(() => {
        const fetchImages = async () => {
            let loadedCount = 0
            const promises = faces.images.map(async (image) => {
                const i = new Image()
                i.src = image.url
                await i.decode()
                image.loaded = true
                loadedCount++
                setLoadingProgress(loadedCount / faces.images.length * 100)
            })
            await Promise.all(promises)
            setFaces({...faces, ...{loading: false}})
        }
        fetchImages().catch(console.log)
    }, [roundNumber]);

    const _onClick = (correct: boolean) => {
        if (correct) {
            if (roundNumber == totalRounds) {
                setGameState(GameState.FINISHED)
            } else {
                setFaces({
                    images: generateRound(),
                    loading: true
                })
                setRoundNumber(roundNumber + 1)
            }
        }
    }

    return (
        <div className="w-full h-[100vh] flex flex-col items-center justify-center bg-amber-100">
            {faces.loading && <LoadingDialog progress={loadingProgress}/>}
            <div className="grid grid-cols-3 gap-2">
                {faces.images.map(({url, isSmiling, loaded}) => (
                    <Block
                        url={loaded ? url : undefined}
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