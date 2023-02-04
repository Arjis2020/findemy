import axios from "axios";
import IUserModel from "../../models/user.model";
import { URL_AUTHORIZE, URL_FORGOT_PASSWORD, URL_LOGIN, URL_LOGOUT, URL_RESET_PASSWORD, URL_SIGNUP } from "../endpoints";

export const handleLogin = async (email: string, password: string): Promise<IUserModel> => {
    try {
        const { data } = await axios.post<IUserModel>(URL_LOGIN, {
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

export const handleAuthorization = async (): Promise<IUserModel> => {
    try {
        const { data } = await axios.post<IUserModel>(URL_AUTHORIZE)
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

export const handleSignup = async (name: string, email: string, password: string): Promise<IUserModel> => {
    try {
        const { data } = await axios.post<IUserModel>(URL_SIGNUP, {
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

export const handleLogout = async (): Promise<void> => {
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

export const forgotPassword = async (email: string): Promise<void> => {
    try {
        await axios.post<void>(URL_FORGOT_PASSWORD, {
            email
        })
    }
    catch (err: any) {
        console.error(err)
        throw new Error(err)
    }
}

export const resetPassword = async (password: string, token: string): Promise<void> => {
    try {
        await axios.put<void>(URL_RESET_PASSWORD, {
            password
        }, {
            headers: {
                'x-auth-token': token
            }
        })
    }
    catch (err: any) {
        console.error(err)
        throw new Error(err)
    }
}