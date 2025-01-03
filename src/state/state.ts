import {atom} from "jotai";

export enum ActiveView {
    START_VIEW,
    CONFIGURE_GAME_VIEW,
    GAME_VIEW,
    RESULT_VIEW,
}

export interface GameStats {
    numberOfRounds: number;
    startTime: number;
    endTime: number;
    totalFaces: number;
    erroneousSmiles: number;
}

export const activeViewAtom = atom<ActiveView>(ActiveView.START_VIEW)

export const gameStatsAtom = atom<GameStats>({
    numberOfRounds: 10,
    startTime: 0,
    endTime: 0,
    totalFaces: 0,
    erroneousSmiles: 0
})