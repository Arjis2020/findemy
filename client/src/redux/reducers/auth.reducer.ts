import { LoginAction } from "../actions/auth.action";
import { LoginActions } from "../constants";

export interface LoginStateAction extends LoginAction {
    type?: string,
}

const initialState: LoginStateAction = {}

export const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LoginActions.LOGIN:
            return {
                ...state,
                data: action.data,
            }
        case LoginActions.LOGIN_ERROR:
            return {
                ...state,
                err: {
                    login: action.err
                }
            }
        case LoginActions.SIGNUP_ERROR:
            return {
                ...state,
                err: {
                    signup: action.err
                }
            }
        case LoginActions.LOGOUT:
            return initialState
    }
    return state
}