import { all, call, put, takeEvery } from "redux-saga/effects";
import { getCartCourses } from "../../API/handlers/cart.handler";
import { addToCart } from "../../API/handlers/course.handler";
import { loginError } from "../actions/auth.action";
import { setCart, setCartCourses, TriggerAddToCartAction } from "../actions/cart.action";
import { CartActions } from "../constants";

function* callAddToCart(action?: TriggerAddToCartAction) {
    try {
        const data: Cart = yield call(addToCart, action?.course_id!)
        yield put(
            setCart(data)
        )
    }
    catch (err: any) {
        console.error(err)
    }
}

function* callCartCourses() {
    try {
        const data: CartOrders = yield call(getCartCourses)
        yield put(
            setCartCourses(data)
        )
    }
    catch (err: any) {
        console.error(err)
    }
}

export default function* cartSaga() {
    yield all([
        takeEvery(CartActions.TRIGGER_ADD_TO_CART, callAddToCart),
        takeEvery(CartActions.TRIGGER_GET_CART_COURSES, callCartCourses)
    ])
}