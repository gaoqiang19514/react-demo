class Building {
    viewer = null
    handler = null
    distinctEntity = {}
    deps = []
    lastLand = {}
    lastBuilding = {}
    constructor(viewer) {
        this.viewer = viewer
        console.log(this.viewer);

    }
    bindMapClick() {
        const viewer = this.viewer
        this.handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        this.handler.setInputAction(async (event) => {

            let cartesian = vusd.point.getCurrentMousePosition(viewer.scene, event.position);
            var carto = Cesium.Cartographic.fromCartesian(cartesian);
            var point = {};
            point.y = Cesium.Math.toDegrees(carto.latitude).toFixed(6);
            point.x = Cesium.Math.toDegrees(carto.longitude).toFixed(6);
            point.z = carto.height.toFixed(2);

            this.showFeatureByPoint(point)

        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }
    async showFeatureByPoint(point) {
        let landInfo = await this.getParcelByPosition(point.x, point.y)
        let builddingInfo = await this.getBuildingByPosition(point.x, point.y)
        let landData = {}
        let buildingData = {}
        this.viewer.dataSources.removeAll();
        if (landInfo.success && landInfo.data && landInfo.data.length !== 0) {
            let item = landInfo.data[0]
            
            console.log(item.id);

            landData = {
                "show": true,
                "type": "land",
                "id": item.id,
                ...item
            }

            this.deps.forEach(fun => {
                fun(item)
            })
            if (item.id === this.lastLand.id) {
                this.lastLand = {}
            } else {
                this.lastLand = item
                this.showLandFeature(item)
            }
        } else {
            landData = {
                "show": false,
                "type": "land",
                "id": -1,
            }
        }

        if (builddingInfo.success && builddingInfo.data && builddingInfo.data.length !== 0) {
            let item = builddingInfo.data[0]
            
            buildingData = {
                "show": true,
                "type": "land",
                "id": item.id,
                ...item
            }


            this.deps.forEach(fun => {
                fun(item)
            })
            if (this.lastBuilding.id === item.id) {
                this.lastBuilding = {}
            } else {
                this.lastBuilding = item
                this.showBuildFeature(item)
            }
        } else {
            buildingData = {
                "show": false,
                "type": "land",
                "id": -1,
            }
        }


        // this.removeMapClick();

    }
    //移除地图点击事件，清除地图高亮数据
    removeMapClick() {
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
        this.viewer.dataSources.removeAll();
    }

    // 显示几何-列表数据
    async showFeature(feature) {

        const viewer = this.viewer
        if (feature == null) return;

        let buffere = turf.buffer(feature, 2.5, {
            units: 'meters',
            steps: 64
        });

        let dataSource = await viewer.dataSources.add(Cesium.GeoJsonDataSource.load(buffere || feature, {
            clampToGround: true,
            stroke: Cesium.Color.RED.withAlpha(0.0),
            strokeWidth: 3,
            fill: new Cesium.Color.fromCssColorString("#2deaf7").withAlpha(0.0),
        }));

        const newopt = {
            color: "#FF0000",
            width: 3,
            opacity: 1.0,
            lineType: "solid",
            clampToGround: true,
            outline: false
        };

        let entities = dataSource.entities.values;
        entities.forEach(entity => {
            const polyline = vusd.draw.attr.polyline.style2Entity(newopt);
            polyline.positions = vusd.draw.attr.polygon.getPositions(entity);
            if (entity.polygon) {
                entity.polyline = polyline;
            }
        })
        let entity = dataSource.entities.values[0];
        let polyPositions = entity.polygon.hierarchy.getValue().positions;
        let polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions).center;

        let height = 150;
        this.viewer.scene.camera.flyToBoundingSphere(new Cesium.BoundingSphere(polyCenter, height * 3), {
            duration: 2
        });

    }
    // 订阅地图点击事件（参数时一个函数），地图点击时，会调用该函数，传入的参数时点击的地图数据
    mapClick(fun) {
        this.deps.push(fun)
    }
    // 根据街道获取土地数据列表
    async getParcelsByStreet(streetName) {
        let res = await this._ajax('/vb/parcel/parcels?jdName=' + streetName)
        return res
    }

    // 根据街道获取楼宇数据列表
    async getBuildingsByStreet(streetName) {
        let res = await this._ajax('/vb/building/buildings?jdName=' + streetName)
        return res
    }

    // 获取深圳地区数据
    async getAreaList() {
        let res = await this._ajax('/vb/district/list')
        return res
    }


    // 获取土地数据
    async getParcelData(params = {}) {
        let res = await this._ajax('/vb/parcel/stat', params)
        return res
    }

    // 获取楼宇数据
    async getBuildingData(params = {}) {
        let res = await this._ajax('/vb/building/stat', params)
        return res
    }

    // 获取房屋数据
    async getHouseData(params = {}) {
        let res = await this._ajax('/vb/house/stat', params)
        return res
    }
    // 根据坐标获取土地信息(传入：X，Y坐标值)
    async getParcelByPosition(x, y) {
        let res = await this._postJson('/vb/space/range/parcel_entity/searchj', {
            geo: `POINT(${x} ${y})`
        })
        return res
    }
    // 根据坐标获取房屋信息(传入：X，Y坐标值)
    async getBuildingByPosition(x, y) {
        let res = await this._postJson('/vb/space/range/building_entity/searchj', {
            geo: `POINT(${x} ${y})`
        })
        return res
    }
    // 根据土地获取楼宇
    async getBuildingsByParcel(parcelId) {
        let res = await this._ajax('/vb/building/buildings', {
            parcelId: parcelId
        })
        return res
    }
    // 点击地区时，显示地图边界线

    showLandFeature = (item) => {
        const viewer = this.viewer
        let dataSource = new Cesium.CustomDataSource('landj');

        viewer.dataSources.add(dataSource);
        let positions = [];
        let location = {};
        try {
            location = JSON.parse(item.location);

            if (location.type === "MultiPolygon") {
                positions = location.coordinates[0][0];
            } else if (location.type === "Polygon") {
                positions = location.coordinates[0];
            }
        } catch (error) {
            console.log('显示地图边界线错误');

            console.log(item.location);
        }
        dataSource.entities.add({
            polyline: {
                positions: this.coordinatesArrayToCartesianArray(positions),
                material: Cesium.Color.RED.withAlpha(1.0), //Cesium.Color.DIMGRAY.withAlpha(0.8),//Cesium.Color.fromRandom({alpha:1.0})Cesium.Color.DARKGRAY.withAlpha(0.0)
                classificationType: Cesium.ClassificationType.BOTH,
                clampToGround: true,
                width: 2,
            },

        });
    }

    // 点击楼宇时，高亮显示楼宇
    showBuildFeature = (item) => {
        const viewer = this.viewer
        let dataSource = new Cesium.CustomDataSource('buildingj');

        viewer.dataSources.add(dataSource);
        let positions = [];
        let location = {};
        try {
            location = JSON.parse(item.location);
            // hole=JSON.parse(holeGeometry);
            if (location.type === "MultiPolygon") {
                positions = location.coordinates[0][0];
            } else if (location.type === "Polygon") {
                positions = location.coordinates[0];
            }
        } catch (error) {
            console.log(item.location);
        }
        dataSource.entities.add({
            polygon: {
                hierarchy: {
                    positions: this.coordinatesArrayToCartesianArray(positions),
                },
                material: Cesium.Color.fromCssColorString("#FEC205").withAlpha(0.6), //Cesium.Color.DIMGRAY.withAlpha(0.8),//Cesium.Color.fromRandom({alpha:1.0})Cesium.Color.DARKGRAY.withAlpha(0.0)
                classificationType: Cesium.ClassificationType.BOTH,
                clampToGround: true,
                width: 2,
            },
        });
    }
    coordinatesArrayToCartesianArray(coordinates) {
        let positions = new Array(coordinates.length);
        for (let i = 0; i < coordinates.length; i++) {
            let coord = coordinates[i];
            positions[i] = Cesium.Cartesian3.fromDegrees(coord[0], coord[1])
        }
        return positions;
    }
    coordinatesArrayToCartesianArray(coordinates) {
        let positions = new Array(coordinates.length);
        for (let i = 0; i < coordinates.length; i++) {
            let coord = coordinates[i];
            positions[i] = Cesium.Cartesian3.fromDegrees(coord[0], coord[1])
        }
        return positions;
    }
    _ajax(url, data = {}) {
        return new Promise(resolve => [
            $.get(url, data, reslut => {
                resolve(reslut)
            })
        ])
    }
    _postJson(url, data) {
        return new Promise(resolve => [
            $.ajax({
                contentType: "application/json",
                dataType: "json",
                type: "POST",
                data: JSON.stringify(data),
                url: url,
                success: resp => {
                    resolve(resp)
                }
            })
        ])
    }
    async _loadStreetDistinct(url) {
        let options = {
            clampToGround: true //开启贴地
        };
        let dataSource = await Cesium.GeoJsonDataSource.load(url, options);
        this.viewer.dataSources.add(dataSource);

        const entities = dataSource.entities.values;
        entities.forEach(entity => {
            entity.polyline.width = 3;
            entity.polyline.material = new Cesium.PolylineGlowMaterialProperty({
                glowPower: .6,
                color: Cesium.Color.fromCssColorString('#1694E7').withAlpha(.9)
            })
        })
    }

    //区边界polygon-geojson.1、初始隐藏；2、区定位时显示对应区
    async loadStreetPolygon(item) {

        Object.keys(this.distinctEntity).forEach(name => {
            this.distinctEntity[name].show = false
        })

        if (this.distinctEntity[item.name]) {
            this.distinctEntity[item.name].show = true
        } else {
            let url = JSON.parse(item.geometry)

            let options = {
                clampToGround: true, //开启贴地
                stroke: new Cesium.Color.fromCssColorString("#8EE0F8"),
                fill: new Cesium.Color.fromCssColorString("#8EE0F8"),
                strokeWidth: 2,
            };
            let dataSource = await Cesium.GeoJsonDataSource.load(url, options);
            this.distinctEntity[item.name] = dataSource
            this.viewer.dataSources.add(dataSource);

            const entities = dataSource.entities.values;


            entities.forEach(entity => {
                if (entity.polygon) {
                    entity.polygon.material = Cesium.Color.WHITE.withAlpha(0.01);
                    entity.polygon.outline = false;
                    entity.polygon.clampToGround = true;
                    entity.polygon.classificationType = Cesium.ClassificationType.BOTH;
                }
            })
        }

        let targetBbox = item.minLongitude ? [item.minLongitude, item.minLatitude, item.maxLongitude, item.maxLatitude] : false;
        this.flyTo(targetBbox)
    }
    flyTo(bbox) {
        if (bbox) {
            let rectangle = Cesium.Rectangle.fromDegrees(bbox[0], bbox[1], bbox[2], bbox[3]);
            this.viewer.camera.flyTo({
                destination: rectangle
            })
        } else {
            const centeropt = {
                "x": 114.20072733826392,
                "y": 21.91020742784782,
                "z": 73919.87093563561,
                "heading": 360,
                "pitch": -45.21508735245907,
                "roll": 360
            };
            const height = centeropt.z || 2500;
            this.viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(centeropt.x, centeropt.y, height), //经度、纬度、高度
                orientation: {
                    heading: Cesium.Math.toRadians(centeropt.heading || 0), //绕垂直于地心的轴旋转
                    pitch: Cesium.Math.toRadians(centeropt.pitch || -90), //绕纬度线旋转
                    roll: Cesium.Math.toRadians(centeropt.roll || 0) //绕经度线旋转
                },
                duration: 2
            });
        }
    }
    // 定位到高亮楼宇
    flyByProp(properties) {
        const viewer = this.viewer
        viewer.vusd.popup.removeFeatureForImageryLayer(); //feature 统一放在mars中加载
        let geojsonObj = {};
        geojsonObj.type = "Feature";
        geojsonObj.geometry = JSON.parse(properties.location);
        geojsonObj.properties = properties.attributes
        this.showFeature(geojsonObj);
    }
}