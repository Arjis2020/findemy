import CourseModel from "./course.model";
import SearchResultMetaModel from "./searchResult.meta.model";

export default interface SearchResultModel extends SearchResultMetaModel{
    results: Array<CourseModel>;
}