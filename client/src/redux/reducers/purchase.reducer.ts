import ICourseModel from "../../models/course.model";
import { IPurchaseCourse, ISetPurchases } from "../action.types";
import { PurchaseActions } from "../constants";

export type PurchaseAction = IPurchaseCourse | ISetPurchases

export const purchaseReducer = (state: ICourseModel[] = [], action: PurchaseAction) : ICourseModel[] => {
    switch (action.type) {
        case PurchaseActions.SET_PURCHASES:
            return action.courses as ICourseModel[]
        case PurchaseActions.PURCHASE_COURSES:
            return [
                ...state,
                ...action.courses
            ] as ICourseModel[]
    }

    return state
}