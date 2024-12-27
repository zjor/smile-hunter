import './app.css'
import {useState} from "preact/hooks";

enum GameState {
    NOT_STARTED,
    STARTED,
    FINISHED
}

interface BlockProps {
    isSmile: boolean
    onClick?: () => void
}

interface ViewProps {
    setGameState: (state: GameState) => void
}

function Block({isSmile, onClick}: BlockProps) {
    return (
        <div
            className="w-[96px] h-[96px] bg-amber-100 flex items-center justify-center rounded-2xl cursor-pointer"
            onClick={onClick}>
            {isSmile ? '\u{1F60A}' : '\u{2205}'}
        </div>
    )
}

function StartView({setGameState}: ViewProps) {
    return (
        <div>
            <button onClick={() => setGameState(GameState.STARTED)}>Start</button>
        </div>
    )
}

function GameView({setGameState}: ViewProps) {
    const blocks = Array(9).fill(false)
    const faceIndex = Math.floor(Math.random() * blocks.length)
    blocks[faceIndex] = true

    return (
        <div className="p-5 border-2 grid grid-cols-3 gap-2">
            {blocks.map(block => (
                <Block
                    isSmile={block}
                    onClick={() => block && setGameState(GameState.FINISHED)}
                />
            ))}
        </div>
    )
}

function ResultsView({setGameState}: ViewProps) {
    return (
        <div className="p-5 border-2 flex flex-col gap-2">
            <h2>Game Over!</h2>
            <button onClick={() => setGameState(GameState.NOT_STARTED)}>Play again</button>
        </div>
    )
}

export function App() {
    const [gameState, setGameState] = useState<GameState>(GameState.NOT_STARTED)

    const blocks = Array(9).fill(false)
    const faceIndex = Math.floor(Math.random() * blocks.length)
    blocks[faceIndex] = true

    return (
        <>
            {gameState == GameState.NOT_STARTED && <StartView setGameState={setGameState}/>}
            {gameState == GameState.STARTED && <GameView setGameState={setGameState}/>}
            {gameState == GameState.FINISHED && <ResultsView setGameState={setGameState}/>}
        </>
    )
}