import { all, call, put, takeLatest } from "redux-saga/effects";
import { FETCH_CREATE_CLOTH, FETCH_GET_CLOTHS } from "../redux/actionTypes";
import { fetchGetCloths, updateCloths } from "../redux/reducers/cloth";
import { cloth } from "../redux/types";
import { createClothRequest, getClothsRequest } from "../utils/clothsService";

export function* createClothAsync({ payload } : { type: string, forceReload: any, payload: cloth}) {
     yield call(()=>createClothRequest(payload));
     yield put(fetchGetCloths());
    }

export function* watchCreateCloth() {
    yield takeLatest(FETCH_CREATE_CLOTH, createClothAsync )
}

export function* getClothsAsync() {
    const data = yield call(() => getClothsRequest());
    const json = yield call(() => new Promise(res => res(data.json())))
    yield put(updateCloths(json))
}

export function* watchGetCloths() {
    yield takeLatest(FETCH_GET_CLOTHS, getClothsAsync )
}



export default function* () {
    yield all([
        watchCreateCloth(),
        watchGetCloths()
    ])
}