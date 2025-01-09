import {useAtom} from "jotai/index";
import {ActiveView, activeViewAtom, gameStatsAtom} from "../state/state.ts";
import {Toggle} from "../components/toggle/Toggle.tsx";

import FaceNormal from "../assets/face-normal.svg"
import FaceSmiling from "../assets/face-smiling.svg"
import FaceSurprised from "../assets/face-surprised.svg"

export function ConfigureGameView() {
    const [_, setActiveView] = useAtom(activeViewAtom)
    const [gameStats, setGameStats] = useAtom(gameStatsAtom)

    const _onNumberOfRoundsSelected = (n: number) => {
        setGameStats({...gameStats, ...{numberOfRounds: n}})
    }

    const getFace = (n: number) => {
        switch (n) {
            case 10:
                return FaceSmiling
            case 15:
                return FaceSurprised
            default:
                return FaceNormal
        }
    }

    return (
        <div className="screen">
            <div className="flex flex-col flex-grow justify-center">
                <img className="w-3/4 self-center pb-10"
                    src={getFace(gameStats.numberOfRounds)}/>
                <div className="font-bold pb-3">Select number of rounds</div>
                <Toggle
                    values={[5, 10, 15]}
                    selectedValue={gameStats.numberOfRounds}
                    onSelected={_onNumberOfRoundsSelected}/>
            </div>
            <div className="w-full flex flex-col justify-between min-h-[150px]">
                <button className="nb-btn self-center"
                        onClick={() => setActiveView(ActiveView.GAME_VIEW)}>Start
                </button>
            </div>
        </div>
    )
}