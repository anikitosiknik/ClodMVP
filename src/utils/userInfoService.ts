import { userState } from "../redux/types";
import { getHref } from "./enviroment";

export function setUserInfoRequest(user: userState) {
    const baseUrl = getHref();

    const { chest, waist, hips, height, age, skin, hair, eyes } = user;
    return fetch(`${baseUrl}/setUserInfo`, {
        method: 'post',
        body: JSON.stringify({
            chest,
            waist,
            hips,
            height,
            age,
            skin,
            hair,
            eyes
        }),
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