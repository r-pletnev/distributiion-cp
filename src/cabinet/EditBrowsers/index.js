import React from "react";
import { connect } from "react-redux";
import TableView from "../../components/TableView";
import { fetchAllBrowsers, fetchRemoveBrowsers } from "../../actions/browsers";
import { getBrowsers } from "../../reducers/browsers";
import AddBrowserForm from "./form";
import ButtonBlock from "../../components/ButtonOptions";

const TableRow = props => {
  const { elm, os, version, onRemove } = props;
  return (
    <tr key={elm.id}>
      <td className="id">{elm.id}</td>
      <td>{elm.name}</td>
      <ButtonBlock onRemoveClick={onRemove([elm.id])} />
    </tr>
  );
};

const EditBrowsers = props => {
  const rows = props.items.map(elm => (
    <TableRow
      elm={elm}
      onRemove={ids => () => props.dispatch(fetchRemoveBrowsers(ids))}
    />
  ));
  const onEnter = () => {
    props.dispatch(fetchAllBrowsers());
  };

  return (
    <TableView
      title="Edit Browsers"
      createBtnLabel="Create Browser"
      headRow={["ID", "Browser name"]}
      rows={rows}
      specialForm={AddBrowserForm}
      onMountAction={onEnter}
    />
  );
};

function mapStateToProps(state) {
  return {
    items: getBrowsers(state)
  };
}

export default connect(mapStateToProps)(EditBrowsers);
