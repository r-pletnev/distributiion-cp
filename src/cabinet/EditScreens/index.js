import React from "react";
import { connect } from "react-redux";
import TableView from "../../components/TableView";
import { getScreens } from "../../reducers/screens";
import { fetchAllScreens, fetchRemoveScreens } from "../../actions/screens";
import { fetchAllModels } from "../../actions/models";
import { getModelById } from "../../reducers/models";
import AddOsVerisionForm from "./form";
import ButtonBlock from "../../components/ButtonOptions";

const TableRow = props => {
  const { elm, onRemove } = props;
  return (
    <tr key={elm.id}>
      <td className="id">{elm.id}</td>
      <td>{elm.width}</td>
      <td>{elm.height}</td>
      <ButtonBlock onRemoveClick={onRemove([elm.id])} />
    </tr>
  );
};

const EditScreens = props => {
  const rows = props.items.map(elm => (
    <TableRow
      elm={elm}
      onRemove={ids => () => props.dispatch(fetchRemoveScreens(ids))}
    />
  ));
  const onEnter = () => {
    props.dispatch(fetchAllScreens());
    props.dispatch(fetchAllModels());
  };

  return (
    <TableView
      title="Edit Screens"
      createBtnLabel="Create screen"
      headRow={["ID", "Width", "Height"]}
      rows={rows}
      specialForm={AddOsVerisionForm}
      onMountAction={onEnter}
    />
  );
};

function mapStateToProps(state) {
  return {
    items: getScreens(state),
    modelById: getModelById(state)
  };
}

export default connect(mapStateToProps)(EditScreens);
