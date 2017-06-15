import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import FormField from "../../components/FormField";
import { getCurrentProfile } from "../../reducers/ux";
import {getPriorities} from '../../reducers/adblocks'
import {fetchSetAdblocks} from '../../actions/adblocks'

let EditProfile = props => {
  const { handleSubmit, pristine, submitting, error } = props;

  const closeForm = () => {
    props.closeForm();
    props.destroy();
  };

  const submitForm = ({profile_name, without_block, with_block}) => {
    const prs = [
      {profile_name, is_blocked: false, priority: Number(without_block)},
      {profile_name, is_blocked: true, priority: Number(with_block)}
    ]
    props.setAdblocks(prs, profile_name, closeForm)
  };

  return (
    <div className="popup-content">
      <form className="form" onSubmit={handleSubmit(submitForm)}>
        <FormField name="profile_name" label="Имя профиля" />
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
  form: "EditProfile",
  enableReinitialize: true
})(EditProfile);

function mapStateToProps(state) {
  return {
    initialValues: { profile_name: getCurrentProfile(state), ...getPriorities(state) }
  };
}

export default connect(mapStateToProps, {setAdblocks: fetchSetAdblocks})(EditProfile);
