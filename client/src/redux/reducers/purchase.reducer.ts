import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ICourseModel from "../../models/course.model";
import { IPurchaseAction } from "../action.types";
import { PurchaseActions } from "../constants";

export type PurchaseAction = {
    data: ICourseModel[],
    isLoading: boolean | false
}

const initialState: PurchaseAction = {
    data: [],
    isLoading: false
}

// export const purchaseReducer = (state: ICourseModel[] = [], action: PurchaseAction) : ICourseModel[] => {
//     switch (action.type) {
//         case PurchaseActions.SET_PURCHASES:
//             return action.courses as ICourseModel[]
//         case PurchaseActions.PURCHASE_COURSES:
//             return [
//                 ...state,
//                 ...action.courses
//             ] as ICourseModel[]
//     }

//     return state
// }

const purchaseSlice = createSlice({
    name: 'purchases',
    initialState,
    reducers: {
        purchaseCourses: (store, action: PayloadAction<ICourseModel[]>) => {
            store.isLoading = true
        },
        setPurchases: (store, action: PayloadAction<ICourseModel[]>) => {
            store.data = action.payload
            store.isLoading = false
        },
    }
})

export const { setPurchases, purchaseCourses } = purchaseSlice.actions
export default purchaseSlice.reducer
