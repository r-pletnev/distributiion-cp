import React from "react";
import MainPage from "./cabinet";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PageLayout from "./layout";

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
          <Route path="/home" component={MainPage} />
          <Route component={NoMatch} />
        </Switch>
      </PageLayout>
    </BrowserRouter>
  );
};
export default App;
