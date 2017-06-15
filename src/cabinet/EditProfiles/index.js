import React from "react";
import { connect } from "react-redux";
import TableView from "../../components/TableView";
import { getProfiles } from "../../reducers/profiles";
import { fetchCreateProfile } from "../../actions/profiles";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import ModalEditProfile from "./editForm";
import ButtonBlock from "../../components/ButtonOptions";
import { getEditProfileStatus } from "../../reducers/ux";
import { openEditProfileModal, closeEditProfleModal } from "../../actions/ux";
import { fetchAdblocks } from "../../actions/adblocks";

let TableRow = ({ elm, index, match, editClick }) => {
  return (
    <tr key={index}>
      <td className="id">{index}</td>
      <td><Link to={`${match.url}/${elm.name}`}>{elm.name}</Link></td>
      <ButtonBlock onEditClick={editClick(elm.name)} />
    </tr>
  );
};

TableRow = withRouter(TableRow);

const EditProfiles = props => {
  const handleOnClick = profile_name =>
    () => {
      props.getAdblocks(profile_name);
      props.openEditModal(profile_name);
    };

  const rows = props.items.map((elm, index) => (
    <TableRow
      elm={elm}
      index={index + 1}
      key={index}
      editClick={handleOnClick}
    />
  ));
  return (
    <TableView
      title="Управление профилями"
      createBtnLabel="Создать профиль"
      headRow={["#", "Имя профиля"]}
      nameLabel="Имя профиля"
      nameBtn="Отправить"
      rows={rows}
      action={fetchCreateProfile}
      editForm={ModalEditProfile}
      statusEditForm={props.statusEditModal}
      closeEditForm={props.closeEditModal}
      editFormTitle="Параметры профиля"
    />
  );
};

function mapStateToProps(state) {
  return {
    items: getProfiles(state),
    statusEditModal: getEditProfileStatus(state)
  };
}

export default connect(mapStateToProps, {
  openEditModal: openEditProfileModal,
  closeEditModal: closeEditProfleModal,
  getAdblocks: fetchAdblocks
})(EditProfiles);
