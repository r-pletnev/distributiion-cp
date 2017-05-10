import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.svg";
import Items from "./items";
import Profile from "./profile";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: null };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(type) {
    return e => {
      e.preventDefault();
      const open = this.state.open === type ? null : type;
      this.setState({ open });
    };
  }

  render() {
    return (
      <div className="navbar">
        <div className="nav left">
          <Link to="/" className="logo">
            <img src={logo} />
            <h1>Antlace</h1>
          </Link>
        </div>
        <div className="nav fill" />
        <Items
          isOpen={"items" === this.state.open}
          handleClick={this.handleClick("items")}
        />
        <Profile
          isOpen={"profile" === this.state.open}
          handleClick={this.handleClick("profile")}
        />
      </div>
    );
  }
}

export default Navbar;
