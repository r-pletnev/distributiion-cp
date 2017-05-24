import React from "react";
import { reduxForm } from "redux-form";
import FormField from "../../components/FormField";
import FormSelectField from "../../components/FormSelectField";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchAddModel } from "../../actions/models";
import { getDevices } from "../../reducers/devices";

let AddModelForm = props => {
  const { handleSubmit, pristine, submitting, error } = props;

  const closeForm = () => {
    props.closeForm();
    props.destroy();
  };
  const submitForm = values => {
    return props.dispatch(fetchAddModel(values, closeForm));
  };

  return (
    <div className="popup-content">
      <form className="form" onSubmit={handleSubmit(submitForm)}>
        <FormSelectField
          name="device_id"
          label="Device type"
          options={props.devices}
        />
        <FormField
          name="name"
          type="text"
          label="Enter Model name"
          autoComplete="off"
        />
        <FormField
          name="payload"
          type="text"
          label="UA string"
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

AddModelForm = reduxForm({
  form: "AddModelForm"
})(AddModelForm);

function mapStateToProps(state) {
  return {
    devices: getDevices(state)
  };
}

export default connect(mapStateToProps)(AddModelForm);
