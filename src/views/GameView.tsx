import {GameState, ViewProps} from "../app.tsx";
import {Block} from "../components/block/Block.tsx";
import {PaginationDots} from "../components/pagination-dots/PaginationDots.tsx";
import {useState} from "preact/hooks";

const totalRounds = 3

export function GameView({setGameState}: ViewProps) {
    const [round, setRound] = useState<number>(1);

    const blocks = Array(9).fill(false)
    const faceIndex = Math.floor(Math.random() * blocks.length)
    blocks[faceIndex] = true

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
                {blocks.map(correct => (
                    <Block
                        correct={correct}
                        onClick={() => _onClick(correct)}
                    />
                ))}
            </div>
            <div className="pt-10">
                <PaginationDots total={totalRounds} filled={round}/>
            </div>
        </div>
    )
}