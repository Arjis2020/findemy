import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import ICourseModel from "../../models/course.model"

type CourseAction = {
    data: ICourseModel[],
    isLoading: boolean
}

const initialState: CourseAction = {
    data: [],
    isLoading: false
}


// export const courseReducer = (state = initialState, action: CourseAction) => {
//     switch (action.type) {
//         case CourseActions.GET_ALL:
//             return {
//                 ...state,
//                 data: action.data
//             }
//     }

//     return state
// }

const courseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        fetchCourses: (store) => {
            store.isLoading = true
        },
        setCourses: (store, action: PayloadAction<CourseAction>) => {
            store.data = action.payload.data
            store.isLoading = false
        }
    }
})

export const { setCourses, fetchCourses } = courseSlice.actions
export default courseSlice.reducer