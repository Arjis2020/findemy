import { all, call, put, takeLeading } from "redux-saga/effects";
import ICartModel from "../../models/cart.model";
import { addPurchase, setPurchases } from "../reducers/purchase.reducer";
import { checkout as purchaseCoursesHandler } from '../../API/handlers/purchase.handler'
import { setCart } from "../reducers/cart.reducer";
import { PayloadAction } from "@reduxjs/toolkit";
import ICourseModel from "../../models/course.model";
import { PurchaseSagaActions } from "../saga.constants";

function* checkout(action?: PayloadAction<ICourseModel[]>) {
    try {
        const updatedCart: ICartModel = yield call(purchaseCoursesHandler, action?.payload!)
        yield put(
            setCart(updatedCart)
        )
        yield put(
            addPurchase(action?.payload!)
        )
    }
    catch (err: any) {
        console.error(err)
    }
}

export default function* purchaseSaga() {
    yield all([
        takeLeading(PurchaseSagaActions.PURCHASE_COURSES, checkout)
    ])
}