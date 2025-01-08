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
            <div className="flex flex-col flex-grow justify-center">
                <div className="font-bold pb-3">Select number of rounds</div>
                <Toggle onSelected={_onNumberOfRoundsSelected}/>
            </div>
            <div className="w-full flex flex-col justify-between min-h-[150px]">
                <button className="nb-btn self-center"
                        onClick={() => setActiveView(ActiveView.GAME_VIEW)}>Start
                </button>
            </div>
        </div>
    )
}