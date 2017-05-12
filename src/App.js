import React from "react";
import MainPage from "./cabinet";
import EditDevices from "./cabinet/EditDevices";
import EditOses from "./cabinet/EditOses";
import EditModels from "./cabinet/EditModels";
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
          <Route path={urls.models} component={EditModels} />
          <Route path={urls.devices} component={EditDevices} />
          <Route path={urls.os} component={EditOses} />
          <Route component={NoMatch} />
        </Switch>
      </PageLayout>
    </BrowserRouter>
  );
};
export default App;
