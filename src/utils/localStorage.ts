

export class LocalStorage {
    static clothsKey = 'clothIdsKey';
    static clothImgs = 'clothImgs';

    static setArray(key: string, arr: any[]) {
        localStorage.setItem(key, JSON.stringify(arr))
    }

    static getArray(key: string) {
        return JSON.parse(localStorage.getItem(key) || "[]")
    }

    static setDict(key: string, elem: {id: string, value: any}) {
        const dict = this.getDict(key);
        dict[elem.id] = elem.value;
        localStorage.setItem(key, JSON.stringify(dict));
    }

    static getDictIds(key: string) {
        return Object.keys(this.getDict(key))
    }

    static getDict(key: string) {
        return JSON.parse(localStorage.getItem(key) || "{}")
    }
}