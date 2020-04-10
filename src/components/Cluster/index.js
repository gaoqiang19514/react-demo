import React, { Component } from "react";

import pointData from "../../data/poi_suzhou.json";
import Map from "../Map";

function createColorsFilter(i, color, colors) {
  if (i === 0) {
    return [">=", "point_count", color[0]];
  }

  return [
    "all",
    [">=", "point_count", color[0]],
    ["<", "point_count", colors[i - 1][0]],
  ];
}

class Cluster extends Component {
  constructor(props) {
    super(props);

    this.loadCallback = this.loadCallback.bind(this);
  }

  addMarker(map) {
    const sourceId = "data-point";

    map.addSource(sourceId, {
      type: "geojson",
      data: pointData,
      cluster: true,
      clusterMaxZoom: 15,
      clusterRadius: 50,
    });

    //添加非聚合图层
    map.addLayer({
      id: "unclustered-points",
      type: "symbol",
      source: sourceId,
      filter: ["!has", "point_count"],
      layout: {
        "icon-image": "bank-15",
      },
    });

    //添加聚合图层
    const outerColors = [
      [1000, "rgba(253, 156, 115, 0.6)"],
      [100, "rgba(241, 211, 87, 0.6)"],
      [0, "rgba(181, 226, 140, 0.6)"],
    ];

    outerColors.forEach(function (color, i) {
      map.addLayer({
        id: "point-outer-cluster-" + i,
        type: "circle",
        source: sourceId,
        paint: {
          "circle-color": color[1],
          "circle-radius": 20,
        },
        filter: createColorsFilter(i, color, outerColors),
      });
    });

    const innerColors = [
      [1000, "rgba(241, 128, 23, 0.6)"],
      [100, "rgba(240, 194, 12, 0.6)"],
      [0, "rgba(110, 204, 57, 0.6)"],
    ];

    innerColors.forEach(function (color, i) {
      map.addLayer({
        id: "point-inner-cluster-" + i,
        type: "circle",
        source: sourceId,
        paint: {
          "circle-color": color[1],
          "circle-radius": 15,
        },
        filter: createColorsFilter(i, color, innerColors),
      });
    });

    //添加数量图层
    map.addLayer({
      id: "cluster-count",
      type: "symbol",
      source: sourceId,
      layout: {
        "text-field": "{point_count}",
        "text-size": 10,
      },
      paint: {
        "text-color": "rgba(0,0,0,.75)",
      },
      filter: ["has", "point_count"],
    });
  }

  initEvents(map) {
    const keys = [
      "point-outer-cluster-0",
      "point-outer-cluster-1",
      "point-outer-cluster-2",
    ];

    map.on("click", (e) => {
      const features = map.queryRenderedFeatures(e.point, { layers: keys });
      const feature = features.length > 0 ? features[0] : null;

      console.log("feature", feature);
    });
  }

  loadCallback(map) {
    this.addMarker(map);
    this.initEvents(map);
  }

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
