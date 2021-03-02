import { ClothStateType } from "../redux/types";
import { getHref } from "./enviroment";

export function createClothRequest(cloth: Cloth) {
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

export function getClothsByIdRequest(ids: string[]) {
    const baseUrl = getHref();
    return fetch(`${baseUrl}/clothsById`, {
        method: 'post',
        body: JSON.stringify(ids),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

export interface CreatedClothType {
    createdBy: string;
    img: string;
    color: string;
    type: string;
    link?: string; 
}

export type ClothType = CreatedClothType & {
    id?: string;
    choosed?: boolean
}

export class Cloth {
   

    static listToObject(cloths: ClothType[]) {
        const clothsObject: ClothStateType = {};
        cloths.forEach((cloth: ClothType) => {
            if (cloth.id)
                clothsObject[cloth.id] = {
                    ...cloth,
                    choosed: cloth.choosed
                }
        })
        return clothsObject;
    }

    static objectToList(cloths: ClothStateType): ClothType[] {
        const clothsList: ClothType[] = [];
        for (let cloth in cloths) {
            clothsList.push(cloths[cloth])
        }
        return clothsList;
    }


}

