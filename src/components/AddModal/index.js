import React from "react";
import Modal from "../Modal";
import AddForm from "./form";
import PropTypes from "prop-types";

const AddModal = props => {
  return (
    <Modal show={props.show} onClose={props.onClose} title={props.title}>
      <AddForm closeForm={props.onClose} {...props} />
    </Modal>
  );
};

AddModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  // form's props
  items: PropTypes.array,
  doubleName: PropTypes.string,
  action: PropTypes.func,
  nameLabel: PropTypes.string,
  helpLabel: PropTypes.string,
  nameBtn: PropTypes.string
};

export default AddModal;
