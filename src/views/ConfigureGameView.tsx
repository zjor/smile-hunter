import {useAtom} from "jotai/index";
import {ActiveView, activeViewAtom, gameStatsAtom} from "../state/state.ts";
import {Toggle} from "../components/toggle/Toggle.tsx";

export function ConfigureGameView() {
    const [_, setActiveView] = useAtom(activeViewAtom)
    const [gameStats, setGameStats] = useAtom(gameStatsAtom)

    const _onNumberOfRoundsSelected = (n: number) => {
        setGameStats({...gameStats, ...{numberOfRounds: n}})
    }

    return (
        <div className="screen">
            <div className="font-bold pb-3">Select number of rounds</div>
            <Toggle onSelected={_onNumberOfRoundsSelected}/>
            <button className="nb-btn mt-6"
                    onClick={() => setActiveView(ActiveView.GAME_VIEW)}>Start
            </button>
        </div>
    )
}