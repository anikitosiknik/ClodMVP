import { FETCH_AUTOLOGIN_USER, FETCH_LOGIN_USER, FETCH_LOGOUT, FETCH_REGISTER_USER, SET_USER } from "../actionTypes";
import { userState } from "../types";

const initialState: userState = {
  logined: false,
  name: '',
  mail: '',
  chest: 0,
  waist: 0,
  hips: 0,
  height: 0,
  age: 0,
  skin: '',
  hair: '',
  eyes: '',
  // style: '',
  needChanges: true,
};

export default function(state = initialState, action: { type: string, payload: userState}) {
  switch (action.type) {
    case SET_USER: {
      console.log(action.payload);
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
}


export const setUser = (payload:any) => ({type: SET_USER, payload });
export const fetchRegister = (payload: {name: string, mail: string, password: string}) => ({type: FETCH_REGISTER_USER, payload});
export const fetchLogin = (payload: { mail: string, password: string}) => ({type: FETCH_LOGIN_USER, payload});
export const fetchAutoLogin = (() => ({type: FETCH_AUTOLOGIN_USER}))
export const fetchLogOut = (() => ({type: FETCH_LOGOUT}))