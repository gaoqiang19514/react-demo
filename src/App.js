import React, { useRef, useEffect } from 'react';
import * as turf from '@turf/turf';
import wkx from 'wkx';
import geojsonMerge from '@mapbox/geojson-merge';

import buildingIcon from '@/assets/building_icon.png';
import buildingClusterIcon from '@/assets/building_cluster_icon.png';

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

function buildHTMLString(text, code, onClick) {
  return `<div class="map-label" data-code=${code}>${text}</div>`;
}

function appendChild(str, container = document.body) {
  const div = document.createElement('div');

  div.className = 'fixed-box';
  div.innerHTML = str;

  container.appendChild(div);

  return div;
}

function App() {
  const areaList = useRef([]);
  const labelListRef = useRef([]);
  const viewerRef = useRef(null);
  const currentLevel = useRef(-1);
  const currentDataSource = useRef(null);

  useEffect(() => {
    const cesiumContainer = document.getElementById('cesiumContainer');

    const insertMarker = (item, _viewer, _cesiumContainer) => {
      const point = wkx.Geometry.parse(item.wktAreaCenter).toGeoJSON();

      const position = lngLatToCssPosition({
        lngLat: point.coordinates,
        viewer: _viewer,
      });

      const onClick = () => {
        alert();
      };

      const htmlString = buildHTMLString(item.name, item.code, onClick);
      const label = appendChild(htmlString, _cesiumContainer);

      return {
        label,
        lngLat: point.coordinates,
        text: item.name,
        position,
        remove: () => {
          label.remove();
        },
      };
    };

    const drawAreaLabel = (_areaList, _viewer, _cesiumContainer) => {
      labelListRef.current.forEach((item) => item.remove());
      labelListRef.current = _areaList.map((item) =>
        insertMarker(item, _viewer, _cesiumContainer),
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

    function drillDown(code, drawDone = () => {}) {
      return Api.getAreaData({ id: code }).then((res) => {
        const childrenList = res?.data?.data?.childrenList || [];

        // 获取到了下一级数据，清理已存在的覆盖物
        if (!childrenList?.length) {
          return;
        }

        // 清理已存的区划线
        viewer.dataSources.remove(currentDataSource.current);

        // 各个区域
        const features = [];
        const list = childrenList.map((area) => {
          const geometry = wkx.Geometry.parse(area.wktPoly);
          const areaGeojson = geometry.toGeoJSON();

          const featureCollection = turf.polygonToLine(areaGeojson, {
            properties: {
              name: area.name,
              code: area.code,
            },
          });

          // 需要将featureCollection里面的feature整理取出来，然后使用
          featureCollection.features.forEach((feature) => {
            features.push(feature);
          });

          return {
            type: 'Feature',
            featureCollection,
            properties: {
              name: area.name,
              code: area.code,
              geojson: areaGeojson,
            },
          };
        });

        const featuresCollection = geojsonMerge.merge(features);
        window.Cesium.GeoJsonDataSource.load(featuresCollection).then(
          (dataSource) => {
            dataSource.entities.values.forEach((entity) => {
              entity.polyline.material = window.Cesium.Color.RED;
              entity.polyline.width = 2;
            });

            viewer.dataSources.add(dataSource);
            currentDataSource.current = dataSource;
          },
        );

        drawDone(childrenList);

        currentLevel.current += 1;
        areaList.current.push(list);
      });
    }

    // 下钻流程
    drillDown('4403000', (_areaList) => {
      // 绘制区域label
      drawAreaLabel(_areaList, viewer, cesiumContainer);
    });

    // 左键双击事件绑定
    viewer.screenSpaceEventHandler.setInputAction((movement) => {
      const { x, y } = movement.position;
      const res = cartesian2ToLngLat(x, y, viewerRef.current);
      const point = turf.point([res.longitude, res.latitude]);

      const list = areaList.current[currentLevel.current];

      const matchItem = list.find((item) =>
        turf.booleanPointInPolygon(
          point,
          turf.multiPolygon(item.properties.geojson.coordinates),
        ),
      );

      if (matchItem.properties?.code) {
        drillDown(matchItem.properties.code, (_areaList) => {
          // 绘制区域label
          drawAreaLabel(_areaList, viewer, cesiumContainer);
          viewerRef.current.flyTo(currentDataSource.current, {
            duration: 1,
          });
        });
      }
    }, window.Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

    viewer.scene.preRender.addEventListener(() => {
      labelListRef.current.forEach((item) => {
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

    // 绘制聚合点位
    Api.getCarData().then((res) => {
      const points = res?.data[0]?.points;

      const features = points.map((item) => {
        const geometry = wkx.Geometry.parse(item.pointWkt).toGeoJSON();
        const properties = {
          id: item.reportId,
          name: 'tomcat',
        };
        return {
          type: 'Feature',
          geometry,
          properties,
        };
      });

      const geojson = geojsonMerge.merge(features);

      window.Cesium.GeoJsonDataSource.load(geojson).then((dataSource) => {
        const pixelRange = 15;
        const minimumClusterSize = 2;
        const enabled = true;

        // 指定默认图标
        dataSource.entities.values.forEach((entity) => {
          entity.billboard.image = buildingIcon;
        });

        dataSource.clustering.enabled = enabled;
        dataSource.clustering.pixelRange = pixelRange;
        dataSource.clustering.minimumClusterSize = minimumClusterSize;

        // 指定聚合图标
        dataSource.clustering.clusterEvent.addEventListener(
          (clusteredEntities, cluster) => {
            cluster.label.show = true;
            cluster.label.text = String(clusteredEntities.length);
            cluster.label.fillColor = window.Cesium.Color.RED;
            cluster.label.scale = 0.5;
            cluster.label.horizontalOrigin =
              window.Cesium.HorizontalOrigin.CENTER;
            cluster.label.pixelOffset = new window.Cesium.Cartesian2(0, -30);

            cluster.billboard.show = true;
            cluster.billboard.id = cluster.label.id;
            cluster.billboard.verticalOrigin =
              window.Cesium.VerticalOrigin.BOTTOM;
            cluster.billboard.image = buildingClusterIcon;
          },
        );

        viewer.dataSources.add(dataSource);

        // 删除点位
        // viewer.dataSources.remove(dataSource);
      });
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

  // html点位的点击事件绑定
  useEffect(() => {
    document.body.addEventListener('click', (e) => {
      const { target } = e;
      const { className } = target;
      const code = target.getAttribute('data-code');

      if (className !== 'map-label') {
        return;
      }

      console.log('code', code);
    });
  }, []);

  // 聚合点位的点击事件
  useEffect(() => {
    viewerRef.current.screenSpaceEventHandler.setInputAction((movement) => {
      const pick = viewerRef.current.scene.pick(movement.position);
      console.log('pick', pick?.id?.name);
    }, window.Cesium.ScreenSpaceEventType.LEFT_CLICK);
  });

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
