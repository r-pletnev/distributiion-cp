import React from "react";
import MainPage from "./cabinet";
import ProfilePage from "./profile";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PageLayout from "./layout";
import urls from "./urls";
import * as hooks from "./uploader";

const NoMatch = ({ location }) => (
  <div>
    <h2>Whoops</h2>
    <p>Sorry but {location.pathname} didn’t match any pages</p>
  </div>
);

const App = props => {
  const { store } = props;
  return (
    <BrowserRouter>
      <PageLayout>
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path={urls.os_panels} render={hooks.loadOsPanels(store)} />
          <Route path={urls.models} render={hooks.loadModels(store)} />
          <Route path={urls.devices} render={hooks.loadDevices(store)} />
          <Route path={urls.os} render={hooks.loadOses(store)} />
          <Route path={urls.os_arch} render={hooks.loadArchs(store)} />
          <Route path={urls.os_versions} render={hooks.loadOsVersions(store)} />
          <Route path={urls.screens} render={hooks.loadScreens(store)} />
          <Route path={urls.browsers} render={hooks.loadBrowsers(store)} />
          <Route
            path={urls.browser_versions}
            render={hooks.loadBrowserVersions(store)}
          />
          <Route path={urls.templates} render={hooks.loadTemplates(store)} />
          <Route
            path={urls.browser_panel_versions}
            render={hooks.loadBrowserPanels(store)}
          />
          <Route
            path={urls.profiles}
            exact
            render={hooks.loadProfiles(store)}
          />
          <Route path={urls.profile} exact component={ProfilePage} />
          <Route
            path={urls.distribution}
            render={hooks.loadDistribution(store)}
          />
          <Route
            exact
            path={urls.favorites}
            render={hooks.loadFavorites(store)}
          />
          <Route path={urls.domains} render={hooks.loadDomains(store)} />
          <Route path={urls.ages} render={hooks.loadAges(store)} />
          <Route component={NoMatch} />
        </Switch>
      </PageLayout>
    </BrowserRouter>
  );
};
export default App;
