import { all, call, put, takeEvery } from "redux-saga/effects";
import { FETCH_AUTOLOGIN_USER, FETCH_SET_MAILCODE, FETCH_LOGIN_USER, FETCH_LOGOUT, FETCH_REGISTER_USER, FETCH_CHECK_MAILCODE, FETCH_CHANGE_PASSWORD } from "../redux/actionTypes";
import { fetchGetCloths, updateCloths } from "../redux/reducers/cloth";
import { fetchGetLooks } from "../redux/reducers/look";
import { fetchAutoLogin, fetchRegister, setMailCodeStatus, setUser } from "../redux/reducers/user";
import AuthRequestService from "../utils/authRequestService";




export function* registerUserAsync({ payload }: { type: string, forceReload: any, payload: { name: string, mail: string, password: string } }) {
    try {
        const data = yield call(() => AuthRequestService.registerUser(payload));
        const json = yield call(() => new Promise(res => res(data.json())))
        yield put(setUser(json));
    }
    catch (error) {
        const er: Error = error;
        yield put(setUser({ error: er.message || "Duplicate Mail" }))
    }
}

export function* watchRegisterUser() {
    yield takeEvery(FETCH_REGISTER_USER, registerUserAsync)
}

export function* setMailCodeAsync({ payload }: { type: string, forceReload: any, payload: { name: string, mail: string, password: string } }) {
    const data: Response = yield call(() => AuthRequestService.setMailCode(payload))
    yield put(setMailCodeStatus(data.status === 200))
}

export function* watchSetMailCodeAsync() {
    yield takeEvery(FETCH_SET_MAILCODE, setMailCodeAsync)
}

export function* checkMailCodeAsync({ payload }: { type: string, forceReload: any, payload: { name: string, mail: string, password: string, code: string } }) {
    try {
        const data: Response = yield call(() => AuthRequestService.checkMailCode(payload))
        const json = yield call(() => new Promise(res => res(data.json())))
        yield put(setUser(json));
        if (data.status === 200) yield put(fetchRegister(payload))
    }
    catch {
        console.log('error')
    }
}

export function* watchCheckMailCode() {
    yield takeEvery(FETCH_CHECK_MAILCODE, checkMailCodeAsync)
}

export function* loginUserAsync({ payload }: { type: string, forceReload: any, payload: { mail: string, password: string } }) {
    try {
        const data = yield call(() => AuthRequestService.loginUser(payload));
        const json = yield call(() => new Promise(res => res(data.json())))
        yield put(setUser(json));
        yield put(fetchGetCloths())
        yield put(fetchGetLooks())
    }
    catch (error) {
        const er: Error = error;
        yield put(setUser({ error: er.message }))
    }
}

export function* watchLoginUser() {
    yield takeEvery(FETCH_LOGIN_USER, loginUserAsync)
}

export function* autoLoginUserAsync() {
    try {
        const data = yield call(() => AuthRequestService.autoLogin());
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
    const data = yield call(() => AuthRequestService.logOut());
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
    const data = yield call(() => AuthRequestService.changePassword(payload));
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