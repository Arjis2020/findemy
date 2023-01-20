import { CourseActions } from "../constants"

export type CourseAction = {
    data: Array<Course>
}

export const triggerCoursesRetrieval = () => {
    return {
        type: CourseActions.TRIGGER_GET_ALL
    }
}

export const setCourses = (data : Array<Course>) => {
    return {
        type: CourseActions.GET_ALL,
        data
    }
}