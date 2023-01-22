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
    }
    return state
}