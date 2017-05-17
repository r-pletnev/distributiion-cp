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
    return props.dispatch(
      fetchAddOsPanel(
        R.evolve({ os_id: Number, os_version_id: Number }, values),
        closeForm
      )
    );
  };

  return (
    <div className="popup-content">
      <form className="form" onSubmit={handleSubmit(submitForm)}>
        <FormSelectField name="os_id" label="Select OS" options={props.oses} />
        <FormSelectField
          name="os_version_id"
          label="Select OS Version"
          options={props.os_versions}
        />
        <FormField
          name="size"
          type="number"
          label="Os panel height"
          autoComplete="on"
          minValue={1}
          maxValue={300}
        />
        <div className="popup-bottom">
          <button
            className="btn btn-success"
            disabled={pristine || submitting}
            type="submit"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

AddOsPanelForm = reduxForm({
  form: "AddOsPanelForm"
})(AddOsPanelForm);

function mapStateToProps(state) {
  return {
    oses: getOses(state),
    os_versions: getOsVersions(state)
  };
}

export default connect(mapStateToProps)(AddOsPanelForm);
