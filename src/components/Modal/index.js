import React from "react";
import Modal from "react-modal";

const myModal = props => {
  return (
    <Modal
      isOpen={props.show}
      onAfterOpen={props.afterOpen}
      contentLabel="Modal"
      className="popup-box small"
      overlayClassName="popup popup-wrapper"
      onRequestClose={props.onClose}
    >
      <div className="overflow-wrap">
        <div className="overflow">
          <div className="popup-title">
            <h3>{props.title}</h3>
            <span className="modal-close" onClick={props.onClose}>
              x
            </span>
          </div>
          {props.children}
        </div>
      </div>
    </Modal>
  );
};

export default myModal;
