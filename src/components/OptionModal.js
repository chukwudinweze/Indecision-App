import React from "react";
import ReactModal from "react-modal";

const OptionModal = props => (
  <ReactModal
    isOpen={!!props.selected}
    contentLabel="selected option"
    onRequestClose={props.clearOptionModal}
  >
    <h3>Selected Option</h3>
    {props.selected && <p>{props.selected}</p>}
    <button onClick={props.clearOptionModal}>Close</button>
  </ReactModal>
);

export default OptionModal;
