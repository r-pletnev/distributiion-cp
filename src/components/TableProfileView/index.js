import React from "react";
import PropTypes from "prop-types";
import TableView from "../TableView";
import AddPriorityForm from "./form";

TableProfileView.propTypes = {
  // table props
  title: PropTypes.string,
  createBtnLabel: PropTypes.string,
  headRow: PropTypes.array,
  rows: PropTypes.array,
  // form props
  form: PropTypes.shape({
    name: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.array,
    action: PropTypes.func
  }).isRequired
};

export default function TableProfileView(props) {
  return (
    <TableView
      {...props}
      createBtnClass="primary"
      specialForm={AddPriorityForm}
      specialFormProps={props.form}
    />
  );
}
