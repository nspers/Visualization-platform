import Vue from "vue";
import store from "../../store";
// import * as mapWork from "../../map3d/work";
// import * as mapCover from "../../map3d/cover";
import * as mapCover from "../../amap/main";
import * as mapWork from "../../amap/main";
import router from "../../router";

//告警滚动
Vue.prototype.$alertScroll = function(dom, sHeight, sSpeed, sDelay) {
  dom.style.top = 0;

  function sIscroll() {
    let timer = setInterval(() => {
      let sulH = parseInt(dom.style.top);
      if (sulH > -sHeight) {
        sulH--;
        dom.style.top = sulH + "px";
        if (sulH <= -sHeight) {
          let fristLi = dom.children;
          dom.appendChild(fristLi[0]);
          dom.style.top = 0;
          clearInterval(timer);
          setTimeout(() => {
            sIscroll();
          }, sDelay);
        }
      }
    }, sSpeed);
  }
  sIscroll();
};

// 获取当前时间
Vue.prototype.$getCurrentDate = function getCurrentDate(time) {
  let date = time ? new Date(time) : new Date();
  let Y = date.getFullYear() + "-";
  let M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  let D = ("0" + date.getDate()).slice(-2) + " ";
  let h = ("0" + date.getHours()).slice(-2) + ":";
  let m = ("0" + date.getMinutes()).slice(-2) + ":";
  let s = ("0" + date.getSeconds()).slice(-2);
  return Y + M + D + h + m + s;
};

//获取websocket数据
Vue.prototype.$getWebsocketData = function getWebsocketData(modulecode) {
  let data = {
    msgid: "",
    modulecode: modulecode,
    msgtype: 2,
    msgcode: 200000,
    timestamp: this.$getCurrentDate(),
    msg: {}
  };
  this.ws.sendSock(data, res => {
    if (Vue.prototype.workCover) {
      if (res.msgcode === 203001 && store.state.nowTagName === "illumine") {
        //照明管理
        let lights = res.msg.lights;
        for (let i = 0; i < lights.length; i++) {
          let State = "";
          switch (lights[i].stationstate) {
            case 0:
              State = "off";
              break;
            case 1:
              State = "on";
              break;
            case 2:
              State = "on";
              break;
            case 3:
              State = "offline";
              break;
            case 9:
              State = "abnormal";
              break;
          }
          if (lights[i].stationid === store.state.selectId) {
            this.workCover
              ? Vue.prototype.workCover.changeBillBoardstatusAttr(
                  lights[i].stationid,
                  State,
                  store.state.selectBoolean
                )
              : null;
          } else {
            this.workCover
              ? Vue.prototype.workCover.changeBillBoardstatusAttr(
                  lights[i].stationid,
                  State,
                  "noSelect"
                )
              : null;
          }
        }
      } else if (res.msgcode === 204001 && store.state.nowTagName === "lcd") {
        //lcd
        // 地图上如果不存在lcd点,则先创建
        if (
          res.msg.lcds.length &&
          this.workCover &&
          !this.workCover.getBillboardById(res.msg.lcds[0].stationid)
        ) {
          Vue.prototype.$creatMapPoint(
            Vue.prototype.$that,
            store.state.nowTagName
          );
        }
        for (let i = 0; i < res.msg.lcds.length; i++) {
          let State = "";
          let status = parseInt(res.msg.lcds[i].status);
          if (status) {
            if (res.msg.lcds[i].onoff) {
              State = "on";
            } else {
              State = "off";
            }
          } else {
            State = "offline";
          }
          if (res.msg.lcds[i].stationid === store.state.selectId) {
            this.workCover
              ? Vue.prototype.workCover.changeBillBoardstatusAttr(
                  res.msg.lcds[i].stationid,
                  State,
                  store.state.selectBoolean
                )
              : null;
          } else {
            this.workCover
              ? Vue.prototype.workCover.changeBillBoardstatusAttr(
                  res.msg.lcds[i].stationid,
                  State,
                  "noSelect"
                )
              : null;
          }
        }
      } else if (res.msgcode === 205001 && store.state.nowTagName === "led") {
        //led
        for (let i = 0; i < res.msg.leds.length; i++) {
          let State = "";
          if (res.msg.leds[i].online) {
            if (res.msg.leds[i].onoff) {
              State = "on";
            } else {
              State = "off";
            }
          } else {
            State = "offline";
          }
          if (res.msg.leds[i].stationid === store.state.selectId) {
            this.workCover
              ? Vue.prototype.workCover.changeBillBoardstatusAttr(
                  res.msg.leds[i].stationid,
                  State,
                  store.state.selectBoolean
                )
              : null;
          } else {
            this.workCover
              ? Vue.prototype.workCover.changeBillBoardstatusAttr(
                  res.msg.leds[i].stationid,
                  State,
                  "noSelect"
                )
              : null;
          }
        }
      } else if (
        res.msgcode === 206002 &&
        store.state.nowTagName === "electricity"
      ) {
        //用电管理
        let gateways = res.msg.gateways;
        for (let i = 0; i < gateways.length; i++) {
          let State = "";
          if (gateways[i].line) {
            State = "on";
          } else {
            State = "offline";
          }
          if (gateways[i].stationid === store.state.selectId) {
            this.workCover
              ? Vue.prototype.workCover.changeBillBoardstatusAttr(
                  gateways[i].stationid,
                  State,
                  store.state.selectBoolean
                )
              : null;
          } else {
            this.workCover
              ? Vue.prototype.workCover.changeBillBoardstatusAttr(
                  gateways[i].stationid,
                  State,
                  "noSelect"
                )
              : null;
          }
        }
      }
    }
    store.dispatch("getWebsocketData", res);
  });
};

