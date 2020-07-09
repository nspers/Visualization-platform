<template>
  <div class="login_warp">
    <div id="large-header">
      <canvas id="demo-canvas"></canvas>
    </div>
    <div ref="loginBox" class="login_box animated slideInRight">
      <div class="lb_title">
        <img src="../assets/img/login/mlogo.png" alt="logo" />
        <p>杨雁路智能公交站亭管理平台</p>
      </div>
      <form @submit.prevent="register">
        <div class="inputdiv userDiv">
          <input type="text" placeholder="请输入用户名" autofocus v-model="usename" />
        </div>
        <div class="inputdiv passwordDiv">
          <input type="password" placeholder="请输入密码" v-model="password" />
        </div>
        <div class="code_box">
          <input type="text" placeholder="请输入验证码" v-model="verification" />
          <img :src="verificationUrl" alt="验证码" @click="upodataImg()" />
        </div>
        <button>登 录</button>
      </form>
    </div>
    <div class="copyright">
      <img src="../assets/img/login/slogo.png" alt="logo" />
      <span>数知（北京）物联科技有限公司</span>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import "../assets/js/TweenLite";
import "../assets/js/EasePack";
import { baseUrl } from "../config/env";

export default {
  name: "login",
  data() {
    return {
      usename: "",
      password: "",
      verification: "",
      verificationUrl: baseUrl + "/code/image"
    };
  },
  mounted() {
    this.$nextTick(function() {
      this.pointerMove();
    });
  },
  methods: {
    upodataImg() {
      this.verificationUrl = baseUrl + "/code/image?" + Math.random();
    },
    register() {
      // window.sessionStorage.setItem('login',true)
      // this.$router.push({name:'index'})
      if (this.usename != "" && this.password != "") {
        if (this.verification != "") {
          var self = this;
          this.$api
            .post2(
              "/user/login",
              {
                username: this.usename,
                password: this.password,
                imageCode: this.verification
              },
              { emulateJSON: true, withCredentials: true }
            )
            .then(function(res) {
              if (res.code == 1) {
                self.$notify({
                  title: "成功",
                  message: "登录成功",
                  type: "success",
                  duration: "800"
                });

                self.$api.get("/bus/findBusStation", {}).then(function(res) {
                  let filtersMap = [];
                  window.sessionStorage.setItem(
                    "stations",
                    JSON.stringify(res.result)
                  );
                  for (var i = 0; i < res.result.length; i++) {
                    for (var s = 0; s < res.result[i].stations.length; s++) {
                      filtersMap.push(res.result[i].stations[s]);
                    }
                  }
                  for (let y = 0; y < filtersMap.length; y++) {
                    filtersMap[y].stationLat = +filtersMap[y].stationLat;
                    filtersMap[y].stationLon = +filtersMap[y].stationLon;
                    filtersMap[y].latitude = +filtersMap[y].stationLat;
                    filtersMap[y].longitude = +filtersMap[y].stationLon;
                    filtersMap[y].stationHighly = +filtersMap[y].stationHighly;
                    filtersMap[y].isUpside = +filtersMap[y].isUpside;
                    filtersMap[y].sitename = filtersMap[y].stationName;
                    filtersMap[y].siteid = filtersMap[y].id;
                    filtersMap[y].height = filtersMap[y].stationHighly;
                    filtersMap[y].haveLcd = 0;
                  }
                  Vue.prototype.$arrMapPoint.all = filtersMap;
                  window.sessionStorage.setItem(
                    "filtersMap",
                    JSON.stringify(filtersMap)
                  );
                });

                window.sessionStorage.setItem("loginGJZ", true);
                self.ws.initWebSocket();
                self.$router.push({ name: "index" });
              }
            })
            .catch(res => {
              self.upodataImg();
            });
        } else {
          this.$notify({
            title: "警告",
            message: "请输入验证码",
            type: "warning"
          });
        }
      } else {
        this.$notify({
          title: "警告",
          message: "请输入用户名或密码",
          type: "warning"
        });
      }
    },
    pointerMove() {
      let width,
        height,
        largeHeader,
        canvas,
        ctx,
        points,
        target,
        animateHeader = true;
      initHeader();
      initAnimation();
      addListeners();

      function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = { x: width / 2, y: height / 2 };
        largeHeader = document.getElementById("large-header");
        largeHeader.style.height = height + "px";
        canvas = document.getElementById("demo-canvas");
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext("2d");
        points = [];
        for (let x = 0; x < width; x = x + width / 20) {
          for (let y = 0; y < height; y = y + height / 20) {
            let px = x + (Math.random() * width) / 20;
            let py = y + (Math.random() * height) / 20;
            let p = { x: px, originX: px, y: py, originY: py };
            points.push(p);
          }
        }
        for (let i = 0; i < points.length; i++) {
          let closest = [];
          let p1 = points[i];
          for (let j = 0; j < points.length; j++) {
            let p2 = points[j];
            if (!(p1 == p2)) {
              let placed = false;
              for (let k = 0; k < 5; k++) {
                if (!placed) {
                  if (closest[k] == undefined) {
                    closest[k] = p2;
                    placed = true;
                  }
                }
              }
              for (let k = 0; k < 5; k++) {
                if (!placed) {
                  if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                    closest[k] = p2;
                    placed = true;
                  }
                }
              }
            }
          }
          p1.closest = closest;
        }
        for (let i in points) {
          let c = new Circle(
            points[i],
            2 + Math.random() * 2,
            "rgba(255,255,255,0.3)"
          );
          points[i].circle = c;
        }
      }

      function addListeners() {
        if (!("ontouchstart" in window)) {
          window.addEventListener("mousemove", mouseMove);
        }
        window.addEventListener("scroll", scrollCheck);
        window.addEventListener("resize", resize);
      }

      function mouseMove(e) {
        let posx = 0;
        let posy = 0;
        if (e.pageX || e.pageY) {
          posx = e.pageX;
          posy = e.pageY;
        } else {
          if (e.clientX || e.clientY) {
            posx =
              e.clientX +
              document.body.scrollLeft +
              document.documentElement.scrollLeft;
            posy =
              e.clientY +
              document.body.scrollTop +
              document.documentElement.scrollTop;
          }
        }
        target.x = posx;
        target.y = posy;
      }

      function scrollCheck() {
        document.body.scrollTop > height
          ? (animateHeader = false)
          : (animateHeader = true);
      }

      function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height + "px";
        canvas.width = width;
        canvas.height = height;
      }

      function initAnimation() {
        animate();
        for (let i in points) {
          shiftPoint(points[i]);
        }
      }

      function animate() {
        if (animateHeader) {
          ctx.clearRect(0, 0, width, height);
          for (let i in points) {
            if (Math.abs(getDistance(target, points[i])) < 4000) {
              points[i].active = 0.3;
              points[i].circle.active = 0.6;
            } else {
              if (Math.abs(getDistance(target, points[i])) < 20000) {
                points[i].active = 0.1;
                points[i].circle.active = 0.3;
              } else {
                if (Math.abs(getDistance(target, points[i])) < 40000) {
                  points[i].active = 0.02;
                  points[i].circle.active = 0.1;
                } else {
                  points[i].active = 0;
                  points[i].circle.active = 0;
                }
              }
            }
            drawLines(points[i]);
            points[i].circle.draw();
          }
        }
        requestAnimationFrame(animate);
      }

      function shiftPoint(p) {
        TweenLite.to(p, 1 + 1 * Math.random(), {
          x: p.originX - 50 + Math.random() * 100,
          y: p.originY - 50 + Math.random() * 100,
          ease: Circ.easeInOut,
          onComplete: function() {
            shiftPoint(p);
          }
        });
      }

      function drawLines(p) {
        if (!p.active) {
          return;
        }
        for (let i in p.closest) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.closest[i].x, p.closest[i].y);
          ctx.strokeStyle = "rgba(156,217,249," + p.active + ")";
          ctx.stroke();
        }
      }

      function Circle(pos, rad, color) {
        let _this = this;
        (function() {
          _this.pos = pos || null;
          _this.radius = rad || null;
          _this.color = color || null;
        })();
        this.draw = function() {
          if (!_this.active) {
            return;
          }
          ctx.beginPath();
          ctx.arc(
            _this.pos.x,
            _this.pos.y,
            _this.radius,
            0,
            2 * Math.PI,
            false
          );
          ctx.fillStyle = "rgba(156,217,249," + _this.active + ")";
          ctx.fill();
        };
      }

      function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$refs.loginBox.className = "login_box animated slideOutRight";
    setTimeout(() => {
      next();
    }, 800);
  }
};
</script>

