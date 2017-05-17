import R from "ramda";
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
    return props.dispatch(fetchAddScreen(R.evolve({model_id: Number, width: Number, height: Number}, values), closeForm));
  };

  return (
    <div className="popup-content">
      <form className="form" onSubmit={handleSubmit(submitForm)}>
        <FormSelectField name="model_id" label="Model" options={props.models} />
        <div className="split">
          <div className="box">
            <FormField
              name="width"
              type="number"
              label="Width"
              minValue={1}
              maxValue={3000}
            />
          </div>
          <div className="box">
            <FormField
              name="height"
              type="number"
              label="height"
              autoComplete="on"
              minValue={1}
              maxValue={3000}
            />
          </div>
        </div>
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
