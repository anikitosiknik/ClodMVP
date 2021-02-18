import { userState } from "../redux/types";
import { getHref } from "./enviroment";

export function loginUserRequest(user: userState) {
    const baseUrl = getHref();

    const { chest, waist, hips, height, age, skin, hair, eyes } = user;

    return fetch(`${baseUrl}/login`, {
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