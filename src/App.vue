<template>
  <div id="app" style="overflow-x:hidden">
    <router-view ref="rView" />
    <div v-if="$route.meta.keepAlive" class="main">
      <div id="mainCover" v-show="showMainCover"></div>
      <Header />
      <div id="cesiumContainer" class="amap-container" ref="cesiumContainer"></div>
      <Bottom ref="cBottom" @outIn="sovOutIn" />
    </div>
    <div class="felx" v-show="isfixed"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import Header from './components/header'
import Bottom from './components/bottom'
// import {createMap} from "./map3d/main";
// import * as mapWork from "./map3d/work";
import * as mapWork from './amap/main'
import { createMap } from './amap/main'

export default {
  name: 'App',
  data() {
    return {
      showMainCover: false,
      lastSite: '',
      nowSite: '',
      isfixed: false,
      direction: 0
    }
  },
  async created() {
    Vue.prototype.$that = this
    // this.$api
    //     .get("/bus/findBusStation", {})
    //     .then(function (res) {
    //         let filtersMap = [];
    //         window.sessionStorage.setItem('stations', JSON.stringify(res.result));
    //         for (var i = 0; i < res.result.length; i++) {
    //             for (var s = 0; s < res.result[i].stations.length; s++) {
    //                 filtersMap.push(res.result[i].stations[s])
    //             }
    //         }
    //         console.log(filtersMap)
    //         for (let y = 0; y < filtersMap.length; y++) {
    //             filtersMap[y].stationLat = +filtersMap[y].stationLat;
    //             filtersMap[y].stationLon = +filtersMap[y].stationLon;
    //             filtersMap[y].latitude = +filtersMap[y].stationLat;
    //             filtersMap[y].longitude = +filtersMap[y].stationLon;
    //             filtersMap[y].stationHighly = +filtersMap[y].stationHighly
    //             filtersMap[y].isUpside = +filtersMap[y].isUpside
    //             filtersMap[y].sitename = filtersMap[y].stationName
    //             filtersMap[y].siteid = filtersMap[y].id
    //             filtersMap[y].height = filtersMap[y].stationHighly
    //             filtersMap[y].haveLcd = 0
    //         }
    //         Vue.prototype.$arrMapPoint.all = filtersMap
    //         window.sessionStorage.setItem('filtersMap', JSON.stringify(filtersMap))
    //     });
  },
  watch: {
    $route: function(newValue, oldValue) {
      var self = this
      setTimeout(() => {
        if (
          newValue.meta.keepAlive &&
          sessionStorage.filtersMap.length &&
          !$('.cesium-viewer').length
        ) {
          // self.showMainCover = true;
          self.loadMap()
        }
      }, 2000)
    }
  },
  mounted() {
    let self = this
    let t = setInterval(() => {
      if (sessionStorage.filtersMap && this.$refs.cesiumContainer) {
        this.loadMap()
        clearInterval(t)
      }
    })
    window.addEventListener('mousewheel', this.handleScroll, false)
    window.onload = () => {
      self.init()
    }
    window.onresize = () => {
      self.init()
    }
  },
  components: {
    Header,
    Bottom
  },
  methods: {
    init() {
      var self = this
      if (document.body.clientWidth < 1600) {
        // self.$refs.cBottom.show1 = false
        // self.$refs.cBottom.show2 = false
        $('html').css('fontSize', '84px')
      } else {
        // self.$refs.cBottom.show2 = true
        $('html').css('fontSize', 'calc(100/1920*100vw)')
      }
      if (
        $('.alog_box')
          .parent()
          .position()
      ) {
        setTimeout(() => {
          $('.alog_box')
            .parent()
            .css(
              'height',
              $('.alog_box')
                .parents('.wrapbox')
                .height() -
                $('.alog_box')
                  .parent()
                  .position().top
            )
        }, 400)
      }
    },
    handleScroll(e) {
      this.direction = e.deltaY
    },
    loadMap() {
      if ($('#cesiumContainer').children().length) {
        // 防止重复初始化
        return
      }
      createMap('cesiumContainer', () => {
        this.showMainCover = false
        //创建覆盖物
        Vue.prototype.$creatMapPoint(this, this.$route.name)
        mapWork.getJWD()
        // 开始移动
        mapWork.bindDrawstartHandler(() => {
          this.direction !== 0 ? (this.isfixed = false) : (this.isfixed = true)
          if (
            ['/led', '/lcd', '/electricity', '/illumine'].indexOf(
              this.$route.path
            ) > -1
          ) {
            this.$refs.rView.closecompoent()
          } else if (this.$route.path === '/single_site') {
            this.$refs.rView.$refs.control.leave()
            this.$refs.rView.$refs.overview.leave()
            this.$refs.rView.cbBoxMoveOut()
          }
          //判断是否点击了覆盖物或底部导航 如果不是则重置覆盖物状态和各种id
          // console.log(this.$store.state.isClick ? "是点击" : "是鼠标拖动");
          if (!this.$store.state.isClick && Vue.prototype.workCover) {
            this.$store.state.selectId = 0
            this.$store.state.last = 0
            this.$store.dispatch('setNow', 0)
            this.$store.state.loction = 0
            this.$store.state.selectBoolean = 'noSelect'
            Vue.prototype.workCover.revertBillboardsStatus()
            $('.map_site_name')
              .stop()
              .animate({ marginTop: '-100px' })
            if (this.$route.path === '/single_site') {
              this.$router.push({ name: 'site' })
            }
          }
        })
        mapWork.bindDrawendHandler(() => {
          this.direction = 0
          this.isfixed = false
          this.showMainCover = false
          if (this.$store.getters.getNow == 0) {
            if (
              ['/led', '/lcd', '/electricity', '/illumine'].indexOf(
                this.$route.path
              ) > -1
            ) {
              let isindex = this.$store.getters.getterisnum
              this.$refs.rView.show(isindex)
            }
            this.$store.state.last = 0
          } else {
            if (
              this.$route.name !== 'singleSite' &&
              this.$refs.rView &&
              this.$refs.rView.targetclick
            ) {
              this.$refs.rView.targetclick(this.$store.getters.getNow)
            }
          }
          this.$store.dispatch('setNow', 0)
        })
      })
    },

    sovOutIn() {
      this.$refs.rView.ssOutIn()
      if (this.$route.name === 'singleSite') {
        setTimeout(() => {
          this.$refs.rView.cbBoxOutIn()
        }, 500)
      }
    },
    siteClick(sId) {
      this.$refs.cBottom.siteOnClick(sId)
    }
  }
}
</script>
<style>
.felx {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  /* background-color: rgba(0,0,0,.8); */
}
#mainCover {
  position: absolute;
  z-index: 100000;
  width: 100vw;
  height: 100vh;
  /*background-color: rgba(0,0,0,.5);*/
}
</style>

