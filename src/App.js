import React, { Component } from "react";

import "./App.css";
import Cluster from "./components/Cluster";
import MapBorder from "./components/MapBorder";

class App extends Component {
  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        {/* <Cluster /> */}
        <MapBorder />
      </div>
    );
  }
}

export default App;
