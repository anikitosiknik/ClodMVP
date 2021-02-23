import {
  FETCH_CREATE_CLOTH,
  FETCH_DELETE_CLOTH,
  FETCH_GET_CLOTHS,
  TOGGLE_CHOOSED_CLOTH,
  UPDATE_CLOTHS,
} from "../actionTypes";
import { clothState, createdCloth } from "../types";

const initialState: clothState = {};

export default function (
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case UPDATE_CLOTHS: {
      return { ...action.payload };
    }
    case TOGGLE_CHOOSED_CLOTH: {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          choosed: !state[action.payload].choosed,
        },
      };
    }
    default:
      return state;
  }
}

export const updateCloths = (payload: clothState) => ({
  type: UPDATE_CLOTHS,
  payload,
});
export const toggleChoosedCloth = (id: string) => ({
  type: TOGGLE_CHOOSED_CLOTH,
  payload: id,
});

export const fetchCreateCloth = (payload: createdCloth) => ({
  type: FETCH_CREATE_CLOTH,
  payload,
});
export const fetchGetCloths = () => ({ type: FETCH_GET_CLOTHS });
export const fetchDeleteCloth = (payload: string[]) => ({
  type: FETCH_DELETE_CLOTH,
  payload,
});
