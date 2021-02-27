import { userState } from "../redux/types";
import { getHref } from "./enviroment";

export function setUserInfoRequest(user: userState) {
    const baseUrl = getHref();

    return fetch(`${baseUrl}/setUserInfo`, {
        method: 'post',
        body: JSON.stringify(user),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

export function setUserPictureRequest(userPicture: string) {
    const baseUrl = getHref();
    return fetch(`${baseUrl}/setUserPicture`, {
        method: 'post',
        body: JSON.stringify({
            userPicture
        }),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}