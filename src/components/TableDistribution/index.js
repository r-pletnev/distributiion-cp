import React from "react";
import ThirdPart from "./thirdPart";
import AddPriorityModal from "./AddPriorityModal";
import SmallTableRow from "./SmallTableRow";
import BigTableRow from "./BigTableRow";

class TableDistribution extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentType: null,
      device_id: null,
      model_id: null,
      os_id: null,
      browser_id: null,
      showDeviceModal: false,
      showModelModal: false,
      showOsModal: false,
      showOsVersionModal: false,
      showBrowserModal: false
    };
    this.getFirstThird = this.getFirstThird.bind(this);
    this.getSecondThird = this.getSecondThird.bind(this);
    this.getLastThird = this.getLastThird.bind(this);
    this.getModals = this.getModals.bind(this);
    this.hideModals = this.hideModals.bind(this);
    this.openDeviceModal = this.openDeviceModal.bind(this);
    this.openModelModal = this.openModelModal.bind(this);
    this.openOsModal = this.openOsModal.bind(this);
    this.openBrowserModal = this.openBrowserModal.bind(this);
    this.openOsVersionModal = this.openOsVersionModal.bind(this);
    this.getCurrentTypeItems = this.getCurrentTypeItems.bind(this);
    this.selectDevice = this.selectDevice.bind(this);
    this.selectModel = this.selectModel.bind(this);
    this.selectOs = this.selectOs.bind(this);
    this.selectOsVersion = this.selectOsVersion.bind(this);
    this.selectBrowser = this.selectBrowser.bind(this);
  }

  openDeviceModal() {
    this.setState({ showDeviceModal: true, currentType: "devices" });
  }

  hideModals() {
    this.setState({
      showDeviceModal: false,
      showModelModal: false,
      showOsModal: false,
      showOsVersionModal: false,
      showBrowserModal: false
    });
  }

  openModelModal() {
    this.setState({ showModelModal: true, currentType: "models" });
  }

  openOsModal() {
    this.setState({ showOsModal: true, currentType: "oses" });
  }

  openOsVersionModal() {
    this.setState({ showOsVersionModal: true, currentType: "os_versions" });
  }

  openBrowserModal() {
    this.setState({ showBrowserModal: true, currentType: "browsers" });
  }

  selectDevice(device_id) {
    this.setState({ device_id });
  }

  selectModel(model_id) {
    this.setState({ model_id });
  }

  selectOs(os_id) {
    this.setState({ os_id });
  }

  selectOsVersion(os_version_id) {
    this.setState({ os_version_id });
  }

  selectBrowser(browser_id) {
    this.setState({ browser_id });
  }

  getFirstThird() {
    const { devices, models } = this.props;
    const { onDeviceRowClick, onModelRowClick } = this.props;
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
          <SmallTableRow
            {...elm}
            key={index}
            rowKey={index}
            action={onDeviceRowClick(elm.id, this.selectDevice)}
          />
        ))
      },
      {
        singleItemName: "Model",
        nameAddAttr: "add-model",
        addBtnText: "Add Model",
        handleOnClick: this.openModelModal,
        rows: models.priorities.map((elm, index) => (
          <BigTableRow
            {...elm}
            rowKey={index}
            key={index}
            action={onModelRowClick(
              elm.id,
              this.state.device_id,
              this.selectModel
            )}
          />
        ))
      }
    ];
    return <ThirdPart headRow={head} rows={rows} />;
  }

  getSecondThird() {
    const { oses, os_versions, onOsRowClick, onOsVersionRowClick } = this.props;

    const head = [
      <th key={0}>{`Oses(${oses.priorities.length})`}</th>,
      <th key={1}>{`OS Versions(${os_versions.priorities.length})`}</th>
    ];
    const rows = [
      {
        singleItemName: "OS",
        nameAddAttr: "add-os",
        addBtnText: "Add OS",
        handleOnClick: this.openOsModal,
        rows: oses.priorities.map((elm, index) => (
          <SmallTableRow
            {...elm}
            key={index}
            rowKey={index}
            action={onOsRowClick(
              elm.id,
              this.state.device_id,
              this.state.model_id,
              this.selectOs
            )}
          />
        ))
      },
      {
        singleItemName: "OS Version",
        nameAddAttr: "add-os-version",
        addBtnText: "Add OS Version",
        handleOnClick: this.openOsVersionModal,
        rows: os_versions.priorities.map((elm, index) => (
          <BigTableRow
            {...elm}
            key={index}
            rowKey={index}
            action={onOsVersionRowClick(
              elm.id,
              this.state.device_id,
              this.state.model_id,
              this.state.os_id,
              this.selectOsVersion
            )}
          />
        ))
      }
    ];

    return <ThirdPart headRow={head} rows={rows} />;
  }

  getLastThird() {
    const { browsers, browser_versions, onBrowserRowClick } = this.props;
    const head = [
      <th key={0}>{`Browsers(${browsers.priorities.length})`}</th>,
      <th key={1}>{`OS Versions(${browser_versions.priorities.length})`}</th>
    ];
    const rows = [
      {
        singleItemName: "Browser",
        nameAddAttr: "add-browser",
        addBtnText: "Add Browser",
        handleOnClick: this.openBrowserModal,
        rows: browsers.priorities.map((elm, index) => (
          <SmallTableRow
            {...elm}
            key={index}
            rowKey={index}
            action={onBrowserRowClick(
              elm.id,
              this.state.device_id,
              this.state.model_id,
              this.state.os_id,
              this.state.os_version_id,
              this.selectBrowser
            )}
          />
        ))
      },
      {
        singleItemName: "Browser Version",
        nameAddAttr: "add-browser-version",
        addBtnText: "Add Browser Version",
        handleOnClick: this.openBrowserVersionModal,
        rows: browser_versions.priorities.map((elm, index) => (
          <BigTableRow {...elm} key={index} rowKey={index} action={null} />
        ))
      }
    ];
    return <ThirdPart headRow={head} rows={rows} />;
  }

  getCurrentTypeItems() {
    return this.state.currentType
      ? this.props[this.state.currentType].items
      : [];
  }

  getModals() {
    return (
      <div>
        <AddPriorityModal
          show={this.state.showDeviceModal}
          onClose={this.hideModals}
          name="Устройство"
          items={this.getCurrentTypeItems()}
          action={null}
          fieldName="device_id"
        />
        <AddPriorityModal
          show={this.state.showModelModal}
          onClose={this.hideModals}
          name="Модель"
          items={this.getCurrentTypeItems()}
          action={null}
          fieldName="model_id"
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
            <tr>
              {this.getFirstThird()}
              {this.getSecondThird()}
              {this.getLastThird()}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default TableDistribution;
