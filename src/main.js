"use strict";

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Axios from 'axios';
import store from "../src/store";
import element from './assets/js/demandload.js';
import api from './config';
import * as ws from './config/ws';
import router from './router';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/reset.css';
import './assets/css/components.scss';
import './assets/css/amap.css';
import './assets/js/common.js';
import { Form, FormItem } from 'element-ui'

var echarts = require('echarts/lib/echarts');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/chart/bar');
require('echarts/lib/chart/line');
require('echarts/lib/chart/pie');
require('echarts/lib/chart/gauge');

Vue.use(element)
Vue.use(api);
Vue.use(Form)
Vue.use(FormItem)

Vue.prototype.$axios = Axios;
Vue.prototype.ws = ws;
Vue.prototype.$api = api;
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;
Vue.config.devtools = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  // sockets: {
  //   connect: function () {
  //     console.log('socket connected');
  //   },
  //   res: function (val) {
  //     console.log('接收到服务端消息', val);
  //   }
  // }
}).$mount('#app')
