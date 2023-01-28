import CartModel from "./cart.model";
import CommonModel from "./common.model";
import CourseModel from "./course.model";

export default interface UserModel extends CommonModel {
    name: string,
    email: string,
    password: string,
    cart: CartModel,
    purchases: Array<CourseModel>
}