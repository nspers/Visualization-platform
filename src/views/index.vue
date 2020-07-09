<template>
  <div class="index">
    <div class="nav" ref="nav">
      <div class="trans-top-index trans-top-index-delay-7">
        <div class="time">
          <p>
            <span>{{tiemrObj.date}}</span>
            <span>{{tiemrObj.day}}</span>
            <span>{{tiemrObj.tiems}}</span>
            <span>{{tiemrObj.str}}</span>
          </p>
        </div>
        <div class="navMiddle">
          <span>杨雁路智能公交站亭管理平台</span>
        </div>
        <div class="navBtn">
          <span @click="singout()">
            <img class="imgg" src="../assets/img/index/ico_close.png" /> 退出
          </span>
        </div>
      </div>
    </div>
    <div class="indexMain clearfix" ref="indexMain">
      <div class="left contentMain trans-left-index trans-left-index-delay-7">
        <div class="contentSub">
          <div class="indexTitle">实时设备状态</div>
          <div class="calcH">
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
                  <Num :value="indexData.lighttotal" />
                </div>
                <div class="fontsize_q">照明总数</div>
              </div>
              <div class="hang">
                <div class="fontsize_z pucolor_q">
                  <Num :value="indexData.lightonline" />
                </div>
                <div>在线</div>
              </div>
              <div class="hang">
                <div class="fontsize_z pucolor_w">
                  <Num :value="indexData.lightoffline" />
                </div>
                <div>离线</div>
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
                  <Num :value="indexData.ledtotal" />
                </div>
                <div class="fontsize_q">LED总数</div>
              </div>
              <div class="hang">
                <div class="fontsize_z pucolor_q">
                  <Num :value="indexData.ledonline" />
                </div>
                <div>在线</div>
              </div>
              <div class="hang">
                <div class="fontsize_z pucolor_w">
                  <Num :value="indexData.ledoffline" />
                </div>
                <div>离线</div>
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
                  <Num :value="indexData.lcdtotal" />
                </div>
                <div class="fontsize_q">LCD总数</div>
              </div>
              <div class="hang">
                <div class="fontsize_z pucolor_q">
                  <Num :value="indexData.lcdonline" />
                </div>
                <div>在线</div>
              </div>
              <div class="hang">
                <div class="fontsize_z pucolor_w">
                  <Num :value="indexData.lcdoffline" />
                </div>
                <div>离线</div>
              </div>
            </div>
          </div>
        </div>
        <div class="contentSub">
          <div class="indexTitle">总能耗分析</div>
          <div class="calcH" ref="chartLine"></div>
        </div>
      </div>
      <div class="middle">
        <div class="entry">
          <div class="entryMain"></div>
          <div class="entryMain entryMainTurn"></div>
          <div class="earth" @click="pushIndex"></div>
        </div>
        <div class="middleBottom trans-bottom-index trans-bottom-index-delay-7">
          <div class="indexTitle">公交站台</div>
          <div class="calcH">
            <div class="busTop clearfix">
              <div class="busTContent clearfix">
                <i></i>
                <div>
                  <strong>公交站台总数</strong>
                  <Num :value="busStion.stationTotal" />个
                </div>
              </div>
              <div class="busTContent busTContent1 clearfix">
                <i class="busicon"></i>
                <div>
                  <strong>服务公交路线车辆</strong>
                  <Num :value="busStion.busTotal" />路
                </div>
              </div>
            </div>
            <div class="busBottom">
              <ul class="clearfix">
                <li v-for="(item, index) in busStion.serviceBusList" :key="index">
                  <i></i>
                  {{item}}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="right contentMain trans-right-index trans-right-index-delay-7">
        <div class="contentSub">
          <div class="indexTitle">实时设备在线率</div>
          <div class="calcH" ref="chartPie"></div>
        </div>
        <div class="contentSub">
          <div class="indexTitle">告警统计分析</div>
          <div class="calcH" ref="chartBar"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Num from '../components/number'
