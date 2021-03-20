import { CreatedClothType } from "../../utils/clothsService";
import {
  ADD_CLOTHS,
  DELETE_CLOTHS,
  FETCH_CREATE_CLOTH,
  FETCH_DELETE_CLOTH,
  FETCH_GET_CLOTHS,
  FETCH_GET_CLOTHS_BY_ID,
  TOGGLE_CHOOSED_CLOTH,
  UPDATE_CLOTHS,
  UPDATE_CLOTH_IMG,
} from "../actionTypes";
import { ClothStateType,  } from "../types";

const initialState: ClothStateType = {};

export default function (
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case UPDATE_CLOTHS: {
      return { ...action.payload };
    }
    case ADD_CLOTHS: {
      return {...state, ...action.payload}
    }
    case UPDATE_CLOTH_IMG: {
      const cloth: {img: string, id: string} = action.payload;
      const stateCopy = {...state} 
      stateCopy[cloth.id].img = cloth.img;
      return stateCopy;
    }

    case DELETE_CLOTHS: {
      const ids: string[] = action.payload;
      const stateCopy = {...state};
      ids.forEach(id=> {
        delete stateCopy[id]
      })
      return stateCopy
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

export const updateCloths = (payload: ClothStateType) => ({
  type: UPDATE_CLOTHS,
  payload,
});

export const addCloths = (payload: ClothStateType) => ({
  type: ADD_CLOTHS,
  payload,
});

export const updateClothImg = (payload: { id: string, img: string}) => ({
  type: UPDATE_CLOTH_IMG,
  payload
})

export const deleteCloths = (payload: string[]) => ({
  type: DELETE_CLOTHS,
  payload
})

export const toggleChoosedCloth = (id: string) => ({
  type: TOGGLE_CHOOSED_CLOTH,
  payload: id,
});

export const fetchCreateCloth = (payload: CreatedClothType) => ({
  type: FETCH_CREATE_CLOTH,
  payload,
});
export const fetchGetCloths = () => ({ type: FETCH_GET_CLOTHS });
export const fetchGetClothsById = (payload: string[]) => ({ type: FETCH_GET_CLOTHS_BY_ID, payload });
export const fetchDeleteCloth = (payload: string[]) => ({
  type: FETCH_DELETE_CLOTH,
  payload,
});
