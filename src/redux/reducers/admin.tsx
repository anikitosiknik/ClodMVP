import { UpdateLook } from "../../components/adminPage/AdminPage";
import {
  FETCH_GET_LOOKS_ADMIN,
  FETCH_GET_LOOK_IDS_ADMIN,
  FETCH_UPDATE_LOOK_ADMIN,
//   FETCH_SET_LOOK_IMG_ADMIN,
  UPDATE_LOOKS_ADMIN,
} from "../actionTypes";
import { lookList, lookState } from "../types";

const initialState: lookState = {};

export default function (
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case UPDATE_LOOKS_ADMIN: {
      return { ...action.payload };
    }

    default:
      return state;
  }
}

export const updateLooksAdmin = (payload: lookState) => ({
  type: UPDATE_LOOKS_ADMIN,
  payload,
});

export const fetchGetLooksAdmin = () => ({
  type: FETCH_GET_LOOKS_ADMIN,
});
export const fetchGetLookIdsAdmin = (payload: lookList) => ({
  type: FETCH_GET_LOOK_IDS_ADMIN,
  payload,
});

export const fetchUpdateLookAdmin = (payload: UpdateLook) => ({
    type: FETCH_UPDATE_LOOK_ADMIN,
    payload
})
// export const fetchSetLookImgAdmin = (payload: {img: string, id: string}) => ({
//     type: FETCH_SET_LOOK_IMG_ADMIN,
//     payload
// })