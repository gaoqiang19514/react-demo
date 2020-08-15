import React, { Component } from "react";

const style = {
  width: "100%",
  height: "100%",
};

class Map extends Component {
  constructor(props) {
    super(props);

    this.isLoaded = false;
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    const map = new window.BMapGL.Map(this.ref);
    map.enableScrollWheelZoom(true);
    map.centerAndZoom(new window.BMapGL.Point(114.116564, 22.562367), 15);

    this.map = map;

    map.addEventListener("tilesloaded", () => {
      if (this.isLoaded) {
        return;
      }

      this.isLoaded = true;
      this.props.initCallback(map, this);
    });
  };

  drawMarkers = (coordinateList, options) => {
    const pointList = coordinateList.map(
      (coordinate) => new window.BMapGL.Point(...coordinate)
    );
    const markerList = pointList.map(
      (point) => new window.BMapGL.Marker(point, options)
    );

    return markerList.map((marker) => {
      this.map.addOverlay(marker);

      return {
        remove: () => this.map.removeOverlay(marker),
      };
    });
  };

  render() {
    return (
      <div
        style={style}
        ref={(ref) => {
          this.ref = ref;
        }}
      ></div>
    );
  }
}

export default Map;
