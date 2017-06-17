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
import {
  getOsPanelPriorities,
  getOsPanelById,
  getOsPanels
} from "../../reducers/os_panels";
import {
  getTemplates,
  getTemplateById,
  getTemplatePriorities
} from "../../reducers/templates";
import {
  getScreens,
  getScreenById,
  getScreenPriorities
} from "../../reducers/screens";
import { fetchSetDevicePrioritiy } from "../../actions/devices";
import { getArchs, getArchById, getArchPriorities } from "../../reducers/archs";
import {
  fetchModelPriorities,
  fetchSetModelPrioirty
} from "../../actions/models";
import { fetchOsPriorities, fetchSetOsPriority } from "../../actions/oses";
import {
  fetchOsVersionPriorities,
  fetchSetOsVersionPriority
} from "../../actions/os_versions";
import {
  fetchBrowserPriorities,
  fetchSetBrowserPriority
} from "../../actions/browsers";
import {
  fetchBrowserVersionPriorities,
  fetchSetBrowserVersionPriority
} from "../../actions/browser_versions";
import { fetchArchPriorities, fetchSetArchPriority } from "../../actions/archs";
import {
  fetchOsPanelPriorities,
  fetchSetOsPanelPriority
} from "../../actions/os_panels";
import {
  fetchScreenPriorities,
  fetchSetScreenPriority
} from "../../actions/screens";
import {
  fetchTemplatePriorities,
  fetchSetTemplatePriority
} from "../../actions/templates";
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

function onOsRowClick(profile_name, action) {
  return (os_id, device_id, selectAction, afterLoadAction) =>
    () => {
      selectAction(os_id);
      action({ profile_name, device_id, os_id }).then(_ => {
        afterLoadAction(os_id)();
      });
    };
}

function onOsVersionRowClick(profile_name, action) {
  return (os_version_id, device_id, os_id, selectAction, afterLoadAction) =>
    () => {
      selectAction(os_version_id);
      action({
        profile_name,
        device_id,
        os_id,
        os_version_id
      }).then(_ => {
        afterLoadAction(os_version_id)();
      });
    };
}

