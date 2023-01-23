import axios from "axios"
import SearchResultModel from "../../models/searchResult.model"
import { URL_SEARCH_COURSE } from "../endpoints"

export const searchCourses = async (query: string, page: number = 1): Promise<SearchResultModel> => {
    try {
        const { data } = await axios.get<SearchResultModel>(URL_SEARCH_COURSE, {
            params: {
                q: query,
                page
            }
        })

        return data
    }
    catch (err) {
        console.error(err)
        throw err
    }
} 