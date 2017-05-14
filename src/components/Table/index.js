import R from "ramda";
import React from "react";
import PropTypes from "prop-types";

const Table = props => {
  const { headRow, rows } = props;
  const getHead = () =>
    headRow.map((elm, index) => {
      if (index === 0) {
        return <th className="id" key={index}>{elm}</th>;
      } else if (headRow.length === index + 1) {
        return <th colSpan="2" key={index}>{elm}</th>;
      } else {
        return <th key={index}>{elm}</th>;
      }
    });

  const getTable = () => {
    return (
      <table className="table table-item">
        <thead>
          <tr>
            {getHead()}
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  };

  const noContent = () => (
    <div className="no-content">
      Rows are out there ...
    </div>
  );

  return R.isEmpty(rows) ? noContent() : getTable();
};

Table.propTypes = {
  headRow: PropTypes.array.isRequired,
  rows: PropTypes.array
};

export default Table;
