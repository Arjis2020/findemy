import { CourseActions } from "../constants"

const initialState = {
    data: []
}

export const courseReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case CourseActions.GET_ALL:
            return {
                ...state,
                data: action.data
            }
    }

    return state
}