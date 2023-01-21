import { HistoryActions } from "../constants"

export type HistoryState = {
    paths: Array<string>,
}

const initialState: HistoryState = {
    paths: ['/'],
}

export const historyReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case HistoryActions.ADD_PATH:
            let currentPaths = [...state.paths, action.path]
            return {
                ...state,
                paths: currentPaths.slice(-2)
            }
    }
    return state
}