import echarts from 'echarts'
export default {
  data() {
    var self = this
    const COLORS = { LED屏: '#00FFFB', LCD屏: '#55FE7C', 照明: '#FF9500' }

    return {
      wsData: {
        lighttotal: 0,
        lightonline: 0,
        lightoffline: 0,
        ledtotal: 0,
        ledonline: 0,
        ledoffline: 0,
        lcdtotal: 0,
        lcdonline: 0,
        lcdoffline: 0
      },
      ledRate: 0,
      lcdRate: 0,
      lightsRate: 0,
      allData: [],
      eLoading: 0,
      tiemrObj: {
        day: '',
        tiems: '',
        str: ''
      },
      timer: null,
      chartPie_option: {
        textStyle: {
          color: '#fff'
        },
        series: [
          {
            name: 'LED屏',
            type: 'pie',
            center: ['20%', '50%'],
            radius: ['30%', '35%'],
            clockWise: false,
            hoverAnimation: false,
            labelLine: {
              show: false
            },
            data: [
              {
                value: this.ledRate,
                label: {
                  align: 'center',
                  position: 'center',
                  formatter: function(p) {
                    return `{p|${Math.round(p.percent * 10) / 10}}%`
                  },
                  rich: {
                    p: {
                      color: '#fff',
                      fontSize: 34
                    }
                  }
                },
                itemStyle: {
                  color: COLORS['LED屏']
                }
              },
              {
                value: this.ledRate,
                name: 'invisible',
                label: {
                  fontSize: 18,
                  padding: [200, 0, 0, 0],
                  position: 'center',
                  verticalAlign: 'bottom',
                  formatter: '{a}'
                },
                itemStyle: {
                  color: '#021318'
                }
              }
            ]
          },
          {
            name: 'LCD屏',
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['30%', '35%'],
            clockWise: false,
            hoverAnimation: false,
            labelLine: {
              show: false
            },
            data: [
              {
                value: this.lcdRate,
                label: {
                  align: 'center',
                  position: 'center',
                  formatter: function(p) {
                    return `{p|${Math.round(p.percent * 10) / 10}}%`
                  },
                  rich: {
                    p: {
                      color: '#fff',
                      fontSize: 34
                    }
                  }
                },
                itemStyle: {
                  color: COLORS['LCD屏']
                }
              },
              {
                value: this.lcdRate,
                name: 'invisible',
                label: {
                  fontSize: 18,
                  padding: [200, 0, 0, 0],
                  position: 'center',
                  verticalAlign: 'bottom',
                  formatter: '{a}'
                },
                itemStyle: {
                  color: '#021318'
                }
              }
            ]
          },
          {
            name: '照明',
            type: 'pie',
            center: ['80%', '50%'],
            radius: ['30%', '35%'],
            clockWise: false,
            hoverAnimation: false,
            labelLine: {
              show: false
            },
            data: [
              {
                value: this.lightsRate,
                label: {
                  align: 'center',
                  position: 'center',
                  formatter: function(p) {
                    return `{p|${Math.round(p.percent * 10) / 10}}%`
                  },
                  rich: {
                    p: {
                      color: '#fff',
                      fontSize: 34
                    }
                  }
                },
                itemStyle: {
                  color: COLORS['照明']
                }
              },
              {
                value: this.lightsRate,
                name: 'invisible',
                label: {
                  fontSize: 18,
                  padding: [200, 0, 0, 0],
                  position: 'center',
                  verticalAlign: 'bottom',
                  formatter: '{a}'
                },
                itemStyle: {
                  color: '#021318'
                }
              }
            ]
          }
        ]
      },
      chartLine_option: {
        color: ['#00FBF7'],
        grid: {
          top: 50,
          left: 30,
          right: 20,
          bottom: 10,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          formatter: function(p) {
            return Math.round(p[0].value * 10) / 10
          },
          axisPointer: {
            lineStyle: {
              color: '#00FBF7'
            }
          }
        },
        textStyle: {
          color: '#fff'
        },
        xAxis: {
          name: '(月)',
          type: 'category',
          nameTextStyle: {
            padding: [25, 0, 0, -25]
          },
          data: [],
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          name: 'kW‧h',
          type: 'value',
          nameGap: 20,
          nameTextStyle: {
            padding: [0, 0, 0, -30]
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.2)'
            }
          }
        },
        series: [
          {
            name: '总能耗分析',
            type: 'line',
            smooth: true,
            showSymbol: false,
            lineStyle: {
              shadowColor: '#0ff',
              shadowBlur: 15,
              shadowOffsetY: 6
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#00FBF7'
                  },
                  {
                    offset: 0.3,
                    color: '#00FBF700'
                  }
                ]
              }
            },
            data: []
          }
        ]
      },
      chartBar_option: {
        color: Object.values(COLORS),
        grid: {
          top: 80,
          left: 30,
          right: 20,
          bottom: 10,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        textStyle: {
          color: '#fff'
        },
        legend: {
          right: 0,
          top: 0,
          itemWidth: 18,
          itemHeight: 12,
          textStyle: {
            color: '#fff',
            padding: [3, 0, 0, 0]
          },
          data: Object.keys(COLORS)
        },
        xAxis: {
          name: '(日)',
          type: 'category',
          nameTextStyle: {
            padding: [25, 0, 0, -25]
          },
          data: [],
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          name: '次',
          type: 'value',
          nameGap: 20,
          nameTextStyle: {
            padding: [0, 0, 0, -30]
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.2)'
            }
          }
        },
        series: [
          {
            name: 'LED屏 ',
            type: 'bar',
            barWidth: '16%',
            itemStyle: {
              color: self.$options.methods.createLinearColor_bar(
                COLORS['LED屏']
              )
            },
            data: []
          },
          {
            name: 'LCD屏 ',
            type: 'bar',
            barWidth: '16%',
            itemStyle: {
              color: self.$options.methods.createLinearColor_bar(
                COLORS['LCD屏']
              )
            },
            data: []
          },
          {
            name: '照明 ',
            type: 'bar',
            barWidth: '16%',
            itemStyle: {
              color: self.$options.methods.createLinearColor_bar(COLORS['照明'])
            },
            data: []
          }
        ]
      },
      busStion: {
        stationTotal: 0,
        busTotal: 0,
        serviceBusList: []
      }
    }
  },
  components: {
    Num
  },
  computed: {
    indexData() {
      if (this.$store.getters.websocketData[207004]) {
        const wsMsg = this.$store.state.websocket[207004].msg
        return wsMsg
      } else {
        return this.wsData
      }
    }
  },
  created() {
    //右栏时间表
    let terval = null
    let dates = new Date()

    let Year = dates.getFullYear() //获取年
    let Monthr = dates.getMonth() + 1 //获取月
    let tian = dates.getDate() //获取天
    this.tiemrObj.date = Year + '-' + Monthr + '-' + this.muns(tian)

    let day = dates.getDay() //获取周
    let arrs = ['日', '一', '二', '三', '四', '五', '六']
    this.tiemrObj.day = '星期' + arrs[day]
    this.setTimers()
    var self = this
    this.$api.get('/serviceBus/findServiceBus').then(function(res) {
      self.busStion = res.result
    })
  },
  mounted() {
    this.$nextTick(function() {
      var self = this
      this.timer = setInterval(this.setTimers, 1000)
      setTimeout(() => {
        this.$refs.nav.className = ''
        this.$refs.nav.className = 'nav is-visible'
        this.$refs.indexMain.className = ''
        this.$refs.indexMain.className = 'indexMain clearfix is-visible'

        function initEcharts() {
          if (self.$store.getters.websocketData[207004]) {
            // self.lcdRate = parseInt(self.indexData.lcdonline / self.indexData.lcdtotal * 100)
            // self.ledRate = parseInt(self.indexData.ledonline / self.indexData.ledtotal * 100)
            // self.lightsRate = parseInt(self.indexData.lightonline / self.indexData.lighttotal * 100)
            for (var i = 0; i < self.chartPie_option.series.length; i++) {
              switch (self.chartPie_option.series[i].name) {
                case 'LED屏':
                  self.chartPie_option.series[i].data[0].value =
                    self.indexData.ledonline
                  self.chartPie_option.series[i].data[1].value =
                    self.indexData.ledtotal - self.indexData.ledonline
                  break
                case 'LCD屏':
                  self.chartPie_option.series[i].data[0].value =
                    self.indexData.lcdonline
                  self.chartPie_option.series[i].data[1].value =
                    self.indexData.lcdtotal - self.indexData.lcdonline
                  break
                case '照明':
                  self.chartPie_option.series[i].data[0].value =
                    self.indexData.lightonline
                  self.chartPie_option.series[i].data[1].value =
                    self.indexData.lighttotal - self.indexData.lightonline
                  break
              }
            }
            setTimeout(() => {
              self.initCharts()
            }, 800)
          } else {
            setTimeout(() => {
              initEcharts()
            }, 400)
          }
        }
        initEcharts()
      }, 200)
    })
  },
  methods: {
    pushIndex() {
      this.$router.push({ name: 'site' })
    },
    singout() {
      var self = this
      this.$api.post2('/user/logout').then(function(res) {
        sessionStorage.loginGJZ = false
        self.$router.push({ name: 'login' })
        location.reload()
      })
    },
    muns(tiem) {
      return tiem < 10 ? '0' + tiem : tiem
    },
    setTimers() {
      let oDate = new Date()
      let tiems = null
      let str = ''
      let hours = oDate.getHours()
      let minute = oDate.getMinutes()
      let seconds = oDate.getSeconds()

      hours = hours < 10 ? '0' + hours : hours
      minute = minute < 10 ? '0' + minute : minute
      seconds = seconds < 10 ? '0' + seconds : seconds
      tiems = hours + ':' + minute + ':' + seconds
      // console.log("67tiems", tiems);
      if (hours > 12) {
        hours -= 12
        str = 'PM'
      } else {
        str = 'AM'
      }

      this.tiemrObj.tiems = tiems
      this.tiemrObj.str = str
    },
    initCharts() {
      if (!this.$refs.chartPie) {
        return
      }
      var chartPie = this.$echarts.init(this.$refs.chartPie)

      chartPie.setOption(this.chartPie_option)
      window.addEventListener('resize', chartPie.resize)

      // var chartLine = this.$echarts.init(this.$refs.chartLine);

      // chartLine.setOption(this.chartLine_option);
      // window.addEventListener("resize", chartLine.resize);

      var chartBar = this.$echarts.init(this.$refs.chartBar)

      chartBar.setOption(this.chartBar_option)
      window.addEventListener('resize', chartBar.resize)

      this.updateCharts()
    },
    updateCharts() {
      var self = this
      var month = new Date().getMonth() + 1

      // echarts图表数据
      this.$api.get('/getEnergyConsumption').then(function(res) {
        if (res.code) {
          console.warn('服务器返回数据异常', res)
          return
        }
        // 折线图
        if (!self.$refs.chartLine) {
          return
        }
        var chartLine = self.$echarts.init(self.$refs.chartLine)

        self.chartLine_option.xAxis.data = [...new Array(month)].map(
          (item, index) => index + 1
        )
        self.chartLine_option.series[0].data = [...new Array(month)].map(
          (item, index) => res.total[index + 1] || 0
        )

        chartLine.setOption(self.chartLine_option)
        window.addEventListener('resize', chartLine.resize)

        // 柱状图
        var chartBar = self.$echarts.getInstanceByDom(self.$refs.chartBar)
        var xAxisData = []
        var seriesData = {
          led: [],
          lcd: [],
          light: []
        }

        Object.keys(res.month).forEach(k => {
          var obj = res.month[k]

          xAxisData.push(k)
          seriesData.led.push(~~obj.led || 0)
          seriesData.lcd.push(~~obj.lcd || 0)
          seriesData.light.push(~~obj.light || 0)
        })
        self.chartBar_option.xAxis.data = Object.keys(res.month).map(d => {
          var date = new Date()

          date.setDate(date.getDate() - (7 - d))
          return date.getDate()
        })
        self.chartBar_option.series[0].data = seriesData.led
        self.chartBar_option.series[1].data = seriesData.lcd
        self.chartBar_option.series[2].data = seriesData.light

        chartBar.setOption(self.chartBar_option)
      })
    },
    createLinearColor_bar(colorStart, colorStop) {
      return {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: colorStart
          },
          {
            offset: 1,
            color: colorStop || colorStart + '00'
          }
        ]
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$refs.nav.className = 'nav'
    this.$refs.indexMain.className = 'indexMain clearfix'
    setTimeout(() => {
      next()
    }, 1500)
  }
}
</script>
<style lang="scss" scope>
.imgg {
  position: relative;
  right: 2%;
  top: 13%;
  width: 0.2rem;
}
.hang {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  letter-spacing: 0.02rem;
}
.fontsize_z {
  font-size: 0.36rem;
}
.fontsize_q {
  font-size: 0.17rem;
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
  height: 33.3%;
  display: flex;
  border-bottom: rgba(31, 247, 242, 0.3) solid 0.01rem;
  width: 92%;
  margin: 0 auto;
  font-size: 0.17rem;
  .e_icon {
    width: 0.6rem;
    height: 0.6rem;
  }
}
.e_icon0_oc {
  position: absolute;
  background: url('../assets/img/citem0_oc.png') no-repeat center/contain;
}
.e_icon0 {
  position: absolute;
  background: url('../assets/img/citem0.png') no-repeat center/contain;
}
.e_icon1_oc {
  background: url('../assets/img/citem1_oc.png') no-repeat center/contain;
}
.e_icon1 {
  background: url('../assets/img/site/icon_light.png') no-repeat center/contain;
}
.e_icon2 {
  background: url('../assets/img/site/icon_led.png') no-repeat center/contain;
}
.e_icon3 {
  background: url('../assets/img/site/icon_lcd.png') no-repeat center/contain;
}
.border_n {
  border: none !important;
}
</style>