<style lang="scss" scoped>
.login_warp {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background: #000 url("../assets/img/login/login_mbg.png") no-repeat
    center/cover;
  color: #fff;
  text-shadow: none;

  .large-header {
    width: 100vw;
    height: 100vh;
    #demo-canvas {
      width: 100vw;
      height: 100vh;
    }
  }
  .login_box {
    background: url("../assets/img/login/login_bbg.png") no-repeat 0 0/90% 90%;
    position: absolute;
    right: 2rem;
    top: 0;
    bottom: 7%;
    margin: auto 0;
    padding: 2rem 0 0 0;
    width: 5rem;
    height: 8rem;
    box-sizing: border-box;
    background-size: contain;
    font-size: 0;

    .lb_title {
      width: 5rem;
      text-align: center;
      transform: scale(0.9, 0.9);
      p {
        margin-top: 0.2rem;
        font-size: 0.34rem;
      }
    }
    form {
      width: 5rem;
      height: 4rem;
      text-align: center;
      transform: scale(0.9, 0.9);

      input::-webkit-input-placeholder {
        color: rgba(255, 255, 255, 0.8);
      }
      input::-moz-placeholder {
        color: rgba(255, 255, 255, 0.8);
      }
      input:-moz-placeholder {
        color: rgba(255, 255, 255, 0.8);
      }
      input:-ms-input-placeholder {
        color: rgba(255, 255, 255, 0.8);
      }

      .inputdiv,
      .code_box,
      button {
        margin-top: 0.36rem;
        font-size: 0.18rem;
      }
      .inputdiv,
      .code_box input {
        display: inline-block;
        position: relative;
        padding-left: 0.6rem;
        width: 3.88rem;
        height: 0.53rem;
        border: 0.01rem solid #00fbf7;
        border-radius: 0.04rem;
        box-sizing: border-box;
        color: #fff;
      }
      .userDiv {
        margin-top: 0;
        background: rgba(255, 255, 255, 0.2)
          url("../assets/img/login/icon_user.png") no-repeat 0.2rem 0.12rem/ 0.23rem
          auto;
      }
      .passwordDiv {
        background: rgba(255, 255, 255, 0.2)
          url("../assets/img/login/icon_pw.png") no-repeat 0.2rem 0.11rem/ 0.23rem
          auto;
      }
      .inputdiv input {
        width: 100%;
        height: 100%;
        color: #fff;
        font-size: 0.18rem;
      }
      .code_box {
        margin-left: auto;
        margin-right: auto;
        width: 3.88rem;
        height: 0.53rem;
        text-align: left;
        input {
          margin: 0 0.2rem 0 0;
          width: 2.22rem;
          background: rgba(255, 255, 255, 0.2)
            url("../assets/img/login/icon_yz.png") no-repeat 0.2rem 0.12rem/ 0.23rem
            auto;
        }
        img {
          display: inline-block;
          width: 1.4rem;
          height: 0.53rem;
          background-color: #fff;
          vertical-align: bottom;
        }
      }
      // button{
      //     width: 3.88rem;
      //     height: .53rem;
      //     border-radius: .04rem;
      //     background-color: #0E848F;
      //     color: #fff;
      //     border:none;
      // }
      button {
        z-index: 1;
        position: relative;
        padding: 0.5em 1em;
        outline: none;
        border: none;
        background-color: hsl(236, 32%, 26%);
        overflow: hidden;
        cursor: pointer;
        width: 3.88rem;
        height: 0.53rem;
        border-radius: 0.04rem;
        background-color: #0e848f;
        color: #fff;
      }

      button::after {
        content: "";
        z-index: -1;
        background-color: hsla(0, 0%, 100%, 0.2);
        position: absolute;
        top: -50%;
        bottom: -50%;
        width: 1.25em;
        transform: translate3d(-1425%, 0, 0) rotate(35deg);
      }

      button:hover::after {
        transition: transform 0.45s ease-in-out;
        transform: translate3d(1200%, 0, 0) rotate(35deg);
      }
    }
  }

  .copyright {
    position: absolute;
    right: 0.6rem;
    bottom: 0.35rem;
    img {
      display: inline-block;
      margin: 0 0.1rem;
      width: 0.23rem;
      vertical-align: middle;
    }
    span {
      font-size: 0.2rem;
      vertical-align: middle;
    }
  }
}

.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}
@keyframes slideInRight {
  from {
    transform: translate3d(80%, 0, 0);
    visibility: hidden;
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
.slideInRight {
  animation-name: slideInRight;
}
@keyframes slideOutRight {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(110%, 0, 0);
    visibility: hidden;
  }
}
.slideOutRight {
  animation-name: slideOutRight;
}
</style>