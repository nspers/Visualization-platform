<template>
  <div class="illumine subMain">
    <div class="r_btn_box">
      <div class="r_btn_item" @click="shownum(0)">
        <div class="r_btn r_light" :class="this.tagSwitch == 'overview' ? 'active' : null"></div>
        <span :class="this.tagSwitch == 'overview' ? 'active' : null">照明概览</span>
      </div>
      <div class="r_btn_item" @click="shownum(1)">
        <div class="r_btn r_shebei_control" :class="this.tagSwitch == 'control' ? 'active' : null"></div>
        <span :class="this.tagSwitch == 'control' ? 'active' : null">设备控制</span>
      </div>
    </div>
    <div class="poupSection" ref="poupSection">
      <Overview ref="overview" />
      <Control ref="control" :key="wuyong" />
    </div>
    <div class="Lighting">
      <div class="auto">
        <div class="Lighting-title">
          <span class="left_m">{{sitename}}</span>
          <span class="errorimg" @click="disnone()"></span>
        </div>
        <div style="margin-right:0.1rem">
          <span class="left_m">控制</span>
          <span class="right_m">
            <el-button
              style="margin-left: 0.2rem;"
              type="success"
              size="mini"
              class="open"
              @click="handleLightingControl('open')"
            >开启</el-button>
            <el-button
              type="warning"
              size="mini"
              style="margin-left: 0.1rem;"
              class="down"
              @click="handleLightingControl('down')"
            >关闭</el-button>
          </span>
        </div>
        <div class="Lighting-content"></div>
        <div class="Lighting-from">
          <div
            style="width:100%;height:100%"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.4)"
          ></div>
          <ul class="frombox">
            <li class="fromItem fromItem-title">
              <div class="checkbox">
                <!-- <span
                :class="{'checked':Lighting.allChecked,'check':!Lighting.allChecked}"
                @click="handleAllChecked()"
                ></span>-->
                <checked :target="'all'" :key="wuyong" />
              </div>
              <div class="locationName">位置名称</div>
              <span class="switch">开关</span>
              <span class="status">状态</span>
            </li>
            <li
              class="fromItem"
              v-for="(item,index) in Lighting.Datalist.length? Lighting.Datalist:[]"
              :key="index"
            >
              <div class="checkbox" v-if="Lighting.Datalist.length>0">
                <!-- <span
                :class="{'checked':checkedArray[index].checked,'check':!checkedArray[index].checked}"
                @click="handleLightingInput(index)"
                ></span>-->
                <checked v-if="item.logoid" :target="item.logoid" :key="wuyong" />
                <checked v-if="item.lamphouseid" :target="item.lamphouseid" :key="wuyong" />
                <checked v-if="item.platfondid" :target="item.platfondid" :key="wuyong" />
              </div>
              <div class="locationName" v-if="item.logoid">logo照明</div>
              <div class="locationName" v-if="item.lamphouseid">灯箱照明</div>
              <div class="locationName" v-if="item.platfondid">顶棚照明</div>
              <div class="switch">
                <span class="onoff" style="display:inline-block;margin-left:0rem">
                  <img
                    style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                    src="../assets/img/icon/dui_green.png"
                    v-if="item.lamphouseonoff == 1 || item.platfondonoff == 1 || item.logoonoff == 1"
                  />
                  <img
                    style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                    src="../assets/img/icon/cuo_gray.png"
                    v-if="item.lamphouseonoff == 0 || item.platfondonoff == 0 || item.logoonoff == 0"
                  />
                </span>
                <!-- <span
                  class="openSwitch"
                  v-if="item.lamphouseonoff == 1 || item.platfondonoff == 1 || item.logoonoff == 1"
                ></span>
                <span
                  class="downSwitch"
                  v-if="item.lamphouseonoff == 0 || item.platfondonoff == 0 || item.logoonoff == 0"
                ></span>-->
              </div>
              <div class="status">
                <span class="state" style="display:inline-block;margin-left:0rem">
                  <img
                    style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                    src="../assets/img/icon/wifi_green.png"
                    v-if="item.lamphouseline == 1 || item.platfondline == 1 || item.logoline == 1"
                  />
                  <img
                    style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                    src="../assets/img/icon/error_yellow.png"
                    v-if="item.lamphouseline == 0 || item.platfondline == 0 || item.logoline == 0"
                  />
                </span>
                <!-- <span
                class="openLigthing"
                v-if="item.lamphouseline == 1 || item.platfondline == 1 || item.logoline == 1"
              ></span>
              <span
                class="downLigthing"
                v-if="item.lamphouseline == 0 || item.platfondline == 0 || item.logoline == 0"
                ></span>-->
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import Control from "../components/control";
import Overview from "../components/overview";
import checked from "../components/checked";
// import * as mapWork from "../map3d/work";

