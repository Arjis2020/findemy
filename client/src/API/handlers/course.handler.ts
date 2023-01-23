import axios from "axios";
import CourseModel from "../../models/course.model";
import { URL_ALL_COURSES, URL_COURSE_BY_SLUG } from "../endpoints";

export const getAllCourses = async (): Promise<Array<CourseModel>> => {
    try {
        const { data } = await axios.get<Array<CourseModel>>(URL_ALL_COURSES)
        return data
    }
    catch (err: any) {
        console.error(err)
        throw err
    }
}

export const getCourseDetails = async (slug: string): Promise<CourseModel> => {
    try {
        const { data } = await axios.get<CourseModel>(URL_COURSE_BY_SLUG + slug)
        return data
    }
    catch (err) {
        console.error(err)
        throw err
    }
}