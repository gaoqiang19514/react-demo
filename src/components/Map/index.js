import React, { Component } from "react";

import { formatWktData, getLastItemInArray } from "../../utils";
import api from "../../api";

const mapStyle = {
  width: "100%",
  height: "100%",
};

const defaultProps = {
  zoom: 10.245,
  center: [114.085947, 22.547],
  styleId: "d76554efaf1ac42cd3a95dca0e8e7602",
};

function createMarker(point, options) {
  return new window.BMapGL.Marker(point, options);
}

/**
 * 创建Point实例
 * @param {Array} coordinate
 * @return {BMap.Point}
 */
function createPoint(coordinate) {
  return new window.BMapGL.Point(...coordinate);
}

function createPolygon(pointList) {
  return new window.BMapGL.Polygon(pointList);
}

function createLabel(content, options) {
  return new window.BMapGL.Label(content, options);
}

class Map extends Component {
  constructor(props) {
    super(props);

    this.map = null;
    this.initialized = false;
    this.currentAreaLineList = [];

    this.setRef = this.setRef.bind(this);
  }

  componentDidMount() {
    this.initialize();
  }

  /**
   * 获取地图引用
   * @return undefined
   */
  setRef(ref) {
    this.ref = ref;
  }

  /**
   * 初始化
   * @return undefined
   */
  initialize() {
    this.map = new window.BMapGL.Map(this.ref, { minZoom: 6 });
    this.map.enableScrollWheelZoom(true);
    this.map.disableDoubleClickZoom();
    this.map.centerAndZoom(
      new window.BMapGL.Point(this.props.center[0], this.props.center[1]),
      this.props.zoom
    );
    this.map.setMapStyleV2({
      styleId: this.props.styleId,
    });

    this.map.addEventListener("tilesloaded", () => {
      if (this.initialized) {
        return;
      }

      this.loadAreaBoundaryLine("4403");
      this.loadAreaLabel("4403");
      this.initEvents();
      this.loadInstitution(this.map);

      this.initialized = true;
      this.props.mapLoaded(this, this.map);
    });
  }

  loadInstitution = (map) => {
    var MAX = 4010;
    var markers = [];
    var pt = null;
    var i = 0;
    for (; i < MAX; i++) {
      pt = new window.BMapGL.Point(
        Math.random() * 40 + 85,
        Math.random() * 30 + 21
      );
      markers.push(new window.BMapGL.Marker(pt));
    }
    //最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
    var markerClusterer = new window.BMapLib.MarkerClusterer(map, {
      markers: markers,
    });
  };

  /**
   * 绘制深圳市各区标识
   * @return undefined
   */
  loadAreaBoundaryLine(deptCode) {
    api
      .getAreaData(deptCode)
      .then((res) => {
        const { childrenList } = res.data.data;

        if (!childrenList.length) {
          return;
        }

        this.currentAreaLineList.push(childrenList);

        this.drawAreaBoundaryLine(childrenList);
      })
      .catch(console.error);
  }

  drawAreaBoundaryLine(list) {
    let pointsList = [];

    this.clearAreaBoundaryLine();

    list.forEach((item) => {
      const data = formatWktData(item.wktPoly);

      data.forEach((item) => {
        const points = [];

        item.forEach((coordinate) => {
          const point = createPoint(coordinate);
          points.push(point);
        });

        pointsList = pointsList.concat(points);

        this.addPolyline(item);
      });
    });

    this.map.setViewport(pointsList);
  }

  clearAreaBoundaryLine = () => {};

  /**
   * 绘制深圳市各区标识
   * @return undefined
   */
  loadAreaLabel(deptCode) {
    api
      .getAreaData(deptCode)
      .then((res) => {
        const { childrenList } = res.data.data;

        if (!childrenList.length) {
          return;
        }

        this.drawAreaLabel(childrenList);
      })
      .catch(console.error);
  }

  drawAreaLabel(list) {
    this.cleanAreaLabel();

    const labels = list.map((item) => {
      return {
        coordinate: formatWktData(item.wktAreaCenter),
        content: item.name,
      };
    });

    // 这种调用方式 addLabels不支持
    this.addLabels(labels, {
      enableMassClear: false,
    });
  }

  cleanAreaLabel = () => {};

  /**
   * 绘制深圳市各区标识
   * @return undefined
   */
  initEvents() {
    this.map.addEventListener("dblclick", this.handleClick);
  }

