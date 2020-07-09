<template>
  <div class="electricity subMain">
    <div class="r_btn_box">
      <div class="r_btn_item" @click="shownum(0)">
        <div class="r_btn r_shebei" :class="this.tagSwitch == 'overview' ? 'active' : null"></div>
        <span :class="this.tagSwitch == 'overview' ? 'active' : null">设备概览</span>
      </div>
      <div class="r_btn_item" @click="shownum(1)">
        <div class="r_btn r_huilu" :class="this.tagSwitch == 'control' ? 'active' : null"></div>
        <span :class="this.tagSwitch == 'control' ? 'active' : null">集中控制器</span>
      </div>
    </div>
    <div class="poupSection" ref="poupSection">
      <Overview ref="overview" />
      <Control ref="control" />
    </div>
    <div style="display:none;">{{gatewayFormData}}</div>

    <!-- 用电管理 -->
    <div class="ligthingAdmin" ref="ligthingAdmin">
      <div class="auto">
        <div class="section-title">
          <span class="fontsize_q left_m">{{sitename}}</span>
          <span class="errorimg" @click="disnone()"></span>
        </div>
        <div class="title_pp">
          <span class="state" style="margin-left:0rem;">
            <span class="status_p twone" style="margin-left: 1.68rem;">状态</span>
            <span class="state" style="display:inline-block;">
              <img
                style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                src="../assets/img/icon/wifi_green.png"
                v-if="energy.Data.line == 1"
              />
              <img
                style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                src="../assets/img/icon/error_yellow.png"
                v-if="energy.Data.line == 0"
              />
            </span>
          </span>
        </div>
        <div>
          <span class="twone">更新时间</span>
          <span class="right_m marright" style="float:none;margin-left:.85rem;">
            {{time}}
          </span>
        </div>
        <div>
          <span class="twone">控制</span>
          <span class="right_m marright">
            <el-button
              style="margin-left: 0.2rem;"
              type="success"
              size="mini"
              class="open"
              @click="handleLightingControl('open')"
            >闭合回路</el-button>
            <el-button
              type="warning"
              size="mini"
              class="down"
              @click="handleLightingControl('down')"
            >断开回路</el-button>
            <el-button
              type="primary"
              size="mini"
              class="rest"
              @click="handleLightingControl('read')"
            >读取回路</el-button>
          </span>
        </div>
        <div class="energyFrom">
          <ul class="frombox">
            <li class="fromItem fromItem-title">
              <div class="checkbox">
                <checked :target="'all'" :key="wuyong" />
              </div>
              <div class="locationName">回路名称</div>
              <span class="switch">开关</span>
            </li>
            <div style="height:2rem" class="sbar">
              <li class="fromItem" v-for="(item,index) in updatedSingData.loops" :key="index">
                <div class="checkbox">
                  <checked :target="item.loop" :key="wuyong" />
                </div>
                <div class="locationName">{{item.device}}</div>
                <div class="switch">
                  <span class="onoff" style="display:inline-block;margin-left:0rem">
                    <img
                      style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                      src="../assets/img/icon/dui_green.png"
                      v-if="item.state == 1"
                    />
                    <img
                      style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                      src="../assets/img/icon/cuo_gray.png"
                      v-if="item.state == 0"
                    />
                  </span>
                </div>
              </li>
            </div>
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
  name: "electricity",
  data() {
    return {
      sitename: "",
      wuyong: 0,
      tagSwitch: "overview",
      btnSwitch: true,
      eLoading: 1,
      energy: {
        allChecked: false,
        InputData: [],
        Data: [
          {
            location: "logo照明",
            id: "1",
            status: 1,
            onoff: 1,
            checked: false
          },
          {
            location: "顶棚照明",
            id: "2",
            status: 0,
            onoff: 1,
            checked: false
          },
          {
            location: "站台照明",
            id: "3",
            status: 1,
            onoff: 1,
            checked: false
          },
          {
            location: "LED屏",
            id: "4",
            status: 0,
            onoff: 0,
            checked: false
          },
          {
            location: "LCD屏",
            id: "5",
            onoff: 1,
            status: 1,
            checked: false
          }
        ]
      },
      stationid: "",
      checkedArray: [
        {
          id: 1,
          checked: false
        },
        {
          id: 2,
          checked: false
        },
        {
          id: 3,
          checked: false
        },
        {
          id: 4,
          checked: false
        },
        {
          id: 5,
          checked: false
        }
      ]
    };
  },
  computed: {
    time: function(){
        var self = this
        if (this.$store.getters.websocketData[206002]) {
            return this.$store.getters.websocketData[206002].timestamp.substr(0,19);
        } else {
            return '';
        }
    },
    code: function() {
      return this.modulecode[this.$route.name];
    },
    gatewayFormData: function() {
        var self = this
      if (this.$store.getters.websocketData[206002]) {
        return this.$store.getters.websocketData[206002].msg.gateways;
      } else {
        return false;
      }
    },
    updatedSingData:function(){
        
        if (this.$store.getters.websocketData[206002]) {
            for (let i = 0; i < this.$store.getters.websocketData[206002].msg.gateways.length; i++) {
                if (this.stationid == this.$store.getters.websocketData[206002].msg.gateways[i].stationid) {
                    this.energy.Data = this.$store.getters.websocketData[206002].msg.gateways[i];
                }
            }
            return this.energy.Data;
        } else {
            return false;
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
  // watch: {
  //   gatewayFormData: function(newVal, oldVal) {
  //     this.ifstationid(this.stationid);
  //   }
  // },
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
      $(".ligthingAdmin").fadeIn();
      setTimeout(() => {
        if ($(".ligthingAdmin").css("display") == "block") {
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
      this.$store.state.checkedArray = {};
      var that = this;
      if (!this.gatewayFormData) {
        return false;
      }
      for (let i = 0; i < this.gatewayFormData.length; i++) {
        if (targetid == this.gatewayFormData[i].stationid) {
          this.energy.Data = this.gatewayFormData[i];
        }
      }
      this.wuyong++;
    },
    handleLightingControl(flag) {
      let loopsId = [];
      for (const key in this.$store.state.checkedArray) {
        if (this.$store.state.checkedArray[key] && key != "all") {
          loopsId.push(Number(key));
        }
      }
      let params;
      let self = this;
      if (!loopsId.length) {
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
              cmdtype: 1,
              gatewayid: [this.energy.Data.id],
              loops: loopsId
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
              cmdtype: 0,
              gatewayid: [this.energy.Data.id],
              loops: loopsId
            }
          };
        } else if (flag == "read") {
          params = {
            msgid: "550e8400-e29b-41d4-a716-446655440000",
            modulecode: this.code,
            msgtype: 0, //消息类型：0-命令
            msgcode: 200001,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 2,
              gatewayid: [this.energy.Data.id],
              loops: loopsId
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

    show(index) {
      this.$refs.poupSection.style.zIndex = 0;
      this.$store.dispatch("setisnum", index);
      let isindex = this.$store.getters.getterisnum;
      if (index == null) {
        return false;
      }
      if (isindex === 0) {
        this.isnumber = 0;
        // $(".ligthingAdmin").fadeOut(200);
        this.$refs.control.leave();
        this.$refs.overview.entry();
      } else if (isindex === 1) {
        this.isnumber = 1;
        // $(".ligthingAdmin").fadeOut(200);
        this.$refs.overview.leave();
        this.$refs.control.entry();
      }
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
        $(".ligthingAdmin").fadeOut(200);
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
        $(".ligthingAdmin").fadeOut(200);
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
    disnone() {
      $(".ligthingAdmin").fadeOut(400);
      this.checkedArray.forEach(ele => {
        ele.checked = false;
      });
      setTimeout(() => {
        if (this.isnumber === 0) {
          this.$refs.overview.entry();
        } else if (this.isnumber === 1) {
          this.$refs.control.entry();
        }
      }, 800);
      this.$resetMapHeight();
    },
    closecompoent() {
      // 关闭弹窗
      $(".ligthingAdmin").fadeOut(200);
    }
  },

  beforeRouteLeave(to, from, next) {
    $(".ligthingAdmin").fadeOut(600);
            this.$store.dispatch("setNow", 0);
    this.$store.dispatch("setisnum", 0);
    this.$refs.overview.leave();
    this.$refs.control.leave();
    setTimeout(() => {
      next();
    }, 800);
  }
};
</script>

<style lang="scss" scoped>
.el-button + .el-button {
  margin-left: 0.1rem;
}
.el-button--mini {
  width: 0.7rem;
  height: 0.36rem;
  padding: 0.05rem 0.05rem;
  font-size: 0.14rem;
  border: 0.01rem solid white;
  opacity: 0.8;
  border-radius: 0.04rem;
  &:hover {
    box-shadow: 0 0 0.1rem rgba(255, 255, 255, 0.8) inset;
  }
}
.twone {
  margin-left: 0.21rem;
  line-height: 0.5rem;
}
.hang {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.fontsize_z {
  font-size: 0.18rem;
}
.fontsize_q {
  font-size: 0.14rem;
}
.pucolor {
  color: rgba(31, 247, 242, 1);
}
.pucolor_q {
  color: rgba(137, 250, 139, 1);
}
.pucolor_w {
  color: rgba(255, 156, 0, 1);
}
.flex {
  width: 100%;
  height: 7vh;
  display: flex;
  .e_icon {
    width: 0.5rem;
    height: 0.5rem;
  }
}
// 抬头样式（传递图片路径）
@mixin title($path) {
  position: relative;
  font-size: 0.16rem;
  margin-top: 0.1rem;
  .iconfont {
    position: absolute;
    left: -0.28rem;
    bottom: -0.01rem;
    width: 0.3rem;
    height: 0.18rem;
    background: url($path) no-repeat center/cover;
  }
}
.title_pp {
  @include title("../assets/img/control/electroIcon.png");
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
// 弹窗背景区域
.bgContent {
  position: fixed;
  overflow: hidden;
  display: none;
  left: 63.5%;
  top: 46%;
  width: 4.6rem;
  height: 5.2rem;
  transform: translate(-50%, -50%);
  color: #fff;
  background: url("../assets/img/box_e.png") no-repeat center/cover;
  background-size: 100% 100%;
}
.ligthingAdmin {
  @extend .bgContent;
  .section-title {
    position: relative;
    font-size: 0.16rem;
    width: 98%;
    margin: 0 auto;
    height: 0.54rem;
    line-height: 0.54rem;
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

  .energyBtnBox {
    overflow: hidden;
    color: #fff;
    padding-bottom: 0.2rem;

    .energyBtn {
      margin-top: 0.2rem;

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
  }

  .energyFrom {
    .frombox {
      .fromItem-title {
        background: rgba(86, 255, 254, 0.3);
      }
      .fromItem {
        height: 0.4rem;
        line-height: 0.4rem;
        overflow: hidden;
        margin-left: 0.04rem;
        &:hover {
          background: rgba(86, 255, 254, 0.3);
        }
        .switch {
          float: left;
          width: 30%;
          text-align: center;
        }
        .locationName {
          float: left;
          width: 50%;
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
        }
      }
    }
  }
}
.errorimg {
  float: right;
  width: 0.16rem;
  height: 0.16rem;
  margin-right: 0.1rem;
  margin-top: 0.2rem;
  background: url("../assets/img/control/error.png") no-repeat center/cover;
}
.o_item1 {
  margin-top: 0.1rem;
}
.o_item1 div {
  float: left;
}
.e_box {
  margin-left: 0.1rem;
  width: 1.5rem;
  height: 0.52rem;
}
.e_icon {
  width: 0.52rem;
  height: 0.52rem;
}
.e_icon0_oc {
  background: url("../assets/img/citem0_oc.png") no-repeat center/contain;
}
.e_icon1_oc {
  background: url("../assets/img/citem1_oc.png") no-repeat center/contain;
}
.e_icon0 {
  background: url("../assets/img/citem0.png") no-repeat center/cover;
}
.e_icon1 {
  background: url("../assets/img/icon_nh.png") no-repeat center/contain;
}
.e_icon2 {
  background: url("../assets/img/citem2.png") no-repeat center/cover;
}
.e_icon3 {
  background: url("../assets/img/citem3.png") no-repeat center/cover;
}
.e_icon4 {
  background: url("../assets/img/citem4.png") no-repeat center/cover;
}
.e_icon5 {
  background: url("../assets/img/citem5.png") no-repeat center/cover;
}
.e_text_box {
  margin-left: 0.08rem;
  width: 0.76rem;
  height: 0.52rem;

  .e_num_kwh {
    display: block;
    height: 0.23rem;
    line-height: 0.23rem;
    font-size: 0.23rem;

    .e_num,
    .e_num2 {
      float: left;
      width: 0.3rem;
      height: 0.16rem;
      color: #8cf9cd;
      font-size: 0.16rem;
      font-weight: 700;
      text-align: center;
    }
    .e_num2 {
      width: 100%;
    }
    .e_kwh {
      float: right;
      font-size: 0.13rem;
    }
  }
  .e_text {
    display: block;
    padding-top: 0.02rem;
    height: 0.29rem;
    border-top: 0.01rem solid #93ffd2;
    background: linear-gradient(transparent, rgba(77, 173, 183, 0.8));
    font-size: 0.12rem;
    line-height: 0.29rem;
    text-align: center;
  }
}
.openclose {
  height: 0.5rem;
  line-height: 0.5rem;
  span:nth-child(1) {
    padding: 0.05rem;
  }
  span:nth-child(2) {
    padding: 0.05rem;
    border: 1px solid #48f6f6;
    color: #48f6f6;
    border-radius: 8px;
  }
  span:nth-child(3) {
    padding: 0.05rem;
    border: 1px solid #48f6f6;
    color: #48f6f6;
    border-radius: 8px;
  }
  span:nth-child(4) {
    padding: 0.05rem;
    border: 1px solid #48f6f6;
    color: #48f6f6;
    border-radius: 8px;
  }
}
.cursor {
  cursor: pointer;
}
</style>

