import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ButtonBlock = props => {
  return (
    <td className="option">
      <div className="btn-group">
        <Link to="#" onClick={props.onEditClick} className="btn btn-secondary">
          <i className="al-edit" />
        </Link>
        <Link
          to="#"
          onClick={props.onDublicateClick}
          className="btn btn-secondary"
        >
          <i className="al-duplicate" />
        </Link>
        <Link
          to="#"
          onClick={props.onRemoveClick}
          className="btn btn-secondary"
        >
          <i className="al-trash" />
        </Link>
      </div>
    </td>
  );
};

ButtonBlock.propTypes = {
  onEditClick: PropTypes.func,
  onDublicateClick: PropTypes.func,
  onRemoveClick: PropTypes.func
};

export default ButtonBlock;
