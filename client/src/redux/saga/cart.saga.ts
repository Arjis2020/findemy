import { all, call, put, takeEvery } from "redux-saga/effects";
import { addToCart } from "../../API/handlers/course.handler";
import { loginError } from "../actions/auth.action";
import { setCart, TriggerAddToCartAction } from "../actions/cart.action";
import { CartActions } from "../constants";

function* callAddToCart(action?: TriggerAddToCartAction) {
    try {
        const data: Array<Course> = yield call(addToCart, action?.course_id!)
        yield put(
            setCart(data)
        )
    }
    catch (err: any) {
        console.error(err)
        yield put(
            loginError(err)
        )
    }
}

export default function* cartSaga() {
    yield all([
        takeEvery(CartActions.TRIGGER_ADD_TO_CART, callAddToCart)
    ])
}