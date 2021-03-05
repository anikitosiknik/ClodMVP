import { UpdateLook } from "../redux/types";
import { sampleFetch } from "./requestService";

export function getLookAdminRequest() {

    return sampleFetch(`/looksAdmin`, {
        method: 'get',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

export function updateLookAdminRequest(payload: UpdateLook) {
    return sampleFetch(`/updateLookAdmin`, {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

export function getUserAdminRequest(mail: string) {

    return sampleFetch(`/user?mail=${mail}`,{
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}