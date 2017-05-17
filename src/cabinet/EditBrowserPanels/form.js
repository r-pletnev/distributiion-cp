import R from "ramda";
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";
import FormField from "../../components/FormField";
import FormSelectField from "../../components/FormSelectField";
// import { fetchAddOsPanel } from "../../actions/os_panels";
import { getBrowserVersions } from "../../reducers/os_versions";

let AddBrowserPanelForm = props => {
  const { handleSubmit, pristine, submitting, error } = props;

  const closeForm = () => {
    props.closeForm();
    props.destroy();
  };
  const submitForm = values => {
    // return props.dispatch(
    //   fetchAddOsPanel(
    //     R.evolve({ os_id: Number, os_version_id: Number }, values),
    //     closeForm
    //   )
    // );
  };

  return (
    <div className="popup-content">
      <form className="form" onSubmit={handleSubmit(submitForm)}>
        <FormSelectField
          name="browser_version_id"
          label="Select Browser Version"
          options={props.browser_versions}
        />
        <FormField
          name="size"
          type="number"
          label="Panel height"
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

AddBrowserPanelForm = reduxForm({
  form: "AddBrowserPanelForm"
})(AddBrowserPanelForm);

function mapStateToProps(state) {
  return {
    browser_versions: getBrowserVersions(state)
  };
}

export default connect(mapStateToProps)(AddBrowserPanelForm);
