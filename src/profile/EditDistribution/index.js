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
import {
  getOsVersions,
  getOsVersionById,
  getOsVersionPriorities
} from "../../reducers/os_versions";
import {
  getBrowsers,
  getBrowserById,
  getBrowserPriorities
} from "../../reducers/browsers";
import {
  getBrowserVersions,
  getBrowserVersionById,
  getBrowserVersionPriorities
} from "../../reducers/browser_versions";
import { fetchModelPriorities } from "../../actions/models";
import { fetchOsPriorities } from "../../actions/oses";
import { fetchOsVersionPriorities } from "../../actions/os_versions";
import { fetchBrowserPriorities } from "../../actions/browsers";
import { fetchBrowserVersionPriorities } from "../../actions/browser_versions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

function onDeviceRowClick(profile_name, action) {
  return (device_id, selectAction, afterLoadAction) =>
    () => {
      selectAction(device_id);
      action({ profile_name, device_id }).then(result => {
        afterLoadAction(device_id)();
      });
    };
}

function onModelRowClick(profile_name, action) {
  return (model_id, device_id, selectAction, afterLoadAction) =>
    () => {
      selectAction(model_id);
      action({ profile_name, model_id, device_id }).then(_ => {
        afterLoadAction(model_id)();
      });
    };
}

function onOsRowClick(profile_name, action) {
  return (os_id, device_id, model_id, selectAction, afterLoadAction) =>
    () => {
      selectAction(os_id);
      action({ profile_name, device_id, model_id, os_id }).then(_ => {
        afterLoadAction(os_id)();
      });
    };
}

function onOsVersionRowClick(profile_name, action) {
  return (
    os_version_id,
    device_id,
    model_id,
    os_id,
    selectAction,
    afterLoadAction
  ) =>
    () => {
      selectAction(os_version_id);
      action({
        profile_name,
        device_id,
        model_id,
        os_id,
        os_version_id
      }).then(_ => {
        afterLoadAction(os_version_id)();
      });
    };
}

function onBrowserRowClick(profile_name, action) {
  return (
    browser_id,
    device_id,
    model_id,
    os_id,
    os_version_id,
    selectAction,
    afterLoadAction
  ) =>
    () => {
      selectAction(browser_id);
      action({
        profile_name,
        device_id,
        model_id,
        os_id,
        os_version_id,
        browser_id
      }).then(_ => {
        afterLoadAction(browser_id)();
      });
    };
}

const EditDistribution = props => {
  const { profile_name } = props.match.params;
  const {
    fetchModelPrs,
    fetchOsPrs,
    fetchOsVersionPrs,
    fetchBrowserPrs,
    fetchBrowserVersionPrs,
    ...restProps
  } = props;
  return (
    <div className="main-content">
      <h2>Распределение параметров окружения</h2>
      <TableDistribution
        {...restProps}
        onDeviceRowClick={onDeviceRowClick(profile_name, fetchModelPrs)}
        onModelRowClick={onModelRowClick(profile_name, fetchOsPrs)}
        onOsRowClick={onOsRowClick(profile_name, fetchOsVersionPrs)}
        onOsVersionRowClick={onOsVersionRowClick(profile_name, fetchBrowserPrs)}
        onBrowserRowClick={onBrowserRowClick(
          profile_name,
          fetchBrowserVersionPrs
        )}
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
    },
    os_versions: {
      items: getOsVersions(state),
      byId: getOsVersionById(state),
      priorities: getOsVersionPriorities(state, profile_name)
    },
    browsers: {
      items: getBrowsers(state),
      byId: getBrowserById(state),
      priorities: getBrowserPriorities(state, profile_name)
    },
    browser_versions: {
      items: getBrowserVersions(state),
      byId: getBrowserVersionById(state),
      priorities: getBrowserVersionPriorities(state, profile_name)
    }
  };
}

function mapDispacthToProps(dispatch) {
  return {
    fetchModelPrs: query => dispatch(fetchModelPriorities(query)),
    fetchOsPrs: query => dispatch(fetchOsPriorities(query)),
    fetchOsVersionPrs: query => dispatch(fetchOsVersionPriorities(query)),
    fetchBrowserPrs: query => dispatch(fetchBrowserPriorities(query)),
    fetchBrowserVersionPrs: query =>
      dispatch(fetchBrowserVersionPriorities(query))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispacthToProps)(EditDistribution)
);
