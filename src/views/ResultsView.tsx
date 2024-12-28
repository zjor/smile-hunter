import {GameState, ViewProps} from "../app.tsx";

export function ResultsView({setGameState}: ViewProps) {
    return (
        <div className="w-full h-[100vh] flex flex-col items-center justify-center bg-amber-100">
            <div className="text-3xl mb-[48px]">Happy End!</div>
            <button onClick={() => setGameState(GameState.NOT_STARTED)}>Play again</button>
        </div>
    )
}
