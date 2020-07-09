<template>
  <div class="site subMain">
    <div class="r_btn_box">
      <div class="r_btn_item">
        <div class="r_btn r_car active"></div>
        <span class="active">站台概览</span>
      </div>
    </div>
    <div class="wrapbox" ref="overview">
      <!--设备运行状态-->
      <div class="obox_h320 trans-up trans-up-delay-3" style="padding-top:0rem">
        <div class="dev_state_box">
          <div class="o_title mar_t" style="border-radius: 0.05rem 0 0 0;">
            <span>
              <img class="line_h" src="../assets/img/sb.png" />
            </span>
            <span>设备状态</span>
          </div>
          <div class="flex">
            <div class="hang">
              <div class="e_box">
                <div class="e_icon e_icon1">
                  <div class="e_icon e_icon1_oc move1"></div>
                </div>
              </div>
            </div>
            <div class="hang">
              <div class="fontsize_z pucolor">
                <!-- <span v-if="!wsData.lighttotal" class="iconfont  fontsize_z tf_rom">&#xe6af;</span> -->
                <span
                  :class="{'':eLoading===0,'iconfont  fontsize_z tf_rom icon-jiazaizhong':eLoading===1}"
                ></span>
                {{wsData.lighttotal}}
              </div>
              <div class="fontsize_q">照明总数</div>
            </div>
            <div class="hang">
              <div class="fontsize_z pucolor_q">
                <span
                  :class="{'':eLoading==0,'iconfont  fontsize_z tf_rom icon-jiazaizhong':eLoading==1}"
                ></span>
                {{wsData.lightonline}}
              </div>
              <div class="fontsize_q">在线</div>
            </div>
            <div class="hang">
              <div class="fontsize_z pucolor_w">
                <span
                  :class="{'':eLoading==0,'iconfont  fontsize_z tf_rom icon-jiazaizhong':eLoading==1}"
                ></span>
                {{wsData.lightoffline}}
              </div>
              <div class="fontsize_q">离线</div>
            </div>
          </div>
          <div class="flex">
            <div class="hang">
              <div class="e_box">
                <div class="e_icon e_icon2">
                  <div class="e_icon e_icon1_oc move1"></div>
                </div>
              </div>
            </div>
            <div class="hang">
              <div class="fontsize_z pucolor">
                <span
                  :class="{'':eLoading==0,'iconfont  fontsize_z tf_rom icon-jiazaizhong':eLoading==1}"
                ></span>
                {{wsData.ledtotal}}
              </div>
              <div class="fontsize_q">LED总数</div>
            </div>
            <div class="hang">
              <div class="fontsize_z pucolor_q">
                <span
                  :class="{'':eLoading==0,'iconfont  fontsize_z tf_rom icon-jiazaizhong':eLoading==1}"
                ></span>
                {{wsData.ledonline}}
              </div>
              <div class="fontsize_q">在线</div>
            </div>
            <div class="hang">
              <div class="fontsize_z pucolor_w">
                <span
                  :class="{'':eLoading==0,'iconfont  fontsize_z tf_rom icon-jiazaizhong':eLoading==1}"
                ></span>
                {{wsData.ledoffline}}
              </div>
              <div class="fontsize_q">离线</div>
            </div>
          </div>
          <div class="flex border_n">
            <div class="hang">
              <div class="e_box">
                <div class="e_icon e_icon3">
                  <div class="e_icon e_icon1_oc move1"></div>
                </div>
              </div>
            </div>
            <div class="hang">
              <div class="fontsize_z pucolor">
                <span
                  :class="{'':eLoading==0,'iconfont  fontsize_z tf_rom icon-jiazaizhong':eLoading==1}"
                ></span>
                {{wsData.lcdtotal}}
              </div>
              <div class="fontsize_q">LCD总数</div>
            </div>
            <div class="hang">
              <div class="fontsize_z pucolor_q">
                <span
                  :class="{'':eLoading==0,'iconfont  fontsize_z tf_rom icon-jiazaizhong':eLoading==1}"
                ></span>
                {{wsData.lcdonline}}
              </div>
              <div class="fontsize_q">在线</div>
            </div>
            <div class="hang">
              <div class="fontsize_z pucolor_w">
                <span
                  :class="{'':eLoading==0,'iconfont  fontsize_z tf_rom icon-jiazaizhong':eLoading==1}"
                ></span>
                {{wsData.lcdoffline}}
              </div>

              <div class="fontsize_q">离线</div>
            </div>
          </div>
        </div>
        <div class="trans-up trans-up-delay-5">
          <div class="o_title">
            <span>
              <img class="line_h" src="../assets/img/nh.png" />
            </span>
            <span>能耗分析</span>
          </div>
          <div class="flex border_n" style="margin-top: .05rem;height: 1rem;">
            <div class="hang">
              <div class="e_icon e_icon0" style="width:0.6rem;height:0.6rem">
                <div class="e_icon e_icon0_oc move1" style="width:0.6rem;height:0.6rem"></div>
              </div>
            </div>
            <div class="hang">
              <div class="fontsize_z pucolor">
                <span>
                  <span
                    :class="{'':eLoading==0,'iconfont  fontsize_z tf_rom icon-jiazaizhong':eLoading==1}"
                  ></span>
                  {{wsData.currentmonth}}
                </span>
                <!-- <span class="font_t">kW‧h</span> -->
              </div>
              <div class="fontsize_q">本月 (kW‧h)</div>
            </div>
            <div class="hang">
              <div class="fontsize_z pucolor">
                <span>
                  <span
                    :class="{'':eLoading==0,'iconfont  fontsize_z tf_rom icon-jiazaizhong':eLoading==1}"
                  ></span>
                  {{wsData.lastmonth}}
                </span>
                <!-- <span class="font_t">kW‧h</span> -->
              </div>
              <div class="fontsize_q">上月 (kW‧h)</div>
            </div>
            <div class="hang">
              <div class="fontsize_z pucolor">
                <span>
                  <span
                    :class="{'':eLoading==0,'iconfont  fontsize_z tf_rom icon-jiazaizhong':eLoading==1}"
                  ></span>
                  {{wsData.thisyear}}
                </span>
                <!-- <span class="font_t">kW‧h</span> -->
              </div>
              <div class="fontsize_q">本年 (kW‧h)</div>
            </div>
          </div>
        </div>

        <div class="trans-up trans-up-delay-7 mar_p">
          <div class="o_title">
            <span>
              <img class="line_h" src="../assets/img/lx.png" />
            </span>
            <span>离线设备</span>
          </div>
          <div class="alog_box alarm_alog_box">
            <div class="ab_title">
              <span>设备名称</span>
              <span>离线时间</span>
              <span>状态</span>
              <span>报警</span>
            </div>
            <div class="alert_scroll sbar">
              <div class="as_nodata" v-if="!wsData.offlines.length">暂无离线设备</div>
              <ul class="scroll_ul" ref="sUl" v-if="wsData.offlines.length">
                <li
                  class="scroll_li"
                  v-for="(item,index) in wsData.offlines"
                  @click="goToSite(item.stationId)"
                  :key="index"
                >
                  <span>{{item.devicename}}</span>
                  <span>{{item.offlinetime}}</span>
                  <span>
                    <i class="a_type"></i>
                  </span>
                  <span>
                    <strong v-if="item.delstatus == 0" @click.stop="showalarm(item)">已处理</strong>
                    <strong v-else @click.stop="showalarm(item)" class="weichuli">未处理</strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog custom-class="pro-dialog" title="处理信息" :visible.sync="showalarmKG" width="30%">
      <div>
        <p>
          设备编号:
          <i></i>
          {{showalarmData.id}}
        </p>
        <p>
          报警时间:
          <i></i>
          {{showalarmData.alarmtime}}
        </p>
        <p>
          处理时间:
          <i></i>
          {{showalarmData.deltime}}
        </p>
        <p>
          事件类型:
          <i></i>
          {{showalarmData.alarmtype}}
        </p>
        <p>
          处理状态:
          <i></i>
          <font v-if="showalarmData.delstatus == 1">未处理</font>
          <font v-if="showalarmData.delstatus == 0">已处理</font>
        </p>
        <p v-if="showalarmData.delstatus == 0">
          处理人:
          <i></i>
          {{showalarmData.delperson}}
        </p>
        <p v-if="showalarmData.delstatus == 1">
          处理人:
          <i></i>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </p>
        <p v-if="showalarmData.delstatus == 0">
          问题描述:
          <i></i>
          <span>{{showalarmData.message}}</span>
        </p>
        <p v-if="showalarmData.delstatus == 1">
          问题描述:
          <i></i>
          <span>
            <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="textarea"></el-input>
          </span>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          v-if="showalarmData.delstatus == 0"
          type="primary"
          size="small"
          @click="showalarmKG = false"
        >确 定</el-button>
        <el-button
          v-if="showalarmData.delstatus == 1"
          type="primary"
          size="small"
          @click="savealarm(showalarmData)"
        >保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "site",
  data() {
    return {
      textarea: "",
      options: [],
      value: "",
      showalarmData: {},
      showalarmKG: false,
      msgCode: 202001,
      msgCode2: 202005,
      abScrollH: 0,
      eLoading: 1,
      wsData: {
        currentmonth: "",
        lastmonth: "",
        thisyear: "",
        lighttotal: "",
        lightonline: "",
        lightoffline: "",
        ledtotal: "",
        ledonline: "",
        ledoffline: "",
        lcdtotal: "",
        lcdonline: "",
        lcdoffline: "",
        offlines: []
      }
    };
  },
  created: function() {
    var self = this;
    this.$api.get("/getDurationPlayUser", {}).then(function(res) {
      self.options = res;
    });
  },
  computed: {
    //vuex
    getWsData() {
      if (this.$store.state.websocket.hasOwnProperty(this.msgCode)) {
        this.eLoading = 0;
        const wsMsg = this.$store.state.websocket[this.msgCode].msg;
        this.wsData.currentmonth = Math.round(wsMsg.currentmonth * 10) / 10;
        this.wsData.lastmonth = Math.round(wsMsg.lastmonth * 10) / 10;
        this.wsData.thisyear = Math.round(wsMsg.thisyear * 10) / 10;
        this.wsData.lighttotal = wsMsg.lighttotal;
        this.wsData.lightonline = wsMsg.lightonline;
        this.wsData.lightoffline = wsMsg.lightoffline;
        this.wsData.ledtotal = wsMsg.ledtotal;
        this.wsData.ledonline = wsMsg.ledonline;
        this.wsData.ledoffline = wsMsg.ledoffline;
        this.wsData.lcdtotal = wsMsg.lcdtotal;
        this.wsData.lcdonline = wsMsg.lcdonline;
        this.wsData.lcdoffline = wsMsg.lcdoffline;
      }
      if (this.$store.state.websocket.hasOwnProperty(this.msgCode2)) {
        const wsMsg = this.$store.state.websocket[this.msgCode2].msg.stations;
        this.wsData.offlines = [];
        for (let item of wsMsg) {
          for (let ofMsg of item.offlines) {
            this.wsData.offlines.push(ofMsg);
          }
        }
      }
    }
  },
  watch: {
    getWsData(nowval, oldval) {
      // console.log(nowval, oldval);
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      //左边栏入场动画
      setTimeout(() => {
        this.entry();
      }, 100);

      //如果告警列表元素存在 且 告警列表数据大于5条 才执行滚动
      // if (this.$refs.sUl && this.alertLog.length > 5) {
      //     this.abScrollH = 40 / 1920 * window.innerWidth;
      //     //参数：元素，行高，速度，延迟毫秒
      //     this.$alertScroll(this.$refs.sUl, this.abScrollH, 10, 2000)
      // }
    });
  },
  methods: {
    showalarm(data) {
      var self = this;
      this.$api
        .post("/tdel/getTdelMessgae", { type: data.type, msgid: data.msgid })
        .then(function(res) {
          self.showalarmData = res.result.result;
          self.showalarmData.type = data.type;
        });

      this.textarea = "";
      // this.showalarmData = data
      this.showalarmKG = true;
    },
    savealarm(data) {
      this.showalarmKG = false;
      this.$api
        .post("/tdel/updateTdelMessgae", {
          type: data.type,
          msgid: data.msgid,
          delperson: this.value,
          message: this.textarea
        })
        .then(function(res) {
          console.log(res);
        });
    },
    entry() {
      if (this.$refs.overview) {
        this.$refs.overview.className = "wrapbox is-visible";
      }
    },
    leave() {
      if (this.$refs.overview) {
        this.$refs.overview.className = "wrapbox";
      }
    },
    goToSite(sId) {
      this.$siteOnClick(sId);
    }
  },
  beforeRouteLeave(to, from, next) {
    this.leave();
    setTimeout(() => {
      next();
    }, 800);
  }
};
</script>
<style>
.pro-dialog.el-dialog {
  background: #152b34d4;
}
.pro-dialog .el-dialog__title {
  color: #fff;
}
.pro-dialog .el-input__inner,
.pro-dialog .el-textarea__inner {
  color: #fff;
  background-color: transparent;
}
</style>
<style lang="scss" scoped>
.alarm_alog_box .alert_scroll .scroll_ul li strong.weichuli {
  background: #e6a23c;
}
.el-dialog p {
  line-height: 0.5rem;
  padding: 0 0.5rem;
  font-size: 0.16rem;
  color: #fff;
}
.el-dialog p i {
  width: 0.2rem;
  display: inline-block;
}
.el-dialog p span {
  display: block;
  color: #ccc;
}
.font_t {
  font-size: 0.14rem;
}
.mar_p {
  padding-top: 2%;
}
.border_n {
  border: none !important;
}
.hang {
  /*display: flex;*/
  /*flex: 1;*/
  /*flex-direction: column;*/
  /*justify-content: center;*/
  margin-top: 0.16rem;
  align-items: center;
  text-align: center;
  width: 25%;
  div {
    width: 100%;
    display: inline-block;
  }
}
.fontsize_z {
  font-size: 0.23rem;
}
.fontsize_q {
  font-size: 0.12rem;
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
.site {
  .wrapbox {
    position: absolute;
    top: 11vh;
    left: 0.3rem;

    width: 4.8rem;
    font-size: 0.12rem;
    color: #fff;
    .obox_h320 {
      width: 100%;
      height: 100%;
      background: url("../assets/img/bg.png") no-repeat center/contain;
      background-size: 100% 100%;
      .dev_state_box {
        height: 3rem;
        .flex {
          width: 100%;
          height: 28%;
          display: flex;
          border-bottom: rgba(31, 247, 242, 0.3) solid 0.01rem;
          width: 92%;
          margin: 0 auto;
          /*.e_box {*/
          /*position: relative;*/
          /*width: .52rem;*/
          /*height: .52rem;*/
          /*margin-left: 0.1rem;*/
          /*width: 1rem;*/
          /*height: 50%;*/
          /*}*/
          .e_icon {
            width: 0.5rem;
            height: 0.5rem;
          }
        }
      }
      .o_title {
        height: 0.4rem;
        line-height: 0.4rem;
        position: relative;
        padding: 0 0.1rem;
        width: 1.94rem;
        display: inline-block;
        background: -webkit-gradient(
          linear,
          left top,
          right top,
          from(rgba(31, 247, 242, 0.5)),
          to(rgba(35, 106, 138, 0))
        );
        background: -webkit-linear-gradient(
          left,
          rgba(31, 247, 242, 0.5),
          rgba(35, 106, 138, 0)
        );
        background: -o-linear-gradient(
          left,
          rgba(31, 247, 242, 0.5),
          rgba(35, 106, 138, 0)
        );
        background: linear-gradient(
          to right,
          rgba(31, 247, 242, 0.5),
          rgba(35, 106, 138, 0)
        );
        color: #fff;
        font-size: 0.16rem;
      }
      .flex {
        width: 92%;
        height: 11%;
        display: flex;
        border-bottom: rgba(31, 247, 242, 0.3) solid 0.01rem;
        margin: 0 auto;
        // .e_box {
        //   margin-left: 0.1rem;
        //   width: 1rem;
        //   height: 50%;
        // }

        .e_icon {
          width: 0.5rem;
          height: 0.5rem;
        }
      }
      .e_icon0_oc {
        position: absolute;
        left: 0;
        background: url("../assets/img/citem0_oc.png") no-repeat center/contain;
      }
      .e_icon0 {
        position: relative;
        background: url("../assets/img/citem0.png") no-repeat center/contain;
      }
      .e_icon1_oc {
        background: url("../assets/img/citem1_oc.png") no-repeat center/contain;
      }
      .e_icon1 {
        background: url("../assets/img/site/icon_light.png") no-repeat
          center/contain;
      }
      .e_icon2 {
        background: url("../assets/img/site/icon_led.png") no-repeat
          center/contain;
      }
      .e_icon3 {
        background: url("../assets/img/site/icon_lcd.png") no-repeat
          center/contain;
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

      .ds_box {
        margin-top: 0.1rem;
        height: 0.8rem;

        .ds_title {
          padding-left: 0.12rem;
          height: 0.22rem;
          color: #56fffe;
          font-size: 0.14rem;
          font-weight: 700;
          line-height: 0.22rem;
          .ds_arrow {
            display: inline-block;
            position: relative;
            width: 0.16rem;
            height: 0.12rem;
          }
          .ds_arrow:before,
          .ds_arrow:after {
            position: absolute;
            width: 0.09rem;
            height: 0.09rem;
            border: 0.01rem solid #56fffe;
            border-left: none;
            border-bottom: none;
            transform: rotate(45deg);
            transform-origin: center;
            content: "";
          }
          .ds_arrow:before {
            left: -0.08rem;
          }
          i {
            margin-right: 0.02rem;
            font-size: 0.12rem;
          }
        }
      }

      .ds_icon_box div {
        float: left;
      }

      .alert_scroll {
        .scroll_ul {
          position: absolute;
          li span {
            text-align: center;
          }
          li span:nth-child(1) {
            // text-align: left;
          }
        }
      }
    }
  }
}
.line_h {
  vertical-align: middle;
}
</style>

