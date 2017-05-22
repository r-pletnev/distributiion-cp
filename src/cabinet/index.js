import React from "react";
import Card from "../components/Card";
import urls from "../urls";

const items = [
  {
    title: "Devices",
    text: "Управление девайсами",
    to: urls.devices,
    image: "al-device"
  },
  {
    title: "Models",
    text: "Управление моделями девайсов",
    to: urls.models,
    image: "al-model"
  },
  {
    title: "Screens",
    text: "Управление разрешениями экрана",
    to: urls.screens,
    image: "al-screen"
  },
  {
    title: "OS",
    text: "Управление операционными системами",
    to: urls.os,
    image: "al-os"
  },
  {
    title: "OS versions",
    text: "Управление версиями ОС",
    to: urls.os_versions,
    image: "al-os-version"
  },
  {
    title: "OS architectures",
    text: "Управление архитектурой ОС",
    to: urls.os_arch,
    image: "al-os-control"
  },
  {
    title: "OS panels",
    text: "Управление панелями ОС",
    to: urls.os_panels,
    image: "al-os-panel"
  },
  {
    title: "Browsers",
    text: "Управление браузерами",
    to: urls.browsers,
    image: "al-browser"
  },
  {
    title: "Browser versions",
    text: "Управление версиями браузеров",
    to: urls.browser_versions,
    image: "al-browser-version"
  },
  {
    title: "Browser panels",
    text: "Управление панелями браузеров",
    to: urls.browser_panel_versions,
    image: "al-browser-panel"
  },
  {
    title: "UA templates",
    text: "Управление шаблонами UA",
    to: urls.templates,
    image: "al-ua-template"
  }
];

class MainPage extends React.Component {
  render() {
    const cards = items.map((elm, index) => (
      <Card
        title={elm.title}
        text={elm.text}
        to={elm.to}
        key={index}
        image={elm.image}
      />
    ));
    return (
      <div className="main-content start">
        <div className="split">
          <div className="box">
            <h2>Distributions</h2>
            <div className="cards">
              <Card
                title="Edit Distributions"
                to={urls.profiles}
                text="Управление распределениями для выбранного профиля"
                image="al-profiles"
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

export default MainPage;
