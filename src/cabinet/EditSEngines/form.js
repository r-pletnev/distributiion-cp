import R from "ramda";
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";
import FormField from "../../components/FormField";
import { fetchAddSearchEngine } from "../../actions/search_engines";
import { getSearchEngines } from "../../reducers/search_engines";

let AddSearchEngineForm = props => {
  const { handleSubmit, pristine, submitting, error } = props;

  const closeForm = () => {
    props.closeForm();
    props.destroy();
  };
  const submitForm = values => {
    return props.dispatch(fetchAddSearchEngine(values, closeForm));
  };

  return (
    <div className="popup-content">
      <form className="form" onSubmit={handleSubmit(submitForm)}>
        <FormField name="name" label="Поисковая система" />
        <FormField name="payload" label="Шаблон адреса поиска" />
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

AddSearchEngineForm = reduxForm({
  form: "AddSearchEngineForm"
})(AddSearchEngineForm);

export default connect()(AddSearchEngineForm);