function onModelRowClick(profile_name, action) {
  return (
    model_id,
    device_id,
    os_id,
    os_version_id,
    selectAction,
    afterLoadAction
  ) =>
    () => {
      selectAction(model_id);
      action({
        profile_name,
        model_id,
        device_id,
        os_id,
        os_version_id
      }).then(_ => {
        afterLoadAction(model_id)();
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
    fetchSetDevicePry,
    fetchSetModelPry,
    fetchSetOsPry,
    fetchSetOsVersionPry,
    fetchSetBrowserPry,
    fetchSetBrowserVersionPry,
    fetchSetScreenPry,
    fetchSetArchPry,
    fetchSetOsPanelPry,
    fetchSetTemplatePry,
    ...restProps
  } = props;
  return (
    <div className="main-content">
      <h2>Распределение параметров окружения</h2>
      <TableDistribution
        {...restProps}
        onDeviceRowClick={onDeviceRowClick(profile_name, fetchOsPrs)}
        onOsRowClick={onOsRowClick(profile_name, fetchOsVersionPrs)}
        onOsVersionRowClick={onOsVersionRowClick(profile_name, fetchModelPrs)}
        onModelRowClick={onModelRowClick(profile_name, fetchBrowserPrs)}
        onBrowserRowClick={onBrowserRowClick(
          profile_name,
          fetchBrowserVersionPrs
        )}
        fetchSetDevicePry={(profile_name =>
          (values, onSuccess) =>
            fetchSetDevicePry({ ...values, ...{ profile_name } }, onSuccess))(
          profile_name
        )}
        fetchSetModelPry={(profile_name =>
          device_id =>
            (values, onSuccess) =>
              fetchSetModelPry(
                { ...values, ...{ profile_name, device_id } },
                onSuccess
              ))(profile_name)}
        fetchSetOsPry={(profile_name =>
          (device_id, model_id) =>
            (values, onSuccess) =>
              fetchSetOsPry(
                { ...values, ...{ profile_name, device_id, model_id } },
                onSuccess
              ))(profile_name)}
        fetchSetOsVersionPry={(profile_name =>
          (device_id, model_id, os_id) =>
            (values, onSuccess) =>
              fetchSetOsVersionPry(
                { ...values, ...{ profile_name, device_id, model_id, os_id } },
                onSuccess
              ))(profile_name)}
        fetchSetBrowserPry={(profile_name =>
          (device_id, model_id, os_id, os_version_id) =>
            (values, onSuccess) =>
              fetchSetBrowserPry(
                {
                  ...values,
                  ...{ profile_name, device_id, model_id, os_id, os_version_id }
                },
                onSuccess
              ))(profile_name)}
        fetchSetBrowserVersionPry={(profile_name =>
          (device_id, model_id, os_id, os_version_id, browser_id) =>
            (values, onSuccess) =>
              fetchSetBrowserVersionPry(
                {
                  ...values,
                  ...{
                    profile_name,
                    device_id,
                    model_id,
                    os_id,
                    os_version_id,
                    browser_id
                  }
                },
                onSuccess
              ))(profile_name)}
        fetchSetScreenPry={(profile_name =>
          (device_id, model_id) =>
            (values, onSuccess) =>
              fetchSetScreenPry(
                { ...values, ...{ profile_name, device_id, model_id } },
                onSuccess
              ))(profile_name)}
        fetchSetArchPry={(profile_name =>
          (device_id, model_id, os_id) =>
            (values, onSuccess) =>
              fetchSetArchPry(
                { ...values, ...{ profile_name, device_id, model_id, os_id } },
                onSuccess
              ))(profile_name)}
        fetchSetOsPanelPry={(profile_name =>
          (device_id, model_id, os_id, os_version_id) =>
            (values, onSuccess) =>
              fetchSetOsPanelPry(
                {
                  ...values,
                  ...{ profile_name, device_id, model_id, os_id, os_version_id }
                },
                onSuccess
              ))(profile_name)}
        fetchSetTemplatePry={(profile_name =>
          (device_id, model_id, os_id, os_version_id, browser_id) =>
            (values, onSuccess) =>
              fetchSetTemplatePry(
                {
                  ...values,
                  ...{
                    profile_name,
                    device_id,
                    model_id,
                    os_id,
                    os_version_id,
                    browser_id
                  }
                },
                onSuccess
              ))(profile_name)}
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
    },
    archs: {
      items: getArchs(state),
      byId: getArchById(state),
      priorities: getArchPriorities(state, profile_name)
    },
    os_panels: {
      items: getOsPanels(state),
      byId: getOsPanelById(state),
      priorities: getOsPanelPriorities(state, profile_name)
    },
    screens: {
      items: getScreens(state),
      byId: getScreenById(state),
      priorities: getScreenPriorities(state, profile_name)
    },
    templates: {
      items: getTemplates(state),
      byId: getTemplateById(state),
      priorities: getTemplatePriorities(state, profile_name)
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchModelPrs: query => dispatch(fetchModelPriorities(query)),
    fetchOsPrs: query => dispatch(fetchOsPriorities(query)),
    fetchOsVersionPrs: query => dispatch(fetchOsVersionPriorities(query)),
    fetchBrowserPrs: query => dispatch(fetchBrowserPriorities(query)),
    fetchBrowserVersionPrs: query =>
      dispatch(fetchBrowserVersionPriorities(query)),
    fetchArchPrs: query => dispatch(fetchArchPriorities(query)),
    fetchOsPanelPrs: query => dispatch(fetchOsPanelPriorities(query)),
    fetchTemplatePrs: query => dispatch(fetchTemplatePriorities(query)),
    fetchScreenPrs: query => dispatch(fetchScreenPriorities(query)),
    fetchSetDevicePry: (query, onSuccess) =>
      dispatch(fetchSetDevicePrioritiy(query, onSuccess)),
    fetchSetModelPry: (query, onSuccess) =>
      dispatch(fetchSetModelPrioirty(query, onSuccess)),
    fetchSetOsPry: (query, onSuccess) =>
      dispatch(fetchSetOsPriority(query, onSuccess)),
    fetchSetOsVersionPry: (query, onSuccess) =>
      dispatch(fetchSetOsVersionPriority(query, onSuccess)),
    fetchSetBrowserPry: (query, onSuccess) =>
      dispatch(fetchSetBrowserPriority(query, onSuccess)),
    fetchSetBrowserVersionPry: (query, onSuccess) =>
      dispatch(fetchSetBrowserVersionPriority(query, onSuccess)),
    fetchSetScreenPry: (query, onSuccess) =>
      dispatch(fetchSetScreenPriority(query, onSuccess)),
    fetchSetArchPry: (query, onSuccess) =>
      dispatch(fetchSetArchPriority(query, onSuccess)),
    fetchSetOsPanelPry: (query, onSuccess) =>
      dispatch(fetchSetOsPanelPriority(query, onSuccess)),
    fetchSetTemplatePry: (query, onSuccess) =>
      dispatch(fetchSetTemplatePriority(query, onSuccess))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditDistribution)
);
