import React from "react";
import TableView from "../components/TableView";
import { fetchAddOS, fetchRemoveOSES } from "../actions/oses";
import { connect } from "react-redux";
import { getOses } from "../reducers/oses";
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

const EditOses = props => {
  const rows = props.oses.map(elm => (
    <TableRow
      elm={elm}
      onRemove={ids => () => props.dispatch(fetchRemoveOSES(ids))}
    />
  ));

  return (
    <TableView
      title="Edit Operation System"
      createBtnLabel="Create OSes"
      headRow={["ID", "OS name"]}
      rows={rows}
      action={fetchAddOS}
      nameLabel="OS"
      nameBtn="Send"
    />
  );
};

function mapStateToProps(state) {
  return {
    oses: getOses(state)
  };
}

export default connect(mapStateToProps)(EditOses);
