import React from "react";
import { connect } from "react-redux";
import TableView from "../../components/TableView";
import {
  fetchAllBrowserPanels,
  fetchRemoveBrowserPanels
} from "../../actions/browser_panels";
import { getBrowserPanels } from "../../reducers/browser_panels";
import AddBrowserPanelForm from "./form";
import ButtonBlock from "../../components/ButtonOptions";

const TableRow = props => {
  const { elm, onRemove } = props;
  return (
    <tr key={elm.id}>
      <td className="id">{elm.id}</td>
      <td>{elm.size}</td>
      <ButtonBlock onRemoveClick={onRemove([elm.id])} />
    </tr>
  );
};

const EditBrowserPanels = props => {
  const rows = props.items.map(elm => (
    <TableRow
      elm={elm}
      onRemove={ids => () => props.dispatch(fetchRemoveBrowserPanels(ids))}
    />
  ));
  const onEnter = () => {
    props.dispatch(fetchAllBrowserPanels());
  };

  return (
    <TableView
      title="Edit Browsers panels"
      createBtnLabel="Create Browser panel"
      headRow={["ID", "Size"]}
      rows={rows}
      specialForm={AddBrowserPanelForm}
      onMountAction={onEnter}
    />
  );
};

function mapStateToProps(state) {
  return {
    items: getBrowserPanels(state)
  };
}

export default connect(mapStateToProps)(EditBrowserPanels);
