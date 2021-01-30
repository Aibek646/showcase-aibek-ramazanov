import * as actionTypes from "./actionTypes";
import axios from "axios";

export const setUniversities = (name) => {
  return {
    type: actionTypes.SET_UNIVERSITIES,
    name: name,
  };
};

export const fetchFailedUniversities = () => {
  return {
    type: actionTypes.FAILED_FETCHED_UNIVERSITIES,
  };
};

export const fetchUniversities = () => {
  return (dispatch) => {
    axios
      .get("#")
      .then((res) => {
        dispatch(setUniversities(res.data));
      })
      .catch((err) => dispatch(fetchFailedUniversities()));
  };
};
