import { LoginError, User } from "../../API/responseTypes/auth.type"
import { LoginActions } from "../constants"

export type LoginAction = {
    data?: User,
    err?: LoginError
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

export type TriggerAuthorizeAction = {
    bearerToken: string
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

export const userData = (data: User) => {
    return {
        type: LoginActions.LOGIN,
        data
    }
}

export const userDataError = (err: LoginError) => {
    return {
        type: LoginActions.LOGIN_ERROR,
        err
    }
}

export const logoutUser = () => {
    return {
        type: LoginActions.LOGOUT
    }
}