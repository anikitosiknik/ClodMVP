export function sampleFetch(input: RequestInfo, init?: RequestInit | undefined): Promise<Response> {
    const baseUrl = getHref();

    return fetch(`${baseUrl}${input}`, init).then(handleErrors);
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