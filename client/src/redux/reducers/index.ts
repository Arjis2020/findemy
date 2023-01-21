import { combineReducers } from "redux";
import { authReducer } from "./auth.reducer";
import { courseReducer } from "./course.reducer";
import { cartReducer } from "./cart.reducer";
import { historyReducer } from "./history.reducers";

const rootReducer = combineReducers({
    authReducer,
    courseReducer,
    cartReducer,
    historyReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer