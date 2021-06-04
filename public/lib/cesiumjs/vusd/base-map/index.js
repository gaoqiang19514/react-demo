const baseUrl = {
    districtMultPolyline: `/visualization/data/json/sz_distinct_part_line2.geojson`,
    shenZhenWall: `/visualization/data/json/shenzhen_coor_array.json`,
    config: '/lib/cesiumjs/vusd/config/',
    util: '/lib/cesiumjs/vusd/util/',
}

// 防抖
function debounces(fn, wait) {
    let timeouts = null;

    return function () {
        if (timeouts) {
            clearTimeout(timeouts);
        }
        timeouts = setTimeout(fn, wait);
    };
}


class BaseMap {
    isOpen3D = true
    baseMapKey = ''
    isexcavation = true
    viewer
    handler
    motherBoard
    datacutover
    szqingxie
    dlp_poi

    state = {
        storedData: {},
    }
    constructor(container, baseMapKey = '') {
        this.container = container
        this.baseMapKey = baseMapKey
        this._initData()
    }

    // 初始化数据
    _initData() {
        $.ajax(baseUrl.config + 'motherBoard.json').then(motherBoard => {
            this.motherBoard = motherBoard
            $.ajax(baseUrl.config + 'datacutover.json').then(datacutover => {
                this.datacutover = datacutover
                // 初始化地图=》初始化视角=》初始化底图
                this._initMap().then(() => {
                    this._initCamera()
                }).then(() => {

                    if (this.baseMapKey === 'DIGITAL') {
                        this.createDigitalMap()
                    } else {
                        this.createRealityMap()
                    }

                })
            })
        })
    }

    // 初始化地图
    _initMap() {
        return new Promise(resolve => {
            vusd.createMap({
                id: this.container,
                url: baseUrl.config + 'config.json',
                success: (viewer, gisdata, jsondata)=> {
                    vusd.widget.init(viewer, jsondata.widget);
                    this.viewer = viewer
                    resolve()
                },
            })
        })
    }

