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
  userPicture: string,
}

export interface RootState {
    user: userState,
}



export type Pages = "clothPage" | "lookPage"

export type userKeys = keyof userState
export type userNumberKeys = "chest" | "waist" | "hips" | "height" | "age"
export type userStringKeys = "skin" | "hair" | "eyes"



export type createdCloth = {
  createdBy: string
  img: string
  color: string
  type: string
};

export type cloth = createdCloth & {
  id: string
} 

export type clothState = cloth[]

