import LevelStatsModel from "./level.stats.model";
import PriceStatsModel from "./price.stats.model";
import RatingStatsModel from "./rating.stats.model";

export interface SearchResultMetaModel {
    totalSize: number,
    levelStats: LevelStatsModel;
    ratingStats: RatingStatsModel;
    priceStats: PriceStatsModel;
}

export interface TopicSearchResultMetaModel {
    totalSize: number
}