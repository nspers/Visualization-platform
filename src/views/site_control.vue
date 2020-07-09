<template>
  <div class="controlBox">
    <div class="wrapbox" ref="control" style="display: none;"></div>
    <!-- 照明管理 -->
    <div class="wrapbox" ref="control" v-if="radioType == 'lightingAdmin'">
      <div class="bg trans-up trans-up-delay-3">
        <div class="movieSection trans-up trans-up-delay-3">
          <div class="o_title mar_t b_radius">
            <span>
              <img class="line_h middel" src="../assets/img/sb.png" />
            </span>
            <span class="line_h">照明管理</span>
          </div>
          <div class="auto_margin">
            <div class="movieControl clearfix">
              <span class="conline">控制</span>
              <span>
                <el-button
                  type="warning"
                  size="mini"
                  class="down"
                  @click="handleLigthingControl('down')"
                >关闭</el-button>
                <el-button
                  type="success"
                  size="mini"
                  class="open"
                  @click="handleLigthingControl('open')"
                >开启</el-button>
              </span>
            </div>
          </div>

          <div class="movieFrom">
            <div
              style="width:100%;height:100%"
              v-loading="!Lighting.Data.length"
              v-if="!Lighting.Data.length"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.4)"
            ></div>
            <ul class="frombox" v-if="Lighting.Data.length">
              <li class="fromItem fromItem-title">
                <div class="checkbox">
                  <checked :target="'all'" :key="wuyong" />
                </div>
                <div class="locationName">位置名称</div>
                <span class="switch">开关</span>
                <span class="status">状态</span>
              </li>
              <li class="fromItem" v-for="(item,index) in Lighting.Data" :key="index">
                <div class="checkbox">
                  <checked :target="item.id" :key="wuyong" />
                </div>
                <div class="locationName" v-if="item.type == 1">顶棚照明</div>
                <div class="locationName" v-if="item.type == 3">灯箱照明</div>
                <div class="locationName" v-if="item.type == 2">logo照明</div>
                <div class="switch">
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
                </div>
                <div class="status">
                  <span class="state" style="display:inline-block;margin-left:0rem">
                    <img
                      style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                      src="../assets/img/icon/wifi_green.png"
                      v-if="item.state == 1"
                    />
                    <img
                      style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                      src="../assets/img/icon/error_yellow.png"
                      v-if="item.state == 0"
                    />
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- LED屏幕 -->
    <div class="wrapbox" ref="control" v-if="radioType == 'LED'">
      <div class="bg trans-up trans-up-delay-3">
        <div class="movieLEDSection trans-up trans-up-delay-3">
          <div class="o_title mar_t b_radius">
            <span>
              <img class="line_h middel" src="../assets/img/control_p.png" />
            </span>
            <span class="line_h">LED设备控制</span>
          </div>
          <div class="auto_margin">
            <div class="statusContainer clearfix">
              <span class="status">
                <span class="status_p item-type">状态</span>
                <span class="state">
                  <img src="../assets/img/icon/wifi_green.png" v-if="LED.state == 1" />
                  <img src="../assets/img/icon/error_yellow.png" v-if="LED.state == 0" />
                </span>
              </span>
              <span class="switch" style="margin-left: 1.92rem;">
                <span class="switch_p item-type">开关</span>
                <span class="onoff">
                  <img src="../assets/img/icon/dui_green.png" v-if="LED.onoff == 1" />
                  <img src="../assets/img/icon/cuo_gray.png" v-if="LED.onoff == 0" />
                </span>
              </span>
            </div>
            <div class="movieControl clearfix">
              <div class="item-btn">
                <span style="line-height:0.5rem" class="item-type">控制</span>
                <div style="margin-top: 0.1rem;">
                  <el-button
                    type="success"
                    size="mini"
                    class="open"
                    style="margin-left:0.27rem"
                    @click="handleLEDControl('open')"
                  >开启</el-button>
                  <el-button
                    type="warning"
                    size="mini"
                    class="down"
                    style="margin-left:0.05rem"
                    @click="handleLEDControl('down')"
                  >关闭</el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    style="margin-left:0.05rem"
                    class="rest"
                    @click="handleLEDControl('rest')"
                  >重启</el-button>
                </div>
              </div>
            </div>
            <div class="movieLEDContent">
              <!-- <div class="control-content_item clearfix">
                <span class="item-type">自动调光</span>
                <span class="item-slider" style="text-align:right;">
                  <el-switch
                    v-model="LED.autolight"
                    active-color="#72EED2"
                    @change="handleLEDSlide('autolight')"
                  ></el-switch>
                </span>
              </div> -->
              <div class="control-content_item clearfix">
                <span class="item-type">亮度</span>
                <span
                  style="margin-left: 0.1rem;width: 0.2rem;height: 0.2rem;float:right"
                >{{LED.light?LED.light:0}}</span>
                <span class="item-slider">
                  <el-slider :max="65" v-model="LED.light" @change="handleLEDSlide('light')"></el-slider>
                </span>
              </div>
              <div class="control-content_item clearfix">
                <span class="item-type">音量</span>
                <span
                  style="margin-left: 0.1rem;width: 0.2rem;height: 0.2rem;float:right"
                >{{LED.volume?LED.volume:0}}</span>
                <div class="item-slider">
                  <el-slider :max="15" v-model="LED.volume" @change="handleLEDSlide('volume')"></el-slider>
                </div>
              </div>
            </div>
            <div style="line-height:0.5rem;font-size:.15rem;">实时画面</div>
            <div class="iframe_box">
              <iframe
                frameborder="0"
                scrolling="no"
                :src="'http://223.0.8.11:11001/led_bus.html?id=' + LED.Data[0].id"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- LCD屏幕 -->
    <div class="wrapbox" ref="control" v-if="radioType == 'LCD'">
      <div class="bg trans-up trans-up-delay-3">
        <div class="movieLCDSections trans-up trans-up-delay-3">
          <div class="o_title mar_t b_radius">
            <span>
              <img class="line_h middel" src="../assets/img/control_p.png" />
            </span>
            <span class="line_h">LCD设备控制</span>
          </div>
          <div class="auto_margin">
            <div class="statusContainer clearfix">
              <span class="status">
                <span class="status_p">状态</span>
                <span class="state">
                  <img src="../assets/img/icon/wifi_green.png" v-if="LCD.state == 1" />
                  <img src="../assets/img/icon/error_yellow.png" v-if="LCD.state == 0" />
                </span>
              </span>
              <span class="switch" style="margin-left: 1.92rem;">
                <span class="switch_p">开关</span>
                <span class="onoff">
                  <img src="../assets/img/icon/dui_green.png" v-if="LCD.onoff == 1" />
                  <img src="../assets/img/icon/cuo_gray.png" v-if="LCD.onoff == 0" />
                </span>
              </span>
            </div>
            <div class="movieControl clearfix">
              <div class="item-btn">
                <span>控制</span>
                <div style="height: 0.5rem;line-height: 0.5rem;">
                  <el-button
                    type="success"
                    size="mini"
                    class="open"
                    style="margin-left:0.4rem"
                    @click="handleLCDControl('open')"
                  >开启</el-button>
                  <el-button
                    type="warning"
                    size="mini"
                    class="down"
                    style="margin-left:0.05rem"
                    @click="handleLCDControl('down')"
                  >关闭</el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    class="rest"
                    style="margin-left:0.05rem"
                    @click="handleLCDControl('rest')"
                  >重启</el-button>
                </div>
              </div>
            </div>
            <div class="movieLCDContent">
              <div class="control-content_item clearfix">
                <span class="item-type">音量</span>
                <span
                  style="margin-left: 0.1rem;width: 0.2rem;height: 0.2rem;float:right"
                >{{LCD.volume?LCD.volume:0}}</span>
                <span class="item-slider">
                  <el-slider v-model="LCD.volume" :step="10" @change="handleLCDSlide"></el-slider>
                </span>
              </div>
            </div>
            <!-- <div style="line-height:0.5rem">实时画面</div>
            <div class="iframe_box">
              <iframe
                frameborder="0"
                scrolling="no"
                :src="'http://118.190.55.119:8080/led_bus.html?id=' + this.$store.getters.getLoction"
              ></iframe>
            </div> -->
          </div>
        </div>
      </div>
    </div>

    <!-- 用电管理 -->
    <div class="wrapbox" ref="control" v-if="radioType == 'energyAdmin'">
      <div class="bg trans-up trans-up-delay-3">
        <div class="consumption trans-up trans-up-delay-3">
          <div class="o_box obox_h160">
            <div class="o_title mar_t" style="border-radius: 0.05rem 0 0 0;margin-top:-0.1rem;">
              <span>
                <img class="line_h middel" src="../assets/img/sb.png" />
              </span>
              <span class="line_h">用电能耗统计</span>
            </div>
            <div class="o_item1">
              <div class="e_box">
                <div class="e_icon e_icon0">
                  <div class="e_icon e_icon0_oc move1"></div>
                </div>
                <div class="e_text_box">
                  <p class="e_num_kwh">
                    <span class="e_num">{{energy.today}}</span>
                    <span class="e_kwh">kW‧h</span>
                  </p>
                  <p class="e_text">当前耗能</p>
                </div>
              </div>
              <div class="e_box">
                <div class="e_icon e_icon0">
                  <div class="e_icon e_icon0_oc move1"></div>
                </div>
                <div class="e_text_box">
                  <p class="e_num_kwh">
                    <span class="e_num">{{energy.lastMonth}}</span>
                    <span class="e_kwh">kW‧h</span>
                  </p>
                  <p class="e_text">上月耗能</p>
                </div>
              </div>
              <div class="e_box">
                <div class="e_icon e_icon0">
                  <div class="e_icon e_icon0_oc move1"></div>
                </div>
                <div class="e_text_box">
                  <p class="e_num_kwh">
                    <span class="e_num">{{energy.lastYear}}</span>
                    <span class="e_kwh">kW‧h</span>
                  </p>
                  <p class="e_text">本年耗能</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ligthing trans-up trans-up-delay-5">
          <!-- <div class="o_box_corner obc1"></div>
                  <div class="o_box_corner obc2"></div>
                  <div class="o_box_corner obc3"></div>
          <div class="o_box_corner obc4"></div>-->
          <!-- <div class="section-title">
                    <div class="iconfont"></div>
                    <span>用电管理</span>
          </div>-->
          <div class="o_title mar_t" style="margin-left:-0.1rem;">
            <span>
              <img class="line_h" src="../assets/img/sb.png" />
            </span>
            <span class="line_h">用电管理</span>
          </div>
          <div class="energyBtnBox">
            <span>能耗分析</span>
            <div class="energyBtn">
              <el-button
                type="warning"
                size="mini"
                class="down"
                @click="handleEnergyControl('down')"
              >断开回路</el-button>
              <el-button
                type="success"
                size="mini"
                class="open"
                @click="handleEnergyControl('open')"
              >闭合回路</el-button>
            </div>
          </div>
          <div class="energyFrom">
            <ul class="frombox">
              <li class="fromItem fromItem-title">
                <div class="checkbox">
                  <!-- <span
                                    :class="{'checked':energy.allChecked,'check':!energy.allChecked}"
                                    @click="handleEnergyAllChecked"
                  ></span>-->
                  <checked :target="'all'" :key="wuyong" />
                </div>
                <div class="locationName">位置</div>
                <span class="switch">开关</span>
                <span class="status">状态</span>
              </li>
              <li class="fromItem" v-for="item in energy.Data" :key="item.id">
                <div class="checkbox">
                  <!-- <span
                                    :class="{'checked':item.checked,'check':!item.checked}"
                                    @click="handleEnergyChecked(item.id)"
                  ></span>-->
                  <checked :target="item.id" :key="wuyong" />
                  <!-- <input type="checkbox" name @change="handleEnergyChecked(item.id)" /> -->
                </div>
                <div class="locationName">{{item.location}}</div>
                <div class="switch">
                  <span class="onoff" style="display:inline-block;">
                    <img
                      style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                      src="../assets/img/icon/dui_green.png"
                      v-if="item.switch == 1"
                    />
                    <img
                      style="width:0.2rem;height:0.2rem;vertical-align:middle;"
                      src="../assets/img/icon/cuo_gray.png"
                      v-if="item.switch == 0"
                    />
                  </span>
                  <!-- <span class="openSwitch" v-if="item.switch == 1"></span>
                  <span class="downSwitch" v-if="item.switch == 0"></span>-->
                </div>
                <div class="status">
                  <span class="state" style="display:inline-block;">
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
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import checked from "../components/checked";

