import { combineReducers } from "redux";
import { authReducer } from "./auth.reducer";
import { courseReducer } from "./course.reducer";

const rootReducer = combineReducers({
    authReducer,
    courseReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer