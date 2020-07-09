<template>
    <div class="header">
        <div class="h-left">
            <div class="rote-pictures move1"></div>
            <div class="header-wrap">
                <div class="header_logo">
                    <h2 class="logo_text"></h2>
                </div>
                <div class="menu">

                    <ul class="menu_list">
                        <li v-for="(item,index) of menuList" :key="index" @click="menuClick(index,item.path)">
                            <span>{{item.name}}</span>
                        </li>
                    </ul>
                    <div class="menu_active" :style="menuActiveClass"></div>
                </div>
            </div>
        </div>
        <div class="h-right">
            <div class="top_car"></div>
            <!-- <div class="rote-right-pictures move1"></div> -->
            <!--            <div class="book-pictures"></div>-->
            <p class="h_r_btn_p">
                <span class="mainBtn" @click="showBtn = true" :class="{'show' : showBtn}"></span>
                <strong :class="{'come' : showBtn}">
                    <b @click="goIndex">
                        <span class="iconfont icon-fanhuishouye" style="padding-top: .07rem;"></span>
                        <!--                        首页-->
                    </b>
                    <b @click="goLogin">
                        <span class="iconfont icon-tuichudenglu"></span>
                        <!--                        退出-->
                    </b>
                </strong>
            </p>

            <div class="header_right">
                <p>
                    <span>{{tiemrObj.date}}</span>
                    <!--                    <span>{{tiemrObj.day}}</span>-->
                    <span>{{tiemrObj.tiems}}</span>
                    <span>{{tiemrObj.str}}</span>
                </p>
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        name: "App",
        data() {
            return {
                menuActiveClass: {transform: 'translateX(0.05rem)'},
                menuList: [
                    {path: '/site', name: '站台概览'},
                    {path: '/illumine', name: '照明'},
                    {path: '/lcd', name: 'LCD屏'},
                    {path: '/led', name: 'LED屏'},
                    {path: '/electricity', name: '用电管理'},
                    {path: '/alarm', name: '告警管理'},
                    {path: '/statistics', name: '统计分析'},
                ],
                tiemrObj: {
                    day: "",
                    tiems: "",
                    str: ""
                },
                timer: null,
                showBtn: false,
            };
        },
        watch:{
            "$route":function (newValue, oldValue) {
                for (let index = 0; index < this.menuList.length; index++) {
                    if(this.menuList[index].path == newValue.path){
                        this.menuActiveClass = {transform: `translateX(${index * 1.25 - 0.03}rem)`};
                    }
                }               
            }
        },
        methods: {
            goIndex() {
                this.showBtn = false;
                this.menuActiveClass = {display: 'none'};
                this.$router.push("/");
            },
            goLogin() {
                var self = this
                this.$api.post2('/user/logout').then(function(res){
                    sessionStorage.loginGJZ = false
                    self.$router.push({name:'login'})
                    location.reload()
                })
            },
            menuClick(index, path) {
                this.$store.state.isClick = true;
                this.menuActiveClass = {transform: `translateX(${index * 1.25 - 0.03}rem)`};
                this.$router.push(path);
                setTimeout(() => {
                    this.$store.state.isClick = false;
                }, 1000);
            },
            muns(tiem) {
                return tiem < 10 ? "0" + tiem : tiem;
            },
            setTimers() {
                let oDate = new Date();
                let tiems = null;
                let str = "";
                let hours = oDate.getHours();
                let minute = oDate.getMinutes();
                let seconds = oDate.getSeconds();

                hours = hours < 10 ? "0" + hours : hours;
                minute = minute < 10 ? "0" + minute : minute;
                seconds = seconds < 10 ? "0" + seconds : seconds;
                tiems = hours + ":" + minute + ":" + seconds;
                // console.log("67tiems", tiems);
                if (hours > 12) {
                    hours -= 12;
                    str = "PM";
                } else {
                    str = "AM";
                }

                this.tiemrObj.tiems = tiems;
                this.tiemrObj.str = str;
            }
        },
        created() {
            var path = window.sessionStorage.getItem("activeRouter");
            var index = this.menuList.findIndex((item) => item.path == path)
            if (index == -1) {
                this.menuActiveClass = {display: 'none'};
            } else {
                this.menuActiveClass = {
                    transform: `translateX(${index * 1.25 - 0.03}rem)`,
                    display: 'inline-block'
                };
            }

            //右栏时间表
            let terval = null;
            let dates = new Date();

            let Year = dates.getFullYear(); //获取年
            let Monthr = dates.getMonth() + 1; //获取月
            let tian = dates.getDate(); //获取天
            this.tiemrObj.date = Year + "-" + Monthr + "-" + this.muns(tian);

            let day = dates.getDay(); //获取周
            let arrs = ["日", "一", "二", "三", "四", "五", "六"];
            this.tiemrObj.day = "星期" + arrs[day];
            this.setTimers();
        },

        mounted() {
            this.$nextTick(function () {
                this.timer = setInterval(this.setTimers, 1000);
                document.getElementById("app").addEventListener("click", (e) => {
                    if(e.target.className.indexOf("show") == -1){
                    this.showBtn = false;
                    }
                });
            });

        }
    };