export default {
  name: "siteControl",
  props: {
    radioType: String
  },
  data() {
    return {
      wuyong: 0,
      timer: "",
      Lighting: {
        allChecked: false,
        InputData: [],
        Data: []
      },
      LCD: {
        light: 0,
        volume: 0,
        state: 1,
        onoff: 1,
        Data: []
      },
      LED: {
        light: 0,
        volume: 0,
        state: 1,
        onoff: 1,
        autolight: false,
        Data: []
      },
      energy: {
        allChecked: false,
        today: 344,
        lastMonth: 342,
        lastYear: 556,
        InputData: [],
        Data: [
          {
            location: "logo照明",
            id: "1",
            status: 1,
            switch: 1,
            checked: false
          },
          {
            location: "顶棚照明",
            id: "2",
            status: 0,
            switch: 1,
            checked: false
          },
          {
            location: "站台照明",
            id: "3",
            status: 1,
            switch: 0,
            checked: false
          },
          {
            location: "LED屏",
            id: "4",
            status: 0,
            switch: 1,
            checked: false
          },
          {
            location: "LCD屏",
            id: "5",
            status: 1,
            switch: 0,
            checked: false
          }
        ]
      },
      checkedArray: []
    };
  },
  computed: {
    wsSiteData: function() {
        if(this.$store.getters.websocketData[202002]){
            return this.$store.getters.websocketData[202002];
        }
      
    }
  },
  watch: {
    wsSiteData(val){
        // let array = val.msg;
        // let siteArray = array.filter(
        //     item => item.stationid == this.$store.state.loction
        // );
        // console.log(this.radioType);
        
        // if (siteArray.length) {
        //     let site = siteArray[0].devices.filter(
        //         ele => ele.type == 1 || ele.type == 2 || ele.type == 3
        //     );
        //     var compare = function(obj1, obj2) {
        //         if (obj1.type) {
        //             var val1 = obj1.id;
        //             var val2 = obj2.id;
        //         } 
        //         if (val1 < val2) {
        //             return -1;
        //         } else if (val1 > val2) {
        //             return 1;
        //         } else {
        //             return 0;
        //         }
        //     }
            
        //     this.Lighting.Data = site.sort(compare);
            
        //     // console.log(site);
        // }
        this.changeType(this.radioType,1)
        
    }
  },
  components: {
    checked
  },
  created: function() {},
  mounted: function() {
    this.$nextTick(function() {
      this.$store.state.checkedArray = {};
      this.wuyong++;
    });
  },
  methods: {
    entry() {
      this.$refs.control.className = "wrapbox";
      this.$refs.control.className = "wrapbox is-visible";
    },
    leave() {
      this.$refs.control.className = "wrapbox";
    },
    changeType(radio,form) {
      if (radio != this.radioType) {
        this.$store.state.checkedArray = {};
      }
      if (this.wsSiteData) {
        let array = this.wsSiteData.msg;
        let siteArray = array.filter(
          item => item.stationid == this.$store.state.loction
        );
        if (radio == "lightingAdmin") {
          if (siteArray.length) {
            let site = siteArray[0].devices.filter(
              ele => ele.type == 1 || ele.type == 2 || ele.type == 3
            );
            var compare = function(obj1, obj2) {
                if (obj1.type) {
                    var val1 = obj1.id;
                    var val2 = obj2.id;
                } 
                if (val1 < val2) {
                    return -1;
                } else if (val1 > val2) {
                    return 1;
                } else {
                    return 0;
                }
            }
            this.Lighting.Data = site.sort(compare);
            // this.Lighting.Data = site;
          }
        } else if (radio == "energyAdmin") {
        } else if (radio == "LED") {
          if (siteArray.length) {
            let site = siteArray[0].devices.filter(ele => ele.type == 4);
            // console.log(site);

            this.LED.Data = site;
            this.LED.volume = site.length ? site[0].volume : 0;
            this.LED.light = site.length ? site[0].light : 0;
            this.LED.state = site.length ? site[0].state : null;
            this.LED.onoff = site.length ? site[0].onoff : null;
            this.LED.autolight = site.length && site[0].autolight == 1 ? true : false;
          }
        } else if (radio == "LCD") {
          if (siteArray.length) {
            let site = siteArray[0].devices.filter(ele => ele.type == 5);
            this.LCD.Data = site;
            // this.LCD.volume = site.length ? site[0].volume : null;
            this.LCD.light = site.length ? site[0].light : null;
            this.LCD.state = site.length ? site[0].state : null;
            this.LCD.onoff = site.length ? site[0].onoff : null;
          }
        }        
        if(!form){
          this.wuyong++;
        }
      }
    },
    handleLigthingControl(target) {
      let LightingId = [];
      for (const key in this.$store.state.checkedArray) {
        if (this.$store.state.checkedArray[key] && key != "all") {
          this.Lighting.Data.forEach(item => {
            if (item.type == 1 && item.id == key) {
              LightingId.push({ id: Number(key), lighttype: 1 });
            } else if (item.type == 2 && item.id == key) {
              LightingId.push({ id: Number(key), lighttype: 2 });
            } else if (item.type == 3 && item.id == key) {
              LightingId.push({ id: Number(key), lighttype: 3 });
            }
          });
        }
      }
      let params;
      if (!LightingId.length) {
        this.$Message.closeAll();
        this.$Message.error("请先选择站点");
      } else {
        if (target == "open") {
          params = {
            msgid: "550e8400-e29b-41d4-a716-446655440000",
            modulecode: 1003,
            msgtype: 0, //消息类型：0-命令
            msgcode: 200001,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 1, //命令类型：1-开灯；2-关灯；
              lightsarr: LightingId
            }
          };
        } else if (target == "down") {
          params = {
            msgid: "550e8400-e29b-41d4-a716-446655440000",
            modulecode: 1003,
            msgtype: 0, //消息类型：0-命令
            msgcode: 200001,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 2, //命令类型：1-开灯；2-关灯；
              lightsarr: LightingId
            }
          };
        }
        this.getControlAPI(params);
      }
    },

    handleLEDControl(target) {
      if (!this.LED.Data.length) {
        this.$Message.closeAll();
        this.$Message.error("暂无数据");
      } else {
        let params;
        if (target == "open") {
          params = {
            msgid: "550e8400-e29b-41d4-a716-446655440000",
            modulecode: 1005,
            msgtype: 0,
            msgcode: 10002,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 1, //命令类型：1-开启；2-关闭；3-重启；4-调光；5-音量
              light: this.LED.light,
              volume: this.LED.volume,
              leds: [Number(this.LED.Data[0].id)]
            }
          };
        } else if (target == "down") {
          params = {
            msgid: "550e8400-e29b-41d4-a716-446655440000",
            modulecode: 1005,
            msgtype: 0,
            msgcode: 10002,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 2, //命令类型：1-开启；2-关闭；3-重启；4-调光；5-音量
              light: this.LED.light,
              volume: this.LED.volume,
              leds: [Number(this.LED.Data[0].id)]
            }
          };
        } else if (target == "rest") {
          params = {
            msgid: "550e8400-e29b-41d4-a716-446655440000",
            modulecode: 1005,
            msgtype: 0,
            msgcode: 10002,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 3, //命令类型：1-开启；2-关闭；3-重启；4-调光；5-音量
              light: this.LED.light,
              volume: this.LED.volume,
              leds: [Number(this.LED.Data[0].id)]
            }
          };
        }
        this.getControlAPI(params);
      }
    },
    // LED亮度、音量滑动
    handleLEDSlide(flag) {
      if (!this.LED.Data.length) {
        this.$Message.closeAll();
        this.$Message.error("暂无数据");
      } else {
        let params;
        if (flag == "light") {
          params = {
            msgid: "550e8400-e29b-41d4-a716-446655440000",
            modulecode: 1005,
            msgtype: 0,
            msgcode: 200001,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 4, //命令类型：1-开启；2-关闭；3-重启；4-调光；5-音量
              light: this.LED.light,
              volume: this.LED.volume,
              // autolight: this.LED.autolight ? 1 : 0,
              leds: [Number(this.LED.Data[0].id)]
            }
          };
        } else if (flag == "volume") {
          params = {
            msgid: "550e8400-e29b-41d4-a716-446655440000",
            modulecode: 1005,
            msgtype: 0,
            msgcode: 200001,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 5, //命令类型：1-开启；2-关闭；3-重启；4-调光；5-音量
              light: this.LED.light,
              volume: this.LED.volume,
              // autolight: this.LED.autolight ? 1 : 0,
              leds: [Number(this.LED.Data[0].id)]
            }
          };
        } else if (flag == "autolight") {
          params = {
            msgid: "550e8400-e29b-41d4-a716-446655440000",
            modulecode: 1005,
            msgtype: 0,
            msgcode: 200001,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 6, //命令类型：1-开启；2-关闭；3-重启；4-调光；5-音量
              light: this.LED.light,
              volume: this.LED.volume,
              // autolight: this.LED.autolight ? 1 : 0,
              leds: [Number(this.LED.Data[0].id)]
            }
          };
        }

        this.getControlAPI(params);
      }
    },

    handleLCDControl(target) {
      if (!this.LCD.Data.length) {
        this.$Message.closeAll();
        this.$Message.error("暂无数据");
      } else {
        let params;
        if (target == "open") {
          params = {
            msgid: "550e8400-e29b-41d4-a716-446655440000",
            modulecode: 1004,
            msgtype: 0,
            msgcode: 10002,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 1, //命令类型：1-开启；2-关闭；3-重启；4-调光；5-音量
              light: this.LCD.light,
              volume: this.LCD.volume,
              lcds: [Number(this.LCD.Data[0].id)]
            }
          };
        } else if (target == "down") {
          params = {
            msgid: "550e8400-e29b-41d4-a716-446655440000",
            modulecode: 1004,
            msgtype: 0,
            msgcode: 10002,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 2, //命令类型：1-开启；2-关闭；3-重启；4-调光；5-音量
              light: this.LCD.light,
              volume: this.LCD.volume,
              lcds: [Number(this.LCD.Data[0].id)]
            }
          };
        } else if (target == "rest") {
          params = {
            msgid: "550e8400-e29b-41d4-a716-446655440000",
            modulecode: 1004,
            msgtype: 0,
            msgcode: 10002,
            timestamp: this.$getCurrentDate(),
            msg: {
              cmdtype: 3, //命令类型：1-开启；2-关闭；3-重启；4-调光；5-音量
              light: this.LCD.light,
              volume: this.LCD.volume,
              lcds: [Number(this.LCD.Data[0].id)]
            }
          };
        }
        this.getControlAPI(params);
      }
    },
    // LCD音量滑动
    handleLCDSlide() {
      if (!this.LCD.Data.length) {
        this.$Message.closeAll();
        this.$Message.error("暂无数据");
      } else {
        // console.log(this.LCD.Data);
        let params = {
          msgid: "550e8400-e29b-41d4-a716-446655440000",
          modulecode: 1004,
          msgtype: 0,
          msgcode: 200001,
          timestamp: this.$getCurrentDate(),
          msg: {
            cmdtype: 5, //命令类型：1-开启；2-关闭；3-重启；4-调光；5-音量
            // light: this.LCD.light,
            volume: this.LCD.volume,
            lcds: [Number(this.LCD.Data[0].id)]
          }
        };
        this.getControlAPI(params);
      }
    },

    handleEnergyControl(target) {
      this.energy.allChecked = false;
      let InputData = this.energy.Data.filter(ele => ele.checked);
      if (!InputData.length) {
        this.$Message.closeAll();
        this.$Message.error("暂无数据");
      } else if (target == "open") {
        InputData.forEach(item => {
          item.status = 1;
          item.checked = false;
        });
      } else if (target == "down") {
        InputData.forEach(item => {
          item.status = 0;
          item.checked = false;
        });
      }
    },

    // 发送请求
    getControlAPI(data) {
      this.$api.post("/websocket/command", data).then(function(res) {
        console.log(res);
      });
    },
    // 处理单选框数据更新和勾选的问题
    changeChecked(oldData, newData, isLen) {
      var oldNum = 0;
      var newNum = 0;
      if (isLen && oldData.length > 0) {
        for (var i = 0; i < oldData.length; i++) {
          oldNum = 0;
          for (var s = 0; s < newData.length; s++) {
            if (oldData[i].type == newData[s].type) {
              oldData[i] = newData[s]; //找到推送数据和已有数据相同ID项进行替换
            } else {
              oldNum++;
              if (oldNum == newData.length) {
                //旧数据中的某一条不存在在新数据中，此条数据被删除
                oldData.splice(i, 1);
                this.checkedArray.splice(i, 1);
              }
            }
          }
        }
        for (var s = 0; s < newData.length; s++) {
          newNum = 0;
          for (var i = 0; i < oldData.length; i++) {
            if (newData[s].type != oldData[i].type) {
              newNum++;
              if (newNum == oldData.length) {
                //新推送的数据中的某一条是旧数据中不存在的，push进data中
                oldData.push(newData[s]);
                this.checkedArray.push({
                  type: newData[s].type,
                  checked: false,
                  id: item.id
                });
              }
            }
          }
        }
      }
      return oldData.length > 0 ? oldData : [];
    }
  }
};
</script>

