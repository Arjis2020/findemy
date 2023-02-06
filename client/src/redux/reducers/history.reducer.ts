import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type HistoryState = {
    paths: Array<string>,
}

const initialState: HistoryState = {
    paths: ['/'],
}

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        addPath: (store, action: PayloadAction<string>) => {
            let currentPaths = [...store.paths, action.payload]
            currentPaths = currentPaths.slice(-2)
            const [previousPath, currentPath] = currentPaths
            if (previousPath === currentPath) {
                currentPaths.unshift('/')
                currentPaths.pop()
            }
            store.paths = currentPaths
            return store
        },
        resetPaths: (store) => {
            store = initialState
            return store
        }
    }
})

export const { addPath, resetPaths } = historySlice.actions
export default historySlice.reducer