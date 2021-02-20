import { all, call, put, takeEvery } from "redux-saga/effects";
import { FETCH_SET_USER_INFO, FETCH_SET_USER_PICTURE } from "../redux/actionTypes";
import { setUser } from "../redux/reducers/user";
import { userState } from "../redux/types";
import { setUserInfoRequest, setUserPictureRequest} from "../utils/userInfoService";

export function* setUserInfoAsync({ payload } : { type: string, forceReload: any, payload: userState}) {
    const data = yield call(()=>setUserInfoRequest(payload));
    const json = yield call(() => new Promise(res => res(data.json())))
    yield put(setUser(json));
    }

export function* watchSetUserInfo() {
    yield takeEvery(FETCH_SET_USER_INFO, setUserInfoAsync )
}

export function* setUserPictureAsync({ userPicture } : { type: string, forceReload: any, userPicture: string}) {
    const data = yield call(() => setUserPictureRequest(userPicture));
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