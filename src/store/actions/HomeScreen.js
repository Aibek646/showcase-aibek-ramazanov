import * as actionTypes from "./actionTypes";
import axios from "axios";

export const addName = (name) => {
  return {
    type: actionTypes.ADD_NAME,
    name: name,
  };
};
