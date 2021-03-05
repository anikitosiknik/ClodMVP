export function sampleFetch(input: RequestInfo, init?: RequestInit | undefined): Promise<Response> {
    const baseUrl = getHref();

    return fetch(`${baseUrl}${input}`, init).then(handleErrors);
}

function getHref() {
    return  '/api';
}

 function handleErrors(response: Response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}