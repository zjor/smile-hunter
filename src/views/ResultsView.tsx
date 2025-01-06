import {useAtom} from "jotai";
import {ActiveView, activeViewAtom, gameStatsAtom} from "../state/state.ts";

export function ResultsView() {
    const [_, setActiveView] = useAtom(activeViewAtom)
    const [stats, __] = useAtom(gameStatsAtom)
    const time = ((stats.endTime - stats.startTime) / 1000).toFixed(2)
    const accuracy = ((stats.totalFaces - stats.erroneousSmiles) / stats.totalFaces * 100).toFixed(1)
    return (
        <div className="w-full h-[100vh] flex flex-col items-center justify-center bg-amber-100 gap-3">
            <div className="text-3xl mb-[48px]">Happy End!</div>
            <div>Total time: <b>{time}</b> seconds</div>
            <div>Accuracy: <b>{accuracy}%</b></div>
            <button
                className="default-btn"
                onClick={() => setActiveView(ActiveView.START_VIEW)}>Play again
            </button>
        </div>
    )
}
