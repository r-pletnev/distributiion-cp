import React from "react";
import Modal from "../Modal";
import PropTypes from "prop-types";
import FormField from "../FormField";

const DetailModal = props => {
  const { show, onClose, name, title, ...restProps } = props;
  return (
    <Modal show={show} onClose={onClose} title={title} cls="popup-box large">
      <table className="table table-three">
        <thead className="table-three-root">
          <tr>
            <th>{name}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {props.children}
          </tr>
        </tbody>
      </table>
    </Modal>
  );
};

export default DetailModal;
