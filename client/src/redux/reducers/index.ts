import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import cartReducer from "./cart.reducer";
import courseReducer from "./course.reducer";
import { historyReducer } from "./history.reducers";
import { paymentReducer } from "./payment.reducer";
import purchaseReducer from "./purchase.reducer";

const rootReducer = combineReducers({
    authReducer,
    courseReducer,
    cartReducer,
    historyReducer,
    paymentReducer,
    purchaseReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer