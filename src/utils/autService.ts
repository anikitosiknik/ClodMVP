import { getHref } from "./enviroment"

export function registerUserRequest(name: string, mail: string, password: string) {
    const baseUrl = getHref();

    return fetch(`${baseUrl}/reg`, {
        method: 'post',
        referrerPolicy:'no-referrer',
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
        referrerPolicy:'no-referrer',
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