import React, { Component } from "react";
import echarts from "echarts";

import Map from "./Map";

const mapStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
};

class Example extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: "",
    };
  }

  mapLoaded = (instance) => {
    this.mapInstance = instance;
    // this.labelHandle = this.drawLabel();

    this.drawMarkers(this.handleMarkerClick);
  };

  drawLabel = () => {
    return this.mapInstance.addLabel({
      longitude: 114.085947,
      latitude: 22.547,
      content: `<div id="chart" style="width: 200px;height:200px;">chart</div>`,
      options: {
        enableMassClear: false,
        offset: new window.BMap.Size(10, 20),
      },
      callback: () => {
        const myChart = echarts.init(document.getElementById("chart"));
        const option = {
          tooltip: {},
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              data: [5, 20, 36, 10, 10, 20],
            },
          ],
        };
        myChart.setOption(option);
      },
    });
  };

  handleMarkerClick = () => {
    alert("123");
  };

  drawMarkers = (eventHandler) => {
    const EXAMPLE_URL =
      "http://api.map.baidu.com/library/MarkerClusterer/1.2/examples/";

    const MAX = 10;
    const markers = [];
    for (let i = 0; i < MAX; i++) {
      const point = new window.BMap.Point(
        Math.random() * 40 + 85,
        Math.random() * 30 + 21
      );
      const marker = new window.BMap.Marker(point, { enableMassClear: false });
      marker.addEventListener("click", eventHandler);
      markers.push(marker);
    }

    this.markerClusterer = new window.BMapLib.MarkerClusterer(
      this.mapInstance.map,
      {
        markers: markers,
        styles: [
          {
            url: EXAMPLE_URL + "images/heart30.png",
            size: new window.BMap.Size(30, 26),
            opt_anchor: [16, 0],
            textColor: "#ff00ff",
            opt_textSize: 10,
          },
        ],
      }
    );
  };

  handleRemoveLabelsClick = () => {
    if (this.labelHandle) {
      this.labelHandle.remove();
    }
  };

  handleBackLevelClick = () => {
    this.mapInstance.backLevel();
  };

  handleSearchChange = (e) => {
    this.setState({ searchText: e.target.value });
  };

  handleSearchClick = () => {
    const { searchText } = this.state;

    if (!searchText) {
      alert("请输入关键字");
      return;
    }

    this.mapInstance.searchText(searchText);
  };

  render() {
    return (
      <div style={mapStyle}>
        <Map mapLoaded={this.mapLoaded} />
        <div style={{ position: "absolute", zIndex: 10, top: 0 }}>
          <button type="button" onClick={this.handleRemoveLabelsClick}>
            remove labels
          </button>
          <button type="button" onClick={this.handleBackLevelClick}>
            back level
          </button>
          <input
            type="text"
            value={this.state.searchText}
            onChange={this.handleSearchChange}
          />
          <button type="button" onClick={this.handleSearchClick}>
            搜索
          </button>
        </div>
      </div>
    );
  }
}

export default Example;