Vue.prototype.modulecode = {
  index: 1007, //首页
  site: 1002, //站台管理
  singleSite: 1002, //单个站点
  illumine: 1003, //照明管理
  lcd: 1004, //LCD
  led: 1005, //LED
  electricity: 1006, //用电管理
  alarm: 1007, //告警
  statistics: 1008 //统计分析
};

Vue.prototype.msgcode = {
  first: 200000,
  index: [201001, 201999], //首页
  site: [202001, 202999], //站台管理
  illumine: [203001, 203999], //照明管理
  lcd: [204001, 204999], //LCD
  led: [205001, 205999], //LED
  electricity: [206001, 206999], //用电管理
  alarm: [207001, 207999], //告警
  statistics: [208001, 208999] //统计分析
};

//覆盖物坐标信息
Vue.prototype.$arrMapPoint = {
  all: [
    // { id: 1, siteid: 1, sitename: "庙地检查场(上)", longitude: 116.66507483007128, latitude: 40.27506416919744, height: 40.275, isUpside: 1, haveLcd: 0 },
    // { id: 2, siteid: 2, sitename: "庙地检查场(下)", longitude: 116.66531239455728, latitude: 40.275022899210654, height: 40.275, isUpside: 0, haveLcd: 0 },
    // { id: 3, siteid: 3, sitename: "高双河西(上)", longitude: 116.66751479141746, latitude: 40.281425614403894, height: 40.28, isUpside: 1, haveLcd: 0 },
    // { id: 4, siteid: 4, sitename: "高双河西(下)", longitude: 116.6676138864423, latitude: 40.280697528029954, height: 40.1, isUpside: 0, haveLcd: 0 },
    // { id: 11, siteid: 11, sitename: "杨松大槐树(上)", longitude: 116.67478492830128, latitude: 40.309601633171305, height: 32.7, isUpside: 1, haveLcd: 0 },
    // { id: 12, siteid: 12, sitename: "杨松大槐树(下)", longitude: 116.67518235259743, latitude: 40.30975955260755, height: 33, isUpside: 0, haveLcd: 0 },
    // { id: 13, siteid: 13, sitename: "安乐庄(上)", longitude: 116.67986569138019, latitude: 40.31660538385488, height: 34.6, isUpside: 1, haveLcd: 0 },
    // { id: 14, siteid: 14, sitename: "安乐庄(下)", longitude: 116.67992213696233, latitude: 40.316013818721956, height: 35, isUpside: 0, haveLcd: 0 },
    // { id: 9, siteid: 9, sitename: "高双河(上)", longitude: 116.67226110907382, latitude: 40.30240302840376, height: 33, isUpside: 1, haveLcd: 0 },
    // { id: 10, siteid: 10, sitename: "高双河(下)", longitude: 116.67240759218025, latitude: 40.302012518580376, height: 33, isUpside: 0, haveLcd: 0 },
    // { id: 5, siteid: 5, sitename: "中影基地(上)", longitude: 116.66869111069026, latitude: 40.28820046702636, height: 31.2, isUpside: 1, haveLcd: 1 },
    // { id: 6, siteid: 6, sitename: "中影基地(下)", longitude: 116.66906647722115, latitude: 40.28878531292496, height: 31.3, isUpside: 0, haveLcd: 1 },
    // { id: 7, siteid: 7, sitename: "凤翔环岛(上)", longitude: 116.67035863635644, latitude: 40.297136695048025, height: 32.3, isUpside: 1, haveLcd: 0 },
    // { id: 8, siteid: 8, sitename: "凤翔环岛(下)", longitude: 116.67099557203544, latitude: 40.29812226697347, height: 32.3, isUpside: 0, haveLcd: 0 }
  ],
  lcd: []
};

