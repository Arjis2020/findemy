import axios from "axios"
import ICartModel from "../../models/cart.model"
import { URL_ADD_TO_CART, URL_CART_COURSES, URL_REMOVE_FROM_CART } from "../endpoints"

export const getCartCourses = async (): Promise<ICartModel> => {
    try {
        const { data } = await axios.get<ICartModel>(URL_CART_COURSES)
        return data
    }
    catch (err) {
        console.error(err)
        throw err
    }
}

export const removeFromCart = async (cid: string): Promise<ICartModel> => {
    try {
        const { data } = await axios.delete<ICartModel>(URL_REMOVE_FROM_CART + `/${cid}`)
        return data
    }
    catch (err) {
        console.error(err)
        throw err
    }
}

export const addToCart = async (course_id: string): Promise<ICartModel> => {
    try {
        const { data } = await axios.post<ICartModel>(URL_ADD_TO_CART, {
            course_id
        })
        return data
    }
    catch (err) {
        console.log(err)
        throw err
    }
}