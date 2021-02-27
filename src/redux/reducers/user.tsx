import {
  FETCH_SET_USER_INFO,
  FETCH_AUTOLOGIN_USER,
  FETCH_LOGIN_USER,
  FETCH_LOGOUT,
  FETCH_REGISTER_USER,
  SET_USER,
  FETCH_SET_USER_PICTURE,
  FETCH_SET_MAILCODE,
  SET_MAILCODE_STATUS,
  FETCH_CHECK_MAILCODE,
  FETCH_CHANGE_PASSWORD,
} from "../actionTypes";
import { userState } from "../types";

const initialState: userState = {
  logined: false,
  name: "",
  mail: "",
  chest: 0,
  waist: 0,
  hips: 0,
  height: 0,
  age: 0,
  skin: "",
  hair: "",
  eyes: "",
  // style: '',
  needChanges: false,
  isInfoSetted: false,
  userPicture: "",
  isMailCodeReady: false,
};

export default function (
  state = initialState,
  action: { type: string; payload: userState }
) {
  switch (action.type) {
    case SET_USER: {
      return { ...state, ...action.payload };
    }
    case SET_MAILCODE_STATUS: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
}

export const setUser = (payload: userState) => ({ type: SET_USER, payload });
export const setMailCodeStatus = (payload: boolean) => ({
  type: SET_MAILCODE_STATUS,
  payload: { isMailCodeReady: payload },
});

export const fetchRegister = (payload: {
  name: string;
  mail: string;
  password: string;
}) => ({ type: FETCH_REGISTER_USER, payload });

export const fetchSetMailCode = (payload: {
  name: string;
  mail: string;
  password: string;
}) => ({ type: FETCH_SET_MAILCODE, payload });

export const fetchCheckMailCode = (payload: {
  name: string;
  mail: string;
  password: string;
  code: string;
}) => ({ type: FETCH_CHECK_MAILCODE, payload });

export const fetchLogin = (payload: { mail: string; password: string }) => ({
  type: FETCH_LOGIN_USER,
  payload,
});

export const fetchAutoLogin = () => ({ type: FETCH_AUTOLOGIN_USER });
export const fetchLogOut = () => ({ type: FETCH_LOGOUT });
export const fetchSetUserInfo = (payload: userState) => ({
  type: FETCH_SET_USER_INFO,
  payload,
});
export const fetchSetUserPicture = (userPicture: string) => ({
  type: FETCH_SET_USER_PICTURE,
  userPicture,
});

export const fetchChangePassword = (payload: { mail: string; password: string, code: string }) => ({
  type: FETCH_CHANGE_PASSWORD,
  payload,
})
