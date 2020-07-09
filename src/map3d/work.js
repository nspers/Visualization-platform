//地图业务接口js
//通过经纬度定位 可以传jd 经度 wd 纬度 gd 高度 cameraHeight 摄像机高度 heading 偏转角 pitch 仰俯角 roll 翻滚角 duration 飞行时间
export function locationByJWD(obj) {
    if (!window.viewer || !obj || !obj.jd || !obj.wd) return;
    var position = Cesium.Cartesian3.fromDegrees(obj.jd, obj.wd, obj.gd || 0);
    var heading = Cesium.Math.toRadians(obj.heading || 0);
    var pitch = Cesium.Math.toRadians(obj.pitch || 0);
    var roll = Cesium.Math.toRadians(obj.roll || 0);
    var hpr = new Cesium.HeadingPitchRange(heading, pitch, roll);
    var bs = new Cesium.BoundingSphere(position, obj.cameraHeight || 150);
    window.viewer.camera.flyToBoundingSphere(bs, {
        offset: hpr,
        duration: obj.duration || 3
    });
}

//定位到遮盖物
export function zoomToEntity(entity, height) {
    console.log(entity);
    if (!entity) return;
    var heading = Cesium.Math.toRadians(45);
    var pitch = Cesium.Math.toRadians(-45);
    window.viewer.flyTo([entity], new Cesium.HeadingPitchRange(heading, pitch, height || 50))
}

//获取当前相机的参数 例如{ "y": 31.787488, "x": 117.222228, "z": 224, "heading": 56, "pitch": -29, "roll": 45 }
export function getCameraView() {
    return mars3d.point.getCameraView(window.viewer, false);
}

//缩小
var miniH = 800;
export function mapZoomIn(num) { //缩小
    if (!window.viewer || !num) return;
    var heading = window.viewer.camera.heading;
    var angle = Cesium.Math.toDegrees(heading);
    var dis = num / Cesium.Math.cosh(angle);
    var cameraPosition = window.viewer.camera.position;
    var h = Cesium.Cartographic.fromCartesian(cameraPosition).height;
    var direction = window.viewer.camera.direction;
    if (h < miniH) {
        window.viewer.camera.zoomIn(num);
        var nowP = window.viewer.camera.position;
        var nowH = Cesium.Cartographic.fromCartesian(nowP).height;
        if (nowH < miniH) {
            var o = miniH - nowH;
            window.viewer.camera.zoomOut(o);
        }
        return;
    }
    window.viewer.camera.zoomIn(num);
}
//放大
export function mapZoomOut(num) { //放大
    if (!num) num = 100;
    window.viewer.camera.zoomOut(num);
}

//定位到某高度
export function cemeraCenterAt(obj, duration) {
    if (!obj) return;
    //举例
    // window.viewer.mars.centerAt({
    //     "y": 36.066694,
    //     "x": 113.936359,
    //     "z": 780.17,
    //     "heading": 63.1,
    //     "pitch": -28.3,
    //     "roll": 0,
    // },{duration:duration});
    window.viewer.mars.centerAt(obj, {
        duration: duration
    });
}

//绑定相机渲染事件 用于控制覆盖物的显示隐藏
//限制地图拖动
var mapBounds = {
    isActivate: false,
    cameraMoveEndHandler: null,
    cameraMoveStartHandler: null,
    boundsRectangle: null,
    cameraView: null,
    initCameraView: null,
    maximumHeight: null,
    activate: function (bounds) {
        if (!bounds) return;
        var that = this;
        if (!this.isActivate) {
            this.isActivate = !this.isActivate;
            this.initCameraView = mars3d.point.getCameraView(viewer, false);
            this.maximumHeight = this.initCameraView.z;
            this.boundsRectangle = Cesium.Rectangle.fromDegrees(bounds.ymin, bounds.xmin, bounds.ymax,
                bounds.xmax);
            this.cameraMoveStartHandler = viewer.camera.moveStart.addEventListener(function (evt) {
                if (!that.cameraView) that.cameraView = mars3d.point.getCameraView(viewer,
                    false);
            });
            this.cameraMoveEndHandler = viewer.camera.moveEnd.addEventListener(function (evt) {
                var cameraRectangle = viewer.camera.computeViewRectangle();
                var intsecRectangle = Cesium.Rectangle.intersection(that.boundsRectangle,
                    cameraRectangle);
                if (intsecRectangle) { //相交情况下
                    var res = Cesium.Rectangle.equalsEpsilon(intsecRectangle, cameraRectangle,
                        0.0005); //此处可调限定的误差范围
                    if (!res) {
                        if (that.cameraView) {
                            viewer.mars.centerAt(that.cameraView, {
                                complete: function () {
                                    that.cameraView = null;
                                },
                                maximumHeight: that.maximumHeight || 2000,
                                duration: 0.5
                            });
                        }
                    }
                } else { //无交集情况下
                    if (that.initCameraView) {
                        viewer.mars.centerAt(that.initCameraView, {
                            complete: function () {
                                that.cameraView = null;
                            },
                            maximumHeight: that.maximumHeight || 2000,
                            duration: 1
                        });
                    }
                }

            });
        }
    },
    disable: function () {
        if (this.isActivate) {
            this.isActivate = !this.isActivate;
            if (this.cameraMoveEndHandler) {
                this.cameraMoveEndHandler.destroy();
                this.cameraMoveEndHandler = null;
                this.boundsRectangle = null;
            }
            if (this.cameraMoveStartHandler) {
                this.cameraMoveStartHandler.destroy();
                this.cameraMoveStartHandler = null;
            }
            this.cameraView = null;
            this.initCameraView = null;
            this.maximumHeight = null;
        }
    }
}
export function getMapbounds() {
    return mapBounds
}

//==============================绑定相关事件===================================
//左键获取经纬度 
var getJWDHandler = null;
export function getJWD(fun) {
    if (getJWDHandler) {
        getJWDHandler.destroy();
        getJWDHandler = null;
    }
    getJWDHandler = new Cesium.ScreenSpaceEventHandler(window.viewer.scene.canvas);
    getJWDHandler.setInputAction(function (evt) {
        var cartesian3 = mars3d.point.getCurrentMousePosition(window.viewer.scene, evt.position);
        var lnglat = null;
        if (cartesian3) {
            lnglat = mars3d.draw.utils.getCoordinates([cartesian3]);
        }
        console.log("经纬度：" + lnglat);
        return lnglat;
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}


//监听地图正在移动事件
var drawingHandler;
export function bindDrawingHandler(fun) {
    if (drawingHandler) drawingHandler();
    drawingHandler = window.viewer.camera.changed.addEventListener(function () {
        if (fun) fun();
    });
}
//停止监听地图正在移动事件
export function removeDrawingHandler() {
    if (drawingHandler) drawingHandler();
}

//监听地图开始移动事件
var drawstartHandler;
export function bindDrawstartHandler(fun) {
    if (drawstartHandler) drawstartHandler();
    drawstartHandler = window.viewer.camera.moveStart.addEventListener(function () {
        if (fun) fun();
    });
}
export function removeDrawstartHandler() {
    if (drawstartHandler) drawstartHandler();
}

//监听地图结束移动事件
var drawendHandler;
export function bindDrawendHandler(fun) {
    if (drawendHandler) drawendHandler();
    drawendHandler = window.viewer.camera.moveEnd.addEventListener(function () {
        if (fun) fun();
    });
}
export function removeDrawendHandler() {
    if (drawendHandler) drawendHandler();
}