import React from "react";
import urls from "../../urls";
import Dropdown from "../../components/navDropdown";
import DropdownLink from "../../components/dropdownLink";

const itemsArray = [
  {
    icon: "",
    type: "Devices",
    to: urls.devices
  },
  {
    icon: "",
    type: "Screens",
    to: urls.screens
  },
  {
    icon: "",
    type: "Models",
    to: urls.models
  },
  {
    icon: "",
    type: "Operation Systems",
    to: urls.os
  },
  {
    icon: "",
    type: "OS versions",
    to: urls.os_versions
  },
  {
    icon: "",
    type: "OS architectures",
    to: urls.os_arch
  },
  {
    icon: "",
    type: "OS panel",
    to: urls.os_panels
  },
  {
    icon: "",
    type: "Browsers",
    to: urls.browsers
  },
  {
    icon: "",
    type: "Browser versions",
    to: urls.browser_versions
  },
  {
    icon: "",
    type: "UA templates",
    to: urls.templates
  }
];

const ItemsBranch = props => {
  const items = itemsArray.map((elm, index) => (
    <DropdownLink
      parentClasses="dropdown-item"
      icon={elm.icon}
      name={elm.type}
      to={elm.to}
      key={index}
      className="item-name"
    />
  ));

  return (
    <Dropdown
      hatElement={() => {
        return <i className="al-2x al-navbar" />;
      }}
      isOpen={props.isOpen}
      handleClick={props.handleClick}
    >
      <ul className="dropdown-menu dropdown-menu-right">
        {items}
      </ul>
    </Dropdown>
  );
};

export default ItemsBranch;
