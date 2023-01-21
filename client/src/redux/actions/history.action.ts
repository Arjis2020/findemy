import { HistoryActions } from "../constants"

export const addPath = (path: string) => {
    return {
        type: HistoryActions.ADD_PATH,
        path
    }
}