export default {
  name: "illumine",
  data() {
    return {
      sitename: "",
      wuyong: 0,
      tagSwitch: "overview",
      btnSwitch: true,
      Lighting: {
        allChecked: false,
        InputData: [],
        Datalist: []
      },
      arrayindex: [],
      isnumber: 0,
      stationid: ""
    };
  },
  computed: {
    code: function() {
      return this.modulecode[this.$route.name];
    },
    LightingFormData: function() {        
      return this.$store.state.websocket.hasOwnProperty("203004")
        ? this.$store.getters.websocketData["203004"].msg
        : false;
    }
  },
  watch: {
      LightingFormData(val){
          if(this.stationid){
                let lamphouses = this.LightingFormData.lamphouses;
                let platfonds = this.LightingFormData.platfonds;
                let logos = this.LightingFormData.logos;
                let lamphousesid = lamphouses.filter(ele => ele.stationid == this.stationid);
                let platfondsid = platfonds.filter(ele => ele.stationid == this.stationid);
                let logosid = logos.filter(ele => ele.stationid == this.stationid);
                this.Lighting.Datalist = [];
                if (lamphousesid != "") {
                    lamphousesid[0].checked = false;
                    this.Lighting.Datalist.push(lamphousesid[0]);
                }
                if (platfondsid != "") {
                    platfondsid[0].checked = false;
                    this.Lighting.Datalist.push(platfondsid[0]);
                }
                if (logosid != "") {
                    logosid[0].checked = false;
                    this.Lighting.Datalist.push(logosid[0]);
                }
          }
      }
  },
  components: {
    Control,
    Overview,
    checked
  },
  created: function() {},
  mounted: function() {
    this.$nextTick(function() {
      var self = this;
      setTimeout(() => {
        self.$refs.overview.entry();
      }, 100);
    });
  },
  methods: {
    isPoupSection() {
      this.$refs.poupSection.style.zIndex = -10;
    },
    leave() {
      if (this.tagSwitch == "overview") {
        this.$refs.overview.leave();
      } else if (this.tagSwitch == "control") {
        this.$refs.control.leave();
      }
    },

    targetclick(target) {
      let namevalue = this.$arrMapPoint.all.filter(ele => ele.siteid == target);
      this.sitename = namevalue[0].sitename;
      this.Lighting.allChecked = false;
      if (target == null) {
        return false;
      }
            this.$store.dispatch("setNow", 0);

      var self = this;
      $(".Lighting").fadeIn();
      setTimeout(() => {
        if ($(".Lighting").css("display") == "block") {
          if (self.isnumber === 0) {
            this.$refs.overview.leave();
          } else if (self.isnumber === 1) {
            this.$refs.control.leave();
          }
        } else {
          if (self.isnumber === 0) {
            this.$refs.overview.entry();
          } else if (self.isnumber === 1) {
            this.$refs.control.entry();
          }
        }
      });
      window.localStorage.setItem("index", target);
      this.stationid = target;
      this.ifstationid(this.stationid);
    },
    ifstationid(targetid) {
      var that = this;
      if (!this.LightingFormData) {
        return false;
      }
      let lamphouses = this.LightingFormData.lamphouses;
      let platfonds = this.LightingFormData.platfonds;
      let logos = this.LightingFormData.logos;
      let lamphousesid = lamphouses.filter(ele => ele.stationid == targetid);
      let platfondsid = platfonds.filter(ele => ele.stationid == targetid);
      let logosid = logos.filter(ele => ele.stationid == targetid);
      this.Lighting.Datalist = [];
      if (lamphousesid != "") {
        lamphousesid[0].checked = false;
        this.Lighting.Datalist.push(lamphousesid[0]);
      }
      if (platfondsid != "") {
        platfondsid[0].checked = false;
        this.Lighting.Datalist.push(platfondsid[0]);
      }
      if (logosid != "") {
        logosid[0].checked = false;
        this.Lighting.Datalist.push(logosid[0]);
      }
      this.$store.state.checkedArray = {};
      this.wuyong++;
    },
    show(index) {
      this.$refs.poupSection.style.zIndex = 0;
      this.$store.dispatch("setisnum", index);
      let isindex = this.$store.getters.getterisnum;
      if (index == null) {
        return false;
      }
      if (isindex === 0) {
        this.isnumber = 0;
        // $(".Lighting").fadeOut(200);
        this.$refs.control.leave();
        this.$refs.overview.entry();
      } else if (isindex === 1) {
        this.isnumber = 1;
        // $(".Lighting").fadeOut(200);
        this.$refs.overview.leave();
        this.$refs.control.entry();
      }
    },
    handleLightingControl(flag) {
      let params,
        lightArray = [];
      for (const key in this.$store.state.checkedArray) {
        if (this.$store.state.checkedArray[key] && key != "all") {
          this.Lighting.Datalist.forEach(item => {
            if (key == item.platfondid) {
              lightArray.push({ id: Number(key), lighttype: 1 });
            } else if (key == item.lamphouseid) {
              lightArray.push({ id: Number(key), lighttype: 3 });
            } else if (key == item.logoid) {
              lightArray.push({ id: Number(key), lighttype: 2 });
            }
          });
        }
      }
      if (!lightArray.length) {
        this.$Message.closeAll();
        this.$Message.error("请先选择站点");
      } else {
        if (flag == "open") {
          params = {
            msgid: "550e8400-e29b-41d4-a716-446655440000",
            modulecode: this.code,
            msgtype: 0, //消息类型：0-命令
            msgcode: 200001,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 1, //命令类型：1-开灯；2-关灯；
              lightsarr: lightArray
            }
          };
        } else if (flag == "down") {
          params = {
            msgid: "550e8400-e29b-41d4-a716-446655440000",
            modulecode: this.code,
            msgtype: 0, //消息类型：0-命令
            msgcode: 200001,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 2, //命令类型：1-开灯；2-关灯；
              lightsarr: lightArray
            }
          };
        }
        this.getControlAPI(params);
      }
    },
    // 发送请求
    getControlAPI(data) {
      this.$api.post("/websocket/command", data).then(function(res) {
        console.log(res);
      });
    },
    disnone() {
    this.wuyong++
      $(".Lighting").fadeOut(200);
      this.$resetMapHeight();
      setTimeout(() => {
        if (this.isnumber === 0) {
          this.$refs.overview.entry();
        } else if (this.isnumber === 1) {
          this.$refs.control.entry();
        }
      }, 800);
    },
    shownum(index) {
      this.$refs.poupSection.style.zIndex = 0;
      Vue.prototype.workCover
        ? Vue.prototype.workCover.revertBillboardsStatus()
        : null;
      this.$store.state.checkedArray = {};
      this.$refs.control.wuyong++;
      this.$store.dispatch("setisnum", index);
      let isindex = this.$store.getters.getterisnum;
      this.$resetMapHeight();
      if (isindex === 0) {
        this.isnumber = 0;
        $(".Lighting").fadeOut(200);
        if (this.btnSwitch && this.tagSwitch !== "overview") {
          this.btnSwitch = false;
          this.tagSwitch = "overview";
          this.$refs.control.leave();
          setTimeout(() => {
            this.$refs.overview.entry();
            setTimeout(() => {
              this.btnSwitch = true;
            }, 800);
          }, 600);
        }
      } else if (isindex === 1) {
        this.isnumber = 1;
        $(".Lighting").fadeOut(200);
        if (this.btnSwitch && this.tagSwitch !== "control") {
          this.btnSwitch = false;
          this.tagSwitch = "control";
          this.$refs.overview.leave();
          setTimeout(() => {
            this.$refs.control.entry();
            setTimeout(() => {
              this.btnSwitch = true;
            }, 800);
          }, 600);
        }
      }
    },
    closecompoent() {
      // 关闭弹窗
      $(".Lighting").fadeOut(200);
    }
  },

  beforeRouteLeave(to, from, next) {
    this.$refs.overview.leave();
    this.$refs.control.leave();
    this.$store.dispatch("setisnum", 0);
            this.$store.dispatch("setNow", 0);

    $(".Lighting").fadeOut(600);
    setTimeout(() => {
      next();
    }, 800);
  }
};
</script>

