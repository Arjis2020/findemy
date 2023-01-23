import CartOrderMetaModel from "./cart.meta.model";
import CourseModel from "./course.model";

export default interface CartModel extends CartOrderMetaModel {
    orders: Array<CourseModel>;
}