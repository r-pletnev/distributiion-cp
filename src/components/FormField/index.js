import React from "react";
import { Field } from "redux-form";
import PropTypes from "prop-types";
import cx from "classnames";

export const renderField = ({
  input,
  label,
  type,
  meta,
  SubLink,
  ...restProps
}) => (
  <div
    className={cx("form-group", { "has-error": meta.touched && meta.error })}
  >
    <label htmlFor={restProps.id}>{label}: {SubLink && <SubLink />}</label>
    {" "}
    <div className="group">
      {type === "textarea"
        ? <textarea
            {...input}
            id={restProps.id}
            className={cx("form-control", {
              "form-control-danger": meta.touched && meta.error
            })}
            maxLength={restProps.maxLength}
            placeholder={restProps.placeholder}
            disabled={restProps.disabled}
            rows={3}
            autoFocus={restProps.autoFocus}
          />
        : <input
            {...input}
            id={restProps.id}
            className={cx("form-control", {
              "form-control-danger": meta.touched && meta.error
            })}
            placeholder={restProps.placeholder}
            type={type}
            disabled={restProps.disabled}
            min={restProps.minValue}
            max={restProps.maxValue}
            autoFocus={restProps.autoFocus}
            autoComplete={restProps.autoComplete}
            maxLength={restProps.maxLength}
            {...type === "number" && { step: restProps.step }}
          />}
      {meta.touched &&
        meta.error &&
        <div className="form-control-error">{meta.error}</div>}
    </div>
    <div className="form-control-note">{restProps.helpText}</div>
  </div>
);

const FormField = props => {
  const {
    type,
    label,
    placeholder,
    helpText,
    disabled,
    SubLink,
    ...restProps
  } = props;
  return (
    <Field
      type={type}
      component={renderField}
      label={label}
      helpText={helpText}
      disabled={disabled}
      SubLink={SubLink}
      placeholder={placeholder}
      {...restProps}
    />
  );
};

FormField.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  helpText: PropTypes.string,
  disabled: PropTypes.bool,
  SubLink: PropTypes.func,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  maxLength: PropTypes.number,
  autoComplete: PropTypes.string
};

FormField.defaultProps = {
  placeholder: "",
  helpText: "",
  disabled: false,
  SubLink: null,
  minValue: 0,
  maxLength: 250,
  autoComplete: "on",
  type: "text",
  step: "1"
};

export default FormField;
