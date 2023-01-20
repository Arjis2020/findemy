import { CommonError } from "../../API/responseTypes/common.type";
import { User } from "../../API/responseTypes/auth.type";
import { LoginAction } from "../actions/auth.action";
import { LoginActions } from "../constants";

export interface LoginStateAction {
    type?: string,
    data?: User,
    err?: CommonError
}

const initialState: LoginStateAction = {}

export const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LoginActions.LOGIN:
            return {
                ...state,
                data: action.data
            }
        case LoginActions.LOGIN_ERROR:
            return {
                ...state,
                err: action.err
            }
        case LoginActions.LOGOUT:
            return initialState
    }
    return state
}