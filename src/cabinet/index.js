import React from "react";
import Card from "../components/Card";
import urls from "../urls";
import { connect } from "react-redux";
import { fetchAllDevices } from "../actions/devices";
import { fetchAllModels } from "../actions/models";

const items = [
  {
    title: "Devices",
    text: "Управление девайсами",
    to: urls.devices
  },
  {
    title: "Orientations",
    text: "Управление ориентацией экрана",
    to: urls.orientations
  },
  {
    title: "Models",
    text: "Управление моделями девайсов",
    to: urls.models
  },
  {
    title: "OS",
    text: "Управление операционными системами",
    to: urls.os
  },
  {
    title: "OS versions",
    text: "Управление версиями ОС",
    to: urls.os_versions
  },
  {
    title: "OS architectures",
    text: "Управление архитектурой ОС",
    to: urls.os_arch
  },
  {
    title: "Browsers",
    text: "Управление браузерами",
    to: urls.browsers
  },
  {
    title: "Browser versions",
    text: "Управление версиями браузеров",
    to: urls.browser_versions
  }
];

class MainPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAllDevices());
    this.props.dispatch(fetchAllModels());
  }

  render() {
    const cards = items.map((elm, index) => (
      <Card title={elm.title} text={elm.text} to={elm.to} key={index} />
    ));
    return (
      <div className="main-content start">
        <div className="split">
          <div className="box">
            <h2>Distributions</h2>
            <div className="cards">
              <Card
                title="Edit Distributions"
                to="#"
                text="Управление распределениями для выбранного профиля"
              />
            </div>
          </div>
          <div className="box box-3x">
            <h2>Items of Distributions</h2>
            <div className="cards">
              {cards}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(MainPage);
