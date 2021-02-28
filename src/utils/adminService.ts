import { getHref } from "./enviroment";
import { UpdateLook } from '../components/adminPage/AdminPage';

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