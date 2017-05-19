import R from "ramda";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import { createTransform, persistStore } from "redux-persist";

const store = configureStore();

const myTransform = createTransform((inboundState, key) => {
  const notFetch = R.when(
    R.propSatisfies(R.equals(true), "fetchStatus"),
    R.assoc("fetchStatus", false)
  );
  return notFetch(inboundState);
});

persistStore(store, { transforms: [myTransform] });

ReactDOM.render(
  <Provider store={store}>
    <App store={store} />
  </Provider>,
  document.getElementById("root")
);
