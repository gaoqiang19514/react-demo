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

function App() {
  let mapRef = React.useRef();
  let mapInstanceRef = React.useRef();
  let reactRefList = React.useRef();
  let vueRefList = React.useRef();

  const [viewList, setViewList] = React.useState([
    { key: "react", checked: true },
    { key: "vue", checked: true },
  ]);

  const mapInitCallback = (map, mapInstance) => {
    mapRef.current = map;
    mapInstanceRef.current = mapInstance;

    init();
  };

  const init = () => {
    viewList.forEach((item) => {
      if (item.checked) {
        loadDataByKey(item.key);
      } else {
        clearOverlayByKey(item.key);
      }
    });
  };

  const loadDataByKey = (key) => {
    api
      .getData({ key })
      .then((res) => {
        if (isHidden(key)) {
          return;
        }
        // 这里还要考虑结果为空的情况
        draw(res.data, key);
      })
      .catch(console.error);
  };

  const draw = (data, key) => {
    if (key === "react") {
      clearReact();
      reactRefList.current = mapInstanceRef.current.drawMarkers(data, {
        icon: createMapIcon(reactIcon),
      });
    }

    if (key === "vue") {
      clearVue();
      vueRefList.current = mapInstanceRef.current.drawMarkers(data, {
        icon: createMapIcon(vueIcon),
      });
    }
  };

  const clearReact = () => {
    if (reactRefList.current) {
      reactRefList.current.forEach((item) => item.remove());
    }
  };

  const clearVue = () => {
    if (vueRefList.current) {
      vueRefList.current.forEach((item) => item.remove());
    }
  };

  const clearOverlayByKey = (key) => {
    if (key === "react") {
      clearReact();
    }
    if (key === "vue") {
      clearVue();
    }
  };

  const handleChange = (key, checked) => {
    const nextList = viewList.map((item) => {
      if (item.key === key) {
        return {
          ...item,
          checked: !item.checked,
        };
      }
      return item;
    });

    setViewList(nextList);
    changeItem(key, checked);
  };

  const changeItem = (key, checked) => {
    if (!checked) {
      loadDataByKey(key);
    } else {
      clearOverlayByKey(key);
    }
  };

  const isHidden = (key) => {
    const matchItem = viewList.find((item) => item.key === key);

    if (matchItem) {
      return !matchItem.checked;
    }

    return true;
  };

  return (
    <div className="App">
      <div className="top">
        <Toggle viewList={viewList} onChange={handleChange} />
      </div>
      <div style={{ width: "100%", height: "100%" }}>
        <Map initCallback={mapInitCallback} />
      </div>
    </div>
  );
}

export default App;
