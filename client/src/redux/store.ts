import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import rootReducer from "./reducers";
import { rootSaga } from "./saga";

const sageMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: rootReducer,
    middleware: () => [sageMiddleware]
})

sageMiddleware.run(rootSaga)

export default store