import React from "react";
import { connect } from "react-redux";
import TableView from "../../components/TableView";
import { fetchRemoveDomains } from "../../actions/domains";
import { getDomains } from "../../reducers/favorites";
import ButtonBlock from "../../components/ButtonOptions";
import AddDomainForm from "./form";
import { withRouter } from "react-router";

const TableRow = props => {
  const { elm, onRemove, index } = props;
  return (
    <tr>
      <td className="id">{index}</td>
      <td>{elm.payload}</td>
      <td>{elm.priority}</td>
      <ButtonBlock onRemoveClick={onRemove([elm.payload])} />
    </tr>
  );
};

const EditDomains = props => {
  const { favorite_id } = props.match.params;
  const rows = props.items.map((elm, index) => (
    <TableRow
      elm={elm}
      onRemove={ids => () =>
        props.dispatch(fetchRemoveDomains({ favorite_id, ids }))}
      key={elm.payload}
      index={index + 1}
    />
  ));

  return (
    <TableView
      title="Управление доменами"
      createBtnLabel="Добавить домен"
      headRow={["#", "Домен", "Приоритет"]}
      rows={rows}
      specialForm={AddDomainForm}
    />
  );
};

function mapStateToProps(state, ownProps) {
  const { favorite_id } = ownProps.match.params;
  return {
    items: getDomains(state, favorite_id)
  };
}

export default withRouter(connect(mapStateToProps)(EditDomains));
