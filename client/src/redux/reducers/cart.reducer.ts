import { CartActions, LoginActions } from "../constants"

export type CartAction = {
    items: Array<Cart>
}

const initialState: CartAction = {
    items: []
}

export const cartReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case CartActions.SET_CART:
            return {
                ...state,
                items: [...state.items, action.data]
            }
            case CartActions.SET_CART_ALL:
                return {
                    ...state,
                    items: action.data
            }
        case LoginActions.LOGOUT:
            return initialState
    }

    return state
}