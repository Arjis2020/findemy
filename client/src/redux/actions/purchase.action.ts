import CourseModel from "../../models/course.model";
import { Action, IPurchaseCourse, ISetPurchases } from "../action.types";
import { PurchaseActions } from "../constants";

export const purchaseCourses = (courses: CourseModel[]): IPurchaseCourse => {
    return {
        type: PurchaseActions.PURCHASE_COURSES,
        courses
    }
}

export const setPurchases = (courses: CourseModel[]): ISetPurchases => {
    return {
        type: PurchaseActions.SET_PURCHASES,
        courses
    }
}

