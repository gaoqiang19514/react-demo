/* 2020-10-9 11:57:13  */
//第三方类库加载管理js，方便切换lib
(function () {
    var r = new RegExp("(^|(.*?\\/))(include-lib\.js)(\\?|$)"),
        s = document.getElementsByTagName('script'), targetScript;
    for (var i = 0; i < s.length; i++) {
        var src = s[i].getAttribute('src');
        if (src) {
            var m = src.match(r);
            if (m) {
                targetScript = s[i];
                break;
            }
        }
    }

    //版本号,用于官网标题处版本号
    window.vsud3d_version = "1.0.0"


    // cssExpr 用于判断资源是否是css
    var cssExpr = new RegExp('\\.css');

    function inputLibs(list) {
        if (list == null || list.length == 0) return;

        for (var i = 0, len = list.length; i < len; i++) {
            var url = list[i];
            if (cssExpr.test(url)) {
                var css = '<link rel="stylesheet" href="' + url + '">';
                document.writeln(css);
            } else {
                var script = '<script type="text/javascript" src="' + url + '"><' + '/script>';
                document.writeln(script);
            }
        }
    }

    //加载类库资源文件
    function load() {
        var arrInclude = (targetScript.getAttribute('include') || "").split(",");
        var libpath = (targetScript.getAttribute('libpath') || "");

        if (libpath.lastIndexOf('/') != libpath.length - 1)
            libpath += "/";

        var libsConfig = {
            'dataHandle': [
                libpath + "cesiumjs/vusd/datahandle/index.js",
            ],
            'Building': [
                libpath + "cesiumjs/vusd/building/index.js",
            ],
            'UndergroundPipeline': [
                libpath + "cesiumjs/vusd/underground-pipeline/index.js",
            ],
            'BaseMap': [
                libpath + "cesiumjs/vusd/base-map/index.js",
            ],
            'POI': [
                libpath + "cesiumjs/vusd/poi/index.js",
            ],
            'weather': [
                libpath + "cesiumjs/vusd/weather/index.js",
            ],
            'jquery': [
                libpath + "jquery/jquery-2.1.4.min.js",
            ],
            'jquery.scrollTo': [
                libpath + "jquery/scrollTo/jquery.scrollTo.min.js",
            ],
            'jquery.minicolors': [
                libpath + "jquery/minicolors/jquery.minicolors.css",
                libpath + "jquery/minicolors/jquery.minicolors.min.js",
            ],
            'jquery.range': [
                libpath + "jquery/range/range.css",
                libpath + "jquery/range/range.js",
            ],
            'ztree': [
                libpath + "jquery/ztree/css/zTreeStyle/zTreeStyle.css",
                libpath + "jquery/ztree/css/mars/ztree-mars.css",
                libpath + "jquery/ztree/js/jquery.ztree.all.min.js",
            ],
            'jstree': [
                libpath + "jstree/themes/default-dark/style.css",
                libpath + "jstree/jstree.min.js",
            ],
            'jquery.mCustomScrollbar': [
                libpath + "jquery/mCustomScrollbar/jquery.mCustomScrollbar.css",
                libpath + "jquery/mCustomScrollbar/jquery.mCustomScrollbar.js",
            ],
            'jedate': [
                libpath + "jquery/jedate/skin/jedate.css",
                libpath + "jquery/jedate/jedate.js",
            ],
            'lazyload': [
                libpath + "jquery/lazyload/jquery.lazyload.min.js",
            ],
            'font-awesome': [
                libpath + "fonts/font-awesome/css/font-awesome.min.css",
            ],
            'font-marsgis': [
                libpath + "fonts/marsgis/iconfont.css",
            ],
            'web-icons': [
                libpath + "fonts/web-icons/web-icons.css",
            ],
            'animate': [
                libpath + "animate/animate.css",
            ],
            'admui': [
                libpath + "admui/css/index.css",
                libpath + "admui/js/global/core.js", //核心
                libpath + "admui/js/global/configs/site-configs.js",
                libpath + "admui/js/global/components.js",
            ],
            'admui-frame': [
                libpath + "admui/css/site.css",
                libpath + "admui/js/app.js",
            ],
            'bootstrap': [
                libpath + "bootstrap/bootstrap.css",
                libpath + "bootstrap/bootstrap.min.js",
            ],
            'bootstrap-table': [
                libpath + "bootstrap/bootstrap-table/bootstrap-table.css",
                libpath + "bootstrap/bootstrap-table/bootstrap-table.min.js",
                libpath + "bootstrap/bootstrap-table/locale/bootstrap-table-zh-CN.js"
            ],
            'bootstrap-select': [
                libpath + "bootstrap/bootstrap-select/bootstrap-select.css",
                libpath + "bootstrap/bootstrap-select/bootstrap-select.min.js",
            ],
            'bootstrap-checkbox': [
                libpath + "bootstrap/bootstrap-checkbox/awesome-bootstrap-checkbox.css",
            ],
            'nprogress': [
                libpath + "nprogress/nprogress.css",
                libpath + "nprogress/nprogress.min.js",
            ],
            'toastr': [
                libpath + "toastr/toastr.css",
                libpath + "toastr/toastr.js",
            ],
            'formvalidation': [
                libpath + "formvalidation/formValidation.css",
                libpath + "formvalidation/formValidation.min.js",
                libpath + "formvalidation/framework/bootstrap.min.js",
                libpath + "formvalidation/language/zh_CN.min.js",
            ],
            'admin-lte': [
                libpath + "fonts/font-awesome/css/font-awesome.min.css",
                libpath + "admin-lte/css/AdminLTE.min.css",
                libpath + "admin-lte/css/skins/skin-blue.min.css",
                libpath + "admin-lte/js/adminlte.min.js"
            ],
            'ace': [
                libpath + "ace/ace.js"
            ],
            'layer': [
                libpath + "layer/theme/default/layer.css",
                libpath + "layer/theme/retina/retina.css",
                libpath + "layer/theme/mars/layer.css",
                libpath + "layer/layer.js"
            ],
            'haoutil': [
                libpath + "hao/haoutil.js",
                libpath + "hao/loading/loading.css",
                libpath + "hao/loading/loading.js",
            ],
            'echarts': [
                libpath + "echarts/echarts.min.js",
                libpath + "echarts/dark.js"
            ],
            'echarts-gl': [
                libpath + "echarts/echarts.min.js",
                libpath + "echarts/echarts-gl.min.js"
            ],
            'echarts-forleaflet': [
                libpath + "echarts/forleaflet/echarts-3.4.min.js",
            ],
            'mapV': [
                libpath + "mapV/mapv.min.js",
            ],
            'highlight': [
                libpath + "highlight/styles/foundation.css",
                libpath + "highlight/highlight.pack.js"
            ],
            'turf': [
                libpath + "turf/turf.min.js"
            ],

            'esri-leaflet': [ //arcgis服务支持插件
                libpath + "leafletjs/plugins/esri/esri-leaflet.js"
            ],
            'leaflet-wfs': [//geoserver wfs 支持插件
                libpath + "leafletjs/plugins/wfs/leaflet-wfs.js"
            ],

            "mars2d-echarts": [
                libpath + "echarts/forleaflet/echarts-3.4.min.js",
                libpath + "leafletjs/plugins/visual/mars2d-visual.js"//echarts与mapV支持插件
            ],
            'mars2d-mapv': [
                libpath + "mapV/mapv.min.js",
                libpath + "leafletjs/plugins/visual/mars2d-visual.js"//echarts与mapV支持插件
            ],

            'mars2d': [//地图 主库
                libpath + "leafletjs/leaflet/leaflet.css",    //leaflet
                libpath + "leafletjs/leaflet/leaflet.js",

                libpath + "leafletjs/mars2d/mars2d.css", //mars2d
                libpath + "leafletjs/mars2d/mars2d.js",
		libpath + "leafletjs/plugins/_controls/locate.js",   //覆盖内置toolbar的GPS定位方法
            ],
            'terraformer': [
                libpath + "terraformer/terraformer-1.0.9.min.js",
                libpath + "terraformer/terraformer-wkt-parser-1.2.0.min.js",
            ],
            'ammo': [
                libpath + "ammo/ammo.js"
            ],
            'kriging': [
                libpath + "kriging/kriging.min.js"
            ],
            "vusd-visual": [//echarts与mapV支持插件
                libpath + "cesiumjs/plugins/visual/mars3d-visual.js"
            ],
            "mars3d-space": [//卫星插件
                libpath + "cesiumjs/plugins/space/mars3d-space.js"
            ],
            'vusd': [//三维地球“主库”
                libpath + "cesiumjs/Cesium/Widgets/widgets.css", //cesium
                libpath + "cesiumjs/Cesium/Cesium.js",
                libpath + "cesiumjs/plugins/compatible/version.js", //cesium版本兼容处理

                libpath + "cesiumjs/vusd/vusd-src.css", //mars3d
                libpath + "cesiumjs/vusd/vusd-src.js",
                libpath + "cesiumjs/plugins/navigation/mars3d-navigation.css", //导航插件
                libpath + "cesiumjs/plugins/navigation/mars3d-navigation.js",
                libpath + 'config/marsUrl.js' //一些服务地址统一配置
            ],

        };

        for (var i in arrInclude) {
            var key = arrInclude[i];
            inputLibs(libsConfig[key]);
        }

    }

    load();
})();
