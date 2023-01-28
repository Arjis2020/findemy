import CourseModel from "../../models/course.model";
import { IPurchaseCourse, ISetPurchases } from "../action.types";
import { PurchaseActions } from "../constants";

export type PurchaseAction = IPurchaseCourse | ISetPurchases

export const purchaseReducer = (state: CourseModel[] = [], action: PurchaseAction) : CourseModel[] => {
    switch (action.type) {
        case PurchaseActions.SET_PURCHASES:
            return action.courses as CourseModel[]
        case PurchaseActions.PURCHASE_COURSES:
            return [
                ...state,
                ...action.courses
            ] as CourseModel[]
    }

    return state
}