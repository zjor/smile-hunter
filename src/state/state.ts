import {atom} from "jotai";

export enum ActiveView {
    START_VIEW,
    GAME_VIEW,
    RESULT_VIEW,
}

// deprecated
export interface State {
    view: ActiveView;
    startTime: number;
    endTime: number;
    accuracy: number;
}

export interface GameStats {
    startTime: number;
    endTime: number;
    accuracy: number;
}

export const activeViewAtom = atom<ActiveView>(ActiveView.START_VIEW)

export const gameStatsAtom = atom<GameStats>({
    startTime: 0,
    endTime: 0,
    accuracy: 0,
})

// deprecated
export const stateAtom = atom<State>({
    view: ActiveView.START_VIEW,
    startTime: 0,
    endTime: 0,
    accuracy: 0
})