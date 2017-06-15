import React from "react";
import { Field } from "redux-form";
import cx from "classnames";

const checkboxField = ({ input, type, id, innerText, ...restProps }) => (
  <div className={cx("form-group", { box: restProps.classBox })}>
    {restProps.title && <label>{restProps.title}</label>}
    <label className="checkbox-label">
      <input {...input} id={id} type={type} tabIndex={0} />
      {" "}
      {restProps.label}
    </label>
    {restProps.helpText &&
      <div className="form-control-note">
        {restProps.helpText}
      </div>}
    {innerText && innerText}
  </div>
);

const FormCheckboxField = props => {
  const { innerText, ...restProps } = props;
  return (
    <Field
      type="checkbox"
      component={checkboxField}
      innerText={innerText}
      {...restProps}
    />
  );
};

FormCheckboxField.defaultProps = {
  classBox: false,
  action: null
};

export default FormCheckboxField;