if (sessionStorage.filtersMap) {
  Vue.prototype.$arrMapPoint.all = JSON.parse(sessionStorage.filtersMap);
}
//设置存在lcd的站点
function setLcdMapPoint() {
  Vue.prototype.$arrMapPoint.lcd = [];
  for (let item of Vue.prototype.$arrMapPoint.all) {
    if (item.haveLcd) {
      Vue.prototype.$arrMapPoint.lcd.push(item);
    }
  }
}

//创建覆盖物
Vue.prototype.$creatMapPoint = (that, toName) => {
  const arrImgUrl = [
    "./static/data/image/bus/bus_",
    "./static/data/image/bus/light_",
    "./static/data/image/bus/lcd_",
    "./static/data/image/bus/led_",
    "./static/data/image/bus/jkq_"
  ];
  // 地图图标配置
  let imageConfig = {
    noSelect: {
      width: 52,
      height: 64,
      offsetX: 0,
      offsetY: -60
    },
    isSelect: {
      width: 73,
      height: 88,
      offsetX: 0,
      offsetY: -83
    }
  };
  //如果存在覆盖物 则移除所有覆盖物
  Vue.prototype.workCover ? Vue.prototype.workCover.destroy() : null;
  //设置覆盖物图标
  let sImgUrl = arrImgUrl[0];
  //设置覆盖物坐标
  let sMapPoint = Vue.prototype.$arrMapPoint.all;
  switch (toName) {
    case "index":
    case "site":
      sImgUrl = arrImgUrl[0];
      // sMapPoint = arrMapPoint[0];
      break;
    case "illumine":
      sImgUrl = arrImgUrl[1];
      // sMapPoint = arrMapPoint[0];
      break;
    case "lcd":
      sImgUrl = arrImgUrl[2];
      setLcdMapPoint(); //设置存在lcd的站点
      sMapPoint = Vue.prototype.$arrMapPoint.lcd;
      break;
    case "led":
      sImgUrl = arrImgUrl[3];
      // sMapPoint = Vue.prototype.$arrMapPoint.all;
      break;
    case "electricity":
      sImgUrl = arrImgUrl[4];
      // sMapPoint = arrMapPoint[0];
      break;
    default:
      sImgUrl = arrImgUrl[0];
      // sMapPoint = arrMapPoint[0];
      break;
  }
  let statusImg = {
    on: {
      isSelect: `${sImgUrl}green_s.png`,
      noSelect: `${sImgUrl}green_ns.png`
    },
    off: {
      isSelect: `${sImgUrl}gray_s.png`,
      noSelect: `${sImgUrl}gray_ns.png`
    },
    offline: {
      //其他板块默认显示离线图标 站台概览仍为绿色
      isSelect:
        toName !== "site" && toName !== "singleSite" && toName !== "index"
          ? `${sImgUrl}orange_s.png`
          : `${sImgUrl}green_s.png`,
      noSelect:
        toName !== "site" && toName !== "singleSite" && toName !== "index"
          ? `${sImgUrl}orange_ns.png`
          : `${sImgUrl}green_ns.png`
    },
    warning: {
      isSelect: `${sImgUrl}red_s.png`,
      noSelect: `${sImgUrl}red_ns.png`
    },
    abnormal: {
      isSelect: `${sImgUrl}purple_s.png`,
      noSelect: `${sImgUrl}purple_ns.png`
    }
  };
  let workCover = new mapCover.WorkCover(statusImg, imageConfig);
  workCover.crate("billboard", {
    isCluster: true,
    clickUpdate: true,
    heightControl: {
      open: true,
      height: 1000
    }
  });
  for (let i = 0; i < sMapPoint.length; i++) {
    let coordinates = sMapPoint[i];
    // console.log(sMapPoint[i]);
    workCover.addBillboard(
      coordinates,
      {
        status: "on",
        select: "noSelect"
      },
      {
        click: function(entity) {
          setTimeout(() => {
            that.$refs.rView.isPoupSection
              ? that.$refs.rView.isPoupSection()
              : null;
          }, 800);
          if (sMapPoint[i].siteid !== store.state.last) {
            store.state.isClick = true;
            // store.dispatch("setSingleIsShow",true)
            switch (that.$route.name) {
              case "site":
                Vue.prototype.$siteOnClick(sMapPoint[i].siteid);
                break;
              case "index":
                store.state.haveLcd = sMapPoint[i].haveLcd;
                that.$router.push({ name: "singleSite" });
                break;
              case "singleSite":
                Vue.prototype.$siteOnClick(sMapPoint[i].siteid);
                break;
              default:
                that.$store.commit("changeTransitId", {
                  transitId: sMapPoint[i].siteid,
                  time: -1
                });
                that.$refs.rView.leave();
                break;
            }
            setTimeout(() => {
              store.state.isClick = false;
            }, 1200);

            store.state.selectId = sMapPoint[i].siteid;
            store.state.loction = sMapPoint[i].siteid;
            store.dispatch("setNow", sMapPoint[i].siteid);
            store.state.last = sMapPoint[i].siteid;
            store.state.selectBoolean = "isSelect";
            $(".map_site_name")
              .stop()
              .animate({ marginTop: "-100px" });
            $("." + sMapPoint[i].siteid)
              .stop()
              .animate({ marginTop: "-124px" });
            // store.dispatch("setSingleIsShow", true);
            Vue.prototype.workCover.revertBillboardsStatus();
            mapWork.locationByJWD({
              jd: sMapPoint[i].longitude,
              wd: sMapPoint[i].latitude,
              gd: 30,
              cameraHeight: 60,
              heading: 25,
              pitch: -45,
              duration: 1
            });
          }
        },
        id: sMapPoint[i].siteid,
        text: sMapPoint[i].sitename,
        divPointHtml: `<div><div class='map_site_name ${sMapPoint[i].siteid}'>${sMapPoint[i].sitename}</div></div>`
      }
    );
  }
  //将生成的地图实例挂载到Vue上
  Vue.prototype.workCover = workCover;
};

