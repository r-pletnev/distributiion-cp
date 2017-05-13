import R from "ramda";
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";
import FormField from "../../components/FormField";
import FormSelectField from "../../components/FormSelectField";
import { fetchAddBrowserVersion } from "../../actions/browser_versions";
import { getBrowsers } from "../../reducers/browsers";

let AddBrowserVersionForm = props => {
  const { handleSubmit, pristine, submitting, error } = props;
  const closeForm = () => {
    props.closeForm();
    props.destroy();
  };
  const submitForm = values => {
    return props.dispatch(
      fetchAddBrowserVersion(
        // { ...myValues, ...{ os_version_id: Number(myValues.os_version_id) } },
        R.evolve({ browser_id: Number }, values),
        closeForm
      )
    );
  };

  return (
    <div className="popup-content">
      <form className="form" onSubmit={handleSubmit(submitForm)}>
        <FormSelectField
          name="browser_id"
          label="Select Browser"
          options={props.browsers}
        />
        <FormField name="name" type="text" label="Version" autoComplete="on" />
        <FormField
          name="engine_version"
          type="text"
          label="Engine version"
          autoComplete="on"
        />
        <FormField
          name="browser_version"
          type="text"
          label="Browser version"
          autoComplete="on"
        />
        <FormField
          name="sub_version"
          type="text"
          label="Subversion"
          autoComplete="on"
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

AddBrowserVersionForm = reduxForm({
  form: "AddBrowserVersionForm"
})(AddBrowserVersionForm);

function mapStateToProps(state) {
  return {
    browsers: getBrowsers(state)
  };
}

export default connect(mapStateToProps)(AddBrowserVersionForm);
