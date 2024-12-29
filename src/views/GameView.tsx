import {GameState, ViewProps} from "../app.tsx";
import {Block} from "../components/block/Block.tsx";
import {PaginationDots} from "../components/pagination-dots/PaginationDots.tsx";
import {useState} from "preact/hooks";
import {range, shuffle} from "../utils/math.ts";

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
    const normal = shuffle(range(0, 23)).slice(0, 8).map(ix => ({url: FACE_URLS.normal[ix], isSmiling: false}))
    const smile = {
        url: FACE_URLS.smiling[shuffle(range(0, 10))[0]],
        isSmiling: true
    }
    return shuffle([...normal, ...[smile]])
}

export function GameView({setGameState}: ViewProps) {
    const [round, setRound] = useState<number>(1);

    console.log(generateRound())

    const blocks = generateRound()

    const _onClick = (correct: boolean) => {
        if (correct) {
            if (round == totalRounds) {
                setGameState(GameState.FINISHED)
            } else {
                setRound(round + 1)
            }
        }
    }

    return (
        <div className="w-full h-[100vh] flex flex-col items-center justify-center bg-amber-100">
            <div className="grid grid-cols-3 gap-2">
                {blocks.map(({url, isSmiling}) => (
                    <Block
                        url={url}
                        correct={isSmiling}
                        onClick={() => _onClick(isSmiling)}
                    />
                ))}
            </div>
            <div className="pt-10">
                <PaginationDots total={totalRounds} filled={round}/>
            </div>
        </div>
    )
}