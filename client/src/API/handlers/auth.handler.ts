import axios from "axios";
import UserModel from "../../models/user.model";
import { URL_AUTHORIZE, URL_LOGIN, URL_LOGOUT, URL_SIGNUP } from "../endpoints";

export const handleLogin = async (email: string, password: string): Promise<UserModel> => {
    try {
        const { data } = await axios.post<UserModel>(URL_LOGIN, {
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

export const handleAuthorization = async (): Promise<UserModel> => {
    try {
        const { data } = await axios.post<UserModel>(URL_AUTHORIZE)
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

export const handleSignup = async (name: string, email: string, password: string): Promise<UserModel> => {
    try {
        const { data } = await axios.post<UserModel>(URL_SIGNUP, {
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