<style lang="scss" scoped>
.item-type {
  font-size: 0.16rem;
}
.b_radius {
  border-radius: 0.05rem 0 0 0;
  margin-top: -0.1rem;
  margin-left: -0.1rem;
}
.middel {
  vertical-align: middle;
}
.o_title {
  height: 0.4rem;
  line-height: 0.4rem;
  position: relative;
  padding: 0 0.1rem;
  width: 2.6rem;
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

// 弹窗背景区域
.bgContent {
  position: relative;
  width: 4.8rem;
  height: 87vh;
  padding: 0.1rem;
  color: #fff;
  padding: 0.1rem;
  // background-color: rgba(1, 30, 38, 0.8);
  border-radius: 0.04rem;
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

// 抬头样式（传递图片路径）
@mixin title($path) {
  position: relative;
  margin: 0 0 0.1rem 0.28rem;
  padding-left: 0.1rem;
  width: 2.6rem;
  border-bottom: #1ff7f2 solid 0.01rem;
  font-size: 0.16rem;
  line-height: 0.24rem;
  .iconfont {
    position: absolute;
    left: -0.28rem;
    bottom: -0.01rem;
    width: 0.3rem;
    height: 0.18rem;
    // background: url("../assets/img/control/icon.png") no-repeat center/cover;
    background: url($path) no-repeat center/cover;
  }
}

// 表单
.frombox {
  .fromItem-title {
    background-color: rgba(0, 204, 204, 0.23921568627451);
  }

  .fromItem {
    overflow: hidden;
    height: 0.4rem;
    line-height: 0.4rem;

    &:hover {
      background-color: #00ffff42;
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

    .locationName {
      float: left;
      width: 40%;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
  }
}

.movieSection {
  @extend .bgContent;

  .movieTitle {
    @include title("../assets/img/control/icon.png");
  }

  .movieControl {
    margin: 0.15rem 0;

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

  .movieFrom {
    margin-top: 0.1rem;
    height: 6.9rem;

    .frombox {
      @extend .frombox;
    }
  }
}

.movieLEDSection {
  @extend .bgContent;

  .movieTitle {
    @include title("../assets/img/control/LcdIcon.png");

    .iconfont {
      bottom: -0.02rem;
      height: 0.19rem;
    }
  }

  .statusContainer {
    .status {
      float: right;
      .openLigthing {
        width: 0.15rem;
        margin-left: 0.2rem;
        height: 0.4rem;
        line-height: 0.4rem;
        margin-top: 0.1rem;
        background: url("../assets/img/control/correct.png") no-repeat
          center/cover;
      }

      .downLigthing {
        margin-top: 0.1rem;
        margin-left: 0.2rem;
        height: 0.4rem;
        line-height: 0.4rem;
        width: 0.16rem;
        height: 0.16rem;
        background: url("../assets/img/control/error.png") no-repeat
          center/cover;
      }
    }

    .switch {
      float: left;

      .openSwitch {
        line-height: 0.5rem;
        margin-top: 0.1rem;
        margin-left: 0.2rem;
        width: 0.18rem;
        height: 0.18rem;
        background: url("../assets/img/control/lightOpen.png") no-repeat
          center/cover;
      }

      .downSwitch {
        line-height: 0.5rem;
        margin-top: 0.1rem;
        margin-left: 0.2rem;
        width: 0.18rem;
        height: 0.18rem;
        background: url("../assets/img/control/lightDown.png") no-repeat
          center/cover;
      }
    }
  }

  .movieControl {
    .item-btn {
      height: 0.5rem;
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
  }

  .movieLEDContent {
    .control-content_item {
      line-height: 0.42rem;

      .item-type {
        display: inline-block;
        font-size: 0.16rem;
      }

      .item-slider {
        width: 1.9rem;
        // display: inline-block;
        float: right;
      }
    }
  }

  .movieLEDImg {
    margin-top: 0.1rem;
    height: 0.5rem;
    line-height: 0.5rem;
    padding-left: 0.1rem;
    font-size: 0.15rem;
    width: 94%;
    letter-spacing: 0.05rem;
    background: rgba(54, 153, 255, 1);
    border: 1px solid rgba(0, 255, 252, 1);
  }
}

.movieLCDSections {
  @extend .bgContent;

  .movieTitle {
    @include title("../assets/img/control/LcdIcon.png");

    .iconfont {
      bottom: -0.02rem;
      height: 0.19rem;
    }
  }

  .statusContainer {
    .status {
      float: right;
      .openLigthing {
        width: 0.15rem;
        margin-left: 0.2rem;

        height: 0.4rem;
        line-height: 0.4rem;
        margin-top: 0.1rem;
        background: url("../assets/img/control/correct.png") no-repeat
          center/cover;
      }

      .downLigthing {
        margin-left: 0.2rem;
        width: 0.16rem;
        height: 0.4rem;
        line-height: 0.4rem;
        line-height: 0.36rem;
        background: url("../assets/img/control/error.png") no-repeat
          center/cover;
      }
    }

    .switch {
      float: left;

      .openSwitch {
        margin-left: 0.2rem;
        height: 0.36rem;
        line-height: 0.36rem;

        width: 0.18rem;
        height: 0.18rem;
        background: url("../assets/img/control/lightOpen.png") no-repeat
          center/cover;
      }

      .downSwitch {
        margin-top: 0.1rem;
        margin-left: 0.2rem;
        width: 0.18rem;
        height: 0.18rem;
        line-height: 0.5rem;
        background: url("../assets/img/control/lightDown.png") no-repeat
          center/cover;
      }
    }
  }

  .movieControl {
    height: 0.5rem;
    line-height: 0.5rem;

    .item-btn {
      height: 0.36rem;
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
  }

  .movieLCDContent {
    .control-content_item {
      line-height: 0.4rem;

      .item-type {
        display: inline-block;
        font-size: 0.16rem;
      }

      .item-slider {
        width: 1.9rem;
        // display: inline-block;
        float: right;
        // margin-right: 1rem;
      }
    }
  }

  .movieLCDImg {
    padding: 0.1rem;
    height: 2rem;
    background: white;

    img {
      width: 100%;
      height: 2rem;
    }
  }
}

.consumption {
  .obox_h160 {
    @extend .bgContent;
    padding: 0.1rem 0;
    height: 1.6rem;

    .titleBox {
      padding: 0 0.1rem;

      .o_title {
        @include title("../assets/img/item1.png");
      }
    }

    .o_item1 {
      margin-top: 0.3rem;

      .e_box {
        margin-left: 0.1rem;
        width: 1.5rem;
        height: 0.52rem;
        float: left;

        .e_icon {
          width: 0.52rem;
          height: 0.52rem;
          float: left;
        }

        .e_icon0 {
          background: url("../assets/img/citem0.png") no-repeat center/cover;

          .e_icon0_oc {
            background: url("../assets/img/citem0_oc.png") no-repeat
              center/contain;
          }
        }

        .e_text_box {
          float: left;
          margin-left: 0.08rem;
          width: 0.76rem;
          height: 0.52rem;

          .e_num_kwh {
            display: block;
            height: 0.23rem;
            line-height: 0.23rem;
            font-size: 0.23rem;

            .e_num {
              float: left;
              width: 0.3rem;
              color: #8cf9cd;
              font-size: 0.16rem;
              font-weight: 700;
              text-align: center;
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
            background: -webkit-gradient(
              linear,
              left top,
              left bottom,
              from(transparent),
              to(rgba(77, 173, 183, 0.8))
            );
            background: -webkit-linear-gradient(
              transparent,
              rgba(77, 173, 183, 0.8)
            );
            background: -o-linear-gradient(
              transparent,
              rgba(77, 173, 183, 0.8)
            );
            background: linear-gradient(transparent, rgba(77, 173, 183, 0.8));
            font-size: 0.12rem;
            line-height: 0.29rem;
            text-align: center;
          }
        }
      }
    }
  }
}

.ligthing {
  margin-top: 0.1rem;
  @extend .bgContent;
  height: 70vh;

  .section-title {
    @include title("../assets/img/control/electroIcon.png");
  }

  .energyBtnBox {
    overflow: hidden;
    height: 0.8rem;
    line-height: 0.8rem;
    color: #fff;

    span {
      float: left;
      margin-left: 0.2rem;
    }

    .energyBtn {
      float: right;
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
      @extend .frombox;
    }
  }
}
.line_h {
  font-size: 0.16rem;
}
.conline {
  line-height: 0.4rem;
}
</style>
