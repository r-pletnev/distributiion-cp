import React from "react";
import cx from "classnames";
import { Link } from "react-router-dom";

class BigTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
    this.handleOnRowClick = this.handleOnRowClick.bind(this);
  }
  handleOnRowClick() {
    debugger;
    this.props.action();
    this.setState({ active: true });
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
            name="more-device"
            className="al-navbar"
            onClick={this.props.handleDetailClick}
          />
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

export default BigTableRow;
