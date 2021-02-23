import { combineReducers } from "redux";
import user from "./user";
import cloth from "./cloth";
import look from "./look";

export default combineReducers({ user, cloth, look });
