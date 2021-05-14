import React, { useEffect } from 'react';
import logo from './logo.svg';

import './App.css';

const key = [
  '313cd4b28ed520472e8b43de00b2de56',
  '83b36ded6b43b9bc81fbf617c40b83b5',
  '0ebd57f93a114d146a954da4ecae1e67',
  '6c99c7793f41fccc4bd595b03711913e',
  '56b81006f361f6406d0e940d2f89a39c',
];

// 获取自定义底图切换
function getImageryProviderArr() {
  const providerViewModels = [];

  // EPSG3857 web墨卡托
  const imgModel = new window.Cesium.ProviderViewModel({
    name: '高德影像',
    tooltip: '高德影像地图服务',
    iconUrl: logo,
    creationFunction: () => {
      return [
        window.vusd.layer.createImageryProvider({
          type: 'www_gaode',
          layer: 'img_d',
        }),
        window.vusd.layer.createImageryProvider({
          type: 'www_gaode',
          layer: 'img_z',
        }),
      ];
    },
  });
  providerViewModels.push(imgModel);

  return providerViewModels;
}

function getTerrainProviderViewModelsArr() {
  return [
    new window.Cesium.ProviderViewModel({
      name: '无地形',
      tooltip: 'WGS84标准球体',
      iconUrl: logo,
      creationFunction: () => {
        return new window.Cesium.EllipsoidTerrainProvider({
          ellipsoid: window.Cesium.Ellipsoid.WGS84,
        });
      },
    }),
  ];
}

function App() {
  useEffect(() => {
    const viewer = new window.Cesium.Viewer('cesiumContainer', {
      animation: false, // 是否创建动画小器件，左下角仪表
      timeline: false, // 是否显示时间线控件
      fullscreenButton: false, // 右下角全屏按钮
      vrButton: false, // 右下角vr虚拟现实按钮

      geocoder: false, // 是否显示地名查找控件
      sceneModePicker: true, // 是否显示投影方式控件
      homeButton: true, // 回到默认视域按钮
      navigationHelpButton: false, // 是否显示帮助信息控件

      baseLayerPicker: true, // 是否显示图层选择控件
      imageryProviderViewModels: getImageryProviderArr(), // 地图底图
      terrainProviderViewModels: getTerrainProviderViewModelsArr(),
    });

    // Entity方式
    const entity = viewer.entities.add({
      name: '点',
      position: window.Cesium.Cartesian3.fromDegrees(116.308659, 30.914005),
      point: {
        color: new window.Cesium.Color.fromCssColorString('yellow'),
        pixelSize: 10,
        outlineColor: new window.Cesium.Color.fromCssColorString('#ffffff'),
        outlineWidth: 2,
      },
    });
  }, []);
  return (
    <div className="App">
      <div id="cesiumContainer" className="vusd-container" />
    </div>
  );
}

export default App;
