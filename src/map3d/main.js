import {
    getMapConfig
} from "../config/map";

var viewer;
//地图创建
export function createMap(id, fun) {
    getMapConfig().then(data => {
        initMapContainer(id, data, fun);

    });

}

function initMapContainer(id, config, fun) {
    if (window.mars3d == null) {
        setTimeout(() => {
            initMapContainer(config);
        }, 200);
        return;
    }
    SupermapS3m = supmapExtension();
    var viewer = mars3d.createMap({
        id: "cesiumContainer",
        data: config.map3d,
        serverURL: config.serverURL,
        layerToMap: layerToMap
    });
    window.viewer = viewer;

    navigationHelpButtonCHE(viewer);

    // 此处可更改nav里按钮样式

    //取消双击事件
    viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    viewer.mars.openFlyAnimation(function() {
        if (fun) {
            fun();
        }
    });
}

var SupermapS3m = supmapExtension();

function supmapExtension() {
    var _vueComponent = this;
    return mars3d.layer.BaseLayer.extend({
        model: null,
        //添加
        add: function() {
            if (this.model) {
                for (var i in this.model) {
                    this.model[i].visible = true;
                }
            } else {
                this.initData();
            }
        },
        isArray: function(obj) {
            return typeof obj == "object" && obj.constructor == Array;
        },
        //移除
        remove: function() {
            if (this.model) {
                for (var i in this.model) {
                    this.model[i].visible = false;
                }
            }
        },
        //定位至数据区域
        centerAt: function(duration) {
            if (this.config.extent || this.config.center) {
                this.viewer.mars.centerAt(
                    this.config.extent || this.config.center, {
                        duration: duration,
                        isWgs84: true
                    }
                );
            }
        },
        hasOpacity: true,
        //设置透明度
        setOpacity: function(value) {
            if (this.model) {
                for (var i = 0; i < this.model.length; i++) {
                    var item = this.model[i];
                    if (item == null) continue;

                    item.style3D.fillForeColor.alpha = value;
                }
            }
        },
        initData: function() {
            var that = this;

            //场景添加S3M图层服务
            var promise;
            if (this.config.layername) {
                promise = this.viewer.scene.addS3MTilesLayerByScp(this.config.url, {
                    name: this.config.layername
                });
            } else {
                promise = this.viewer.scene.open(this.config.url);
            }

            Cesium.when(
                promise,
                function(layer) {
                    if (that.isArray(layer))
                        that.model = layer;
                    else
                        that.model = [layer];


                    //设置图层属性
                    if (that.config.s3mOptions) {
                        for (var i = 0; i < that.model.length; i++) {
                            var item = that.model[i];
                            if (item == null) continue;

                            for (var key in that.config.s3mOptions) {
                                item[key] = that.config.s3mOptions[key];
                            }
                        }
                    }

                    //裁剪 
                    // var regions = [[
                    //     116.655295,40.274009,37.09,116.660735,40.299097,40.5,116.670239,40.317834,39.72,116.670718,40.329082,36.44,116.685714,40.330334,42.51,116.689075,40.316133,45.28,116.679358,40.29879,42.98,116.674651,40.275223,33.84,116.67759,40.262776,41.37,116.659386,40.26475,33.47,116.655295,40.274009,37.09
                    // ]]; 
                    // for (var layer of layers) {
                    //     layer.selectEnabled = false; 
                    //     layer.clipLineColor = new Cesium.Color(1, 1, 1, 0);// 设置被裁剪对象的颜色
                    //     layer.setModifyRegions(regions, Cesium.ModifyRegionMode.CLIP_OUTSIDE);
                    // }


                    if (!that.viewer.mars.isFlyAnimation() && that.config.flyTo) {
                        that.centerAt(0);
                    }

                    if (that.config.dataUrl) {
                        for (var i = 0; i < layer.length; i++) {
                            var ql = layer[i];

                            //读取子图层信息，通过数组的方式返回子图层的名称以及子图层所包含的对象的IDs
                            ql.setQueryParameter({
                                url: that.config.dataUrl,
                                dataSourceName: ql.name.split("@")[1],
                                dataSetName: ql.name.split("@")[0],
                                isMerge: true
                            });

                            ql.selectEnabled = true;
                        }
                    }
                }.bind(this),
                function(e) {
                    showError("渲染时发生错误，已停止渲染。", e);
                }
            );
        }
    });
}

function layerToMap(item, viewer, layer) {
    if (item.type == "supermap_s3m") {
        var layer = new SupermapS3m(item, viewer);
        return layer;
    }
}

function navigationHelpButtonCHE(viewer) {

    //汉化帮助信息
    if (viewer.sceneModePicker) {
        viewer.sceneModePicker.viewModel.tooltip3D = "三维";
        viewer.sceneModePicker.viewModel.tooltip2D = "二维";
        viewer.sceneModePicker.viewModel.tooltipColumbusView = "哥伦布视图";
    }
    if (viewer.navigationHelpButton) {
        viewer.navigationHelpButton.viewModel.tooltip = "操作指南";
        var clickHelper = viewer.navigationHelpButton.container.getElementsByClassName("cesium-click-navigation-help")[0];
        var touchHelper = viewer.navigationHelpButton.container.getElementsByClassName("cesium-touch-navigation-help")[0];

        var button = viewer.navigationHelpButton.container.getElementsByClassName("cesium-navigation-button-right")[0];
        button.innerHTML = button.innerHTML.replace(">Touch", ">触摸");
        button = viewer.navigationHelpButton.container.getElementsByClassName("cesium-navigation-button-left")[0];
        button.innerHTML = button.innerHTML.replace(">Mouse", ">鼠标");

        var click_help_pan = clickHelper.getElementsByClassName("cesium-navigation-help-pan")[0];
        click_help_pan.innerHTML = "平移";
        var click_help_pan_details = click_help_pan.parentNode.getElementsByClassName("cesium-navigation-help-details")[0];
        click_help_pan_details.innerHTML = "按下左键 + 拖动";

        var click_help_zoom = clickHelper.getElementsByClassName("cesium-navigation-help-zoom")[0];
        click_help_zoom.innerHTML = "旋转";
        click_help_zoom.parentNode.getElementsByClassName("cesium-navigation-help-details")[0].innerHTML = "按下右键+拖动";
        click_help_zoom.parentNode.getElementsByClassName("cesium-navigation-help-details")[1].innerHTML = "";

        var click_help_rotate = clickHelper.getElementsByClassName("cesium-navigation-help-rotate")[0];
        click_help_rotate.innerHTML = "缩放";
        click_help_rotate.parentNode.getElementsByClassName("cesium-navigation-help-details")[0].innerHTML = "滚动鼠标滚轮";
        click_help_rotate.parentNode.getElementsByClassName("cesium-navigation-help-details")[1].innerHTML = "";
        //触屏操作
        var touch_help_pan = touchHelper.getElementsByClassName("cesium-navigation-help-pan")[0];
        touch_help_pan.innerHTML = "平移";
        touch_help_pan.parentNode.getElementsByClassName("cesium-navigation-help-details")[0].innerHTML = "单指拖动";

        var touch_help_zoom = touchHelper.getElementsByClassName("cesium-navigation-help-zoom")[0];
        touch_help_zoom.innerHTML = "缩放";
        touch_help_zoom.parentNode.getElementsByClassName("cesium-navigation-help-details")[0].innerHTML = "双指捏合";

        var touch_help_tilt = touchHelper.getElementsByClassName("cesium-navigation-help-rotate")[0];
        touch_help_tilt.innerHTML = "俯仰";
        touch_help_tilt.parentNode.getElementsByClassName("cesium-navigation-help-details")[0].innerHTML = "双指同向拖动";

        var touch_help_rotate = touchHelper.getElementsByClassName("cesium-navigation-help-tilt")[0];
        touch_help_rotate.innerHTML = "旋转";
        touch_help_rotate.parentNode.getElementsByClassName("cesium-navigation-help-details")[0].innerHTML = "双指反向拖动";
    }

}


function init() {
    // 高德栅格路况
    var traffic = new AMap.TileLayer({
        getTileUrl: function(x, y, z) {
            var M = 106884;
            var C = 49133;
            var Q = z - 16,
                g = Math.pow(2, Q),
                I = x - 511 * g - M * (2 * (Q - 1)),
                w = y - 256 * g - C * (2 * (Q - 1));
            if (Q == 4) {
                I = x - 511 * g - M * (2 * Q);
                w = y - 256 * g - C * (2 * Q);
            }
            var a =
                "http://oss.lishi-cloud.com/map/beijing4/map" +
                Q +
                "/" +
                I +
                "," +
                w +
                ".jpg";
            return a;
        }
    });

    var map = new AMap.Map("container", {
        center: [116.376946, 39.946835],
        resizeEnable: true,
        expandZoomRange: true,
        zoom: 17,
        zooms: [18, 20],
        //lang: 'en',
        layers: [traffic]
    });

    function lockMapBounds() {
        var bounds = map.getBounds();
        map.setLimitBounds(bounds);
    }
    lockMapBounds();
}