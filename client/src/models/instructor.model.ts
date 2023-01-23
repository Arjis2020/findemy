import CommonModel from "./common.model";

export default interface InstructorModel extends CommonModel {
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
