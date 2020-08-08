import React, { Component } from "react";
import axios from "axios";

import { formatWktData, getLastItemInArray } from "../utils";
import api from "../api";

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
  return new window.BMap.Marker(point, options);
}

function createPoint(coordinate) {
  return new window.BMap.Point(...coordinate);
}

function createPolygon(pointList) {
  return new window.BMap.Polygon(pointList);
}

function createLabel(content, options) {
  return new window.BMap.Label(content, options);
}

class Map extends Component {
  constructor(props) {
    super(props);

    this.map = null;
    this.isLoaded = false;
    this.currentAreaList = [];
    this.setRef = this.setRef.bind(this);
  }

  componentDidMount() {
    this.initialize();
  }

  /**
   * 绘制深圳市各区标识
   * @return undefined
   */
  setRef(ref) {
    this.ref = ref;
  }

  /**
   * 绘制深圳市各区标识
   * @return undefined
   */
  initialize() {
    this.map = new window.BMap.Map(this.ref);
    const point = new window.BMap.Point(
      this.props.center[0],
      this.props.center[1]
    );

    this.map.enableScrollWheelZoom(true);
    this.map.disableDoubleClickZoom();

    this.map.centerAndZoom(point, this.props.zoom);
    this.map.setMapStyleV2({
      styleId: this.props.styleId,
    });

    this.map.addEventListener("tilesloaded", () => {
      if (this.isLoaded) {
        return;
      }

      this.props.mapLoaded(this);
      this.initEvents();
      this.loadAreaBoundaryLine("4403");
      this.drawAreaLabel();

      this.isLoaded = true;
    });
  }

  /**
   * 绘制深圳市各区边界线
   * @return undefined
   */
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

        this.currentAreaList.push(childrenList);

        this.drawAreaBoundaryLine(childrenList);
      })
      .catch(console.error);
  }

  /**
   * 绘制深圳市各区标识
   * @return undefined
   */
  drawAreaBoundaryLine(list) {
    let pointArray = [];

    this.map.clearOverlays();

    list.forEach((item) => {
      const data = formatWktData(item.wktPoly);

      data.forEach((item) => {
        const arr = [];

        item.forEach((_item) => {
          const point = createPoint(_item[0], _item[1]);
          arr.push(point);
        });

        pointArray = pointArray.concat(arr);

        this.addPolyline(arr);
      });
    });

    this.map.setViewport(pointArray);
  }

  /**
   * 绘制深圳市各区标识
   * @return undefined
   */
  drawAreaLabel = () => {
    api
      .getAreaData("4403")
      .then((res) => {
        const { childrenList } = res.data.data;

        if (!childrenList.length) {
          return;
        }

        childrenList.forEach((item) => {
          const coordinate = formatWktData(item.wktAreaCenter);
          this.addMarker(coordinate, {
            enableMassClear: false,
          });
        });
      })
      .catch(console.error);
  };

  /**
   * 绘制深圳市各区标识
   * @return undefined
   */
  backLevel = () => {
    const item = this.currentAreaList.pop();

    if (!this.currentAreaList.length) {
      this.currentAreaList.push(item);
      return;
    }

    this.drawAreaBoundaryLine(getLastItemInArray(this.currentAreaList));
  };

  /**
   * 绘制深圳市各区标识
   * @return undefined
   */
  initEvents() {
    this.map.addEventListener("dblclick", this.handleClick);
  }

  /**
   * 绘制深圳市各区标识
   * @return undefined
   */
  handleClick = ({ point }) => {
    let target = null;

    getLastItemInArray(this.currentAreaList).forEach((item) => {
      let [pointList] = formatWktData(item.wktPoly);
      pointList = pointList.map((_item) => createPoint(_item[0], _item[1]));

      if (
        window.BMapLib.GeoUtils.isPointInPolygon(
          point,
          createPolygon(pointList)
        )
      ) {
        target = item;
      }
    });

    if (target?.code) {
      this.loadAreaBoundaryLine(target.code);
    }
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

    const polyline = new window.BMap.Polyline(pointList, options);

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

    const polygon = new window.BMap.Polygon(pointList, options);

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
    { longitude, latitude, content, options, callback = () => {} },
    globalOptions
  ) {
    const { map } = this;

    const point = createPoint(longitude, latitude);
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
  addLabels(labels, options) {
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
  searchText = (text) => {
    var local = new window.BMap.LocalSearch("深圳市", {
      renderOptions: { map: this.map },
    });
    local.search(text);
  };

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
