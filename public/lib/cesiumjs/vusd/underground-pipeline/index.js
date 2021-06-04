const config = '/lib/cesiumjs/vusd/config/'

const imgturang = config + 'images/turangt.png';
const excavate = config + 'images/excavate_bottom_min.jpg';
const imgditu = config + 'images/dizhi.png';


class UndergroundPipeline {
    groundOpacity = 1.0
    underGround
    isOpenRoller = false //是否开启卷帘
    urlforqxsy = null; //倾斜摄影url，剪裁倾斜摄影时用
    dzurl
    RollerblindList
    Rollerblindcamera
    isdrawing = false
    numdeep = 50
    terrainClipPlan
    tilesClip
    tilesdzClip
    constructor(viewer) {
        this.viewer = viewer
        this.initData()
    }

    initData() {
        $.get(`${config}/urlforqxsy.json`, result => {
            this.urlforqxsy = result[0].qxurl;
            this.dzurl = result[0].dzurl;
            this.RollerblindList = result[0].RollerblindList;
            this.Rollerblindcamera = result[0].Rollerblindcamera;
        })
    }

    // 俯视图
    overView() {
        const viewer = this.viewer
        const result = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(viewer.canvas.clientWidth / 2, viewer.canvas
            .clientHeight / 2));

        const curPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(result);

        const lon = curPosition.longitude * 180 / Math.PI;
        const lat = curPosition.latitude * 180 / Math.PI;

