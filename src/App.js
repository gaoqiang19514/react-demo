import React, { Component } from "react";

import "./App.css";
import Cluster from "./components/Cluster";
import MapBorder from "./components/MapBorder";
import MarkerOverlap from "./components/MarkerOverlap";
import Popup from "./components/Popup";

class App extends Component {
  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        {/* <MarkerOverlap /> */}
        <Cluster />
        {/* <MapBorder /> */}
        {/* <Popup /> */}
      </div>
    );
  }
}

export default App;
