import ICartModel from "../../models/cart.model"
import { CartActions, LoginActions } from "../constants"

export type CartState = ICartModel

export type CartAction = {
    type?: string,
    data: ICartModel
}

const initialState: CartState = {
    orders: [],
    totalDiscountedPrice: 0,
    totalPrice: 0,
    discount: 0,
    discountPercentage: 0
}

export const cartReducer = (state = initialState, action: CartAction) => {
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