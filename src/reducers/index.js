import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";
import devices from "./devices";
import models from "./models";
import oses from "./oses";

export const rootReducer = combineReducers({
  form: FormReducer,
  devices,
  models,
  oses
});
