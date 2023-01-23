import CourseModel from "../../models/course.model"
import { CourseActions } from "../constants"

export type CourseAction = {
    data: Array<CourseModel>
}

export const triggerCoursesRetrieval = () => {
    return {
        type: CourseActions.TRIGGER_GET_ALL
    }
}

export const setCourses = (data : Array<CourseModel>) => {
    return {
        type: CourseActions.GET_ALL,
        data
    }
}