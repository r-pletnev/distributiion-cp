import React from "react";
import { Link } from "react-router-dom";

const Card = props => {
  const { title, text, to, image, ...restProps } = props;
  return (
    <div className="card" {...restProps}>
      <div className="card-block">
        <div className="card-image">
          <i className={image} />
        </div>
        <h4 className="title">{title}</h4>
        <p className="text">{text}</p>
        <Link className="btn btn-primary" to={to}>{title}</Link>
      </div>
    </div>
  );
};

export default Card;
