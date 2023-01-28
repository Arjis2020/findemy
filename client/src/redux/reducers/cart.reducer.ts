import CartModel from "../../models/cart.model"
import { CartActions, LoginActions } from "../constants"

// export type CartAction = {
//     // itemsConsolidated: Array<Cart>,
//     cartOrders?: CartOrders
// }

export type CartAction = CartModel

// const initialState: CartAction = {
//     // itemsConsolidated: [],
//     cartOrders: undefined
// }

const initialState: CartAction = {
    orders: [],
    totalDiscountedPrice: 0,
    totalPrice: 0,
    discount: 0,
    discountPercentage: 0
}

export const cartReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case CartActions.SET_CART:
            return {
                ...state,
                ...action.data
            }
        case CartActions.CLEAR_CART:
        case LoginActions.LOGOUT:
            return initialState
    }

    return state
}