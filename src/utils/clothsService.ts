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
    stream: any;

    value: string = '';
    reader: any;

    constructor(stream: any, ) {
        this.reader = stream.getReader();
        this.stream = new ReadableStream({
            start: (controller) => {
                // The following function handles each data chunk
                const push = () => {
                    // "done" is a Boolean and value a "Uint8Array"
                    this.reader.read().then(({ done, value }: { done: any, value: any }) => {
                        // If there is no more data to read
                        if (done) {
                            console.log('done', done);
                            controller.close();
                            return;
                        }
                        // Get the data and send it to the browser via the controller
                        controller.enqueue(value);
                        // Check chunks by logging to the console
                        // console.log(done, value);
                        this.addChunk(new TextDecoder().decode(value))
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
        const jsonArray = regExp.exec(this.value);
        if (jsonArray && jsonArray[0]) {
            this.value = this.value.replace(jsonArray[0], '');
            this.processCloth(jsonArray[0])
        }
    }

    
    processCloth(jsonData: string) {
        const data: any[] = JSON.parse(jsonData);
        switch (typeof data[0] ) {
            case 'object':
                store.dispatch({type: UPDATE_CLOTHS, payload: Cloth.listToObject(data) })
                break;
        
                case 'string':
                    store.dispatch({type: UPDATE_CLOTH_IMG, payload: {id: data[0], img: data[1]} })
                    break;
            
            default:
                break;
        }
        

    }

}

