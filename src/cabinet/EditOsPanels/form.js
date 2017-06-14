import R from "ramda";
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";
import FormField from "../../components/FormField";
import FormSelectField from "../../components/FormSelectField";
import { fetchAddOsPanel } from "../../actions/os_panels";
import { getOses } from "../../reducers/oses";
import { getOsVersions } from "../../reducers/os_versions";

let AddOsPanelForm = props => {
  const { handleSubmit, pristine, submitting, error } = props;

  const closeForm = () => {
    props.closeForm();
    props.destroy();
  };
  const submitForm = values => {
    return props.dispatch(fetchAddOsPanel(values, closeForm));
  };

  return (
    <div className="popup-content">
      <form className="form" onSubmit={handleSubmit(submitForm)}>
        <FormField
          name="size"
          type="number"
          label="Высота панели ОС"
          autoComplete="on"
          minValue={0}
          maxValue={300}
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

AddOsPanelForm = reduxForm({
  form: "AddOsPanelForm"
})(AddOsPanelForm);

export default connect()(AddOsPanelForm);
