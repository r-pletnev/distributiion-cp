import React from "react";

const ItemTable = props => {
  return (
    <td className="table-three-items">
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>{singleName}</th>
              <th colSpan="2">Приоритет</th>
            </tr>
          </thead>
          <tbody>
            {priorityRows}
          </tbody>
        </table>
      </div>
    </td>
  );
};

export default ItemTable;
