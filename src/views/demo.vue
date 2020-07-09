<template>
    <div class="demo" style="padding:100px;">

        <div  style="position: relative;width: 24px;height: 200px;">
            <div :style="'position: absolute;bottom:0;width: 24px;height:'+ wNum +'%;background-color: skyblue;'">
                <div style="padding-top: 5px;width: 24px;color: #fff;font-size: 12px;text-align: center;">{{num}}</div>
            </div>
        </div>

        <div  style="position: relative;margin: 20px 0;width: 200px;height: 20px;">
            <div :style="'width: '+ wNum +'%;height: 20px;background-color: skyblue;border-radius: 10px;'">
                <div style="float: right;padding-right: 5px;font-size: 12px;line-height: 20px;color: #fff;">{{num}}</div>
            </div>
        </div>

        <div class="csb_box">
            <div class="csb_content">自定义滚动条自定义滚动条自定义滚动条自定义滚动条自定义滚动条自定义滚动条</div>
        </div>

        <div>
            <transition enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutLeft">
                <div class="nav_wrap" v-if="show">
                    <Nav/>
                </div>
            </transition>
            <a href="javascript:void(0)" @click="show = !show">点击左右显示</a>
        </div>

        <div>
            <transition enter-active-class="animated bounceInDown" leave-active-class="animated bounceOutUp">
                <div class="nav_wrap" v-if="show1">
                    <Nav/>
                </div>
            </transition>
            <a href="javascript:void(0)" @click="show1 = !show1">点击上下显示</a>
        </div>

        <div>
            <transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
                <div class="nav_wrap" v-if="show2">
                    <Nav/>
                </div>
            </transition>
            <a href="javascript:void(0)" @click="show2 = !show2">点击弹出</a>
        </div>

        <div ref="myEchart" style="width:500px;height:500px;"></div>

    </div>
</template>
<script>
    import Nav from '../components/header.vue'
    import echarts from 'echarts'

    export default {
        name: 'App',
        data(){
            return{
                show:false,
                show1:false,
                show2:false,
                chart:null,
                maxNum:100,
                num:0,
                wNum:0
            }
        },
        watch:{
            num (val, oldVal) {
                console.log('new: %s, old: %s', val, oldVal)
            }
        },
        components:{
            Nav
        },
        created:function() {

        },
        mounted:function() {
            this.$nextTick(function(){
                this.initChart();
                this.numCount();
            })
        },
        methods:{
            initChart(){
                this.chart = echarts.init(this.$refs.myEchart);
                this.chart.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                    },
                    series: [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:335, name:'直接访问'},
                                {value:310, name:'邮件营销'},
                                {value:234, name:'联盟广告'},
                                {value:135, name:'视频广告'},
                                {value:1548, name:'搜索引擎'}
                            ]
                        }
                    ]
                })
            },
            numCount(){
                let count = setInterval(()=>{
                    if(this.num < this.maxNum){
                        this.num++;
                        this.wNum = this.num / this.maxNum * 100;
                    }else{
                        clearInterval(count);
                    }
                },10)
            }
        }
    }
</script>

<style>
    .nav_wrap{
        overflow: hidden;
        width: 400px;
        height: 300px;
        background: rgba(0,0,0,.5);
        color: #fff;
    }

    /*自定义滚动条*/
    .csb_box{
        overflow-y: scroll;
        margin: 20px 0;
        width: 200px;
        height: 200px;
        background-color: rgba(0,0,0,.5);
    }
    .csb_box .csb_content{
        padding: 5px;
        width: 100%;
        height: 1000px;
        color: #fff;
        box-sizing: border-box;
    }
    .csb_box::-webkit-scrollbar{
        width:8px;
        height:8px;
    }
    .csb_box::-webkit-scrollbar-track{
        background: transparent;
        border-radius:8px;
    }
    .csb_box::-webkit-scrollbar-track-piece{
        border-radius: 2px 2px 0px 0px;
    }
    .csb_box::-webkit-scrollbar-thumb{
        background: skyblue;
        border-radius:6px;
    }
    .csb_box::-webkit-scrollbar-thumb:hover{
        background: powderblue;
    }
    .csb_box::-webkit-scrollbar-corner {
        background: transparent;
    }
</style>

