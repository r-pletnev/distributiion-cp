import React from "react";
import { connect } from "react-redux";
import TableView from "../components/TableView";
import {
  fetchAddDevice,
  fetchAllDevices,
  fetchRemoveDevices
} from "../actions/devices";
import { getDevices } from "../reducers/devices";
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

const EditDevices = props => {
  const rows = props.devices.map(elm => (
    <TableRow
      elm={elm}
      onRemove={ids => () => props.dispatch(fetchRemoveDevices(ids))}
    />
  ));
  const onEnter = () => props.dispatch(fetchAllDevices());

  return (
    <TableView
      title="Edit Devices"
      createBtnLabel="Create devices"
      headRow={["ID", "Device type"]}
      rows={rows}
      action={fetchAddDevice}
      nameLabel="Device type"
      nameBtn="Send"
      onMountAction={onEnter}
    />
  );
};

function mapStateToProps(state) {
  return {
    devices: getDevices(state)
  };
}

export default connect(mapStateToProps)(EditDevices);
