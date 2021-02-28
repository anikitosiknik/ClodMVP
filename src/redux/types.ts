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
  country: string,
  city: string,
  // style: string,
  needChanges: boolean,
  isInfoSetted: boolean,
  userPicture: string,
  isMailCodeReady: boolean,
  error?: string,
  isAdmin?: boolean
}

export interface RootState {
    user: userState,
    cloth: clothState,
    look: lookState,
    admin: lookState
}



export type Pages = "clothPage" | "lookPage" | "admin"

export type userKeys = keyof userState
export type userNumberKeys = "chest" | "waist" | "hips" | "height" | "age"
export type userStringKeys = "skin" | "hair" | "eyes" |  "country" | "city"



export type createdCloth = {
  createdBy: string
  img: string
  color: string
  type: string
};

export type clothType = createdCloth & {
  id: string,
  link?: string
} 

export type clothChoosedType = clothType & {
  choosed?: boolean
} 
export type clothState = { [key: string] : clothChoosedType}
export type clothList = clothChoosedType[]





export type createdLook = {
  ready: boolean
  clothIds: string[]
  type: lookType
}

export type Look = createdLook & {
  createdBy: string
  category: lookUserCategories | ''
  id: string,
  favorite: boolean,
  img: string,
}


export type clothInLookIds = {look_id: string, cloth_id: string}[][]


export type lookType = 'hand' | 'clod' | 'clod+';
export type lookUserCategories ='date' | 'sport' | 'casual' | 'beach'
export type lookCategories = lookUserCategories | 'all' | 'favorite' | 'notready'; 

export type  lookState = { [key: string] : Look}
export type lookList = Look[]

export type looksSorted = {
  [key in lookCategories]: lookList;
};