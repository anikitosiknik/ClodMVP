import { call, takeEvery } from "redux-saga/effects";

export function* setUserInfoAsync({ payload } : { type: string, forceReload: any, payload: {name: string, mail: string, password: string}}) {
    const {name, mail, password} = payload;
   
    }

export function* watchRegisterUser() {
    yield takeEvery('a', setUserInfoAsync )
}