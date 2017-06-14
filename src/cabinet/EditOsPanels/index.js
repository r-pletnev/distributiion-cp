import React from "react";
import { connect } from "react-redux";
import TableView from "../../components/TableView";
import { fetchRemoveOsPanels } from "../../actions/os_panels";
import { getOsPanels, getOsPanelById } from "../../reducers/os_panels";
import AddOsPanelForm from "./form";
import ButtonBlock from "../../components/ButtonOptions";

const TableRow = props => {
  const { elm, onRemove } = props;
  return (
    <tr key={elm.id}>
      <td className="id">{elm.id}</td>
      <td>{elm.size}</td>
      <ButtonBlock onRemoveClick={onRemove([elm.id])} />
    </tr>
  );
};

const EditOsPanels = props => {
  const rows = props.items.map(elm => (
    <TableRow
      elm={elm}
      onRemove={ids => () => props.dispatch(fetchRemoveOsPanels(ids))}
    />
  ));

  return (
    <TableView
      title="Управление панелями ОС"
      createBtnLabel="Создать панель ОС"
      headRow={["#", "Высота"]}
      rows={rows}
      specialForm={AddOsPanelForm}
    />
  );
};

function mapStateToProps(state) {
  return {
    items: getOsPanels(state)
  };
}

export default connect(mapStateToProps)(EditOsPanels);
