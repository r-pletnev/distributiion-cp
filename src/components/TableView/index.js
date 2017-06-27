import React from "react";

import PropTypes from "prop-types";
import Table from "../Table";
import AddModal from "../AddModal";

export default class TableView extends React.Component {
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
    const {
      title,
      createBtnLabel,
      headRow,
      rows,
      specialForm,
      editForm,
      defferedRows
    } = this.props;
    return (
      <div>
        <AddModal
          show={this.state.showCreateModal}
          onClose={this.closeModals}
          SpecialForm={specialForm}
          {...this.props}
        />
        {editForm &&
          <AddModal
            show={this.props.statusEditForm}
            onClose={this.props.closeEditForm}
            SpecialForm={editForm}
            title={this.props.editFormTitle}
          />}
        <h2 className="card-title">{title}</h2>
        <div className="table-item-btn">
          <button
            type="button"
            className={`btn btn-${this.props.createBtnClass}`}
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

TableView.defaultProps = {
  createBtnClass: "success"
};

TableView.propTypes = {
  // table props
  title: PropTypes.string,
  createBtnLabel: PropTypes.string,
  createBtnClass: PropTypes.string,
  headRow: PropTypes.array,
  rows: PropTypes.array,

  // form by itself
  specialForm: PropTypes.func,
  specialFormProps: PropTypes.object,

  // or props for defaultForm
  doubleName: PropTypes.string,
  action: PropTypes.func,
  nameLabel: PropTypes.string,
  helpLabel: PropTypes.string,
  nameBtn: PropTypes.string,

  // form for EditModal
  editForm: PropTypes.func,
  statusEditForm: PropTypes.bool,
  closeEditForm: PropTypes.func,
  editFormTitle: PropTypes.string
};
