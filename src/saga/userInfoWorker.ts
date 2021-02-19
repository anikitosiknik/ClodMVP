import { all, call, put, takeEvery } from "redux-saga/effects";
import { FETCH_SET_USER_INFO } from "../redux/actionTypes";
import { setUser } from "../redux/reducers/user";
import { userState } from "../redux/types";
import { setUserInfoRequest} from "../utils/userInfoService";

export function* setUserInfoAsync({ payload } : { type: string, forceReload: any, payload: userState}) {
    const data = yield call(()=>setUserInfoRequest(payload));
    const json = yield call(() => new Promise(res => res(data.json())))
    yield put(setUser(json));
    }

export function* watchSetUserInfo() {
    yield takeEvery(FETCH_SET_USER_INFO, setUserInfoAsync )
}

export default function* () {
    yield all([
        watchSetUserInfo(),
    ])
}