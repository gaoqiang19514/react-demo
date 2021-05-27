import React, { useRef, useEffect } from 'react';
import * as turf from '@turf/turf';

import './App.css';
import Api from './Api';
import { formatWktData } from './utils';

function createPosition(lng, lat, height = 0) {
  return window.Cesium.Cartesian3.fromDegrees(lng, lat, height);
}

function lngLatToCssPosition({ lngLat, viewer }) {
  if (!Array.isArray(lngLat)) {
    throw Error('LngLat must be array!');
  }

  if (!viewer) {
    throw Error('viewer is not defined!');
  }

  const scratch = new window.Cesium.Cartesian2();
  const position = window.Cesium.Cartesian3.fromDegrees(...lngLat);

  return viewer.scene.cartesianToCanvasCoordinates(position, scratch);
}

function buildHTMLString(text, code) {
  return `<div class="map-label" data-code="${code}" >${text}</div>`;
}

function appendChild(str, container = document.body) {
  const div = document.createElement('div');

  div.className = 'fixed-box';
  div.innerHTML = str;

  container.appendChild(div);

  return div;
}

let labelList = [];

function App() {
  const areaList = useRef([]);
  useEffect(() => {
    const cesiumContainer = document.getElementById('cesiumContainer');

    const insertMarker = (item, viewer, cesiumContainer) => {
      const position = lngLatToCssPosition({
        lngLat: item.lngLat,
        viewer,
      });

      const onClick = () => {
        alert();
      };

      const htmlString = buildHTMLString(item.name, item.code, onClick);
      const label = appendChild(htmlString, cesiumContainer);

      return {
        label,
        lngLat: item.lngLat,
        text: item.text,
        position,
      };
    };

    const init = (viewer, cesiumContainer) => {
      const dataList = [
        {
          code: '440309',
          name: '光明',
          lngLat: [113.93265657682667, 22.76543620618081],
        },
        {
          code: '440305',
          name: '南山',
          lngLat: [113.95347654074698, 22.552659769694785],
        },
        {
          code: '440304',
          name: '福田',
          lngLat: [114.04766968954374, 22.537413265112207],
        },
        {
          code: '440310',
          name: '坪山',
          lngLat: [114.36812060814862, 22.68173896853149],
        },
        {
          code: '440312',
          name: '大鹏',
          lngLat: [114.4885324684609, 22.611836106753188],
        },
        {
          code: '440311',
          name: '龙华',
          lngLat: [114.03019054856384, 22.684426829236983],
        },
        {
          code: '440306',
          name: '宝安',
          lngLat: [113.85928339195016, 22.661130285974608],
        },
        {
          code: '440307',
          name: '龙岗',
          lngLat: [114.23411386040749, 22.67725908358105],
        },
        {
          code: '440303',
          name: '罗湖',
          lngLat: [114.1544866624273, 22.56700788212045],
        },
        {
          code: '440308',
          name: '盐田',
          lngLat: [114.2681010790252, 22.59659614775933],
        },
      ];

      labelList = dataList.map((item) =>
        insertMarker(item, viewer, cesiumContainer),
      );
    };

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
      requestRenderMode: true,
    };

    // 创建底图·
    const imageryProvider = window.vusd.layer.createImageryProvider({
      type: 'www_gaode',
      layer: 'vec',
    });

    // 构造地球
    const viewer = new window.Cesium.Viewer(cesiumContainer, {
      ...defaultSetting,
      imageryProvider,
    });

    // 定位中心点和高度
    viewer.camera.setView({
      destination: createPosition(114.193702, 22.6508, 120000),
    });

    init(viewer, cesiumContainer);

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

    const popUp = (pick, position) => {};

    // 左键单击事件绑定
    viewer.screenSpaceEventHandler.setInputAction((e) => {
      const pick = viewer.scene.pick(e.position);

      if (pick) {
        popUp(pick, e.position);
      }
    }, window.Cesium.ScreenSpaceEventType.LEFT_CLICK);

    const lineCollection = [];
    function drawLine(lngLatList, options = {}) {
      const line = viewer.entities.add({
        polyline: {
          positions: window.Cesium.Cartesian3.fromDegreesArray(lngLatList),
          width: 3,
          material: window.Cesium.Color.BLUE,
          ...options,
        },
      });
      lineCollection.push(line);
    }

    function drawAreaByCode(code, drawDone = () => {}) {
      return Api.getAreaData({ id: code }).then((res) => {
        const areaInfo = res?.data?.data?.areaInfo;
        const childrenList = res?.data?.data?.childrenList || [];

        if (childrenList?.length) {
          // 清理已存的区划线
          viewer.entities.removeAll();
        }

        // 各个区域
        const nextList = childrenList.map((area) => {
          const list = formatWktData(area.wktPoly);

          // 每个区域可能存在多个独立的小块
          list.forEach((blockList) => {
            const lngLatList = [];
            blockList.forEach((_item) => {
              lngLatList.push(..._item);
            });
            drawLine(lngLatList);
          });

          return {
            name: area.name,
            code: area.code,
            list,
          };
        });

        if (nextList?.length) {
          if (areaInfo.wktAreaCenter) {
            const areaCenter = formatWktData(areaInfo.wktAreaCenter);
            drawDone(areaCenter);
          }
        }

        areaList.current = nextList;
      });
    }

    // 左键双击事件绑定
    viewer.screenSpaceEventHandler.setInputAction((movement) => {
      // 将Cartesian2.position转换为lngLat
      function cartesian2ToLngLat(x, y) {
        const cartesian2 = new window.Cesium.Cartesian2(x, y);
        const cartesian3 = viewer.scene.camera.pickEllipsoid(
          cartesian2,
          viewer.scene.globe.ellipsoid,
        );
        const wgs = window.Cesium.Cartographic.fromCartesian(cartesian3);
        const longitude = window.Cesium.Math.toDegrees(wgs.longitude);
        const latitude = window.Cesium.Math.toDegrees(wgs.latitude);

        return {
          longitude,
          latitude,
        };
      }

      const { x, y } = movement.position;
      const res = cartesian2ToLngLat(x, y);

      const pointData = turf.point([res.longitude, res.latitude]);

      const matchItem = areaList.current.find((item) =>
        turf.booleanPointInPolygon(pointData, turf.polygon(item.list)),
      );

      if (matchItem?.code) {
        drawAreaByCode(matchItem.code, () => {
          // 绘制完成后，主动刷新
          viewer.scene.requestRender();
          viewer.flyTo(lineCollection, {
            duration: 1,
          });
        });
      }

      // 1. 根据当前坐标判断属于哪个区
    }, window.Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

    viewer.scene.postRender.addEventListener(() => {
      // 这里需要拿到屏幕上存在点位的数据，然后实时更新他们的位置
    });

    // To geographically place an HTML element on top of the Cesium canvas, we use
    // scene.cartesianToCanvasCoordinates to map a world position to canvas x and y values.
    // This example places and img element, but any element will work.

    viewer.scene.preRender.addEventListener(() => {
      labelList.forEach((item) => {
        const { label, lngLat } = item;

        const position = lngLatToCssPosition({
          lngLat,
          viewer,
        });

        if (!window.Cesium.defined(position)) {
          return;
        }

        label.style.top = `${position.y}px`;
        label.style.left = `${position.x}px`;
      });
    });

    drawAreaByCode('4403000');

    console.log('turf', turf);
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