        viewer.scene.camera.setView({

            destination: Cesium.Cartesian3.fromDegrees(lon, lat, 500),
            orientation: {
                heading: Cesium.Math.toRadians(0.6),
                pitch: Cesium.Math.toRadians(-88.5),
                roll: 0
            }
        });
    }

    // 地下视图
    underView() {
        const viewer = this.viewer
        const result = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(viewer.canvas.clientWidth / 2, viewer.canvas
            .clientHeight / 2));
        const curPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(result);
        const lon = curPosition.longitude * 180 / Math.PI;
        const lat = curPosition.latitude * 180 / Math.PI;
        viewer.scene.camera.setView({
            destination: Cesium.Cartesian3.fromDegrees(lon, lat, -5),
            orientation: {
                heading: Cesium.Math.toRadians(17.5),
                pitch: Cesium.Math.toRadians(8.7),
                roll: 0.1
            }
        });
    }

    // 更改地表透明度 (参数限制  0<=val<=1)
    changeGroundOpacity(val = 1) {
        let value = parseFloat(val)
        if (val > 1) {
            val = 1
        } else if (val < 0) {
            val = 0
        }

        this.groundOpacity = value
        const viewer = this.viewer

        if (!this.underGround) {
            viewer.scene.globe.depthTestAgainstTerrain = true;
            viewer.scene.globe.baseColor = new Cesium.Color(0, 0, 0, 0);
            this.underGround = new vusd.analysi.Underground(viewer, {
                alpha: value,
                enable: false
            });

        } else {
            this.underGround.alpha = value;
            if (this.underGround.alpha == 1.0) {
                this.underGround.enable = false;
            } else {
                this.underGround.enable = true;
            }
        }
        //同步调整倾斜摄影的透明度
        let tileset;

        for (let i = 0; i <= viewer.scene.primitives._primitives.length - 1; i++) {

            if (viewer.scene.primitives._primitives[i].url == this.urlforqxsy && viewer.scene.primitives._primitives[i].show) {
                tileset = viewer.scene.primitives._primitives[i];
            }
        }

        if (tileset) {
            tileset.style = new Cesium.Cesium3DTileStyle({
                color: "color() *vec4(1,1,1," + value + ")"
            });
        }
    }

    // 卷帘开启关闭
    toggleRoller(isOpenRoller) {
        const viewer = this.viewer
        viewer.scene.globe.enableSceneSplit = isOpenRoller
        for (let i = 0; i < this.RollerblindList.length; i++) {
            let url = this.RollerblindList[i]
            let Tiles = this.getModelbyurl(url)

            if (Tiles) {
                Tiles.enableSceneSplit = isOpenRoller
            }
        }
        viewer.scene.skyAtmosphere.show = !isOpenRoller
        if (isOpenRoller) {
            viewer.scene.skyAtmosphere.show = false
        } else {
            viewer.scene.skyAtmosphere.show = true
        }
    }

    // 画矩形
    draw(type, deepth = 50) {
        this.clearData()
        const viewer = this.viewer
        this.numdeep = deepth
        this._initTerrainClipPlan()
        if (type === 'pipeline') {
            this.isdrawing = true;
            viewer.vusd.draw.startDraw({
                type: 'rectangle',
                style: {
                    color: '#007be6',
                    opacity: 0.8,
                    outline: false,
                    clampToGround: true
                },
                success: entity => {
                    this.isdrawing = false;
                    let positions = vusd.draw.attr.rectangle.getOutlinePositions(entity, true);
                    let tilesettmp = vusd.tileset.pick3DTileset(viewer, positions);
                    let tileset;

                    for (let i = 0; i <= viewer.scene.primitives._primitives.length - 1; i++) {
                        if (viewer.scene.primitives._primitives[i].url == this.urlforqxsy && viewer.scene.primitives._primitives[i].show) {
                            tileset = viewer.scene.primitives._primitives[i];
                        }
                    }

                    this.terrainClipPlan.transparent = false;

                    if (tileset && tilesettmp && (tilesettmp.url == this.urlforqxsy)) {              
                        this.tilesClip = new vusd.tiles.TilesClipPlan(tileset);
                        this.tilesClip.clipByPoints(positions, {
                            unionClippingRegions: false
                        });
                    }
                    viewer.vusd.draw.deleteAll();
                    this.terrainClipPlan.clear();
                    this.terrainClipPlan.height = this.numdeep;
                    this.terrainClipPlan.updateData(positions);
                }
            });
        } else if (type === 'geology') {
            this.isdrawing = true;
            viewer.vusd.draw.startDraw({
                type: 'rectangle',
                style: {
                    color: '#007be6',
                    opacity: 0.8,
                    outline: false,
                    clampToGround: true
                },
                success: entity => {
                    this.isdrawing = false;
                    let positions = vusd.draw.attr.rectangle.getOutlinePositions(entity, true);

                    var polygon_height = (-this.numdeep);
                    let dztileset = this.nowprimitive;
                    let twopositions = viewer.vusd.draw.getPositions(entity);
                    let modelpositions = vusd.pointconvert.cartesians2lonlats(twopositions);

                    let minHeight = 1000000;
                    for (let i = 0; i < modelpositions.length; i++) {
                        let Height = modelpositions[i][2];
                        if (Height < minHeight) {
                            minHeight = Height;
                        }
                    }
                    if ((this.numdeep < minHeight) && this.numdeep < 0) {
                        polygon_height = minHeight;
                    }

                    this.terrainClipPlan.transparent = false;
                    //if (dztileset && tilesettmp) {
                    if (dztileset) {
                        this.tilesdzClip = new vusd.tiles.TilesClipPlan(dztileset, {
                            distance: 10.0
                        });
                        this.tilesdzClip.clipByPoints(positions, {
                            unionClippingRegions: isdizhineiwa
                        });
                        terrainClipPlan.transparent = true;
                        let tiediPolygon = viewer.entities.add({
                            name: '地质图片',
                            polygon: {
                                hierarchy: positions,
                                height: polygon_height,
                                material: new Cesium.ImageMaterialProperty({ //图片材质
                                    image: excavate,
                                })
                            }
                        });
                    }
                    viewer.vusd.draw.deleteAll();
                }
            });
        }
    }

    // 清除绘画数据
    clearData = () => {
        if (this.terrainClipPlan) {
            this.terrainClipPlan.clear();
        }
        if (this.tilesClip) {
            this.tilesClip.clear();
        }
        if (this.tilesdzClip) {
            this.tilesdzClip.clear();
        }
        this.viewer.vusd.popup.close();
    };
    getModelbyurl(url) {
        let primitives = this.viewer.scene.primitives._primitives;
        return primitives.find(item => item.url === url);
    }
    _initTerrainClipPlan() {
        this.terrainClipPlan = new vusd.analysi.TerrainClipPlan(this.viewer, {
            height: this.numdeep, //高度
            splitNum: 50, //wall边界插值数
            wallImg: imgturang,
            bottomImg: imgditu
        });
    }
}