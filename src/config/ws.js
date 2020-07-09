import Vue from 'vue'
import router from '../router';
import { Loading } from 'element-ui';
import { BaseWs } from "../config/env";

var websock = null;
var global_callback = null;
var serverPort = '9000';  //webSocket连接端口
var temporary = null
var lock = 0
var time = 0
var text = ''

function getWebIP(){
  var curIP = '192.168.8.63';
  return curIP;
}

let loading;

function initWebSocket(){ //初始化weosocket
    //ws地址
    var wsuri = BaseWs;
    websock = new WebSocket(wsuri);
    websock.onmessage = function(e){
        websocketonmessage(e);
    };
    websock.onclose = function(e){
        websocketclose(e);
    };
    websock.onopen = function () {
        websocketOpen();
    };
    //连接发生错误的回调方法
    websock.onerror = function () {
        console.log("WebSocket连接发生错误");
    }
}

// 实际调用的方法
function sendSock(agentData,callback){      
    global_callback = callback;
    if (websock.readyState === websock.OPEN) {
        //若是ws开启状态
        websocketsend(agentData)
    }else if (websock.readyState === websock.CONNECTING) {
        // 若是 正在开启状态，则等待1s后重新调用
        setTimeout(function () {
          sendSock(agentData,callback);
        }, 1000);
    }else {
        // 若未开启 ，则等待1s后重新调用
        setTimeout(function () {
            sendSock(agentData,callback);
        }, 1000);
    }
}

//数据接收
function websocketonmessage(e){ 
    global_callback(JSON.parse(e.data));
}

//数据发送
function websocketsend(agentData){
    temporary = agentData.modulecode    
    websock.send(JSON.stringify(agentData));
}

//关闭
function websocketclose(e){      
    console.log("连接关闭 (" + e.code + ")");
    reconnect()
}

function websocketOpen(e){
    if(loading != undefined){
        loading.close()
    }
    console.log("连接成功");
}

function reconnect(){
    lock++
    time = navigator.onLine ? 3000 : 10000
    text = navigator.onLine ? '链接丢失等待第' + lock + '次重新链接！' : '您与互联网断开连接，等待重新连接互联网！'
    // loading = Loading.service({
    //     lock:true,
    //     fullscreen:true,
    //     text:text,
    //     background:'rgba(0, 0, 0, 0.8)',
    //     spinner:'el-icon-loading'
    // });
    if(lock < 2000){
        setTimeout(() => {
            initWebSocket();
            Vue.prototype.$getWebsocketData(Vue.prototype.modulecode[router.history.current.name]);
            
        },time)
    }else{
        location.reload() 
    }
}


if(sessionStorage.loginGJZ != undefined && sessionStorage.loginGJZ == 'true'){
    initWebSocket();
}

export{ sendSock,initWebSocket }