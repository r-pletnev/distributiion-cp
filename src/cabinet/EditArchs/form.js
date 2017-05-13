import React from "react";
import { reduxForm } from "redux-form";
import FormField from "../../components/FormField";
import FormSelectField from "../../components/FormSelectField";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchAddArch } from "../../actions/archs";
import { getOsVersions } from "../../reducers/os_versions";

let AddArchForm = props => {
  const { handleSubmit, pristine, submitting, error } = props;

  const closeForm = () => {
    props.closeForm();
    props.destroy();
  };
  const submitForm = values => {
    return props.dispatch(
      fetchAddArch(
        { ...values, ...{ os_version_id: Number(values.os_version_id) } },
        closeForm
      )
    );
  };

  return (
    <div className="popup-content">
      <form className="form" onSubmit={handleSubmit(submitForm)}>
        <FormSelectField
          name="os_version_id"
          label="OS version"
          options={props.os_versions}
        />
        <FormField
          name="name"
          type="text"
          label="Enter name"
          autoComplete="off"
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

AddArchForm = reduxForm({
  form: "AddArchForm"
})(AddArchForm);

function mapStateToProps(state) {
  return {
    os_versions: getOsVersions(state)
  };
}

export default connect(mapStateToProps)(AddArchForm);
