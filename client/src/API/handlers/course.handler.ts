import axios from "axios";
import { URL_ALL_COURSES, URL_COURSE_BY_SLUG } from "../endpoints";

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

export const getCourseDetails = async (slug: string): Promise<Course> => {
    try {
        const { data } = await axios.get<Course>(URL_COURSE_BY_SLUG + slug)
        return data
    }
    catch (err) {
        console.error(err)
        throw err
    }
}