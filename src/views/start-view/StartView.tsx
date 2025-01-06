import {useAtom} from "jotai";
import {ActiveView, activeViewAtom} from "../../state/state.ts";
import WelcomeLogo from "../../assets/welcome-logo.svg"
import "./StartView.css"

export function StartView() {
    const [_, setActiveView] = useAtom(activeViewAtom)

    return (
        <div className="screen">
            <div className="font-baloo font-bold text-6xl self-start ml-16">The Smile<br/>Hunter</div>
            <img className="self-end"
                 src={WelcomeLogo}/>
            <button
                className="default-btn"
                onClick={() => setActiveView(ActiveView.CONFIGURE_GAME_VIEW)}>New Game
            </button>
        </div>
    )
}
