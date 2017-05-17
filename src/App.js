import React from "react";
import MainPage from "./cabinet";
import EditDevices from "./cabinet/EditDevices";
import EditScreens from "./cabinet/EditScreens";
import EditOses from "./cabinet/EditOses";
import EditModels from "./cabinet/EditModels";
import EditArchs from "./cabinet/EditArchs";
import EditBrowsers from "./cabinet/EditBrowsers";
import EditOsVersions from "./cabinet/EditOsVersions";
import EditBrowserVersions from "./cabinet/EditBrowserVersions";
import EditBrowserPanels from "./cabinet/EditBrowserPanels";
import EditOsPanels from "./cabinet/EditOsPanels";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PageLayout from "./layout";
import urls from "./urls";

const NoMatch = ({ location }) => (
  <div>
    <h2>Whoops</h2>
    <p>Sorry but {location.pathname} didn’t match any pages</p>
  </div>
);

const App = props => {
  return (
    <BrowserRouter>
      <PageLayout>
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path={urls.os_panels} component={EditOsPanels} />
          <Route path={urls.models} component={EditModels} />
          <Route path={urls.devices} component={EditDevices} />
          <Route path={urls.os} component={EditOses} />
          <Route path={urls.os_arch} component={EditArchs} />
          <Route path={urls.os_versions} component={EditOsVersions} />
          <Route path={urls.screens} component={EditScreens} />
          <Route path={urls.browsers} component={EditBrowsers} />
          <Route path={urls.browser_versions} component={EditBrowserVersions} />
          <Route
            path={urls.browser_panel_versions}
            component={EditBrowserPanels}
          />
          <Route component={NoMatch} />
        </Switch>
      </PageLayout>
    </BrowserRouter>
  );
};
export default App;
