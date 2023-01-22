import axios from "axios"
import { URL_SEARCH_COURSE } from "../endpoints"

export const searchCourses = async (query: string): Promise<Array<Course>> => {
    try {
        const { data } = await axios.get<Array<Course>>(URL_SEARCH_COURSE, {
            params: {
                q: query
            }
        })

        return data
    }
    catch (err) {
        console.error(err)
        throw err
    }
} 