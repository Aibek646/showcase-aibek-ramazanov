import React from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");

const modal = (props) => {
  return (
    <Modal
      isOpen={this.state.modal}
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
      <button onClick={this.openAndCloseModal}>Close</button>
    </Modal>
  );
};

export default modal;
