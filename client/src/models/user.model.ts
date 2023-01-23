import CartModel from "./cart.model";
import CommonModel from "./common.model";

export default interface UserModel extends CommonModel {
    name: string,
    email: string,
    password: string,
    cart: CartModel
}