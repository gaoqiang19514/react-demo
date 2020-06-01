import React, { Component } from "react";

import "./style.css";
import Map from "../Map";

function createMarkerList() {
  return `<ul class="list">
    <li class="item" data-id="1">华南街道1</li>
    <li class="item" data-id="2">华南街道2</li>
    <li class="item" data-id="3">华南街道3</li>
    <li class="item" data-id="4">华南街道4</li>
    <li class="item" data-id="5">华南街道5</li>
  </ul>`;
}

class Popup extends Component {
  constructor(props) {
    super(props);

    this.map = null;
    this.popup = null;
  }

  mapInitialized = (map) => {
    this.map = map;
    this.initEvents();
  };

  initEvents = () => {
    this.map.on("click", this.handleMapClick);
    document.addEventListener("click", this.handleClick);
  };

  handleMapClick = (e) => {
    const { lngLat } = e;

    this.popup = this.addPopupToMap({
      lngLat,
      content: createMarkerList(),
    });
  };

  addPopupToMap = ({ lngLat, content }) => {
    return new window.minemap.Popup({
      closeOnClick: true,
      closeButton: true,
      offset: [0, 0],
    })
      .setLngLat(lngLat)
      .setHTML(content)
      .addTo(this.map);
  };

  handleClick = (e) => {
    let id = "";
    const { target } = e;

    if (!target.className || target.className !== "item") {
      return;
    }

    id = target.getAttribute("data-id");
    if (!id) {
      return;
    }

    // 获取触发元素上的标识
    // console.log(id);
    // 使用id请求数据
    // const [err, data] = await request(api.getData(id);
    // 吊起弹层
    // showLayer()
  };

  render() {
    return (
      <Map options={{ zoom: 10.24, mapInitialized: this.mapInitialized }} />
    );
  }
}

export default Popup;
