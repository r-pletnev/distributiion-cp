import React from "react";
import { connect } from "react-redux";
import TableView from "../../components/TableView";
import { fetchRemoveDomains } from "../../actions/domains";
import { getDomains } from "../../reducers/favorites";
import ButtonBlock from "../../components/ButtonOptions";
import AddDomainForm from "./form";
import { withRouter } from "react-router";
import { getAgeById } from "../../reducers/ages";

const TableRow = ({ elm, onRemove, index, age }) => (
  <tr>
    <td className="id">{index}</td>
    <td>{elm.payload}</td>
    <td>{elm.male ? "М" : "Ж"}</td>
    <td>{age.name}</td>
    <td>{elm.priority}</td>
    <ButtonBlock onRemoveClick={onRemove([elm.payload])} />
  </tr>
);

const EditDomains = props => {
  const { favorite_id } = props.match.params;
  const rows = props.items.map((elm, index) => (
    <TableRow
      elm={elm}
      onRemove={ids =>
        () => props.dispatch(fetchRemoveDomains({ favorite_id, ids }))}
      key={elm.payload}
      index={index + 1}
      age={props.ageById(elm.age_id)}
    />
  ));

  return (
    <TableView
      title="Управление доменами"
      createBtnLabel="Добавить домен"
      headRow={["#", "Домен", "Пол", "Возраст", "Приоритет"]}
      rows={rows}
      specialForm={AddDomainForm}
    />
  );
};

function mapStateToProps(state, ownProps) {
  const { favorite_id } = ownProps.match.params;
  return {
    items: getDomains(state, favorite_id),
    ageById: getAgeById(state)
  };
}

export default withRouter(connect(mapStateToProps)(EditDomains));
