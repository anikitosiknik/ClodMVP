import { ClothStateType } from "../redux/types";
import { sampleFetch } from "./requestService";

export default class ClothRequestService {
    static create(cloth: Cloth) {
        return this.clothsFetch('/create', {
            method: 'post',
            body: JSON.stringify(cloth),
        })
    }

    static get() {
        return this.clothsFetch('', {
        })
    }

    static delete(ids: string[]) {
        return this.clothsFetch('', {
            method: 'delete',
            body: JSON.stringify(ids),
        })
    }

    static getById(ids: string[]) {
        return this.clothsFetch('/clothsById', {
            method: 'post',
            body: JSON.stringify(ids),
        })
    }

    static clothsFetch(input: RequestInfo, init?: RequestInit | undefined): Promise<Response> {
        return sampleFetch(`/cloths${input}`, {
            headers: {
                'Content-Type': 'application/json'
            }, ...init
        })
    }
}


export interface CreatedClothType {
    createdBy: string;
    img: string;
    color: string;
    type: string;
    link?: string;
    createdTime?: string;
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