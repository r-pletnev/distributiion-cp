import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";
import FormField from "../../components/FormField";
import FormSelectField from "../../components/FormSelectField";
import { fetchAddBrowserPanel } from "../../actions/browser_panels";

let AddBrowserPanelForm = props => {
  const { handleSubmit, pristine, submitting, error } = props;

  const closeForm = () => {
    props.closeForm();
    props.destroy();
  };
  const submitForm = values => {
    return props.dispatch(fetchAddBrowserPanel(values, closeForm));
  };

  return (
    <div className="popup-content">
      <form className="form" onSubmit={handleSubmit(submitForm)}>
        <FormField
          name="size"
          type="number"
          label="Size"
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

export default connect()(AddBrowserPanelForm);
