import React from "react";
import { Field } from "redux-form";
import PropTypes from "prop-types";

const SelectField = props => {
  const options = props.options.map(elm => (
    <option value={elm.id} key={elm.id}>{elm.name}</option>
  ));
  return (
    <div>
      <label>{props.label}</label>
      <div className="selectDiv">
        <Field name={props.name} component="select" disabled={props.disabled}>
          <option value="">Select item</option>
          {options}
        </Field>
      </div>
    </div>
  );
};

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool
};

export default SelectField;
