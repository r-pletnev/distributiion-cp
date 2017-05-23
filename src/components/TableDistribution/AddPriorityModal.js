import React from "react";
import Modal from "../Modal";
import PropTypes from "prop-types";
import FormField from "../FormField";
import FormSelectField from "../FormSelectField";
import { reduxForm } from "redux-form";

let AddPriorityForm = props => {
  const { handleSubmit, pristine, submitting, error } = props;

  const closeForm = () => {
    props.closeForm();
    props.destroy();
  };
  const submitForm = values => {
    return props.action(values.name, closeForm);
  };

  return (
    <div className="popup-content">
      <form className="form" onSubmit={handleSubmit(submitForm)}>
        <FormSelectField
          label={`Выбрать ${props.name}`}
          options={props.items}
          name={props.fieldName}
        />
        <FormField
          name="priority"
          type="number"
          label="Приоритет"
          autoComplete="off"
          minValue={0}
          maxValue={1000}
        />
        <div className="popup-bottom">
          <button
            className="btn btn-primary"
            disabled={pristine || submitting}
            type="btn"
          >
            Добавить
          </button>
        </div>
      </form>
    </div>
  );
};

AddPriorityForm = reduxForm({
  form: "AddPriorityForm"
})(AddPriorityForm);

const AddPriorityModal = props => {
  const { show, onClose, name, ...restProps } = props;
  return (
    <Modal show={show} onClose={onClose} title={`Добавить ${name}`}>
      <AddPriorityForm closeForm={props.onClose} {...props} />
    </Modal>
  );
};

AddPriorityModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  name: PropTypes.string.isRequired,
  // form's props
  items: PropTypes.array,
  action: PropTypes.func,
  fieldName: PropTypes.string // this name will send to api
};

export default AddPriorityModal;
