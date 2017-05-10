import React from "react";
import urls from "../../urls";
import Dropdown from "../../components/navDropdown";
import DropdownLink from "../../components/dropdownLink";

const itemsArray = [
  {
    icon: "",
    type: "Edit Distributions",
    to: "#"
  }
];

const ProfileBranch = props => {
  const items = itemsArray.map((elm, index) => (
    <DropdownLink
      parentClasses="dropdown-item"
      icon={elm.icon}
      name={elm.type}
      to={elm.to}
      key={index}
    />
  ));

  return (
    <Dropdown
      hatElement={() => {
        return <i className="al-2x al-user" />;
      }}
      isOpen={props.isOpen}
      handleClick={props.handleClick}
    >
      <ul className="dropdown-menu dropdown-right">
        {items}
      </ul>
    </Dropdown>
  );
};

export default ProfileBranch;
