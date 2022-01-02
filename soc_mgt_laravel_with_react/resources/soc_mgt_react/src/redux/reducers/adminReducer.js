import * as types from "../actions/actionTypes";

const initialState = {
    pageContent: ""
}
const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PAGE_CONTENT_CRUD:
      // console.log("data",action.payload);
      return {
        ...state,
        pageContent: action.payload
      };
    default:
      return state;
  }
}

export default AdminReducer;