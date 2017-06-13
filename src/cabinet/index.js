import React from "react";
import Card from "../components/Card";
import urls from "../urls";

const items = [
  {
    title: "Профили",
    text: "Список профилей и их настройки",
    to: urls.profiles,
    image: "al-profiles"
  },
  {
    title: "Возрастные категории",
    text: "Возрастные категории киборгов",
    to: urls.ages,
    image: "al-ages"
  },
  {
    title: "Круги интересов",
    text: "Список кругов интересов",
    to: urls.favorites,
    image: "al-stars"
  },
  {
    title: "Устройства",
    text: "Список устройств",
    to: urls.devices,
    image: "al-device"
  },
  {
    title: "Модели",
    text: "Список моделями для устройств",
    to: urls.models,
    image: "al-model"
  },
  {
    title: "Экраны",
    text: "Список разрешений экранов",
    to: urls.screens,
    image: "al-screen"
  },
  {
    title: "ОС",
    text: "Список операционных систем",
    to: urls.os,
    image: "al-os"
  },
  {
    title: "Версии ОС",
    text: "Список версий ОС",
    to: urls.os_versions,
    image: "al-os-version"
  },
  {
    title: "Архитектуры ОС",
    text: "Список архитектур ОС",
    to: urls.os_arch,
    image: "al-os-control"
  },
  {
    title: "Панели ОС",
    text: "Управление панелями ОС",
    to: urls.os_panels,
    image: "al-os-panel"
  },
  {
    title: "Браузеры",
    text: "Список браузеров",
    to: urls.browsers,
    image: "al-browser"
  },
  {
    title: "Версии браузеров",
    text: "Список версий браузеров",
    to: urls.browser_versions,
    image: "al-browser-version"
  },
  {
    title: "Панели браузеров",
    text: "Список панелей браузеров",
    to: urls.browser_panel_versions,
    image: "al-browser-panel"
  },
  {
    title: "Шаблоны UA",
    text: "Список шаблонов UA",
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
      <div className="cards">
        {cards}
      </div>
    );
  }
}

export default MainPage;
