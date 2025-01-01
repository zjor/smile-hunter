import {atom} from "jotai";

export enum ActiveView {
    START_VIEW,
    GAME_VIEW,
    RESULT_VIEW,
}

export interface State {
    view: ActiveView;
    startTime: number;
    endTime: number;
    accuracy: number;
}

export const stateAtom = atom<State>({
    view: ActiveView.START_VIEW,
    startTime: 0,
    endTime: 0,
    accuracy: 0
})