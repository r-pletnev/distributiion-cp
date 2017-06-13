import React from "react";
import { connect } from "react-redux";
import TableView from "../../components/TableView";
import { getAges } from "../../reducers/ages";
import AddAgeForm from "./form";
import ButtonBlock from "../../components/ButtonOptions";

const TableRow = props => {
  const { elm } = props;
  return (
    <tr key={elm.id}>
      <td className="id">{elm.id}</td>
      <td>{elm.min_age}</td>
      <td>{elm.max_age}</td>
      {/* <ButtonBlock onRemoveClick={onRemove([elm.id])} /> */}
    </tr>
  );
};

const EditAges = props => {
  const rows = props.items.map(elm => <TableRow elm={elm} key={elm.id} />);

  return (
    <TableView
      title="Управление возрастными категориями"
      createBtnLabel="Создать возрастную категориюо"
      headRow={["#", "Минимальный возраст", "Максимальный возраст"]}
      rows={rows}
      specialForm={AddAgeForm}
    />
  );
};

function mapStateToProps(state) {
  return {
    items: getAges(state)
  };
}

export default connect(mapStateToProps)(EditAges);
