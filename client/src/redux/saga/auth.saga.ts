import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, put, takeEvery } from 'redux-saga/effects'
import { handleAuthorization, handleLogin, handleLogout, handleSignup } from '../../API/handlers/auth.handler'
import { ILoginForm } from '../../components/Login/EmailPassword'
import { ISignupForm } from '../../components/Signup/Details'
import IUserModel from '../../models/user.model'
import { loginError, logoutUser, setUserData, signupError } from '../reducers/auth.reducer'
import { setCart } from '../reducers/cart.reducer'
import { setPurchases } from '../reducers/purchase.reducer'

function* login(action?: PayloadAction<ILoginForm>) {
    try {
        const data: IUserModel = yield call(handleLogin, action!.payload!)

        yield put(
            setUserData({
                data,
                err: {
                    login: {},
                    signup: {}
                }
            })
        )
        yield put(
            setCart(data.cart)
        )
        yield put(
            setPurchases(data.purchases)
        )
    }
    catch (err: any) {
        yield put(
            loginError(err)
        )
    }
}

function* authorize() {
    try {
        const data: IUserModel = yield call(handleAuthorization)

        yield put(
            setUserData({
                data,
                err: {
                    login: {},
                    signup: {}
                }
            })
        )
        yield put(
            setCart(data.cart)
        )
        yield put(
            setPurchases(data.purchases)
        )
    }
    catch (err: any) {
        // console.log(err)
        yield put(
            setUserData({
                data: {
                    _id: "",
                    name: "",
                    email: "",
                    cart: {
                        orders: [],
                        totalDiscountedPrice: 0,
                        totalPrice: 0,
                        discount: 0,
                        discountPercentage: 0
                    },
                    purchases: []
                },
                err: {
                    login: {},
                    signup: {}
                }
            })
        )
    }
}

function* signup(action?: PayloadAction<ISignupForm>) {
    try {
        const data: IUserModel = yield call(handleSignup, action?.payload!)
        yield put(
            setUserData({
                data,
                err: {
                    login: {},
                    signup: {}
                }
            })
        )
    }
    catch (err: any) {
        yield put(
            signupError(err)
        )
    }
}

function* logout() {
    try {
        yield call(handleLogout)
        yield put(
            logoutUser()
        )
    }
    catch (err) {
        // console.log(err)
        console.log(err)
    }
}

function* loginSaga() {
    yield all([
        takeEvery("users/triggerLogin", login),
        takeEvery("users/triggerAuthorize", authorize),
        takeEvery("users/triggerLogout", logout),
        takeEvery("users/triggerSignup", signup)
    ])
}

export default loginSaga