  /**
   * 区域下钻
   * @return undefined
   */
  handleClick = (event) => {
    debugger;
    let target = null;

    getLastItemInArray(this.currentAreaLineList).forEach((item) => {
      const [coordinateList] = formatWktData(item.wktPoly);
      const points = coordinateList.map((coordinate) =>
        createPoint(coordinate)
      );

      if (
        window.BMapLib.GeoUtils.isPointInPolygon(
          event.latlng,
          createPolygon(points)
        )
      ) {
        target = item;
      }
    });

    if (target && target.code) {
      this.loadAreaBoundaryLine(target.code);
    }
  };

  /**
   * 绘制深圳市各区标识
   * @return undefined
   */
  backLevel = () => {
    const item = this.currentAreaLineList.pop();

    if (!this.currentAreaLineList.length) {
      this.currentAreaLineList.push(item);
      return;
    }

    this.drawAreaBoundaryLine(getLastItemInArray(this.currentAreaLineList));
  };

  /**
   * 绘制单个marker
   * @param {Array} coordinate
   * @param {Object} options
   * @return {Object}
   */
  addMarker(coordinate, options = {}) {
    const { map } = this;

    const marker = createMarker(createPoint(coordinate), options);

    map.addOverlay(marker);

    return {
      marker,
      remove() {
        map.removeOverlay(marker);
      },
    };
  }

  /**
   * 绘制一组marker
   * @param {Array} coordinateList
   * @param {Object} options
   * @return {Array}
   */
  addMarkers(coordinateList, options) {
    const markerList = [];

    coordinateList.forEach((coordinate) => {
      markerList.push(this.addMarker(coordinate, options));
    });

    return markerList;
  }

  /**
   * 绘制单根线条
   * @param {Array} coordinateList [[124.12, 24,12], [123.12, 24.22]]
   * @param {Object} options
   * @return {Object}
   */
  addPolyline(coordinateList, options = {}) {
    const { map } = this;

    const pointList = coordinateList.map((coordinate) =>
      createPoint(coordinate)
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

  /**
   * 绘制一组线条
   * @param {Array} coordinateList [[[124.12, 24,12], [123.12, 24.22]], [[124.12, 24,12], [123.12, 24.22]]]
   * @param {Object} options
   * @return {Array}
   */
  addPolylines(coordinateList, options) {
    const lineList = [];

    coordinateList.forEach((coordinate) => {
      lineList.push(this.addPolyline(coordinate, options));
    });

    return lineList;
  }

  /**
   * 绘制单个多边形
   * @param {Array} coordinateList [[124.12, 24,12], [123.12, 24.22]]
   * @param {Object} options
   * @return {Object}
   */
  addPolygon(coordinateList, options) {
    const { map } = this;

    const pointList = coordinateList.map((coordinate) =>
      createMarker(createPoint(coordinate))
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

  /**
   * 绘制一组多边形
   * @param {Array} coordinateList [[[124.12, 24,12], [123.12, 24.22]], [[124.12, 24,12], [123.12, 24.22]]]
   * @param {Object} options
   * @return {Array}
   */
  addPolygons(coordinateList, options) {
    const polygonList = [];

    coordinateList.forEach((coordinate) => {
      polygonList.push(this.addPolygon(coordinate, options));
    });

    return polygonList;
  }

  /**
   * 绘制单个label
   * @param {Object} params
   * @param {Object} globalOptions
   * @return {Object}
   */
  addLabel(
    { coordinate, content, options, callback = () => {} },
    globalOptions
  ) {
    const { map } = this;

    const point = createPoint(coordinate);
    const label = createLabel(content, {
      position: point,
      ...(options || globalOptions),
    });

    map.addOverlay(label);
    callback(label);

    return {
      label,
      remove() {
        map.removeOverlay(label);
      },
    };
  }

  /**
   * 绘制一组label
   * @param {Array} labels
   * @param {Object} options
   * @return {Array}
   */
  addLabels(labels, options = {}) {
    const labelList = [];

    labels.forEach((item) => {
      labelList.push(this.addLabel(item, options));
    });

    return labelList;
  }

  /**
   * 绘制深圳市各区标识
   * @return undefined
   */
  render() {
    return <div style={mapStyle} ref={this.setRef}></div>;
  }
}

Map.defaultProps = defaultProps;

export default Map;
