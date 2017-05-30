import React from "react";
import { connect } from "react-redux";
import TableView from "../../components/TableView";
import { getProfiles } from "../../reducers/profiles";
import { fetchCreateProfile } from "../../actions/profiles";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import urls from "../../urls";

let TableRow = props => {
  const { elm, index, match } = props;
  return (
    <tr key={index}>
      <td className="id">{index}</td>
      <td><Link to={`${match.url}/${elm.name}`}>{elm.name}</Link></td>
    </tr>
  );
};

TableRow = withRouter(TableRow);

const EditProfiles = props => {
  const rows = props.items.map((elm, index) => (
    <TableRow elm={elm} index={index + 1} key={index} />
  ));
  return (
    <TableView
      title="Управление профилями"
      createBtnLabel="Создать профиль"
      headRow={["#", "Имя профиля"]}
      rows={rows}
      nameLabel="Имя профиля"
      nameBtn="Отправить"
      action={fetchCreateProfile}
    />
  );
};

function mapStateToProps(state) {
  return {
    items: getProfiles(state)
  };
}

export default connect(mapStateToProps)(EditProfiles);
