import { all, call, put, takeEvery } from "redux-saga/effects";
import { getAllCourses } from "../../API/handlers/course.handler";
import { setCourses } from "../actions/course.action";
import { CourseActions } from "../constants";

function* getCourses() {
    try {
        const data : Array<Course> = yield call(getAllCourses)
        yield put(
            setCourses(data)
        )
    }
    catch (err: any) {
        console.error(err)
    }
}

export default function* courseSaga() {
    yield all([
        takeEvery(CourseActions.TRIGGER_GET_ALL, getCourses)
    ])
}