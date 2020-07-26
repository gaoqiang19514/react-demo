import React, { Component } from "react";

const mapStyle = {
  width: "100%",
  height: "100%",
};

const defaultProps = {
  zoom: 10.245,
  center: [114.085947, 22.547],
  styleId: "d76554efaf1ac42cd3a95dca0e8e7602",
};

class Map extends Component {
  constructor(props) {
    super(props);

    this.setRef = this.setRef.bind(this);
    this.map = null;
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

    this.map.centerAndZoom(point, this.props.zoom);
    this.map.setMapStyleV2({
      styleId: this.props.styleId,
    });

    this.map.addEventListener("tilesloaded", () => {
      this.props.mapLoaded(this);
    });

    this.map.setTrafficOn();
  }

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
