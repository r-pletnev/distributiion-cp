import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ButtonBlock = ({ onEditClick, onDublicateClick, onRemoveClick }) => {
  return (
    <td className="option">
      <div className="btn-group">
        {onEditClick &&
          <Link to="#" onClick={onEditClick} className="btn btn-secondary">
            <i className="al-edit" />
          </Link>}
        {onDublicateClick &&
          <Link to="#" onClick={onDublicateClick} className="btn btn-secondary">
            <i className="al-duplicate" />
          </Link>}
        {onRemoveClick &&
          <Link to="#" onClick={onRemoveClick} className="btn btn-secondary">
            <i className="al-trash" />
          </Link>}
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
