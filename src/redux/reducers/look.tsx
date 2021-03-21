import {
  FETCH_CHANGE_CATEGORY_LOOK,
  FETCH_CREATE_LOOK,
  FETCH_DELETE_LOOKS,
  FETCH_GET_LOOKS,
  FETCH_GET_LOOK_IDS,
  FETCH_TOGGLE_LIKE_LOOK,
  UPDATE_LOOKS,
  TOGGLE_LIKE_LOOK
} from "../actionTypes";
import { createdLook, lookList, lookState } from "../types";

const initialState: lookState = {};

export default function (
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case UPDATE_LOOKS: {
      return { ...action.payload };
    }
    case TOGGLE_LIKE_LOOK: {
      const stateCopy = {...state};
      stateCopy[action.payload].favorite = !stateCopy[action.payload].favorite
      return stateCopy
    }
    default:
      return state;
  }
}

export const updateLooks = (payload: lookState) => ({
  type: UPDATE_LOOKS,
  payload,
});

export const toggleLikeLook = (payload: string) => ({
  type: TOGGLE_LIKE_LOOK,
  payload,
})

export const fetchCreateLook = (payload: createdLook) => ({
  type: FETCH_CREATE_LOOK,
  payload,
});
export const fetchGetLooks = () => ({ type: FETCH_GET_LOOKS });

export const fetchGetLookIds = (payload: lookList) => ({ type: FETCH_GET_LOOK_IDS, payload})
export const fetchDeleteLooks = (payload: string[]) => ({type: FETCH_DELETE_LOOKS, payload})
export const fetchToggleLikeLook = (payload: string) => ({type: FETCH_TOGGLE_LIKE_LOOK, payload})
export const fetchChangeCategoryLook = (payload: {id: string, category: string}) => ({type: FETCH_CHANGE_CATEGORY_LOOK, payload})
