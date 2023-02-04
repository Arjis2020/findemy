import ICourseModel from "../../models/course.model";
import { IAction, IPurchaseCourse, ISetPurchases } from "../action.types";
import { PurchaseActions } from "../constants";

export const purchaseCourses = (courses: ICourseModel[]): IPurchaseCourse => {
    return {
        type: PurchaseActions.PURCHASE_COURSES,
        courses
    }
}

export const setPurchases = (courses: ICourseModel[]): ISetPurchases => {
    return {
        type: PurchaseActions.SET_PURCHASES,
        courses
    }
}

