import React, { useEffect } from 'react';

import './App.css';

function createPosition(lng, lat, z = 0) {
  return window.Cesium.Cartesian3.fromDegrees(lng, lat, z);
}

function App() {
  useEffect(() => {
    const defaultSetting = {
      // 动画控件
      animation: false,
      // 时间轴控件
      timeline: false,
      // 是否显示全屏按钮
      fullscreenButton: false,
      // 底图切换
      baseLayerPicker: false,
      // 首页跳转控件
      homeButton: false,
      // 2D和3D切换控件
      sceneModePicker: false,
      sceneMode: window.Cesium.SceneMode.SCENE2D,
      // 地理位置搜索控件
      geocoder: false,
      // 帮助提示控件
      navigationHelpButton: false,
    };

    // 创建底图·
    const imageryProvider = window.vusd.layer.createImageryProvider({
      type: 'www_gaode',
      layer: 'vec',
    });

    // 构造地球
    const viewer = new window.Cesium.Viewer('cesiumContainer', {
      ...defaultSetting,
      imageryProvider,
    });

    // 定位中心点和高度
    viewer.camera.setView({
      destination: createPosition(114.113702, 22.6208, 100000),
    });

    // 添加图片点位
    const entity = viewer.entities.add({
      name: '标点',
      position: Cesium.Cartesian3.fromDegrees(114.113702, 22.6208),
      billboard: {
        image: './acting.png',
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        scale: 1,
      },
    });

    // 添加文字点位
    viewer.entities.add({
      position: createPosition(114.113702, 22.6208),
      label: {
        text: '<div>123</div>',
        font: '14pt Source Han Sans CN', //字体样式
        fillColor: window.Cesium.Color.BLACK, //字体颜色
        backgroundColor: window.Cesium.Color.AQUA, //背景颜色
        showBackground: true, //是否显示背景颜色
        style: window.Cesium.LabelStyle.FILL, //label样式
        outlineWidth: 2,
        verticalOrigin: window.Cesium.VerticalOrigin.CENTER, //垂直位置
        horizontalOrigin: window.Cesium.HorizontalOrigin.LEFT, //水平位置
        pixelOffset: new window.Cesium.Cartesian2(10, 0), //偏移
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

// ProviderViewModel和imageryProvider有什么区别？
// imageryProvider指的是底图（瓦片）

// billboard可以实现哪些工呢？

// 什么对象可以实现可以传入html并且绑定点击事件的点位？
