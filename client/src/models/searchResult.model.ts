import ICourseModel from "./course.model";
import { ISearchResultMetaModel, ITopicSearchResultMetaModel } from "./searchResult.meta.model";

export interface ISearchResultModel extends ISearchResultMetaModel {
    results: Array<ICourseModel>;
}

export interface ITopicSearchResultModel extends ITopicSearchResultMetaModel {
    results: Array<ICourseModel>;
}