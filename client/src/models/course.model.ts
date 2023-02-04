import ICommonModel from "./common.model";
import IInstructorModel from "./instructor.model";

export default interface ICourseModel extends ICommonModel {
    title: string,
    shortDescription: string,
    detailedDescription: string,
    instructors: Array<IInstructorModel>,
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