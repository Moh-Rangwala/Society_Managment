import * as types from "./actionTypes";

export const storeAuthData = (data) => (dispatch) => {
  // console.log("data", data);
  dispatch({ type: types.AUTH_DATA, payload: data });
}