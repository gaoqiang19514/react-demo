import React, { Component } from "react";
import echarts from "echarts";
import axios from "axios";

import Map from "../Map";
import { getChartOption } from "./config";
import { formatWktData } from "../../utils";

const API = {
  getAreaCenterPoint: (deptCode) =>
    axios.post("/zfzh-service/webapi/resourceMap/areaChildrenByDeptCode", {
      coordinateType: "gcj02",
      deptCode,
    }),
};

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

  /**
   * 绘制深圳市各区标识
   * @return undefined
   */
  mapLoaded = (instance) => {
    this.mapInstance = instance;

    this.drawAreaCharts();

    this.drawMarkers(this.handleMarkerClick);
  };

  /**
   * 绘制深圳市各区标识
   * @return undefined
   */
  drawAreaCharts = () => {
    // 请求得到各区的中心点
    API.getAreaCenterPoint("4403")
      .then((res) => {
        const { childrenList } = res.data.data;

        if (!childrenList.length) {
          return;
        }

        childrenList.forEach((item, index) => {
          const [longitude, latitude] = formatWktData(item.wktAreaCenter);
          this.drawLabel([longitude, latitude], index);
        });
      })
      .catch(console.error);
  };
  /**
   * 绘制深圳市各区标识
   * @return undefined
   */
  drawLabel = (point, index) => {
    const id = `chart-${index}`;
    return this.mapInstance.addLabel({
      longitude: point[0],
      latitude: point[1],
      content: `<div id="${id}" style="width: 60px;height:150px;">chart</div>`,
      options: {
        enableMassClear: false,
        offset: new window.BMap.Size(-30, -150),
      },
      callback: (label) => {
        label.setStyle({
          background: "transparent",
          border: "none",
          padding: 0,
        });
        const myChart = echarts.init(document.getElementById(id));
        myChart.setOption(getChartOption());
      },
    });
  };

  /**
   * 绘制深圳市各区标识
   * @return undefined
   */
  handleMarkerClick = () => {
    alert("123");
  };

  /**
   * 绘制深圳市各区标识
   * @return undefined
   */
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

  /**
   * 绘制深圳市各区标识
   * @return undefined
   */
  handleBackLevelClick = () => {
    this.mapInstance.backLevel();
  };

  /**
   * 绘制深圳市各区标识
   * @return undefined
   */
  handleSearchChange = (e) => {
    this.setState({ searchText: e.target.value });
  };

  /**
   * 绘制深圳市各区标识
   * @return undefined
   */
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
