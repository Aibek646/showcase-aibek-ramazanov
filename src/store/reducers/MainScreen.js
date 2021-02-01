import * as actionTypes from "../actions/actionTypes";
import axios from "axios";

const initialState = {
  universities: [],
  loading: false,
  message: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_UNIVERSITIES:
      return {
        ...state,
        universities: action.universities,
        loading: false,
        message: action.message,
      };
    case actionTypes.FAILED_FETCHED_UNIVERSITIES:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