    // 初始化视角
    _initCamera() {
        return new Promise(resolve => {
            const viewer = this.viewer;

            viewer.scene.globe.depthTestAgainstTerrain = false;

            const centeropt = {
                "x": 114.14347633526161,
                "y": 22.63403261589422,
                "z": 93996.87093563561,
                "heading": 360,
                "pitch": -90,
                "roll": 360
            };
            const height = centeropt.z || 2500;
            viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(centeropt.x, centeropt.y, height), //经度、纬度、高度
                orientation: {
                    heading: Cesium.Math.toRadians(centeropt.heading || 0), //绕垂直于地心的轴旋转
                    pitch: Cesium.Math.toRadians(centeropt.pitch || -90), //绕纬度线旋转
                    roll: Cesium.Math.toRadians(centeropt.roll || 0) //绕经度线旋转
                },
                duration: 4
            });
            resolve()
        })
    }

    // 创建实景地图 
    createRealityMap() {
        this.baseMapKey = 'REALITY'
        this._removeDigital().then(() => {
            if (this.isOpen3D) {
                this._addSzYX(this.motherBoard.reality.sz_yx).then(() => {
                    return this._addDistrict()
                }).then(() => {
                    return this._addDistrictZhuji()
                }).then(() => {
                    return this._addOSGB(this.motherBoard.reality.sz_osgb)
                }).then(() => {
                    return this._loadSzData(this.motherBoard.reality.sz_road)
                })
            }

        })

    }
    // 移除实景地图
    removeRealityMap() {
        return new Promise(reslove => {
            this._removeReality().then(() => {
                this._removePOI()
            }).then(()=>{
                reslove()
            })
        })

    }
    // 创建电子地图
    createDigitalMap() {
        this.baseMapKey = 'DIGITAL'
        const {
            digital: {
                whiteModel,
                global_map,
                sz_map
            }
        } = this.motherBoard
        
        this.removeRealityMap().then(() => {
            return this.addWMS(global_map)
        }).then(() => {
            //加载深圳电子底图（自己配的wms,非天地图）
            return this.addWMTS(sz_map)
        }).then(()=>{
            if (this.isOpen3D) {
                //加载白模
                return this._addWhiteModel(whiteModel)
            }
        })

    }
    removeDigitalMap() {
        this._removeDigital().then(() => {
            return this.addWMS(global_map)
        })
    }
    // 开关3D模式
    toggle3DModel(isOpen) {
        const {
            digital: {
                global_map
            }
        } = this.motherBoard
        const {
            storedData
        } = this.state

        if (this.isOpen3D !== isOpen) {
            this.isOpen3D = isOpen
            switch (this.baseMapKey) {
                case 'REALITY':
                    if (isOpen) {
                        this.createRealityMap()
                    } else {
                        this.removeRealityMap()
                    }
                    break;
                case 'DIGITAL':
                    if (isOpen) {
                        storedData["whiteModel"].show = true
                    } else {
                        storedData["whiteModel"].show = false
                    }
                    break;
                default:
                    break;
            }

        }
    }

    _removeDigital = () => {
        const {
            digital: {
                global_map,
                sz_map
            }
        } = this.motherBoard;

        return new Promise((resolve, reject) => {
            if (this.baseMapKey === 'DIGITAL') {
                this._removeTianVec()
                    .then(() => {
                        return this._removeWhiteModel()
                    })
            } else {
                this._removeTianVec()
                    .then(() => {
                        return this._removeWhiteModel()
                    })
                    .then(() => {
                        return this._removeWMS(global_map) //移除深圳底图
                    }).then(() => {
                        return this._removeWMTS(sz_map)
                    }).then(() => {
                        return this._removeMonomerModel()
                    })
                    .then(() => {
                        resolve()
                    })
            }
        })
    }

    _removeTianVec = () => {
        const {
            storedData
        } = this.state
        return new Promise((resolve, rejeect) => {
            storedData.tianVec && this.viewer.imageryLayers.remove(storedData.tianVec, true);
            resolve()
        })
    }
    _removeWhiteModel = () => {
        const {
            storedData
        } = this.state
        return new Promise((resolve, rejeect) => {
            storedData.whiteModel && storedData.whiteModel.destroy()
            resolve()
        })
    }
    addWMS = (item) => {
        const {
            storedData
        } = this.state
        return new Promise((resolve, reject) => {
            let provider = new Cesium.WebMapServiceImageryProvider({
                url: item.url,
                layers: item.layerName,
                parameters: {
                    transparent: true,
                    crs: "EPSG:4326",
                    format: "image/png"
                }
            });
            let imageryLayer = this.viewer.imageryLayers.addImageryProvider(provider);

            this.state.storedData = {
                ...storedData,
                [item.key]: imageryLayer
            }

            resolve()
        })
    }

    //加载深圳电子底图
    addWMTS = (item) => {
        const {
            storedData
        } = this.state
        return new Promise((resolve, reject) => {
            let gridsetName = 'EPSG:900913';
            let provider = new Cesium.WebMapTileServiceImageryProvider({
                url: item.url,
                format: item.format,
                tileMatrixSetID: item.tileMatrixSetID,
            });
            let imageryLayer = this.viewer.imageryLayers.addImageryProvider(provider);

            this.state.storedData = {
                ...storedData,
                [item.key]: imageryLayer
            }
            resolve()
        })
    }

    _removeWMTS = (item) => {
        const {
            storedData
        } = this.state
        return new Promise((resolve, reject) => {
            storedData[item.key] && this.viewer.imageryLayers.remove(storedData[item.key]);
            resolve()
        })
    }

    _removeWMS = (item) => {
        const {
            storedData
        } = this.state
        return new Promise((resolve, reject) => {
            storedData[item.key] && this.viewer.imageryLayers.remove(storedData[item.key]);
            resolve()
        })
    }

    // 加载深圳影像
    _addSzYX(item) {
        let {
            storedData
        } = this.state
        return new Promise((resolve, reject) => {
            let layer = this.viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
                url: item.url
            }));
            // layer.show = false
            window.szlayer = layer;
            this.state.storedData = {
                ...storedData,
                'sz_yx': layer
            }

            resolve()
        })
    }


    // 加载深圳行政区域分界线
    _addDistrict() {
        let {
            storedData
        } = this.state
        return new Promise(resolve => {
            let promise_line = Cesium.GeoJsonDataSource.load(baseUrl.districtMultPolyline);
            promise_line.then(data => {
                this.viewer.dataSources.add(data);
                let entities = data.entities.values;
                entities.map(entity => {
                    entity.polyline.width = 3;
                    entity.polyline.material = new Cesium.PolylineGlowMaterialProperty({
                        glowPower: .6,
                        color: Cesium.Color.fromCssColorString('#1694E7').withAlpha(.9)
                    })
                })

                $.ajax(baseUrl.shenZhenWall).then(res => {
                    const coorArr = res.coordinates;
                    let maximumHeights = [];
                    let minimumHeights = [];
                    if (coorArr) {
                        coorArr.forEach((item, index) => {
                            if (index % 2 === 0) {
                                maximumHeights.push(800);
                                minimumHeights.push(0);
                            }
                        });
                    }

                    let SZWall = this.viewer.entities.add({
                        name: 'SZWall',
                        wall: {
                            positions: Cesium.Cartesian3.fromDegreesArray(coorArr),
                            maximumHeights,
                            minimumHeights,
                            material: new Cesium.ImageMaterialProperty({
                                transparent: true,
                                image: getColorRamp({
                                    0.0: 'rgba(68, 157, 247, 1.0)',
                                    0.045: 'rgba(68, 157, 247, 0.8)',
                                    0.1: 'rgba(68, 157, 247, 0.6)',
                                    0.15: 'rgba(68, 157, 247, 0.4)',
                                    0.37: 'rgba(68, 157, 247, 0.2)',
                                    0.54: 'rgba(68, 157, 247, 0.1)',
                                    1.0: 'rgba(68, 157, 247, 0)'
                                })
                            }),
                            shadows: Cesium.ShadowMode.CAST_ONLY
                        }
                    });
                    this.state.storedData = {
                        ...storedData,
                        "district": [data, SZWall]
                    }
                    resolve()
                })
            })
        })
    }

    //添加行政区注记
    _addDistrictZhuji() {
        let {
            storedData
        } = this.state
        return new Promise((resolve, reject) => {
            $.ajax(baseUrl.config + 'datas.json').then(res => {

                const positionDistrict = res.positionDistrict

                let dataSource = new Cesium.CustomDataSource("sz_district_zhuji")
                this.viewer.dataSources.add(dataSource)
                Object.keys(positionDistrict).forEach(item => {
                    dataSource.entities.add({
                        position: Cesium.Cartesian3.fromDegrees(...positionDistrict[item], 150),
                        label: {
                            id: item,
                            text: item,
                            font: 24 + 'px PingFangSC-Medium',
                            fillColor: Cesium.Color.WHITE,
                            translucencyByDistance: new Cesium.NearFarScalar(1.5e5, 1.0, 1.5e6, 0.0),
                            scaleByDistance: new Cesium.NearFarScalar(1.5e5, 1.0, 1.5e6, 0.1),
                            outlineWidth: 2,
                            backgroundPadding: new Cesium.Cartesian2(12, 8),
                            backgroundColor: Cesium.Color.fromCssColorString('#1694E7').withAlpha(.1),
                            pixelOffset: new Cesium.Cartesian2(-30, -30),
                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER
                        }
                    })
                })
                this.state.storedData = {
                    ...storedData,
                    "sz_district_zhuji": dataSource
                }
                resolve()
            })
        })
    }

    //加载倾斜摄影
    _addOSGB(item) {
        let {
            storedData
        } = this.state
        return new Promise((resolve, reject) => {
            let resource = new Cesium.Resource({
                url: item.url,
                headers: {
                    'authorization': item.authorization
                }
            })

            let cesium3DTileset = new Cesium.Cesium3DTileset({
                url: resource,
                show: false,
                maximumScreenSpaceError: item.maximumScreenSpaceError,
                maximumMemoryUsage: item.maximumMemoryUsage,
                preferLeaves: item.preferLeaves,
                skipLevelOfDetail: true,
                skipLevels: 1,
                skipScreenSpaceErrorFactor: 16,
                immediatelyLoadDesiredLevelOfDetail: false,
                loadSiblings: true,
                cullWithChildrenBounds: true,
                cullRequestsWhileMoving: true,
                cullRequestsWhileMovingMultiplier: 0.01,
                preloadWhenHidden: true,
                progressiveResolutionHeightFraction: 0.1,
                dynamicScreenSpaceErrorDensity: 10000,
                dynamicScreenSpaceErrorFactor: 1,
                dynamicScreenSpaceError: true,
            });
            this.szqingxie = cesium3DTileset;

            setTimeout(() => {
                this.viewer.scene.primitives.add(cesium3DTileset);
            }, 6000);
            cesium3DTileset.readyPromise.then(function (tileset) {
                this.viewer.camera.moveStart.addEventListener(this.moveStart);
                this.viewer.camera.moveEnd.addEventListener(this.moveEnd);
                if (item.offsetHeight) { //调整高度
                    let origin = tileset.boundingSphere.center;
                    let cartographic = Cesium.Cartographic.fromCartesian(origin);
                    let surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
                    let offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, item.offsetHeight);
                    let translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
                    tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
                }
            })
            this.state.storedData = {
                ...storedData,
                'osgb': cesium3DTileset
            }

            resolve()
        })
    }


    //加载深圳三维电子底图数据
    _loadSzData(item) {
        const viewer = this.viewer
        let {
            storedData
        } = this.state
        const {
            reality: {
                sz_osgb,
                sz_poi
            }
        } = this.motherBoard
        return new Promise((resolve, reject) => {
            //let dly_1000 = new Cesium.CustomDataSource("dly_1000")
            //let dlx_1000 = new Cesium.CustomDataSource("dlx_1000")
            let dlx_500000 = new Cesium.CustomDataSource("dlx_500000")
            let dlx_50000 = new Cesium.CustomDataSource("dlx_50000")
            let dlx_250000 = new Cesium.CustomDataSource("dlx_250000")
            let dlp_poi = new Cesium.CustomDataSource("poi");
            let labelCollection = new Cesium.LabelCollection({
                scene: viewer.scene
            }); //道路注记

            //viewer.dataSources.add(dly_1000);
            //viewer.dataSources.add(dlx_1000);
            viewer.dataSources.add(dlx_500000);
            viewer.dataSources.add(dlx_50000);
            viewer.dataSources.add(dlx_250000);
            viewer.dataSources.add(dlp_poi);


            function addlx(url, dataSource, extentParam) {
                $.ajax({
                    url: `${url}&bbox=${extentParam.xmin}%2C${extentParam.ymin}%2C${extentParam.xmax}%2C${extentParam.ymax}`,
                    type: "get",
                    dataType: 'json',
                    contentType: "application/json;charset=UTF-8",
                    success: function (data) {
                        if (data && data.features && data.features.length) {
                            dataSource.entities.removeAll()
                            let promise_line = Cesium.GeoJsonDataSource.load(data, {
                                clampToGround: true
                            });
                            promise_line.then(data => {
                                let entities = data.entities.values;
                                entities.map(entity => {
                                    //entity.polyline.width = entity.properties.getValue().WIDTH != null ? parseFloat(entity.properties.getValue().WIDTH / 4) : 0;
                                    entity.polyline.width = 3;
                                    entity.polyline.material = new Cesium.PolylineOutlineMaterialProperty({
                                        color: Cesium.Color.fromCssColorString('#E0B24A').withAlpha(.5),
                                        outlineColor: Cesium.Color.fromCssColorString('#DDDDDD').withAlpha(.5),
                                        outlineWidth: 1
                                    });
                                    dataSource.entities.add(entity)
                                })
                            })
                        }
                    },
                    error: function (data) {
                        console.log("请求出错(" + data.status + ")：" + data.statusText);
                    }
                });
            }
            //1:1000的道路面 加载路面注记
            function adddlmzj(urlPL, dataSourcePL, extentParam) {

                //根据道路线动态加载注记
                $.ajax({
                    url: `${urlPL}&bbox=${extentParam.xmin}%2C${extentParam.ymin}%2C${extentParam.xmax}%2C${extentParam.ymax}`,
                    type: "get",
                    dataType: 'json',
                    contentType: "application/json;charset=UTF-8",
                    success: function (data) {
                        if (data && data.features && data.features.length) {
                            dataSourcePL.entities.removeAll()
                            let promise_line = Cesium.GeoJsonDataSource.load(data, {
                                clampToGround: true
                            });
                            promise_line.then(data => {
                                let entities = data.entities.values;
                                //文字
                                // viewer.scene.primitives.remove()
                                labelCollection.removeAll()
                                viewer.scene.primitives.add(labelCollection);
                                entities.forEach(entity => {
                                    let num = Math.floor(entity.polyline.positions._value.length / 2);
                                    let midpoint = vusd.pointconvert.cartesian2lonlat(entity.polyline.positions._value[num]);
                                    labelCollection.add({
                                        position: Cesium.Cartesian3.fromDegrees(midpoint[0], midpoint[1], 60),
                                        text: entity._properties.NAME._value,
                                        font: 'normal small-caps normal 12px 黑体',
                                        scale: 1,
                                        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                                        fillColor: new Cesium.Color.fromCssColorString("#ffc881"),
                                        outlineColor: Cesium.Color.BLACK,
                                        outlineWidth: 3,
                                        showBackground: false,
                                        horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
                                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                        //disableDepthTestDistance: Number.POSITIVE_INFINITY,
                                        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 8000)
                                    });


                                })
                            })
                        }
                    },
                    error: function (data) {
                        console.log("请求出错(" + data.status + ")：" + data.statusText);
                    }
                });


            }
            // 处理函数

            const handle = () => {
                

                let level = 10
                if (viewer.scene.globe._surface._tilesToRender.length) {
                    level = viewer.scene.globe._surface._tilesToRender[0].level < 10 ? 10 : viewer.scene.globe._surface._tilesToRender[0].level
                }

                //分级处理道路加载

                let extentParam = viewer.vusd.getExtent()


                if (level > 15 && level <= 19) {
                    //dly_1000.show = true;
                    //dlx_1000.show = false;
                    dlx_500000.show = false;
                    dlx_50000.show = true;
                    dlx_250000.show = false;
                    //addlx(item.urls['10000pl'], dlx_10000, extentParam)
                    adddlmzj(item.urls['50000pl'], dlx_50000, extentParam)
                } else if (level >= 12 && level <= 13) {
                    //dly_1000.show = false;
                    /*  dlx_500000.show = false;  */
                    dlx_500000.show = false;
                    dlx_50000.show = false;
                    dlx_250000.show = true;
                    addlx(item.urls['250000pl'], dlx_250000, extentParam)
                } else if (level > 9 && level < 12) {
                    //dly_1000.show = false;
                    //dlx_1000.show = false;
                    dlx_500000.show = true;
                    dlx_50000.show = false;
                    dlx_250000.show = false;
                    addlx(item.urls['500000pl'], dlx_500000, extentParam);

                } else {
                    //dly_1000.show = false;
                    //dlx_1000.show = false;
                    dlx_500000.show = false;
                    dlx_50000.show = false;
                    dlx_250000.show = false;
                }
                if (level >= 10) {
                    //分类加载POI信息
                    
                    this._addPOI(level, sz_poi, dlp_poi);
                }
                //分级处理倾斜摄影

                if (!viewer.vusd.keyboardRoam.enable) {
                    if (this.baseMapKey === 'REALITY') {
                        if (level >= 13 && level < 19) {

                            storedData["osgb"].show = true //显示倾斜摄影

                        } else if (level < 13) {
                            storedData["osgb"].show = false //隐藏倾斜摄影
                            // storedData['sz_yx'].show = true
                        }
                    }
                }
                if (this.baseMapKey === 'DIGITAL') {
                    if (storedData["whiteModel"]) {
                        storedData["whiteModel"].show = true //显示白模
                    }
                }

            }


            let fun = debounces(handle, 500);
            setTimeout(handle, 1200);
            // 滚动事件
            viewer.camera.moveStart.addEventListener(fun);
            // window.addEventListener('mousemove', fun);
            resolve()
        })
    }
    _removePOI(){
        return new Promise(reslove=>{
            if (this.dlp_poi) {
                this.dlp_poi.entities.removeAll()
                this.viewer.dataSources.remove(this.dlp_poi)
            }
            reslove()
        })
    }
    //添加POI信息
    _addPOI(level, sz_poi, dlp_poi) {
        this.dlp_poi = dlp_poi
        let currentlevel = level;
        let levelfield;
        let querylevel;
        let fontsize;

        switch (currentlevel) {
            case 10:
                levelfield = "L10";
                querylevel = 10;
                fontsize = 14;
                break;
            case 11:
                levelfield = "L11";
                querylevel = 11;
                fontsize = 14;
                break;
            case 12:
                levelfield = "L12";
                querylevel = 12;
                fontsize = 14;
                break;
            case 13:
                levelfield = "L13";
                querylevel = 13;
                fontsize = 12;
                break;
            case 14:
                levelfield = "L14";
                querylevel = 14;
                fontsize = 12;
                break;
            case 15:
                levelfield = "L15";
                querylevel = 15;
                fontsize = 12;
                break;
            case 16:
                levelfield = "L16";
                querylevel = 16;
                fontsize = 12;
                break;
            case 17:
                levelfield = "L17";
                querylevel = 17;
                fontsize = 12;
                break;
            case 18:
                levelfield = "L18";
                querylevel = 18;
                fontsize = 12;
                break;
            case 19:
                levelfield = "L19";
                querylevel = 19;
                fontsize = 12;
                break;
            default:
                break;
        }

        //空间字段：如果是shp发布的基础楼底面，则空间字段是the_geom,如果是pg发布的，则空间字段是geom，此处关系到queryfield中空间字段的配置，目前数据是shp发布，所以查询字段配置为the_geom
        const sourcejson = {
            WFSdatasource: {
                name: "jzm",
                url: sz_poi.url, //"http://168.4.0.26:8080/geoserver/DIBIAO/wfs",
                parameters: {
                    service: "WFS",
                    request: "GetFeature",
                    typename: sz_poi.layername,
                    version: "1.0.0",
                    outputFormat: "application/json",
                    srs: "EPSG:4326",
                    maxFeatures: 200
                }
            },
            queryfield: {
                namefield: ["bzmc", "the_geom"]
            }
        };

        let queryMapserver = new QueryGeoServer(sourcejson.WFSdatasource);

        queryMapserver.query({
            level: levelfield,
            levelvalue: querylevel,
            fwEntity: GetrecExtent(this).geometry,
            success: (result) => {

                if (result.dataSource) {

                    if (result.dataSource.entities.values.length > 0) {
                        dlp_poi.entities.removeAll();

                        let entities = result.dataSource.entities.values;
                        entities.map(entity => {
                            let ellipsoid = this.viewer.scene.globe.ellipsoid
                            let cartographic_old = ellipsoid.cartesianToCartographic(entity.position._value)
                            let lat = Cesium.Math.toDegrees(cartographic_old.latitude)
                            let lng = Cesium.Math.toDegrees(cartographic_old.longitude)
                            let alt_old = cartographic_old.height
                            let alt_new = alt_old + entity._properties.maxhei._value + 30
                            let cartographic_new = Cesium.Cartographic.fromDegrees(lng, lat, alt_new)
                            entity.position = ellipsoid.cartographicToCartesian(cartographic_new)
                            let iconame;
                            switch (entity._properties.ysdl._value) {
                                case "宾馆酒楼":
                                    iconame = 180100;
                                    break;
                                case "购物中心":
                                    iconame = 200100;
                                    break;
                                case "基础地名":
                                    iconame = 110301;
                                    break;
                                case "交通设施":
                                    iconame = 160500;
                                    break;
                                case "金融机构":
                                    iconame = 210104;
                                    break;
                                case "科技教育":
                                    iconame = 130101;
                                    break;
                                case "餐饮连锁":
                                    iconame = 190300;
                                    break;
                                case "旅游观光":
                                    iconame = 170100;
                                    break;
                                case "日常服务":
                                    iconame = 231200;
                                    break;
                                case "市政网点":
                                    iconame = 240100;
                                    break;
                                case "文化体育":
                                    iconame = 150800;
                                    break;
                                case "医疗卫生":
                                    iconame = 140100;
                                    break;
                                case "邮政通信":
                                    iconame = 220100;
                                    break;
                                case "政府机关":
                                    iconame = 120100;
                                    break;
                                case "知名企事业":
                                    iconame = 250200;
                                    break;
                                default:
                                    iconame = 231200;
                                    break;
                            }
                            let iconameurl = `${baseUrl.config}images/mark/` + iconame + '.png';
                            entity.billboard = new Cesium.BillboardGraphics({
                                position: entity.position.getValue(), //Cesium.Cartesian3.fromDegrees(entity.position[0], entity.position[1],250),
                                image: encodeURI(iconameurl), //'./config/images/mark/250000.png',
                                scale: 1, //原始大小的缩放比例
                                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                heightReference: Cesium.HeightReference.NONE,
                                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 8.0e6, 0.2),
                                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 500000),
                                disableDepthTestDistance: Number.POSITIVE_INFINITY
                            })
                            entity.label = new Cesium.LabelGraphics({
                                position: entity.position.getValue(), //Cesium.Cartesian3.fromDegrees(entity.position[0], entity.position[1],250),//entity.position.getValue(),//Cesium.Cartesian3.fromDegrees(cartOld.longitude, cartOld.longitude,newHeight),
                                text: entity._properties.bzmc._value,
                                font: 'normal small-caps normal ' + fontsize + 'px  微软雅黑',
                                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                                fillColor: Cesium.Color.WHITE,
                                outlineColor: Cesium.Color.BLACK,
                                outlineWidth: 5,
                                showBackground: false,
                                horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                pixelOffset: new Cesium.Cartesian2(13, 5), //偏移量  
                                heightReference: Cesium.HeightReference.NONE,
                                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 500000)
                            })
                            dlp_poi.entities.add(entity);
                        });


                        dlp_poi.clustering.enabled = true;
                        dlp_poi.clustering.pixelRange = 30; //多少像素矩形范围内聚合
                        dlp_poi.clustering.minimumClusterSize = 2; //

                        let singleDigitPins = {};
                        let pinBuilder = new Cesium.PinBuilder();
                        dlp_poi.clustering.clusterEvent.addEventListener(function (clusteredEntities, cluster) {
                            let count = clusteredEntities.length;

                            cluster.label.show = false;
                            cluster.billboard.show = false;
                            cluster.billboard.id = cluster.label.id;
                            cluster.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;
                            cluster.billboard.heightReference = Cesium.HeightReference.CLAMP_TO_GROUND; //贴地

                            if (!singleDigitPins[count]) {
                                singleDigitPins[count] = pinBuilder.fromText(count, Cesium.Color.BLUE, 48).toDataURL();
                            }
                            cluster.billboard.image = singleDigitPins[count];
                        });
                    }
                } else {
                    return;
                }
            },
            error: function (err) {
                console.error('queryMapserver.query')
                console.error(err);
            }
        })
    }

    //移除深圳三维电子底图数据
    _removeReality() {
        const {
            reality: {
                sz_road
            }
        } = this.motherBoard

        return new Promise((resolve, reject) => {
            this._removeDistrict()
            .then(() => {
                return this._removeSzYX()
            })
            .then(() => {
                return this._removeDistrictZhuji()
            })
            .then(() => {
                return this._removeSzData(sz_road)
            })
            .then(() => {
                return this._removeOSGB()
            })
            .then(() => {
                return this._removeMonomerModel()
            })
            .then(() => {
                resolve()
            })

        })
    }

    //   移除深圳行政区域线
    _removeDistrict() {
        const {
            storedData
        } = this.state
        return new Promise((resolve, reject) => {
            if (storedData["district"]) {
                this.viewer.dataSources.remove(storedData["district"][0], true);
                this.viewer.entities.remove(storedData["district"][1], true);
            }
            resolve()
        })
    }
    //   移除深圳影像
    _removeSzYX() {
        const {
            storedData
        } = this.state
        return new Promise((resolve, reject) => {
            storedData['sz_yx'] && this.viewer.imageryLayers.remove(storedData['sz_yx'])
            resolve()
        })
    }

    //   移除深圳注迹
    _removeDistrictZhuji() {
        const {
            storedData
        } = this.state
        return new Promise((resolve, reject) => {
            storedData["sz_district_zhuji"] && this.viewer.dataSources.remove(storedData["sz_district_zhuji"], true)
            resolve()
        })
    }


    _removeSzData(item) {
        const {
            storedData,
            szdlx_handler
        } = this.state
        return new Promise((resolve, reject) => {
            window.removeEventListener('mousemove', szdlx_handler); //先移除事件监听
            storedData[item.key] && storedData[item.key].forEach(v => {
                this.viewer.dataSources.remove(v, true);
            })
            storedData['dlmzj'] && this.viewer.scene.primitives.remove(storedData['dlmzj']);
            resolve()
        })
    }

    // 移除倾斜摄影
    _removeOSGB() {
        const {
            storedData
        } = this.state
        return new Promise((resolve, rejeect) => {

            storedData["osgb"] && this.viewer.scene.primitives.remove(storedData["osgb"])
            resolve()
        })
    }

    // 移除三维实景
    _removeMonomerModel() {
        const {
            storedData
        } = this.state;
        const {
            MonomerizationList,
            T3DTilesetList,
            nowTilesetList
        } = window;
        return new Promise((resolve, rejeect) => {
            //倾斜摄影单体化 隐藏
            MonomerizationList && MonomerizationList.forEach((data) => {
                if (data.cesium3DTileset != undefined) {
                    data.divpoint.visible = false;
                    data.cesium3DTileset.show = false;
                }
            })
            //室内模型 隐藏
            T3DTilesetList && T3DTilesetList.forEach((Indoor) => {
                Indoor.divpoint.visible = false;
                Indoor.cesium3DTileset.show = false;
            });
            //关闭 压平
            nowTilesetList && nowTilesetList.forEach((flatten) => {
                flatten.tilesflatten.destroy();
            });


            storedData.Handler && storedData.Handler.destroy();
            resolve()
        })
    }



    // 添加白膜
    _addWhiteModel(item) {
        let {
            storedData
        } = this.state
        const viewer = this.viewer
        return new Promise((resolve, reject) => {
            let floor = item.floor
            let cesium3DTileset = new Cesium.Cesium3DTileset({
                url: item.url,
                maximumScreenSpaceError: 16,
                maximumMemoryUsage: 4000,
                preferLeaves: false,
                skipLevelOfDetail: true,
                skipLevels: 1,
                skipScreenSpaceErrorFactor: 16,
                immediatelyLoadDesiredLevelOfDetail: false,
                loadSiblings: true,
                cullWithChildrenBounds: true,
                cullRequestsWhileMoving: true,
                cullRequestsWhileMovingMultiplier: 0.01,
                preloadWhenHidden: true,
                progressiveResolutionHeightFraction: 0.1,
                dynamicScreenSpaceErrorDensity: 10000,
                dynamicScreenSpaceErrorFactor: 1,
                dynamicScreenSpaceError: true,
            });
            viewer.scene.primitives.add(cesium3DTileset);
            cesium3DTileset.readyPromise.then(function (tileset) {

                tileset.style = new Cesium.Cesium3DTileStyle({
                    color: {
                        conditions: [
                            // ['true', 'rgb(149, 228, 12)']
                            // ['true', 'rgb(3, 104, 255)']
                            // ['${'+floor+'} > 20', 'color("#D7ECFF", 1)'],
                            // ['${'+floor+'} >= 10', 'color("#D0FFF0", 1)'],
                            // ['${'+floor+'} >= 5', 'color("#FAFAFA", 1)'],
                            ['true', 'color("#fff", 1)']
                        ]
                    }
                });

            })

            this.state.storedData = {
                ...storedData,
                'whiteModel': cesium3DTileset
            }
            resolve()
        })
    }

}

