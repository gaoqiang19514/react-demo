class DataHandle {
    viewer = null
    handler = null

    constructor(viewer) {
        this.viewer = viewer
    }

    // 显示几何-列表数据
    addOsgb(url,options={}) {
        return this.add3DModel(url,options)
    }
    removeOsgb(modelPrimitive) {
        this.remove3DModel(modelPrimitive)
    }
    addBim(url,options={}) {
        return this.add3DModel(url,options)
    }
    removeBim(modelPrimitive) {
        this.remove3DModel(modelPrimitive)
    }
    addMax(url,options={}) {
        return this.add3DModel(url,options)
    }
    removeMax(modelPrimitive) {
        this.remove3DModel(modelPrimitive)
    }
    addPointcloud(url,options) {
        return this.add3DModel(url,options)
    }
    removePointcloud(modelPrimitive) {
        this.remove3DModel(modelPrimitive)
    }
    


    add3DModel = (url,options={})=>{
        var _options = $.extend(options,{url:url})
        var cesium3DTileset = new Cesium.Cesium3DTileset(_options)
        this.viewer.scene.primitives.add(cesium3DTileset)
        return cesium3DTileset
    }

    remove3DModel = (modelPrimitive)=>{
        if(modelPrimitive){
            this.viewer.scene.primitives.remove(modelPrimitive)
        }
    }

}