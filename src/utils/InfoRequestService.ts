import { userState } from "../redux/types";
import RequestService from "./requestService";

export default class InfoRequestService extends RequestService {
    static apiRoute = '/info'

    static setInfo(user: userState) {
        return this.sampleFetch('/setInfo', {
            method: 'post',
            body: JSON.stringify(user),
        })
    }

    static setPicture(userPicture: string) {
        return this.sampleFetch('/setPicture', {
            method: 'post',
            body: JSON.stringify({userPicture})
        })
    }
}