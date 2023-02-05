import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ICourseModel from "../../models/course.model";

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
        addPurchase: (store, action: PayloadAction<ICourseModel[]>) => {
            store.data.push(...action.payload)
            store.isLoading = false
            return store
        },
        resetPurchases: (store) => {
            store = initialState
            return store
        }
    }
})

export const { setPurchases, purchaseCourses, resetPurchases, addPurchase } = purchaseSlice.actions
export default purchaseSlice.reducer
