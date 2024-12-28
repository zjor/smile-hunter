import {GameState, ViewProps} from "../app.tsx";

export function StartView({setGameState}: ViewProps) {
    return (
        <div className="w-full h-[100vh] flex flex-col items-center justify-center bg-amber-100">
            <div className="w-[128px] h-[128px] mb-[48px] bg-amber-500 rounded-2xl">
                {/* logo */}
            </div>
            <button onClick={() => setGameState(GameState.STARTED)}>Start</button>
        </div>
    )
}
