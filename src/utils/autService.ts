import { sampleFetch } from "./requestService"

export function registerUserRequest(name: string, mail: string, password: string) {

    return sampleFetch(`/reg`, {
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

    return sampleFetch(`/reg`, {
        method: 'post',
        body: JSON.stringify(payload),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    
}
export function setMailCodeRequest(name: string, mail: string, password: string) {

    return sampleFetch(`/setmailcode`, {
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

    return sampleFetch(`/checkmailcode`, {
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

    return sampleFetch(`/login`, {
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
    
    return sampleFetch(`/autoLogin`, {
        method: 'get'
    })
}
export function logOutRequest() {
    
    return sampleFetch(`/logOut`, {
        method: 'get'
    })
}


