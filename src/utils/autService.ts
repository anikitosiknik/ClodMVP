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

export function changePasswordRequest(payload:  {mail: string, password: string, code: string} ) {
    const baseUrl = getHref();

    return fetch(`${baseUrl}/reg`, {
        method: 'post',
        body: JSON.stringify(payload),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    
}
export function setMailCodeRequest(name: string, mail: string, password: string) {
    const baseUrl = getHref();

    return fetch(`${baseUrl}/setmailcode`, {
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

export  function checkMailCodeRequest(name: string ,mail: string, password: string, code: string) {
    const baseUrl = getHref();

    return fetch(`${baseUrl}/checkmailcode`, {
        method: 'post',
        body: JSON.stringify({
            name,
            mail,
            password,
            code
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
export function logOutRequest() {
    const baseUrl = getHref();
    
    return fetch(`${baseUrl}/logOut`, {
        method: 'get'
    })
}