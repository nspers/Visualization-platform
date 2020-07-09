<template>
  <div class="lcd subMain">
    <div class="r_btn_box">
      <div class="r_btn_item" @click="shownum(0)">
        <div class="r_btn r_shebei" :class="this.tagSwitch == 'overview' ? 'active' : null"></div>
        <span :class="this.tagSwitch == 'overview' ? 'active' : null">设备概览</span>
      </div>
      <div class="r_btn_item" @click="shownum(1)">
        <div class="r_btn r_shebei_control" :class="this.tagSwitch == 'control' ? 'active' : null"></div>
        <span :class="this.tagSwitch == 'control' ? 'active' : null">设备控制</span>
      </div>
    </div>
    <div class="poupSection" ref="poupSection">
      <Overview ref="overview" />
      <Control ref="control" />
    </div>
    <div class="movieLCDSection" ref="movieLCDSection">
      <div class="auto">
        <div class="control-title">
          <span class="left_m">{{sitename}}</span>
          <span class="errorimg" @click="disnone()"></span>
        </div>

        <div class="control-content">
          <Div class="lightstatu">
            <span class="switch">
              <span class="switch_p" style="margin-left: 1.25rem;">开关</span>

              <span class="onoff" style="display:inline-block;">
                <img src="../assets/img/icon/dui_green.png" v-if="LcdData.onoff == 1" />
                <img src="../assets/img/icon/cuo_gray.png" v-if="LcdData.onoff == 0" />
              </span>
            </span>
            <span class="state">
              <span class="status_p left_m">状态</span>

              <span class="state" style="display:inline-block">
                <img
                  class="marppo"
                  src="../assets/img/icon/wifi_green.png"
                  v-if="LcdData.status == 1"
                />
                <img
                  class="marppo"
                  src="../assets/img/icon/error_yellow.png"
                  v-if="LcdData.status == 0"
                />
              </span>
            </span>
          </Div>
          <div style="float:right:margin-right:0.1rem">
            <span class="left_m">控制</span>
            <span class="right_m marright">
              <el-button
                style="margin-left: 0.2rem;"
                type="success"
                size="mini"
                class="open"
                @click="handleLEDControl('open')"
              >开启</el-button>
              <el-button
                type="warning"
                size="mini"
                class="down"
                @click="handleLEDControl('down')"
              >关闭</el-button>
              <el-button
                type="primary"
                size="mini"
                class="rest"
                @click="handleLEDControl('rest')"
              >重启</el-button>
            </span>
          </div>
          <div class="control-content_item">
            <span class="item-type left_m">音量</span>
            <span class="light_rr">{{ LcdData.volume}}</span>
            <div class="item-slider">
              <el-slider v-model="LcdData.volume" :step="10" @change="handleLCDSlider"></el-slider>
            </div>
          </div>
          <div class="control-content_item">
            <span class="item-type left_m">亮度</span>
            <span class="light_rr">{{ LcdData.value2 }} 1&nbsp;</span>
            <div class="item-slider">
              <el-slider v-model="LcdData.value2" :step="10" @change="handleLCDSliderLight"></el-slider>
            </div>
          </div>
        </div>
        <!-- <div class="styimg">
          <div class="iframe_box">
            <iframe
              frameborder="0"
              scrolling="no"
              :src="'http://118.190.55.119:8080/lcd_bus.html?id=' + stationid"
            ></iframe>
          </div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Control from "../components/control";
import Overview from "../components/overview";
// import * as mapWork from "../map3d/work";

