import axios from "axios"
import { FiltersModel } from "../../models/filters.model"
import SearchResultModel from "../../models/searchResult.model"
import { URL_SEARCH_COURSE } from "../endpoints"

export const searchCourses = async (query: string, page: number = 1, filters?: FiltersModel): Promise<SearchResultModel> => {
    let urlEncodedFilters = {
        rating: filters?.rating,
        prices: filters?.prices?.length? filters.prices.join(',') : 'free,paid',
        levels: filters?.levels?.length? filters.levels.join(',') : 'all'
    }

    try {
        const { data } = await axios.get<SearchResultModel>(URL_SEARCH_COURSE, {
            params: {
                q: query,
                page,
                ...urlEncodedFilters
            }
        })

        return data
    }
    catch (err) {
        console.error(err)
        throw err
    }
} 