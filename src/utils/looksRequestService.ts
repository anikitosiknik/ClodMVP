import { createdLook, lookList, lookState } from "../redux/types";
import RequestService from "./requestService";

export default class LooksRequestService extends RequestService {
    static apiRoute = '/looks'

    static create(cloth: createdLook) {
        return this.sampleFetch(`/create`, {
            method: 'post',
            body: JSON.stringify(cloth),
        })
    }

    static get() {
        return this.sampleFetch()
    }

    static getByIds(lookIds: string[]) {
        return this.sampleFetch('/getByIds', {
            method: 'post',
            body: JSON.stringify(lookIds),
        })
    }

    static delete(lookIds: string[]) {
        return this.sampleFetch('', {
            method: 'delete',
            body: JSON.stringify(lookIds),
        })
    }


    static changeType(payload: { id: string, category: string }) {
        return this.sampleFetch('/changeType', {
            method: 'put',
            body: JSON.stringify(payload),
        })
    }

    static toggleLike(lookId: string) {
        return this.sampleFetch('/toggleLike', {
            method: 'put',
            body: JSON.stringify({ lookId }),
        })
    }

}




export function looksObjectToList(looks: lookState): lookList {
    const lookList: lookList = [];
    for (let look in looks) {
        lookList.push(looks[look])
    }
    return lookList;
}
