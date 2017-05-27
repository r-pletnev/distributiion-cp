import { getProp } from "./utils/ramda";
import React from "react";
import EditTemplates from "./cabinet/EditTemplates";
import { fetchAllTemplates } from "./actions/templates";
import EditProfiles from "./cabinet/EditProfiles";
import { fetchAllProfiles } from "./actions/profiles";
import EditBrowserPanels from "./cabinet/EditBrowserPanels";
import { fetchAllBrowserPanels } from "./actions/browser_panels";
import EditBrowsers from "./cabinet/EditBrowsers";
import { fetchAllBrowsers } from "./actions/browsers";
import EditBrowserVersions from "./cabinet/EditBrowserVersions";
import { fetchAllBrowserVersions } from "./actions/browser_versions.js";
import EditScreens from "./cabinet/EditScreens";
import { fetchAllScreens } from "./actions/screens";
import EditModels from "./cabinet/EditModels";
import { fetchAllModels } from "./actions/models";
import EditDevices from "./cabinet/EditDevices";
import { fetchAllDevices } from "./actions/devices";
import { fetchDevicePriorities } from "./actions/devices";
import EditOses from "./cabinet/EditOses";
import { fetchAllOses } from "./actions/oses";
import EditOsVersions from "./cabinet/EditOsVersions";
import { fetchAllOsVersions } from "./actions/os_versions.js";
import EditOsPanels from "./cabinet/EditOsPanels";
import { fetchAllOsPanels } from "./actions/os_panels";
import EditArchs from "./cabinet/EditArchs";
import { fetchAllArchs } from "./actions/archs";
import EditDistribution from "./profile/EditDistribution";

const render = (Component, rest) => fns => store => props => {
  const { params } = props.match;
  const { dispatch, getState } = store;
  const state = getState();
  fns.forEach(elm => {
    const { action, always, path } = elm;
    const loaded = always ? false : getProp(path, state);
    if (!loaded) dispatch(action(params));
  });
  return <Component />;
};

export const loadTemplates = render(EditTemplates)([
  { action: fetchAllBrowsers, path: ["browsers.fetchStatus"] },
  { action: fetchAllTemplates, path: ["templates.fetchStatus"] }
]);

export const loadProfiles = render(EditProfiles)([
  { action: fetchAllProfiles, path: ["profiles.fetchStatus"] }
]);

export const loadBrowserPanels = render(EditBrowserPanels)([
  {
    action: fetchAllBrowserPanels,
    path: ["browser_panels.fetchStatus"]
  }
]);

export const loadBrowsers = render(EditBrowsers)([
  { action: fetchAllBrowsers, path: ["browsers.fetchStatus"] }
]);

export const loadBrowserVersions = render(EditBrowserVersions)([
  { action: fetchAllBrowsers, path: ["browsers.fetchStatus"] },
  { action: fetchAllBrowserVersions, path: ["browser_versions.fetchStatus"] }
]);

export const loadScreens = render(EditScreens)([
  { action: fetchAllModels, path: ["models.fetchStatus"] },
  { action: fetchAllScreens, path: ["screens.fetchStatus"] }
]);

export const loadModels = render(EditModels)([
  { action: fetchAllDevices, path: ["devices.fetchStatus"] },
  { action: fetchAllModels, path: ["models.fetchStatus"] }
]);

export const loadDevices = render(EditDevices)([
  { action: fetchAllDevices, path: ["devices.fetchStatus"] }
]);

export const loadOses = render(EditOses)([
  { action: fetchAllOses, path: ["oses.fetchStatus"] }
]);

export const loadOsVersions = render(EditOsVersions)([
  { action: fetchAllOses, path: ["oses.fetchStatus"] },
  { action: fetchAllOsVersions, path: ["os_versions.fetchStatus"] }
]);

export const loadOsPanels = render(EditOsPanels)([
  { action: fetchAllOses, path: ["oses.fetchStatus"] },
  { action: fetchAllOsVersions, path: ["os_versions.fetchStatus"] },
  { action: fetchAllOsPanels, path: ["os_panels.fetchStatus"] }
]);

export const loadArchs = render(EditArchs)([
  { action: fetchAllOsVersions, path: ["os_versions.fetchStatus"] },
  { action: fetchAllArchs, path: ["archs.fetchStatus"] }
]);

export const loadDistribution = render(EditDistribution)([
  // { action: fetchAllDevices, path: ["devices.fetchStatus"] },
  // { action: fetchAllModels, path: ["models.fetchStatus"] },
  // { action: fetchAllScreens, path: ["screens.fetchStatus"] },
  // { action: fetchAllOses, path: ["oses.fetchStatus"] },
  // { action: fetchAllOsVersions, path: ["os_versions.fetchStatus"] },
  // { action: fetchAllOsPanels, path: ["os_panels.fetchStatus"] },
  // { action: fetchAllArchs, path: ["archs.fetchStatus"] },
  // { action: fetchAllBrowsers, path: ["browsers.fetchStatus"] },
  // { action: fetchAllBrowserVersions, path: ["browser_versions.fetchStatus"] },
  // { action: fetchAllTemplates, path: ["templates.fetchStatus"] },
  // {
  //   action: fetchAllBrowserPanels,
  //   path: ["browser_panels.fetchStatus"]
  // },
  { action: fetchDevicePriorities, path: ["devices.priorityFetchStatus"] }
]);
