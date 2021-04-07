import { all, call, put, takeLatest } from "redux-saga/effects";
import { FETCH_GET_LOOKS_ADMIN, FETCH_GET_LOOK_IDS_ADMIN, FETCH_UPDATE_LOOK_ADMIN } from "../redux/actionTypes";
import { fetchGetLookIdsAdmin, fetchGetLooksAdmin, updateLooksAdmin } from "../redux/reducers/admin";
import { clothInLookIds, lookList, UpdateLook } from "../redux/types";
import { getLookAdminRequest, updateLookAdminRequest } from "../utils/adminService";
import LooksRequestService from "../utils/looksRequestService";
import { lookListToObject } from "./lookWorker";

export function* getLooksAdmin() {
    const data = yield call(() => getLookAdminRequest());
    const json: lookList = yield call(() => new Promise(res => res(data.json())))
    yield put(fetchGetLookIdsAdmin(json));
}

export function* watchGetLooks() {
    yield takeLatest(FETCH_GET_LOOKS_ADMIN, getLooksAdmin )
}


export function* getLookIdsAdminAsync({ payload } : {type: string, forceReload: any, payload: lookList}) {
    const data = yield call(() => LooksRequestService.getByIds(payload.map(look=>look.id)))
    const json: clothInLookIds = yield call(() => new Promise(res => res(data.json())))
    const lookList = payload.map( (look,index) => ({...look, clothIds: json[index].map( clothInLook=>clothInLook.cloth_id)}))
    yield put(updateLooksAdmin(lookListToObject(lookList)))
}

export function* watchGetLookIdsAdmin () {
    yield takeLatest(FETCH_GET_LOOK_IDS_ADMIN, getLookIdsAdminAsync )

}

export function* updateLookAdminAsync ({ payload } : {type: string, forceReload: any, payload: UpdateLook}) {
    yield call(() => updateLookAdminRequest(payload))
    yield put(fetchGetLooksAdmin())
}

export function* watchUpdateLookAdmin() {
    yield takeLatest(FETCH_UPDATE_LOOK_ADMIN, updateLookAdminAsync)
}

export default function* () {
    yield all([
        watchGetLookIdsAdmin(),
        watchGetLooks(),
        watchUpdateLookAdmin()
    ])
}