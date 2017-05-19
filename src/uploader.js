import { getProp } from "./utils/ramda";
import React from "react";
import EditTemplates from "./cabinet/EditTemplates";
import { fetchAllTemplates } from "./actions/templates";
import { fetchAllBrowsers } from "./actions/browsers";

const render = Component =>
  fns =>
    store =>
      () => {
        const { dispatch, getState } = store;
        const state = getState();
        fns.forEach(elm => {
          const { action, always, path } = elm;
          const loaded = always ? false : getProp(path, state);
          if (!loaded) dispatch(action());
        });
        return <Component />;
      };

export const loadTemplates = render(EditTemplates)([
  { action: fetchAllBrowsers, path: ["browsers.fetchStatus"] },
  { action: fetchAllTemplates, path: ["templates.fetchStatus"] }
]);
