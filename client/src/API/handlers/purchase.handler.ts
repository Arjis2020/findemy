import axios from "axios"
import CourseModel from "../../models/course.model"
import { URL_GET_PURCHASES, URL_PURCHASE_COURSES } from "../endpoints"

export const checkout = async (courses: CourseModel[]): Promise<CourseModel[]> => {
    try {
        const { data } = await axios.post<CourseModel[]>(URL_PURCHASE_COURSES, {
            courses
        })
        return data
    }
    catch (err: any) {
        console.error(err)
        throw new Error(err)
    }
}

export const getPurchases = async (): Promise<CourseModel[]> => {
    try {
        const { data } = await axios.get<CourseModel[]>(URL_GET_PURCHASES)
        return data
    }
    catch (err: any) {
        console.error(err)
        throw new Error(err)
    }
}