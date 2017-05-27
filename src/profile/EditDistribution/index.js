import React from "react";
import TableDistribution from "../../components/TableDistribution";
import {
  getDevices,
  getDeviceById,
  getDevicePriorities
} from "../../reducers/devices";
import {
  getModels,
  getModelById,
  getModelPriorities
} from "../../reducers/models";
import { getOses, getOsById, getOsPriorities } from "../../reducers/oses";
import { fetchModelPriorities } from "../../actions/models";
import { fetchOsPriorities } from "../../actions/oses";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

function onDeviceRowClick(profile_name, action) {
  return (device_id, selectAction) => () => {
    selectAction(device_id);
    action({ profile_name, device_id });
  };
}

function onModelRowClick(profile_name, action) {
  return (model_id, device_id, selectAction) => () => {
    selectAction(model_id);
    action({ profile_name, model_id, device_id });
  };
}

const EditDistribution = props => {
  const { profile_name } = props.match.params;
  const { fetchModelPrs, fetchOsPrs, ...restProps } = props;
  return (
    <div className="main-content">
      <h2>Распределение параметров окружения</h2>
      <TableDistribution
        {...restProps}
        onDeviceRowClick={onDeviceRowClick(profile_name, fetchModelPrs)}
        onModelRowClick={onModelRowClick(profile_name, fetchOsPrs)}
      />
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  const { profile_name } = ownProps.match.params;
  return {
    devices: {
      items: getDevices(state),
      byId: getDeviceById(state),
      priorities: getDevicePriorities(state, profile_name)
    },
    models: {
      items: getModels(state),
      byId: getModelById(state),
      priorities: getModelPriorities(state, profile_name)
    },
    oses: {
      items: getOses(state),
      byId: getOsById(state),
      priorities: getOsPriorities(state, profile_name)
    }
  };
}

function mapDispacthToProps(dispatch) {
  return {
    fetchModelPrs: query => dispatch(fetchModelPriorities(query)),
    fetchOsPrs: query => dispatch(fetchOsPriorities(query))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispacthToProps)(EditDistribution)
);
