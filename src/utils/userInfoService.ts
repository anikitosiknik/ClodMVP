import { userState } from "../redux/types";
import { sampleFetch } from "./requestService";

export function setUserInfoRequest(user: userState) {

    return sampleFetch(`/setUserInfo`, {
        method: 'post',
        body: JSON.stringify(user),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function setUserPictureRequest(userPicture: string) {
    return sampleFetch(`/setUserPicture`, {
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