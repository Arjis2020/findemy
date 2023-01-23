import CartModel from "../../models/cart.model"
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

export const setCart = (data: CartModel) => {
    return {
        type: CartActions.SET_CART,
        data
    }
}

const setCartAll = (data: Array<CartModel>) => {
    return {
        type: CartActions.SET_CART_ALL,
        data
    }
}

export const triggerGetCart = () => {
    return {
        type: CartActions.TRIGGER_GET_CART_COURSES
    }
}

const setCartCourses = (data: CartModel) => {
    return {
        type: CartActions.SET_CART_COURSES,
        data
    }
}

export const triggerRemoveFromCart = (course_id: string) => {
    return {
        type: CartActions.TRIGGER_REMOVE_FROM_CART,
        course_id
    }
}