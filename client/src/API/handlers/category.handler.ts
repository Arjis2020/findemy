import axios from "axios"
import { GroupedCategories } from "../../models/category.model"
import { URL_GET_GROUPED_CATEGORIES } from "../endpoints"

export const getGroupedCategories = async (): Promise<GroupedCategories[]> => {
    try {
        const { data } = await axios.get<GroupedCategories[]>(URL_GET_GROUPED_CATEGORIES)
        return data
    }
    catch (err: any) {
        console.error(err)
        throw new Error(err)
    }
}