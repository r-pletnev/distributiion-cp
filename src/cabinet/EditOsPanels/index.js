import React from "react";
import { connect } from "react-redux";
import TableView from "../../components/TableView";
import { fetchAllOses } from "../../actions/oses";
import { fetchAllOsVersions } from "../../actions/os_versions";
import { fetchAllOsPanels, fetchRemoveOsPanels } from "../../actions/os_panels";
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
  const onEnter = () => {
    props.dispatch(fetchAllOses());
    props.dispatch(fetchAllOsVersions());
    props.dispatch(fetchAllOsPanels());
  };

  return (
    <TableView
      title="Edit OS Panels"
      createBtnLabel="Create Os panel"
      headRow={["ID", "Height"]}
      rows={rows}
      specialForm={AddOsPanelForm}
      onMountAction={onEnter}
    />
  );
};

function mapStateToProps(state) {
  return {
    items: getOsPanels(state)
    // osById: getOsById(state)
  };
}

export default connect(mapStateToProps)(EditOsPanels);
