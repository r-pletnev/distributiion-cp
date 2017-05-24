import React from "react";
import TableDistribution from "../../components/TableDistribution";
import { getDevices, getDeviceById } from "../../reducers/devices";
import { getModels, getModelById } from "../../reducers/models";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const EditDistribution = props => {
  return (
    <div className="main-content">
      <h2>Распределение параметров окружения</h2>
      <TableDistribution {...props} />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    devices: {
      items: getDevices(state),
      byId: getDeviceById(state)
    },
    models: {
      items: getModels(state),
      byId: getModelById(state)
    }
  };
}

export default connect(mapStateToProps)(withRouter(EditDistribution));
