export interface userState {
    logined: boolean,
  name: string,
  mail: string,
  chest: number,
  waist: number,
  hips: number,
  height: number,
  age: number,
  skin: string,
  hair: string,
  eyes: string,
  // style: string,
  needChanges: boolean,
  isInfoSetted: boolean,
}

export interface RootState {
    user: userState,
}

export type userKeys = keyof userState
export type userNumberKeys = "chest" | "waist" | "hips" | "height" | "age"
export type userStringKeys = "skin" | "hair" | "eyes"