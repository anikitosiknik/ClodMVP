import { userState } from "../redux/types";
import { sampleFetch } from "./requestService";

export default class InfoRequestService {

    static setInfo(user: userState) {
        return this.infoFetch('/setInfo', {
            method: 'post',
            body: JSON.stringify(user),
        })
    }

    static setPicture(userPicture: string) {
        return this.infoFetch('/setPicture', {
            method: 'post',
            body: JSON.stringify({userPicture})
        })
    }


    static infoFetch(input: RequestInfo, init?: RequestInit | undefined): Promise<Response> {
        return sampleFetch(`/info${input}`, {
            headers: {
                'Content-Type': 'application/json'
            }, ...init
        })
    }
}