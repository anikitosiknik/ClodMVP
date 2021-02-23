import {
  FETCH_CREATE_LOOK,
  FETCH_GET_LOOKS,
  FETCH_GET_LOOK_IDS,
  UPDATE_LOOKS,
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
    default:
      return state;
  }
}

export const updateLooks = (payload: lookState) => ({
  type: UPDATE_LOOKS,
  payload,
});

export const fetchCreateLook = (payload: createdLook) => ({
  type: FETCH_CREATE_LOOK,
  payload,
});
export const fetchGetLooks = () => ({ type: FETCH_GET_LOOKS });
export const fetchGetLookIds = (payload: lookList) => ({ type: FETCH_GET_LOOK_IDS, payload})
