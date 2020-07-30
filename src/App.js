import React, { Component } from "react";
import echarts from "echarts";

import downloadIcon from "./logo.svg";
import Map from "./Map";

const mapStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
};

class Example extends Component {
  mapLoaded = (instance) => {
    if (this.mapInstance) {
      return;
    }

    this.mapInstance = instance;

    this.markerHandle = this.drawMarker();
    this.lineHandle = this.drawLine();
    this.polygonHandle = this.drawPolygon();
    this.labelHandle = this.drawLabel();
  };

  drawMarker = () => {
    // 如果需要制定图标，则给Marker传入图标参数就行了
    const myIcon = new window.BMapGL.Icon(
      downloadIcon,
      new window.BMapGL.Size(30, 30)
    );

    return this.mapInstance.addMarker([114.085947, 22.547], {
      icon: myIcon,
    });
  };

  drawLine = () => {
    return this.mapInstance.addPolyline(
      [
        [114.085947, 22.547],
        [114.185947, 22.747],
      ],
      {
        strokeColor: "blue",
        strokeWeight: 2,
        strokeOpacity: 0.5,
      }
    );
  };

  drawPolygon = () => {
    return this.mapInstance.addPolygon(
      [
        [114.085947, 22.547],
        [114.185947, 22.747],
        [114.285947, 22.847],
        [114.385947, 22.947],
      ],
      {
        strokeColor: "blue",
        strokeWeight: 2,
        strokeOpacity: 0.5,
      }
    );
  };

  drawLabel = () => {
    return this.mapInstance.addLabel({
      longitude: 114.085947,
      latitude: 22.547,
      content: `<div id="chart" style="width: 200px;height:200px;">chart</div>`,
      options: {
        offset: new window.BMapGL.Size(10, 20),
      },
      callback: () => {
        const myChart = echarts.init(document.getElementById("chart"));
        // 指定图表的配置项和数据
        var option = {
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

  handleRemoveMarkersClick = () => {
    if (this.markerHandle) {
      this.markerHandle.remove();
    }
  };

  handleRemoveLineClick = () => {
    if (this.lineHandle) {
      this.lineHandle.remove();
    }
  };

  handleRemovePolygonClick = () => {
    if (this.polygonHandle) {
      this.polygonHandle.remove();
    }
  };

  handleRemoveLabelsClick = () => {
    if (this.labelHandle) {
      this.labelHandle.remove();
    }
  };

  handleBackLevelClick = () => {
    this.mapInstance.backLevel();
  };

  getOption = () => {
    return {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      BMapGL: {
        // 百度地图中心经纬度
        center: [120.13066322374, 30.240018034923],
        // 百度地图缩放
        zoom: 14,
        // 是否开启拖拽缩放，可以只设置 'scale' 或者 'move'
        roam: true,
        // 百度地图的自定义样式，见 http://developer.baidu.com/map/jsdevelop-11.htm
        mapStyle: {},
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
        },
      ],
    };
  };

  render() {
    return (
      <div style={mapStyle}>
        <Map mapLoaded={this.mapLoaded} />
        <div style={{ position: "absolute", zIndex: 10, top: 0 }}>
          <button type="button" onClick={this.handleRemoveMarkersClick}>
            remove markers
          </button>
          <button type="button" onClick={this.handleRemoveLineClick}>
            remove line
          </button>
          <button type="button" onClick={this.handleRemovePolygonClick}>
            remove Polygon
          </button>
          <button type="button" onClick={this.handleRemoveLabelsClick}>
            remove labels
          </button>
          <button type="button" onClick={this.handleBackLevelClick}>
            back level
          </button>
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Example />
    </div>
  );
}

export default App;
