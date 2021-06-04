const baseUrl2 = {
    districtMultPolyline: `/visualization/data/json/sz_distinct_part_line2.geojson`,
    shenZhenWall: `/visualization/data/json/shenzhen_coor_array.json`,
    config: '/lib/cesiumjs/vusd/config/',
    util: '/lib/cesiumjs/vusd/util/',
}

class POI{
    dlp_poi
    constructor(viewer){
        this.viewer = viewer
        
    }
    addPOI(level, sz_poi, dlp_poi) {
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

        var queryMapserver = new QueryGeoServe(sourcejson.WFSdatasource);

        queryMapserver.query({
            level: levelfield,
            levelvalue: querylevel,
            fwEntity: this._getrecExtent().geometry,
            success: (result) => {
                
                if (result.dataSource) {

                    if (result.dataSource.entities.values.length > 0) {
                        dlp_poi.entities.removeAll();

                        let entities = result.dataSource.entities.values;
                        entities.map(entity => {
                            var ellipsoid = this.viewer.scene.globe.ellipsoid
                            var cartographic_old = ellipsoid.cartesianToCartographic(entity.position._value)
                            var lat = Cesium.Math.toDegrees(cartographic_old.latitude)
                            var lng = Cesium.Math.toDegrees(cartographic_old.longitude)
                            var alt_old = cartographic_old.height
                            var alt_new = alt_old + entity._properties.maxhei._value + 30
                            var cartographic_new = Cesium.Cartographic.fromDegrees(lng, lat, alt_new)
                            entity.position = ellipsoid.cartographicToCartesian(cartographic_new)
                            var iconame;
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
                            var iconameurl = `${baseUrl2.config}images/mark/` + iconame + '.png';
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

                        var singleDigitPins = {};
                        var pinBuilder = new Cesium.PinBuilder();
                        dlp_poi.clustering.clusterEvent.addEventListener(function (clusteredEntities, cluster) {
                            var count = clusteredEntities.length;

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
    removePOI(){
        return new Promise(reslove=>{
            if (this.dlp_poi) {
                this.dlp_poi.entities.removeAll()
                this.viewer.dataSources.remove(this.dlp_poi)
            }
            reslove()
        })
    }
    _getrecExtent() {
        let params = {};
        let extend = this.viewer.camera.computeViewRectangle();
        params.xmax = Cesium.Math.toDegrees(extend.east);
        params.ymax = Cesium.Math.toDegrees(extend.north);
    
        params.xmin = Cesium.Math.toDegrees(extend.west);
        params.ymin = Cesium.Math.toDegrees(extend.south);
        var childRec = turf.polygon([
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
}

class QueryGeoServe {
    constructor(options) {
        this.options = options || {};

    }

    query(opt) {
        this.lastQueryOpts = opt;

        //请求的wfs参数
        var filter = '<Filter xmlns="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml"><And>';

        //关键字
        if (opt.levelvalue) {

            filter += ` <PropertyIsEqualTo wildCard="*" matchCase="false" singleChar="#" escapeChar="!">
                            <PropertyName>${opt.level}</PropertyName>
                            <Literal>${opt.levelvalue}</Literal>
                        </PropertyIsEqualTo>`

        }

        //限定区域范围 
        if (opt.fwEntity) {
            var drawEntity = opt.fwEntity;
            var coordinates;
            if (drawEntity.type == "Polygon") {
                coordinates = drawEntity.coordinates[0];
            }
            if (drawEntity.polygon) {
                coordinates = vusd.draw.attr.polygon.getCoordinates(drawEntity);
                coordinates.push(coordinates[0]);
            }

            var polygon = "";
            for (var i = 0; i < coordinates.length; i++) {
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

        var parameters = this.options.parameters;
        parameters.filter = filter;

        var that = this;
        $.ajax({
            url: this.options.url,
            type: "post",
            data: parameters,
            success: function (featureCollection) {
                that.processFeatureCollection(featureCollection, opt);
            },
            error: function (data) {
                var msg = "请求出错(" + data.status + ")：" + data.statusText
                console.log(msg);
                if (opt.error) opt.error(data, msg)
            }
        });
    }




    processFeatureCollection(featureCollection, opt) {
        var that = this;
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
            var featuresOK = [];
            for (var i = 0; i < featureCollection.features.length; i++) {
                var feature = featureCollection.features[i];
                if (feature == null || feature.geometry == null ||
                    feature.geometry.coordinates == null || feature.geometry.coordinates.length == 0)
                    continue;

                featuresOK.push(feature);
            }
            
            featureCollection.features = featuresOK;

            var dataSource = Cesium.GeoJsonDataSource.load(featureCollection, {
                clampToGround: true
            });
            dataSource.then(function (dataSource) {

                var arrResult = [];
                var entities = dataSource.entities.values;
                for (var i = 0, len = entities.length; i < len; i++) {
                    var entity = entities[i];

                    //属性
                    var attr = vusd.util.getAttrVal(entity.properties);
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