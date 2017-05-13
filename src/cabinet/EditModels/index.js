import React from "react";
import TableView from "../../components/TableView";
import { connect } from "react-redux";
import { fetchAllModels } from "../../actions/models";
import { getModels } from "../../reducers/models";
import { getDeviceById } from "../../reducers/devices";
import AddModelForm from "./form";

const TableRow = props => {
  const { elm } = props;
  return (
    <tr key={elm.id}>
      <td className="id">{elm.id}</td>
      <td>{elm.name}</td>
    </tr>
  );
};

const EditDevices = props => {
  const rows = props.models.map(elm => <TableRow elm={elm} />);
  const onEnter = () => {
    props.dispatch(fetchAllModels());
  };

  return (
    <TableView
      title="Edit Models"
      createBtnLabel="Create model"
      headRow={["ID", "Model Name"]}
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
