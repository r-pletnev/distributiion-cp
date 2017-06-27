import React from "react";
import { connect } from "react-redux";
import TableView from "../../components/TableView";
import { getSearchEngines } from "../../reducers/search_engines";
import { fetchRemoveSearchEngine } from "../../actions/search_engines";
import AddSearchEngineForm from "./form";
import ButtonBlock from "../../components/ButtonOptions";

const TableRow = ({ elm, onRemove }) => {
  return (
    <tr>
      <td className="id">{elm.id}</td>
      <td>{elm.name}</td>
      <td>{elm.payload}</td>
      <ButtonBlock onRemoveClick={onRemove([elm.id])} />
    </tr>
  );
};

const EditSearchEngines = props => {
  const rows = props.items.map(elm => (
    <TableRow
      key={elm.id}
      elm={elm}
      onRemove={ids => () => props.dispatch(fetchRemoveSearchEngine(ids))}
    />
  ));

  return (
    <TableView
      title="Управление поисковыми системами"
      createBtnLabel="Добавить поисковую систему"
      headRow={["#", "Название", "Шаблон адреса поиска"]}
      rows={rows}
      specialForm={AddSearchEngineForm}
    />
  );
};

function mapStateToProps(state) {
  return {
    items: getSearchEngines(state)
  };
}

export default connect(mapStateToProps)(EditSearchEngines);
