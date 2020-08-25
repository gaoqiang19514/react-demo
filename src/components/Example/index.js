import React, { Component } from "react";
import echarts from "echarts";

import api from "./api";
import Map from "../Map";
import { getChartOption } from "./config";
import { formatWktData } from "../../utils";

const mapStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
};

class Example extends Component {
  constructor(props) {
    super(props);

    this.areaChartList = [];

    this.state = {
      searchText: "",
    };
  }

  /**
   * 地图初始化完成回调
   * @return undefined
   */
  mapLoaded = (instance, map) => {
    this.mapInstance = instance;
    this.map = map;

    // this.loadAreaChartsData();
  };

  /**
   * 绘制各区echarts图表
   * @return undefined
   */
  loadAreaChartsData = () => {
    api
      .getAreaCenterPoint("4403")
      .then((res) => {
        const { childrenList } = res.data.data;

        if (!childrenList.length) {
          return;
        }

        this.areaChartList = this.drawEchartsLabels(childrenList);
      })
      .catch(console.error);
  };

  /**
   * 绘制深圳市各区图表
   * @return undefined
   */
  drawEchartsLabels = (list) => {
    const labels = [];

    this.clearAreaCharts();

    list.forEach((item, index) => {
      const id = `chart-${index}`;

      labels.push({
        coordinate: formatWktData(item.wktAreaCenter),
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
          echarts.init(document.getElementById(id)).setOption(getChartOption());
        },
      });
    });

    return this.mapInstance.addLabels(labels);
  };

  clearAreaCharts = () => {
    const { areaChartList } = this;

    if (!areaChartList.length) {
      return;
    }

    areaChartList.forEach((item) => item.remove());
  };

  /**
   * 下钻回退
   * @return undefined
   */
  handleBackLevelClick = () => {
    this.mapInstance.backLevel();
  };

  /**
   * 同步state
   * @return undefined
   */
  handleSearchChange = (e) => {
    this.setState({ searchText: e.target.value });
  };

  /**
   * 搜索数据
   * @return undefined
   */
  handleSearchClick = () => {
    const { searchText } = this.state;

    if (!searchText) {
      alert("请输入关键字");
      return;
    }

    // TODO: 这里请求后台结果，然后用点位绘制到地图上
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
