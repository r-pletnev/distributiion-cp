import React from "react";
import TableView from "../../components/TableView";
import { connect } from "react-redux";
import { fetchAllDevices } from "../../actions/devices";
import { fetchAllModels } from "../../actions/models";
import { getModels } from "../../reducers/models";
import { getDeviceById } from "../../reducers/devices";
import AddModelForm from "./form";

const TableRow = props => {
  const { elm, device } = props;
  return (
    <tr key={elm.id}>
      <td className="id">{elm.id}</td>
      <td>{device.name}</td>
      <td>{elm.name}</td>
      <td>{elm.width}</td>
      <td>{elm.height}</td>
    </tr>
  );
};

const EditDevices = props => {
  const rows = props.models.map(elm => (
    <TableRow elm={elm} device={props.deviceById(elm.device_id)} />
  ));
  const onEnter = () => {
    props.dispatch(fetchAllDevices());
    props.dispatch(fetchAllModels());
  };

  return (
    <TableView
      title="Edit Model"
      createBtnLabel="Create model"
      headRow={["ID", "Device type", "Model Name", "Width", "Height"]}
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
