import axios from "axios";
import { URL_ADD_TO_CART, URL_ALL_COURSES, URL_COURSE_BY_ID } from "../endpoints";

export const getAllCourses = async (): Promise<Array<Course>> => {
    try {
        const { data } = await axios.get<Array<Course>>(URL_ALL_COURSES)
        return data
    }
    catch (err: any) {
        console.error(err)
        throw err
    }
}

export const getCourseDetails = async (cid: string): Promise<Course> => {
    try {
        const { data } = await axios.get<Course>(URL_COURSE_BY_ID, {
            params: {
                id: cid
            }
        })
        return data
    }
    catch (err) {
        console.error(err)
        throw err
    }
}

export const addToCart = async (course_id: string): Promise<Array<Course>> => {
    try {
        const { data } = await axios.post<Array<Course>>(URL_ADD_TO_CART, {
            course_id
        })
        return data
    }
    catch (err) {
        console.log(err)
        throw err
    }
}