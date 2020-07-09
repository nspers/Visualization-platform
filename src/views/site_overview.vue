<template>
  <div class="site_overview overview">
    <div class="wrapbox" ref="overview">
       <div class="bg trans-up trans-up-delay-3">
      <!--能耗统计-->
      <div class="o_box obox_h160 trans-up trans-up-delay-3">
        <div class="o_title mar_t bra-dis">
          <span>
            <img class="line_h" src="../assets/img/sb.png" />
          </span>
          <span class="line_h">{{siteName}} 能耗统计</span>
        </div>
        <div class="o_item1">
          <div class="flex border_n" style="height: 1rem;border:none;padding:-top:.3rem;">
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
              <div class="fontsize_q">本年(kW‧h)</div>
            </div>
          </div>
        </div>
      </div>
      <!--告警记录-->
      <div class="o_box obox_h320 trans-up trans-up-delay-7">
        <div class="o_title mar_t" >
          <span>
            <img class="line_h" src="../assets/img/sb.png" />
          </span>
          <span class="line_h">离线设备</span>
        </div>
        <div class="alog_box">
          <div class="ab_title">
            <span>设备名称</span>
            <span>告警时间</span>
            <span>告警类型</span>
          </div>
          <div class="alert_scroll sbar">
            <div class="as_nodata" v-if="!wsData.offlines.length">暂无离线设备</div>
            <ul class="scroll_ul" ref="sUl" v-if="wsData.offlines.length">
              <li class="scroll_li" v-for="(item,index) in wsData.offlines" style="cursor: default" :key="index">
                <span>{{item.devicename}}</span>
                <span>{{item.offlinetime}}</span>
                <span>
                  <i class="a_type"></i>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
       </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Siteoverview",
  data() {
    return {
      sId: 0,
      msgCode: 202003,
      msgCode2: 202005,
      abScrollH: 0,
      eLoading: 1,
      wsData: {
        stationid: "",
        stationname: "",
        currentmonth: "",
        lastmonth: "",
        thisyear: "",
        lamphouse: "",
        platfond: "",
        logo: "",
        lcd: "",
        led: "",
        offlines: []
      },
      alertLog: []
    };
  },
  watch: {
    getSid(nowval, oldval) {
      // console.log(nowval, oldval);
    },
    siteName(nowval, oldval){
      // console.log(nowval, oldval);
    },
    getWsData(nowval, oldval) {
      // console.log(nowval, oldval);
    }
  },
  created: function() {},
  computed: {
    //vuex
    getSid() {
      this.sId = this.$store.state.loction;
    },
    siteName() {
      return this.$store.state.nowSiteName;
    },
    getWsData() {
      if (this.$store.state.websocket.hasOwnProperty(this.msgCode)) {
        this.eLoading = 0;
        const wsMsg = this.$store.state.websocket[this.msgCode].msg.sums;
        for (let item of wsMsg) {
          if (item.stationid === this.sId) {
            this.wsData.currentmonth = item.currentmonth;
            this.wsData.stationid = item.stationid;
            this.wsData.stationname = item.stationname;
            this.wsData.currentmonth = Math.round(item.currentmonth * 10) / 10;
            this.wsData.lastmonth = Math.round(item.lastmonth * 10) / 10;
            this.wsData.thisyear = Math.round(item.thisyear * 10) / 10;
            this.wsData.lamphouse = item.lamphouse;
            this.wsData.platfond = item.platfond;
            this.wsData.logo = item.logo;
            this.wsData.lcd = item.lcd;
            this.wsData.led = item.led;
          }
          if (this.$store.state.websocket.hasOwnProperty(this.msgCode2)) {
            const wsMsg = this.$store.state.websocket[this.msgCode2].msg
              .stations;
            this.wsData.offlines = [];
            for (let item of wsMsg) {
              if (item.stationid === this.sId) {
                for (let ofMsg of item.offlines) {
                  this.wsData.offlines.push(ofMsg);
                }
              }
            }
          }
        }
      }
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      setTimeout(() => {
        this.entry();
      }, 100);
    });
  },
  methods: {
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
    outAndIn() {
      this.leave();
      setTimeout(() => {
        this.entry();
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
  .bra-dis{
    border-radius: 0.05rem 0 0 0;
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

.hang {
  /*display: flex;*/
  /*flex: 1;*/
  /*flex-direction: column;*/
  /*justify-content: center;*/
  width: 25%;
  align-items: center;
  text-align: center;
  div{
    display: inline-block;
    width: 100%;
  }
}
.line_h {
  vertical-align: middle;
}

.font_t {
  font-size: 0.14rem;
}

.fontsize_z {
  font-size: 0.25rem;
}

.fontsize_q {
  font-size: 0.12rem;
}
.flex {
  height: 40%;
  display: flex;
  border-bottom: rgba(31, 247, 242, 1) solid 0.01rem;
  width: 92%;
  margin: 0 auto;
  .e_icon {
    width: 0.5rem;
    height: 0.5rem;
  }
}

.line_h {
 vertical-align: -webkit-baseline-middle;
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
.bg {
  background: url("../assets/img/bg.png") no-repeat center/contain;
  background-size: 100% 100%;
  height: 100%;
}
.overview {
  position: absolute;
  top: 1.1rem;
  left: 0.3rem;
  width: 4.8rem;

  .wrapbox {
    width: 4.8rem;
    font-size: 0.12rem;
    color: #fff;

    .obox_h160 {
      height: 1.6rem;
    }
    .obox_h260 {
      height: 2.6rem;
    }
    .obox_h320 {
      height: 3.2rem;
    }

    .o_box {
      .o_title {
        position: relative;
        padding-left: 0.1rem;
        width: 4.27rem;
        font-size: 0.16rem;
        line-height: 0.24rem;

        .t_item {
          position: absolute;
          left: -0.28rem;
          width: 0.3rem;
          height: 0.2rem;
        }

        .item1 {
          bottom: -0.01rem;
          background: url("../assets/img/item1.png") no-repeat center/contain;
        }

        .item2 {
          bottom: -0.04rem;
          background: url("../assets/img/item2.png") no-repeat center/contain;
        }

        .item3 {
          bottom: -0.01rem;
          background: url("../assets/img/item3.png") no-repeat center/contain;
        }
      }


      .o_item1 div {
        /*float: left;*/
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
        position: absolute;
        left: 0;
        background: url("../assets/img/citem0_oc.png") no-repeat center/contain;
      }
      .e_icon0 {
        position: relative;
        background: url("../assets/img/citem0.png") no-repeat center/contain;
      }

      .e_icon1 {
        background: url("../assets/img/citem1.png") no-repeat center/contain;
      }

      .e_icon2 {
        background: url("../assets/img/citem2.png") no-repeat center/contain;
      }

      .e_icon3 {
        background: url("../assets/img/citem3.png") no-repeat center/contain;
      }

      .e_icon4 {
        background: url("../assets/img/citem4.png") no-repeat center/contain;
      }

      .e_icon5 {
        background: url("../assets/img/citem5.png") no-repeat center/contain;
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

      .myEchart_box {
        margin: 0.1rem auto;
        width: 94%;
        height: 85%;
      }

    }
  }
}
</style>
