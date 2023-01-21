import axios from "axios"
import { URL_CART_COURSES } from "../endpoints"

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