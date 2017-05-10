import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = props => {
  const { name, icon, to, parentClasses, ...restProps } = props;
  return (
    <li className={parentClasses}>
      <NavLink to={to} activeClassName="active" {...restProps}>
        <i className={icon} />
        {name}
      </NavLink>
    </li>
  );
};

export default NavItem;
