import { createdCloth } from "../redux/types";
import { getHref } from "./enviroment";

export function createClothRequest(cloth: createdCloth) {
    const baseUrl = getHref();

    return fetch(`${baseUrl}/createCloth`, {
        method: 'post',
        body: JSON.stringify(cloth),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}


export function getClothsRequest() {
    const baseUrl = getHref();

    return fetch(`${baseUrl}/cloths`, {
        method: 'get',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}
