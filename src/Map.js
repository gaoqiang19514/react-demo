import React, { Component } from "react";
import echarts from "echarts";
import axios from "axios";

import {
  formatWktData,
  getFirstItemInArray,
  getLastItemInArray,
} from "./utils";

const mapStyle = {
  width: "100%",
  height: "100%",
};

const defaultProps = {
  zoom: 10.245,
  center: [114.085947, 22.547],
  styleId: "d76554efaf1ac42cd3a95dca0e8e7602",
};

function createPoint(longitude, latitude) {
  return new window.BMapGL.Point(longitude, latitude);
}

function createPolygon(pointList) {
  return new window.BMapGL.Polygon(pointList);
}

class Map extends Component {
  constructor(props) {
    super(props);

    this.setRef = this.setRef.bind(this);
    this.map = null;
    this.isLoaded = false;
    this.currentAreaList = [];
  }

  componentDidMount() {
    this.initialize();
  }

  setRef(ref) {
    this.ref = ref;
  }

  initialize() {
    this.map = new window.BMapGL.Map(this.ref);
    const point = new window.BMapGL.Point(
      this.props.center[0],
      this.props.center[1]
    );

    this.map.enableScrollWheelZoom(true);
    this.map.disableDoubleClickZoom();

    this.map.centerAndZoom(point, this.props.zoom);
    this.map.setMapStyleV2({
      styleId: this.props.styleId,
    });

    // this.drawCityBoundaryLine();

    this.map.addEventListener("tilesloaded", () => {
      if (this.isLoaded) {
        return;
      }

      this.props.mapLoaded(this);
      this.initEvents();
      this.loadAreaBoundaryLine("4403");
      this.isLoaded = true;
    });

    // this.map.setTrafficOn();
  }

  initEvents() {
    this.map.addEventListener("dblclick", this.handleClick);
  }

  loadAreaBoundaryLine(deptCode) {
    axios
      .post("/zfzh-service/webapi/resourceMap/areaChildrenByDeptCode", {
        coordinateType: "gcj02",
        deptCode,
      })
      .then((res) => {
        const { childrenList } = res.data.data;

        if (!childrenList.length) {
          return;
        }

        this.map.clearOverlays();

        this.currentAreaList.push(childrenList);

        this.drawAreaBoundaryLine(childrenList);
      })
      .catch(console.error);
  }

  drawAreaBoundaryLine(list) {
    let pointArray = [];

    list.forEach((item) => {
      const data = formatWktData(item.wktPoly);

      data.forEach((item) => {
        const arr = [];

        item.forEach((_item) => {
          const point = createPoint(_item[0], _item[1]);
          arr.push(point);
        });

        pointArray = pointArray.concat(arr);

        this.drawPolygon(arr);
      });
    });

    this.map.setViewport(pointArray); //调整视野
  }

  drawPolygon(arr) {
    const ply = new window.BMapGL.Polygon(arr, {
      strokeWeight: 2,
      fillOpacity: 0,
      strokeColor: "#3E9BEF",
    });

    this.map.addOverlay(ply);
  }

  backLevel = () => {
    const item = this.currentAreaList.pop();

    if (!this.currentAreaList.length) {
      this.currentAreaList.push(item);
      return;
    }

    this.drawAreaBoundaryLine(getLastItemInArray(this.currentAreaList));
  };

  handleClick = ({ latlng }) => {
    // 查找该点属于面列表中的哪一个
    let target = null;
    getLastItemInArray(this.currentAreaList).forEach((item) => {
      let [pointList] = formatWktData(item.wktPoly);

      pointList = pointList.map((_item) => createPoint(_item[0], _item[1]));

      if (
        window.BMapLib.GeoUtils.isPointInPolygon(
          createPoint(latlng.lng, latlng.lat),
          createPolygon(pointList)
        )
      ) {
        target = item;
      }
    });

    // 从上面的结果中得到code
    if (target?.code) {
      this.loadAreaBoundaryLine(target.code);
    }
  };

  addMarkers(coordinateList, options = {}) {
    const { map } = this;

    const pointList = coordinateList.map(
      ([longitude, latitude]) => new window.BMapGL.Point(longitude, latitude)
    );

    const markerList = pointList.map(
      (point) => new window.BMapGL.Marker(point, options)
    );

    markerList.forEach((marker) => {
      map.addOverlay(marker);
    });

    return {
      markerList,
      remove() {
        markerList.forEach((marker) => map.removeOverlay(marker));
      },
    };
  }

  addPolyline(coordinateList, options = {}) {
    const { map } = this;

    const pointList = coordinateList.map(
      ([longitude, latitude]) => new window.BMapGL.Point(longitude, latitude)
    );

    const polyline = new window.BMapGL.Polyline(pointList, options);

    map.addOverlay(polyline);

    return {
      polyline,
      remove() {
        map.removeOverlay(polyline);
      },
    };
  }

  adPolygon(coordinateList, options) {
    const { map } = this;

    const pointList = coordinateList.map(
      ([longitude, latitude]) => new window.BMapGL.Point(longitude, latitude)
    );

    const polygon = new window.BMapGL.Polygon(pointList, options);
    map.addOverlay(polygon);

    return {
      polygon,
      remove() {
        map.removeOverlay(polygon);
      },
    };
  }

  addLabel(longitude, latitude, content, options) {
    const { map } = this;

    const point = new window.BMapGL.Point(longitude, latitude);
    const label = new window.BMapGL.Label(content, {
      position: point,
      ...options,
    });

    map.addOverlay(label);

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

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    setTimeout(() => {
      myChart.setOption({
        ...option,
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 120],
          },
        ],
      });
    }, 3000);

    return {
      remove() {
        map.removeOverlay(label);
      },
    };
  }

  addLabels(labelList) {
    const labelHandleList = labelList.map((item) => {
      return this.addLabel(item.longitude, item.latitude, item.content, {
        offset: new window.BMapGL.Size(10, 20),
      });
    });

    return {
      labelHandleList,
      remove() {
        labelHandleList.forEach((label) => label.remove());
      },
    };
  }

  render() {
    return <div style={mapStyle} ref={this.setRef}></div>;
  }
}

Map.defaultProps = defaultProps;

export default Map;
