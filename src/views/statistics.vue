<template>
  <div class="statistics" ref="statistics">
    <div class="menu">
      <ul class="headerMenu">
        <li
          v-for="(item,index) in headerMenu"
          :key="index"
          @click="toggleMenu(item,index)"
          :class="{selected:index===headerMenuIndex}"
        >{{item}}</li>
      </ul>
    </div>
    <div class="panel" :class="{'is-visible':headerMenuIndex==0}">
      <div class="flex-layout trans-left trans-left-delay-7">
        <div class="title nhfx flex4">
          <h3>今日能耗</h3>
        </div>
        <div class="title nhfx flex6">
          <h3>各站能耗分析</h3>
          <div class="y-form">
            <el-date-picker
              type="month"
              size="mini"
              placeholder="请选择"
              v-model="nhfxMonth"
              value-format="yyyy-MM"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </div>
        </div>
      </div>
      <div class="row flex-layout trans-left trans-left-delay-5">
        <div class="flex4" ref="nhfxChart1"></div>
        <div class="flex6" ref="nhfxChart2"></div>
      </div>
      <div class="flex-layout trans-left trans-left-delay-7">
        <div class="title nhfx flex4">
          <h3>年度总能耗分析</h3>
        </div>
        <div class="title nhfx flex6">
          <h3>月度能耗分析</h3>
          <div class="y-form">
            <el-date-picker
              type="year"
              size="mini"
              placeholder="请选择"
              v-model="nhfxYear"
              value-format="yyyy"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </div>
        </div>
      </div>
      <div class="row flex-layout trans-left trans-left-delay-7">
        <div class="flex4" ref="nhfxChart3"></div>
        <div class="flex6" ref="nhfxChart4"></div>
      </div>
    </div>
    <div class="panel" :class="{'is-visible':headerMenuIndex==1}">
      <div class="title ztfx trans-left trans-left-delay-3">
        <h3>各站台能耗日分析</h3>
        <div class="y-form">
          <el-select
            v-model="ztfxSelect1"
            placeholder="请选择"
            size="mini"
            :popper-append-to-body="false"
          >
            <el-option
              v-for="(item,i) in selectData"
              :key="i"
              :label="item.text"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-date-picker
            type="month"
            size="mini"
            placeholder="请选择"
            v-model="ztfxMonth"
            value-format="yyyy-MM"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </div>
      </div>
      <div class="row flex-layout trans-left trans-left-delay-5">
        <div class="flex1" ref="ztfxChart1"></div>
      </div>
      <div class="title ztfx trans-left trans-left-delay-7">
        <h3>各站台能耗月分析</h3>
        <div class="y-form">
          <el-select
            v-model="ztfxSelect2"
            placeholder="请选择"
            size="mini"
            :popper-append-to-body="false"
          >
            <el-option
              v-for="(item,i) in selectData"
              :key="i"
              :label="item.text"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-date-picker
            type="year"
            size="mini"
            placeholder="请选择"
            v-model="ztfxYear"
            value-format="yyyy"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </div>
      </div>
      <div class="row flex-layout trans-left trans-left-delay-7">
        <div class="flex1" ref="ztfxChart2"></div>
      </div>
    </div>
    <div class="panel" :class="{'is-visible':headerMenuIndex==2}">
      <div class="flex-layout trans-left trans-left-delay-3">
        <div class="title gjfx flex4">
          <h3>实时设备在线率</h3>
        </div>
        <div class="title gjfx flex6">
          <h3>设备离线事件统计</h3>
          <div class="y-form">
            <div class="buttons">
              <div
                v-for="(item,index) in monthOpt"
                :key="index"
                v-on:click="toggleIndex(index,'sjtjIndex')"
                v-bind:class="{selected:index===sjtjIndex}"
              >{{item.text}}</div>
            </div>
            <el-date-picker
              type="month"
              value-format="yyyy-MM"
              size="mini"
              placeholder="请选择"
              v-model="sjtjStartTime"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </div>
        </div>
      </div>
      <div class="row flex-layout trans-left trans-left-delay-5">
        <div class="flex-layout flex4">
          <div class="flex1" ref="gjfxChart1"></div>
          <div class="flex1" ref="gjfxChart2"></div>
          <div class="flex1" ref="gjfxChart3"></div>
        </div>
        <div class="flex6" ref="gjfxChart4"></div>
      </div>
      <div class="title gjfx trans-left trans-left-delay-7">
        <h3>告警趋势分析</h3>
        <div class="y-form">
          <div class="buttons">
            <div :class="{selected:1===gjtjIndex}" @click="gjtjIndex=1">本月</div>
            <div :class="{selected:3===gjtjIndex}" @click="gjtjIndex=3">本季</div>
            <div :class="{selected:2===gjtjIndex}" @click="gjtjIndex=2">本年</div>
          </div>
          <el-date-picker
            style="display:none;"
            type="year"
            value-format="yyyy"
            size="mini"
            placeholder="请选择"
            v-model="gjtjStartTime"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </div>
      </div>
      <div class="row flex-layout trans-left trans-left-delay-7">
        <div class="flex4" ref="gjfxChart5"></div>
        <div class="flex6" ref="gjfxChart6"></div>
      </div>
    </div>
    <div class="panel" :class="{'is-visible':headerMenuIndex==3}">
      <div class="title ztfx trans-left trans-left-delay-3">
        <h3>照明设备分析</h3>
      </div>
      <div class="row flex-layout trans-left trans-left-delay-5">
        <div class="flex1 zm dpzm" ref="xxsjChart1"></div>
        <div class="flex1 zm dxzm" ref="xxsjChart2"></div>
        <div class="flex1 zm logozm" ref="xxsjChart3"></div>
      </div>
      <div class="flex-layout trans-left trans-left-delay-7">
        <div class="title nhfx flex7">
          <h3>LED屏播放时长</h3>
          <div class="y-form">
            <el-date-picker
              type="date"
              size="mini"
              placeholder="请选择"
              v-model="xxsjDate1"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </div>
        </div>
        <div class="title nhfx flex3">
          <h3>LCD屏播放时长</h3>
          <div class="y-form">
            <el-date-picker
              type="date"
              size="mini"
              placeholder="请选择"
              v-model="xxsjDate2"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </div>
        </div>
      </div>
      <div class="row flex-layout trans-left trans-left-delay-7">
        <div class="flex7" ref="xxsjChart4"></div>
        <div class="flex3" ref="xxsjChart5"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    var self = this;
    var now = this.formatDate(new Date());
    const COLORS = {
      LED屏: "rgba(0, 255, 249, 1)",
      LCD屏: "rgba(137, 249, 139, 1)",
      照明: "rgba(251, 154, 1, 1)"
    };
    var emptyItem = {
      value: 1,
      label: {
        show: false
      },
      itemStyle: {
        color: "rgba(0,0,0,0)"
      },
      tooltip: {
        show: false
      }
    };

    var baseLineOpt = {
      color: Object.values(COLORS),
      grid: {
        top: 40,
        left: 30,
        right: 35,
        bottom: 20,
        containLabel: true
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      textStyle: {
        color: "#fff"
      },
      xAxis: {
        name: "(日)",
        type: "category",
        data: [],
        nameTextStyle: {
          padding: [25, 0, 0, -10]
        },
        axisLine: {
          show: false
        },
        axisTick: { show: false }
      },
      yAxis: {
        name: "",
        type: "value",
        nameTextStyle: {
          padding: [0, 0, 0, -40]
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,0.2)"
          }
        }
      },
      series: [
        {
          name: "环境监测",
          type: "line",
          symbol: "circle",
          symbolSize: 8,
          data: []
        }
      ]
    };
    var basePieOpt = {
      color: ["#FE5050", "#00000000"],
      title: {
        bottom: "10%",
        left: "center",
        text: "",
        textStyle: {
          fontWeight: "normal",
          color: "#fff",
          fontSize: 16
        }
      },
      series: [
        {
          name: "设备在线率",
          type: "pie",
          clockwise: false,
          radius: ["50%", "56%"],
          hoverAnimation: false,
          labelLine: {
            show: false
          },
          label: {
            show: true,
            fontSize: 20,
            color: "#fff",
            position: "center",
            padding: [8, 0, 0, 0],
            formatter: "{p|{d}}%",
            rich: {
              p: {
                color: "#fff",
                fontSize: 28
              },
              t: {
                fontSize: 15,
                lineHeight: 25
              }
            }
          },
          itemStyle: {
            shadowColor: "rgba(0, 0, 0, 0.2)",
            shadowBlur: 20
          },
          data: [
            {
              value: 0,
              itemStyle: {
                borderWidth: "8",
                borderColor: "#FE5050"
              }
            },
            {
              value: 1,
              label: {
                show: false
              },
              itemStyle: {
                borderWidth: "8",
                borderColor: "#FE505030"
              }
            }
          ]
        }
      ]
    };
    var baseBarOpt = {
      grid: {
        top: 50,
        left: 20,
        right: 30,
        bottom: 17,
        containLabel: true
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      textStyle: {
        color: "#fff"
      },
      xAxis: {
        type: "category",
        data: [...new Array(12)].map((item, index) => index + 1),
        axisLabel: {
          formatter: function(val) {
            return val.slice(-2);
          }
        },
        nameTextStyle: {
          padding: [25, 0, 0, -20]
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        name: "kW‧h",
        type: "value",
        nameGap: 20,
        nameTextStyle: {
          padding: [0, 0, 0, 0]
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,0.2)"
          }
        }
      },
      series: []
    };

    var nhfxChart2_option = JSON.parse(JSON.stringify(baseBarOpt));
    nhfxChart2_option.grid.bottom = 0;
    nhfxChart2_option.xAxis.axisLabel.rotate = 30;
    nhfxChart2_option.xAxis.data = [];
    nhfxChart2_option.series = [
      {
        name: "能耗 ",
        type: "bar",
        barWidth: "50%",
        itemStyle: {
          color: self.$options.methods.createLinearColor_bar(
            "rgba(137, 249, 139, 1)"
          )
        },
        data: []
      }
    ];

    var nhfxChart3_option = JSON.parse(JSON.stringify(baseBarOpt));
    var colors = [
      "rgba(255, 156, 0, 1)",
      "rgba(137, 250, 139, 1)",
      "rgba(0, 255, 249, 1)"
    ];

    nhfxChart3_option.xAxis.data = [];
    nhfxChart3_option.xAxis.name = "(年)";
    nhfxChart3_option.series = [
      {
        name: "能耗 ",
        type: "bar",
        barWidth: "60%",
        itemStyle: {
          color: function(param) {
            return self.$options.methods.createLinearColor_bar(
              colors[param.dataIndex % colors.length]
            );
          }
        },
        data: []
      }
    ];

    var nhfxChart4_option = JSON.parse(JSON.stringify(baseBarOpt));
    nhfxChart4_option.xAxis.data = [];
    nhfxChart4_option.xAxis.name = "(月)";
    nhfxChart4_option.series = [
      {
        name: "能耗 ",
        type: "bar",
        barWidth: "50%",
        itemStyle: {
          color: self.$options.methods.createLinearColor_bar(
            "rgba(0, 255, 249, 1)"
          )
        },
        data: []
      }
    ];

    var ztfxChart1_option = JSON.parse(JSON.stringify(baseLineOpt));
    ztfxChart1_option.xAxis.data = [];
    ztfxChart1_option.yAxis.name = "kW‧h";
    ztfxChart1_option.series = [
      {
        name: "能耗 ",
        type: "line",
        symbol: "circle",
        symbolSize: 8,
        data: []
      }
    ];

    var ztfxChart2_option = JSON.parse(JSON.stringify(baseBarOpt));
    ztfxChart2_option.xAxis.data = [];
    ztfxChart2_option.xAxis.name = "(月)";
    ztfxChart2_option.series = [
      {
        name: "能耗 ",
        type: "bar",
        barWidth: "50%",
        itemStyle: {
          color: self.$options.methods.createLinearColor_bar(
            "rgba(0, 255, 249, 1)"
          )
        },
        data: []
      }
    ];

    var gjfxChart1_option = JSON.parse(JSON.stringify(basePieOpt));
    gjfxChart1_option.color[0] = COLORS["LED屏"];
    gjfxChart1_option.series[0].data[0].itemStyle.borderColor = COLORS["LED屏"];
    gjfxChart1_option.series[0].data[1].itemStyle.borderColor = COLORS[
      "LED屏"
    ].replace("1)", "0.1)");
    gjfxChart1_option.title.text = "LED屏";
    gjfxChart1_option.series[0].label.formatter = function(p) {
      return `{p|${Math.round(p.percent * 10) / 10}}%`;
    };

    var gjfxChart2_option = JSON.parse(JSON.stringify(basePieOpt));
    gjfxChart2_option.color[0] = COLORS["LCD屏"];
    gjfxChart2_option.series[0].data[0].itemStyle.borderColor = COLORS["LCD屏"];
    gjfxChart2_option.series[0].data[1].itemStyle.borderColor = COLORS[
      "LCD屏"
    ].replace("1)", "0.1)");
    gjfxChart2_option.title.text = "LCD屏";
    gjfxChart2_option.series[0].label.formatter = function(p) {
      return `{p|${Math.round(p.percent * 10) / 10}}%`;
    };

    var gjfxChart3_option = JSON.parse(JSON.stringify(basePieOpt));
    gjfxChart3_option.color[0] = COLORS["照明"];
    gjfxChart3_option.series[0].data[0].itemStyle.borderColor = COLORS["照明"];
    gjfxChart3_option.series[0].data[1].itemStyle.borderColor = COLORS[
      "照明"
    ].replace("1)", "0.1)");
    gjfxChart3_option.title.text = "照明";
    gjfxChart3_option.series[0].label.formatter = function(p) {
      return `{p|${Math.round(p.percent * 10) / 10}}%`;
    };

    var gjfxChart4_option = JSON.parse(JSON.stringify(baseLineOpt));

    gjfxChart4_option.xAxis.data = [];
    gjfxChart4_option.yAxis.name = "次";
    gjfxChart4_option.series = [
      {
        name: "LED屏 ",
        type: "line",
        symbol: "circle",
        symbolSize: 0,
        data: []
      },
      {
        name: "LCD屏 ",
        type: "line",
        symbol: "circle",
        symbolSize: 0,
        data: []
      },
      {
        name: "照明 ",
        type: "line",
        symbol: "circle",
        symbolSize: 0,
        data: []
      }
    ];

    var gjfxChart6_option = {
      color: Object.values(COLORS),
      grid: {
        top: 40,
        left: 30,
        right: 35,
        bottom: 20,
        containLabel: true
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      textStyle: {
        color: "#fff"
      },
      dataset: {
        dimensions: [
          {
            name: "timeName",
            displayName: "时间"
          },
          {
            name: "ledTotal",
            displayName: "LED"
          },
          {
            name: "lcdTotal",
            displayName: "LCD"
          },
          {
            name: "lightTotal",
            displayName: "照明"
          }
        ],
        source: []
      },
      xAxis: {
        name: "",
        type: "category",
        nameTextStyle: {
          padding: [25, 0, 0, -10]
        },
        axisLine: {
          show: false
        },
        axisTick: { show: false },
        axisLabel: {
          formatter(val) {
            return val
              .split("-")
              .pop()
              .replace(/^0+/, "");
          }
        }
      },
      yAxis: {
        name: "",
        type: "value",
        nameTextStyle: {
          padding: [0, 0, 0, -40]
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,0.2)"
          }
        }
      },
      series: [
        {
          name: "LED ",
          type: "bar",
          symbol: "circle",
          symbolSize: 0
        },
        {
          name: "LCD ",
          type: "bar",
          symbol: "circle",
          symbolSize: 0
        },
        {
          name: "照明 ",
          type: "bar",
          symbol: "circle",
          symbolSize: 0
        }
      ]
    };

    return {
      path:
        location.hostname == "localhost111" ? "http://192.168.7.50:9100" : "",
      headerMenuIndex: null,
      headerMenu: ["能耗总览", "车站能耗", "告警分析", "信息数据"],
      monthOpt: [
        {
          text: "本月"
        },
        {
          text: "上月"
        }
      ],
      ztfxSelect1: null,
      ztfxSelect2: null,
      selectData: [],
      nhfxMonth: "",
      nhfxYear: "",
      ztfxMonth: now.substr(0, 7),
      ztfxYear: now.substr(0, 4),
      xxsjDate1: null,
      xxsjDate2: null,
      sjtjStartTime: "",
      gjtjStartTime: "",
      sjtjIndex: 0,
      gjtjIndex: 0,
      pickerOptions: {
        disabledDate(date) {
          return date.getTime() >= new Date().getTime();
        }
      },
      option_nhyfx: {
        title: {
          left: "center",
          bottom: "10%",
          text: "{a|今日能耗}\n{b|0}{c|kW‧h}",
          textStyle: {
            rich: {
              a: {
                align: "center",
                color: "#fff",
                fontSize: 14,
                padding: [20, 0, 0, 0]
              },
              b: {
                fontWeight: "bold",
                color: "#0ff",
                fontSize: 40
              },
              c: {
                color: "#fff",
                fontSize: 14,
                padding: [-11, 0, 0, 3]
              }
            }
          }
        },
        series: [
          {
            startAngle: 180,
            endAngle: 0,
            type: "gauge",
            radius: "140%",
            center: ["50%", "86%"],
            axisLabel: {
              show: false
            },
            detail: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              length: 12,
              lineStyle: {
                width: 1,
                color: "#0ff"
              }
            },
            axisLine: {
              lineStyle: {
                width: -3,
                color: [[1, "#0ff"]]
              }
            }
          },
          {
            min: 0,
            max: 100,
            startAngle: 180,
            endAngle: 0,
            name: "电能耗",
            type: "gauge",
            radius: "123%",
            center: ["50%", "86%"],
            axisLabel: {
              show: false
            },
            pointer: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            detail: {
              show: false
            },
            axisLine: {
              lineStyle: {
                width: 36,
                color: [
                  [
                    0.8,
                    new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: "rgba(0, 255, 249, 0.2)"
                      },
                      {
                        offset: 1,
                        color: "rgba(0, 255, 249, 1)"
                      }
                    ])
                  ],
                  [1, "rgba(0,255,255,0.3)"]
                ]
              }
            }
          }
        ]
      },
      COLORS,
      basePieOpt,
      baseZMPieOpt: {
        color: ["#FE5050", "#00000000"],
        title: {
          top: "30%",
          left: "center",
          text: "",
          textStyle: {
            fontWeight: "normal",
            color: "#fff",
            fontSize: 16,
            rich: {
              v: {
                color: "#fff",
                fontSize: 30
              },
              t: {
                fontSize: 15,
                lineHeight: 25
              }
            }
          }
        },
        series: [
          {
            name: "设备在线率",
            type: "pie",
            startAngle: 180,
            center: ["50%", "40%"],
            radius: ["50%", "56%"],
            hoverAnimation: false,
            label: {
              show: true,
              color: "#fff",
              position: "outside",
              padding: [8, 0, 0, 0],
              formatter: "{b}: {c}"
            },
            itemStyle: {
              shadowColor: "rgba(0, 0, 0, 0.2)",
              shadowBlur: 20
            },
            data: [
              {
                name: "在线",
                value: 0,
                itemStyle: {
                  borderWidth: "8",
                  borderColor: "#FE5050"
                }
              },
              {
                name: "离线",
                value: 0.1,
                labelLine: {
                  lineStyle: {
                    color: "#aaa"
                  }
                },
                itemStyle: {
                  borderWidth: "8",
                  borderColor: "#FE505030"
                }
              }
            ]
          }
        ]
      },
      baseSCBarOpt: {
        grid: {
          top: 50,
          left: 20,
          right: 30,
          bottom: 10,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        textStyle: {
          color: "#fff"
        },
        xAxis: {
          type: "category",
          data: [],
          axisLabel: {
            rotate: 30
          },
          nameTextStyle: {
            padding: [25, 0, 0, -20]
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          name: "小时",
          type: "value",
          nameGap: 20,
          nameTextStyle: {
            padding: [0, 0, 0, 0]
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: "rgba(255,255,255,0.2)"
            }
          }
        },
        series: [
          {
            name: "播放时长",
            type: "bar",
            barWidth: "50%",
            itemStyle: {
              color: self.$options.methods.createLinearColor_bar(
                "rgba(137, 249, 139, 1)"
              )
            },
            data: []
          }
        ]
      },
      baseLineOpt,
      nhfxChart2_option,
      nhfxChart3_option,
      nhfxChart4_option,
      ztfxChart1_option,
      ztfxChart2_option,
      gjfxChart1_option,
      gjfxChart2_option,
      gjfxChart3_option,
      gjfxChart4_option,
      gjfxChart5_option: {
        tooltip: {},
        textStyle: {
          color: "#fff"
        },
        legend: {
          left: 0,
          bottom: 0,
          textStyle: {
            color: "#fff"
          }
        },
        series: [
          {
            name: "",
            type: "pie",
            startAngle: 30,
            center: ["55%", "55%"],
            radius: ["30%", "80%"],
            label: {
              rich: {
                "0": {
                  lineHeight: 18,
                  align: "center",
                  color: COLORS["LED屏"]
                },
                "1": {
                  lineHeight: 18,
                  align: "center",
                  color: COLORS["LCD屏"]
                },
                "2": {
                  lineHeight: 18,
                  align: "center",
                  color: COLORS["照明"]
                }
              },
              formatter(params) {
                var percent = 0;

                if (params.data.total != 0) {
                  percent =
                    Math.round((params.value * 1000) / params.data.total) / 10;
                }
                return `${params.name}: ${percent}%\n{${params.dataIndex /
                  2}|(${params.value})}`;
              }
            },
            data: [
              {
                name: "LED屏 ",
                value: 0,
                total: 0,
                itemStyle: {
                  color: self.$options.methods.createLinearColor_pie(
                    COLORS["LED屏"]
                  )
                }
              },
              emptyItem,
              {
                name: "LCD屏 ",
                value: 0,
                total: 0,
                itemStyle: {
                  color: self.$options.methods.createLinearColor_pie(
                    COLORS["LCD屏"]
                  )
                }
              },
              emptyItem,
              {
                name: "照明 ",
                value: 0,
                total: 0,
                itemStyle: {
                  color: self.$options.methods.createLinearColor_pie(
                    COLORS["照明"]
                  )
                }
              },
              emptyItem
            ]
          }
        ]
      },
      gjfxChart6_option
    };
  },
  computed: {
    xxsjChart1_option() {
      const option = JSON.parse(JSON.stringify(this.baseZMPieOpt));

      option.color[0] = this.COLORS["LED屏"];
      option.series[0].data[0].itemStyle.borderColor = this.COLORS["LED屏"];
      option.series[0].data[1].itemStyle.borderColor = this.COLORS[
        "LED屏"
      ].replace("1)", "0.1)");
      option.series[0].label.formatter = function(p) {
        return `${p.name}: ${~~p.value}`;
      };

      return option;
    },
    xxsjChart2_option() {
      const option = JSON.parse(JSON.stringify(this.baseZMPieOpt));

      option.color[0] = this.COLORS["LCD屏"];
      option.series[0].data[0].itemStyle.borderColor = this.COLORS["LCD屏"];
      option.series[0].data[1].itemStyle.borderColor = this.COLORS[
        "LCD屏"
      ].replace("1)", "0.1)");
      option.series[0].label.formatter = function(p) {
        return `${p.name}: ${~~p.value}`;
      };

      return option;
    },
    xxsjChart3_option() {
      const option = JSON.parse(JSON.stringify(this.baseZMPieOpt));

      option.color[0] = this.COLORS["照明"];
      option.series[0].data[0].itemStyle.borderColor = this.COLORS["照明"];
      option.series[0].data[1].itemStyle.borderColor = this.COLORS[
        "照明"
      ].replace("1)", "0.1)");
      option.series[0].label.formatter = function(p) {
        return `${p.name}: ${~~p.value}`;
      };

      return option;
    }
  },
  created: function() {},
  mounted() {
    var self = this;
    this.$nextTick(function() {
      //   this.$refs.statistics.className = "";
      //   this.$refs.statistics.className = "statistics is-visible";
      this.headerMenuIndex = 0;
    });

    this.initCharts();

    var now = this.formatDate(new Date());

    self.nhfxYear = now.substr(0, 4);
    self.nhfxMonth = now.substr(0, 7);
    self.updateNhfxCharts();

    self.getStations();

    self.gjtjStartTime = now.substr(0, 4);
    self.sjtjStartTime = now.substr(0, 7);

    self.xxsjDate1 = now.substr(0, 10);
    self.xxsjDate2 = now.substr(0, 10);

    self.updateCharts();

    self.gjtjIndex = 1;
  },
  watch: {
    sjtjIndex: function(newVal, oldVal) {
      var date = new Date();

      if (newVal === 1) {
        date = new Date(date.getFullYear(), date.getMonth() - 1);
      }

      this.sjtjStartTime = this.formatDate(date).substr(0, 7);
    },
    sjtjStartTime: function(newVal, oldVal) {
      var self = this;

      // 设备离线事件统计(折线)
      this.$api
        .get(self.path + "/getOffLineCount", {
          date: newVal
        })
        .then(function(res) {
          if (res.code) {
            console.warn("服务器返回数据异常", res);
            return;
          }

          var gjfxChart4 = self.$echarts.getInstanceByDom(
            self.$refs.gjfxChart4
          );
          var day = new Date().getDate();
          var led = [];
          var lcd = [];
          var light = [];
          var keys;

          // 本月
          if (~~newVal.slice(-2) === new Date().getMonth() + 1) {
            keys = Object.keys(res).filter(k => k.slice(-2) <= day);
          } else {
            keys = Object.keys(res);
          }

          keys.forEach(k => {
            var obj = res[k];

            led.push(obj.led || 0);
            lcd.push(obj.lcd || 0);
            light.push(obj.light || 0);
          });

          self.gjfxChart4_option.xAxis.data = Object.keys(res);
          self.gjfxChart4_option.series[0].data = led;
          self.gjfxChart4_option.series[1].data = lcd;
          self.gjfxChart4_option.series[2].data = light;

          gjfxChart4.setOption(self.gjfxChart4_option);
        });
    },
    gjtjIndex: function(newVal, oldVal) {
      var self = this;

      // alert(newVal)  1月2年3季度

      self.$api
        .get(self.path + "/getReportDateType", {
          dateType: newVal
        })
        .then(function(res) {
          if (res.code) {
            console.warn("服务器返回数据异常", res);
            return;
          }
          var gjfxChart6 = self.$echarts.getInstanceByDom(
            self.$refs.gjfxChart6
          );
          self.gjfxChart6_option.dataset.source = res;
          gjfxChart6.setOption(self.gjfxChart6_option);
        });
    },
    gjtjStartTime: function(newVal, oldVal) {
      var self = this;

      // alert(newVal)
      // 告警趋势分析(饼图)
      this.$api
        .get(self.path + "/getCountReport", {
          date: newVal
        })
        .then(function(res) {
          var gjfxChart5 = self.$echarts.getInstanceByDom(
            self.$refs.gjfxChart5
          );

          // 总数
          var total =
            res.led.countreport + res.lcd.countreport + res.light.countreport;

          self.gjfxChart5_option.series[0].data[0].value = res.led.countreport;
          self.gjfxChart5_option.series[0].data[0].total = total;
          self.gjfxChart5_option.series[0].data[2].value = res.lcd.countreport;
          self.gjfxChart5_option.series[0].data[2].total = total;
          self.gjfxChart5_option.series[0].data[4].value =
            res.light.countreport;
          self.gjfxChart5_option.series[0].data[4].total = total;

          gjfxChart5.setOption(self.gjfxChart5_option);
        });
    },
    nhfxYear: function(newVal, oldVal) {
      var self = this;

      this.$api
        .get(self.path + "/getEnergyConsumptionByYear", {
          date: newVal
        })
        .then(function(res) {
          if (res.code) {
            console.warn("服务器返回数据异常", res);
            return;
          }

          self.nhfxChart4_option.xAxis.data = Object.keys(res.total);
          self.nhfxChart4_option.series[0].data = Object.values(res.total).map(
            d => Math.round(d * 10) / 10
          );

          var nhfxChart4 = self.$echarts.getInstanceByDom(
            self.$refs.nhfxChart4
          );

          nhfxChart4.setOption(self.nhfxChart4_option);
        });
    },
    nhfxMonth: function(newVal, oldVal) {
      var self = this;

      this.$api
        .get(self.path + "/getEnergyConsumptionByStation", {
          date: newVal
        })
        .then(function(res) {
          if (res.code) {
            console.warn("服务器返回数据异常", res);
            return;
          }

          var keys = [];
          var values = [];

          res.forEach(obj => {
            keys.push(obj.stationname);
            values.push(Math.round(obj.sum * 10) / 10);
          });

          self.nhfxChart2_option.xAxis.data = keys;
          self.nhfxChart2_option.series[0].data = values;

          var nhfxChart2 = self.$echarts.getInstanceByDom(
            self.$refs.nhfxChart2
          );

          nhfxChart2.setOption(self.nhfxChart2_option);
        });
    },
    ztfxSelect1: function(newVal, oldVal) {
      this.updateZtfxChart1();
    },
    ztfxMonth: function(newVal, oldVal) {
      this.updateZtfxChart1();
    },
    ztfxSelect2: function(newVal, oldVal) {
      this.updateZtfxChart2();
    },
    ztfxYear: function(newVal, oldVal) {
      this.updateZtfxChart2();
    },
    xxsjDate1(newVal, oldVal) {
      this.updateBfscChart("led", newVal);
    },
    xxsjDate2(newVal, oldVal) {
      this.updateBfscChart("lcd", newVal);
    }
  },
  methods: {
    updateBfscChart(deviceType, time) {
      var self = this;

      self.$api
        .get(self.path + "/getDurationPlay", {
          deviceType,
          time
        })
        .then(function(res) {
          if (res.code != 1) {
            console.warn("服务器返回数据异常", res);
            return;
          }

          var xData = [],
            data = [];
          var xxsjChart = self.$echarts.getInstanceByDom(
            self.$refs[deviceType === "led" ? "xxsjChart4" : "xxsjChart5"]
          );

          res.result.forEach(obj => {
            xData.push(obj.stationName);
            // runTime: 单位,秒
            data.push(Math.round((+obj.runTime / 60 / 60) * 10) / 10);
          });

          xxsjChart.setOption({
            xAxis: {
              data: xData
            },
            series: [
              {
                name: "播放时长",
                data: data
              }
            ]
          });
        });
    },
    toggleIndex(index, varName) {
      this[varName] = index;
    },
    getStations() {
      var self = this;
      this.$api.get(self.path + "/getStationids").then(function(res) {
        self.selectData = res.map((s, i) => {
          if (i === 0) {
            self.ztfxSelect1 = s.stationid;
            self.ztfxSelect2 = s.stationid;
          }
          return {
            value: s.stationid,
            text: s.stationname
          };
        });
      });
    },
    updateZtfxChart1() {
      var self = this;

      this.$api
        .get(self.path + "/getEnergyConsumptionByStationAndMonth", {
          date: self.ztfxMonth,
          stationid: self.ztfxSelect1
        })
        .then(function(res) {
          if (res.code || !res.total) {
            console.warn("服务器返回数据异常", res);
            return;
          }

          var day = new Date().getDate();
          var keys = Object.keys(res.total);

          // 当前月份只显示天数小于今天的
          if (~~self.ztfxMonth.slice(-2) === new Date().getMonth() + 1) {
            keys = keys.filter(k => k.slice(-2) <= day);
          }

          self.ztfxChart1_option.xAxis.data = Object.keys(res.total);
          self.ztfxChart1_option.series[0].data = keys.map(
            k => Math.round(res.total[k] * 10) / 10
          );

          var ztfxChart1 = self.$echarts.getInstanceByDom(
            self.$refs.ztfxChart1
          );

          ztfxChart1.setOption(self.ztfxChart1_option);
        });
    },
    updateZtfxChart2() {
      var self = this;

      this.$api
        .get(self.path + "/getEnergyConsumptionByStationAndYear", {
          date: self.ztfxYear,
          stationid: self.ztfxSelect2
        })
        .then(function(res) {
          if (res.code || !res.total) {
            console.warn("服务器返回数据异常", res);
            return;
          }

          self.ztfxChart2_option.xAxis.data = Object.keys(res.total);
          self.ztfxChart2_option.series[0].data = Object.values(res.total).map(
            d => Math.round(d * 10) / 10
          );

          var ztfxChart2 = self.$echarts.getInstanceByDom(
            self.$refs.ztfxChart2
          );

          ztfxChart2.setOption(self.ztfxChart2_option);
        });
    },
    updateNhfxCharts() {
      var self = this;
      var year = new Date().getFullYear();

      // echarts图表数据
      this.$api.get(self.path + "/getEnergyConsumption").then(function(res) {
        if (res.code) {
          console.warn("服务器返回数据异常", res);
          return;
        }
        // 本日能耗
        var nhfxChart1 = self.$echarts.getInstanceByDom(self.$refs.nhfxChart1);

        self.option_nhyfx.title.text = `{a|今日能耗}\n{b|${Math.round(
          (res.total.thisday || 0) * 10
        ) / 10}}{c|kW‧h}`;
        nhfxChart1.setOption(self.option_nhyfx);

        // 整年度能耗分析
        var nhfxChart3 = self.$echarts.getInstanceByDom(self.$refs.nhfxChart3);

        self.nhfxChart3_option.xAxis.data = [year - 2, year - 1, year];
        self.nhfxChart3_option.series[0].data = [
          Math.round(res.total[year - 2] * 10) / 10,
          Math.round(res.total[year - 1] * 10) / 10,
          Math.round(res.total[year] * 10) / 10
        ];

        nhfxChart3.setOption(self.nhfxChart3_option);
      });
    },
    updateCharts() {
      var self = this;

      // 实时设备在线率
      this.$api.get(self.path + "/getOnLineProportion").then(function(res) {
        if (res.code) {
          console.warn("服务器返回数据异常", res);
          return;
        }
        // led
        var gjfxChart1 = self.$echarts.getInstanceByDom(self.$refs.gjfxChart1);

        self.gjfxChart1_option.series[0].data[0].value = res.led.ledOnlineCount;
        self.gjfxChart1_option.series[0].data[1].value =
          res.led.count - res.led.ledOnlineCount;

        gjfxChart1.setOption(self.gjfxChart1_option);
        // lcd
        var gjfxChart2 = self.$echarts.getInstanceByDom(self.$refs.gjfxChart2);

        self.gjfxChart2_option.series[0].data[0].value = res.lcd.lcdOnlineCount;
        self.gjfxChart2_option.series[0].data[1].value =
          res.lcd.count - res.lcd.lcdOnlineCount;

        gjfxChart2.setOption(self.gjfxChart2_option);
        // 照明
        var gjfxChart3 = self.$echarts.getInstanceByDom(self.$refs.gjfxChart3);

        self.gjfxChart3_option.series[0].data[0].value =
          res.light.lightOnlineCount;
        self.gjfxChart3_option.series[0].data[1].value =
          res.light.count - res.light.lightOnlineCount;

        gjfxChart3.setOption(self.gjfxChart3_option);
      });
      // 照明设备分析
      self.$api.get(self.path + "/getOnLineLight").then(function(res) {
        if (!res.ceiling) {
          console.warn("服务器返回数据异常", res);
          return;
        }

        // 1
        var xxsjChart1 = self.$echarts.getInstanceByDom(self.$refs.xxsjChart1);

        self.xxsjChart1_option.title.text = `{v|${res.ceiling.count}}\n{t|总数}`;
        self.xxsjChart1_option.series[0].data[0].value =
          res.ceiling.onLineCount;
        self.xxsjChart1_option.series[0].data[1].value =
          res.ceiling.offLineCount || 0.1;

        xxsjChart1.setOption(self.xxsjChart1_option);
        // 2
        var xxsjChart2 = self.$echarts.getInstanceByDom(self.$refs.xxsjChart2);

        self.xxsjChart2_option.title.text = `{v|${res.lightBox.count}}\n{t|总数}`;
        self.xxsjChart2_option.series[0].data[0].value =
          res.lightBox.onLineCount;
        self.xxsjChart2_option.series[0].data[1].value =
          res.lightBox.offLineCount || 0.1;

        xxsjChart2.setOption(self.xxsjChart2_option);
        // 3
        var xxsjChart3 = self.$echarts.getInstanceByDom(self.$refs.xxsjChart3);

        self.xxsjChart3_option.title.text = `{v|${res.logo.count}}\n{t|总数}`;
        self.xxsjChart3_option.series[0].data[0].value = res.logo.onLineCount;
        self.xxsjChart3_option.series[0].data[1].value =
          res.logo.offLineCount || 0.1;

        xxsjChart3.setOption(self.xxsjChart3_option);
      });
    },
    initCharts() {
      var self = this;

      var nhfxChart1 = this.$echarts.init(self.$refs.nhfxChart1);

      nhfxChart1.setOption(self.option_nhyfx);
      window.addEventListener("resize", nhfxChart1.resize);

      var nhfxChart2 = this.$echarts.init(self.$refs.nhfxChart2);

      nhfxChart2.setOption(self.nhfxChart2_option);
      window.addEventListener("resize", nhfxChart2.resize);

      var nhfxChart4 = this.$echarts.init(self.$refs.nhfxChart4);

      nhfxChart4.setOption(self.nhfxChart4_option);
      window.addEventListener("resize", nhfxChart4.resize);

      var nhfxChart3 = this.$echarts.init(self.$refs.nhfxChart3);

      nhfxChart3.setOption(self.nhfxChart3_option);
      window.addEventListener("resize", nhfxChart3.resize);

      var ztfxChart1 = this.$echarts.init(self.$refs.ztfxChart1);
      ztfxChart1.setOption(self.ztfxChart1_option);
      window.addEventListener("resize", ztfxChart1.resize);

      var ztfxChart2 = this.$echarts.init(self.$refs.ztfxChart2);
      ztfxChart2.setOption(self.ztfxChart2_option);
      window.addEventListener("resize", ztfxChart2.resize);

      var gjfxChart1 = this.$echarts.init(self.$refs.gjfxChart1);
      gjfxChart1.setOption(self.gjfxChart1_option);
      window.addEventListener("resize", function() {
        setTimeout(function() {
          gjfxChart1.resize();
        }, 100);
      });

      var gjfxChart2 = this.$echarts.init(self.$refs.gjfxChart2);
      gjfxChart2.setOption(self.gjfxChart2_option);
      window.addEventListener("resize", function() {
        setTimeout(function() {
          gjfxChart2.resize();
        }, 100);
      });

      var gjfxChart3 = this.$echarts.init(self.$refs.gjfxChart3);
      gjfxChart3.setOption(self.gjfxChart3_option);
      window.addEventListener("resize", function() {
        setTimeout(function() {
          gjfxChart3.resize();
        }, 100);
      });

      var gjfxChart4 = this.$echarts.init(self.$refs.gjfxChart4);
      gjfxChart4.setOption(self.gjfxChart4_option);
      window.addEventListener("resize", gjfxChart4.resize);

      var gjfxChart5 = this.$echarts.init(self.$refs.gjfxChart5);
      gjfxChart5.setOption(self.gjfxChart5_option);
      window.addEventListener("resize", gjfxChart5.resize);

      var gjfxChart6 = this.$echarts.init(self.$refs.gjfxChart6);
      gjfxChart6.setOption(self.gjfxChart6_option);
      window.addEventListener("resize", gjfxChart6.resize);

      var xxsjChart1 = this.$echarts.init(self.$refs.xxsjChart1);
      xxsjChart1.setOption(self.xxsjChart1_option);
      window.addEventListener("resize", xxsjChart1.resize);

      var xxsjChart2 = this.$echarts.init(self.$refs.xxsjChart2);
      xxsjChart2.setOption(self.xxsjChart2_option);
      window.addEventListener("resize", xxsjChart2.resize);

      var xxsjChart3 = this.$echarts.init(self.$refs.xxsjChart3);
      xxsjChart3.setOption(self.xxsjChart3_option);
      window.addEventListener("resize", xxsjChart3.resize);

      var xxsjChart4 = this.$echarts.init(self.$refs.xxsjChart4);
      xxsjChart4.setOption(self.baseSCBarOpt);
      window.addEventListener("resize", xxsjChart4.resize);

      var xxsjChart5 = this.$echarts.init(self.$refs.xxsjChart5);
      xxsjChart5.setOption(self.baseSCBarOpt);
      window.addEventListener("resize", xxsjChart5.resize);
    },
    createLinearColor_bar(colorStart, colorStop) {
      return {
        type: "linear",
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
            offset: 0.92,
            color:
              colorStop ||
              colorStart.substring(0, colorStart.lastIndexOf(",")) + ", 0)"
          }
        ]
      };
    },
    createLinearColor_pie(colorStart, colorStop) {
      return {
        type: "linear",
        x: 1,
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
            color:
              colorStop ||
              colorStart.substring(0, colorStart.lastIndexOf(",")) + ", 0)"
          }
        ]
      };
    },
    formatDate(date) {
      let d = date;
      let year = d.getFullYear();
      let month = ("0" + (d.getMonth() + 1)).slice(-2);
      let day = ("0" + d.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    },
    toggleMenu(item, index) {
      var self = this;

      self.headerMenuIndex = index;
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$refs.statistics.className = "statistics";
    setTimeout(() => {
      next();
    }, 700);
  }
};
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.statistics {
  width: 98vw;
  height: 86vh;
  position: absolute;
  top: 1.15rem;
  left: 1vw;
  z-index: 1;
  overflow: hidden;
  background: url("../assets/img/statistics/statistics_bg.png");
  background-size: 100% 100%;
  .menu {
    position: relative;
  }
  .headerMenu {
    font-size: 0.16rem;
    margin: 0.2rem auto 0 auto;
    text-align: center;
    background: url("../assets/img/statistics/headerMenu_bg.png") no-repeat;
    background-position: center;
    background-size: 5.05rem 0.44rem;
    .selected {
      color: #fff;
      position: relative;
    }
    .selected::after {
      content: "";
      position: absolute;
      top: 0;
      left: -0.12rem;
      width: 1.43rem;
      height: 0.44rem;
      background: url("../assets/img/statistics/headerMenuSelected.png")
        no-repeat;
      background-size: 100% 0.44rem;
    }
    li {
      transition: color 0.2s;
      cursor: pointer;
      display: inline-block;
      color: #00fff9;
      width: 1.18rem;
      height: 0.44rem;
      line-height: 0.44rem;
    }
  }
  .flex-layout {
    display: flex;
  }
  .flex1 {
    flex: 1;
  }
  .flex3 {
    flex: 3;
  }
  .flex4 {
    flex: 4;
  }
  .flex6 {
    flex: 6;
  }
  .flex7 {
    flex: 7;
  }
  .panel {
    z-index: 0;
    color: #fff;
    position: absolute;
    left: 1vw;
    right: 0;
    bottom: 0;
    top: 0.6rem;
    .zm::after {
      font-size: 0.2rem;
      text-align: center;
      display: block;
      margin-top: -0.55rem;
    }
    .dpzm::after {
      content: "顶棚照明";
    }
    .dxzm::after {
      content: "灯箱照明";
    }
    .logozm::after {
      content: "logo照明";
    }
    .nhfx {
      background-image: url("../assets/img/statistics/icon_1.png");
    }
    .ztfx {
      background-image: url("../assets/img/statistics/icon_2.png");
    }
    .gjfx {
      background-image: url("../assets/img/statistics/icon_3.png");
    }
    .title {
      width: 100%;
      font-size: 0.2rem;
      height: 0.48rem;
      margin-top: 0.2rem;
      padding: 0.05rem 0.2rem 0 0.58rem;
      background-size: auto 100%;
      background-repeat: no-repeat;
      position: relative;
      z-index: 11;
      h3 {
        padding-bottom: 0.05rem;
        border-bottom: 1px solid #0adfd9;
      }
    }
    .row {
      height: calc(50% - 0.8rem);
    }
    .y-form {
      height: auto;
      position: absolute;
      right: 0.2rem;
      top: 0;
      z-index: 11;
      .buttons {
        flex: inherit;
        font-size: 0.18rem;
        margin-right: 0.18rem;
        display: inline-flex;
        div {
          cursor: pointer;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          margin: 0 0.1rem;
          padding: 0 0.02rem 0.02rem;
          border-bottom: 2px solid #00000000;
        }
        .selected {
          color: #00ffea;
          border-bottom-color: rgba(0, 255, 249, 1);
        }
      }
      .el-date-editor {
        width: 2.1rem !important;
      }
      .el-date-editor {
        margin-left: 0.1rem;
      }
    }
  }
  .is-visible {
    z-index: 1;
  }
}
</style>
