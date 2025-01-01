import './app.css'
import {StartView} from "./views/start-view/StartView.tsx";
import {GameView} from "./views/GameView.tsx";
import {ResultsView} from "./views/ResultsView.tsx";
import {useAtom} from "jotai";
import {ActiveView, State, stateAtom} from "./state/state.ts";

function renderActiveView(view: ActiveView) {
    switch (view) {
        case ActiveView.START_VIEW:
            return <StartView/>
        case ActiveView.GAME_VIEW:
            return <GameView/>
        case ActiveView.RESULT_VIEW:
            return <ResultsView/>
    }
}

export function App() {
    const [state, _] = useAtom<State>(stateAtom)

    return (
        <>
            {renderActiveView(state.view)}
        </>
    )
}