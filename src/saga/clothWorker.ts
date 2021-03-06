import { all, call, put, takeLatest } from "redux-saga/effects";
import { FETCH_CREATE_CLOTH, FETCH_GET_CLOTHS, FETCH_DELETE_CLOTH, FETCH_GET_CLOTHS_BY_ID } from "../redux/actionTypes";
import { fetchGetCloths, deleteCloths, addCloths, updateCloths } from "../redux/reducers/cloth";
import { setUser } from "../redux/reducers/user";
import ClothRequestService, {  Cloth, ClothType } from "../utils/clothRequestService";

export function* createClothAsync({ payload }: { type: string, forceReload: any, payload: Cloth }) {
    try {
        yield call(() => ClothRequestService.create(payload));
        yield put(fetchGetCloths());
    }
    catch (error) {
        const er: Error = error;
        if(er.message === 'Unauthorized' ) {
             yield put(setUser({logined: false}))
        } else
        yield put(setUser({ error: er.message}))
    }
}

export function* watchCreateCloth() {
    yield takeLatest(FETCH_CREATE_CLOTH, createClothAsync)
}

export function* getClothsAsync() {
    try {
        const data = yield call(() => ClothRequestService.get());
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
    yield call(() => ClothRequestService.delete(payload));
    yield put(deleteCloths(payload));
}

export function* watchDeleteCloth() {
    yield takeLatest(FETCH_DELETE_CLOTH, deleteClothAsync)
}

export function* getClothsById({ payload }: { type: string, forceReload: any, payload: string[] }) {
    const data = yield call(() => ClothRequestService.getById(payload))
    const json: ClothType[] = yield call(() => new Promise(res => res(data.json())))
    yield put(addCloths(Cloth.listToObject(json)))
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