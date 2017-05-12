import { AddModel, GetModels } from "../api/models";
import { ADD_MODEL_SUCCESS, GET_ALL_MODEL_SUCCESS } from "../constants/models";

export function fetchAllModels() {
  const device = {};
  return dispatch => {
    return GetModels(device)
      .then(response => {
        dispatch(fetchAllModelSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function fetchAllModelSuccess(payload) {
  const models = payload.map(elm => ({
    id: elm.model_id,
    name: elm.name,
    width: elm.width,
    height: elm.height,
    device_id: elm.device_id
  }));
  return {
    type: GET_ALL_MODEL_SUCCESS,
    payload: models
  };
}

export function fetchAddModel(model, onSuccess) {
  const { device_id } = model;
  const device = { device_id: Number(device_id) };
  model = { ...model, ...{ device } };
  return dispatch => {
    return AddModel(model)
      .then(response => {
        onSuccess();
        dispatch(addModelSuccess({ ...response.data, ...device }));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

function addModelSuccess(payload) {
  const { model_id, name, width, height, device_id } = payload;
  return {
    type: ADD_MODEL_SUCCESS,
    payload: {
      id: model_id,
      name,
      width,
      height,
      device_id
    }
  };
}
