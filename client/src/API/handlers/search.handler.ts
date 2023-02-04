import axios from "axios"
import { IFiltersModel } from "../../models/filters.model"
import {ISearchResultModel} from "../../models/searchResult.model"
import { SortByModel } from "../../models/sortBy.filter.model"
import { URL_SEARCH_COURSE, URL_SEARCH_COURSE_BY_CATEGORY } from "../endpoints"

export const searchCourses = async (query: string, page: number = 1, filters?: IFiltersModel, sortBy?: SortByModel): Promise<ISearchResultModel> => {
    let urlEncodedFilters = {
        rating: filters?.rating,
        prices: filters?.prices?.length ? filters.prices.join(',') : 'free,paid',
        levels: filters?.levels?.length ? filters.levels.join(',') : 'all'
    }

    try {
        const { data } = await axios.get<ISearchResultModel>(URL_SEARCH_COURSE, {
            params: {
                q: query,
                page,
                ...urlEncodedFilters,
                sort: sortBy
            }
        })

        return data
    }
    catch (err) {
        console.error(err)
        throw err
    }
}

export const searchCoursesByCategory = async (category: string, page: number = 1): Promise<ISearchResultModel> => {
    try {
        const { data } = await axios.get<ISearchResultModel>(`${URL_SEARCH_COURSE_BY_CATEGORY}/${category}`, {
            params: {
                page
            }
        })
        return data
    }
    catch (err: any) {
        console.error(err)
        throw new Error(err)
    }
}