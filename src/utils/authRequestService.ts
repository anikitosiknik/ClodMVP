import { sampleFetch } from "./requestService"


export default class AuthRequestService {

    static registerUser(payload: { name: string, mail: string, password: string }) {
        return this.authFetch(`/registration`, {
            method: 'post',
            body: JSON.stringify(payload),
        })
    }

    static changePassword(payload: { mail: string, password: string, code: string }) {
        return this.authFetch(`/registration`, {
            method: 'post',
            body: JSON.stringify(payload),
        })
    }

    static checkMailCode(payload: { name: string, mail: string, password: string, code: string }) {
        return this.authFetch(`/checkmailcode`, {
            method: 'post',
            body: JSON.stringify(payload),
        })

    }

    static setMailCode(payload: { name: string, mail: string, password: string }) {
        return this.authFetch(`/setmailcode`, {
            method: 'post',
            body: JSON.stringify(payload),
        })

    }

    static loginUser(payload: { mail: string, password: string }) {
        return this.authFetch(`/login`, {
            method: 'post',
            body: JSON.stringify(payload),
        })
    }

    static autoLogin() {
        return this.authFetch(`/autoLogin`)
    }

    static logOut() {
        return this.authFetch(`/logOut`)
    }


    static authFetch(input: RequestInfo, init?: RequestInit | undefined): Promise<Response> {
        return sampleFetch(`/auth${input}`, {
            headers: {
                'Content-Type': 'application/json'
            }, ...init
        })
    }
}


