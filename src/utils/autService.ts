import { getHref } from "./enviroment"

export function registerUserRequest(name: string, mail: string, password: string) {
    name;
    mail;
    password;
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
    }).then(response => response.json()
    ).then(res => {
        console.log(res)
    }).catch(error => console.log(error))
}