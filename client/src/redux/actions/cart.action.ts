import { CartActions } from "../constants"

export type TriggerAddToCartAction = {
    user_id: string,
    course_id: string
}

export const triggerAddToCart = (course_id: string) => {
    return {
        type: CartActions.TRIGGER_ADD_TO_CART,
        course_id
    }
}

export const setCart = (data: Cart) => {
    return {
        type: CartActions.SET_CART,
        data
    }
}

export const setCartAll = (data: Array<Cart>) => {
    return {
        type: CartActions.SET_CART_ALL,
        data
    }
}

export const triggerGetCartCourses = () => {
    return {
        type: CartActions.TRIGGER_GET_CART_COURSES
    }
}

export const setCartCourses = (data: CartOrders) => {
    return {
        type: CartActions.SET_CART_COURSES,
        data
    }
}