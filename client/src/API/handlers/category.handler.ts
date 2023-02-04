import axios from "axios"
import { IGroupedCategories } from "../../models/category.model"
import { URL_GET_GROUPED_CATEGORIES } from "../endpoints"

export const getGroupedCategories = async (): Promise<IGroupedCategories[]> => {
    try {
        const { data } = await axios.get<IGroupedCategories[]>(URL_GET_GROUPED_CATEGORIES)
        return data
    }
    catch (err: any) {
        console.error(err)
        throw new Error(err)
    }
}