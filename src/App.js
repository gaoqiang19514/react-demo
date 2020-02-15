import React, { Component } from "react";

import "./App.css";
import utils from "./utils";
import borderLine from "./borderLine";
import Map from "./Map";

const borderLineData = borderLine.data.map(item => ({
  key: item.code,
  title: item.name,
  polygonList: utils.formatWktData(item.wktPoly),
  position: utils.formatWktData(item.wktAreaCenter)
}));

export default class App extends Component {
  constructor(props) {
    super(props);

    this.mapLoad = this.mapLoad.bind(this);
  }

  // 自定义数据源
  draw(id, map, data, options) {
    const jsonData = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: data
          }
        }
      ]
    };

    map.addSource(id, {
      type: "geojson",
      data: jsonData
    });

    map.addLayer({
      id: id,
      type: "line",
      source: id,
      layout: {
        "line-join": "round",
        "line-cap": "round"
      },
      paint: {
        "line-width": 6,
        "line-color": "red",
        "line-opacity": 1,
        ...options
      },
      minzoom: 7,
      maxzoom: 17.5
    });
  }

  drawBorderLine(map, data) {
    const options = {
      "line-width": 5,
      "line-color": "yellow",
      "line-opacity": 1
    };

    data.forEach(item => {
      const { key, polygonList } = item;
      const len = utils.multiarr(polygonList);

      if (len === 2) {
        this.draw(key, map, polygonList, options);
      } else if (len === 3) {
        polygonList.forEach((item, index) => {
          this.draw(`${key}-${index}`, map, item, options);
        });
      }
    });
  }

  mapLoad(map) {
    this.drawBorderLine(map, borderLineData);
  }

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <Map
          options={{
            center: [114.113702, 22.6208],
            zoom: 9.5,
            loadCallback: this.mapLoad
          }}
        />
      </div>
    );
  }
}
