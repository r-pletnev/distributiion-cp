import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import FormField from "../../components/FormField";
import { fetchAddAge } from "../../actions/ages";

let AddAgeForm = props => {
  const { handleSubmit, pristine, submitting, error } = props;

  const closeForm = () => {
    props.closeForm();
    props.destroy();
  };

  const submitForm = values => {
    return props.dispatch(fetchAddAge(values, closeForm));
  };

  return (
    <div className="popup-content">
      <form className="form" onSubmit={handleSubmit(submitForm)}>
        <FormField
          name="min_age"
          label="Минимальный возраст"
          type="number"
          minValue={0}
          maxValue={90}
        />
        <FormField
          name="max_age"
          label="Максимальный возраст"
          type="number"
          minValue={0}
          maxValue={90}
        />
        <div className="popup-bottom">
          <button
            className="btn btn-success"
            disabled={pristine || submitting}
            type="submit"
          >
            Отправить
          </button>
        </div>
      </form>
    </div>
  );
};

AddAgeForm = reduxForm({
  form: "AddAgeForm"
})(AddAgeForm);

export default connect()(AddAgeForm);
