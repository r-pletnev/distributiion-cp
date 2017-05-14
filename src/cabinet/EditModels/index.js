import React from "react";
import { connect } from "react-redux";
import TableView from "../../components/TableView";
import { fetchAllModels, fetchRemoveModels } from "../../actions/models";
import { fetchAllDevices } from "../../actions/devices";
import { getModels } from "../../reducers/models";
import { getDeviceById } from "../../reducers/devices";
import AddModelForm from "./form";
import ButtonBlock from "../../components/ButtonOptions";

const TableRow = props => {
  const { elm, device, onRemove } = props;
  return (
    <tr key={elm.id}>
      <td className="id">{elm.id}</td>
      <td>{device ? device.name : "there isn't such device!"}</td>
      <td>{elm.name}</td>
      <ButtonBlock onRemoveClick={onRemove([elm.id])} />
    </tr>
  );
};

const EditDevices = props => {
  const rows = props.models.map(elm => (
    <TableRow
      elm={elm}
      onRemove={ids => () => props.dispatch(fetchRemoveModels(ids))}
      device={props.deviceById(elm.device_id)}
    />
  ));
  const onEnter = () => {
    props.dispatch(fetchAllDevices());
    props.dispatch(fetchAllModels());
  };

  return (
    <TableView
      title="Edit Models"
      createBtnLabel="Create model"
      headRow={["ID", "Device Type", "Model Name"]}
      rows={rows}
      specialForm={AddModelForm}
      onMountAction={onEnter}
    />
  );
};

function mapStateToProps(state) {
  return {
    models: getModels(state),
    deviceById: getDeviceById(state)
  };
}

export default connect(mapStateToProps)(EditDevices);
