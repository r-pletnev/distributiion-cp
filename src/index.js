import R from "ramda";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import { createTransform, persistStore } from "redux-persist";

const store = configureStore();

const resetFetchStatus = createTransform((inboundState, key) => {
  const notFetch = R.when(
    R.propSatisfies(R.equals(true), "fetchStatus"),
    R.assoc("fetchStatus", false)
  );
  return notFetch(inboundState);
});

const erasePriorities = createTransform((inboundState, key) => {
  return R.assoc("priorities", {}, inboundState);
});

const resetPriorityFetchStatus = createTransform((inboundState, key) => {
  return R.when(
    R.propSatisfies(R.equals(true), "priorityFetchStatus"),
    R.assoc("priorityFetchStatus", false),
    inboundState
  );
});

persistStore(store, {
  transforms: [resetFetchStatus, erasePriorities]
});

ReactDOM.render(
  <Provider store={store}>
    <App store={store} />
  </Provider>,
  document.getElementById("root")
);
