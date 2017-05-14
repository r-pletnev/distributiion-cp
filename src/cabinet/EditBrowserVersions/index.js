import React from "react";
import { connect } from "react-redux";
import TableView from "../../components/TableView";
import { fetchAllBrowsers } from "../../actions/browsers";
import {
  fetchAllBrowserVersions,
  fetchRemoveBrowserVersions
} from "../../actions/browser_versions";
import { getBrowserVersions } from "../../reducers/browser_versions";
import { getBrowserById } from "../../reducers/browsers";
import AddBrowserVersionForm from "./form";
import ButtonBlock from "../../components/ButtonOptions";

const TableRow = props => {
  const { elm, browser, onRemove } = props;
  return (
    <tr key={elm.id}>
      <td className="id">{elm.id}</td>
      <td>{browser.name}</td>
      <td>{elm.name}</td>
      <td>{elm.engine_version}</td>
      <td>{elm.browser_version}</td>
      <td>{elm.sub_version}</td>
      <ButtonBlock onRemoveClick={onRemove([elm.id])} />
    </tr>
  );
};

const EditBrowserVersions = props => {
  const rows = props.items.map(elm => (
    <TableRow
      elm={elm}
      browser={props.browserById(elm.browser_id)}
      onRemove={ids => () => props.dispatch(fetchRemoveBrowserVersions(ids))}
    />
  ));
  const onEnter = () => {
    props.dispatch(fetchAllBrowsers());
    props.dispatch(fetchAllBrowserVersions());
  };

  return (
    <TableView
      title="Edit browser versions"
      createBtnLabel="Create Browser version"
      headRow={[
        "ID",
        "Browser",
        "Version name",
        "Engine version",
        "Browser version",
        "Subversion"
      ]}
      rows={rows}
      specialForm={AddBrowserVersionForm}
      onMountAction={onEnter}
    />
  );
};

function mapStateToProps(state) {
  return {
    items: getBrowserVersions(state),
    browserById: getBrowserById(state)
  };
}

export default connect(mapStateToProps)(EditBrowserVersions);
