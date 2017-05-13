import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";
import devices from "./devices";
import models from "./models";
import oses from "./oses";
import archs from "./archs";

export const rootReducer = combineReducers({
  form: FormReducer,
  devices,
  models,
  oses,
  archs
});
