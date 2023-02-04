import ICommonModel from "./common.model";

export default interface IInstructorModel extends ICommonModel {
    name: string,
    gender: string,
    skills: Array<string>,
    introduction: string,
    rating: number,
    reviews: number,
    students: number,
    courses: number,
    imageURL: string
}
