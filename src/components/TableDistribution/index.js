import React from "react";

class TableDistribution extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <table className="table table-three">
        <thead className="table-three-root">
          <tr>
            <th>Устройства</th>
            <th>Операционные системы</th>
            <th>Браузеры</th>
          </tr>
        </thead>
        <tbody />
      </table>
    );
  }
}

export default TableDistribution;
