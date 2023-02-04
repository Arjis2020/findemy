import ICartModel from "../../models/cart.model"
import { CartActions } from "../constants"

export type TriggerAddToCartAction = {
    course_id: string
}

export type TriggerRemoveFromCartAction = {
    course_id: string
}

export const triggerAddToCart = (course_id: string) => {
    return {
        type: CartActions.TRIGGER_ADD_TO_CART,
        course_id
    }
}

export const setCart = (data: ICartModel) => {
    return {
        type: CartActions.SET_CART,
        data
    }
}

export const triggerGetCart = () => {
    return {
        type: CartActions.TRIGGER_GET_CART_COURSES
    }
}

export const triggerRemoveFromCart = (course_id: string) => {
    return {
        type: CartActions.TRIGGER_REMOVE_FROM_CART,
        course_id
    }
}

const clearCart = () => {
    return {
        type: CartActions.CLEAR_CART
    }
}