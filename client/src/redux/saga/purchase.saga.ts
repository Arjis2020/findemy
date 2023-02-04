import { all, call, debounce, put, takeEvery, takeLeading } from "redux-saga/effects";
import { getAllCourses } from "../../API/handlers/course.handler";
import ICartModel from "../../models/cart.model";
import ICourseModel from "../../models/course.model";
import { setCart } from "../actions/cart.action";
import { setCourses } from "../actions/course.action";
import { CourseActions, PurchaseActions } from "../constants";
import { PurchaseAction } from "../reducers/purchase.reducer";
import { checkout as purchaseCoursesHandler } from '../../API/handlers/purchase.handler'
import { purchaseCourses } from "../actions/purchase.action";

function* checkout(action: PurchaseAction) {
    try {
        const updatedCart: ICartModel = yield call(purchaseCoursesHandler, action.courses)
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
        takeLeading(PurchaseActions.PURCHASE_COURSES, checkout)
    ])
}