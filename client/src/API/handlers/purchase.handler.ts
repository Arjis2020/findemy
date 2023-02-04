import axios from "axios"
import ICourseModel from "../../models/course.model"
import { URL_GET_PURCHASES, URL_PURCHASE_COURSES } from "../endpoints"

export const checkout = async (courses: ICourseModel[]): Promise<ICourseModel[]> => {
    try {
        const { data } = await axios.post<ICourseModel[]>(URL_PURCHASE_COURSES, {
            courses
        })
        return data
    }
    catch (err: any) {
        console.error(err)
        throw new Error(err)
    }
}

export const getPurchases = async (): Promise<ICourseModel[]> => {
    try {
        const { data } = await axios.get<ICourseModel[]>(URL_GET_PURCHASES)
        return data
    }
    catch (err: any) {
        console.error(err)
        throw new Error(err)
    }
}