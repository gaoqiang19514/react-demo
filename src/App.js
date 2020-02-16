import React, { Component } from "react";

import "./App.css";
import Cluster from "./components/Cluster";

class App extends Component {
  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <Cluster />
      </div>
    );
  }
}

export default App;
