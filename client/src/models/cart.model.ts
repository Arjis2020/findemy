import ICartOrderMetaModel from "./cart.meta.model";
import ICourseModel from "./course.model";

export default interface ICartModel extends ICartOrderMetaModel {
    orders: Array<ICourseModel>;
}