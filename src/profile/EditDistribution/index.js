import React from "react";
import TableDistribution from "../../components/TableDistribution";

const EditDistribution = props => {
  return (
    <div className="main-content">
      <h2>Распределение параметров окружения</h2>
      <TableDistribution />
    </div>
  );
};

export default EditDistribution;
