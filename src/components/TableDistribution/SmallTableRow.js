import R from "ramda";
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
        {!R.isNil(this.props.payload) && <td>{this.props.payload}</td>}
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
