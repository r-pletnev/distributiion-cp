import React from "react";
import { connect } from "react-redux";
import TableView from "../../components/TableView";
import { getScreens } from "../../reducers/screens";
import { fetchAllScreens } from "../../actions/screens";
import { fetchAllModels } from "../../actions/models";
import { getModelById } from "../../reducers/models";
import AddOsVerisionForm from "./form";

const TableRow = props => {
  const { elm } = props;
  return (
    <tr key={elm.id}>
      <td className="id">{elm.id}</td>
      <td>todo model</td>
      <td>{elm.width}</td>
      <td>{elm.height}</td>
    </tr>
  );
};

const EditScreens = props => {
  const rows = props.items.map(elm => <TableRow elm={elm} />);
  const onEnter = () => {
    props.dispatch(fetchAllScreens());
    props.dispatch(fetchAllModels());
  };

  return (
    <TableView
      title="Edit Screens"
      createBtnLabel="Create screen"
      headRow={["ID", "Model", "Width", "Height"]}
      rows={rows}
      specialForm={AddOsVerisionForm}
      onMountAction={onEnter}
    />
  );
};

function mapStateToProps(state) {
  return {
    items: getScreens(state)
  };
}

export default connect(mapStateToProps)(EditScreens);
