import './app.css'
import {useState} from "preact/hooks";
import {StartView} from "./views/start-view/StartView.tsx";
import {GameView} from "./views/GameView.tsx";
import {ResultsView} from "./views/ResultsView.tsx";

export enum GameState {
    NOT_STARTED,
    STARTED,
    FINISHED
}

export interface ViewProps {
    setGameState: (state: GameState) => void
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