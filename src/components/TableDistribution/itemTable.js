import React from "react";
import PropTypes from "prop-types";

const ItemTable = props => {
  const {
    singleItemName,
    secondItemName,
    rows,
    nameAddAttr,
    addBtnText,
    handleOnClick
  } = props;
  return (
    <td className="table-three-items">
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>{singleItemName}</th>
              {secondItemName || <th>{secondItemName}</th>}
              <th colSpan="2">Приоритет</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
      <div className="add-item" onClick={handleOnClick} name={nameAddAttr}>
        {addBtnText}
      </div>
    </td>
  );
};

ItemTable.propTypes = {
  singleItemName: PropTypes.string.isRequired,
  secondItemName: PropTypes.string,
  rows: PropTypes.array,
  nameAddAttr: PropTypes.string,
  addBtnText: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func.isRequired
};

export default ItemTable;
