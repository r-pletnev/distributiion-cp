import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import FormField from "../../components/FormField";
import { getCurrentProfile } from "../../reducers/ux";

let EditProfile = props => {
  const { handleSubmit, pristine, submitting, error } = props;

  const closeForm = () => {
    props.closeForm();
    props.destroy();
  };

  const submitForm = values => {};

  return (
    <div className="popup-content">
      <form className="form" onSubmit={handleSubmit(submitForm)}>
        <FormField name="name" label="Имя профиля" />
        <div className="split">
          <div className="box">
            <FormField
              name="without_block"
              label="Без блокировщика"
              type="number"
              minValue={0}
            />
          </div>
          <div className="box">
            <FormField
              name="with_block"
              label="С блокировщиком"
              type="number"
              minValue={0}
            />
          </div>
        </div>
        <div className="popup-bottom">
          <button
            className="btn btn-success"
            disabled={pristine || submitting}
            type="submit"
          >
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
};

EditProfile = reduxForm({
  form: "EditProfile"
})(EditProfile);

function mapStateToProps(state) {
  return {
    initialValues: { name: getCurrentProfile(state) }
  };
}

export default connect(mapStateToProps)(EditProfile);
