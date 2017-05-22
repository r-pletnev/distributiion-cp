import React from "react";

const Box = props => {
  return (
    <table>
      <thead>
        <tr>{headRow}</tr>
      </thead>
      <tbody>
        <tr>
          {items}
        </tr>
      </tbody>
    </table>
  );
};

export default Box;
