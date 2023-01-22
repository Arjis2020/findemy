import axios from "axios"
import { URL_ADD_TO_CART, URL_CART_COURSES, URL_REMOVE_FROM_CART } from "../endpoints"

export const getCartCourses = async (): Promise<CartOrders> => {
    try {
        const { data } = await axios.get<CartOrders>(URL_CART_COURSES)
        return data
    }
    catch (err) {
        console.error(err)
        throw err
    }
}

export const removeFromCart = async (cid: string): Promise<CartOrders> => {
    try {
        const { data } = await axios.delete<CartOrders>(URL_REMOVE_FROM_CART + `/${cid}`)
        return data
    }
    catch (err) {
        console.error(err)
        throw err
    }
}

export const addToCart = async (course_id: string): Promise<CartOrders> => {
    try {
        const { data } = await axios.post<CartOrders>(URL_ADD_TO_CART, {
            course_id
        })
        return data
    }
    catch (err) {
        console.log(err)
        throw err
    }
}