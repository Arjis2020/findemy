import axios from "axios";
import { URL_AUTHORIZE, URL_LOGIN, URL_LOGOUT, URL_SIGNUP } from "../endpoints";

export const handleLogin = async (email: string, password: string): Promise<User> => {
    try {
        const { data } = await axios.post<User>(URL_LOGIN, {
            email,
            password
        })
        return data
    }
    catch (err: any) {
        console.error(err);
        throw {
            err: {
                status: err.response.status,
                data: err.response.data
            }
        }
    }
}

export const handleAuthorization = async (): Promise<User> => {
    try {
        const { data } = await axios.post<User>(URL_AUTHORIZE)
        return data
    }
    catch (err: any) {
        console.error(err)
        throw {
            err: {
                status: err.response.status,
                data: err.response.data
            }
        }
    }
}

export const handleSignup = async (name: string, email: string, password: string): Promise<User> => {
    try {
        const { data } = await axios.post<User>(URL_SIGNUP, {
            name,
            email,
            password
        })

        return data
    }
    catch (err: any) {
        console.error(err);
        throw {
            err: {
                status: err.response.status,
                data: err.response.data
            }
        }
    }
}

export const handleLogout = async () : Promise<void> => {
    try {
        await axios.post(URL_LOGOUT)
    }
    catch (err: any) {
        console.log(err)
        throw {
            err: {
                status: err.response.status,
                data: err.response.data
            }
        }
    }
}