<template>
  <div class="control">
    <!-- 照明控制 -->
    <div class="wrapbox" ref="control" v-if="$route.path == '/illumine'">
      <div class="Lighting-Control Bug_Control trans-up trans-up-delay-3">
        <div
          class="o_title mar_t"
          style="border-radius: 0.05rem 0 0 0; margin-top: -0.1rem;margin-left: -0.1rem;"
        >
          <span>
            <img class="line_h" src="../assets/img/sb.png" />
          </span>
          <span>设备运行状态</span>
        </div>
        <div class="Lighting-content">
          <div class="btnBox" style="margin-top: 0.15rem;">
            <span style="float: left;">设备</span>
            <span
              class="btn"
              @click="handleLightingType(key)"
              v-for="(val,key) in Lighting.typeData"
              :class="key == Lighting.target ? 'active' : null"
              :key="key"
            >{{val}}</span>
          </div>
          <div class="show-Control clearfix">
            <span>控制</span>
            <span class="right_o">
              <el-button
                type="success"
                size="mini"
                class="open"
                @click="handleLightingControl('open')"
              >开启</el-button>
              <el-button
                type="warning"
                size="mini"
                class="down"
                @click="handleLightingControl('down')"
              >关闭</el-button>
            </span>
          </div>
        </div>
        <div class="Lighting-from" style="height:calc(100% - 1.6rem)">
          <div
            style="width:100%;height:100%"
            v-if="!LightingFormData"
            v-loading="!LightingFormData"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.4)"
          ></div>
          <ul class="frombox" v-if="LightingFormData">
            <div class="fromItemBox sbar">
              <li class="fromItem-title">
                <div class="checkbox">
                  <checked :target="'all'" :key="wuyong" />
                </div>
                <div class="locationName">位置名称</div>
                <span class="switch">开关</span>
                <span class="status">状态</span>
              </li>
              <li class="fromItem" v-for="(item,index) in LightingFormData" :key="index">
                <div class="checkbox">
                  <checked v-if="item.lamphouseid" :target="item.lamphouseid" :key="wuyong" />
                  <checked v-if="item.logoid" :target="item.logoid" :key="wuyong" />
                  <checked v-if="item.platfondid" :target="item.platfondid" :key="wuyong" />
                </div>
                <div
                  class="locationName"
                  @click="dsClick(item.stationid)"
                >{{item.stationname || "&nbsp;"}}</div>
                <div class="switch" @click="dsClick(item.stationid)">
                  <span class="onoff" style="display:inline-block;margin-left:0.01rem">
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
                </div>
                <div class="status" @click="dsClick(item.stationid)">
                  <span class="state" style="display:inline-block;margin-left:0.01rem">
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
                </div>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>

    <!-- LED控制 -->
    <div class="wrapbox" ref="control" v-if="$route.path == '/led'">
      <div class="LED-Control Bug_Control trans-up trans-up-delay-3">
        <!-- <div class="control-title">
          <div class="iconfont"></div>
          <span>设备控制</span>
        </div>-->
        <div
          class="o_title mar_t"
          style="border-radius: 0.05rem 0 0 0; margin-top: -0.1rem;margin-left: -0.1rem;"
        >
          <span>
            <img class="line_h" src="../assets/img/sb.png" />
          </span>
          <span>设备控制</span>
        </div>
        <div class="control-content">
          <div class="control-content_item">
            <span class="item-type">控制</span>
            <div class="item-btn">
              <el-button
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
            </div>
          </div>
          <!-- <div class="control-content_item">
            <span class="item-type">自动调光</span>
            <div style="text-align:right;float:right;">
              <el-switch
                v-model="LED.autolight"
                :disabled="LED.isLedSlide"
                active-color="#72EED2"
                @change="handleLEDSlide('autolight')"
              ></el-switch>
            </div>
          </div>-->
          <div class="control-content_item">
            <span class="item-type">亮度</span>
            <div class="item-slider">
              <el-slider
                :max="65"
                v-model="LED.light"
                :disabled="LED.isLedSlide"
                @change="handleLEDSlide('light')"
              ></el-slider>
              <span class="number">{{LED.light}}</span>
            </div>
          </div>
          <div class="control-content_item">
            <span class="item-type">音量</span>
            <div class="item-slider">
              <el-slider
                :max="15"
                v-model="LED.volume"
                :disabled="LED.isLedSlide"
                @change="handleLEDSlide('volume')"
              ></el-slider>
              <span class="number">{{LED.volume}}</span>
            </div>
          </div>
        </div>
        <div class="LED-from" style="height:calc(100% - 2.6rem)">
          <div
            style="width:100%;height:100%"
            v-loading="!LedFormData"
            v-if="!LedFormData"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.4)"
          ></div>
          <ul class="frombox" v-if="LedFormData">
            <div class="fromItemBox LEDBlank sbar">
              <li class="fromItem-title">
                <div class="checkbox">
                  <checked :target="'all'" :key="wuyong" @clickChecked="handleLEDInput" />
                </div>
                <div class="locationName">位置名称</div>
                <span class="switch">开关</span>
                <span class="status">状态</span>
              </li>
              <li class="fromItem" v-for="item in LedFormData" :key="item.id">
                <div class="checkbox">
                  <checked :target="item.id" @clickChecked="handleLEDInput" :key="wuyong" />
                </div>
                <div class="locationName" @click="dsClick(item.stationid)">{{item.stationname}}</div>
                <div class="switch" @click="dsClick(item.stationid)">
                  <span class="onoff" style="display:inline-block;margin-left: 0rem;">
                    <img
                      style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                      src="../assets/img/icon/dui_green.png"
                      v-if="item.onoff == 1"
                    />
                    <img
                      style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                      src="../assets/img/icon/cuo_gray.png"
                      v-if="item.onoff == 0"
                    />
                  </span>
                  <!-- <span class="openSwitch" v-if="item.onoff == 1"></span>
                  <span class="downSwitch" v-if="item.onoff == 0"></span>-->
                </div>
                <div class="status" @click="dsClick(item.stationid)">
                  <span class="state" style="display:inline-block;margin-left: 0rem;">
                    <img
                      style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                      src="../assets/img/icon/wifi_green.png"
                      v-if="item.online == 1"
                    />
                    <img
                      style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                      src="../assets/img/icon/error_yellow.png"
                      v-if="item.online == 0"
                    />
                  </span>
                  <!-- <span class="openLigthing" v-if="item.online == 1"></span>
                  <span class="downLigthing" v-if="item.online == 0"></span>-->
                </div>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>

    <!-- LCD控制 -->
    <div class="wrapbox" ref="control" v-if="$route.path == '/lcd'">
      <div class="LED-Control Bug_Control trans-up trans-up-delay-3">
        <!-- <div class="o_box_corner obc1"></div>
        <div class="o_box_corner obc2"></div>
        <div class="o_box_corner obc3"></div>
        <div class="o_box_corner obc4"></div>-->
        <!-- <div class="control-title">
          <div class="iconfont"></div>
          <span>设备控制</span>
        </div>-->
        <div
          class="o_title mar_t"
          style="border-radius: 0.05rem 0 0 0; margin-top: -0.1rem;margin-left: -0.1rem;"
        >
          <span>
            <img class="line_h" src="../assets/img/sb.png" />
          </span>
          <span>设备控制</span>
        </div>
        <div class="control-content">
          <div class="control-content_item">
            <span class="item-type">控制</span>
            <div class="item-btn">
              <el-button
                type="success"
                size="mini"
                class="open"
                @click="handleLCDControl('open')"
              >开启</el-button>
              <el-button
                type="warning"
                size="mini"
                class="down"
                @click="handleLCDControl('down')"
              >关闭</el-button>
              <el-button
                type="primary"
                size="mini"
                class="rest"
                @click="handleLCDControl('rest')"
              >重启</el-button>
            </div>
          </div>
          <div class="control-content_item">
            <span class="item-type">音量</span>
            <div class="item-slider">
              <el-slider
                v-model="LCD.volume"
                :step="10"
                :disabled="LCD.isLcdSlide"
                @change="handleLCDSlide"
              ></el-slider>
              <span class="number">{{LCD.volume}}</span>
            </div>
          </div>
          <div class="control-content_item">
            <span class="item-type">亮度</span>
            <div class="item-slider">
              <el-slider
                v-model="LCD.value2"
                :step="10"
                :disabled="LCD.isLcdSlide"
                @change="handleLCDSlideLight"
              ></el-slider>
              <span class="number">{{LCD.value2}}</span>
            </div>
          </div>
        </div>
        <div class="LED-from" style="height:calc(100% - 1.55rem)">
          <div
            style="width:100%;height:100%"
            v-loading="!LcdFormData"
            v-if="!LcdFormData"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.4)"
          ></div>
          <ul class="frombox" v-if="LcdFormData">
            <div class="fromItemBox LCDBlank sbar">
              <li class="fromItem-title">
                <div class="checkbox">
                  <checked :target="'all'" @clickChecked="handleLCDInput" :key="wuyong" />
                </div>
                <div class="locationName">位置名称</div>
                <span class="switch">开关</span>
                <span class="status">状态</span>
              </li>
              <li class="fromItem" v-for="item in LcdFormData" :key="item.id">
                <div class="checkbox">
                  <checked :target="item.id" @clickChecked="handleLCDInput" :key="wuyong" />
                </div>
                <div class="locationName" @click="dsClick(item.stationid)">{{item.stationname}}</div>
                <div class="switch" @click="dsClick(item.stationid)">
                  <span class="onoff" style="display:inline-block;margin-left:0rem">
                    <img
                      style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                      src="../assets/img/icon/dui_green.png"
                      v-if="item.onoff == 1"
                    />
                    <img
                      style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                      src="../assets/img/icon/cuo_gray.png"
                      v-if="item.onoff == 0"
                    />
                  </span>
                  <!-- <span class="openSwitch" v-if="item.status == 1"></span>
                  <span class="downSwitch" v-if="item.status == 0"></span>-->
                </div>
                <div class="status" @click="dsClick(item.stationid)">
                  <span class="state" style="display:inline-block;margin-left: 0rem;">
                    <img
                      style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                      src="../assets/img/icon/wifi_green.png"
                      v-if="item.status == 1"
                    />
                    <img
                      style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                      src="../assets/img/icon/error_yellow.png"
                      v-if="item.status == 0"
                    />
                  </span>
                  <!-- <span class="openLigthing" v-if="item.status == 1"></span>
                  <span class="downLigthing" v-if="item.status == 0"></span>-->
                </div>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>

    <!-- 用电管理 -->
    <div class="wrapbox" ref="control" v-if="$route.path == '/electricity'">
      <div class="Electro-Control Bug_Control trans-up trans-up-delay-3">
        <div class="jizhong">
          <div
            class="o_title mar_t"
            style="border-radius: 0.05rem 0 0 0; margin-top: -0.1rem;margin-left: -0.1rem;"
          >
            <span>
              <img class="line_h" src="../assets/img/sb.png" />
            </span>
            <span>集中控制器</span>
          </div>
          <div class="jizhong-Form">
            <ul class="frombox">
              <div class="fromContent sbar">
                <li class="fromItem-title">
                  <span class="name">名称</span>
                  <span class="equipmentStatus">状态</span>
                </li>

                <div v-if="gatewayFormData">
                  <li
                    class="fromItem"
                    @click="dsClick(item.stationid)"
                    v-for="item in gatewayFormData"
                    v-if="item.id != 999"
                    :key="item.id"
                  >
                    <span class="name">{{item.name}}</span>
                    <div class="equipmentStatus">
                      <span class="state" style="display:inline-block;margin: 0 auto;">
                        <img
                          style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                          src="../assets/img/icon/wifi_green.png"
                          v-if="item.line == 1"
                        />
                        <img
                          style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                          src="../assets/img/icon/error_yellow.png"
                          v-if="item.line == 0"
                        />
                      </span>
                    </div>
                  </li>
                </div>
              </div>
            </ul>
          </div>
        </div>
        <div class="clearfix" style="height:calc(100% - 3.5rem)">
          <div
            class="o_title mar_t"
            style="border-radius: 0.05rem 0 0 0; margin-top: -0.1rem;margin-left: -0.1rem;"
          >
            <span>
              <img class="line_h" src="../assets/img/sb.png" />
            </span>
            <span>回路控制</span>
          </div>
          <div class="Electro-content">
            <div class="equipmentCooseBox">
              <span class="titleText">设备选择</span>
              <el-select
                v-model="Electro.value"
                placeholder="请选择"
                size="mini"
                :popper-append-to-body="false"
                @change="gatwaySelect"
                @visible-change="visibleChange($event,Electro.value)"
              >
                <el-option
                  v-for="(item,index) in gatewayFormData"
                  :key="item.id"
                  :label="item.name"
                  :value="index"
                ></el-option>
              </el-select>
              <div class="select">
                <span :class="{'down':Electro.selecting,'up':!Electro.selecting}"></span>
              </div>
            </div>
            <!-- <div class="loopChooseBox addBoxStatus">
              <span class="titleText">状态</span>
              <strong style="float:right;margin-right:.1rem;">
                <img
                  style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                  src="../assets/img/icon/wifi_green.png"
                  v-if="gatewayFormData && gatewayFormData[Electro.value].line == 1"
                />
                <img
                  style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                  src="../assets/img/icon/error_yellow.png"
                  v-if="gatewayFormData && gatewayFormData[Electro.value].line == 0"
                />
              </strong>
            </div>-->
            <div class="loopChooseBox">
              <span style="float:left;">回路控制</span>
              <div class="electroBtn" style="width:3rem">
                <el-button
                  type="success"
                  size="mini"
                  style="width:0.8rem;padding: 0.08rem 0.07rem;backgroud:#56B346"
                  class="open"
                  @click="handleElectroControl('open')"
                >闭合回路</el-button>
                <el-button
                  type="warning"
                  size="mini"
                  style="width:0.8rem;padding: 0.08rem 0.07rem;backgroud:#BC9442"
                  class="down"
                  @click="handleElectroControl('down')"
                >断开回路</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  style="width:0.8rem;padding: 0.08rem 0.07rem;margin-right:0.1rem;backgroud:#BC9442"
                  class="read"
                  @click="handleElectroControl('read')"
                >读取回路</el-button>
              </div>
            </div>
          </div>
          <div class="Electro-Form" style="height:calc(100% - 1.5rem)">
            <ul class="frombox" style="height:100%">
              <div style="height:100%" class="sbar" v-if="gatewayFormData">
                <li class="fromItem-title">
                  <div class="checkbox">
                    <checked :target="'all'" :key="wuyong" />
                  </div>
                  <span class="name">回路名称</span>
                  <span class="status" v-if="Electro.value != 0">开关</span>
                </li>
                <li
                  class="fromItem"
                  v-for="item in gatewayFormData[this.Electro.value].loops"
                  :key="item.loop"
                >
                  <div class="checkbox">
                    <checked :target="item.loop" :key="wuyong" />
                  </div>
                  <span class="name">{{item.device}}</span>
                  <div class="status" v-if="gatewayFormData[Electro.value].id != 999">
                    <span class="state" style="display:inline-block;margin: 0 auto;">
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
  </div>
