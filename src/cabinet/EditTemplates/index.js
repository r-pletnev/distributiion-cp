import React from "react";
import { connect } from "react-redux";
import TableView from "../../components/TableView";
import { fetchRemoveTemplates } from "../../actions/templates";
import { getTemplates } from "../../reducers/templates";
import { getBrowserById } from "../../reducers/browsers";
import AddTemplateForm from "./form";
import ButtonBlock from "../../components/ButtonOptions";

const TableRow = props => {
  const { elm, onRemove, browser } = props;
  return (
    <tr key={elm.id}>
      <td className="id">{elm.id}</td>
      <td>{browser ? browser.name : null}</td>
      <td>{elm.name}</td>
      <td>{elm.payload}</td>
      <ButtonBlock onRemoveClick={onRemove([elm.id])} />
    </tr>
  );
};

const EditTemplates = props => {
  const rows = props.items.map(elm => (
    <TableRow
      elm={elm}
      onRemove={ids => () => props.dispatch(fetchRemoveTemplates(ids))}
      browser={props.browserById(elm.browser_id)}
    />
  ));
  return (
    <TableView
      title="Edit browser UA tempates"
      createBtnLabel="Create Browser UA template"
      headRow={["ID", "Browser", "Name", "Template"]}
      rows={rows}
      specialForm={AddTemplateForm}
    />
  );
};

function mapStateToProps(state) {
  return {
    items: getTemplates(state),
    browserById: getBrowserById(state)
  };
}

export default connect(mapStateToProps)(EditTemplates);
