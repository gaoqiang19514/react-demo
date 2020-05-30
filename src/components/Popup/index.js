import React, { Component } from "react";

import "./style.css";
import Map from "../Map";

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
    this.map.on("click", this.handleClick);
  };

  handleClick = (e) => {
    const { lngLat } = e;

    this.popup = this.addPopupToMap({
      lngLat,
      content: "Hello World",
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

  render() {
    return (
      <Map options={{ zoom: 10.24, mapInitialized: this.mapInitialized }} />
    );
  }
}

export default Popup;
