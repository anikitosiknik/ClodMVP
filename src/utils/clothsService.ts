import { clothChoosedType, clothList, clothState, createdCloth } from "../redux/types";
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

export function deleteClothRequest(ids: string[]) {
    const baseUrl = getHref();

    return fetch(`${baseUrl}/cloths`, {
        method: 'delete',
        body: JSON.stringify(ids),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

export function clothListToObject(cloths: clothList) {
    const clothsObject: clothState = {};
    cloths.forEach((cloth: clothChoosedType) => {
        clothsObject[cloth.id] = {
            ...cloth,
            choosed: cloth.choosed
        }
    })
    return clothsObject;
}

export function clothObjectToList(cloths: clothState): clothList {
    const clothsList: clothList = [];
    for (let cloth in cloths) {
        clothsList.push(cloths[cloth])
    }
    return clothsList;
}
 