import R from "ramda";
import React from "react";
import ThirdPart from "./thirdPart";
import AddPriorityModal from "./AddPriorityModal";
import SmallTableRow from "./SmallTableRow";
import BigTableRow from "./BigTableRow";
import DetailModal from "./DetailModal";

class TableDistribution extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentType: null,
      device_id: null,
      model_id: null,
      os_id: null,
      os_version_id: null,
      browser_id: null,
      browser_version_id: null,
      showDeviceModal: false,
      showModelModal: false,
      showOsModal: false,
      showOsVersionModal: false,
      showBrowserModal: false,
      showBrowserVersionModal: false,
      showDetailOsVersion: false,
      showDetailBrowserVersion: false,
      showArchModal: false,
      showOsPanelModal: false,
      showScreenModal: false,
      showTemplateModal: false
    };
    this.getFirstThird = this.getFirstThird.bind(this);
    this.getSecondThird = this.getSecondThird.bind(this);
    this.getLastThird = this.getLastThird.bind(this);
    this.getModals = this.getModals.bind(this);
    this.hideModals = this.hideModals.bind(this);
    this.hideArchModal = this.hideArchModal.bind(this);
    this.hideOsPanelModal = this.hideOsPanelModal.bind(this);
    this.hideScreenModal = this.hideScreenModal.bind(this);
    this.hideTemplateModal = this.hideTemplateModal.bind(this);
    this.openDeviceModal = this.openDeviceModal.bind(this);
    this.openOsModal = this.openOsModal.bind(this);
    this.openModelModal = this.openModelModal.bind(this);
    this.openBrowserModal = this.openBrowserModal.bind(this);
    this.openOsVersionModal = this.openOsVersionModal.bind(this);
    this.openBrowserVersionModal = this.openBrowserVersionModal.bind(this);
    this.openDetailOsVersion = this.openDetailOsVersion.bind(this);
    this.openDetailBrowserVersion = this.openDetailBrowserVersion.bind(this);
    this.openArchModal = this.openArchModal.bind(this);
    this.openOsPanelModal = this.openOsPanelModal.bind(this);
    this.openScreenModal = this.openScreenModal.bind(this);
    this.openTemplateModal = this.openTemplateModal.bind(this);
    this.getCurrentTypeItems = this.getCurrentTypeItems.bind(this);
    this.selectDevice = this.selectDevice.bind(this);
    this.selectModel = this.selectModel.bind(this);
    this.selectOs = this.selectOs.bind(this);
    this.selectOsVersion = this.selectOsVersion.bind(this);
    this.selectBrowser = this.selectBrowser.bind(this);
    this.selectBrowserVersion = this.selectBrowserVersion.bind(this);
    this.afterFetchAction = this.afterFetchAction.bind(this);
  }

  openDeviceModal() {
    this.setState({ showDeviceModal: true, currentType: "devices" });
  }

  hideModals() {
    this.setState({
      showDeviceModal: false,
      showOsModal: false,
      showOsVersionModal: false,
      showBrowserModal: false,
      showBrowserVersionModal: false,
      showDetailOsVersion: false,
      showDetailModel: false,
      showDetailBrowserVersion: false,
      showModelModal: false
    });
  }

  hideArchModal() {
    this.setState({ showArchModal: false });
  }

  hideOsPanelModal() {
    this.setState({ showOsPanelModal: false });
  }

  hideScreenModal() {
    this.setState({ showScreenModal: false });
  }

  hideTemplateModal() {
    this.setState({ showTemplateModal: false });
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

  openBrowserVersionModal() {
    this.setState({
      showBrowserVersionModal: true,
      currentType: "browser_versions"
    });
  }

  openDetailOsVersion() {
    this.setState({
      showDetailOsVersion: true
    });
  }

  openDetailBrowserVersion() {
    this.setState({ showDetailBrowserVersion: true });
  }

  openArchModal() {
    this.setState({
      showArchModal: true,
      currentType: "archs"
    });
  }

  openOsPanelModal() {
    this.setState({
      showOsPanelModal: true,
      currentType: "os_panels"
    });
  }

  openScreenModal() {
    this.setState({
      showScreenModal: true,
      currentType: "screens"
    });
  }

  openTemplateModal() {
    this.setState({ showTemplateModal: true, currentType: "templates" });
  }

  componentWillReceiveProps(nextProps) {
    if (!R.isEmpty(this.props.devices.priorities)) return;

    if (!R.isEmpty(nextProps.devices.priorities)) {
      const { id } = nextProps.devices.priorities[0];
      this.props.onDeviceRowClick(
        id,
        this.selectDevice,
        this.afterFetchAction("oses")
      )();
    }
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
    this.props.fetchArchPrs({
      profile_name: this.props.match.params.profile_name,
      device_id: this.state.device_id,
      os_id: this.state.os_id
    });
    this.props.fetchOsPanelPrs({
      profile_name: this.props.match.params.profile_name,
      device_id: this.state.device_id,
      os_id: this.state.os_id,
      os_version_id: os_version_id
    });
    this.setState({ os_version_id });
  }

  selectBrowser(browser_id) {
    this.setState({ browser_id });
  }

  getItemName(item_id, type) {
    if (R.isNil(item_id) || R.isNil(type)) return "";
    const byId = this.props[type].byId;
    const curItem = byId(item_id);
    return curItem ? curItem.name : item_id;
  }

  getFirstId(type) {
    if (R.isEmpty(this.props[type].priorities)) return null;
    return this.props[type].priorities[0].id;
  }

  afterFetchAction(type) {
    return nextId => {
      const {
        onDeviceRowClick,
        onModelRowClick,
        onOsRowClick,
        onOsVersionRowClick,
        onBrowserRowClick,
        fetchArchPrs,
        fetchOsPanelPrs,
        fetchScreenPrs,
        fetchTemplatePrs
      } = this.props;

      const id = this.getFirstId(type);

      return () => {
        switch (type) {
          case "devices": {
            return onDeviceRowClick(
              id,
              this.selectDevice,
              this.afterFetchAction("oses")
            )();
          }

          case "oses": {
            return onOsRowClick(
              id,
              nextId,
              this.selectOs,
              this.afterFetchAction("os_versions")
            )();
          }

          case "os_versions": {
            return onOsVersionRowClick(
              id,
              this.state.device_id,
              nextId,
              this.selectOsVersion,
              this.afterFetchAction("models")
            )();
          }

          case "models": {
            return onModelRowClick(
              id,
              this.state.device_id,
              this.state.os_id,
              nextId,
              this.selectModel,
              this.afterFetchAction("browsers")
            )();
          }

          case "browsers": {
            return onBrowserRowClick(
              id,
              this.state.device_id,
              this.state.model_id,
              this.state.os_id,
              nextId,
              this.selectBrowser,
              this.afterFetchAction("browser_versions")
            )();
          }
          case "browser_versions": {
            return this.selectBrowserVersion(id)();
          }
        }
      };
    };
  }

  selectBrowserVersion(browser_version_id) {
    return () => {
      this.props.fetchTemplatePrs({
        profile_name: this.props.match.params.profile_name,
        device_id: this.state.device_id,
        model_id: this.state.model_id,
        os_id: this.state.os_id,
        os_version_id: this.state.os_version_id,
        browser_id: this.state.browser_id
      });
      this.setState({ browser_version_id });
    };
  }

  getFirstThird() {
    const { devices, oses } = this.props;
    const { onDeviceRowClick, onOsRowClick } = this.props;
    const head = [
      <th key={0}>{`Устройства(${devices.priorities.length})`}</th>,
      <th key={1}>{`ОС(${oses.priorities.length})`}</th>
    ];
    const rows = [
      {
        singleItemName: "Устройство",
        nameAddAttr: "add-device",
        addBtnText: "Добавить устройство",
        handleOnClick: this.openDeviceModal,
        rows: devices.priorities.map((elm, index) => (
          <SmallTableRow
            {...elm}
            key={index}
            rowKey={index}
            action={onDeviceRowClick(
              elm.id,
              this.selectDevice,
              this.afterFetchAction("oses")
            )}
            isActive={elm.id === this.state.device_id}
          />
        ))
      },

      {
        singleItemName: "ОС",
        nameAddAttr: "add-os",
        addBtnText: "Добавить ОС",
        handleOnClick: this.openOsModal,
        rows: oses.priorities.map((elm, index) => (
          <SmallTableRow
            {...elm}
            key={index}
            rowKey={index}
            action={onOsRowClick(
              elm.id,
              this.state.device_id,
              this.selectOs,
              this.afterFetchAction("os_versions")
            )}
            isActive={elm.id === this.state.os_id}
          />
        ))
      }
    ];
    return <ThirdPart headRow={head} rows={rows} />;
  }

  getSecondThird() {
    const {
      models,
      os_versions,
      onModelRowClick,
      onOsVersionRowClick
    } = this.props;

    const head = [
      <th key={0}>{`Версии ОС(${os_versions.priorities.length})`}</th>,
      <th key={1}>{`Модели(${models.priorities.length})`}</th>
    ];
    const rows = [
      {
        singleItemName: "Версия ОС",
        nameAddAttr: "add-os-version",
        addBtnText: "Добавить версию ОС",
        handleOnClick: this.openOsVersionModal,
        rows: os_versions.priorities.map((elm, index) => (
          <BigTableRow
            {...elm}
            key={index}
            rowKey={index}
            action={onOsVersionRowClick(
              elm.id,
              this.state.device_id,
              this.state.os_id,
              this.selectOsVersion,
              this.afterFetchAction("models", elm.id)
            )}
            isActive={elm.id === this.state.os_version_id}
            handleDetailClick={this.openDetailOsVersion}
          />
        ))
      },
      {
        singleItemName: "Модель",
        nameAddAttr: "add-model",
        addBtnText: "Добавить модель",
        handleOnClick: this.openModelModal,
        rows: models.priorities.map((elm, index) => (
          <SmallTableRow
            name={elm.name}
            priority={elm.priority}
            rowKey={index}
            key={index}
            action={onModelRowClick(
              elm.id,
              this.state.device_id,
              this.state.os_id,
              this.state.os_version_id,
              this.selectModel,
              this.afterFetchAction("browsers")
            )}
            isActive={elm.id === this.state.model_id}
            handleDetailClick={this.openDetailModel}
          />
        ))
      }
    ];

    return <ThirdPart headRow={head} rows={rows} />;
  }

  getLastThird() {
    const { browsers, browser_versions, onBrowserRowClick } = this.props;
    const head = [
      <th key={0}>{`Браузеры(${browsers.priorities.length})`}</th>,
      <th key={1}>
        {`Версии Браузеров(${browser_versions.priorities.length})`}
      </th>
    ];
    const rows = [
      {
        singleItemName: "Браузер",
        nameAddAttr: "add-browser",
        addBtnText: "Добавить Браузер",
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
              this.selectBrowser,
              this.afterFetchAction("browser_versions")
            )}
            isActive={elm.id === this.state.browser_id}
          />
        ))
      },
      {
        singleItemName: "Версия Браузера",
        nameAddAttr: "add-browser-version",
        addBtnText: "Добавить версию браузера",
        handleOnClick: this.openBrowserVersionModal,
        rows: browser_versions.priorities.map((elm, index) => (
          <BigTableRow
            {...elm}
            key={index}
            rowKey={index}
            action={this.selectBrowserVersion(elm.id)}
            isActive={elm.id === this.state.browser_version_id}
            handleDetailClick={this.openDetailBrowserVersion}
          />
        ))
      }
    ];
    return <ThirdPart headRow={head} rows={rows} />;
  }

  getCurrentTypeItems() {
    const { currentType } = this.state;
    if (!currentType) return [];

    switch (currentType) {
      case "browser_versions": {
        return this.props.browser_versions.byBrowserId(this.state.browser_id);
      }

      case "os_versions": {
        return this.props.os_versions.byOsId(this.state.os_id);
      }

      case "models": {
        return this.props.models.byDeviceId(this.state.device_id);
      }

      default: {
        return this.props[currentType].items;
      }
    }
  }

  getDetailOsVersionModal() {
    const { archs, os_versions, os_panels } = this.props;
    const DetailOsVersionHeadRow = [
      <th key={0}>{`Архитектуры (${archs.priorities.length})`}</th>,
      <th key={1}>{`Панели ОС(${os_panels.priorities.length})`}</th>
    ];
    const rows = [
      {
        singleItemName: "Архитектура",
        secondItemName: "Содержание",
        addBtnText: "Добавить Архитектуру",
        handleOnClick: this.openArchModal,
        rows: archs.priorities.map((elm, index) => (
          <SmallTableRow {...elm} key={index} rowKey={index} />
        ))
      },
      {
        singleItemName: "Высота",
        addBtnText: "Добавить панель",
        handleOnClick: this.openOsPanelModal,
        rows: os_panels.priorities.map((elm, index) => (
          <SmallTableRow {...elm} key={index} rowKey={index} />
        ))
      }
    ];
    return (
      <DetailModal
        show={this.state.showDetailOsVersion}
        onClose={this.hideModals}
        title="Свойства версии ОС"
        name={this.getItemName(this.state.os_version_id, "os_versions")}
      >
        <ThirdPart headRow={DetailOsVersionHeadRow} rows={rows} />
      </DetailModal>
    );
  }

  getDetailBrowserVersion() {
    const { templates } = this.props;
    const headRow = [
      <th key={0}>{`Шаблоны UA (${templates.priorities.length})`}</th>
    ];
    const rows = [
      {
        singleItemName: "Шаблон",
        addBtnText: "Добавить шаблон",
        handleOnClick: this.openTemplateModal,
        rows: templates.priorities.map((elm, index) => (
          <SmallTableRow
            {...{ payload: null, name: elm.payload, priority: elm.priority }}
            key={index}
            rowKey={index}
          />
        ))
      }
    ];

    return (
      <DetailModal
        show={this.state.showDetailBrowserVersion}
        onClose={this.hideModals}
        title="Свойства версии браузеров"
        name={this.getItemName(
          this.state.browser_version_id,
          "browser_versions"
        )}
      >
        <ThirdPart headRow={headRow} rows={rows} />
      </DetailModal>
    );
  }

  getModals() {
    return (
      <div>
        <AddPriorityModal
          show={this.state.showModelModal}
          onClose={this.hideModals}
          name="Модель"
          items={this.getCurrentTypeItems()}
          action={this.props.fetchSetModelPry(
            this.state.device_id,
            this.state.os_id,
            this.state.os_version_id
          )}
          fieldName="model_id"
        />
        <AddPriorityModal
          show={this.state.showDeviceModal}
          onClose={this.hideModals}
          name="Устройство"
          items={this.getCurrentTypeItems()}
          action={this.props.fetchSetDevicePry}
          fieldName="device_id"
        />
        <AddPriorityModal
          show={this.state.showOsModal}
          onClose={this.hideModals}
          name="Операционка"
          items={this.getCurrentTypeItems()}
          action={this.props.fetchSetOsPry(this.state.device_id)}
          fieldName="os_id"
        />
        <AddPriorityModal
          show={this.state.showOsVersionModal}
          onClose={this.hideModals}
          name="Версия Операционки"
          items={this.getCurrentTypeItems()}
          action={this.props.fetchSetOsVersionPry(
            this.state.device_id,
            this.state.os_id
          )}
          fieldName="os_version_id"
        />
        <AddPriorityModal
          show={this.state.showBrowserModal}
          onClose={this.hideModals}
          name="Браузер"
          items={this.getCurrentTypeItems()}
          action={this.props.fetchSetBrowserPry(
            this.state.device_id,
            this.state.model_id,
            this.state.os_id,
            this.state.os_version_id
          )}
          fieldName="browser_id"
        />
        <AddPriorityModal
          show={this.state.showBrowserVersionModal}
          onClose={this.hideModals}
          name="Версия Браузера"
          items={this.getCurrentTypeItems()}
          action={this.props.fetchSetBrowserVersionPry(
            this.state.device_id,
            this.state.model_id,
            this.state.os_id,
            this.state.os_version_id,
            this.state.browser_id
          )}
          fieldName="browser_version_id"
        />
        <AddPriorityModal
          show={this.state.showArchModal}
          onClose={this.hideArchModal}
          name="Архитектура"
          items={this.getCurrentTypeItems()}
          action={this.props.fetchSetArchPry(
            this.state.device_id,
            this.state.os_id
          )}
          fieldName="arch_id"
        />
        <AddPriorityModal
          show={this.state.showOsPanelModal}
          onClose={this.hideOsPanelModal}
          name="Панель ОС"
          items={this.getCurrentTypeItems()}
          action={this.props.fetchSetOsPanelPry(
            this.state.device_id,
            this.state.os_id,
            this.state.os_version_id
          )}
          fieldName="os_panel_id"
        />
        <AddPriorityModal
          show={this.state.showScreenModal}
          onClose={this.hideScreenModal}
          name="Экран"
          items={this.getCurrentTypeItems()}
          action={this.props.fetchSetScreenPry(
            this.state.device_id,
            this.state.model_id
          )}
          fieldName="screen_id"
        />
        <AddPriorityModal
          show={this.state.showTemplateModal}
          onClose={this.hideTemplateModal}
          name="Шаблон"
          items={this.getCurrentTypeItems()}
          action={this.props.fetchSetTemplatePry(
            this.state.device_id,
            this.state.model_id,
            this.state.os_id,
            this.state.os_version_id,
            this.state.browser_id
          )}
          fieldName="template_id"
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.getDetailOsVersionModal()}
        {this.getDetailBrowserVersion()}
        {this.getModals()}
        <table className="table table-three">
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
