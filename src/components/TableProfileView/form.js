import R from "ramda";
import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";
import FormField from "../../components/FormField";
import FormSelect2Field from "../../components/FormSelect2Field";

AddPriorityForm.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  action: PropTypes.func.isRequired
};

function AddPriorityForm(props) {
  const { handleSubmit, pristine, submitting, error } = props;

  const closeForm = () => {
    props.closeForm();
    props.destroy();
  };

  const submitForm = values => {
    const params = R.evolve({ se_id: Number, priority: Number }, values);
    debugger;
    return props.action(params, closeForm);
  };

  return (
    <div className="popup-content">
      <form className="form" onSubmit={handleSubmit(submitForm)}>
        <FormSelect2Field
          name={props.name}
          label={props.label}
          options={props.options}
        />
        <FormField
          name="priority"
          label="Приоритет"
          type="number"
          minValue={1}
        />
        <div className="popup-bottom">
          <button
            className="btn btn-primary"
            disabled={pristine || submitting}
            type="submit"
          >
            Добавить
          </button>
        </div>

      </form>
    </div>
  );
}

AddPriorityForm = reduxForm({
  form: "AddPriorityForm"
})(AddPriorityForm);

export default AddPriorityForm;
