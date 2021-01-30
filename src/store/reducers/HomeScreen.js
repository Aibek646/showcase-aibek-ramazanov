import * as actionTypes from "../actions/actionTypes";
import axios from "axios";

const initialState = {
  name: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_NAME:
      return {
        ...state,
        name: action.name,
      };
    default:
      return state;
  }
};

export default reducer;
