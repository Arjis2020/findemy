import ICourseModel from "../../models/course.model";
import { IPurchaseAction } from "../action.types";
import { PurchaseActions } from "../constants";

export const purchaseCourses = (courses: ICourseModel[]) => {
    return {
        type: PurchaseActions.PURCHASE_COURSES,
        courses
    }
}

// export const setPurchases = (courses: ICourseModel[]): IPurchaseAction => {
//     return {
//         type: PurchaseActions.SET_PURCHASES,
//         courses
//     }
// }

