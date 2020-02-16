import React, { Component } from "react";

import utils from "./utils";
import borderLineData from "./borderLine";
import statisticsData from "./statistics";
import Map from "./Map";

const transformBorderLineData = data => {
  return data.map(item => ({
    key: item.code,
    title: item.name,
    polygonList: utils.formatWktData(item.wktPoly),
    position: utils.formatWktData(item.wktAreaCenter)
  }));
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.mapLoad = this.mapLoad.bind(this);

    this.state = {
      borderLineData: transformBorderLineData(borderLineData),
      statisticsData
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.statisticsData !== this.state.statisticsData) {
      this.updateMarker(this.map);
    }
  }

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

  // 绘制边界线
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

  // 绘制点位
  addMarkers(map, data) {
    const markers = data.map(item => {
      return utils.createMarker(window.minemap, {
        position: item.position,
        html: `<div class="box">${item.areaName}${item.dogCardNum}</div>`
      });
    });
    map.addMarkers(markers);
  }

  // 更新点位
  updateMarker(map) {
    console.log("updateMarker");
    if (!map) {
      return;
    }

    map.removeMarkers();
    this.addMarkers(map, this.state.statisticsData);
  }

  // 自动刷新点位数据
  autoRefresh() {
    // 在这里更新传入Home的数据
    // 也就是borderLineData和statisticsData
    setTimeout(() => {
      this.setState({
        statisticsData: statisticsData.map(item => ({
          ...item,
          dogCardNum: item.dogCardNum * 10
        }))
      });
    }, 2000);
  }

  mapLoad(map) {
    const { borderLineData, statisticsData } = this.state;

    this.map = map;

    this.drawBorderLine(map, borderLineData);
    this.addMarkers(map, statisticsData);

    // 这里开始启动定时请求
    this.autoRefresh();
  }

  render() {
    return (
      <Map
        options={{
          center: [114.113702, 22.6208],
          zoom: 9.5,
          loadCallback: this.mapLoad
        }}
      />
    );
  }
}