</script>
<style lang="scss" scoped>
    .logo_text {
        margin-left: 1rem;
        width: 100%;
        height: 100%;
        background: url(~@/assets/img/logo_text.png) center/contain no-repeat;
    }

    .header {
        position: absolute;
        left: 0.2rem;
        right: 0.2rem;
        /*width: 1882px;*/
        /*height: 107px;*/
        height: 1.07rem;
        margin: 0 auto;
        // background: url(../assets/img/index_top.png) 0 0 no-repeat;
        // background-size: contain;
        &:after {
            content: " ";
            display: block;
            clear: both;
        }
    }

    .h-left {
        position: relative;
        width: 80.7%;
        height: 100%;
        float: left;
        background: url(../assets/img/index_top_02.png) 0 0 no-repeat;
        background-size: contain;
    }

    .h-right {
        position: relative;
        width: 19.3%;
        height: 100%;
        float: left;
        background: url(../assets/img/index_top_03.png) 0 0 no-repeat;
        background-size: contain;

        .h_r_btn_p {
            overflow: hidden;
            position: absolute;
            top: .16rem;
            right: .2rem;
            width: 1rem;
            height: .6rem;
            text-align: center;

            .icons, .mainBtn {
                cursor: pointer;
            }

            span {
                transition: all .3s linear;
            }

            strong {
                position: absolute;
                left: 100%;
                top: 0;
                width: 100%;
                transition: all .3s linear;
            }

            strong.come {
                left: 0;
            }

            strong span {
                margin: 0 .05rem;
            }

            .come {
                text-align: center
            }

            .come b {
                display: inline-block;
                cursor: pointer;
                color: #66ffff;
            }

            .come span {
                font-size: .25rem;
                display: block;
                width: .3rem;
            }

            .show {
                opacity: 0;
            }
            .mainBtn {
                float: right;
                margin-right: .08rem;
                width: .4rem;
                height: .25rem;
                display: inline-block;
                background: url(../assets/img/btn_top.png) no-repeat;
                background-size: contain;
                position: relative;
                margin-top: .08rem;

            }
            .mainBtn::after {
                content: '';
                display: block;
                width: .4rem;
                height: .2rem;
                background: url(../assets/img/btn_middle.png) no-repeat;
                background-size: contain;
                position: absolute;
                top: .16rem;
                transition: all .3s ease-out;
            }
            .mainBtn::before {
                content: '';
                display: block;
                width: .4rem;
                height: .2rem;
                background: url(../assets/img/btn_middle.png) no-repeat;
                background-size: contain;
                position: absolute;
                top: .23rem;
                transition: all .5s ease-out;
            }
            .mainBtn:hover::after {
                top: .18rem;
            }
            .mainBtn:hover::before {
                top: .26rem;
            }
        }
    }

    .header-wrap {
        width: 100%;
        height: 100%;
    }

    .header_logo {
        float: left;
        width: 31%;
        height: 84%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .menu {
        float: left;
        width: 60%;
        margin-left: 3%;
        height: 82%;
        display: flex;
        align-items: center;

        .menu_list {
            width: 98%;
            height: 0.5rem;
            line-height: 0.5rem;
            // justify-content: space-evenly;
            li {
                width: 1.25rem;
                text-align: center;
                color: #66ffff;
                font-size: 0.16rem;
                cursor: pointer;
                float: left;
                // padding: 0.05rem 0.2rem;
                // // border: 1px solid #2d7375;
                // // transform: skew(-30deg);
                // display: flex;
                // align-items: center;
                // justify-content: center;
                // span {
                //   // transform: skew(30deg);
                //   color: #66ffff;
                //   font-size: 0.16rem;
                // }
            }

            .current_li {
                color: #fff;
                background-color: #347883;
            }
        }
    }

    .header_right {
        width: 80%;
        margin-left: 0.5rem;
        margin-top: 0.3rem;
        float: left;
        color: #62f0f0;
        font-size: 0.14rem;
    }

    .menu_active {
        position: absolute;
        width: 1.28rem;
        height: 0.44rem;
        background: url(../assets/img/menu_active.png) center center no-repeat;
        background-size: contain;
        transition: transform .3s ease-in-out, -webkit-transform .3s ease-in-out;
    }

    //@at-root
    .top_car {
        width: 0.32rem;
        height: 0.32rem;
        background: url(../assets/img/top_car.png) center/cover no-repeat;
        margin-left: -0.16rem;
        position: absolute;
        left: 0;
        top: 0.54rem;
    }

    .top_car::after {
        display: inline-block;
        content: "";
        width: 0.5rem;
        height: 0.5rem;
        background: url(../assets/img/header_right_yuan.png) center/cover no-repeat;
        margin-left: -0.09rem;
        margin-top: -0.09rem;
        animation: myMove1 5s linear infinite;
        -webkit-animation: myMove1 5s linear infinite;
    }

    // 旋转
    .rote-pictures {
        position: absolute;
        top: 0.29rem;
        left: 0.25rem;
        width: 0.61rem;
        height: 0.61rem;
        background: url(../assets/img/index_top_yuan.png) center/cover no-repeat;
    }

    .rote-right-pictures {
        width: 0.5rem;
        height: 0.5rem;
        background: url(../assets/img/header_right_yuan.png) center/cover no-repeat;
        position: absolute;
        margin-left: -0.25rem;
        left: 0;
        top: 0.47rem;
    }

    .book-pictures {
        width: 0.32rem;
        height: 0.27rem;
        background: url(../assets/img/index_book.png) center center no-repeat;
        background-size: contain;
        position: absolute;
        top: 0.3rem;
        right: 0.26rem;
    }
</style>