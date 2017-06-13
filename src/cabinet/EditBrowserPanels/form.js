import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";
import FormField from "../../components/FormField";
import FormSelectField from "../../components/FormSelectField";
import { fetchAddBrowserPanel } from "../../actions/browser_panels";
import { getBrowsers } from "../../reducers/browsers";

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
        <FormSelectField
          name="browser_id"
          label="Выбрать браузер"
          options={props.browsers}
        />
        <FormField
          name="size"
          type="number"
          label="Высота панели"
          autoComplete="on"
          minValue={1}
          maxValue={300}
        />
        <FormField
          name="priority"
          type="number"
          label="Приоритет"
          autoComplete="off"
          minValue={1}
        />
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

AddBrowserPanelForm = reduxForm({
  form: "AddBrowserPanelForm"
})(AddBrowserPanelForm);

function mapStateToProps(state) {
  return {
    browsers: getBrowsers(state)
  };
}

export default connect(mapStateToProps)(AddBrowserPanelForm);
