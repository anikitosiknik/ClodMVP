import { all, call, put, takeEvery } from "redux-saga/effects";
import { FETCH_AUTOLOGIN_USER, FETCH_LOGIN_USER, FETCH_LOGOUT, FETCH_REGISTER_USER } from "../redux/actionTypes";
import { fetchGetCloths, updateCloths } from "../redux/reducers/cloth";
import { setUser } from "../redux/reducers/user";
import { registerUserRequest, loginUserRequest, autoLoginRequest, logOutRequest } from "../utils/autService";




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
    yield put(fetchGetCloths())
}

export function* watchLoginUser() {
    yield takeEvery(FETCH_LOGIN_USER, loginUserAsync )
}

export function* autoLoginUserAsync() {
    const data = yield call(() => autoLoginRequest());
    const json = yield call(() => new Promise(res => res(data.json())))
    yield put(setUser(json));
    yield put(fetchGetCloths())
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
        watchLoginUser(),
        watchRegisterUser(),
        watchAutoLoginUser(),
        watchLogOutUser(),
    ])
}