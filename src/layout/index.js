import R from "ramda";
import React from "react";
import Navigation from "./navbar";
import breadcrumbConfig from "auto-breadcrumb";
import urls from "../urls";
import { Route } from "react-router-dom";

const Breadcrumbs = breadcrumbConfig({ staticRoutesMap: R.invertObj(urls) });

const PageLayout = props => {
  return (
    <div>
      <Navigation />
      <div className="main">
        <div className="main-content">
          <div className="breadcrumb">
            <Route
              render={({ location }) => (
                <Breadcrumbs pathname={location.pathname} />
              )}
            />
          </div>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
