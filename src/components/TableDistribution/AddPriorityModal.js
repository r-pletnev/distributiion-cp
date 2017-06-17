import React from "react";
import Modal from "../Modal";
import PropTypes from "prop-types";
import FormField from "../FormField";
import FormSelect2Field from "../FormSelect2Field";
import { reduxForm, Field } from "redux-form";

let AddPriorityForm = props => {
  const { handleSubmit, pristine, submitting, error, name } = props;
  const closeForm = () => {
    props.closeForm();
    props.destroy();
  };
  const submitForm = values => {
    return props.action(values, closeForm);
  };

  return (
    <div className="popup-content">
      <form className="form" onSubmit={handleSubmit(submitForm)}>
        <FormSelect2Field
          name={props.fieldName}
          options={props.items}
          label={props.label ? props.label : name}
        />
        <FormField
          name="priority"
          type="number"
          label="Приоритет"
          autoComplete="off"
          minValue={0}
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
  fieldName: PropTypes.string, // this name will send to api
  label: PropTypes.string
};

export default AddPriorityModal;
