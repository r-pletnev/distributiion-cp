import React from "react";
import ThirdPart from "./thirdPart";
import { Link } from "react-router-dom";
import AddPriorityModal from "./AddPriorityModal";
import SmallTableRow from "./SmallTableRow";

const BigTableRow = props => {
  <tr key={props.key}>
    <td>{props.name}</td>
    <td name="Приоритет">{props.priority}</td>
    <td className="option">
      <Link
        to="#"
        name="more-device"
        className="al-navbar"
        onClick={props.handleDetailClick}
      />
      <Link to="#" className="al-close" onClick={props.handleRemoveClick} />
    </td>
  </tr>;
};

class TableDistribution extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentType: null, showDeviceModal: false };
    this.getFirstThird = this.getFirstThird.bind(this);
    this.getModals = this.getModals.bind(this);
    this.hideModals = this.hideModals.bind(this);
    this.openDeviceModal = this.openDeviceModal.bind(this);
  }

  openDeviceModal() {
    this.setState({ showDeviceModal: true, currentType: "devices" });
  }

  hideModals() {
    this.setState({ showDeviceModal: false });
  }

  getFirstThird() {
    const { devices, models } = this.props;
    const head = [
      <th key={0}>{`Devices(${devices.priorities.length})`}</th>,
      <th key={1}>{`Models(${models.priorities.length})`}</th>
    ];
    const rows = [
      {
        singleItemName: "Device",
        nameAddAttr: "add-device",
        addBtnText: "Add Device",
        handleOnClick: this.openDeviceModal,
        rows: devices.priorities.map((elm, index) => (
          <SmallTableRow {...elm} key={index} />
        ))
      }
    ];
    return <ThirdPart headRow={head} rows={rows} />;
  }

  getModals() {
    return (
      <div>
        <AddPriorityModal
          show={this.state.showDeviceModal}
          onClose={this.hideModals}
          name="Устройство"
          items={
            this.state.currentType
              ? this.props[this.state.currentType].items
              : []
          }
          action={null}
          fieldName="device_id"
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.getModals()}
        <table className="table table-three">
          <thead className="table-three-root">
            <tr>
              <th>Устройства</th>
              <th>Операционные системы</th>
              <th>Браузеры</th>
            </tr>
          </thead>
          <tbody>
            {this.getFirstThird()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TableDistribution;
