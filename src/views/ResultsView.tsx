import {useAtom} from "jotai";
import {ActiveView, State, stateAtom} from "../state/state.ts";

export function ResultsView() {
    const [state, setState] = useAtom<State>(stateAtom)
    return (
        <div className="w-full h-[100vh] flex flex-col items-center justify-center bg-amber-100">
            <div className="text-3xl mb-[48px]">Happy End!</div>
            <button onClick={() => setState({...state, ...{view: ActiveView.START_VIEW}})}>Play again</button>
        </div>
    )
}
