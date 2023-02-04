import { all, call, put, takeEvery } from "redux-saga/effects";
import { getAllCourses } from "../../API/handlers/course.handler";
import ICourseModel from "../../models/course.model";
import { setCourses } from "../reducers/course.reducer";

function* getCourses() {
    try {
        const data: ICourseModel[] = yield call(getAllCourses)
        yield put(
            setCourses({ data, isLoading: false })
        )
    }
    catch (err: any) {
        console.error(err)
    }
}

export default function* courseSaga() {
    yield all([
        takeEvery("courses/fetchCourses", getCourses)
    ])
}