import React from "react";
import TableView from "../components/TableView";
import { fetchAddArch, fetchAllArchs } from "../actions/archs";
import { connect } from "react-redux";
import { getArchs } from "../reducers/archs";

const TableRow = ({ elm }) => {
  return (
    <tr key={elm.id}>
      <td className="id">{elm.id}</td>
      <td>{elm.name}</td>
    </tr>
  );
};

const EditArchs = props => {
  const rows = props.archs.map(elm => <TableRow elm={elm} />);
  const onEnter = () => props.dispatch(fetchAllArchs());

  return (
    <TableView
      title="Edit OS Architecture"
      createBtnLabel="Create OS architecture"
      headRow={["ID", "Architecture"]}
      rows={rows}
      action={fetchAddArch}
      nameLabel="OS architecture"
      nameBtn="Send"
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
