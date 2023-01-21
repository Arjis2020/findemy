import { combineReducers } from "redux";
import { authReducer } from "./auth.reducer";
import { courseReducer } from "./course.reducer";
import { cartReducer } from "./cart.reducer";

const rootReducer = combineReducers({
    authReducer,
    courseReducer,
    cartReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer