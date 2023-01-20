import { CourseActions } from "../constants"

const intialState = {
    courses: []
}

export const courseReducer = (state = intialState, action: any) => {
    switch (action.type) {
        case CourseActions.GET_ALL:
            return {
                ...state,
                data: action.data
            }
    }

    return state
}