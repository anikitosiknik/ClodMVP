import { all, call, put, takeLatest } from "redux-saga/effects";
import { FETCH_CREATE_CLOTH, FETCH_GET_CLOTHS, FETCH_DELETE_CLOTH, FETCH_GET_CLOTHS_BY_ID } from "../redux/actionTypes";
import { fetchGetCloths, updateCloths, deleteCloths } from "../redux/reducers/cloth";
import { setUser } from "../redux/reducers/user";
import { getClothsByIdRequest, createClothRequest, getClothsRequest, deleteClothRequest, Cloth, ClothType } from "../utils/clothsService";

export function* createClothAsync({ payload }: { type: string, forceReload: any, payload: Cloth }) {
    try {
        yield call(() => createClothRequest(payload));
        yield put(fetchGetCloths());
    }
    catch (error) {
        const er: Error = error;
        if (er.message === "Payment Required") {
            yield put(setUser({ error: 'Payment Required' }))
        }
        else {
            yield put(setUser({ error: 'maxCloth' }))
        }
    }
}

export function* watchCreateCloth() {
    yield takeLatest(FETCH_CREATE_CLOTH, createClothAsync)
}

export function* getClothsAsync() {
    try {
        const data = yield call(() => getClothsRequest());
        const json: ClothType[] = yield call(() => new Promise(res => res(data.json())))
        yield put(updateCloths(Cloth.listToObject(json)))
    }
    catch (error) {
        const er: Error = error;
        yield put(setUser({ error: er.message }))
    }

}

export function* watchGetCloths() {
    yield takeLatest(FETCH_GET_CLOTHS, getClothsAsync)
}

export function* deleteClothAsync({ payload }: { type: string, forceReload: any, payload: string[] }) {
    yield call(() => deleteClothRequest(payload));
    yield put(deleteCloths(payload));
}

export function* watchDeleteCloth() {
    yield takeLatest(FETCH_DELETE_CLOTH, deleteClothAsync)
}

export function* getClothsById({ payload }: { type: string, forceReload: any, payload: string[] }) {
    const data = yield call(() => getClothsByIdRequest(payload))
    const json: ClothType[] = yield call(() => new Promise(res => res(data.json())))
    yield put(updateCloths(Cloth.listToObject(json)))
}

export function* watchGetClothsById() {
    yield takeLatest(FETCH_GET_CLOTHS_BY_ID, getClothsById)
}

export default function* () {
    yield all([
        watchCreateCloth(),
        watchGetCloths(),
        watchDeleteCloth(),
        watchGetClothsById()
    ])
}