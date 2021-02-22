
import { FETCH_CREATE_CLOTH, FETCH_GET_CLOTHS, UPDATE_CLOTHS } from "../actionTypes";
import { cloth, clothState, createdCloth } from "../types";

const initialState: clothState = [];

export default function(state = initialState, action: { type: string, payload: clothState}) {
  switch (action.type) {
    case UPDATE_CLOTHS: {
      return [ ...action.payload];
    }
    default:
      return state;
  }
}


export const updateCloths = (payload: cloth[]) => ({type: UPDATE_CLOTHS, payload})
export const fetchCreateCloth = (payload: createdCloth) => ({type: FETCH_CREATE_CLOTH, payload})
export const fetchGetCloths = () => ({type: FETCH_GET_CLOTHS})