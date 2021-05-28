import React, { useRef, useEffect } from 'react';
import * as turf from '@turf/turf';
import wkx from 'wkx';

import './App.css';
import Api from './Api';
import { formatWktData } from './utils';
import { cesiumViewerDefaultSetting } from './cesium/config';

function createPointGeojson(coordinates, properties = {}) {
  if (!Array.isArray(coordinates)) {
    throw new Error('createPointGeojson(): coordinates must be an array');
  }

  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties,
        geometry: {
          type: 'Point',
          coordinates,
        },
      },
    ],
  };
}

function createPosition(lng, lat, height = 0) {
  return window.Cesium.Cartesian3.fromDegrees(lng, lat, height);
}

// 将Cartesian2.position转换为lngLat
function cartesian2ToLngLat(x, y, viewer) {
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

function lngLatToCssPosition({ lngLat, viewer }) {
  if (!Array.isArray(lngLat)) {
    throw new Error('lngLatToCssPosition(): LngLat must be an array!');
  }

  if (!viewer) {
    throw new Error('lngLatToCssPosition(): viewer is not defined!');
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
  const viewerRef = useRef(null);

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

    // 创建底图
    const imageryProvider = window.vusd.layer.createImageryProvider({
      type: 'www_gaode',
      layer: 'vec',
    });

    // 构造地球
    const viewer = new window.Cesium.Viewer(cesiumContainer, {
      ...cesiumViewerDefaultSetting,
      imageryProvider,
    });
    viewerRef.current = viewer;

    // 显示刷新率和帧率
    viewer.scene.debugShowFramesPerSecond = true;

    // 定位中心点和高度
    viewer.camera.setView({
      destination: createPosition(114.193702, 22.6508, 120000),
    });

    // init(viewer, cesiumContainer);

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

        // const geometry = wkx.Geometry.parse(areaInfo.wktPoly);
        // const geojson = geometry.toGeoJSON();
        // const multiLineString = turf.polygonToLine(geojson);
        // window.Cesium.GeoJsonDataSource.load(multiLineString).then(
        //   (dataSource) => {
        //     const entities = dataSource.entities.values;

        //     entities.forEach((entity) => {
        //       entity.polyline.material = window.Cesium.Color.RED;
        //       entity.polyline.width = 2;
        //     });

        //     viewer.dataSources.add(dataSource);
        //   },
        // );

        // 获取到了下一级数据，清理已存在的覆盖物
        if (!childrenList?.length) {
          return;
        }

        // 清理已存的区划线
        viewer.dataSources.removeAll();

        // 各个区域
        const temp = childrenList.map((area) => {
          const geometry = wkx.Geometry.parse(area.wktPoly);
          const geojson = geometry.toGeoJSON();

          const multiLineString = turf.polygonToLine(geojson);
          window.Cesium.GeoJsonDataSource.load(multiLineString).then(
            (dataSource) => {
              dataSource.entities.values.forEach((entity) => {
                entity.polyline.material = window.Cesium.Color.RED;
                entity.polyline.width = 2;
              });

              viewer.dataSources.add(dataSource);
            },
          );

          return {
            name: area.name,
            code: area.code,
            geojson,
          };
        });

        drawDone();

        areaList.current = temp;
      });
    }

    // 左键双击事件绑定
    viewer.screenSpaceEventHandler.setInputAction((movement) => {
      const { x, y } = movement.position;
      const res = cartesian2ToLngLat(x, y, viewerRef.current);

      const pointData = turf.point([res.longitude, res.latitude]);
      const matchItem = areaList.current.find((item) =>
        turf.booleanPointInPolygon(
          pointData,
          turf.multiPolygon(item.geojson.coordinates),
        ),
      );

      if (matchItem?.code) {
        drawAreaByCode(matchItem.code, () => {
          viewerRef.current.flyTo(lineCollection, {
            duration: 1,
          });
        });
      }
    }, window.Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

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

    // drawAreaByCode('4403000');

    const pointGeojson = createPointGeojson([114.193702, 22.6508]);
    window.Cesium.GeoJsonDataSource.load(pointGeojson).then((dataSource) => {
      viewer.dataSources.add(dataSource);
    });

    // MULTIPOLYGON转geojson
    // var geoJSONObject = wkx.Geometry.parse().toGeoJSON();

    // window.Cesium.GeoJsonDataSource.load('./sz.geojson', {
    //   clampToGround: true,
    // }).then((dataSource) => {
    //   const entities = dataSource.entities.values;
    //   // viewer.dataSources.add(dataSource);
    //   entities.map((entity) => {
    //     entity.polygon.material = window.Cesium.Color.TRANSPARENT;
    //     entity.polygon.outlineColor = window.Cesium.Color.RED;
    //     entity.polygon.height = 50;
    //     entity.polygon.outlineWidth = 13;
    //     entity.polygon.closeTop = false;

    //     viewer.entities.add(entity);
    //   });
    // });
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

// 判断当前点击的是否为一个点位，如果是，可以进行一些后续操作，比如产出infoWindow等等
// viewer.screenSpaceEventHandler.setInputAction((e) => {
//   const pick = viewer.scene.pick(e.position);

//   if (!pick) {
//     return;
//   }

//   // popUp(pick, e.position);
// }, window.Cesium.ScreenSpaceEventType.LEFT_CLICK);

// viewer.scene.postRender.addEventListener(() => {
//   // 这里需要拿到屏幕上存在点位的数据，然后实时更新他们的位置
// });

// 绘制帧事件
// viewer.scene.preRender.addEventListener
