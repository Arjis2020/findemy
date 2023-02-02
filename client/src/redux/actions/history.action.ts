import { HistoryActions } from "../constants"

export const addPath = (path: string) => {
    return {
        type: HistoryActions.ADD_PATH,
        path
    }
}

export const resetPaths = () => {
    return {
        type: HistoryActions.RESET_PATHS
    }
}