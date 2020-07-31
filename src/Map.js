import React, { Component } from "react";
import axios from "axios";

import { formatWktData, getLastItemInArray } from "./utils";

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

function createPoint(longitude, latitude) {
  return new window.BMapGL.Point(longitude, latitude);
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

    this.map.addEventListener("tilesloaded", () => {
      if (this.isLoaded) {
        return;
      }

      this.props.mapLoaded(this);
      this.initEvents();
      this.loadAreaBoundaryLine("4403");

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

        this.drawPolygon(arr);
      });
    });

    this.map.setViewport(pointArray);
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

  initEvents() {
    this.map.addEventListener("dblclick", this.handleClick);
  }

  handleClick = ({ latlng }) => {
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

  addPolyline(coordinateList, options = {}) {
    const { map } = this;

    const pointList = coordinateList.map((item) =>
      createPoint(item[0], item[1])
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

  addPolygon(coordinateList, options) {
    const { map } = this;

    const pointList = coordinateList.map((item) =>
      createMarker(createPoint(item[0], item[1]))
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

  addLabel(longitude, latitude, content, options, callback) {
    const { map } = this;

    const point = createPoint(longitude, latitude);
    const label = createLabel(content, {
      position: point,
      ...options,
    });

    console.log("label", label);

    map.addOverlay(label);
    callback && callback();

    return {
      label,
      remove() {
        map.removeOverlay(label);
      },
    };
  }

  render() {
    return <div style={mapStyle} ref={this.setRef}></div>;
  }
}

Map.defaultProps = defaultProps;

export default Map;
