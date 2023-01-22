import { all, call, put, takeEvery } from "redux-saga/effects";
import { addToCart, getCartCourses, removeFromCart } from "../../API/handlers/cart.handler";
import { loginError } from "../actions/auth.action";
import { setCart, TriggerAddToCartAction, TriggerRemoveFromCartAction } from "../actions/cart.action";
import { CartActions } from "../constants";

function* callAddToCart(action?: TriggerAddToCartAction) {
    try {
        const data: CartOrders = yield call(addToCart, action?.course_id!)
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
            setCart(data)
        )
    }
    catch (err: any) {
        console.error(err)
    }
}

function* removeCourseFromCart(action?: TriggerRemoveFromCartAction) {
    try {
        const data: CartOrders = yield call(removeFromCart, action?.course_id!)

        yield put(
            setCart(data)
        )
    }
    catch (err) {
        console.error(err)
    }
}

export default function* cartSaga() {
    yield all([
        takeEvery(CartActions.TRIGGER_ADD_TO_CART, callAddToCart),
        takeEvery(CartActions.TRIGGER_GET_CART_COURSES, callCartCourses),
        takeEvery(CartActions.TRIGGER_REMOVE_FROM_CART, removeCourseFromCart)
    ])
}