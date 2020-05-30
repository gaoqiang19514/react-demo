import React, { Component } from "react";

const mapStyle = {
  width: "100%",
  height: "100%",
};

const defaultProps = {
  options: {
    mapInitialized: () => {},
  },
};

class Map extends Component {
  componentDidMount() {
    this.setupMap();
    this.map = this.createMap(this.props.options);

    this.map.repaint = true;

    if (this.map) {
      this.map.on("load", this.init.bind(this));
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
      zoom: 13,
      pitch: 0,
      maxZoom: 17,
      minZoom: 3,
      ...options,
    });
  }

  init() {
    const { options } = this.props;
    const { mapInitialized } = options;

    mapInitialized(this.map);
  }

  render() {
    return <div style={mapStyle} ref={(ref) => (this.mapRef = ref)}></div>;
  }
}

Map.defaultProps = defaultProps;

export default Map;
