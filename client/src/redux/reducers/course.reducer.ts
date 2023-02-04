import ICourseModel from "../../models/course.model"
import { CourseActions } from "../constants"

const initialState: CourseAction = {
    data: []
}

type CourseAction = {
    type?: string,
    data: ICourseModel[]
}

export const courseReducer = (state = initialState, action: CourseAction) => {
    switch (action.type) {
        case CourseActions.GET_ALL:
            return {
                ...state,
                data: action.data
            }
    }

    return state
}