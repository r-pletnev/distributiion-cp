import React from "react";
import Navigation from "./navbar";

const PageLayout = props => {
  return (
    <div>
      <Navigation />
      <div className="main">
        {props.children}
      </div>
    </div>
  );
};

export default PageLayout;
