import { combineReducers } from "redux";
import AdminReducer from "./adminReducer";
import AuthReducer from "./authReducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  admin: AdminReducer
});

export default rootReducer;