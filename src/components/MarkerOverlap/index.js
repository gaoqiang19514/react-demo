import React, { Component } from "react";

import "./style.css";
import Map from "../Map";

const layerId = "layerId";
const sourceId = "sourceId";

function Test() {
  return <div>test</div>;
}

class MarkerOverlap extends Component {
  state = {
    pos: {
      left: 0,
      top: 0,
    },
    markerList: [],
  };

  componentDidMount() {
    this.popup = new window.minemap.Popup({
      closeButton: false,
      closeOnClick: false,
    });
  }

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
            id: 1,
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
            id: 2,
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
            id: 3,
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

    if (!features.length) {
      this.popup.remove();
      return;
    }

    if (features && features.length) {
      this.showMarkerList(e.point, features);
    }
  };

  handleClick = (arg) => {
    console.log("handleClick", arg);
  };

  showMarkerList = (point, list) => {
    const center = this.map.unproject(point);

    const createListDOMContent = (list, cb) => {
      const ul = window.document.createElement("ul");

      list.forEach((item) => {
        const li = window.document.createElement("li");
        li.innerHTML = "Hello, world!";
        li.onclick = () => cb(item);
        ul.appendChild(li);
      });
      return ul;
    };

    const DOMContent = createListDOMContent(list, this.handleClick);

    this.popup.setLngLat(center).setDOMContent(DOMContent).addTo(this.map);
  };

  initEvents = (map) => {
    map.on("click", this.handleMarkerClick);
  };

  mapInitialized = (map) => {
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
          mapInitialized: this.mapInitialized,
        }}
      />
    );
  }
}

export default MarkerOverlap;
