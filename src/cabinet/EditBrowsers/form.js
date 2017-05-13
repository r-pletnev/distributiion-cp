import R from "ramda";
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";
import FormField from "../../components/FormField";
import FormSelectField from "../../components/FormSelectField";
import { fetchAddBrowser } from "../../actions/browsers";
import { getOses } from "../../reducers/oses";
import { getOsVersions } from "../../reducers/os_versions";

let AddBrowserForm = props => {
  const { handleSubmit, pristine, submitting, error } = props;
  const closeForm = () => {
    props.closeForm();
    props.destroy();
  };
  const submitForm = values => {
    const myValues = R.omit(["os_id"], values);
    return props.dispatch(
      fetchAddBrowser(
        { ...myValues, ...{ os_version_id: Number(myValues.os_version_id) } },
        closeForm
      )
    );
  };

  // const getSpecificOsVersions = os_id TODO

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
          name="name"
          type="text"
          label="Browser name"
          autoComplete="off"
        />
        <FormField
          name="panel_height"
          type="number"
          label="Panel height"
          autoComplete="on"
          minValue={1}
          maxValue={100}
        />
        <FormField name="template" type="textarea" label="Template" />
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

AddBrowserForm = reduxForm({
  form: "AddBrowserForm"
})(AddBrowserForm);

function mapStateToProps(state) {
  return {
    oses: getOses(state),
    os_versions: getOsVersions(state)
  };
}

export default connect(mapStateToProps)(AddBrowserForm);
