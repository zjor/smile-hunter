import {useAtom} from "jotai";
import {ActiveView, activeViewAtom} from "../state/state.ts";

export function ResultsView() {
    const [_, setActiveView] = useAtom(activeViewAtom)
    return (
        <div className="w-full h-[100vh] flex flex-col items-center justify-center bg-amber-100">
            <div className="text-3xl mb-[48px]">Happy End!</div>
            <button onClick={() => setActiveView(ActiveView.START_VIEW)}>Play again</button>
        </div>
    )
}
