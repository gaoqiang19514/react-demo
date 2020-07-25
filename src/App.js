import React, { Component } from "react";

import Map from "./Map";

const mapStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
};

class Example extends Component {
  setRef = (ref) => {
    this.mapRef = ref;
  };

  mapLoaded = () => {
    this.markerList = this.mapRef.addMarkers([[114.085947, 22.547]]);

    setTimeout(() => {
      this.markerList.remove();
    }, 3000);
  };

  render() {
    return (
      <div style={mapStyle}>
        <Map ref={this.setRef} mapLoaded={this.mapLoaded} />
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Example />
    </div>
  );
}

export default App;
