import ICourseModel from "../../models/course.model"
import { CourseActions } from "../constants"

export type CourseAction = {
    data: Array<ICourseModel>
}

export const triggerCoursesRetrieval = () => {
    return {
        type: CourseActions.TRIGGER_GET_ALL
    }
}

export const setCourses = (data : Array<ICourseModel>) => {
    return {
        type: CourseActions.GET_ALL,
        data
    }
}