import { all, fork } from 'redux-saga/effects'

import authSaga from './auth.saga'
import cartSaga from './cart.saga'
import courseSaga from './course.saga'
import purchaseSaga from './purchase.saga'

export function* rootSaga() {
    yield all([
        fork(authSaga),
        fork(courseSaga),
        fork(cartSaga),
        fork(purchaseSaga)
    ])
}