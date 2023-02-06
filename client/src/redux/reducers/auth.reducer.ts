import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IUserModel from "../../models/user.model";
import { IAuthError, ILoginError } from "../../API/responseTypes/auth.type";
import { ILoginForm } from "../../components/Login/EmailPassword";
import { ISignupForm } from "../../components/Signup/Details";

interface ILogin {
    data: IUserModel;
    err: IAuthError;
    isLoading?: boolean | false;
}

const initialState: ILogin = {
    data: {
        _id: "",
        name: "",
        email: "",
        purchases: [],
        cart: {
            totalDiscountedPrice: 0,
            totalPrice: 0,
            orders: [],
            discount: 0,
            discountPercentage: 0
        }
    },
    err: {
        login: {},
        signup: {}
    },
    isLoading: false
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        triggerLogin: (store, action: PayloadAction<ILoginForm>) => {
            store.isLoading = true
        },
        triggerSignup: (store, action: PayloadAction<ISignupForm>) => {
            store.isLoading = true
        },
        triggerAuthorize: (store) => {
            store.isLoading = true
        },
        triggerLogout: (store) => {
            store.isLoading = true
        },
        logoutUser: (store) => {
            store = initialState
            return store
        },
        resetUserData: (store) => {
            store = initialState
            return store
        },
        setUserData: (store, action: PayloadAction<ILogin>) => {
            store = action.payload
            store.isLoading = false
            return store
        },
        loginError: (store, action: PayloadAction<ILoginError>) => {
            store.err.login = action.payload
            store.isLoading = false
            return store
        },
        signupError: (store, action: PayloadAction<ILoginError>) => {
            store.err.signup = action.payload
            store.isLoading = false
            return store
        },
        resetAuthErrors: (store) => {
            store.err = { login: {}, signup: {} }
            store.isLoading = false
            return store
        }
    }
})

export const { triggerLogin, triggerSignup, triggerAuthorize, triggerLogout, setUserData, resetUserData, loginError, signupError, resetAuthErrors, logoutUser } = userSlice.actions
export default userSlice.reducer