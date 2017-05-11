import React from "react";
import PropTypes from "prop-types";
import Table from "../Table";
import AddModal from "../AddModal";

class TableView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showCreateModal: false };
    this.openCreateModal = this.openCreateModal.bind(this);
    this.closeModals = this.closeModals.bind(this);
  }

  openCreateModal() {
    this.setState({ showCreateModal: true });
  }

  closeModals() {
    this.setState({
      showCreateModal: false
    });
  }

  render() {
    const { title, createBtnLabel, headRow, rows } = this.props;
    return (
      <div className="main-content">
        <AddModal
          show={this.state.showCreateModal}
          onClose={this.closeModals}
          items={rows}
          {...this.props}
        />
        <h2 className="card-title">{title}</h2>
        <div className="table-item-btn">
          <button
            type="button"
            className="btn btn-success"
            onClick={this.openCreateModal}
          >
            {createBtnLabel}
          </button>
        </div>
        <Table headRow={headRow} rows={rows} />
      </div>
    );
  }
}

TableView.propTypes = {
  title: PropTypes.string,
  createBtnLabel: PropTypes.string,
  headRow: PropTypes.array,
  rows: PropTypes.array,
  // form's props
  doubleName: PropTypes.string,
  action: PropTypes.func,
  nameLabel: PropTypes.string,
  helpLabel: PropTypes.string,
  nameBtn: PropTypes.string
};

export default TableView;