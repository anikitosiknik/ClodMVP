import { all, call, put, takeEvery } from "redux-saga/effects";
import { FETCH_LOGIN_USER, FETCH_REGISTER_USER } from "../redux/actionTypes";
import { setUser } from "../redux/reducers/user";
import { registerUserRequest, loginUserRequest } from "../utils/autService";




export function* registerUserAsync({ payload } : { type: string, forceReload: any, payload: {name: string, mail: string, password: string}}) {
    const {name, mail, password} = payload;
    const data = yield call(()=>registerUserRequest(name, mail, password));
    const json = yield call(() => new Promise(res => res(data.json())))
    yield put(setUser(json));
    }

export function* watchRegisterUser() {
    yield takeEvery(FETCH_REGISTER_USER, registerUserAsync )
}

export function* loginUserAsync({ payload } : { type: string, forceReload: any, payload: {mail: string,password: string}}) {
    const {mail, password} = payload;
    const data = yield call(()=>loginUserRequest(mail, password));
    const json = yield call(() => new Promise(res => res(data.json())))
    yield put(setUser(json));
}

export function* watchLoginUser() {
    yield takeEvery(FETCH_LOGIN_USER, loginUserAsync )
}

export default function* () {
    yield all([
        watchLoginUser(),
        watchRegisterUser()
    ])
}