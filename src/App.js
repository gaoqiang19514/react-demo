import React, { Component } from "react";

import downloadIcon from "./logo.svg";
import Map from "./Map";

const mapStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
};

class Example extends Component {
  mapLoaded = (instance) => {
    this.mapInstance = instance;

    this.markerHandle = this.drawMarkers();
    this.lineHandle = this.drawLine();
    this.polygonHandle = this.drawPolygon();
    this.labelHandle = this.drawLabel();
  };

  drawMarkers = () => {
    // 如果需要制定图标，则给Marker传入图标参数就行了
    const myIcon = new window.BMapGL.Icon(
      downloadIcon,
      new window.BMapGL.Size(30, 30)
    );

    return this.mapInstance.addMarkers([[114.085947, 22.547]], {
      icon: myIcon,
    });
  };

  drawLine = () => {
    return this.mapInstance.addPolyline(
      [
        [114.085947, 22.547],
        [114.185947, 22.747],
      ],
      {
        strokeColor: "blue",
        strokeWeight: 2,
        strokeOpacity: 0.5,
      }
    );
  };

  drawPolygon = () => {
    return this.mapInstance.adPolygon(
      [
        [114.085947, 22.547],
        [114.185947, 22.747],
        [114.285947, 22.847],
        [114.385947, 22.947],
      ],
      {
        strokeColor: "blue",
        strokeWeight: 2,
        strokeOpacity: 0.5,
      }
    );
  };

  drawLabel = () => {
    return this.mapInstance.addLabels([
      {
        longitude: 114.085947,
        latitude: 22.547,
        content: "我是label",
      },
      {
        longitude: 114.185947,
        latitude: 22.647,
        content: "我是label2",
      },
    ]);
  };

  handleRemoveMarkersClick = () => {
    if (this.markerHandle) {
      this.markerHandle.remove();
    }
  };

  handleRemoveLineClick = () => {
    if (this.lineHandle) {
      this.lineHandle.remove();
    }
  };

  handleRemovePolygonClick = () => {
    if (this.polygonHandle) {
      this.polygonHandle.remove();
    }
  };



  handleRemoveLabelsClick = () => {
    if (this.labelHandle) {
      this.labelHandle.remove();
    }
  };
  render() {
    return (
      <div style={mapStyle}>
        <Map mapLoaded={this.mapLoaded} />
        <div style={{ position: "absolute", zIndex: 10, top: 0 }}>
          <button type="button" onClick={this.handleRemoveMarkersClick}>
            remove markers
          </button>
          <button type="button" onClick={this.handleRemoveLineClick}>
            remove line
          </button>
          <button type="button" onClick={this.handleRemovePolygonClick}>
            remove Polygon
          </button>
          <button type="button" onClick={this.handleRemoveLabelsClick}>
            remove labels
          </button>
        </div>
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
