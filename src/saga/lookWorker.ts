import { all, call, put, takeLatest } from "redux-saga/effects";
import { FETCH_TOGGLE_LIKE_LOOK, FETCH_CREATE_LOOK, FETCH_DELETE_LOOKS, FETCH_GET_LOOKS, FETCH_GET_LOOK_IDS, FETCH_CHANGE_CATEGORY_LOOK } from "../redux/actionTypes";
import { fetchGetLookIds, fetchGetLooks, updateLooks } from "../redux/reducers/look";
import { setUser } from "../redux/reducers/user";
import { createdLook, lookList, lookState, Look, clothInLookIds } from "../redux/types";
import { deleteLooskRequest, createLookRequest, getLookIdsRequest, getLookRequest, toggleLikeLookRequest, changeCategoryLookRequest } from "../utils/lookService";


export function* createLookAsync({ payload }: { type: string, forceReload: any, payload: createdLook }) {
    try {
        yield call(() => createLookRequest(payload));
        yield put(setUser({error: 'clothCreated'}))
        yield put(fetchGetLooks());
    }
    catch {
        yield put(setUser({error: 'maxLook'}))
    }
}

export function* watchCreateLook() {
    yield takeLatest(FETCH_CREATE_LOOK, createLookAsync)
}

export function* getLooksAsync() {
    try {
        const data = yield call(() => getLookRequest());
        const json: lookList = yield call(() => new Promise(res => res(data.json())))
        yield put(fetchGetLookIds(json));
    }
    catch (error) {
        const er: Error = error;
        yield put(setUser({ error: er.message }))
    }
}

export function* watchGetLooks() {
    yield takeLatest(FETCH_GET_LOOKS, getLooksAsync)
}

export function* getLookIdsAsync({ payload }: { type: string, forceReload: any, payload: lookList }) {
    const data = yield call(() => getLookIdsRequest(payload.map(look => look.id)))
    const json: clothInLookIds = yield call(() => new Promise(res => res(data.json())))
    const lookList = payload.map((look, index) => ({ ...look, clothIds: json[index].map(clothInLook => clothInLook.cloth_id) }))
    yield put(updateLooks(lookListToObject(lookList)))
}

export function* watchGetLookIds() {
    yield takeLatest(FETCH_GET_LOOK_IDS, getLookIdsAsync)
}

export function* deleteLooksAsync({ payload }: { type: string, forceReload: any, payload: string[] }) {
    yield call(() => deleteLooskRequest(payload))
    yield put(fetchGetLooks())
}

export function* watchDeleteLook() {
    yield takeLatest(FETCH_DELETE_LOOKS, deleteLooksAsync)
}

export function* toggleLikeLookAsync({ payload }: { type: string, forceReload: any, payload: string }) {
    const data = yield call(() => toggleLikeLookRequest(payload))
    const json: lookList = yield call(() => new Promise(res => res(data.json())))
    yield put(fetchGetLookIds(json));
}

export function* watchToggleLikeLook() {
    yield takeLatest(FETCH_TOGGLE_LIKE_LOOK, toggleLikeLookAsync)

}

export function* changeCategoryLookAsync({ payload }: { type: string, forceReload: any, payload: {id: string, category: string} }) {
    yield call(() => changeCategoryLookRequest(payload))
    yield put(fetchGetLooks())
}

export function* watchChangeCategoryLook() {
    yield takeLatest(FETCH_CHANGE_CATEGORY_LOOK, changeCategoryLookAsync)
}

export default function* () {
    yield all([
        watchGetLooks(),
        watchCreateLook(),
        watchGetLookIds(),
        watchDeleteLook(),
        watchToggleLikeLook(),
        watchChangeCategoryLook()
    ])
}


export function lookListToObject(looks: lookList): lookState {
    const looksObject: lookState = {};
    looks.forEach((cloth: Look) => {
        looksObject[cloth.id] = {
            ...cloth,
        }
    })
    return looksObject;
}

export function clothObjectToList(looks: lookState): lookList {
    const lookList: lookList = [];
    for (let lookId in looks) {
        lookList.push(looks[lookId])
    }
    return lookList;
}