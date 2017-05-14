import React from "react";
import { connect } from "react-redux";
import TableView from "../../components/TableView";
import { fetchAllOses } from "../../actions/oses";
import { fetchAllOsVersions } from "../../actions/os_versions";
import { fetchAllBrowsers, fetchRemoveBrowsers } from "../../actions/browsers";
import { getBrowsers } from "../../reducers/browsers";
import { getOsByOsVersionId } from "../../reducers/oses";
import { getOsVersionById } from "../../reducers/os_versions";
import AddBrowserForm from "./form";
import ButtonBlock from "../../components/ButtonOptions";

const TableRow = props => {
  const { elm, os, version, onRemove } = props;
  return (
    <tr key={elm.id}>
      <td className="id">{elm.id}</td>
      <td>{`${os.name} ${version.name}`}</td>
      <td>{elm.name}</td>
      <td>{elm.panel_height}</td>
      <td>{elm.template}</td>
      <ButtonBlock onRemoveClick={onRemove([elm.id])} />
    </tr>
  );
};

const EditBrowsers = props => {
  const rows = props.items.map(elm => (
    <TableRow
      elm={elm}
      os={props.osByOsVersionId(elm.os_version_id)}
      version={props.osVersionById(elm.os_version_id)}
      onRemove={ids => () => props.dispatch(fetchRemoveBrowsers(ids))}
    />
  ));
  const onEnter = () => {
    props.dispatch(fetchAllOses());
    props.dispatch(fetchAllOsVersions());
    props.dispatch(fetchAllBrowsers());
  };

  return (
    <TableView
      title="Edit Browsers"
      createBtnLabel="Create Browser"
      headRow={["ID", "OS", "Browser name", "Panel height", "Template"]}
      rows={rows}
      specialForm={AddBrowserForm}
      onMountAction={onEnter}
    />
  );
};

function mapStateToProps(state) {
  return {
    items: getBrowsers(state),
    osByOsVersionId: getOsByOsVersionId(state),
    osVersionById: getOsVersionById(state)
  };
}

export default connect(mapStateToProps)(EditBrowsers);
