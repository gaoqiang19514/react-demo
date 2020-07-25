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
      this.props.mapLoaded(this.map);
    });
  }

  addMarkers(coordinateList) {
    const { map } = this;

    const pointList = coordinateList.map(
      ([longitude, latitude]) => new window.BMapGL.Point(longitude, latitude)
    );

    const markerList = pointList.map(
      (point) => new window.BMapGL.Marker(point)
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

  render() {
    return <div style={mapStyle} ref={this.setRef}></div>;
  }
}

Map.defaultProps = defaultProps;

export default Map;
