import { UpdateLook } from "../redux/types";
import { getHref } from "./enviroment";

export function getLookAdminRequest() {
    const baseUrl = getHref();

    return fetch(`${baseUrl}/looksAdmin`, {
        method: 'get',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

export function updateLookAdminRequest(payload: UpdateLook) {
    const baseUrl = getHref();

    return fetch(`${baseUrl}/updateLookAdmin`, {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

export function getUserAdminRequest(mail: string) {
    const baseUrl = getHref();

    return fetch(`${baseUrl}/user?mail=${mail}`,{
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}