import React from "react";
import { connect } from "react-redux";
import TableView from "../../components/TableView";
import AddArchForm from "./form";
import { fetchAllOsVersions } from "../../actions/os_versions";
import { fetchAllArchs, fetchRemoveArchs } from "../../actions/archs";
import { getArchs } from "../../reducers/archs";
import ButtonBlock from "../../components/ButtonOptions";

const TableRow = ({ elm, onRemove }) => {
  return (
    <tr key={elm.id}>
      <td className="id">{elm.id}</td>
      <td>{elm.name}</td>
      <td>{elm.payload}</td>
      <ButtonBlock onRemoveClick={onRemove([elm.id])} />
    </tr>
  );
};

const EditArchs = props => {
  const rows = props.archs.map(elm => (
    <TableRow
      elm={elm}
      onRemove={ids => () => props.dispatch(fetchRemoveArchs(ids))}
    />
  ));
  const onEnter = () => {
    props.dispatch(fetchAllOsVersions());
    props.dispatch(fetchAllArchs());
  };
  return (
    <TableView
      title="Edit OS Architecture"
      createBtnLabel="Create OS architecture"
      headRow={["ID", "Architecture", "Payload"]}
      rows={rows}
      specialForm={AddArchForm}
      onMountAction={onEnter}
    />
  );
};

function mapStateToProps(state) {
  return {
    archs: getArchs(state)
  };
}

export default connect(mapStateToProps)(EditArchs);
