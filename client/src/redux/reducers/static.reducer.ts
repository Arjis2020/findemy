import { createSlice } from "@reduxjs/toolkit";

interface StaticState {
    mobileSearch: boolean
}

const initialState: StaticState = {
    mobileSearch: false
}

const staticSlice = createSlice({
    name: 'static',
    initialState,
    reducers: {
        toggleMobileSearchVisibility(store) {
            store.mobileSearch = !store.mobileSearch
            return store
        }
    }
})

export const { toggleMobileSearchVisibility } = staticSlice.actions
export default staticSlice.reducer