import * as actionTypes from "../actions/actionTypes";
import axios from "axios";

const initialState = {
  universities: [],
  loading: false,
  message: "",
  text: "",
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
    case actionTypes.SELECT_UNIVERSITY:
      return {
        ...state,
        universities: [],
        text: action.text,
      };
    case actionTypes.INPUT_NOT_CHANGES:
      return {
        ...state,
        universities: [],
        text: action.text,
      };
    case actionTypes.INPUT_CHANGES:
      return {
        ...state,
        text: action.text,
        loading: true,
      };

    case actionTypes.CLOSE_BUTTON:
      return {
        ...state,
        text: "",
        universities: [],
      };
    default:
      return state;
  }
};

export default reducer;
