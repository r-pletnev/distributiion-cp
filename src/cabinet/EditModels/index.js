import React from "react";
import { connect } from "react-redux";
import TableView from "../../components/TableView";
import { fetchAllModels } from "../../actions/models";
import { fetchAllDevices } from "../../actions/devices";
import { getModels } from "../../reducers/models";
import { getDeviceById } from "../../reducers/devices";
import AddModelForm from "./form";

const TableRow = props => {
  const { elm } = props;
  return (
    <tr key={elm.id}>
      <td className="id">{elm.id}</td>
      <td>todo device_id</td>
      <td>{elm.name}</td>
    </tr>
  );
};

const EditDevices = props => {
  const rows = props.models.map(elm => <TableRow elm={elm} device={elm.id} />);
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
    models: getModels(state)
  };
}

export default connect(mapStateToProps)(EditDevices);
