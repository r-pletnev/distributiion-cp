import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import FormField from "../../components/FormField";
import FormSelectField from "../../components/FormSelectField";
import FormCheckboxField from "../../components/FormCheckboxField";
import { fetchAddDomains } from "../../actions/domains";
import { withRouter } from "react-router";

let AddDomainForm = props => {
  const { handleSubmit, pristine, submitting, error } = props;
  const { favorite_id } = props.match.params;
  const closeForm = () => {
    props.closeForm();
    props.destroy();
  };

  const submitForm = values => {
    return props.dispatch(
      fetchAddDomains({ favorite_id, domains: [values] }, closeForm)
    );
  };

  return (
    <div className="popup-content">
      <form className="form" onSubmit={handleSubmit(submitForm)}>
        <FormField name="domain" label="Домен" />
        <FormField
          name="priority"
          label="Приоритет"
          type="number"
          minValue={1}
        />
        <FormSelectField name="age_id" label="Возрастная группа" options={[]} />
        <FormCheckboxField name="male" label="Мужчина" />
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

AddDomainForm = reduxForm({
  form: "AddDomainForm"
})(AddDomainForm);

export default connect()(withRouter(AddDomainForm));
