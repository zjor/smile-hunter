import './app.css'
import {StartView} from "./views/start-view/StartView.tsx";
import {GameView} from "./views/GameView.tsx";
import {ResultsView} from "./views/ResultsView.tsx";
import {useAtom} from "jotai";
import {ActiveView, activeViewAtom} from "./state/state.ts";
import {ConfigureGameView} from "./views/ConfigureGameView.tsx";

function renderActiveView(view: ActiveView) {
    switch (view) {
        case ActiveView.START_VIEW:
            return <StartView/>
        case ActiveView.CONFIGURE_GAME_VIEW:
            return <ConfigureGameView/>
        case ActiveView.GAME_VIEW:
            return <GameView/>
        case ActiveView.RESULT_VIEW:
            return <ResultsView/>
    }
}

export function App() {
    const [activeView, _] = useAtom(activeViewAtom)

    return (
        <>
            {renderActiveView(activeView)}
        </>
    )
}