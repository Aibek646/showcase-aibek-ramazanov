import React from "react";

const input = (props) => {
  let inputElement = null;
  switch (props.elementType) {
    case "input":
      inputElement = <input value={props.value} onChange={props.change} />;
  }
  return <div></div>;
};

export default input;
