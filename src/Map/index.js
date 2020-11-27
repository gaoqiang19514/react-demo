import React, { Component } from "react";
import PropTypes from "prop-types";

export const createLngLat = (longitude, latitude) =>
  new window.AMap.LngLat(longitude, latitude);

export const createMarker = (longitude, latitude) =>
  new window.AMap.Marker({
    position: [longitude, latitude],
  });

const propTypes = {
  prop: PropTypes.string,
};

class Map extends Component {
  constructor(props) {
    super(props);

    this.cluster = null;
    this.isLoaded = false;
  }

  componentDidMount() {
    this.setup();
  }

  setup() {
    this.map = new window.AMap.Map(this.ref, {
      zoom: 10,
      mapStyle: "amap://styles/589c48e75fa983f0fe682837ff5077f1",
    });
    this.map.setStatus({ doubleClickZoom: false });
    this.map.on("complete", () => {
      if (this.isLoaded) {
        return;
      }

      this.init();
      this.isLoaded = true;
    });
  }

  init() {
    const points = [
      { lnglat: ["116.408032", "39.909729"], id: 1, name: "北京" },
      { lnglat: ["121.461743", "31.231584"], id: 2, name: "上海" },
      { lnglat: ["113.265942", "23.08983"], id: 3, name: "广州" },
      { lnglat: ["104.059399", "30.562253"], id: 4, name: "成都" },
    ];

    if (this.cluster) {
      this.cluster.setMap(null);
    }

    const renderClusterMarker = (context) => {
      const div = document.createElement("div");
      div.style.background = "red";
      div.style.width = "20px";
      div.style.height = "24px";

      div.onclick = () => {
        console.log("event", context);
      };

      context.marker.setOffset(new window.AMap.Pixel(-20 / 2, -24 / 2));
      context.marker.setContent(div);
    };

    const renderMarker = (context) => {
      const div = document.createElement("div");
      div.style.background = "blue";
      div.style.width = "20px";
      div.style.height = "24px";

      div.onclick = () => {
        console.log("event", context);
      };

      context.marker.setOffset(new window.AMap.Pixel(-20 / 2, -24 / 2));
      context.marker.setContent(div);
    };

    this.cluster = new window.AMap.MarkerCluster(this.map, points, {
      gridSize: 60,
      renderClusterMarker,
      renderMarker,
    });
  }

  render() {
    return (
      <div
        ref={(ref) => {
          this.ref = ref;
        }}
        style={{ height: "100%" }}
      ></div>
    );
  }
}

Map.propTypes = propTypes;

export default Map;
