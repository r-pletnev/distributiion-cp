import {
  AddModel,
  GetModels,
  RemoveModels,
  GetModelPriorities,
  SetModelPriorities
} from "../api/models";
import {
  ADD_MODEL_SUCCESS,
  GET_ALL_MODEL_SUCCESS,
  REMOVE_MODELS_SUCCESS,
  GET_MODEL_PRIORITIES_SUCCESS,
  SET_MODEL_PRIORITY_SUCCESS
} from "../constants/models";

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
    payload: elm.payload,
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
  const { model_id, name, device_id, ...rest } = payload;
  return {
    type: ADD_MODEL_SUCCESS,
    payload: {
      id: model_id,
      name,
      payload: rest.payload,
      device_id
    }
  };
}

export function fetchRemoveModels(items) {
  return dispatch => {
    return RemoveModels(items)
      .then(response => {
        dispatch(removeModelsSuccess(items));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

function removeModelsSuccess(payload) {
  return {
    type: REMOVE_MODELS_SUCCESS,
    payload
  };
}

// query shape: profile_name, device_id
export function fetchModelPriorities(query) {
  return dispatch => {
    return GetModelPriorities(query)
      .then(response => {
        dispatch(getModelPrioritiesSuccess(response.data, query));
      })
      .catch(error => {
        console.error(error);
      });
  };
}

function getModelPrioritiesSuccess(payload, { profile_name, device_id }) {
  const priorities = payload.reduce(
    (acc, elm) => {
      acc[profile_name] = [
        ...acc[profile_name],
        { id: elm.model_id, priority: elm.priority, device_id }
      ];
      return acc;
    },
    { [profile_name]: [] }
  );
  return {
    type: GET_MODEL_PRIORITIES_SUCCESS,
    payload: priorities
  };
}

export function fetchSetModelPrioirty(
  { profile_name, device_id, model_id, priority },
  onSuccess
) {
  const query = arguments[0];
  return dispatch => {
    return SetModelPriorities(query)
      .then(response => {
        dispatch(
          setModelPrioritySuccess(
            { device_id, model_id, priority },
            profile_name
          )
        );
        onSuccess();
      })
      .catch(error => {
        console.error(error);
      });
  };
}

function setModelPrioritySuccess(payload, profile_name) {
  const priority = {
    id: payload.model_id,
    device_id: payload.device_id,
    priority: Number(payload.priority)
  };
  return {
    type: SET_MODEL_PRIORITY_SUCCESS,
    payload: { profile_name, priority }
  };
}
