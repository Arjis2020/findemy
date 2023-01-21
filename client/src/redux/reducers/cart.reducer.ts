import { CartActions, LoginActions } from "../constants"

export type CartAction = {
    items: Array<Course>
}

const intialState: CartAction = {
    items: []
}

export const cartReducer = (state = intialState, action: any) => {
    switch (action.type) {
        case CartActions.SET_CART:
            return {
                ...state,
                items: action.data
            }
        case CartActions.SET_CART_ALL:
            return {
                ...state,
                items: [...state.items, action.data]
            }
        case LoginActions.LOGOUT:
            return intialState
    }

    return state
}