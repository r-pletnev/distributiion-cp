import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";
import devices from "./devices";
import models from "./models";
import oses from "./oses";
import archs from "./archs";
import os_versions from "./os_versions";
import screens from "./screens";
import browsers from "./browsers";
import browser_versions from "./browser_versions";

export const rootReducer = combineReducers({
  form: FormReducer,
  devices,
  models,
  oses,
  archs,
  os_versions,
  screens,
  browsers,
  browser_versions
});
