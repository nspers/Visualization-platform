<template>
  <div class="monitor" ref="monitor">
    <div class="monitor-main trans-left trans-left-delay-5">
      <div class="monitor-bar">
        <div class="sbarBox-main">
          <div class="sbarBox">
            <span class="active" :class="isSbar == 1 ? 'right':''"></span>
            <span class="sbar" @click="alarm(0)">告警管理</span>
            <span class="sbar" @click="alarm(1)">事件管理</span>
          </div>
        </div>
      </div>
      <div class="monitor-t">
        <div class="monitor-t-left" style="width:100%">
          <div class="content">
            <el-form ref="form" :model="sizeForm" label-width="0.9rem" size="mini" class="y-form">
              <!-- <el-form-item label="事件切换">
                <el-select
                  v-model="sizeForm.event"
                  placeholder="请选择"
                  :popper-append-to-body="false"
                >
                  <el-option label="告警管理" value="2"></el-option>
                  <el-option label="事件管理" value="4"></el-option>
                </el-select>
              </el-form-item>-->
              <el-form-item :label="isSbar == 0 ? '告警时间' : '事件时间'">
                <el-date-picker
                  :clearable="false"
                  type="date"
                  placeholder="开始时间"
                  v-model="startTime"
                  style="width: 100%;"
                  :picker-options="startTimeOption"
                ></el-date-picker>
                <span class="y-form-heng"></span>
                <el-date-picker
                  :clearable="false"
                  type="date"
                  placeholder="结束时间"
                  v-model="endTime"
                  style="width: 100%;"
                  :picker-options="endTimeOption"
                ></el-date-picker>
              </el-form-item>
              <el-form-item v-if="!isSbar" label="告警设备" style="margin-left:0.5rem">
                <el-select
                  v-model="sizeForm.deviceType"
                  placeholder="请选择"
                  :popper-append-to-body="false"
                >
                  <el-option label="LED" :value="2"></el-option>
                  <el-option label="LCD" :value="3"></el-option>
                  <el-option label="集中控制器" :value="4"></el-option>
                  <el-option label="顶棚照明" :value="5"></el-option>
                  <el-option label="灯箱照明" :value="6"></el-option>
                  <el-option label="电表" :value="7"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="isSbar" label="事件设备" style="margin-left:0.5rem">
                <el-select
                  v-model="sizeForm.deviceType"
                  placeholder="请选择"
                  :popper-append-to-body="false"
                >
                  <el-option label="LED" :value="2"></el-option>
                  <el-option label="LCD" :value="3"></el-option>
                  <el-option label="集中控制器" :value="4"></el-option>
                  <el-option label="顶棚照明" :value="5"></el-option>
                  <el-option label="灯箱照明" :value="6"></el-option>
                  <el-option label="电表" :value="7"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                v-if="!isSbar"
                :label="isSbar == 0 ? '告警类型' : '事件类型'"
                style="margin-left:0.5rem"
              >
                <el-select
                  v-model="sizeForm.type"
                  placeholder="请选择"
                  :popper-append-to-body="false"
                  style="widht:100%"
                >
                  <el-option label="离线报警" :value="201"></el-option>
                  <el-option label="在线报警" :value="202"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                v-if="isSbar"
                :label="isSbar == 0 ? '告警类型' : '事件类型'"
                style="margin-left:0.5rem"
              >
                <el-select
                  v-model="sizeForm.type"
                  placeholder="请选择"
                  :popper-append-to-body="false"
                  style="widht:100%"
                >
                  <el-option label="开" :value="101"></el-option>
                  <el-option label="关" :value="102"></el-option>
                  <el-option label="在线" :value="103"></el-option>
                  <el-option label="离线" :value="104"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="设备名称" style="margin-left:0.5rem">
                <!-- <div
                  style="width:0.8rem;margin-left: -0.6rem;"
                  class="y-form-btn"
                  @click="searchTable_s"
                >搜索</div>-->
                <div class="el-input" style="height:0.35rem">
                  <input
                    v-model="sizeForm.deviceName"
                    type="text"
                    style="height:100%;outline: none;color:#fff;padding-left:0.2rem"
                  />
                </div>
              </el-form-item>
              <el-form-item label>
                <div
                  style="width:0.8rem;margin-left: -0.6rem;"
                  class="y-form-btn"
                  @click="searchTable_s"
                >搜索</div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="monitor-b">
        <div class="table-bg-t"></div>
        <div class="table-bg-c">
          <table class="alarm_section_table" cellspacing="0">
            <!-- <colgroup>
              <col width="327" />
              <col width="327" />
              <col width="327" />
              <col width="327" />
              <col width="327" />
              <col width="327" />
            </colgroup>-->
            <thead>
              <tr>
                <th>序号</th>
                <th>设备名称</th>
                <th>设备DID</th>
                <th>报警类型</th>
                <th>报警时间</th>
                <th v-if="showProcess">处理状态</th>
                <th v-if="showProcess">处理人</th>
              </tr>
            </thead>
            <tbody v-show="tabelData.length>0">
              <tr v-for="(item,index) in tabelData" :key="index">
                <td>{{index+1}}</td>
                <td>{{item.deviceName}}</td>
                <td>{{item.did}}</td>
                <td>{{item.typeStr}}</td>
                <td>{{item.createtime}}</td>
                <td v-if="showProcess">
                  <el-button
                    :type="item.delstatus==1?'warning':'success'"
                    size="mini"
                    @click="showalarm(item)"
                  >{{item.delstatus==1?'未处理':'已处理'}}</el-button>
                </td>
                <td v-if="showProcess">{{item.delperson}}</td>
              </tr>
            </tbody>
            <tbody v-show="tabelData.length==0">
              <tr>
                <td v-show="!loadingShow" colspan="7">暂无数据</td>
                <td v-show="loadingShow" colspan="7" style="position:relative" class="y-loading">
                  <div class="el-loading-spinner">
                    <i class="el-icon-loading"></i>
                    <p class="el-loading-text">加载中</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table-bg-b">
          <div class="y-page">
            <div class="totalalarm" v-if="showProcess">
              <span>总数：{{total}}</span>
              <span>未处理：{{nohandle}}</span>
              <span>已处理：{{handle}}</span>
            </div>
            <div class="y-page-btn" @click="changePage(-1)">上一页</div>
            <el-pagination
              background
              :total="total"
              :page-size="limit"
              :page-sizes="pagesizes"
              :current-page="cuurrentPage"
              layout=" pager "
              @current-change="currentChange"
              @size-change="sizeChange"
            />
            <div class="y-page-number">第{{cuurrentPage}}页/共{{total | formatTotal}}页</div>
            <div class="y-page-btn" @click="changePage(+1)">下一页</div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="showalarmKG" width="30%">
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
          <el-select disabled v-model="value" placeholder="请选择">
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
            <el-input disabled type="textarea" :rows="3" placeholder="请输入内容" v-model="textarea"></el-input>
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
          v-if="false && showalarmData.delstatus == 1"
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
  name: "App",
  filters: {
    formatTotal(total) {
      return Math.ceil(total / 10);
    }
  },
  computed: {
    showProcess() {
      // 集中控制器,电表不显示处理信息
      return this.isSbar == 0 && ![7, 4].includes(this.sizeForm.deviceType);
    }
  },
  watch: {
    "sizeForm.deviceType"(val) {
      //   let obj = Object.assign({}, this.sizeForm);
      //   obj.pageNumber = this.cuurrentPage;
      //   obj.startTime = this.formatDate(new Date()) + " 00:00:00";
      //   obj.endTime = this.formatDate(new Date()) + " 23:59:59";
      //   this.$api
      //     .post("http://118.190.216.41:9201/warning/findWarningAlarm", obj)
      //     .then(res => {
      //       if (res.rows) {
      //         this.waringCount = res.total;
      //       }
      //     });
    },
    startTime(val) {
      let d = new Date(val);
      this.endTimeOption.disabledDate = time => {
        return time.getTime() > Date.now() || time.getTime() < d.getTime();
      };
    },
    endTime(val) {
      let d = new Date(val);
      this.startTimeOption.disabledDate = time => {
        return time.getTime() > d.getTime();
      };
    }
  },
  data() {
    return {
      textarea: "",
      options: [],
      value: "",
      showalarmData: [],
      showalarmKG: false,
      searchBaseUrl: "findWarningAlarm",
      isSbar: 0,
      loadingShow: false,
      waringCount: 0,
      total: 0,
      nohandle: 0,
      handle: 0,
      startTime: null,
      endTime: null,
      sizeForm: {
        startTime: null,
        endTime: null,
        deviceType: null,
        type: null,
        pageNumber: 1,
        did: ""
      },
      detailList: [
        {
          time: "2019-6-10  12:23:23",
          content:
            "王小虎 提交于王小虎 提交于王小虎 提交于王小虎 提交于 2018/4/12 20:46",
          status: 0
        },
        {
          time: "2019-6-11  13:23:23",
          content: "王小虎 提交于王小虎",
          status: 1
        }
      ],
      showSeeModal: false,
      show: false,
      show1: true,
      Devic: 0,
      states: 0,
      limit: 10,
      cuurrentPage: 1,
      page: 1,
      pagesizes: [8],
      flsa: false,
      value1: "",
      value2: "",
      tabelData: [],
      Devicegroup: [
        {
          name: "全部"
        },
        {
          name: "集中控制器"
        },
        {
          name: "LED屏"
        },
        {
          name: "LCD屏"
        }
      ],
      Bystate: [
        {
          name: "已处理"
        },
        {
          name: "未处理"
        }
      ],
      startTimeOption: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      endTimeOption: {
        disabledDate(time) {
          return (
            time.getTime() > Date.now() ||
            time.getTime() < Date.now() - 86400000
          );
        }
      }
    };
  },
  created() {
    this.startTime = this.formatDate(new Date()) + " 00:00:00";
    this.endTime = this.formatDate(new Date()) + " 23:59:59";
    this.sizeForm.deviceType = "2";
    this.sizeForm.type = 201;
    this.sizeForm.did = "";
    var self = this;
    false &&
      this.$api
        .get("http://192.168.7.50:9100/getDurationPlayUser", {})
        .then(function(res) {
          self.options = res;
        });
  },
  mounted() {
    this.$nextTick(function() {
      this.$refs.monitor.className = "";
      this.$refs.monitor.className = "monitor subMain is-visible";
      this.searchTable(true);
    });
  },
  methods: {
    alarm(target) {
      if (target == 0) {
        this.isSbar = 0;
        this.sizeForm.event = 2;
        this.sizeForm.type = 201;
        this.searchBaseUrl = "findWarningAlarm";
      } else if (target == 1) {
        this.isSbar = 1;
        this.sizeForm.event = 4;
        this.sizeForm.type = 101;
        this.searchBaseUrl = "warningEvents";
      }
      this.sizeForm.deviceType = "2";
      this.cuurrentPage = 1;
      this.searchTable();
    },
    showalarm(data) {
      var self = this,
        type = 1;
      // 4 led,  5 lcd
      if (self.sizeForm.deviceType <= 3) {
        type += 3;
      }
      this.$api
        .post("/tdel/getTdelMessgae", {
          type,
          msgid: data.msgid
        })
        .then(function(res) {
          self.showalarmData = res.result.result;
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
    formatType(name) {
      if (name || name != "") {
        switch (name) {
          case 201:
            return "离线报警";
            break;
          case 202:
            return "在线报警";
            break;
          case 101:
            return "开";
            break;
          case 102:
            return "关";
            break;
          case 103:
            return "在线";
            break;
          case 104:
            return "离线";
            break;
          default:
            return name;
            break;
        }
      }
    },
    formatDate(date) {
      let d = new Date(date);
      let year = d.getFullYear();
      let month = ("0" + (d.getMonth() + 1)).slice(-2);
      let day = ("0" + d.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    },
    searchTable() {
      var self = this;
      this.tabelData = [];
      this.loadingShow = true;
      this.sizeForm.pageNumber = this.cuurrentPage;
      this.sizeForm.startTime = this.formatDate(this.startTime) + " 00:00:00";
      this.sizeForm.endTime = this.formatDate(this.endTime) + " 23:59:59";
      this.sizeForm.deviceType = parseInt(this.sizeForm.deviceType);
      this.sizeForm.type = parseInt(this.sizeForm.type);
      this.sizeForm.did =
        this.sizeForm.did != "" && this.sizeForm.did != null
          ? this.sizeForm.did
          : "";
      this.$api
        .post("warning/" + this.searchBaseUrl, this.sizeForm)
        .then(res => {
          if (res.result && res.result.rows) {
            self.tabelData = res.result.rows.map(item => {
              item.typeStr = self.formatType(item.type);
              return item;
            });
            self.total = res.result.total;
            self.nohandle = res.result.nohandle;
            self.handle = res.result.handle;
          }

          self.loadingShow = false;
        });
    },
    searchTable_s() {
      this.cuurrentPage = 1;
      this.searchTable();
    },
    changePage(num) {
      if (
        (num == -1 && this.cuurrentPage > 1) ||
        (num == 1 && this.total / this.limit > this.cuurrentPage)
      ) {
        this.cuurrentPage += num;
        this.searchTable();
      }
    },
    colorFormat(status) {
      if (status === 0) return "#66cc66"; //绿
      if (status === 1) return "#ff0000"; //红
      if (status === 2) return "#ff9966"; //黄
      return "#909399"; //灰
    },
    handleSee(item) {
      this.showSeeModal = true;
    },
    //自定义
    customize() {
      this.show1 = !this.show1;
    },
    //选择时间
    heddeAlear() {
    },

    //设备组
    DevicegroupEvent(ind) {
      this.Devic = ind;
    },

    //按状态
    BystateEvnet(itn) {
      this.states = itn;
    },

    //已处理事件
    tdOneSpanClcikEvnet(item) {
      this.show = !this.show;
    },

    //提交事件
    btoSclick() {
      this.show = !this.show;
    },

    //分页1
    currentChange(val) {
      this.cuurrentPage = val;
      this.searchTable();
    },
    //分页2
    sizeChange(val) {
      this.limit = val;
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$refs.monitor.className = "monitor subMain";
    setTimeout(() => {
      next();
    }, 700);
  }
};
</script>

<style lang="scss" scoped>
@mixin flex($direction: row, $justify: space-between, $alingn: center) {
  display: flex;
  align-items: $alingn;
  justify-content: $justify;
  flex-direction: $direction;
}
@mixin center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@mixin after-t($img) {
  content: "";
  position: absolute;
  top: -0.26rem;
  left: 0;
  width: 100%;
  height: 0.26rem;
  background-size: 100% 100%;
  background-image: url($img);
  background-repeat: no-repeat;
  z-index: -1;
}
@mixin after-b($img) {
  content: "";
  position: absolute;
  bottom: -0.26rem;
  left: 0;
  width: 100%;
  height: 0.26rem;
  background-size: 100% 100%;
  background-image: url($img);
  background-repeat: no-repeat;
  z-index: -1;
}
@mixin bgs($img) {
  background-image: url($img);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.totalalarm {
  color: #fff;
  flex: auto;
}
.totalalarm span {
  margin: 0 0.1rem 0 0;
}
.el-dialog p {
  line-height: 0.5rem;
  padding: 0 0.5rem;
  font-size: 0.16rem;
}
.el-dialog p i {
  width: 0.2rem;
  display: inline-block;
}
.el-dialog p span {
  display: block;
  color: #ccc;
}
.monitor {
  width: 100%;
  position: absolute;
  top: 1.1rem;
  padding: 0 0.2rem;
  z-index: 1;
  font-size: 0.18rem;
}
.monitor-main {
  height: calc(100vh - 1.3rem);
  width: 98%;
  @include bgs("../assets/img/alarm/bg.png");
}

.monitor-bar {
  margin: 0 0.5rem;
  height: 1rem;
  border-bottom: 0.01rem solid #0adfd9;
  @include flex(row, center, center);
  .sbarBox-main {
    margin: 0 auto;
    width: 2.78rem;
    height: 0.48rem;
    @include bgs("../assets/img/alarm/bar.png");
    .sbarBox {
      line-height: 0.48rem;
      font-size: 0.16rem;
      position: relative;
      .sbar {
        display: inline-block;
        color: #00fff9;
        width: 49%;
        cursor: pointer;
        text-align: center;
      }
      .active {
        position: absolute;
        transition: all 0.2s ease;
        width: 1.51rem;
        height: 0.48rem;
        @include bgs("../assets/img/alarm/hover.png");
      }
      .right {
        transform: translateX(85%);
      }
    }
  }
}
.monitor-t {
  padding: 0.2rem 0.5rem;
  position: relative;
  z-index: 99999999999999;
  @include flex();
}
.monitor-b {
  @include flex(column);
  position: relative;
  // margin-top: -0.19rem;
  height: calc(100vh - 3.1rem);

  .table-bg-t {
    width: 100%;
    position: relative;
    height: 0.5rem;
    background: linear-gradient(
      to,
      right,
      rgba(18, 68, 69, 1) 0%,
      rgba(18, 68, 69, 0.3) 100%
    );
  }
  .table-bg-c {
    position: relative;
    flex: 1;
    width: 100%;
  }
  .table-bg-b {
    position: relative;
    height: 0.5rem;
    width: 100%;
    // background: url(~@/assets/img/monitor/monitor_bottom.png) 0 0 repeat-y;
    background-size: 100% 100%;
    .y-page {
      position: absolute;
      bottom: 0.2rem;
      padding: 0 0.8rem;
    }
  }
}

.alarm_section_table {
  position: absolute;
  top: -0.5rem;
  font-size: 0.16rem;
  width: 100%;
  color: #fff;
  padding: 0 0.4rem;
  // background: rgba(42, 106, 120, 0.7);
  // border-bottom: 1px solid #0ea9ac;

  thead {
    width: 100%;
    tr {
      height: 0.5rem;
      font-size: 0.16rem;
      // width: 100%;
      // background: url(~@/assets/img/monitor_th_bg.png) 0 0 no-repeat;
      // background-size: 100% 100%;
    }
  }
  tbody {
    width: 100%;
    height: 100%;
    tr {
      transition: all 0.3s linear;
      // &:nth-child(even):hover{
      //       background: rgba(204, 204, 204, 0.3)
      // }
      // &:nth-child(odd):hover{
      //       background: rgba(0, 0, 0, 0.3)
      // }
      &:nth-child(even) {
        // background: #054243;
      }
      &:nth-child(odd) {
        // background: rgba(0, 0, 0, 0.3)
      }
      .urgent {
        position: relative;
        i {
          position: absolute;
          top: 50%;
          left: 30%;
          transform: translate(-50%, -30%);
          margin-right: 10px;
          display: block;
          width: 10px;
          height: 10px;
          background-color: #ff0000;
          border-radius: 50%;
        }
      }
      .carryout {
        position: relative;
        i {
          position: absolute;
          top: 50%;
          left: 30%;
          transform: translate(-50%, -30%);
          margin-right: 10px;
          display: block;
          width: 10px;
          height: 10px;
          background-color: #66cc66;
          border-radius: 50%;
        }
      }
      td {
        width: calc(100% / 7);
        height: calc((100vh - 4.4rem) / 10);
        text-align: center;
        font-size: 0.16rem;
        vertical-align: middle;
        border-bottom: 1px solid rgba(86, 171, 206, 0.4);
        span {
          cursor: pointer;
          display: inline-block;
          width: 50px;
          font-size: 12px;
          height: 22px;
          background-color: #ff0000;
          /* padding: 5px 10px; */
          line-height: 22px;
        }
        .activeSpan {
          background-color: #66cc66;
        }
      }
    }
  }
}

.y-form {
  position: relative;
  height: 100%;
  width: 100%;
}
.numbersb {
  width: 1.7rem;
  font-size: 0.16rem;
  padding-left: 0.05rem;
  height: 0.34rem;
  color: #fff;
  background: url(~@/assets/img/monitor/btn_large.png) 0 0 no-repeat;
  background-size: 100% 100%;
}
</style>


