import React from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";
import RFSelectField from "../RFSelectField";

FormSelect2Field.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string
};

export default function FormSelect2Field({ name, options, label }) {
  const getOptions = items =>
    items.map(elm => ({ value: elm.id, label: elm.name }));
  return (
    <Field
      name={name}
      options={getOptions(options)}
      component={RFSelectField}
      label={label}
    />
  );
}
