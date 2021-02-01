import React from "react";
import Modal from "react-modal";
import "./Modal.css";
import { DebounceInput } from "react-debounce-input";
import Loader from "./loader.gif";
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
    <form className="modal-form">
      {formElementsArray.map((formElement) => (
        <input
          key={formElement.id}
          type={formElement.config.elementType}
          value={formElement.config.value}
          onChange={(event) => props.onChanged(event, formElement.id)}
          placeholder={formElement.config.elementConfig.placeholder}
        />
      ))}
    </form>
  );
  return (
    <div className="modal">
      <Modal
        isOpen={props.open}
        style={{
          overlay: {
            backgroundColor: "grey",
          },
          content: {
            display: "flex",
            flexDirection: "column",

            color: "orange",
            width: "50%",
            height: "50%",
          },
        }}
      >
        <h1 className="modal-title">Add Education</h1>
        <button className="modal-btn" onClick={props.close}>
          Close
        </button>

        <div className="debounce-input">
          <DebounceInput
            debounceTimeout={500}
            type="text"
            value={props.text}
            onChange={props.onAutoTextChanged}
          />
        </div>

        <div className="suggestion">
          {!props.loading ? (
            props.renderSuggestion2
          ) : (
            <img src={Loader} alt="Loader gif" />
          )}
        </div>
        {input}

        <button onClick={props.add} className="add-btn">
          ADD
        </button>
      </Modal>
    </div>
  );
};

export default modal;
