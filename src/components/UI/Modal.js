import React from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");

const modal = (props) => {
  const formElementsArray = [];

  for (let key in props.orderForm) {
    formElementsArray.push({
      id: key,
      config: props.orderForm[key],
    });
  }
  let input = (
    <form>
      {formElementsArray.map((formElement) => (
        <input
          key={formElement.id}
          type={formElement.config.elementType}
          value={formElement.config.value}
          onChange={(event) => props.onChanged(event, formElement.id)}
        />
      ))}
    </form>
  );
  return (
    <Modal
      isOpen={props.open}
      style={{
        overlay: {
          backgroundColor: "grey",
          justifyContent: "center",
          alignContent: "center",
        },
        content: {
          color: "orange",
          width: "50%",
          height: "50%",
        },
      }}
    >
      <h1>Modal title</h1>
      <button onClick={props.close}>Close</button>
      {input}
    </Modal>
  );
};

export default modal;