const GetrecExtent = baseMap => {
    let params = {};
    let extend = baseMap.viewer.camera.computeViewRectangle();
    params.xmax = Cesium.Math.toDegrees(extend.east);
    params.ymax = Cesium.Math.toDegrees(extend.north);

    params.xmin = Cesium.Math.toDegrees(extend.west);
    params.ymin = Cesium.Math.toDegrees(extend.south);
    let childRec = turf.polygon([
        [
            [params.xmin, params.ymin],
            [params.xmin, params.ymax],
            [params.xmax, params.ymax],
            [params.xmax, params.ymin],
            [params.xmin, params.ymin]
        ]
    ]);

    return childRec;
}
const getColorRamp = (elevationRamp) => {
    if (elevationRamp == null) {
        elevationRamp = {
            0.0: "blue",
            0.1: "cyan",
            0.37: "lime",
            0.54: "yellow",
            1: "red"
        };
    }
    let ramp = document.createElement('canvas');
    ramp.width = 1;
    ramp.height = 100;
    let ctx = ramp.getContext('2d');
    let grd = ctx.createLinearGradient(0, 0, 0, 100);
    for (let key in elevationRamp) {
        grd.addColorStop(1 - Number(key), elevationRamp[key]);
    }
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 1, 100);
    return ramp;
}

