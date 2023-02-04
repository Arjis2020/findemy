import { all, call, put, takeEvery } from 'redux-saga/effects'
import { handleAuthorization, handleLogin, handleLogout, handleSignup } from '../../API/handlers/auth.handler'
import IUserModel from '../../models/user.model'
import { logoutUser, TriggerLoginAction, TriggerSignupAction, userData, loginError, signupError } from '../actions/auth.action'
import { setCart } from '../actions/cart.action'
import { setPurchases } from '../actions/purchase.action'
import { LoginActions } from '../constants'

function* login(action?: TriggerLoginAction) {
    try {
        const data: IUserModel = yield call(handleLogin, action!.email, action!.password)
        yield put(
            userData(data)
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
            userData(data)
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
    }
}

function* signup(action?: TriggerSignupAction) {
    try {
        const data: IUserModel = yield call(handleSignup, action!.name, action!.email, action!.password)
        yield put(
            userData(data)
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
    }
}

function* loginSaga() {
    yield all([
        takeEvery(LoginActions.TRIGGER_LOGIN, login),
        takeEvery(LoginActions.TRIGGER_AUTHORIZE, authorize),
        takeEvery(LoginActions.TRIGGER_LOGOUT, logout),
        takeEvery(LoginActions.TRIGGER_SIGNUP, signup)
    ])
}

export default loginSaga