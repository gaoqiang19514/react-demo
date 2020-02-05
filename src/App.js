import React, { Component } from "react";

import "./App.css";
import Map from "./Map";

export default class App extends Component {
  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <Map />
      </div>
    );
  }
}
