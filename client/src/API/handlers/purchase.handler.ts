import axios from "axios"
import { URL_PURCHASE_COURSES } from "../endpoints"

export const checkout = async (courses: string[]): Promise<void> => {
    try {
        await axios.post(URL_PURCHASE_COURSES, {
            courses
        })
    }
    catch (err: any) {
        console.error(err)
        throw new Error(err)
    }
}