</template>
<script>
import Vue from 'vue'
import checked from './checked'
// import * as mapWork from "../map3d/work";
export default {
  name: 'control',
  data() {
    return {
      wuyong: 0,
      Lighting: {
        switch: true,
        target: 1,
        lamphousesData: [],
        logosData: [],
        platfondsData: [],
        Data: [
          {
            location: '位置名称',
            id: '1',
            status: false,
            switch: true,
            checked: false
          },
          {
            location: '位置名称',
            id: '2',
            status: false,
            switch: false,
            checked: false
          },
          {
            location: '位置名称',
            id: '3',
            status: true,
            switch: false,
            checked: false
          },
          {
            location: '位置名称',
            id: '4',
            status: false,
            switch: false,
            checked: false
          }
        ],
        typeData: {
          3: '灯箱照明',
          2: 'LOGO照明',
          1: '顶棚照明'
        }
      },
      LED: {
        volume: 0, // 音量
        light: 0, // 亮度
        isLedSlide: true,
        autolight: false,
        Data: [
          {
            location: '位置名称',
            id: '1',
            status: 0,
            checked: false
          },
          {
            location: '位置名称',
            id: '2',
            status: 0,
            checked: false
          },
          {
            location: '位置名称',
            id: '3',
            status: 1,
            checked: false
          },
          {
            location: '位置名称',
            id: '4',
            status: 1,
            checked: false
          }
        ]
      },
      LCD: {
        volume: 0, // 音量
        isLcdSlide: true,
        Data: []
      },
      Electro: {
        value: 0,
        line: 0,
        selecting: true, // 下拉框的显示和隐藏
        allChecked: false
      },
      checkedArray: [], // input框选择的数据
      time: ''
    }
  },
  components: {
    checked
  },
  computed: {
    code: function() {
      return this.modulecode[this.$route.name]
    },
    LcdFormData: function() {
      if (this.$store.getters.websocketData[204001]) {
        return this.$store.getters.websocketData[204001].msg.lcds
      } else {
        return false
      }
    },
    LedFormData: function() {
      if (this.$store.getters.websocketData[205001]) {
        return this.$store.getters.websocketData[205001].msg.leds
      } else {
        return false
      }
    },
    LightingFormData: function() {
      let isLen = this.$store.getters.websocketData[203004]
      if (isLen) {
        if (this.Lighting.target == 1) {
          return this.$store.getters.websocketData[203004].msg.platfonds
        } else if (this.Lighting.target == 2) {
          return this.$store.getters.websocketData[203004].msg.logos
        } else if (this.Lighting.target == 3) {
          return this.$store.getters.websocketData[203004].msg.lamphouses
        }
      } else {
        return false
      }
    },
    gatewayFormData: function() {
      if (this.$store.getters.websocketData[206002]) {
        let all = [
          {
            id: 999,
            line: 1,
            loops: [
              { device: '回路1', loop: 1, state: 0 },
              { device: '回路2', loop: 2, state: 0 },
              { device: '回路3', loop: 3, state: 0 },
              { device: '回路4', loop: 4, state: 0 },
              { device: '回路5', loop: 5, state: 0 },
              { device: '回路6', loop: 6, state: 0 },
              { device: '回路7', loop: 7, state: 0 },
              { device: '回路8', loop: 8, state: 0 }
            ],
            name: '全部',
            stationid: 999
          }
        ]
        var compare = function(obj1, obj2) {
          var val1 = obj1.loop
          var val2 = obj2.loop
          if (val1 < val2) {
            return -1
          } else if (val1 > val2) {
            return 1
          } else {
            return 0
          }
        }
        for (
          var i = 0;
          i < this.$store.getters.websocketData[206002].msg.gateways.length;
          i++
        ) {
          this.$store.getters.websocketData[206002].msg.gateways[i].loops.sort(
            compare
          )
        }
        return all.concat(
          this.$store.getters.websocketData[206002].msg.gateways
        )
      } else {
        return false
      }
    }
  },
  mounted: function() {
    this.$nextTick(function() {})
  },
  methods: {
    // 动画方法
    entry() {
      this.$refs.control.className = ''
      this.$refs.control.className = 'wrapbox is-visible'
    },
    leave() {
      this.$refs.control.className = 'wrapbox'
    },

    dsClick(lId) {
      let sMapPoint = this.$arrMapPoint.all || []
      for (let item of sMapPoint) {
        if (lId === item.siteid) {
          Vue.prototype.$locationByJWD(item.longitude, item.latitude)
          this.leave()
          this.$store.dispatch('setNow', lId)
          setTimeout(() => {
            this.workCover.updateSelById(lId)
            $('.' + lId)
              .stop()
              .animate({ marginTop: '-124px' })
            this.$store.state.isClick = true
            this.$store.state.selectId = lId
            this.$store.state.loction = lId
            this.$store.state.last = lId
            this.$store.state.selectBoolean = 'isSelect'
            setTimeout(() => {
              this.$store.state.isClick = false
            }, 2000)
          }, 600)
          // this.$parent.showSc(lId);
        }
      }
    },

    handleLightingType(index) {
      this.$store.state.checkedArray = {}
      let array = []
      this.Lighting.target = index
      let isLen = this.$store.getters.websocketData[203004]
      if (isLen) {
        if (this.Lighting.target == 1) {
          array = this.$store.getters.websocketData[203004].msg.platfonds
          this.$store.state.checkedArray['all'] = false
          array.forEach((item, index) => {
            this.$store.state.checkedArray[item.platfondid] = false
          })
        } else if (this.Lighting.target == 2) {
          array = this.$store.getters.websocketData[203004].msg.logos
          this.$store.state.checkedArray['all'] = false
          array.forEach((item, index) => {
            this.$store.state.checkedArray[item.logoid] = false
          })
        } else if (this.Lighting.target == 3) {
          array = this.$store.getters.websocketData[203004].msg.lamphouses
          this.$store.state.checkedArray['all'] = false
          array.forEach((item, index) => {
            this.$store.state.checkedArray[item.lamphouseid] = false
          })
        }
      }
    },
    handleLightingControl(flag) {
      // console.log(this.Lighting.target);

      let lightId = []
      for (const key in this.$store.state.checkedArray) {
        if (this.$store.state.checkedArray[key] && key != 'all') {
          lightId.push(Number(key))
        }
      }
      let params
      if (!lightId.length) {
        this.$Message.closeAll()
        this.$Message.error('请先选择站点')
      } else {
        if (flag == 'open') {
          params = {
            msgid: '550e8400-e29b-41d4-a716-446655440000',
            modulecode: 1003,
            msgtype: 0, //消息类型：0-命令
            msgcode: 200001,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 1, //命令类型：1-开灯；2-关灯；
              lighttype: this.Lighting.target, //照明类型：1-顶棚；2-logo；3-灯箱
              lights: lightId
            }
          }
        } else if (flag == 'down') {
          params = {
            msgid: '550e8400-e29b-41d4-a716-446655440000',
            modulecode: 1003,
            msgtype: 0, //消息类型：0-命令
            msgcode: 200001,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 2, //命令类型：1-开灯；2-关灯；
              lighttype: this.Lighting.target, //照明类型：1-顶棚；2-logo；3-灯箱
              lights: lightId
            }
          }
        }
        this.getControlAPI(params)
      }
    },

    handleLEDInput() {
      let flag = 0
      for (const key in this.$store.state.checkedArray) {
        if (this.$store.state.checkedArray[key] && key != 'all') {
          flag += 1
        }
      }
      if (flag > 0) {
        this.LED.isLedSlide = false
        if (flag == 1) {
          let keyId
          for (const key in this.$store.state.checkedArray) {
            if (this.$store.state.checkedArray[key] && key != 'all') {
              keyId = Number(key)
            }
          }
          this.LedFormData.forEach(item => {
            if (item.id == keyId) {
              this.LED.light = item.light
              this.LED.volume = item.volume

              this.LED.autolight = item.autolight == 0 ? false : true
            }
          })
        } else {
          this.LED.light = 0
          this.LED.volume = 0
          this.LED.autolight = false
        }
      } else {
        this.LED.volume = 0
        this.LED.light = 0
        this.LED.isLedSlide = true
        this.LED.autolight = false
      }
    },

    // LED开关
    handleLEDControl(flag) {
      let ledId = []
      for (const key in this.$store.state.checkedArray) {
        if (this.$store.state.checkedArray[key] && key != 'all') {
          ledId.push(Number(key))
        }
      }
      let params
      if (!ledId.length) {
        this.$Message.closeAll()
        this.$Message.error('请先选择站点')
      } else {
        if (flag == 'open') {
          params = {
            msgid: '550e8400-e29b-41d4-a716-446655440000',
            modulecode: this.code,
            msgtype: 0,
            msgcode: 10002,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 1, //命令类型：1-开启；2-关闭；3-重启；4-调光；5-音量
              light: this.LED.light,
              volume: this.LED.volume,
              leds: ledId
            }
          }
        } else if (flag == 'down') {
          params = {
            msgid: '550e8400-e29b-41d4-a716-446655440000',
            modulecode: this.code,
            msgtype: 0,
            msgcode: 200001,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 2, //命令类型：1-开启；2-关闭；3-重启；4-调光；5-音量
              light: this.LED.light,
              volume: this.LED.volume,
              leds: ledId
            }
          }
        } else if (flag == 'rest') {
          params = {
            msgid: '550e8400-e29b-41d4-a716-446655440000',
            modulecode: this.code,
            msgtype: 0,
            msgcode: 200001,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 3, //命令类型：1-开启；2-关闭；3-重启；4-调光；5-音量
              light: this.LED.light,
              volume: this.LED.volume,
              leds: ledId
            }
          }
        }
        this.getControlAPI(params)
      }
    },
    // LED亮度、音量滑动
    handleLEDSlide(flag) {
      let ledId = []
      for (const key in this.$store.state.checkedArray) {
        if (this.$store.state.checkedArray[key] && key != 'all') {
          ledId.push(Number(key))
        }
      }
      let params
      if (!ledId.length) {
        this.$Message.closeAll()
        this.$Message.error('请先选择站点')
      } else {
        if (flag == 'light') {
          params = {
            msgid: '550e8400-e29b-41d4-a716-446655440000',
            modulecode: this.code,
            msgtype: 0,
            msgcode: 200001,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 4, //命令类型：1-开启；2-关闭；3-重启；4-调光；5-音量
              light: this.LED.light,
              volume: this.LED.volume,
              // autolight: this.LED.autolight ? 1 : 0,
              leds: ledId
            }
          }
        } else if (flag == 'volume') {
          params = {
            msgid: '550e8400-e29b-41d4-a716-446655440000',
            modulecode: this.code,
            msgtype: 0,
            msgcode: 200001,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 5, //命令类型：1-开启；2-关闭；3-重启；4-调光；5-音量
              light: this.LED.light,
              volume: this.LED.volume,
              // autolight: this.LED.autolight ? 1 : 0,
              leds: ledId
            }
          }
        } else if (flag == 'autolight') {
          params = {
            msgid: '550e8400-e29b-41d4-a716-446655440000',
            modulecode: this.code,
            msgtype: 0,
            msgcode: 200001,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 6, //命令类型：1-开启；2-关闭；3-重启；4-调光；5-音量
              light: this.LED.light,
              volume: this.LED.volume,
              // autolight: this.LED.autolight ? 1 : 0,
              leds: ledId
            }
          }
        }
        this.getControlAPI(params)
      }
    },

    handleLCDInput(id) {
      let flag = 0
      for (const key in this.$store.state.checkedArray) {
        if (this.$store.state.checkedArray[key] && key != 'all') {
          flag += 1
        }
      }
      if (flag > 0) {
        this.LCD.isLcdSlide = false
        if (flag == 1) {
          let keyId
          for (const key in this.$store.state.checkedArray) {
            if (this.$store.state.checkedArray[key] && key != 'all') {
              keyId = Number(key)
            }
          }
          this.LcdFormData.forEach(item => {
            if (item.id == keyId) {
              // this.LED.light = item.light;
              this.LCD.volume = item.volume
            }
          })
        } else {
          // this.LED.light = 0;
          this.LCD.volume = 0
        }
      } else {
        this.LCD.volume = 0
        // this.LED.light = 0;
        this.LCD.isLcdSlide = true
      }
    },

    handleLCDControl(flag) {
      let lcdId = []
      for (const key in this.$store.state.checkedArray) {
        if (this.$store.state.checkedArray[key] && key != 'all') {
          lcdId.push(Number(key))
        }
      }
      let params
      if (!lcdId.length) {
        this.$Message.closeAll()
        this.$Message.error('请先选择站点')
      } else {
        if (flag == 'open') {
          params = {
            msgid: '550e8400-e29b-41d4-a716-446655440000',
            modulecode: this.code,
            msgtype: 0,
            msgcode: 200001,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 1, //命令类型：1-开启；2-关闭；3-重启；4-调光；5-音量
              // light: this.LCD.light,
              volume: this.LCD.volume,
              lcds: lcdId
            }
          }
        } else if (flag == 'down') {
          params = {
            msgid: '550e8400-e29b-41d4-a716-446655440000',
            modulecode: this.code,
            msgtype: 0,
            msgcode: 200001,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 2, //命令类型：1-开启；2-关闭；3-重启；4-调光；5-音量
              // light: this.LCD.light,
              volume: this.LCD.volume,
              lcds: lcdId
            }
          }
        } else if (flag == 'rest') {
          params = {
            msgid: '550e8400-e29b-41d4-a716-446655440000',
            modulecode: this.code,
            msgtype: 0,
            msgcode: 200001,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 3, //命令类型：1-开启；2-关闭；3-重启；4-调光；5-音量
              // light: this.LCD.light,
              volume: this.LCD.volume,
              lcds: lcdId
            }
          }
        }
        this.getControlAPI(params)
      }
    },
    // LCD音量滑动
    handleLCDSlide() {
      let lcdId = []
      for (const key in this.$store.state.checkedArray) {
        if (this.$store.state.checkedArray[key] && key != 'all') {
          lcdId.push(Number(key))
        }
      }
      let params
      if (!lcdId.length) {
        this.$Message.closeAll()
        this.$Message.error('请先选择站点')
      } else {
        params = {
          msgid: '550e8400-e29b-41d4-a716-446655440000',
          modulecode: this.code,
          msgtype: 0,
          msgcode: 200001,
          timestamp: this.$getCurrentDate(),
          msg: {
            cmdtype: 5, //命令类型：1-开启；2-关闭；3-重启；4-调光；5-音量
            // light: this.LCD.light,
            volume: this.LCD.volume,
            lcds: lcdId
          }
        }
        this.getControlAPI(params)
      }
    },
    handleLCDSlideLight() {
      let lcdId = []
      for (const key in this.$store.state.checkedArray) {
        if (this.$store.state.checkedArray[key] && key != 'all') {
          lcdId.push(Number(key))
        }
      }
      let params
      if (!lcdId.length) {
        this.$Message.closeAll()
        this.$Message.error('请先选择站点')
      } else {
        params = {
          msgid: '550e8400-e29b-41d4-a716-446655440000',
          modulecode: this.code,
          msgtype: 0,
          msgcode: 200001,
          timestamp: this.$getCurrentDate(),
          msg: {
            cmdtype: 4, //命令类型：1-开启；2-关闭；3-重启；4-调光；5-音量
            // light: this.LCD.light,
            volume: this.LCD.value2,
            lcds: lcdId
          }
        }
        this.getControlAPI(params)
      }
    },

    handleElectroControl(flag) {
      let loopId = []
      for (const key in this.$store.state.checkedArray) {
        if (this.$store.state.checkedArray[key] && key != 'all') {
          loopId.push(Number(key))
        }
      }
      let params
      if (!loopId.length) {
        this.$Message.closeAll()
        this.$Message.error('请先选择站点')
      } else {
        if (flag == 'open') {
          params = {
            msgid: '550e8400-e29b-41d4-a716-446655440000',
            modulecode: this.code,
            msgtype: 0,
            msgcode: 200001,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 1,
              gatewayid: [this.gatewayFormData[this.Electro.value].id],
              loops: loopId
            }
          }
        } else if (flag == 'down') {
          params = {
            msgid: '550e8400-e29b-41d4-a716-446655440000',
            modulecode: this.code,
            msgtype: 0,
            msgcode: 200001,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 0,
              gatewayid: [this.gatewayFormData[this.Electro.value].id],
              loops: loopId
            }
          }
        } else if (flag == 'read') {
          params = {
            msgid: '550e8400-e29b-41d4-a716-446655440000',
            modulecode: this.code,
            msgtype: 0,
            msgcode: 200001,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 2,
              gatewayid: [this.gatewayFormData[this.Electro.value].id],
              loops: loopId
            }
          }
        }
        if (this.gatewayFormData[this.Electro.value].id == 999) {
          params.msg.gatewayid = []
          for (var i = 1; i < this.gatewayFormData.length; i++) {
            params.msg.gatewayid.push(this.gatewayFormData[i].id)
            this.getControlAPI(params)
          }
        }
        this.getControlAPI(params)
      }
    },
    visibleChange($event, vlaueSelect) {
      // console.log($event, vlaueSelect);
      this.Electro.selecting = !this.Electro.selecting
    },
    gatwaySelect() {
      this.$store.state.checkedArray = {}
      this.wuyong++
    },
    // 发送请求
    getControlAPI(data) {
      this.$api.post('/websocket/command', data).then(function(res) {
        console.log(res)
      })
    },
    // 处理单选框数据更新和勾选的问题
    changeChecked(oldData, newData, isLen) {
      var oldNum = 0
      var newNum = 0
      if (isLen && oldData.length > 0) {
        for (var i = 0; i < oldData.length; i++) {
          oldNum = 0
          for (var s = 0; s < newData.length; s++) {
            if (oldData[i].id == newData[s].id) {
              oldData[i] = newData[s] //找到推送数据和已有数据相同ID项进行替换
            } else {
              oldNum++
              if (oldNum == newData.length) {
                //旧数据中的某一条不存在在新数据中，此条数据被删除
                oldData.splice(i, 1)
                this.checkedArray.splice(i, 1)
              }
            }
          }
        }
        for (var s = 0; s < newData.length; s++) {
          newNum = 0
          for (var i = 0; i < oldData.length; i++) {
            if (newData[s].id != oldData[i].id) {
              newNum++
              if (newNum == oldData.length) {
                //新推送的数据中的某一条是旧数据中不存在的，push进data中
                oldData.push(newData[s])
                this.checkedArray.push({
                  id: newData[s].id,
                  checked: false
                })
              }
            }
          }
        }
      }
      return oldData.length > 0 ? oldData : []
    }
  }
}
</script>

