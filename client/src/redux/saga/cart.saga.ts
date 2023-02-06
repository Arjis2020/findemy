import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, takeEvery, takeLeading } from "redux-saga/effects";
import { addToCart, getCartCourses, removeFromCart } from "../../API/handlers/cart.handler";
import ICartModel from "../../models/cart.model";
import { setCart } from "../reducers/cart.reducer";
import { CartSagaActions } from "../saga.constants";

function* callAddToCart(action?: PayloadAction<string>) {
    try {
        const data: ICartModel = yield call(addToCart, action?.payload!)
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

function* removeCourseFromCart(action?: PayloadAction<string>) {
    try {
        const data: ICartModel = yield call(removeFromCart, action?.payload!)

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
        takeLeading(CartSagaActions.TRIGGER_ADD_TO_CART, callAddToCart),
        takeEvery(CartSagaActions.TRIGGER_GET_CART, callCartCourses),
        takeLeading(CartSagaActions.TRIGGER_REMOVE_FROM_CART, removeCourseFromCart)
    ])
}