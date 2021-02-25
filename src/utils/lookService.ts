import { createdLook, lookList, lookState } from "../redux/types";
import { getHref } from "./enviroment";

export function createLookRequest(cloth: createdLook) {
    const baseUrl = getHref();

    return fetch(`${baseUrl}/createLook`, {
        method: 'post',
        body: JSON.stringify(cloth),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}


export function getLookRequest() {
    const baseUrl = getHref();

    return fetch(`${baseUrl}/looks`, {
        method: 'get',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

export function getLookIdsRequest(lookIds: string[]) {
    const baseUrl = getHref();

    return fetch(`${baseUrl}/looksIds`, {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify(lookIds),
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

// export function deleteClothRequest(ids: string[]) {
//     const baseUrl = getHref();

//     return fetch(`${baseUrl}/cloths`, {
//         method: 'delete',
//         body: JSON.stringify(ids),
//         mode: 'cors',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     })
// }

// export function clothListToObject(cloths: clothList) {
//     const clothsObject: clothState = {};
//     cloths.forEach((cloth: clothChoosedType) => {
//         clothsObject[cloth.id] = {
//             ...cloth,
//             choosed: cloth.choosed
//         }
//     })
//     return clothsObject;
// }

export function looksObjectToList(looks: lookState): lookList {
    const lookList: lookList = [];
    for (let look in looks) {
        lookList.push(looks[look])
    }
    return lookList;
}
 