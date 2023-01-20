import { all, fork } from 'redux-saga/effects'

import authSaga from './auth.saga'
import courseSaga from './course.saga'

export function* rootSaga() {
    yield all([
        fork(authSaga),
        fork(courseSaga)
    ])
}