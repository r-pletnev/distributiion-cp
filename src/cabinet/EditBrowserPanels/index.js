import React from "react";
import { connect } from "react-redux";
import TableView from "../../components/TableView";
import { fetchAllBrowserVersions } from "../../actions/browser_versions";
import { getBrowserVersionById } from "../../reducers/browser_versions";
import AddBrowserPanelForm from "./form";
import ButtonBlock from "../../components/ButtonOptions";

const TableRow = props => {
  const { elm, onRemove } = props;
  return (
    <tr key={elm.id}>
      <td className="id">{elm.id}</td>
      <td>{"todo browser name"}</td>
      <td>{elm.size}</td>
      <ButtonBlock onRemoveClick={onRemove([elm.id])} />
    </tr>
  );
};

const EditBrowserPanels = props => {
  const rows = props.items.map(elm => <TableRow elm={elm} />);
  const onEnter = () => {
    props.dispatch(fetchAllBrowserVersions());
  };

  return (
    <TableView
      title="Edit Browsers panels"
      createBtnLabel="Create Browser panel"
      headRow={["ID", "Browser version name", "Panel height"]}
      rows={rows}
      specialForm={AddBrowserPanelForm}
      onMountAction={onEnter}
    />
  );
};

function mapStateToProps(state) {
  return {
    items: [],
    browserVersionById: getBrowserVersionById(state)
  };
}

export default connect(mapStateToProps)(EditBrowserPanels);
