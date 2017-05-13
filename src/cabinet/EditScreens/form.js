import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";
import FormField from "../../components/FormField";
import FormSelectField from "../../components/FormSelectField";
import { fetchAddScreen } from "../../actions/screens";
import { getModels } from "../../reducers/models";

let AddScreenForm = props => {
  const { handleSubmit, pristine, submitting, error } = props;

  const closeForm = () => {
    props.closeForm();
    props.destroy();
  };
  const submitForm = values => {
    return props.dispatch(
      fetchAddScreen(
        { ...values, ...{ os_id: Number(values.os_id) } },
        closeForm
      )
    );
  };

  return (
    <div className="popup-content">
      <form className="form" onSubmit={handleSubmit(submitForm)}>
        <FormSelectField name="model_id" label="Model" options={props.models} />
        <FormField
          name="name"
          type="text"
          label="OS version name"
          autoComplete="off"
        />
        <FormField
          name="panel_height"
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

AddScreenForm = reduxForm({
  form: "AddScreenForm"
})(AddScreenForm);

function mapStateToProps(state) {
  return {
    models: getModels(state)
  };
}

export default connect(mapStateToProps)(AddScreenForm);
