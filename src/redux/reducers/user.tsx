import { ADD_TODO } from "../actionTypes";
import { InitialState } from "../types";

const initialState: InitialState = {
  logined: false,
  name: '',
  mail: '',
  password: '',
  chest: 0,
  waist: 0,
  hips: 0,
  height: 0,
  age: 0,
  color: 0,
  hair: '',
  eyes: '',
  style: '',
};

export default function(state = initialState, action: { type: string}) {
  switch (action.type) {
    case ADD_TODO: {
      return {...state };
    }
    default:
      return state;
  }
}
