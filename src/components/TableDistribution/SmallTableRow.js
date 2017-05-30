import React from "react";
import cx from "classnames";
import { Link } from "react-router-dom";

class SmallTableRow extends React.Component {
  constructor(props) {
    super(props);
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

export default SmallTableRow;
