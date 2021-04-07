import { ClothStateType } from "../redux/types";
import RequestService from "./requestService";

export default class ClothRequestService extends RequestService {
    static apiRoute = '/cloths';

    static create(cloth: Cloth) {
        return this.sampleFetch('/create', {
            method: 'post',
            body: JSON.stringify(cloth),
        })
    }

    static get() {
        return this.sampleFetch()
    }

    static delete(ids: string[]) {
        return this.sampleFetch('', {
            method: 'delete',
            body: JSON.stringify(ids),
        })
    }

    static getById(ids: string[]) {
        return this.sampleFetch('/clothsById', {
            method: 'post',
            body: JSON.stringify(ids),
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