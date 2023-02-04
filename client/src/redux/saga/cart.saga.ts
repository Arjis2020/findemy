import { all, call, put, takeEvery, takeLeading } from "redux-saga/effects";
import { addToCart, getCartCourses, removeFromCart } from "../../API/handlers/cart.handler";
import ICartModel from "../../models/cart.model";
import { loginError } from "../actions/auth.action";
import { setCart, TriggerAddToCartAction, TriggerRemoveFromCartAction } from "../actions/cart.action";
import { CartActions } from "../constants";

function* callAddToCart(action?: TriggerAddToCartAction) {
    try {
        const data: ICartModel = yield call(addToCart, action?.course_id!)
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
        const data: ICartModel = yield call(getCartCourses)
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
        const data: ICartModel = yield call(removeFromCart, action?.course_id!)

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
        takeLeading(CartActions.TRIGGER_ADD_TO_CART, callAddToCart),
        takeEvery(CartActions.TRIGGER_GET_CART_COURSES, callCartCourses),
        takeLeading(CartActions.TRIGGER_REMOVE_FROM_CART, removeCourseFromCart)
    ])
}