import { all, call, put, takeEvery } from 'redux-saga/effects'
import { handleAuthorization, handleLogin, handleLogout, handleSignup } from '../../API/handlers/auth.handler'
import { logoutUser, TriggerLoginAction, TriggerSignupAction, userData, loginError, signupError } from '../actions/auth.action'
import { setCart, setCartAll } from '../actions/cart.action'
import { LoginActions } from '../constants'

function* login(action?: TriggerLoginAction) {
    try {
        const data: User = yield call(handleLogin, action!.email, action!.password)
        yield put(
            userData(data)
        )
        yield put(
            setCartAll(data.cart)
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
        const data: User = yield call(handleAuthorization)

        yield put(
            userData(data)
        )
        yield put(
            setCartAll(data.cart)
        )
    }
    catch (err: any) {
        // console.log(err)
    }
}

function* signup(action?: TriggerSignupAction) {
    try {
        const data: User = yield call(handleSignup, action!.name, action!.email, action!.password)
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