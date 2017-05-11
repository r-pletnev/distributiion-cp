import React from "react";
import TableView from "../components/TableView";
import { fetchAddDevice } from "../actions/devices";
import { connect } from "react-redux";
import { getDevices } from "../reducers/devices";

const TableRow = ({ elm }) => {
  return (
    <tr key={elm.id}>
      <td className="id">{elm.id}</td>
      <td>{elm.name}</td>
    </tr>
  );
};

const EditDevices = props => {
  const rows = props.devices.map(elm => <TableRow elm={elm} />);

  return (
    <TableView
      title="Edit Devices"
      createBtnLabel="Create devices"
      headRow={["ID", "Device type"]}
      rows={rows}
      action={fetchAddDevice}
      nameLabel="Device types"
      nameBtn="Send"
    />
  );
};

function mapStateToProps(state) {
  return {
    devices: getDevices(state)
  };
}

export default connect(mapStateToProps)(EditDevices);
