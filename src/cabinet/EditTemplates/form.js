import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";
import FormField from "../../components/FormField";
import FormSelectField from "../../components/FormSelectField";
import { fetchAddTemplate } from "../../actions/templates";
import { getBrowsers } from "../../reducers/browsers";

let AddTemplateForm = props => {
  const { handleSubmit, pristine, submitting, error } = props;

  const closeForm = () => {
    props.closeForm();
    props.destroy();
  };
  const submitForm = values => {
    return props.dispatch(fetchAddTemplate(values, closeForm));
  };

  return (
    <div className="popup-content">
      <form className="form" onSubmit={handleSubmit(submitForm)}>
        <FormSelectField
          name="browser_id"
          label="Select Browser"
          options={props.browsers}
        />
        <FormField name="name" type="text" label="Template name" />
        <FormField name="payload" type="textarea" label="Template" />
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

AddTemplateForm = reduxForm({
  form: "AddTemplateForm"
})(AddTemplateForm);

function mapStateToProps(state) {
  return {
    browsers: getBrowsers(state)
  };
}

export default connect(mapStateToProps)(AddTemplateForm);
