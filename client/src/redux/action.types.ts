import ICourseModel from "../models/course.model"

export interface IAction {
    type: string
}

export interface IPurchaseCourse extends IAction {
    courses: ICourseModel[]
}

export interface ISetPurchases extends IAction {
    courses: ICourseModel[]
}