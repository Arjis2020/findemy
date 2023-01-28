import { all, call, put, takeEvery } from "redux-saga/effects";
import { getAllCourses } from "../../API/handlers/course.handler";
import CartModel from "../../models/cart.model";
import CourseModel from "../../models/course.model";
import { setCart } from "../actions/cart.action";
import { setCourses } from "../actions/course.action";
import { CourseActions, PurchaseActions } from "../constants";
import { PurchaseAction } from "../reducers/purchase.reducer";
import { checkout as purchaseCoursesHandler } from '../../API/handlers/purchase.handler'
import { purchaseCourses } from "../actions/purchase.action";

function* checkout(action: PurchaseAction) {
    try {
        const updatedCart: CartModel = yield call(purchaseCoursesHandler, action.courses)
        yield put(
            setCart(updatedCart)
        )
        yield put(
            purchaseCourses(action.courses)
        )
    }
    catch (err: any) {
        console.error(err)
    }
}

export default function* purchaseSaga() {
    yield all([
        takeEvery(PurchaseActions.PURCHASE_COURSES, checkout)
    ])
}