export default {
  name: "App",
  data() {
    return {
      sitename: "",
      tagSwitch: "overview",
      btnSwitch: true,
      //虚拟图片url
      LcdData: {
        // light: 0, // 亮度
        // volume: 0, // 音量,
        // name: "",
        // state: 0,
        // onoff: 0,
        // img: "../assets/img/control/error.png"
      },
      stationid: "",
      isnumber: 0
    };
  },
  components: {
    Control,
    Overview
  },
  computed: {
    code: function() {
      return this.modulecode[this.$route.name];
    },
    LcdFormData: function() {
      return this.$store.state.websocket.hasOwnProperty("204001")
        ? this.$store.getters.websocketData[204001].msg.lcds
        : 0;
    }
  },
  watch: {
    LcdFormData: function(newVal, oldVal) {
      this.ifstationid(this.stationid);
    }
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

      if (target == null) {
        return false;
      }
      this.$store.dispatch("setNow", 0);
      var self = this;
      $(".movieLCDSection").fadeIn();
      setTimeout(() => {
        if ($(".movieLCDSection").css("display") == "block") {
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
      if (this.LcdFormData == 0) {
        return false;
      }
      for (let i = 0; i < this.LcdFormData.length; i++) {
        if (targetid == this.LcdFormData[i].stationid) {
          this.LcdData = this.LcdFormData[i];
        }
      }
    },
    show(index) {
      this.$refs.poupSection.style.zIndex = 0;
      this.$store.dispatch("setisnum", index);
      let isindex = this.$store.getters.getterisnum;
      $(".movieLCDSection").fadeOut();
      if (isindex === 0) {
        this.isnumber = 0;
        this.$refs.control.leave();
        this.$refs.overview.entry();
      } else if (isindex === 1) {
        this.isnumber = 1;
        this.$refs.overview.leave();
        this.$refs.control.entry();
      }
      this.$store.state.compontIsShow = false;
    },

    // LCD开关
    handleLEDControl(flag) {
      if (!this.LcdData.id) {
        this.$Message.closeAll();
        this.$Message.error("暂无数据");
      } else {
        let params;
        let self = this;
        if (flag == "open") {
          params = {
            msgid: "550e8400-e29b-41d4-a716-446655440000",
            modulecode: this.code,
            msgtype: 0,
            msgcode: 10002,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 1, //命令类型：1-开启；2-关闭；3-重启；4-调光；5-音量
              light: 0,
              volume: this.LcdData.volume,
              lcds: [Number(this.LcdData.id)]
            }
          };
        } else if (flag == "down") {
          params = {
            msgid: "550e8400-e29b-41d4-a716-446655440000",
            modulecode: this.code,
            msgtype: 0,
            msgcode: 200001,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 2, //命令类型：1-开启；2-关闭；3-重启；4-调光；5-音量
              light: 0,
              volume: this.LcdData.volume,
              lcds: [Number(this.LcdData.id)]
            }
          };
        } else if (flag == "rest") {
          params = {
            msgid: "550e8400-e29b-41d4-a716-446655440000",
            modulecode: this.code,
            msgtype: 0,
            msgcode: 200001,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 3, //命令类型：1-开启；2-关闭；3-重启；4-调光；5-音量
              light: 0,
              volume: this.LcdData.volume,
              lcds: [Number(this.LcdData.id)]
            }
          };
        }
        this.getControlAPI(params);
      }
    },
    handleLCDSlider() {
      if (!this.LcdData.id) {
        this.$Message.closeAll();
        this.$Message.error("暂无数据");
      } else {
        let params = {
          msgid: "550e8400-e29b-41d4-a716-446655440000",
          modulecode: this.code,
          msgtype: 0,
          msgcode: 200001,
          timestamp: this.$getCurrentDate(),
          msg: {
            cmdtype: 5, //命令类型：1-开启；2-关闭；3-重启；4-调光；5-音量
            light: 0,
            volume: this.LcdData.volume,
            lcds: [Number(this.LcdData.id)]
          }
        };
        this.getControlAPI(params);
      }
    },
    handleLCDSliderLight() {
      if (!this.LcdData.id) {
        this.$Message.closeAll();
        this.$Message.error("暂无数据");
      } else {
        let params = {
          msgid: "550e8400-e29b-41d4-a716-446655440000",
          modulecode: this.code,
          msgtype: 0,
          msgcode: 200001,
          timestamp: this.$getCurrentDate(),
          msg: {
            cmdtype: 4, //命令类型：1-开启；2-关闭；3-重启；4-调光；5-音量
            light: 0,
            value2: this.LcdData.value2,
            lcds: [Number(this.LcdData.id)]
          }
        };
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
      $(".movieLCDSection").fadeOut(200);
      this.$resetMapHeight();
      setTimeout(() => {
        if (this.isnumber === 0) {
          this.$refs.overview.entry();
        } else if (this.isnumber === 1) {
          this.$refs.control.entry();
        }
      }, 800);
    },
    closecompoent() {
      // 关闭弹窗
      $(".movieLCDSection").fadeOut(200);
    },
    shownum(index) {
      this.$refs.poupSection.style.zIndex = 0;
      Vue.prototype.workCover
        ? Vue.prototype.workCover.revertBillboardsStatus()
        : null;
      this.$store.state.checkedArray = {};
      this.$refs.control.wuyong++;
      this.$resetMapHeight();
      this.$store.dispatch("setisnum", index);
      let isindex = this.$store.getters.getterisnum;
      if (isindex === 0) {
        this.isnumber = 0;
        $(".movieLCDSection").fadeOut(200);
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
        $(".movieLCDSection").fadeOut(200);
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
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("setisnum", 0);
    this.$store.dispatch("setNow", 0);

    this.$refs.overview.leave();
    this.$refs.control.leave();
    $(".movieLCDSection").fadeOut(600);
    setTimeout(() => {
      next();
    }, 800);
  }
};
</script>

<style lang="scss" scoped>
.auto {
  margin: 0.2rem;
  border: rgba(31, 247, 242, 1) solid 0.01rem;
  padding-bottom: 0.2rem;
}
.marppo {
  margin-left: 0.2rem;
}
.open {
  background: #18b7b0;
  width: 0.7rem;
  height: 0.36rem;
}
.down {
  background: #ff992a;
}
.rest {
  background: #73b97b;
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

.el-button + .el-button {
  margin-left: 0.1rem;
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

// 弹窗背景区域
.bgContent {
  position: fixed;
  overflow: hidden;
  display: none;
  left: 63.5%;
  top: 46%;
  width: 4.2rem;
  min-height: 5.7rem;
  transform: translate(-50%, -50%);
  color: #fff;
  background: url("../assets/img/kuang_q.png") no-repeat center/cover;
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
}

.movieLCDSection {
  @extend .bgContent;
  min-height: 1.7rem;
  .control-title {
    position: relative;
    font-size: 0.16rem;
    height: 0.6rem;
    line-height: 0.6rem;
    margin-left: -0.01rem;
    border-bottom: rgba(31, 247, 242, 1) solid 0.01rem;
    background: linear-gradient(
      to right,
      rgba(31, 247, 242, 0.5),
      rgba(35, 106, 138, 0)
    );
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
  .control-content {
    font-size: 0.16rem;
    .control-content_item {
      line-height: 0.36rem;
      margin-top: 0.07rem;
      // margin-top: 0.2rem;
      .item-type {
        display: inline-block;
        height: 0.36rem;
        line-height: 0.36rem;
      }

      .item-slider {
        float: right;
        width: 2.1rem;
      }
    }
  }

  .LED-from {
    margin-top: 0.1rem;
    overflow-y: auto;
    .frombox {
      .fromItem-title {
        background: rgba(86, 255, 254, 0.3);
      }
      .fromItem {
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: center;
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
          overflow: hidden;
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
      }
    }
  }
}
.styimg {
  padding: 0.1rem;
  margin: 0.1rem;
  min-height: 3rem;
  img {
    width: 100%;
    height: 100%;
  }
}
.errorimg {
  float: right;
  width: 0.16rem;
  height: 0.16rem;
  margin-right: 0.1rem;
  margin-top: 0.22rem;
  background: url("../assets/img/control/error.png") no-repeat center/cover;
}

.lightstatu {
  margin-top: 0.07rem;
  .state {
    // margin-left: 0rem !important;
    float: right;
    margin-right: 0.15rem;
  }
  .switch {
  }
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
  .openLigthing {
    display: inline-block;
    width: 0.15rem;
    height: 0.15rem;
    margin-top: 0.1rem;
    background: url("../assets/img/control/correct.png") no-repeat center/cover;
  }
  .downLigthing {
    display: inline-block;
    margin-top: 0.1rem;
    width: 0.16rem;
    height: 0.16rem;
    background: url("../assets/img/control/error.png") no-repeat center/cover;
  }
}
</style>

