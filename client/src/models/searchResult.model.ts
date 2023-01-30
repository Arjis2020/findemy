import CourseModel from "./course.model";
import { SearchResultMetaModel, TopicSearchResultMetaModel } from "./searchResult.meta.model";

export interface SearchResultModel extends SearchResultMetaModel {
    results: Array<CourseModel>;
}

export interface TopicSearchResultModel extends TopicSearchResultMetaModel {
    results: Array<CourseModel>;
}