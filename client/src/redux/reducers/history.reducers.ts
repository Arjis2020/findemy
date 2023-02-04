import { HistoryActions } from "../constants"

export type HistoryState = {
    paths: Array<string>,
}

const initialState: HistoryState = {
    paths: ['/'],
}

type HistoryAction = {
    type?: string,
    path: string
}

export const historyReducer = (state = initialState, action: HistoryAction) => {
    switch (action.type) {
        case HistoryActions.ADD_PATH:
            let currentPaths = [...state.paths, action.path]
            currentPaths = currentPaths.slice(-2)
            const [previousPath, currentPath] = currentPaths
            if(previousPath === currentPath) {
                currentPaths.unshift('/')
                currentPaths.pop()
            }
            return {
                ...state,
                paths: currentPaths
            }
        case HistoryActions.RESET_PATHS:
            return initialState
    }
    return state
}