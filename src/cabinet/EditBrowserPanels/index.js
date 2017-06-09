import React from "react";
import { connect } from "react-redux";
import TableView from "../../components/TableView";
import { fetchRemoveBrowserPanels } from "../../actions/browser_panels";
import { getBrowserById } from "../../reducers/browsers";
import { getBrowserPanels } from "../../reducers/browser_panels";
import AddBrowserPanelForm from "./form";
import ButtonBlock from "../../components/ButtonOptions";

const TableRow = props => {
  const { elm, onRemove, browser } = props;
  return (
    <tr key={elm.id}>
      <td className="id">{elm.id}</td>
      <td>{browser ? browser.name : "Error with browser name"}</td>
      <td>{elm.size}</td>
      <td>{elm.priority}</td>
      <ButtonBlock onRemoveClick={onRemove([elm.id])} />
    </tr>
  );
};

const EditBrowserPanels = props => {
  const rows = props.items.map(elm => (
    <TableRow
      elm={elm}
      onRemove={ids => () => props.dispatch(fetchRemoveBrowserPanels(ids))}
      browser={props.getBrowserById(elm.browser_id)}
    />
  ));

  return (
    <TableView
      title="Управление панелями браузеров"
      createBtnLabel="Создать панель браузера"
      headRow={["#", "Браузер", "Высота панели", "Приоритет"]}
      rows={rows}
      specialForm={AddBrowserPanelForm}
    />
  );
};

function mapStateToProps(state) {
  return {
    items: getBrowserPanels(state),
    browserById: getBrowserById(state)
  };
}

export default connect(mapStateToProps)(EditBrowserPanels);