class QueryGeoServer {
    constructor(options) {
        this.options = options || {};

    }

    query(opt) {
        this.lastQueryOpts = opt;

        //请求的wfs参数
        let filter = '<Filter xmlns="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml"><And>';

        //关键字
        if (opt.levelvalue) {

            filter += ` <PropertyIsEqualTo wildCard="*" matchCase="false" singleChar="#" escapeChar="!">
                            <PropertyName>${opt.level}</PropertyName>
                            <Literal>${opt.levelvalue}</Literal>
                        </PropertyIsEqualTo>`

        }

        //限定区域范围 
        if (opt.fwEntity) {
            let drawEntity = opt.fwEntity;
            let coordinates;
            if (drawEntity.type == "Polygon") {
                coordinates = drawEntity.coordinates[0];
            }
            if (drawEntity.polygon) {
                coordinates = vusd.draw.attr.polygon.getCoordinates(drawEntity);
                coordinates.push(coordinates[0]);
            }

            let polygon = "";
            for (let i = 0; i < coordinates.length; i++) {
                polygon += coordinates[i][0] + "," + coordinates[i][1] + " ";
            }
            filter += `<Intersects>
                    <PropertyName>the_geom</PropertyName>
                    <gml:Polygon>
                        <gml:outerBoundaryIs>
                            <gml:LinearRing>
                                <gml:coordinates>${polygon}</gml:coordinates>
                            </gml:LinearRing>
                        </gml:outerBoundaryIs>
                    </gml:Polygon>
                </Intersects>`
        }

        filter += '</And></Filter>';

        let parameters = this.options.parameters;
        parameters.filter = filter;

        let that = this;
        $.ajax({
            url: this.options.url,
            type: "post",
            data: parameters,
            success: function (featureCollection) {
                that.processFeatureCollection(featureCollection, opt);
            },
            error: function (data) {
                let msg = "请求出错(" + data.status + ")：" + data.statusText
                console.log(msg);
                if (opt.error) opt.error(data, msg)
            }
        });
    }




