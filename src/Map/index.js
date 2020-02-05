import React, { Component } from "react";

import airlineJson from "./airline.json";

const mapStyle = {
  width: "100%",
  height: "100%"
};

function getRandomColor() {
  var r = Math.round(0.26146 * 255);
  var g = Math.round(0.24238 * 255);
  var b = Math.round(0.8984 * 255);

  return "rgb(" + r + "," + g + "," + b + ")";
}

class Map extends Component {
  componentDidMount() {
    this.setupMap();
    this.map = this.createMap(this.props.options);

    this.map.repaint = true;

    if (this.map) {
      this.map.on("load", this.load.bind(this));
    }
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }

  setupMap() {
    /**
     * 全局参数设置
     */
    window.minemap.domainUrl = "//minedata.cn";
    window.minemap.dataDomainUrl = "//datahive.minedata.cn";
    window.minemap.spriteUrl = "//minedata.cn/minemapapi/v2.0.0/sprite/sprite";
    window.minemap.serviceUrl = "//minedata.cn/service/";

    /**
     * token、solution设置
     */
    window.minemap.accessToken = "25cc55a69ea7422182d00d6b7c0ffa93";
    window.minemap.solution = 2365;
  }

  createMap(options = {}) {
    /**
     * 初始化地图实例
     */
    return new window.minemap.Map({
      container: this.mapRef,
      style: "//minedata.cn/service/solu/style/id/2374",
      center: [103.602093, 36.10469],
      zoom: 4,
      pitch: 60,
      maxZoom: 17,
      minZoom: 3,
      ...options
    });
  }

  addSources(map, jsonData) {
    var endData = [
      { name: "沈阳", lngLat: [123.377483, 41.67505] },
      { name: "上海", lngLat: [121.53178, 31.205854] },
      { name: "天津", lngLat: [117.210061, 39.135884] },
      { name: "武汉", lngLat: [114.236858, 30.489018] },
      { name: "成都", lngLat: [103.865765, 30.678178] },
      { name: "昆明", lngLat: [102.811077, 24.889034] },
      { name: "西安", lngLat: [108.743694, 34.273202] },
      { name: "石家庄", lngLat: [114.324749, 37.963781] },
      { name: "长沙", lngLat: [112.874554, 28.46155] },
      { name: "拉萨", lngLat: [91.077679, 29.575947] },
      { name: "福州", lngLat: [119.158733, 25.921101] },
      { name: "香港", lngLat: [114.280804, 22.312075] },
      { name: "澳门", lngLat: [113.54909, 22.198951] },
      { name: "广州", lngLat: [113.258924, 23.151776] },
      { name: "海口", lngLat: [110.19389, 20.017336] },
      { name: "兰州", lngLat: [103.602093, 36.10469] },
      { name: "贵阳", lngLat: [106.702359, 26.556565] },
      { name: "南宁", lngLat: [108.314838, 22.826993] },
      { name: "西宁", lngLat: [101.814342, 36.620174] },
      { name: "哈尔滨", lngLat: [126.630806, 45.760082] },
      { name: "长春", lngLat: [125.324537, 43.911417] },
      { name: "杭州", lngLat: [120.213064, 30.291119] },
      { name: "合肥", lngLat: [117.316933, 31.88513] },
      { name: "南昌", lngLat: [115.919645, 28.661914] },
      { name: "南京", lngLat: [118.797452, 32.087274] },
      { name: "济南", lngLat: [116.991291, 36.670906] },
      { name: "银川", lngLat: [106.17397, 38.491916] },
      { name: "呼和浩特", lngLat: [111.66551, 40.831319] },
      { name: "太原", lngLat: [112.610223, 37.791079] },
      { name: "台北", lngLat: [121.515392, 24.995317] },
      { name: "乌鲁木齐", lngLat: [87.69389, 43.709663] }
    ];

    var features = [];
    for (var i = 0; i < endData.length; ++i) {
      var d = endData[i];
      features.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: d.lngLat
        },
        properties: {
          color: getRandomColor()
        }
      });
    }

    //  添加航线节点数据源
    map.addSource("airportSource", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: features
      }
    });
    //  添加航线数据源
    map.addSource("airLineSource", {
      type: "geojson",
      data: jsonData
    });
  }

  addLayers(map) {
    // 添加航线节点图层
    map.addLayer({
      id: "airportLayer",
      type: "circle",
      source: "airportSource",
      paint: {
        "circle-radius": 5,
        "circle-color": {
          type: "identity",
          property: "color"
        }
      },
      minzoom: 3,
      maxzoom: 8
    });

    //  添加航线静态图层
    map.addLayer({
      id: "airlineLayerStatic",
      type: "airline",
      source: "airLineSource",
      paint: {
        "airline-seg-count": 400,
        "airline-seg-group": 10,
        "airline-speed": 200,
        "airline-type": "none",
        "airline-color": {
          property: "count",
          stops: [
            [0, "#C8F9F9"],
            [200, "#00F8FF"],
            [400, "#00FF00"],
            [600, "#FFF800"],
            [800, "#FF0000"]
          ]
        },
        "airline-width": 1,
        "airline-opacity": 0.5
      },
      minzoom: 3,
      maxzoom: 8
    });

    //  添加航线运动粒子图层
    map.addLayer({
      id: "airlineLayerMove",
      type: "airline",
      source: "airLineSource",
      paint: {
        "airline-seg-count": 500,
        "airline-seg-group": 10,
        "airline-speed": 200,
        "airline-type": "real-time",
        "airline-color": {
          property: "count",
          stops: [
            [0, "#C8F9F9"],
            [200, "#00F8FF"],
            [400, "#00FF00"],
            [600, "#FFF800"],
            [800, "#FF0000"]
          ]
        },
        "airline-width": 3,
        "airline-opacity": 0.5
      },
      minzoom: 3,
      maxzoom: 8
    });
  }

  load() {
    // 增加自定义数据源、自定义图层

    // airline图层，用来描绘航线效果，airline图层支持vector和geojson两种类型的数据源，所需的数据内容为航线几何；
    const jsonData = window.minemap.Template.util.startAndEndPointArrayToAirlineGeoJson(
      airlineJson,
      1000,
      4000,
      5000
    );

    this.addSources(this.map, jsonData);
    this.addLayers(this.map);
  }

  render() {
    return <div style={mapStyle} ref={ref => (this.mapRef = ref)}></div>;
  }
}

export default Map;
