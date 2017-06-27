import React from "react";
import TableProfileView from "../components/TableProfileView";
import { connect } from "react-redux";
import ButtonBlock from "../components/ButtonOptions";
import {
  fetchSetSearchEnginePriority,
  fetchRemoveSearchEngine
} from "../actions/search_engines";
import {
  getSearchEngines,
  getSearchEnginePriorities
} from "../reducers/search_engines";
import { withRouter } from "react-router";
import AddPriorityForm from "../components/TableProfileView/form";

const TableRow = ({ elm, onRemove }) => {
  return (
    <tr key={elm.id}>
      <td className="id">{elm.id}</td>
      <td>{elm.name}</td>
      <td>{elm.priority}</td>
      <ButtonBlock onRemoveClick={onRemove([Number(elm.id)])} />
    </tr>
  );
};

function EditProfileSearchEngine(props) {
  const rows = props.items.map(elm => (
    <TableRow elm={elm} onRemove={props.removeSearchEngine} key={elm.id} />
  ));
  const { profile_name } = props.match.params;

  return (
    <TableProfileView
      title="Управление поисковыми системами"
      createBtnLabel="Добавить поисковую систему"
      headRow={["#", "Поисковая система", "Приоритет"]}
      rows={rows}
      form={{
        name: "se_id",
        label: "Выбрать поисковую систему",
        options: props.search_engines,
        action: props.setPriority(profile_name)
      }}
    />
  );
}

function mapStateToProps(state, ownProps) {
  const { profile_name } = ownProps.match.params;
  return {
    items: getSearchEnginePriorities(state, profile_name),
    search_engines: getSearchEngines(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setPriority: profile_name => ({ se_id, priority }, onSuccess) =>
      dispatch(
        fetchSetSearchEnginePriority(
          { profile_name, se_id, priority },
          onSuccess
        )
      ),
    removeSearchEngine: ids => dispatch(fetchRemoveSearchEngine(ids))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditProfileSearchEngine)
);
