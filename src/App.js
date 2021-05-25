import React, { useEffect } from 'react';
import html2canvas from 'html2canvas';

import './App.css';

function createPosition(lng, lat, height = 0) {
  return window.Cesium.Cartesian3.fromDegrees(lng, lat, height);
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

    // 添加文字点位
    viewer.entities.add({
      position: createPosition(114.113701, 24.6208),
      label: {
        text: '<div>123</div>',
        font: '14pt Source Han Sans CN',
        fillColor: window.Cesium.Color.BLACK,
        backgroundColor: window.Cesium.Color.AQUA,
        showBackground: true,
        style: window.Cesium.LabelStyle.FILL,
        outlineWidth: 2,
        verticalOrigin: window.Cesium.VerticalOrigin.CENTER,
        horizontalOrigin: window.Cesium.HorizontalOrigin.LEFT,
        pixelOffset: new window.Cesium.Cartesian2(10, 0),
      },
    });

    function createMarker() {
      const div = document.createElement('div');
      div.id = 'marker';
      div.className = 'marker';

      return div;
    }

    // html2canvas(document.getElementById('marker')).then((canvas) => {
    //   console.log('canvas', canvas);
    //   // 添加图片点位
    //   viewer.entities.add({
    //     id: 1234,
    //     name: '标点',
    //     position: window.Cesium.Cartesian3.fromDegrees(114.113702, 22.6208),
    //     billboard: {
    //       image: 'https://img-static.mihoyo.com/mainPage/ys-logo.png',
    //     },
    //   });
    // });

    const popUp = (pick, position) => {
      const cesiumContainer = document.getElementById('cesiumContainer');

      const div = document.createElement('div');
      div.className = 'marker';
      div.style.top = `${position.y}px`;
      div.style.left = `${position.x}px`;
      div.innerHTML = 'text';

      cesiumContainer.appendChild(div);
    };

    // 事件绑定
    viewer.screenSpaceEventHandler.setInputAction((e) => {
      const pick = viewer.scene.pick(e.position);

      if (pick) {
        popUp(pick, e.position);
      }
    }, window.Cesium.ScreenSpaceEventType.LEFT_CLICK);

    viewer.scene.postRender.addEventListener(() => {
      // 这里需要拿到屏幕上存在点位的数据，然后实时更新他们的位置
    });

    // To geographically place an HTML element on top of the Cesium canvas, we use
    // scene.cartesianToCanvasCoordinates to map a world position to canvas x and y values.
    // This example places and img element, but any element will work.

    const marker = createMarker();
    document.body.appendChild(marker);

    const markerElem = document.getElementById('marker');
    const scratch = new window.Cesium.Cartesian2();
    viewer.scene.preRender.addEventListener(() => {
      const position = window.Cesium.Cartesian3.fromDegrees(
        114.113702,
        22.6208,
      );
      const canvasPosition = viewer.scene.cartesianToCanvasCoordinates(
        position,
        scratch,
      );

      if (window.Cesium.defined(canvasPosition)) {
        markerElem.style.top = `${canvasPosition.y}px`;
        markerElem.style.left = `${canvasPosition.x}px`;
      }
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

// 添加图片点位
// const entity = viewer.entities.add({
//   name: '标点',
//   position: window.Cesium.Cartesian3.fromDegrees(114.113702, 22.6208),
//   billboard: {
//     image: './acting.png',
//     horizontalOrigin: window.Cesium.HorizontalOrigin.CENTER,
//     verticalOrigin: window.Cesium.VerticalOrigin.BOTTOM,
//     scale: 1,
//   },
// });

// 添加文字点位
// viewer.entities.add({
//   position: createPosition(114.113702, 22.6208),
//   label: {
//     text: '<div>123</div>',
//     font: '14pt Source Han Sans CN', //字体样式
//     fillColor: window.Cesium.Color.BLACK, //字体颜色
//     backgroundColor: window.Cesium.Color.AQUA, //背景颜色
//     showBackground: true, //是否显示背景颜色
//     style: window.Cesium.LabelStyle.FILL, //label样式
//     outlineWidth: 2,
//     verticalOrigin: window.Cesium.VerticalOrigin.CENTER, //垂直位置
//     horizontalOrigin: window.Cesium.HorizontalOrigin.LEFT, //水平位置
//     pixelOffset: new window.Cesium.Cartesian2(10, 0), //偏移
//   },
// });
