import axios from "axios"
import CartModel from "../../models/cart.model"
import { URL_ADD_TO_CART, URL_CART_COURSES, URL_REMOVE_FROM_CART } from "../endpoints"

export const getCartCourses = async (): Promise<CartModel> => {
    try {
        const { data } = await axios.get<CartModel>(URL_CART_COURSES)
        return data
    }
    catch (err) {
        console.error(err)
        throw err
    }
}

export const removeFromCart = async (cid: string): Promise<CartModel> => {
    try {
        const { data } = await axios.delete<CartModel>(URL_REMOVE_FROM_CART + `/${cid}`)
        return data
    }
    catch (err) {
        console.error(err)
        throw err
    }
}

export const addToCart = async (course_id: string): Promise<CartModel> => {
    try {
        const { data } = await axios.post<CartModel>(URL_ADD_TO_CART, {
            course_id
        })
        return data
    }
    catch (err) {
        console.log(err)
        throw err
    }
}