//根据经纬度定位地图
Vue.prototype.$locationByJWD = (sLo, sLa, sHt, cHt, sId) => {
  mapWork.locationByJWD({
    id: sId,
    jd: sLo,
    wd: sLa,
    gd: sHt || 30,
    cameraHeight: cHt || 60,
    heading: 25,
    pitch: -45,
    duration: 1
  });
};

//重置地图高度
Vue.prototype.$resetMapHeight = () => {
  mapWork.locationByJWD({
    jd: 116.669789,
    wd: 40.294119,
    gd: 30,
    cameraHeight: 3000,
    heading: 5,
    pitch: -50,
    duration: 1
  });
};

Vue.prototype.sovOutIn = function() {
  this.$refs.rView.ssOutIn();
};
Vue.prototype.siteClick = function(sId) {
  // this.$refs.cBottom.siteOnClick(sId);
  Vue.prototype.$siteOnClick(sId);
};

//点击底部导航
Vue.prototype.$siteOnClick = sId => {
  const that = Vue.prototype.$that;
  let sName = 0,
    sLo = 0,
    sLa = 0,
    haveLcd = 0;
  for (let site of Vue.prototype.$arrMapPoint.all) {
    if (site.siteid === sId) {
      sLo = site.longitude;
      sLa = site.latitude;
      haveLcd = site.haveLcd;
      sName = site.sitename;
    }
  }
  if (sId !== store.state.last && Vue.prototype.workCover) {
    if (store.state.btnSwitch) {
      store.state.btnSwitch = false;
      if (that.$route.path === "/site" || that.$route.path === "/") {
        //站台
        store.state.loction = sId;
        that.$router.push({ path: "/single_site" });
        Vue.prototype.$canBeClick(sId, sName, sLo, sLa, haveLcd);
        // this.show1 = false
      } else if (that.$route.path === "/single_site") {
        store.state.loction = sId;
        that.$refs.rView.ssOutIn();
        setTimeout(() => {
          that.$refs.rView.cbBoxOutIn();
        }, 500);
        Vue.prototype.$canBeClick(sId, sName, sLo, sLa, haveLcd);
        // this.show1 = false
      } else if (that.$route.path === "/lcd") {
        if (haveLcd) {
          Vue.prototype.$canBeClick(sId, sName, sLo, sLa, haveLcd);
          store.commit("changeTransitId", {
            transitId: sId,
            time: new Date().getTime()
          });
          // this.show1 = false
        }
      } else if (
        ["/led", "/electricity", "/illumine"].indexOf(that.$route.path) > -1
      ) {
        Vue.prototype.$canBeClick(sId, sName, sLo, sLa, haveLcd);
        store.commit("changeTransitId", {
          transitId: sId,
          time: new Date().getTime()
        });
        // this.show1 = false
      }
      setTimeout(() => {
        store.state.btnSwitch = true;
        store.state.isClick = false;
      }, 2000);
    }
  }
};
Vue.prototype.$canBeClick = (sId, sName, sLo, sLa, haveLcd) => {
  store.state.isClick = true;
  store.state.selectId = sId;
  store.state.last = sId;
  store.dispatch("setNow", sId);
  store.state.nowSiteName = sName;
  store.state.selectBoolean = "isSelect";
  $(".map_site_name")
    .stop()
    .animate({ marginTop: "-100px" });
  $("." + sId)
    .stop()
    .animate({ marginTop: "-124px" });
  //根据经纬度移动地图 经度 纬度 图标高度 摄像机高度
  sLo && sLa ? Vue.prototype.$locationByJWD(sLo, sLa, 30, 60, sId) : null;
  Vue.prototype.workCover.revertBillboardsStatus();
  Vue.prototype.workCover.updateSelById(sId);
  setTimeout(() => {
    store.state.haveLcd = haveLcd;
  }, 500);
};
