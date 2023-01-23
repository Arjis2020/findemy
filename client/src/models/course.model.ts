import CommonModel from "./common.model";
import InstructorModel from "./instructor.model";

export default interface CourseModel extends CommonModel {
    title: string,
    shortDescription: string,
    detailedDescription: string,
    instructors: Array<InstructorModel>,
    rating: number,
    totalRatings: number,
    totalHours: number,
    lectures: number,
    levels: Array<string>,
    imageUrl: string,
    price: number,
    discountedPrice: number,
    requirements: Array<string>,
    learnings: Array<string>,
    totalArticles: number,
    totalVideoHours: number,
    totalDownloadableResources: number,
    categories: Array<string>,
    slug: string,
}