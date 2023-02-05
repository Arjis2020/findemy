import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import ICartModel from "../../models/cart.model"
// import { CartActions, LoginActions } from "../constants"

export interface CartState {
    data: ICartModel;
    isLoading?: boolean | false;
}

// export type CartAction = {
//     type?: string,
//     data: ICartModel,
// }

const initialState: CartState = {
    data: {
        orders: [],
        totalDiscountedPrice: 0,
        totalPrice: 0,
        discount: 0,
        discountPercentage: 0,
    },
    isLoading: false
}

// export const cartReducer = (state = initialState, action: CartAction) => {
//     switch (action.type) {
//         case CartActions.SET_CART:
//             return {
//                 ...state,
//                 ...action.data
//             }
//         case CartActions.CLEAR_CART:
//         case LoginActions.LOGOUT:
//             return initialState
//     }
//     return state
// }

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (store, action: PayloadAction<ICartModel>) => {
            store.data = action.payload
            store.isLoading = false
            return store
        },
        resetCart: (store) => {
            store = initialState
            return store
        },
        triggerAddToCart: (store, action: PayloadAction<string>) => {
            store.isLoading = true
        },
        triggerGetCart: (store) => {
            store.isLoading = true
        },
        triggerRemoveFromCart: (store, action: PayloadAction<string>) => {
            store.isLoading = true
        }
    }
})

export const { setCart, resetCart, triggerAddToCart, triggerGetCart, triggerRemoveFromCart } = cartSlice.actions
export default cartSlice.reducer
