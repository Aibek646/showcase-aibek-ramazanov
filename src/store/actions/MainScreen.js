import * as actionTypes from "./actionTypes";
import axios from "axios";

export const setUniversities = (universities, message) => {
  return {
    type: actionTypes.SET_UNIVERSITIES,
    universities: universities,
    message: message,
  };
};

export const fetchFailedUniversities = (message) => {
  return {
    type: actionTypes.FAILED_FETCHED_UNIVERSITIES,
  };
};

export const selectUniversity = (value) => {
  return {
    type: actionTypes.SELECT_UNIVERSITY,
    text: value,
  };
};

export const inputNotChanges = (text) => {
  return {
    type: actionTypes.INPUT_NOT_CHANGES,
    text: text,
  };
};

export const inputChanges = (text) => {
  return {
    type: actionTypes.INPUT_CHANGES,
    text: text,
  };
};

export const closeButton = () => {
  return {
    type: actionTypes.CLOSE_BUTTON,
  };
};

export const fetchUniversities = (name) => {
  return (dispatch) => {
    axios
      .get(`http://universities.hipolabs.com/search?name=${name}`)
      .then((res) => {
        const resultNotFoundMsg = !res.data.length
          ? "There are no more search results. Please try again"
          : "";
        console.log(res.data);
        dispatch(setUniversities(res.data, resultNotFoundMsg));
      })
      .catch((err) => dispatch(fetchFailedUniversities()));
  };
};
