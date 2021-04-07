import { UpdateLook } from "../redux/types";
import RequestService from "./requestService";

export default class AdminRequestService extends RequestService {
    static apiRoute = '/admin'

    static getLooks() {
        return this.sampleFetch('/looks', {
            method: 'get',
        })
    }

    static updateLook(payload: UpdateLook) {
        return this.sampleFetch('/updateLook', {
            method: 'post',
            body: JSON.stringify(payload),
        })
    }

    static getUser(mail: string) {
        return this.sampleFetch(`/user?mail=${mail}`)
    }
}

