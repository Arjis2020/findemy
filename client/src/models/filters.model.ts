import { LevelsFilterModel } from "./levels.filter.model";
import { PricesFilterModel } from "./prices.filter.model";

export interface FiltersModel {
    rating?: string,
    levels? : Array<LevelsFilterModel>,
    prices? : Array<PricesFilterModel>
}