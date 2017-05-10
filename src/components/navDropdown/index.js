import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import onClickOutside from "react-onclickoutside";

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isOpen: nextProps.isOpen });
  }

  handleClickOutside = event => {
    this.setState({ isOpen: false });
  };

  render() {
    return (
      <div
        className={cx("nav dropdown", {
          active: this.props.isSelect,
          open: this.state.isOpen
        })}
        onClick={this.props.handleClick}
      >
        <div className="dropdown-toggle">
          <span className="text">
            <this.props.hatElement />
          </span>
          <i className="al-caret-down" />
        </div>
        {this.props.children}
      </div>
    );
  }
}

Dropdown.propTypes = {
  hatElement: PropTypes.func,
  handleClick: PropTypes.func,
  isOpen: PropTypes.bool,
  isSelect: PropTypes.bool
};

export default onClickOutside(Dropdown);
