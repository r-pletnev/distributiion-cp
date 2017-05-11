import React from "react";
import { reduxForm } from "redux-form";
import FormField from "../FormField";
import { connect } from "react-redux";
import PropTypes from "prop-types";

let AddForm = props => {
  const { handleSubmit, pristine, submitting, error } = props;

  const closeForm = () => {
    props.closeForm();
    props.destroy();
  };
  const submitForm = values => {
    return props.dispatch(props.action(values.name, closeForm));
  };

  return (
    <div className="popup-content">
      <form className="form" onSubmit={handleSubmit(submitForm)}>
        <FormField
          name="name"
          type="text"
          label={props.nameLabel}
          helpText={props.helpLabel}
          autoComplete="off"
          autoFocus
        />
        <div className="popup-bottom">
          <button
            className="btn btn-success"
            disabled={pristine || submitting}
            type="btn"
          >
            {props.nameBtn}
          </button>
        </div>
      </form>
    </div>
  );
};

AddForm = reduxForm({
  form: "AddForm"
})(AddForm);

AddForm.propTypes = {
  items: PropTypes.array,
  doubleName: PropTypes.string,
  action: PropTypes.func,
  nameLabel: PropTypes.string,
  helpLabel: PropTypes.string,
  nameBtn: PropTypes.string
};

export default connect()(AddForm);
