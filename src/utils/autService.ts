import { getHref } from "./enviroment"

export function registerUserRequest(name: string, mail: string, password: string) {
    const baseUrl = getHref();

    return fetch(`${baseUrl}/reg`, {
        method: 'post',
        body: JSON.stringify({
            name,
            mail,
            password
        }),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    
}

export function loginUserRequest(mail: string, password: string) {
    const baseUrl = getHref();

    return fetch(`${baseUrl}/login`, {
        method: 'post',
        body: JSON.stringify({
            mail,
            password
        }),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

export function autoLoginRequest() {
    const baseUrl = getHref();
    
    return fetch(`${baseUrl}/autoLogin`, {
        method: 'get'
    })
}