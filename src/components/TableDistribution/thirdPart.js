import React from "react";
import PropTypes from "prop-types";
import ItemTable from "./itemTable";

const ThirdPart = props => {
  const items = props.rows.map((elm, index) => (
    <ItemTable {...elm} key={index} />
  ));
  return (
    <td className="table-three-box">
      <table>
        <thead>
          <tr>{props.headRow}</tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </table>
    </td>
  );
};

ThirdPart.propTypes = {
  headRow: PropTypes.array.isRequired,
  rows: PropTypes.array
};

export default ThirdPart;
