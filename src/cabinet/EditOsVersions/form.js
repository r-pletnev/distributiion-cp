import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";
import FormField from "../../components/FormField";
import FormSelectField from "../../components/FormSelectField";
import { fetchAddOsVersion } from "../../actions/os_versions";
import { getOses } from "../../reducers/oses";

let AddOsVerisionForm = props => {
  const { handleSubmit, pristine, submitting, error } = props;

  const closeForm = () => {
    props.closeForm();
    props.destroy();
  };
  const submitForm = values => {
    return props.dispatch(
      fetchAddOsVersion(
        { ...values, ...{ os_id: Number(values.os_id) } },
        closeForm
      )
    );
  };

  return (
    <div className="popup-content">
      <form className="form" onSubmit={handleSubmit(submitForm)}>
        <FormSelectField name="os_id" label="Выбрать ОС" options={props.oses} />
        <FormField
          name="name"
          type="text"
          label="Имя версии ОС"
          autoComplete="off"
        />
        <FormField name="payload" type="text" label="Содержимое(payload)" />
        <FormField name="build" type="text" label="Билд" />
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

AddOsVerisionForm = reduxForm({
  form: "AddOsVerisionForm"
})(AddOsVerisionForm);

function mapStateToProps(state) {
  return {
    oses: getOses(state)
  };
}

export default connect(mapStateToProps)(AddOsVerisionForm);
