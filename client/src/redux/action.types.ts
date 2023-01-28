import CourseModel from "../models/course.model"

export interface Action {
    type: string
}

export interface IPurchaseCourse extends Action {
    courses: CourseModel[]
}

export interface ISetPurchases extends Action {
    courses: CourseModel[]
}