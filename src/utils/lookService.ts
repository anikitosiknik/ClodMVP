import { createdLook, lookList, lookState } from "../redux/types";
import { sampleFetch } from "./requestService";

export function createLookRequest(cloth: createdLook) {

    return sampleFetch(`/createLook`, {
        method: 'post',
        body: JSON.stringify(cloth),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}


export function getLookRequest() {

    return sampleFetch(`/looks`, {
        method: 'get',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

export function getLookIdsRequest(lookIds: string[]) {

    return sampleFetch(`/looksIds`, {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify(lookIds),
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

export function deleteLooskRequest(lookId: string[]) {

    return sampleFetch(`/looks`, {
        method: 'delete',
        mode: 'cors',
        body: JSON.stringify(lookId),
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

export function toggleLikeLookRequest(lookId: string) {

    return sampleFetch(`/looksLike`, {
        method: 'put',
        mode: 'cors',
        body: JSON.stringify({
            a: lookId
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
}


export function looksObjectToList(looks: lookState): lookList {
    const lookList: lookList = [];
    for (let look in looks) {
        lookList.push(looks[look])
    }
    return lookList;
}
 