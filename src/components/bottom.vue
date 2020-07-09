<template>
    <div class="Footer">
        <!-- <transition enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown"> -->
        <transition name="bottoms">
            <div class="bottom" v-if="show1">
                <div class="bottom_left">
                    <div class="tubiao">
                        <div class="rote-pictures move1"></div>
                        <div class="gongjiao-info"></div>
                    </div>
                    <div class="bottom_info">公交站点信息</div>
                    <div class="bottom_dian">
                        <div class="diandian"></div>
                        <div class="diandian"></div>
                        <div class="diandian"></div>
                        <div class="diandian"></div>
                    </div>
                </div>
                <div class="bottom_centents">
                    <div class="bottom_centents_top" >
                        <div class="gongjiao" :style="!item.haveLcd&&nowTagName=='lcd'?'background-color:gray;border-color:gray;':null" :class="{active:item.siteid==lastSite}" @click="siteOnClick(item.siteid)" v-for="(item,ind) in siteList1" :key="ind">
                            <div class="gongjiao-text" :style="!item.haveLcd&&nowTagName=='lcd'?'color:gray;':null" :class="{active:item.id==lastSite}">{{item.stationName}}</div>
                        </div>
                    </div>
                    <div class="bottom_centents_bottom">
                        <div class="gongjiao" :style="!item.haveLcd&&nowTagName=='lcd'?'background-color:gray;border-color:gray;':null" :class="{active:item.siteid==lastSite}" @click="siteOnClick(item.siteid)" v-for="(item,ind) in siteList2" :key="ind">
                            <div class="gongjiao-text" :style="!item.haveLcd&&nowTagName=='lcd'?'color:gray;':null" :class="{active:item.id==lastSite}">{{item.stationName}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <p class="Alects_showHdder" v-if="show2" @click="show1 = !show1">
            <span :class="show1?'down':'up'">
                <!-- <i  style="font-size:26px"></i> -->
            </span>
        </p>
    </div>
</template>
<script>
    import Vue from 'vue';
    export default {
        name: "App",
        data() {
            return {
                nowSite: 0,
                btnSwitch: true,
                tempera: [1, 5, 10, 15, 20, 25, 30, 35, 40], //尺子刻度
                dragging: false, //默认没有动画
                show1: true,
                show2: true,
                siteList1: [],
                siteList2: [],
            };
        },
        async created() {
            this.setSitList();
            if(this.$route.path === "/alarm" || this.$route.path === "/statistics"){
                this.show1 = false
            }
        },
        computed:{
            nowTagName(){
                return this.$store.state.nowTagName
            },
            lastSite(){
                return this.$store.state.last
            }
        },
        watch:{
            lastSite(oldval,newval){
                // console.log(oldval, newval);
            },
            $route(e) {
                if (e.path === "/alarm" || e.path === "/statistics") {
                    this.show1 = false;
                    this.show2 = false;
                } else{
                    this.show1 = true;
                    this.show2 = true;
                }
                this.setSitList()
            },
            show1(val){
                if(val){
                    $('.wrapbox,.Bug_Control').css('height','calc(100vh - 2.71rem)')
                }else{
                    $('.wrapbox,.Bug_Control').css('height','calc(100vh - 1.2rem)')
                }
                if($('.alog_box').parent().position()){
                    setTimeout(()=>{
                        $('.alog_box').parent().css('height',$('.alog_box').parents('.wrapbox').height() - $('.alog_box').parent().position().top)
                    },400)
                }
            }
        },
        methods: {
            setSitList(){
                this.siteList1 = []
                this.siteList2 = []
                var arrMapPoint = JSON.parse(sessionStorage.filtersMap);
                arrMapPoint.forEach((item,index)=>{
                    item.isUpside?this.siteList2.push(item):this.siteList1.push(item)
                })
            },
            siteOnClick(sId){
                Vue.prototype.$siteOnClick(sId)
            },
        }
    };
</script>

<style lang="scss" scoped>
.down{
    width:0.36rem;
    height:0.36rem;
      background: url("../assets/img/down.png")  no-repeat center/contain;
}
.up{
     width:0.36rem;
    height:0.36rem;
       background: url("../assets/img/up.png")  no-repeat center/contain;
}
.bottoms-enter-active, .bottoms-leave-active {
  transition: all .5s;
}
.bottoms-enter, .bottoms-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateY(100%);
  opacity: 0;
}
    .Footer {
        position: fixed;
        bottom: 0px;
        width: 100%;
        padding: 0 0.2rem;
        z-index: 1999;
    }

    .Alects_showHdder {
        width: 0.5rem;
        height: 0.3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        right: 2%;
        bottom: 0.2rem;
        // background-color: #757a7e;
        color: #fff;
    }

    .bottom {
        height: 1.51rem;
        position: absolute;
        bottom: 0;
        left: 0.2rem;
        right: 0.2rem;
        margin: 0 auto;
        background: url("../assets/img/index_bottom.png") 0 0 no-repeat;
        background-size: contain;

    }

    .bottom_Scale {
        position: absolute;
        top: 1rem;
        right: 0;
        width: 80%;
        height: 0.2rem;
    }

    .bottom_centents {
        position: absolute;
        right: 0;
        top: 0;
        width: 80%;
        height: 100%;
        .bottom_centents_top,.bottom_centents_bottom{
            width: 95%;
            position: absolute;
            top: 50%;
            left: 47%;
            transform: translate(-50%, -50%);
            height: 1px;
            display: flex;
            align-items: center;
            justify-content: space-around;
        }
        .bottom_centents_top{
            .gongjiao-text{
                top: -0.3rem;
                left: -0.2rem;
            }
        }
        .bottom_centents_bottom{
            left: 50%;
            .gongjiao-text{
                top: 0.3rem;
                left: -0.1rem;
            }
        }
        .bottom_centents_list{
            position: relative;
            flex: 1;
            height: 0;
            color: #fff;

        }


        .gongjiao {
            position: relative;
            width: 0.3rem;
            height: 0.3rem;
            background: #011e26 url(../assets/img/gongjiao.png) center center no-repeat;
            border-radius: 50%;
            border: 2px solid #01fdfa;
            cursor: pointer;
            z-index: 999;
        }

        .gongjiao.active ,.gongjiao:hover{
            background-color: #01fdfa;
        }
        .gongjiao-text{
            position: absolute;
            width: 1.2rem;
            position: relative;
            cursor: pointer;
            z-index: -1;
            color: #fff;
        }
        .gongjiao-text.active,.gongjiao-text:hover,.gongjiao:hover .gongjiao-text{
            color: #01fffa;
        }

    }

    .bottom_left {
        position: relative;
        width: 20%;
        height: 100%;
        display: flex;
        align-items: center;
    }

    .bottom_dian {
        display: flex;
        justify-content: space-evenly;
        position: absolute;
        top: 6%;
        right: -0.12rem;
        width: 0.3rem;
        height: 0.02rem;
        .diandian {
            width: 0.04rem;
            height: 0.04rem;
            background-color: #01fdfa;
            display: inline-block;
        }
    }

    .tubiao {
        width: 40%;
        height: 0.61rem;
        position: relative;
    }

    .bottom_info {
        color: #01fffa;
        font-size: 0.2rem;
        margin-left: 2%;
    }

    .gongjiao-info {
        width: 0.61rem;
        height: 0.61rem;
        background: url(../assets/img/circle_car.png) center center no-repeat;
        position: absolute;
        right: 0px;
    }

    /*旋转*/
    .rote-pictures {
        width: 0.61rem;
        height: 0.61rem;
        background: url(../assets/img/index_top_yuan.png) center center no-repeat;
        position: absolute;

        background-size: contain;
        right: 0px;
    }
</style>
