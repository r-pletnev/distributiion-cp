import React from "react";
import cx from "classnames";
import { Link } from "react-router-dom";
import onClickOutside from "react-onclickoutside";

class SmallTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
    this.handleOnRowClick = this.handleOnRowClick.bind(this);
  }

  handleOnRowClick() {
    this.props.action();
    this.setState({ active: true });
  }

  handleClickOutside(event) {
    this.setState({ active: false });
  }

  render() {
    return (
      <tr
        key={this.props.rowKey}
        className={cx({ active: this.state.active })}
        onClick={this.handleOnRowClick}
      >
        <td>{this.props.name}</td>
        <td name="Приоритет">{this.props.priority}</td>
        <td className="option">
          <Link
            to="#"
            className="al-close"
            onClick={this.props.handleRemoveClick}
          />
        </td>
      </tr>
    );
  }
}

export default onClickOutside(SmallTableRow);
