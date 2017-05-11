import React from "react";
import TableView from "../../components/TableView";
import { fetchAddModel } from "../../actions/models";
import { connect } from "react-redux";
import { getModels } from "../../reducers/models";

const TableRow = ({ elm }) => {
  return (
    <tr key={elm.id}>
      <td className="id">{elm.id}</td>
      <td>{elm.device_id}</td>
      <td>{elm.name}</td>
      <td>{elm.width}</td>
      <td>{elm.heigth}</td>
    </tr>
  );
};

const EditDevices = props => {
  const rows = props.models.map(elm => <TableRow elm={elm} />);

  return (
    <TableView
      title="Edit Devices"
      createBtnLabel="Create devices"
      headRow={["ID", "Device type", "Model Name", "Width", "Height"]}
      rows={rows}
      action={fetchAddModel}
      nameLabel="Device types"
      nameBtn="Send"
    />
  );
};

function mapStateToProps(state) {
  return {
    models: getModels(state)
  };
}

export default connect(mapStateToProps)(EditDevices);
