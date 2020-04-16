import React, { Component } from "react";

import Map from "../Map";

const layerId = "layerId";
const sourceId = "sourceId";

class MarkerOverlap extends Component {
  addSources = (map, sourceId) => {
    const center = map.getCenter();

    var jsonData = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [center.lng, center.lat],
          },
          properties: {
            title: "大学",
            kind: "school",
          },
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [center.lng + 0.00001, center.lat + 0.00001],
          },
          properties: {
            title: "公园",
            kind: "park",
          },
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [center.lng - 0.1, center.lat - 0.1],
          },
          properties: {
            title: "医院",
            kind: "hospital",
          },
        },
      ],
    };

    map.addSource(sourceId, {
      type: "geojson",
      data: jsonData,
    });
  };

  addLayers = (map, layerId, sourceId) => {
    map.addLayer({
      id: layerId,
      type: "circle",
      source: sourceId,
      layout: {
        visibility: "visible",
      },
      paint: {
        "circle-radius": 10,
        "circle-color": {
          type: "categorical",
          property: "kind",
          stops: [
            ["school", "#ff0000"],
            ["park", "#00ff00"],
            ["hospital", "#0000ff"],
          ],
          default: "#ff0000",
        },
        "circle-opacity": 0.8,
      },
    });
  };

  handleMarkerClick = (e) => {
    const features = this.map.queryRenderedFeatures(e.point, {
      layers: [layerId],
    });

    console.log('features', features);
  };

  initEvents = (map) => {
    map.on("click", this.handleMarkerClick);
  };

  loadCallback = (map) => {
    this.map = map;

    this.addSources(map, sourceId);
    this.addLayers(map, layerId, sourceId);
    this.initEvents(map);
  };

  render() {
    return (
      <Map
        options={{
          center: [116.46, 39.92],
          zoom: 10,
          pitch: 0,
          maxZoom: 17,
          minZoom: 3,
          loadCallback: this.loadCallback,
        }}
      />
    );
  }
}

export default MarkerOverlap;
