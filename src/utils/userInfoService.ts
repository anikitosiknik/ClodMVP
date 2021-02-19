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