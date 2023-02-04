import { LevelsFilterModel } from "./levels.filter.model";
import { PricesFilterModel } from "./prices.filter.model";

export interface IFiltersModel {
    rating?: string,
    levels? : Array<LevelsFilterModel>,
    prices? : Array<PricesFilterModel>
}