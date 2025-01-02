import "./StartView.css"
import {useAtom} from "jotai";
import {ActiveView, activeViewAtom} from "../../state/state.ts";


export function StartView() {
    const [_, setActiveView] = useAtom(activeViewAtom)

    return (
        <div className="w-full h-[100vh] flex flex-col items-center justify-center bg-amber-100">
            <svg width="450" height="250">
                <defs>
                    <path id="curve" d="M 50,200 A 200,200 0 0,1 400,250"/>
                </defs>
                <text fill="black" font-size="20">
                    <textPath href="#curve" className="title">
                        The Smile Hunter
                    </textPath>
                </text>
            </svg>
            <img className="w-[256] h-[256px] mb-[48px] rounded-2xl"
                 src="https://raw.githubusercontent.com/zjor/assets/refs/heads/master/smile-hunter/smile-hunter-splash.png"/>
            <button
                className="bg-cyan-700 text-2xl text-white font-bold w-[256px]"
                onClick={() => setActiveView(ActiveView.GAME_VIEW)}>Start
            </button>
        </div>
    )
}
