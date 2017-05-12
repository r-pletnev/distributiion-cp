import React from "react";
import TableView from "../components/TableView";
import { fetchAllOses, fetchAddOS } from "../actions/oses";
import { connect } from "react-redux";
import { getOses } from "../reducers/oses";

const TableRow = ({ elm }) => {
  return (
    <tr key={elm.id}>
      <td className="id">{elm.id}</td>
      <td>{elm.name}</td>
    </tr>
  );
};

const EditOses = props => {
  const rows = props.oses.map(elm => <TableRow elm={elm} />);
  const onEnter = () => props.dispatch(fetchAllOses());

  return (
    <TableView
      title="Edit Operation System"
      createBtnLabel="Create OSes"
      headRow={["ID", "OS name"]}
      rows={rows}
      action={fetchAddOS}
      nameLabel="OS"
      nameBtn="Send"
      onMountAction={onEnter}
    />
  );
};

function mapStateToProps(state) {
  return {
    oses: getOses(state)
  };
}

export default connect(mapStateToProps)(EditOses);
