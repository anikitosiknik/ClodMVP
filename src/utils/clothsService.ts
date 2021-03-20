import { UPDATE_CLOTHS, UPDATE_CLOTH_IMG } from "../redux/actionTypes";
import { ClothStateType } from "../redux/types";
import { sampleFetch } from "./requestService";
import store from "../redux/store";

export function createClothRequest(cloth: Cloth) {

    return sampleFetch(`/createCloth`, {
        method: 'post',
        body: JSON.stringify(cloth),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}


export function getClothsRequest() {

    return sampleFetch(`/cloths`, {
        method: 'get',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(a => a.body)
}

export function deleteClothRequest(ids: string[]) {

    return sampleFetch(`/cloths`, {
        method: 'delete',
        body: JSON.stringify(ids),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

export function getClothsByIdRequest(ids: string[]) {
    return sampleFetch(`/clothsById`, {
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

export class ClothStateParser {
    stream: ReadableStream;

    value: string = '';
    reader: ReadableStreamDefaultReader<Uint8Array>;

    constructor(stream: ReadableStream<Uint8Array>) {
        this.reader = stream.getReader();
        this.stream = new ReadableStream({
            start: () => {
                const push = () => {
                    this.reader.read().then((value) => {
                        this.addChunk(new TextDecoder().decode(value.value))
                        push();
                    })
                }
                push();
            }
        });
    }

    addChunk(chunk: string): void {
        this.value += chunk;
        var regExp = /\[(.*?)\]/;
        let jsonArray = regExp.exec(this.value);
        while (jsonArray && jsonArray[0]) {
            this.value = this.value.replace(jsonArray[0], '');
            this.processCloth(jsonArray[0])
            jsonArray = regExp.exec(this.value);
        }
    }


    processCloth(jsonData: string) {
        const data: ClothType[] = JSON.parse(jsonData);
        switch (typeof data[0]) {
            case 'object':
                store.dispatch({ type: UPDATE_CLOTHS, payload: Cloth.listToObject(data) })
                break;
            case 'string':
                store.dispatch({ type: UPDATE_CLOTH_IMG, payload: { id: data[0], img: data[1] } })
                break;
            default:
                break;
        }
    }
}

