import { CartActions, LoginActions } from "../constants"

export type CartAction = {
    itemsConsolidated: Array<Cart>,
    cartOrders?: CartOrders
}

const initialState: CartAction = {
    itemsConsolidated: [],
    cartOrders: undefined
}

export const cartReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case CartActions.SET_CART:
            return {
                ...state,
                itemsConsolidated: [...state.itemsConsolidated, action.data]
            }
        case CartActions.SET_CART_ALL:
            return {
                ...state,
                itemsConsolidated: action.data
            }
        case CartActions.SET_CART_COURSES:
            return {
                ...state,
                cartOrders: action.data
            }
        case LoginActions.LOGOUT:
            return initialState
    }

    return state
}