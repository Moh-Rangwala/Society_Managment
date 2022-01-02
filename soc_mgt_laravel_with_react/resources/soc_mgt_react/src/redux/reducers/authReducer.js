import * as types from "../actions/actionTypes";

const initialState = {
  userData: null
}
const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_DATA:
      // console.log("data",action.payload);
      return {
        ...state,
        userData: action.payload
      };
    default:
      return state;
  }
}

export default AuthReducer;