<template>
  <div class="single_site subMain">
    <div class="single_site subMain">
      <div class="r_btn_box">
        <div class="r_btn_item" @click="backToSite()">
          <div class="r_btn r_car"></div>
          <span>站台概览</span>
        </div>
      </div>
      <div class="controlBtn rOut" ref="cbBox">
        <div class="text_c">{{this.$store.state.nowSiteName}}</div>
        <el-radio-group
          v-model="radio"
          @change="handleType"
          style="margin:0.2rem 0.2rem 0rem 0.4rem;"
        >
          <el-radio :label="'overview'">概览</el-radio>
          <el-radio :label="'lightingAdmin'">照明</el-radio>
          <el-radio :label="'LED'">LED屏</el-radio>
          
          <el-radio :label="'LCD'" v-if="lcd">LCD屏</el-radio>
          <!-- <el-radio :label="'energyAdmin'">用电管理</el-radio> -->
        </el-radio-group>
      </div>
      <Control ref="control" :radioType="radioType" />
      <Overview ref="overview" />
    </div>
  </div>
</template>
<script>
import Control from "./site_control";
import Overview from "./site_overview";

export default {
  name: "singleSite",
  data() {
    return {
      nowTab: "ov",
      radio: "overview",
      radioType: "blank",
      flag: true,
      loctionName: "",
      id:'',
      lcd:false
    };
  },
  components: {
    Control,
    Overview
  },
  computed: {
    loctionId() {
      return this.$store.state.loction;
    },
    haveLcd() {
        if(this.$store.getters.websocketData[202002]){
            for (let index = 0; index < this.$store.getters.websocketData[202002].msg.length; index++) {
                if(this.$store.state.loction == this.$store.getters.websocketData[202002].msg[index].stationid){
                    this.lcd = false
                    for (let s = 0; s < this.$store.getters.websocketData[202002].msg[index].devices.length; s++) {
                        if(this.$store.getters.websocketData[202002].msg[index].devices[s].type == 5){
                            console.log(this.$store.getters.websocketData[202002].msg[index].stationname);
                            this.lcd = true
                        }
                    }                    
                }
            }
        }
      return this.$store.state.haveLcd;
    }
  },
  watch: {
    loctionId(newVal, oldVal) {
      if (newVal != oldVal) {
        this.$arrMapPoint.all.forEach(item => {
          if (oldVal == item.siteid) {
              this.id = item.siteid
              this.loctionName = item.sitename;
          }
        });
      }
    },
    haveLcd(newVal, oldVal) {
      // console.log(newVal, oldVal);
    }
  },
  created: function() {},
  mounted: function() {
    this.$nextTick(function() {
      setTimeout(() => {
        this.cbBoxMoveIn();
      }, 100);
    });
  },
  methods: {
    handleType(radio) {
      this.$refs.control.changeType(this.radio);
      if (this.flag) {
        this.flag = false;
        if (radio !== "overview") {
          this.nowTab = "ctl";
          this.$refs.overview.leave();
          this.radioType !== "blank" ? this.$refs.control.leave() : null;
          setTimeout(() => {
            this.radioType = radio;
          }, 750);
          setTimeout(() => {
            this.$refs.control.entry();
            this.$refs.control.changeType(radio);
            this.flag = true;
          }, 800);
        } else {
          this.nowTab = "ov";
          this.$refs.control.leave();
          setTimeout(() => {
            this.$refs.overview.entry();
            this.flag = true;
          }, 800);
        }
      }
    },
    ssOutIn() {
      if (this.nowTab === "ov") {
        this.$refs.overview.outAndIn();
      } else if (this.nowTab === "ctl") {
        this.$refs.control.leave();
        this.$refs.overview.leave();
        setTimeout(() => {
          this.$refs.overview.entry();
        }, 800);
        // this.nowTab = "ov";
        // this.radio = "";
      }
    },
    cbBoxMoveIn() {
      this.$refs.cbBox ? (this.$refs.cbBox.className = "controlBtn rIn") : null;
    },
    cbBoxMoveOut() {
      this.radio = "overview";
      this.$refs.cbBox
        ? (this.$refs.cbBox.className = "controlBtn rOut")
        : null;
    },
    cbBoxOutIn() {
      setTimeout(() => {
        this.cbBoxMoveOut();
        this.cbBoxMoveIn();
      }, 800);
    },
    backToSite() {
      this.$store.state.isClick = true;
      this.$router.push({ path: "/site" });
      setTimeout(() => {
        this.$store.state.isClick = false;
      }, 1000);
    },
    targetclick() {}
  },
  beforeRouteLeave(to, from, next) {
            this.$store.dispatch("setNow", 0);
    this.$store.state.last = 0;
    this.radioType === "blank"
      ? this.$refs.overview.leave()
      : this.$refs.control.leave();
    setTimeout(() => {
      next();
    }, 800);
  }
};
</script>

<style lang="scss" scoped>
.text_c {
  text-align: center;
  margin-top: 0.17rem;
  color: #fff;
  font-size: 0.12rem;
}

.controlBox,
.overview {
  position: absolute;
  top: 1.1rem;
  left: 0.3rem;
}

.rIn {
  /*transform: translate3d(-150%, 0, 0);*/
  opacity: 1;
}

.rOut {
  /*transform: translate3d(0, 0, 0);*/
  opacity: 0;
}

.controlBtn {
  position: absolute;
  top: 33vh;
  /*right: -3rem;*/
  right: 5.6rem;
  width: 3rem;
  height: 2rem;
  background: url("../assets/img/di_box.png") no-repeat center/cover;
  background-size: 100% 100%;
  transition: all 700ms cubic-bezier(0.25, 0.46, 0.33, 0.98);

  .el-radio {
    margin: 0.1rem 0.05rem;
    padding: 0.05rem;
    width: 1rem;
    color: #fff;
  }
}
</style>

