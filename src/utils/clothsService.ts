import { UPDATE_CLOTHS, UPDATE_CLOTH_IMG } from "../redux/actionTypes";
import { ClothStateType } from "../redux/types";
import { sampleFetch } from "./requestService";
import store from "../redux/store";
import { SessionStore } from "./sessionStorage";

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
        method: 'post',
        mode: 'cors',
        body: JSON.stringify({
            exclude: SessionStore.getDictIds(SessionStore.clothImgs),
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.body)
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
    regExp = /\[(.*?)\]/;

    constructor(stream: ReadableStream<Uint8Array>) {
        this.reader = stream.getReader();
        this.stream = new ReadableStream({
            start: (controller) => {
                const push = () => {
                    this.reader.read().then(({ value, done }) => {
                        if (done) {
                            console.log(SessionStore.getDict(SessionStore.clothImgs))
                            controller.close();
                            return;
                        }
                        this.addChunk(new TextDecoder().decode(value))
                        push();
                    })
                }
                push();
            },

        });
    }

    addChunk(chunk: string): void {
        this.value += chunk;
        let jsonArray = this.regExp.exec(this.value);

        this.preProcessCloth(jsonArray);
    }

    preProcessCloth(reg: RegExpExecArray | null) {
        setTimeout(() => {
            if (reg && reg[0]) {
                this.value = this.value.replace(reg[0], '');
                this.processCloth(reg[0])
                reg = this.regExp.exec(this.value);
                this.preProcessCloth(reg)
            }
        }, 0)
    }


    processCloth(jsonData: string) {
        const data: any[] = JSON.parse(jsonData);
        switch (typeof data[0]) {
            case 'object': {
                store.dispatch({ type: UPDATE_CLOTHS, payload: Cloth.listToObject(data) })
                const storedIds = SessionStore.getDictIds(SessionStore.clothImgs);
                const storedImgsDict = SessionStore.getDict(SessionStore.clothImgs);
                const storedImgs = storedIds.map(el => ({id: el, img: storedImgsDict[el]}));
                console.log(storedImgs)
                this.updClothImgs(storedImgs)
                break;
            }
            case 'string': {
                const img: { id: string, img: string } = { id: data[0], img: data[1] };
                this.updClothImgs([img])
                SessionStore.setDict(SessionStore.clothImgs, { id: img.id, value: img.img })
                break;
            }
            default:
                break;
        }
    }

    updClothImgs(imgs: { id: string, img: string }[]) {
        imgs.forEach(el => store.dispatch({ type: UPDATE_CLOTH_IMG, payload: el }))
    }
}

