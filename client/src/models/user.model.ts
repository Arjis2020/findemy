import ICartModel from "./cart.model";
import ICommonModel from "./common.model";
import ICourseModel from "./course.model";

export default interface IUserModel extends ICommonModel {
    name: string,
    email: string,
    cart: ICartModel,
    purchases: Array<ICourseModel>
}