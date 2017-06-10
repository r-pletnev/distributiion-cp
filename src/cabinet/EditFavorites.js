import React from "react";
import { connect } from "react-redux";
import TableView from "../components/TableView";
import { fetchAddFavorite, fetchRemoveFavorites } from "../actions/favorites";
import { getFavorites } from "../reducers/favorites";
import ButtonBlock from "../components/ButtonOptions";

const TableRow = ({ elm, onRemove }) => {
  return (
    <tr key={elm.id}>
      <td className="id">{elm.id}</td>
      <td>{elm.name}</td>
      <ButtonBlock onRemoveClick={onRemove([elm.id])} />
    </tr>
  );
};

const EditFavorites = props => {
  const rows = props.favorites.map(elm => (
    <TableRow
      elm={elm}
      onRemove={ids => () => props.fetchRemoveFavorites(ids)}
    />
  ));

  return (
    <TableView
      title="Управление кругами интересов"
      createBtnLabel="Создать круг интересов"
      headRow={["#", "Круг интересов"]}
      rows={rows}
      action={fetchAddFavorite}
      nameLabel="Имя круга интересов"
      nameBtn="Отправить"
    />
  );
};

function mapStateToProps(state) {
  return {
    favorites: getFavorites(state)
  };
}

function mapDispacthToProps(dispatch) {
  return {
    fetchRemoveFavorites: ids => dispatch(fetchRemoveFavorites(ids))
  };
}

export default connect(mapStateToProps, mapDispacthToProps)(EditFavorites);
