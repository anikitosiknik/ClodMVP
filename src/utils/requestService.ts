
export default class RequestService {
    static rootRoute = getHref();
    static apiRoute = '';


    static sampleFetch(input: string = '', init?: RequestInit | undefined): Promise<Response> {
        return fetch(`${this.rootRoute}${this.apiRoute}${input}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            ...init
        }).then(handleErrors);
    }
}

export function sampleFetch(input: RequestInfo, init?: RequestInit | undefined): Promise<Response> {
    const baseUrl = getHref();

    return fetch(`${baseUrl}${input}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        ...init
    }).then(handleErrors);
}

function getHref() {
    return  '/api';
}




 function handleErrors(response: Response) {
    if (!response.ok) {
        if (response.status === 402) {
            throw new UserException('Payment Required');
        }
        if (response.status === 401) {
            throw new UserException('Unauthorized');
        }
        return response.json().then(e=>{
            throw new UserException(e.error)
        })
    }
    return response;
}


class UserException {
    message: string;
    constructor(message: string) {
        this.message = message
    }
}