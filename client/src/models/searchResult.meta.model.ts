import ILevelStatsModel from "./level.stats.model";
import IPriceStatsModel from "./price.stats.model";
import IRatingStatsModel from "./rating.stats.model";

export interface ISearchResultMetaModel {
    totalSize: number,
    levelStats: ILevelStatsModel;
    ratingStats: IRatingStatsModel;
    priceStats: IPriceStatsModel;
}

export interface ITopicSearchResultMetaModel {
    totalSize: number
}