<style lang="scss" scoped>
.el-button + .el-button {
  margin-left: 0rem;
}
.el-button--mini {
  width: 0.7rem;
  height: 0.36rem;
  padding: 0.05rem 0.05rem;
  font-size: 0.14rem;
  border: 0.01rem solid rgba(255, 255, 255, 1);
  opacity: 0.8;
  border-radius: 0.04rem;
  &:hover {
    box-shadow: 0 0 0.1rem rgba(255, 255, 255, 0.8) inset;
  }
}
.auto {
  margin: 0.2rem;
}
.poupSection {
  position: absolute;
}
.control,
.overview {
  position: absolute;
  top: 1.1rem;
  left: 0.3rem;
}

.Lighting {
  position: fixed;
  overflow: hidden;
  display: none;
  left: 63%;
  top: 46%;
  width: 4rem;
  height: 3.3rem;
  transform: translate(-50%, -50%);
  color: #fff;
  background: url("../assets/img/bg_g.png") no-repeat center/cover;
  background-size: 100% 100%;
  .o_box_corner {
    position: absolute;
    width: 0.2rem;
    height: 0.2rem;
    border: 0.01rem solid #1ff7f2;
  }
  .obc1 {
    top: 0;
    left: 0;
    border-right: none;
    border-bottom: none;
    border-radius: 0.04rem 0 0 0;
  }
  .obc2 {
    top: 0;
    right: 0;
    border-left: none;
    border-bottom: none;
    border-radius: 0 0.04rem 0 0;
  }
  .obc3 {
    right: 0;
    bottom: 0;
    border-left: none;
    border-top: none;
    border-radius: 0 0 0.04rem 0;
  }
  .obc4 {
    left: 0;
    bottom: 0;
    border-right: none;
    border-top: none;
    border-radius: 0 0 0 0.04rem;
  }

  .Lighting-title {
    position: relative;
    font-size: 0.16rem;
    height: 0.57rem;
    line-height: 0.57rem;
    .iconfont {
      position: absolute;
      left: -0.28rem;
      bottom: -0.04rem;
      width: 0.3rem;
      height: 0.2rem;
      background: url("../assets/img/control/LcdIcon.png") no-repeat
        center/cover;
    }
  }
  .Lighting-content {
    overflow: hidden;
    font-size: 0.16rem;
    .show-Control {
      line-height: 0.7rem;
      .open {
        background: #18b7b0;
        margin-right: 0.15rem;
        float: right;
      }
      .down {
        background: #ff992a;
        float: right;
      }
    }
    .btnBox {
      overflow: hidden;
      .active {
        background: url("../assets/img/control/btnHover.png") no-repeat
          center/cover !important;
      }
      .btn {
        padding-left: 0.12rem;
        float: left;
        width: 0.975rem;
        height: 0.35rem;
        color: #fff;
        line-height: 0.35rem;
        margin-right: 0.1rem;
        cursor: pointer;
        background: url("../assets/img/control/btn.png") no-repeat center/cover;
        &:hover {
          background: url("../assets/img/control/btnHover.png") no-repeat
            center/cover;
        }
      }
    }
  }
  .Lighting-from {
    margin-top: 0.1rem;
    font-size: 0.14rem;
    .frombox {
      .fromItem-title {
        background: rgba(86, 255, 254, 0.3);
      }
      .fromItem {
        height: 0.4rem;
        line-height: 0.4rem;
        overflow: hidden;
        &:hover {
          background: rgba(86, 255, 254, 0.3);
        }
        .status {
          float: left;
          width: 20%;
          text-align: center;
          overflow: hidden;
          .openLigthing {
            display: inline-block;
            width: 0.15rem;
            height: 0.15rem;
            margin-top: 0.1rem;
            background: url("../assets/img/control/correct.png") no-repeat
              center/cover;
          }
          .downLigthing {
            display: inline-block;
            margin-top: 0.1rem;
            width: 0.16rem;
            height: 0.16rem;
            background: url("../assets/img/control/error.png") no-repeat
              center/cover;
          }
        }
        .switch {
          float: left;
          width: 20%;
          text-align: center;
          .openSwitch {
            display: inline-block;
            margin-top: 0.1rem;
            width: 0.18rem;
            height: 0.18rem;
            background: url("../assets/img/control/lightOpen.png") no-repeat
              center/cover;
          }
          .downSwitch {
            display: inline-block;
            margin-top: 0.1rem;
            width: 0.18rem;
            height: 0.18rem;
            background: url("../assets/img/control/lightDown.png") no-repeat
              center/cover;
          }
        }
        .locationName {
          float: left;
          width: 40%;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .checkbox {
          float: left;
          width: 20%;
          display: flex;
          justify-content: center;
          align-items: center;
          .checked {
            display: inline-block;
            cursor: pointer;
            margin-top: 0.03rem;
            width: 0.16rem;
            height: 0.16rem;
            background: url("../assets/img/control/checked.png") no-repeat
              center/cover;
          }
          .check {
            display: inline-block;
            cursor: pointer;
            margin-top: 0.03rem;
            width: 0.16rem;
            height: 0.16rem;
            background: url("../assets/img/control/check-1.png") no-repeat
              center/cover;
          }
        }
      }
    }
  }
}
.errorimg {
  float: right;
  width: 0.16rem;
  margin-left: 0.2rem;
  margin-top: 0.2rem;
  height: 0.16rem;
  margin-right: 0.15rem;
  background: url("../assets/img/control/error.png") no-repeat center/cover;
}
</style>

