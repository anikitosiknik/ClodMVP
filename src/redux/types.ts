import { ClothType } from "../utils/clothRequestService";

export interface userState {
  logined: boolean;
  name: string;
  mail: string;
  chest: number;
  waist: number;
  hips: number;
  height: number;
  age: number;
  skin: string;
  hair: string;
  eyes: string;
  country: string;
  city: string;
  needChanges: boolean;
  isInfoSetted: boolean;
  userPicture: string;
  isMailCodeReady: boolean;
  error?: string;
  isAdmin?: boolean;
  choosedImages: string;
};

export interface RootState {
  user: userState;
  cloth: ClothStateType;
  look: lookState;
  admin: lookState;
};




export type userKeys = keyof userState;
export type userNumberKeys = "chest" | "waist" | "hips" | "height" | "age";
export type userStringKeys = "skin" | "hair" | "eyes" | "country" | "city";





export type ClothStateType = { [key: string]: ClothType };

export type UpdateLook = {
  id: string;
  clothUpd: { img: string; id: string }[];
  clothDelete: string[];
  clothCreate: ClothType[];
};




export type createdLook = {
  ready: boolean;
  clothIds: string[];
  type: lookType;
}

export type Look = createdLook & {
  createdBy: string;
  category: lookUserCategories | '';
  id: string;
  favorite: boolean;
  img: string;
  createdTime?: string;
}


export type clothInLookIds = { look_id: string, cloth_id: string }[][]


export type lookType = 'hand' | 'clod' | 'clod+';
export type lookUserCategories = 'date' | 'sport' | 'casual' | 'beach'
export type lookCategories = lookUserCategories | 'all' | 'favorite' | 'notready';

export type lookState = { [key: string]: Look }
export type lookList = Look[]

export type looksSorted = {
  [key in lookCategories]: lookList;
};


export type CategoryPageInfo = {
  title: string;
  looks: lookList;
  type: lookCategories;
};