<style lang="scss" scoped>
.line_h {
  vertical-align: middle;
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
.el-select {
  display: inline-block;
  position: absolute;
  z-index: 2;
  opacity: 1;
  top: 0rem;
  right: 0rem;
  width: 2.95rem;
}

.el-select-dropdown {
  background-color: rgba(1, 30, 38, 0.6);
}
.el-button + .el-button {
  margin-left: 0rem;
}
.el-button--mini {
  // width: 70rem;
  // height: 36rem;
  padding: 0.1rem 0.2rem;
  font-size: 0.14rem;
  border: 0.01rem solid rgba(255, 255, 255, 1);
  opacity: 0.8;
  border-radius: 0.04rem;
  &:hover {
    box-shadow: 0 0 0.1rem rgba(255, 255, 255, 0.8) inset;
  }
}

.bgContent {
  position: relative;
  width: 4.8rem;
  //   height: calc(100vh - 1.14rem) !important;
  padding: 0.1rem;
  color: #fff;
  padding: 0.1rem;
  // background-color: rgba(1, 30, 38, 0.8);
  //   background: url("../assets/img/bg.png") no-repeat center/contain;
  //   background-size: 100% 100%;
  // border-radius: 0.05rem;
  // box-shadow: 0 0 0.1rem #56ffdd inset;
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

.Lighting-Control {
  @extend .bgContent;

  .Lighting-title {
    position: relative;
    margin: 0 0 0.1rem 0.28rem;
    padding-left: 0.1rem;
    border-bottom: #1ff7f2 solid 0.01rem;
    font-size: 0.16rem;
    line-height: 0.24rem;
    .iconfont {
      position: absolute;
      left: -0.28rem;
      bottom: -0.01rem;
      width: 0.3rem;
      height: 0.18rem;
      background: url('../assets/img/control/icon.png') no-repeat center/cover;
    }
  }
  .Lighting-content {
    width: 91.5%;
    margin: 0 auto;
    overflow: hidden;
    // text-align: center;
    font-size: 0.16rem;
    .show-Control {
      line-height: 0.7rem;
      .right_o {
        float: right;

        .open {
          background: #18b7b0;
          margin-left: 0.2rem;
        }
        .down {
          background: #ff992a;
          margin-left: 0.05rem;
          margin-right: 0.1rem;
        }
      }
    }
    .btnBox {
      overflow: hidden;
      .active {
        background: url('../assets/img/cli_yu_l.png') no-repeat center/contain !important;
      }
      .btn {
        padding-left: 0.16rem;
        float: right;
        width: 1rem;
        height: 0.36rem;
        color: #fff;
        line-height: 0.36rem;
        margin-right: 0.1rem;
        cursor: pointer;
        background: url('../assets/img/yu_l.png') no-repeat center/contain;
        &:hover {
          background: url('../assets/img/cli_yu_l.png') no-repeat center/contain;
        }
      }
    }
  }
  .Lighting-from {
    margin-top: 0.1rem;
    font-size: 0.14rem;
    .frombox {
      height: 100%;
      .fromItemBox {
        height: 100%;
        .fromItem-title {
          height: 0.4rem;
          line-height: 0.4rem;
          background: #184352;
          position: sticky;
          top: 0;
          .status {
            float: left;
            width: 20%;
            text-align: center;
            overflow: hidden;
          }
          .switch {
            float: left;
            width: 20%;
            height: 0.4rem;
            text-align: center;
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
          }
        }

        .fromItem {
          height: 0.4rem;
          line-height: 0.4rem;
          overflow: hidden;
          cursor: pointer;
          &:hover {
            background: rgba(86, 255, 254, 0.3);
          }
          .status {
            float: left;
            width: 20%;
            height: 0.4rem;
            text-align: center;
            overflow: hidden;
            .openLigthing {
              display: inline-block;
              width: 0.15rem;
              height: 0.15rem;
              margin-top: 0.1rem;
              background: url('../assets/img/control/correct.png') no-repeat
                center/cover;
            }
            .downLigthing {
              display: inline-block;
              margin-top: 0.1rem;
              width: 0.16rem;
              height: 0.16rem;
              background: url('../assets/img/control/error.png') no-repeat
                center/cover;
            }
          }
          .switch {
            float: left;
            width: 20%;
            text-align: center;
            height: 0.4rem;
            .openSwitch {
              display: inline-block;
              margin-top: 0.1rem;
              width: 0.18rem;
              height: 0.18rem;
              background: url('../assets/img/control/lightOpen.png') no-repeat
                center/cover;
            }
            .downSwitch {
              display: inline-block;
              margin-top: 0.1rem;
              width: 0.18rem;
              height: 0.18rem;
              background: url('../assets/img/control/lightDown.png') no-repeat
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
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            // .checked {
            //   display: inline-block;
            //   cursor: pointer;
            //   margin-top: 0.03rem;
            //   width: 0.16rem;
            //   height: 0.16rem;
            //   background: url("../assets/img/control/checked.png") no-repeat
            //     center/cover;
            // }
            // .check {
            //   display: inline-block;
            //   cursor: pointer;
            //   margin-top: 0.03rem;
            //   width: 0.16rem;
            //   height: 0.16rem;
            //   background: url("../assets/img/control/check-1.png") no-repeat
            //     center/cover;
            // }
          }
        }
      }
    }
  }
}

.LED-Control {
  @extend .bgContent;
  .control-title {
    position: relative;
    margin: 0 0 0.1rem 0.28rem;
    padding-left: 0.1rem;
    border-bottom: #1ff7f2 solid 1px;
    font-size: 0.16rem;
    line-height: 0.24rem;
    .iconfont {
      position: absolute;
      left: -0.28rem;
      bottom: -0.04rem;
      width: 0.3rem;
      height: 0.2rem;
      background: url('../assets/img/control/LcdIcon.png') no-repeat
        center/cover;
    }
  }
  .control-content {
    margin-top: 0.2rem;
    width: 91.5%;
    margin: 0 auto;
    font-size: 0.16rem;
    .control-content_item {
      line-height: 0.36rem;
      margin-top: 0.2rem;
      .item-type {
        display: inline-block;
        height: 0.36rem;
        line-height: 0.36rem;
      }
      .item-btn {
        height: 0.36rem;
        width: 2.45rem;
        float: right;
        display: flex;
        justify-content: space-between;
        .open {
          background: #18b7b0;
        }
        .down {
          background: #ff992a;
        }
        .rest {
          background: #73b97b;
        }
      }
      .item-slider {
        height: 0.36rem;
        width: 2.35rem;
        float: right;
        padding-right: 0.3rem;
        position: relative;
        .number {
          position: absolute;
          right: 0;
          top: 0;
          text-align: center;
          width: 0.3rem;
        }
      }
    }
  }

  .LED-from {
    margin-top: 0.1rem;
    .frombox {
      height: 100%;
      .fromItemBox {
        height: 100%;
        .fromItem-title {
          background: #184352;
          position: sticky;
          top: 0;
          height: 0.4rem;
          line-height: 0.4rem;
          .status {
            float: left;
            width: 20%;
            height: 0.4rem;
            text-align: center;
            overflow: hidden;
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
            text-align: center;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .switch {
            float: left;
            width: 20%;
            height: 0.4rem;
            text-align: center;
          }
        }

        .fromItem {
          height: 0.4rem;
          line-height: 0.4rem;
          overflow: hidden;
          cursor: pointer;
          &:hover {
            background: rgba(86, 255, 254, 0.3);
          }
          .status {
            float: left;
            width: 20%;
            height: 0.4rem;
            text-align: center;
            overflow: hidden;
            .openLigthing {
              display: inline-block;
              width: 0.15rem;
              height: 0.15rem;
              margin-top: 0.1rem;
              background: url('../assets/img/control/correct.png') no-repeat
                center/cover;
            }
            .downLigthing {
              display: inline-block;
              margin-top: 0.1rem;
              width: 0.16rem;
              height: 0.16rem;
              background: url('../assets/img/control/error.png') no-repeat
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
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            // .checked {
            //   display: inline-block;
            //   cursor: pointer;
            //   margin-top: 0.03rem;
            //   width: 0.16rem;
            //   height: 0.16rem;
            //   background: url("../assets/img/control/checked.png") no-repeat
            //     center/cover;
            // }
            // .check {
            //   display: inline-block;
            //   cursor: pointer;
            //   margin-top: 0.03rem;
            //   width: 0.16rem;
            //   height: 0.16rem;
            //   background: url("../assets/img/control/check-1.png") no-repeat
            //     center/cover;
            // }
          }
          .switch {
            float: left;
            width: 20%;
            height: 0.4rem;
            text-align: center;
            .openSwitch {
              display: inline-block;
              margin-top: 0.1rem;
              width: 0.19rem;
              height: 0.19rem;
              background: url('../assets/img/control/lightOpen.png') no-repeat
                center/cover;
            }
            .downSwitch {
              display: inline-block;
              margin-top: 0.1rem;
              width: 0.19rem;
              height: 0.19rem;
              background: url('../assets/img/control/lightDown.png') no-repeat
                center/cover;
            }
          }
        }
      }
    }
  }
  .LEDBlank {
    height: 100%;
  }
  .LCDBlank {
    height: 100%;
  }
}

.Electro-Control {
  @extend .bgContent;

  .jizhong {
    .jizhong-Form {
      margin-top: 0.15rem;
      .frombox {
        .fromItem-title {
          height: 0.4rem;
          line-height: 0.4rem;
          background: #184352;
          position: sticky;
          top: 0;
          .name {
            float: left;
            width: 50%;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .equipmentStatus {
            float: left;
            width: 50%;
            text-align: center;
          }
        }
        .fromItem {
          height: 0.4rem;
          line-height: 0.4rem;
          overflow: hidden;
          cursor: pointer;
          &:hover {
            background: rgba(86, 255, 254, 0.3);
          }
          .name {
            float: left;
            width: 50%;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .equipmentStatus {
            float: left;
            width: 50%;
            text-align: center;
          }
        }
        .fromContent {
          height: 2.5rem;
          margin-bottom: 0.1rem;
          .fromItem {
            height: 0.4rem;
            line-height: 0.4rem;
            overflow: hidden;
            cursor: pointer;
            &:hover {
              background: rgba(86, 255, 254, 0.3);
            }
            .name {
              float: left;
              width: 50%;
              text-align: center;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .equipmentStatus {
              float: left;
              width: 50%;
              text-align: center;
              .openLigthing {
                display: inline-block;
                width: 0.15rem;
                height: 0.15rem;
                margin-top: 0.1rem;
                background: url('../assets/img/control/correct.png') no-repeat
                  center/cover;
              }
              .downLigthing {
                display: inline-block;
                margin-top: 0.1rem;
                width: 0.16rem;
                height: 0.16rem;
                background: url('../assets/img/control/error.png') no-repeat
                  center/cover;
              }
            }
          }
        }
      }
    }
  }
  .Electro-title {
    position: relative;
    margin: 0 0 0.1rem 0.28rem;
    padding-left: 0.1rem;
    border-bottom: #1ff7f2 solid 0.01rem;
    font-size: 0.16rem;
    line-height: 0.24rem;
    .iconfont {
      position: absolute;
      left: -0.27rem;
      bottom: -0.01rem;
      width: 0.29rem;
      height: 0.16rem;
      background: url('../assets/img/control/electroIcon.png') no-repeat
        center/cover;
    }
  }
  .Electro-content {
    margin-top: 0.1rem;
    width: 91.5%;
    margin: 0 auto;
    .equipmentCooseBox {
      height: 0.45rem;
      line-height: 0.45rem;
      position: relative;
      .showInput {
        position: absolute;
        top: 0.6rem;
        right: 0.58rem;
        text-align: center;
        width: 2.2rem;
        color: #06ffeb;
      }
      .titleText {
        font-size: 0.16rem;
      }
      .select {
        position: relative;
        float: right;
        width: 3.08rem;
        height: 0.45rem;
        background: url('../assets/img/control/electroSelect.png') no-repeat
          center/cover;
        .down {
          position: absolute;
          display: inline-block;
          right: 0.2rem;
          top: 0.2rem;
          width: 0.11rem;
          height: 0.06rem;
          background: url('../assets/img/control/down.png') no-repeat
            center/cover;
        }
        .up {
          position: absolute;
          display: inline-block;
          right: 0.2rem;
          top: 0.2rem;
          width: 0.11rem;
          height: 0.06rem;
          background: url('../assets/img/control/up.png') no-repeat center/cover;
        }
      }
    }
    .loopChooseBox {
      margin-top: 0.1rem;
      height: 0.36rem;
      line-height: 0.36rem;
      .loopChoose {
        float: right;
        width: 0.1rem;
      }
      span {
        font-size: 0.16rem;
      }
      .electroBtn {
        height: 0.36rem;
        // width: 2.45rem;
        float: right;
        display: flex;
        justify-content: space-between;
        .open {
          // background: #62d3fd;
          margin-right: 0.1rem;
          padding: 0.08rem 0.07rem;
        }
        .down {
          // background: #69b3b1;
          margin-right: 0.1rem;
          padding: 0.08rem 0.07rem;
        }
        .open2 {
          // background: #62d3fd;
          margin-right: 0.1rem;
        }
        .down2 {
          background: #69b3b1;
        }
        .rest {
          background: #7cae86;
          padding: 0.08rem 0.07rem;
        }
      }
    }
  }
  .Electro-Form {
    margin-top: 0.15rem;
    .frombox {
      .fromItem-title {
        height: 0.4rem;
        line-height: 0.4rem;
        background: #184352;
        position: sticky;
        top: 0;
        display: flex;
        justify-content: space-around;
        .name {
          float: left;
          width: 50%;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .status {
          float: left;
          width: 30%;
          height: 0.4rem;
          text-align: center;
        }
        .checkbox {
          padding-left: 0.15rem;
          float: left;
          width: 20%;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .fromItem {
        height: 0.4rem;
        line-height: 0.4rem;
        overflow: hidden;
        cursor: pointer;
        display: flex;
        justify-content: space-around;
        &:hover {
          background: rgba(86, 255, 254, 0.3);
        }
        .name {
          float: left;
          width: 50%;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .status {
          float: left;
          width: 30%;
          height: 0.4rem;
          text-align: center;
        }
        .checkbox {
          padding-left: 0.15rem;
          float: left;
          width: 20%;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }
      }
    }
  }
}
</style>



