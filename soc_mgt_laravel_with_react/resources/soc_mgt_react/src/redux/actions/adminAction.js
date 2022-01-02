import * as types from "./actionTypes";

export const storePageContentType = (text) => (dispatch) => {
  // console.log("data", data);
  dispatch({ type: types.PAGE_CONTENT_CRUD, payload: text });
}