<template>
  <div class="overview">
    <!--照明概览-->
    <div class="wrapbox" ref="overview">
      <div class="bg trans-up trans-up-delay-3">
        <!--照明设备运行状态-->
        <div class="o_box obox_h240 trans-up trans-up-delay-3" v-if="$route.path === '/illumine'">
          <div class="o_title" style="border-radius: 0.05rem 0 0 0;">
            <span>
              <img class="line_h" src="../assets/img/sb.png" />
            </span>
            <span>设备状态</span>
          </div>
          <div class="flex" style="margin-top: .2rem;height: .7rem;">
            <div class="hang">
              <div>
                <div class="e_icon e_icon7">
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
                {{wsData.total}}
              </div>
              <div class="fontsize_q">总数</div>
            </div>
            <div class="hang">
              <div class="fontsize_z pucolor_q">
                <span
                  :class="{'':eLoading==0,'iconfont  fontsize_z tf_rom icon-jiazaizhong':eLoading==1}"
                ></span>
                {{wsData.online}}
              </div>
              <div class="fontsize_q">在线</div>
            </div>
            <div class="hang">
              <div class="fontsize_z pucolor_w">
                <span
                  :class="{'':eLoading==0,'iconfont  fontsize_z tf_rom icon-jiazaizhong':eLoading==1}"
                ></span>
                {{wsData.offline}}
              </div>
              <div class="fontsize_q">离线</div>
            </div>
          </div>
          <div class="flex" style="margin-top: .2rem;border-bottom:none">
            <div class="hang">
              <div>
                <div class="e_icon e_icon8">
                  <!-- <div class="e_icon e_icon1_oc move1"></div> -->
                </div>
              </div>
            </div>
            <div class="hang">
              <div class="fontsize_z pucolor">
                <span
                  :class="{'':eLoading===0,'iconfont  fontsize_z tf_rom icon-jiazaizhong':eLoading===1}"
                ></span>
                {{wsData.oncount}}
              </div>
              <div class="fontsize_q">亮灯数</div>
            </div>
         
            <div class="hang">
              <div class="fontsize_z pucolor_w">
                <span
                  :class="{'':eLoading==0,'iconfont  fontsize_z tf_rom icon-jiazaizhong':eLoading==1}"
                ></span>
                {{wsData.offcount}}
              </div>
              <div class="fontsize_q">熄灯数</div>
            </div>
               <div class="hang" style="visibility: hidden;">
              <div class="fontsize_z pucolor">
                <span
                  :class="{'':eLoading===0,'iconfont  fontsize_z tf_rom icon-jiazaizhong':eLoading===1}"
                ></span>
                {{wsData.oncount}}
              </div>
              <div class="fontsize_q">亮灯数</div>
            </div>
          </div>
        </div>
        <!--LCD LED 用电 设备运行状态-->
        <div class="o_box obox_h160 trans-up trans-up-delay-3" v-if="$route.path !== '/illumine'">
          <div class="o_title" style="border-radius: 0.05rem 0 0 0;">
            <!-- <div class="t_item item2" v-if="$route.path === '/lcd'||$route.path === '/led'"></div> -->
            <span v-if="$route.path === '/lcd'||$route.path === '/led'">
              <img class="line_h" src="../assets/img/sb.png" />
            </span>
            <span v-if="$route.path === '/lcd'||$route.path === '/led'">设备状态</span>
            <div class="t_item item4" v-if="$route.path === '/electricity'"></div>
            <span v-if="$route.path === '/electricity'">
              <img class="line_h" src="../assets/img/sb.png" />
            </span>
            <span v-if="$route.path === '/electricity'">设备状态</span>
          </div>
          <div class="flex" style="margin-top: .36rem;border:none">
            <div class="hang">
              <div v-if="$route.path === '/lcd'">
                <div class="e_icon e_icon9">
                  <div class="e_icon e_icon1_oc move1"></div>
                </div>
              </div>
              <div v-if="$route.path === '/led'">
                <div class="e_icon e_icon10">
                  <div class="e_icon e_icon1_oc move1"></div>
                </div>
              </div>
              <div v-if="$route.path === '/electricity'">
                <div class="e_icon e_icon11">
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
                {{wsData.total}}
              </div>
              <div class="fontsize_q">总数</div>
            </div>
            <div class="hang">
              <div class="fontsize_z pucolor_q">
                <span
                  :class="{'':eLoading==0,'iconfont  fontsize_z tf_rom icon-jiazaizhong':eLoading==1}"
                ></span>
                {{wsData.online}}
              </div>
              <div class="fontsize_q">在线</div>
            </div>
            <div class="hang">
              <div class="fontsize_z pucolor_w">
                <span
                  :class="{'':eLoading==0,'iconfont  fontsize_z tf_rom icon-jiazaizhong':eLoading==1}"
                ></span>
                {{wsData.offline}}
              </div>
              <div class="fontsize_q">离线</div>
            </div>
          </div>
        </div>
        <!--照明 LCD LED 设备异常次数统计-->
        <div class="o_box obox_h260 trans-up trans-up-delay-5" v-if="$route.path !== '/electricity'">
          <div class="o_title">
            <span>
              <img class="line_h" src="../assets/img/icon_nenghao.png" />
            </span>
              <span> 告警统计</span>  
         </div>
          <div class="la_nodata" v-if="!this.wsData.lightalarms.date.length">暂无异常数据</div>
          <div ref="myEchart" class="myEchart_box" v-if="this.wsData.lightalarms.date.length"></div>
        </div>
        <!--用电 能耗统计-->
        <div class="o_box obox_h160 trans-up trans-up-delay-5" v-if="$route.path ==='/electricity'">
          <div class="o_title">
            <!-- <div class="t_item item1"></div> -->
            <span>
              <img class="line_h" src="../assets/img/nh.png" />
            </span>
            <span v-if="$route.path === '/electricity'">能耗分析</span>
          </div>
          <div class="o_item1">
            <div class="flex" style="padding-bottom: 4%;border:none;margin-left: 3.5%;">
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
                </div>
                <div class="fontsize_q">本年 (kW‧h)</div>
              </div>
            </div>
          </div>
        </div>
        <!--离线设备-->
        <div class="o_box trans-up trans-up-delay-7">
          <div class="o_title">
            <span>
              <img class="line_h" src="../assets/img/lx.png" />
            </span>
            <span>离线设备</span>
          </div>
          <div class="alog_box" :class="{ 'alarm_alog_box' : $route.path == '/site'}">
            <div class="ab_title">
              <span>设备名称</span>
              <span>离线时间</span>
              <span>状态</span>
              <span v-if="$route.path ==='/site'">报警</span>
            </div>
            <div class="alert_scroll sbar">
              <div class="as_nodata" v-if="!this.wsData.offlines.length">暂无离线设备</div>
              <ul class="scroll_ul" ref="sUl" v-if="this.wsData.offlines.length">
                <li class="scroll_li" v-for="(item,index) in this.wsData.offlines" @click="goToSite(item.stationId)" :key="index">
                  <span>{{item.name}}</span>
                  <span>{{item.offlinetime}}</span>
                  <span>
                    <i class="a_type"></i>
                  </span>
                  <span  v-if="$route.path ==='/site'">
                      <strong @click.stop="showalarm(item)">已处理</strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
    title="提示"
    :visible.sync="showalarmKG"
    width="30%">
        <div>
            <p>设备编号:<i></i>{{showalarmData.id}}</p>
            <p>报警时间:<i></i>{{showalarmData.offlinetime}}</p>
            <p>处理时间:<i></i>{{showalarmData.offlinetime}}</p>
            <p>时间类型:<i></i>{{showalarmData.state}}</p>
            <p>处理状态:<i></i>{{showalarmData.name}}</p>
            <p v-if="showalarmData.id == 29">处理人:<i></i>{{showalarmData.name}}</p>
            <p v-if="showalarmData.id != 29">处理人:<i></i>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </p>
            <p v-if="showalarmData.id == 29">问题描述:<i></i><span>{{showalarmData.name}}</span></p>
            <p v-if="showalarmData.id != 29">问题描述:<i></i><span>
                <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="textarea">
                </el-input>    
                </span>
            </p>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button  v-if="showalarmData.id == 29" type="primary" size="small" @click="showalarmKG = false">确 定</el-button>
            <el-button  v-if="showalarmData.id != 29" type="primary" size="small" @click="savealarm(showalarmData)">保 存</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "overview",
  data() {
    return {
        textarea:'',
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        showalarmData:[],
        showalarmKG:false,
      msgCode: 0,
      msgCode2: 0,
      abScrollH: 0,
      eLoading: 1,
      scrollSwitch: 1,
      wsData: {
        currentmonth: "",
        lastmonth: "",
        thisyear: "",
        total: "",
        online: "",
        offline: "",
        oncount: "",
        offcount: "",
        lightalarms: {
          date: [],
          times: []
        },
        offlines: [] //离线设备
      },
      chart: null,
      chartData: []
    };
  },
  created: function() {
    //判断当前页对应的 msgcode
    switch (this.$route.path) {
      case "/illumine":
        this.msgCode = 203002;
        this.msgCode2 = 203005;
        break;
      case "/lcd":
        this.msgCode = 204002;
        this.msgCode2 = 204005;
        break;
      case "/led":
        this.msgCode = 205002;
        this.msgCode2 = 205005;
        break;
      case "/electricity":
        this.msgCode = 206001;
        this.msgCode2 = 206005;
        break;
      default:
        break;
    }
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
        this.wsData.total = wsMsg.total;
        this.wsData.online = wsMsg.online;
        this.wsData.offline = wsMsg.offline;
        this.wsData.oncount = wsMsg.oncount;
        this.wsData.offcount = wsMsg.offcount;
        if(wsMsg.lightalarms){
          this.wsData.lightalarms.date = [];
          this.wsData.lightalarms.times = [];
          for (let item of wsMsg.lightalarms) {
            this.wsData.lightalarms.date.push(item.date);
            this.wsData.lightalarms.times.push(item.times);
          }
          //启动Echarts
          this.initChart();
        }
      }
      if (this.$store.state.websocket.hasOwnProperty(this.msgCode2)) {
        this.eLoading = 0;
        const wsMsg = this.$store.state.websocket[this.msgCode2].msg;
        this.wsData.offlines = wsMsg.offlines;
        //启动滚动
        // if(this.scrollSwitch){
        //     this.scrllStart();
        //     this.scrollSwitch = 0;
        // }
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
      setTimeout(() => {
        //左边栏入场动画
        this.entry();
      }, 100);

      // setTimeout(() => {
      //     //启动滚动
      //     this.scrllStart();
      // },800);

      //启动Echarts
      this.initChart();
    });
  },
  methods: {

      showalarm(data){
        this.textarea = ''
        this.showalarmData = data
        this.showalarmKG = true
    },
    savealarm(data){
        this.showalarmKG = false
    },
    entry() {
      if (this.$refs.overview) {
        this.$refs.overview.className = "wrapbox is-visible ";
      }
    },
    leave() {
      if (this.$refs.overview) {
        this.$refs.overview.className = "wrapbox";
      }
    },
    goToSite(sId){
      this.$siteOnClick(sId)
    },
    // 折线图
    initChart() {
      var self = this;
      if (this.$refs.myEchart) {
        if (this.chartData.length > 0) {
          if (
            this.chartData.sort().toString() ==
            this.wsData.lightalarms.date.sort().toString()
          ) {
            return false;
          }
        } else {
          this.chartData = this.wsData.lightalarms.date;
        }
        this.chart = this.$echarts.init(this.$refs.myEchart, "dark");
        this.chart.setOption({
          backgroundColor: "", //背景颜色透
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: this.wsData.lightalarms.date,
            splitLine: {
              show: true,
              lineStyle: {
                color: ["#cccccc30"],
                width: 1,
                type: "solid"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#cccccc30"
              }
            }
          },
          yAxis: {
            type: "value",
            splitLine: {
              show: true,
              lineStyle: {
                color: ["#cccccc30"],
                width: 1,
                type: "solid"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#cccccc30"
              }
            }
          },
          grid: {
            top: "6%",
            left: "0%",
            right: "6%",
            bottom: "5%",
            containLabel: true
          },
          tooltip: {
            show: true,
            trigger: "axis",
            axisPointer: {
              type: "shadow",
              axis: "auto",
              snap: true
            }
          },
          series: [
            {
              data: this.wsData.lightalarms.times,
              type: "line",
              smooth: true,
              symbol: "emptyCircle", //拐点设置为实心
              symbolSize: 5, //拐点大小
              animation: true,
              itemStyle: {
                normal: {
                  color: "#00DED4",
                  borderColor: "#275ECD"
                },
                emphasis: {
                  color: "#00DED4"
                }
              },
              lineStyle: {
                width: 3,
                color: "#00DED4"
              },
              areaStyle: {
                normal: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      { offset: 0, color: "#00DED4" },
                      { offset: 0.5, color: "#00DED450" },
                      { offset: 1, color: "#000F2900" }
                    ],
                    globalCoord: false
                  }
                }
              }
            }
          ]
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-dialog p{
    line-height: .5rem;
    padding:0 .5rem;
    font-size: .16rem;
}
.el-dialog p i{
    width: .2rem;
    display: inline-block;
}
.el-dialog p span{
    display: block;
    color: #ccc;
}
.line_h {
  vertical-align: middle;
}

.font_t {
  font-size: 0.14rem;
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

.bg {
  background: url("../assets/img/bg.png") no-repeat center/contain;
  background-size: 100% 100%;
  height: 100%;
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

    .obox_h240 {
      height: 2.2rem;
    }

    .obox_h260 {
      height: 2.6rem;
    }

    .obox_h320 {
      height: 3.2rem;
    }

    .o_box {
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

        .t_item {
          position: absolute;
          left: -0.28rem;
          width: 0.3rem;
          height: 0.2rem;
        }

        // .item1 {
        //   bottom: -0.01rem;
        //   background: url("../assets/img/item1.png") no-repeat center/contain;
        // }
        // .item2 {
        //   bottom: -0.04rem;
        //   background: url("../assets/img/item2.png") no-repeat center/contain;
        // }
        // .item3 {
        //   bottom: -0.01rem;
        //   background: url("../assets/img/item3.png") no-repeat center/contain;
        // }
        // .item4 {
        //   bottom: -0.03rem;
        //   width: 0.32rem;
        //   background: url("../assets/img/item4.png") no-repeat center/contain;
        // }
      }

      .o_item1 {
        margin-top: 0.3rem;
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

      .e_icon1_oc {
        background: url("../assets/img/citem1_oc.png") no-repeat center/contain;
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

      .e_icon6 {
        background: url("../assets/img/off_icon.png") no-repeat center/contain;
      }

      .e_icon7 {
        background: url("../assets/img/site/icon_light.png") no-repeat center/contain;
      }

      .e_icon8 {
        background: url("../assets/img/on_icon.png") no-repeat center/contain;
      }

      .e_icon9 {
        background: url("../assets/img/site/icon_lcd.png") no-repeat center/contain;
      }

      .e_icon10 {
        background: url("../assets/img/site/icon_led.png") no-repeat center/contain;
      }

      .e_icon11 {
        background: url("../assets/img/site/icon_jkq.png") no-repeat center/contain;
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
        margin-top: 0.2rem;
        height: 0.6rem;

        .ds_title {
          padding-left: 0.12rem;
          height: 0.22rem;
          color: #56fffe;
          font-size: 0.14rem;
          font-weight: 700;
          line-height: 0.22rem;
        }

        .ds_title i {
          margin-right: 0.2rem;
          font-size: 0.12rem;
        }

        .ds_space {
          height: 0.1rem;
        
        }
      }

      .flex {
        display: flex;
        width: 92%;
        height: 40%;
        border-bottom: rgba(31, 247, 242, 0.3) solid 0.01rem;
        margin: 0 auto;
        // .e_box {
        //   margin-left: 0.1rem;
        //   width: 1rem;
        //   height: 50%;
        // }
        .hang{
          text-align: center;
          div{
            display: inline-block;
          }
        }
        .e_icon {
          width: 0.5rem;
          height: 0.5rem;
        }
      }

      .ds_icon_box div {
        float: left;
      }

      .myEchart_box {
        margin: 0.1rem auto;
        width: 4.6rem;
        height: 2rem;
        background-color: transparent;
        border-radius: 0.05rem;
      }

      .la_nodata {
        width: 100%;
        height: 100%;
        font-size: 0.16rem;
        color: #ccc;
        line-height: 2rem;
        text-align: center;
      }
    }
  }
}
</style>