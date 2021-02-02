import * as actionTypes from "./actionTypes";

export const addName = (name) => {
  return {
    type: actionTypes.ADD_NAME,
    name: name,
  };
};
