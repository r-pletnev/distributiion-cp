import React from "react";
import cx from "classnames";
import { Link } from "react-router-dom";

class BigTableRow extends React.Component {
  constructor() {
    super();
    this.handleOnRowClick = this.handleOnRowClick.bind(this);
  }
  handleOnRowClick() {
    this.props.action();
  }

  render() {
    return (
      <tr
        key={this.props.rowKey}
        className={cx({ active: this.props.isActive })}
        onClick={this.handleOnRowClick}
      >
        <td>{this.props.name || this.props.payload}</td>
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
