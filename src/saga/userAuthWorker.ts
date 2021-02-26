import { all, call, put, takeEvery } from "redux-saga/effects";
import { FETCH_AUTOLOGIN_USER, FETCH_SET_MAILCODE, FETCH_LOGIN_USER, FETCH_LOGOUT, FETCH_REGISTER_USER, FETCH_CHECK_MAILCODE } from "../redux/actionTypes";
import { fetchGetCloths, updateCloths } from "../redux/reducers/cloth";
import { fetchGetLooks } from "../redux/reducers/look";
import {  fetchRegister, setMailCodeStatus, setUser } from "../redux/reducers/user";
import { registerUserRequest, loginUserRequest, autoLoginRequest, logOutRequest, setMailCodeRequest, checkMailCodeRequest } from "../utils/autService";




export function* registerUserAsync({ payload } : { type: string, forceReload: any, payload: {name: string, mail: string, password: string}}) {
    const {name, mail, password} = payload;
    const data = yield call(()=>registerUserRequest(name, mail, password));
    const json = yield call(() => new Promise(res => res(data.json())))
    yield put(setUser(json));
    }

export function* watchRegisterUser() {
    yield takeEvery(FETCH_REGISTER_USER, registerUserAsync )
}

export function* setMailCodeAsync({ payload } : { type: string, forceReload: any, payload: {name: string, mail: string, password: string}}) {
    const {name, mail, password} = payload;
    const data: Response = yield call(() => setMailCodeRequest(name, mail, password))
    yield put(setMailCodeStatus(data.status === 200))
}

export function* watchSetMailCodeAsync() {
        yield takeEvery(FETCH_SET_MAILCODE, setMailCodeAsync)
}

export function* checkMailCodeAsync({ payload } : { type: string, forceReload: any, payload: {name: string, mail: string, password: string, code: string}}) {
    const {name, mail, password, code} = payload;
    const data: Response = yield call(() => checkMailCodeRequest(name, mail, password, code))
    if(data.status === 200) yield put(fetchRegister({name, mail, password}))
}

export function* watchCheckMailCode() {
    yield takeEvery(FETCH_CHECK_MAILCODE, checkMailCodeAsync)
}

export function* loginUserAsync({ payload } : { type: string, forceReload: any, payload: {mail: string,password: string}}) {
    const {mail, password} = payload;
    const data = yield call(()=>loginUserRequest(mail, password));
    const json = yield call(() => new Promise(res => res(data.json())))
    yield put(setUser(json));
    yield put(fetchGetCloths())
    yield put(fetchGetLooks())
}

export function* watchLoginUser() {
    yield takeEvery(FETCH_LOGIN_USER, loginUserAsync )
}

export function* autoLoginUserAsync() {
    const data = yield call(() => autoLoginRequest());
    const json = yield call(() => new Promise(res => res(data.json())))
    yield put(setUser(json));
    yield put(fetchGetCloths())
    yield put(fetchGetLooks())
}

export function* watchAutoLoginUser() {
    yield takeEvery(FETCH_AUTOLOGIN_USER, autoLoginUserAsync)
}

export function* logOutUserAsync() {
    const data = yield call(() => logOutRequest());
    const json = yield call(()=> new Promise(res => res(data.json())))
    yield put(updateCloths({}))
    yield put(setUser(json));
}

export function* watchLogOutUser() {
    yield takeEvery(FETCH_LOGOUT, logOutUserAsync)
}

export default function* () {
    yield all([
        watchCheckMailCode(),
        watchSetMailCodeAsync(),
        watchLoginUser(),
        watchRegisterUser(),
        watchAutoLoginUser(),
        watchLogOutUser(),
    ])
}