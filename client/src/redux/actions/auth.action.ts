import { IAuthError } from "../../API/responseTypes/auth.type"
import IUserModel from "../../models/user.model"
import { LoginActions } from "../constants"

export type LoginAction = {
    data?: IUserModel,
    err?: IAuthError,
}

export type TriggerLoginAction = {
    email: string,
    password: string
}

export type TriggerSignupAction = {
    name: string,
    email: string,
    password: string
}

export const triggerLogin = ({ email, password }: TriggerLoginAction) => {
    return {
        type: LoginActions.TRIGGER_LOGIN,
        email,
        password
    }
}

export const triggerUserAuthorize = () => {
    return {
        type: LoginActions.TRIGGER_AUTHORIZE
    }
}

export const triggerSignup = ({ email, password, name }: TriggerSignupAction) => {
    return {
        type: LoginActions.TRIGGER_SIGNUP,
        email,
        name,
        password
    }
}

export const triggerLogout = () => {
    return {
        type: LoginActions.TRIGGER_LOGOUT
    }
}

export const userData = (data: IUserModel) => {
    return {
        type: LoginActions.LOGIN,
        data
    }
}

export const loginError = (err: IAuthError) => {
    return {
        type: LoginActions.LOGIN_ERROR,
        err
    }
}

export const signupError = (err : IAuthError) => {
    return {
        type: LoginActions.SIGNUP_ERROR,
        err
    }
}

export const logoutUser = () => {
    return {
        type: LoginActions.LOGOUT
    }
}

/**
 * @description Resets all authentication errors on the client side. Use with caution!
 * @returns 
 */
export const resetAuthErrors = () => {
    return {
        type: LoginActions.RESET_ERRORS
    }
}