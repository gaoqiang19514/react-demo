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

function createPoint(longitude, latitude) {
  return new window.BMap.Point(longitude, latitude);
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

  setRef(ref) {
    this.ref = ref;
  }

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

  drawPolygon(arr) {
    const ply = new window.BMap.Polygon(arr, {
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

  initEvents() {
    this.map.addEventListener("dblclick", this.handleClick);
  }

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

  addMarker(coordinate, options = {}) {
    const { map } = this;

    const point = createPoint(coordinate[0], coordinate[1]);
    const marker = createMarker(point, options);

    map.addOverlay(marker);

    return {
      marker,
      remove() {
        map.removeOverlay(marker);
      },
    };
  }

  addPolyline(pointList, options = {}) {
    const { map } = this;

    const polyline = new window.BMap.Polyline(pointList, options);

    map.addOverlay(polyline);

    return {
      polyline,
      remove() {
        map.removeOverlay(polyline);
      },
    };
  }

  addPolygon(coordinateList, options) {
    const { map } = this;

    const pointList = coordinateList.map((item) =>
      createMarker(createPoint(item[0], item[1]))
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

  addLabel({ longitude, latitude, content, options, callback }) {
    const { map } = this;

    const point = createPoint(longitude, latitude);
    const label = createLabel(content, {
      position: point,
      ...options,
    });

    map.addOverlay(label);
    callback && callback(label);

    return {
      label,
      remove() {
        map.removeOverlay(label);
      },
    };
  }

  searchText = (text) => {
    var local = new window.BMap.LocalSearch("深圳市", {
      renderOptions: { map: this.map },
    });
    local.search(text);
  };

  render() {
    return <div style={mapStyle} ref={this.setRef}></div>;
  }
}

Map.defaultProps = defaultProps;

export default Map;
