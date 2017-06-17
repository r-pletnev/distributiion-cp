import R from "ramda";
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";
import FormField from "../../components/FormField";
import FormSelect2Field from "../../components/FormSelect2Field";
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
        R.evolve({ width: Number, height: Number }, values),
        closeForm
      )
    );
  };

  return (
    <div className="popup-content">
      <form className="form" onSubmit={handleSubmit(submitForm)}>
        <FormSelect2Field
          name="model_id"
          label="Выберите модель"
          options={props.models}
        />
        <div className="split">
          <div className="box">
            <FormField
              name="width"
              type="number"
              label="Ширина"
              minValue={1}
              maxValue={5000}
            />
          </div>
          <div className="box">
            <FormField
              name="height"
              type="number"
              label="Высота"
              autoComplete="on"
              minValue={1}
              maxValue={5000}
            />
          </div>
        </div>
        <div className="popup-bottom">
          <button
            className="btn btn-success"
            disabled={pristine || submitting}
            type="submit"
          >
            Отправить
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
