import React from "react";

import "./App.css";
import reactIcon from "./react.svg";
import vueIcon from "./vue.svg";
import api from "./api";
import Map from "./components/Map";
import Toggle from "./components/Toggle";

// 需要解决的问题
// 1. 竞态条件
// 2. 遍历请求
// 3. 响应回来时，勾选已经取消

function createMapIcon(icon, width = 100, height = 100) {
  return new window.BMapGL.Icon(icon, new window.BMapGL.Size(width, height));
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewList: [
        { key: "react", checked: true },
        { key: "vue", checked: true },
      ],
    };
  }

  mapInitCallback = (map, mapInstance) => {
    this.map = map;
    this.mapInstance = mapInstance;

    this.init();
  };

  init = () => {
    const { viewList } = this.state;

    viewList.forEach((item) => {
      if (item.checked) {
        this.loadDataByKey(item.key);
      } else {
        this.clearOverlayByKey(item.key);
      }
    });
  };

  loadDataByKey = (key) => {
    api
      .getData({ key })
      .then((res) => {
        // 这里还要考虑结果为空的情况
        this.draw(res.data, key);
      })
      .catch(console.error);
  };

  // 根据key采用data绘制覆盖物
  draw = (data, key) => {
    if (key === "react") {
      this.clearOverlayByKey("react");
      this.reactRefList = this.mapInstance.drawMarkers(data, {
        icon: createMapIcon(reactIcon),
      });
    }

    if (key === "vue") {
      this.clearOverlayByKey("vue");
      this.vueRefList = this.mapInstance.drawMarkers(data, {
        icon: createMapIcon(vueIcon),
      });
    }
  };

  clearOverlayByKey = (key) => {
    if (key === "react" && this.reactRefList) {
      this.reactRefList.forEach((item) => item.remove());
    }

    if (key === "vue" && this.vueRefList) {
      this.vueRefList.forEach((item) => item.remove());
    }
  };

  handleChange = (key) => {
    const { viewList } = this.state;

    const nextList = viewList.map((item) => {
      if (item.key === key) {
        return {
          ...item,
          checked: !item.checked,
        };
      }
      return item;
    });

    this.setState({ viewList: nextList }, () => {
      // 这样调用会导致没有取消勾选的项目重新发起请求
      this.init();
    });
  };

  render() {
    const { viewList } = this.state;

    return (
      <div className="App">
        <div className="top">
          <Toggle viewList={viewList} onChange={this.handleChange} />
        </div>
        <div style={{ width: "100%", height: "100%" }}>
          <Map initCallback={this.mapInitCallback} />
        </div>
      </div>
    );
  }
}

export default App;
