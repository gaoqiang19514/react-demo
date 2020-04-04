import React, { Component } from "react";

import Map from "./Map";

function getData(lng, lat) {
  if (!lng || !lat) {
    throw new Error("参数不齐");
  }

  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [lng, lat],
            [lng, lat + 0.008],
            [lng - 0.008, lat + 0.008],
            [lng - 0.008, lat],
            [lng, lat],
          ],
        },
        properties: {
          kind: 1,
        },
      },
    ],
  };
}

class Cluster extends Component {
  addSources = (map, sourceId) => {
    const center = map.getCenter();

    map.addSource(sourceId, {
      type: "geojson",
      data: getData(center.lng, center.lat),
    });
  };

  addLayers = (map, sourceId) => {
    map.addLayer({
      id: "lineLayer",
      type: "line",
      source: sourceId,
      paint: {
        "line-width": 4,
        "line-color": "red",
      },
    });
  };

  loadCallback = (map) => {
    const sourceId = "sourceId";
    this.addSources(map, sourceId);
    this.addLayers(map, sourceId);
  };

  render() {
    return (
      <Map
        options={{
          center: [121.90154, 29.46968],
          zoom: 11.8,
          pitch: 0,
          maxZoom: 17,
          minZoom: 3,
          loadCallback: this.loadCallback,
        }}
      />
    );
  }
}

export default Cluster;
