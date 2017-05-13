import React from "react";
import { connect } from "react-redux";
import TableView from "../../components/TableView";
import { getOsVersions } from "../../reducers/os_versions";
import { fetchAllOses } from "../../actions/oses";
import { fetchAllOsVersions } from "../../actions/os_versions";
import { getOsById } from "../../reducers/oses";
import AddOsVerisionForm from "./form";

const TableRow = props => {
  const { elm } = props;
  return (
    <tr key={elm.id}>
      <td className="id">{elm.id}</td>
      <td>todo os </td>
      <td>{elm.name}</td>
      <td>{elm.panel_height}</td>
    </tr>
  );
};

const EditOsVersions = props => {
  const rows = props.items.map(elm => <TableRow elm={elm} />);
  const onEnter = () => {
    props.dispatch(fetchAllOses());
    props.dispatch(fetchAllOsVersions());
  };

  return (
    <TableView
      title="Edit OS Versions"
      createBtnLabel="Create Os version"
      headRow={["ID", "OS", "Version name", "Panel height"]}
      rows={rows}
      specialForm={AddOsVerisionForm}
      onMountAction={onEnter}
    />
  );
};

function mapStateToProps(state) {
  return {
    items: getOsVersions(state)
  };
}

export default connect(mapStateToProps)(EditOsVersions);
