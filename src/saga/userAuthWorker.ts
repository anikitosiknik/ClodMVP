import { all, call, put, takeEvery } from "redux-saga/effects";
import { FETCH_AUTOLOGIN_USER, FETCH_SET_MAILCODE, FETCH_LOGIN_USER, FETCH_LOGOUT, FETCH_REGISTER_USER, FETCH_CHECK_MAILCODE, FETCH_CHANGE_PASSWORD } from "../redux/actionTypes";
import { fetchGetCloths, updateCloths } from "../redux/reducers/cloth";
import { fetchGetLooks } from "../redux/reducers/look";
import { fetchAutoLogin, fetchRegister, setMailCodeStatus, setUser } from "../redux/reducers/user";
import { registerUserRequest, loginUserRequest, autoLoginRequest, logOutRequest, setMailCodeRequest, checkMailCodeRequest, changePasswordRequest } from "../utils/autService";




export function* registerUserAsync({ payload }: { type: string, forceReload: any, payload: { name: string, mail: string, password: string } }) {
    const { name, mail, password } = payload;
    const data = yield call(() => registerUserRequest(name, mail, password));
    const json = yield call(() => new Promise(res => res(data.json())))
    yield put(setUser(json));
}

export function* watchRegisterUser() {
    yield takeEvery(FETCH_REGISTER_USER, registerUserAsync)
}

export function* setMailCodeAsync({ payload }: { type: string, forceReload: any, payload: { name: string, mail: string, password: string } }) {
    const { name, mail, password } = payload;
    const data: Response = yield call(() => setMailCodeRequest(name, mail, password))
    yield put(setMailCodeStatus(data.status === 200))
}

export function* watchSetMailCodeAsync() {
    yield takeEvery(FETCH_SET_MAILCODE, setMailCodeAsync)
}

export function* checkMailCodeAsync({ payload }: { type: string, forceReload: any, payload: { name: string, mail: string, password: string, code: string } }) {
    const { name, mail, password, code } = payload;
    const data: Response = yield call(() => checkMailCodeRequest(name, mail, password, code))
    const json = yield call(() => new Promise(res => res(data.json())))
    yield put(setUser(json));
    if (data.status === 200) yield put(fetchRegister({ name, mail, password }))
}

export function* watchCheckMailCode() {
    yield takeEvery(FETCH_CHECK_MAILCODE, checkMailCodeAsync)
}

export function* loginUserAsync({ payload }: { type: string, forceReload: any, payload: { mail: string, password: string } }) {
    try {
        const { mail, password } = payload;
        const data = yield call(() => loginUserRequest(mail, password));
        const json = yield call(() => new Promise(res => res(data.json())))
        yield put(setUser(json));
        yield put(fetchGetCloths())
        yield put(fetchGetLooks())
    }
    catch (error) {
        const er: Error = error;
        yield put(setUser({error: er.message}))
    }
}

export function* watchLoginUser() {
    yield takeEvery(FETCH_LOGIN_USER, loginUserAsync)
}

export function* autoLoginUserAsync() {
    try {
        const data = yield call(() => autoLoginRequest());
        const json = yield call(() => new Promise(res => res(data.json())))
        yield put(setUser(json));
        yield put(fetchGetCloths())
        yield put(fetchGetLooks())
    }
    catch (error) {
        console.log('autoLogin Failed')
    }
 
}

export function* watchAutoLoginUser() {
    yield takeEvery(FETCH_AUTOLOGIN_USER, autoLoginUserAsync)
}

export function* logOutUserAsync() {
    const data = yield call(() => logOutRequest());
    const json = yield call(() => new Promise(res => res(data.json())))
    yield put(updateCloths({}))
    yield put(setUser({
        logined: false,
        name: "",
        mail: "",
        chest: 0,
        waist: 0,
        hips: 0,
        height: 0,
        age: 0,
        skin: "",
        hair: "",
        eyes: "",
        country: "",
        city: "",
        // style: '',
        needChanges: false,
        isInfoSetted: false,
        userPicture: "",
        isMailCodeReady: false, ...json
    }));
}

export function* watchLogOutUser() {
    yield takeEvery(FETCH_LOGOUT, logOutUserAsync)
}

export function* changePasswordAsync({ payload }: { type: string, forceReload: any, payload: { mail: string, password: string, code: string } }) {
    const data = yield call(() => changePasswordRequest(payload));
    const json = yield call(() => new Promise(res => res(data.json())))
    yield put(setUser(json));
    yield put(fetchAutoLogin());
}

export function* watchChangePassword() {
    yield takeEvery(FETCH_CHANGE_PASSWORD, changePasswordAsync)
}

export default function* () {
    yield all([
        watchCheckMailCode(),
        watchSetMailCodeAsync(),
        watchLoginUser(),
        watchRegisterUser(),
        watchAutoLoginUser(),
        watchLogOutUser(),
        watchChangePassword()
    ])
}