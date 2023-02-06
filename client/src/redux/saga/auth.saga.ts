import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, put, takeEvery } from 'redux-saga/effects'
import { handleAuthorization, handleLogin, handleLogout, handleSignup } from '../../API/handlers/auth.handler'
import { ILoginForm } from '../../components/Login/EmailPassword'
import { ISignupForm } from '../../components/Signup/Details'
import IUserModel from '../../models/user.model'
import { loginError, logoutUser, resetUserData, setUserData, signupError } from '../reducers/auth.reducer'
import { resetCart, setCart } from '../reducers/cart.reducer'
import { resetPurchases, setPurchases } from '../reducers/purchase.reducer'
import { UserSagaActions } from '../saga.constants'

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
            resetUserData()
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
        yield put(
            resetCart()
        )
        yield put(
            resetPurchases()
        )
    }
    catch (err) {
        // console.log(err)
        console.log(err)
    }
}

function* loginSaga() {
    yield all([
        takeEvery(UserSagaActions.TRIGGER_LOGIN, login),
        takeEvery(UserSagaActions.TRIGGER_AUTHORIZE, authorize),
        takeEvery(UserSagaActions.TRIGGER_LOGOUT, logout),
        takeEvery(UserSagaActions.TRIGGER_SIGNUP, signup)
    ])
}

export default loginSaga