    processFeatureCollection(featureCollection, opt) {
        let that = this;
        if (featureCollection == undefined ||
            featureCollection == null ||
            featureCollection.features == null ||
            featureCollection.features.length == 0) {
            if (opt.success) opt.success({
                list: null,
                dataSource: null,
                count: 0,
            })
        } else {
            //剔除有问题数据 
            let featuresOK = [];
            for (let i = 0; i < featureCollection.features.length; i++) {
                let feature = featureCollection.features[i];
                if (feature == null || feature.geometry == null ||
                    feature.geometry.coordinates == null || feature.geometry.coordinates.length == 0)
                    continue;

                featuresOK.push(feature);
            }
            featureCollection.features = featuresOK;

            let dataSource = Cesium.GeoJsonDataSource.load(featureCollection, {
                clampToGround: true
            });
            dataSource.then(function (dataSource) {

                let arrResult = [];
                let entities = dataSource.entities.values;
                for (let i = 0, len = entities.length; i < len; i++) {
                    let entity = entities[i];

                    //属性
                    let attr = vusd.util.getAttrVal(entity.properties);
                    //attr.name = attr[opt.column]
                    attr._entity = entity;
                    arrResult.push(attr);
                }

                if (opt.success) opt.success({
                    list: arrResult,
                    dataSource: dataSource,

                    count: arrResult.length,

                })

            }).otherwise(function (error) {
                if (opt.error) opt.error(error, error.message)
            });
        }
    }


}