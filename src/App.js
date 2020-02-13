import React, { Component } from "react";

import "./App.css";
import Example from "./Example";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.mapLoad = this.mapLoad.bind(this);
  }

  // 自定义数据源
  addSources(map) {
    const center = map.getCenter();
    const jsonData = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [center.lng + 0.03, center.lat + 0.02]
          },
          properties: {
            title: "大学",
            kind: "school"
          }
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [center.lng + 0.01, center.lat - 0.01]
          },
          properties: {
            title: "公园",
            kind: "park"
          }
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [center.lng - 0.03, center.lat - 0.02]
          },
          properties: {
            title: "医院",
            kind: "hospital"
          }
        }
      ]
    };

    map.addSource("pointSource", {
      type: "geojson",
      data: jsonData
    });
  }

  // 自定义图层
  addLayers(map) {
    map.addLayer({
      id: "circleLayer",
      type: "circle",
      source: "pointSource",
      layout: {
        visibility: "visible"
      },
      paint: {
        "circle-radius": 10,
        "circle-color": {
          type: "categorical",
          property: "kind",
          stops: [
            ["school", "#ff0000"],
            ["park", "#00ff00"],
            ["hospital", "#0000ff"]
          ],
          default: "#ff0000"
        },
        "circle-opacity": 0.8
      },
      minzoom: 7,
      maxzoom: 17.5
    });
  }

  mapLoad(map) {
    // 好像没什么区别？
    this.addSources(map);
    this.addLayers(map);

    setTimeout(() => {
      map.easeTo({
        center: [116.46, 39.92],
        zoom: 8,
        bearing: 0,
        pitch: 60,
        duration: 2000
      });

      setTimeout(() => {
        // 上移100像素
        map.panBy([0, 100]);
      }, 1200);
    }, 1000);
  }

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <Example
          options={{
            center: [116.46, 39.92],
            zoom: 10,
            pitch: 0,
            maxZoom: 17,
            minZoom: 3,
            loadCallback: this.mapLoad
          }}
        />
      </div>
    );
  }
}
