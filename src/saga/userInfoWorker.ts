import { all, call, put, takeEvery } from "redux-saga/effects";
import { FETCH_SET_USER_INFO, FETCH_SET_USER_PICTURE } from "../redux/actionTypes";
import { setUser } from "../redux/reducers/user";
import { userState } from "../redux/types";
import InfoRequestService from "../utils/InfoRequestService";

export function* setUserInfoAsync({ payload }: { type: string, forceReload: any, payload: userState }) {
    try {
        const data = yield call(() => InfoRequestService.setInfo(payload));
        const json = yield call(() => new Promise(res => res(data.json())))
        yield put(setUser(json));
    }
    catch (error) {
        const er: Error = error;
        yield put(setUser({error: er.message}))
    }
}

export function* watchSetUserInfo() {
    yield takeEvery(FETCH_SET_USER_INFO, setUserInfoAsync)
}

export function* setUserPictureAsync({ userPicture }: { type: string, forceReload: any, userPicture: string }) {
    const data = yield call(() => InfoRequestService.setPicture(userPicture));
    const json = yield call(() => new Promise(res => res(data.json())));
    yield put(setUser(json));
}

export function* watchSetUserPicture() {
    yield takeEvery(FETCH_SET_USER_PICTURE, setUserPictureAsync)
}

export default function* () {
    yield all([
        watchSetUserInfo(),
        watchSetUserPicture()
    ])
}