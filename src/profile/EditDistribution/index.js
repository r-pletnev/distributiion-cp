import React from "react";
import TableDistribution from "../../components/TableDistribution";
import {
  getDevices,
  getDeviceById,
  getDevicePriorities
} from "../../reducers/devices";
import { getModels, getModelById } from "../../reducers/models";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { mapById } from "../../utils/ramda";

const EditDistribution = props => {
  return (
    <div className="main-content">
      <h2>Распределение параметров окружения</h2>
      <TableDistribution {...props} />
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    devices: {
      items: getDevices(state),
      byId: getDeviceById(state),
      priorities: mapById(
        getDevicePriorities(state, ownProps.match.params.profile_name),
        getDevices(state)
      )
    },
    models: {
      items: getModels(state),
      byId: getModelById(state),
      priorities: []
    }
  };
}

export default withRouter(connect(mapStateToProps)(EditDistribution));
