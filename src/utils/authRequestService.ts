import RequestService from "./requestService"

export default class AuthRequestService extends RequestService {
    static apiRoute = '/auth';

    static registerUser(payload: { name: string, mail: string, password: string }) {
        return this.sampleFetch(`/registration`, {
            method: 'post',
            body: JSON.stringify(payload),
        })
    }

    static changePassword(payload: { mail: string, password: string, code: string }) {
        return this.sampleFetch(`/registration`, {
            method: 'post',
            body: JSON.stringify(payload),
        })
    }

    static checkMailCode(payload: { name: string, mail: string, password: string, code: string }) {
        return this.sampleFetch(`/checkmailcode`, {
            method: 'post',
            body: JSON.stringify(payload),
        })

    }

    static setMailCode(payload: { name: string, mail: string, password: string }) {
        return this.sampleFetch(`/setmailcode`, {
            method: 'post',
            body: JSON.stringify(payload),
        })

    }

    static loginUser(payload: { mail: string, password: string }) {
        return this.sampleFetch(`/login`, {
            method: 'post',
            body: JSON.stringify(payload),
        })
    }

    static autoLogin() {
        return this.sampleFetch(`/autoLogin`)
    }

    static logOut() {
        return this.sampleFetch(`/logOut`)
    }

}


