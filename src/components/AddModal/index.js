import React from "react";
import Modal from "../Modal";
import AddForm from "./form";
import PropTypes from "prop-types";

const AddModal = props => {
  const { show, onClose, title, SpecialForm, ...restProps } = props;
  return (
    <Modal show={show} onClose={onClose} title={title}>
      {SpecialForm
        ? <SpecialForm closeForm={props.onClose} />
        : <AddForm closeForm={props.onClose} {...props} />}
    </Modal>
  );
};

AddModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  SpecialForm: PropTypes.func,
  // form's props
  items: PropTypes.array,
  doubleName: PropTypes.string,
  action: PropTypes.func,
  nameLabel: PropTypes.string,
  helpLabel: PropTypes.string,
  nameBtn: PropTypes.string
};

export default AddModal;
