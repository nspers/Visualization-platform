//添加各种覆盖物
//添加图标点
// var statusObj = {
//     "online": {
//         isSelect: "./static/data/image/mark1.png",
//         noSelect: "./static/data/image/mark2.png"
//     },
//     "outline": {
//         isSelect: "./static/data/image/mark3.png",
//         noSelect: "./static/data/image/mark4.png"
//     }
// }

import store from '../store'

export function WorkCover(statusObj) {
    this.statusObj = statusObj;
    this.billboard = null;
    this.billboardEntitys = [];
    this.removeClusterListener = null;
    this.removeDivPointRenderHandler = null;
    this.clickUpdateImgHandler = null;
    this.dataSource = new Cesium.CustomDataSource();

}
WorkCover.prototype = {
    crate: function(type, opt) {
        window.viewer.dataSources.add(this.dataSource);
        if (opt.isCluster) this.bindCluster();
        if (opt.heightControl.open) this.bindHeigthControl(opt.heightControl.height);
        if (opt.clickUpdate) this.bindClickUpdate();
        if (type == "billboard") {
            this.billboard = new Billboard(window.viewer, this.dataSource);
        }
    },
    getBillboardById: function(id) {
        return this.billboard.getBillboardById(id);
    },
    addBillboard: function(cor, opt, obj) {
        var imgUrl = this.statusObj[opt.status][opt.select];
        var entity = this.billboard.addBillboard(cor, imgUrl, obj);
        if (entity) {
            entity.statusAttr = opt; //保存添加的点的状态
            this.billboardEntitys.push(entity);
        }


    },
    //接受ws推送的状态
    changeBillBoardstatusAttr: function(id, zt, select) {
        for (var i = 0; i < this.billboardEntitys.length; i++) {
            var entity = this.billboardEntitys[i];
            if (entity.id == id) {
                var statusAttr = {};
                statusAttr.status = zt;
                statusAttr.select = select;
                entity.statusAttr = statusAttr;
                var imgUrl = this.statusObj[zt][select]; //推送过来的状态  默认为未选中
                this.billboard.changBillboardImgById(id, imgUrl);
                break;
            }
        }
    },
    //恢复所有图标至未选中状态
    revertBillboardsStatus: function() {
        $('.map_lp_name').stop().animate({ 'marginTop': '-90px' })
            // store.state.selectId = null
        for (let i = 0; i < this.billboardEntitys.length; i++) {
            let entity = this.billboardEntitys[i];
            entity.statusAttr.select = "noSelect";
            if (entity.id == store.state.selectId) {
                console.log(entity)
            }
            let imgUrl = this.statusObj[entity.statusAttr.status]["noSelect"]; //推送过来的状态  默认为未选中
            this.billboard.changBillboardImgById(entity.id, imgUrl);
        }
    },
    //根据id选择
    updateSelById: function(id) {
        if (!id) return;
        // console.log(id)
        var isLookIndex = -1; //表明是否找到对应id的点
        for (var i = 0; i < this.billboardEntitys.length; i++) {
            var entity = this.billboardEntitys[i];
            if (entity.id == id) {
                var nowSel = entity.statusAttr.select; //当前是否选中
                if (nowSel == "isSelect") {
                    return; //已经选中则不进行操作
                } else {
                    var opt = entity.statusAttr;
                    entity.statusAttr.oldSelect = entity.statusAttr.select; //保存之前的选中状态
                    entity.statusAttr.select = "isSelect";
                    var imgUrl = this.statusObj[opt.status]["isSelect"]
                    this.billboard.changBillboardImgById(id, imgUrl);
                    isLookIndex = i;
                    break;
                }
            }
        }
        if (isLookIndex != -1) { //如果找到对应id的点 则将除此点外的所有点的状态改为未选中
            for (var index = 0; index < this.billboardEntitys.length; index++) {
                if (index != isLookIndex) {
                    if (entity.statusAttr.select = "isSelect") {
                        entity.statusAttr.oldSelect = entity.statusAttr.select; //保存之前的选中状态
                        var entity = this.billboardEntitys[index];
                        var opt = entity.statusAttr;
                        entity.statusAttr.select = "noSelect";
                        var imgUrl = this.statusObj[opt.status]["noSelect"];
                        this.billboard.changBillboardImgById(entity.id, imgUrl);
                    }
                }
            }
        } else {
            console.log("未找到该点的id");
        }
    },
    bindCluster: function(imgSrc = '../static/data/image/marker.png') {
        var thiz = this;
        var img = document.createElement("img");

        img.crossOrigin = "anonymous";
        img.src = imgSrc;

        img.onload = function() {

                thiz.dataSource.clustering.enabled = true;
                thiz.dataSource.clustering.pixelRange = 20;

                var singleDigitPins = {};
                var pinBuilder = new Cesium.PinBuilder();

                thiz.removeClusterListener = thiz.dataSource.clustering.clusterEvent.addEventListener(function(clusteredEntities, cluster) {
                    var count = clusteredEntities.length;
                    cluster.billboard.id = cluster.label.id;
                    cluster.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;
                    if (!singleDigitPins[count]) {
                        singleDigitPins[count] = generateUrl({
                            imgDom: img,
                            text: count
                        });
                        // singleDigitPins[count] = pinBuilder.fromText(count, Cesium.Color.BLUE, 48).toDataURL();
                    }
                    cluster.billboard.image = singleDigitPins[count];
                    cluster.label.show = false;
                    cluster.billboard.show = true;
                });

            }
            // 生成base64图片url
        function generateUrl({
            imgDom,
            text = '',
            color = '#fff',
            fontSize = 18,
            fontFamily = 'Raleway',
            marginTop = 15,
        }) {
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");

            canvas.width = imgDom.width;
            canvas.height = imgDom.height;

            ctx.drawImage(imgDom, 0, 0);

            ctx.font = fontSize + "px " + fontFamily;
            ctx.fillStyle = color;
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            ctx.fillText(text, imgDom.width / 2, marginTop);

            var url = canvas.toDataURL('image/png');

            return url;
        }

    },
    bindHeigthControl: function(height) {
        if (!height) height = 1000;
        var $this = this;
        this.removeDivPointRenderHandler = window.viewer.scene.postRender.addEventListener(function() {
            if (!$this.billboardEntitys || $this.billboardEntitys.length < 0) return;
            var cameraPosition = window.viewer.camera.position;
            var h = Cesium.Cartographic.fromCartesian(cameraPosition).height;
            if (h < height) {
                for (var i = 0; i < $this.billboardEntitys.length; i++) {
                    var entity = $this.billboardEntitys[i];
                    entity.divPoint.visible = true;
                }
            } else {
                for (var i = 0; i < $this.billboardEntitys.length; i++) {
                    var entity = $this.billboardEntitys[i];
                    entity.divPoint.visible = false;
                }
            }
        });
    },
    bindClickUpdate: function() {
        var $this = this;
        this.clickUpdateImgHandler = new Cesium.ScreenSpaceEventHandler(window.viewer.scene.canvas);
        this.clickUpdateImgHandler.setInputAction(function(evt) {
            var pick = window.viewer.scene.pick(evt.position);
            var pickedEntity = Cesium.defined(pick) ? pick.id : undefined;
            if (!pickedEntity) return;
            $this.updateSelById(pickedEntity.id);
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
    destroy: function() {
        if (this.billboard) {
            this.billboard.destroy();
            this.billboard = null;
        }

        this.billboardEntitys = [];
        if (this.removeClusterListener) {
            this.removeClusterListener();
            this.removeClusterListener = null;
        }
        if (this.removeDivPointRenderHandler) {
            this.removeDivPointRenderHandler();
            this.removeDivPointRenderHandler = null;
        }
        if (this.clickUpdateImgHandler) {
            this.clickUpdateImgHandler.destroy();
            this.clickUpdateImgHandler = null;
        }
        window.viewer.dataSources.remove(this.dataSource);
        this.dataSource = null;
    }
}


//覆盖物创建添加
function Billboard(viewer, dataSource) {
    this.viewer = viewer;
    this.dataSource = dataSource;
    this.billboards = [];
    this.idArr = []; //覆盖物的id集合
}
Billboard.prototype = {
    //添加图标点 及 对应的上方的div框体
    addBillboard: function(cor, imgUrl, obj) {
        if (!cor || !this.dataSource) return;
        if (!obj.anchor) obj.anchor = [0, -20];
        var position = Cesium.Cartesian3.fromDegrees(cor.longitude, cor.latitude, cor.height); //经度 纬度 高度
        var cusId = Number((new Date()).getTime() + "" + Number(Math.random() * 1000).toFixed(0));
        if (!obj.id) {
            obj.id = cusId;
        } else {
            for (var i = 0; i < this.idArr.length; i++) {
                if (this.idArr[i] == obj.id) {
                    console.log("添加车站图标时，车站id重复，现自定义车站id为：" + cusId);
                    obj.id = cusId;
                    break;
                }
            }
        }
        this.idArr.push(obj.id);
        var entity = this.dataSource.entities.add({
            id: obj.id,
            name: "图标点",
            position: position,
            billboard: {
                image: imgUrl,
                scale: 1,
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM
            },
            show: true,
            click: function(entity) {
                if (obj.click) obj.click();
                $('.' + entity._id).stop().animate({ 'marginTop': '-124px' })
            },
            mouseover: obj.mouseover || null,
            mouseout: obj.mouseout || null,
            tooltip: obj.tooltipHtml || "",
            popup: {
                html: obj.popupHtml || "",
                anchor: obj.anchor
            },
        });
        var divPoint = new mars3d.DivPoint(this.viewer, {
            html: obj.divPointHtml,
            position: position,
            anchor: obj.divPointAnchor,
            click: obj.divPointClick
        });
        entity.divPoint = divPoint;
        entity.isClick = false;
        this.billboards.push(entity);
        return entity;
    },
    removeAll: function() {
        for (var i = 0; i < this.billboards.length; i++) {
            if (this.billboards[i]) {
                this.dataSource.entities.remove(this.billboards[i]);
                this.billboards[i].divPoint.destroy();
            }
        }
        this.billboards = [];
    },
    setVisible: function(visible) {
        if (!visible) val = false;
        for (var i = 0; i < this.billboards.length; i++) {
            var entity = this.billboards[i];
            if (entity) {
                entity.show = visible;
                entity.divPoint.visible = visible;
            }
        }
    },
    changeAllBillboardImg: function(that, imgurl) {
        if (!imgurl) return;
        for (var i = 0; i < that.billboards.length; i++) {
            var entity = that.billboards[i];
            if (entity) entity.billboard.image = imgurl;
        }
    },
    getBillboardById: function(id) {
        if (!id) return;
        var entity2;
        for (var i = 0; i < this.billboards.length; i++) {
            var entity = this.billboards[i];
            if (entity.id == id) {
                entity2 = entity;
                break;
            }
        }
        return entity2;
    },
    changBillboardImgById: function(id, imgurl) {
        if (!id || !imgurl) return;
        var entity = this.getBillboardById(id);
        if (!entity) return;
        entity.billboard.image = imgurl;
    },
    destroy: function() {
        this.removeAll();
        this.idArr = [];
    }
}