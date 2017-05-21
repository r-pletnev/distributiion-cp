import React from "react";
import { connect } from "react-redux";
import TableView from "../../components/TableView";
import { getProfiles } from "../../reducers/profiles";

const TableRow = props => {
  const { elm, index } = props;
  return (
    <tr key={index}>
      <td className="id">{index}</td>
      <td>{elm.name}</td>
    </tr>
  );
};

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
      specialForm={null}
    />
  );
};

function mapStateToProps(state) {
  return {
    items: getProfiles(state)
  };
}

export default connect(mapStateToProps)(EditProfiles);
