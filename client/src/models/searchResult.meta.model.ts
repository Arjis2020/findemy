import LevelStatsModel from "./level.stats.model";
import PriceStatsModel from "./price.stats.model";
import RatingStatsModel from "./rating.stats.model";

export default interface SearchResultMetaModel {
    totalSize: number,
    levelStats: LevelStatsModel;
    ratingStats: RatingStatsModel;
    priceStats: PriceStatsModel;
}