import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
// import * as mapWork from "../map3d/work";

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            meta: {
                keepAlive: false
            },
            component: (resolve) => require(['@/views/index'], resolve)
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                keepAlive: false
            },
            component: (resolve) => require(['@/views/login_ver2'], resolve)
        },
        {
            path: '/alarm',
            name: 'alarm',
            meta: {
                keepAlive: true
            },
            component: (resolve) => require(['@/views/alarm'], resolve)
        },
        {
            path: '/led',
            name: 'led',
            meta: {
                keepAlive: true
            },
            component: (resolve) => require(['@/views/led'], resolve)
        },
        {
            path: '/lcd',
            name: 'lcd',
            meta: {
                keepAlive: true
            },
            component: (resolve) => require(['@/views/lcd'], resolve)
        },
        {
            path: '/electricity',
            name: 'electricity',
            meta: {
                keepAlive: true
            },
            component: (resolve) => require(['@/views/electricity'], resolve)
        },
        {
            path: '/illumine',
            name: 'illumine',
            meta: {
                keepAlive: true
            },
            component: (resolve) => require(['@/views/illumine'], resolve)
        },
        {
            path: '/site',
            name: 'site',
            meta: {
                keepAlive: true
            },
            component: (resolve) => require(['@/views/site'], resolve),
        },
        {
            path: '/single_site',
            name: 'singleSite',
            meta: {
                keepAlive: true
            },
            component: (resolve) => require(['@/views/single_site'], resolve),
        },
        {
            path: '/statistics',
            name: 'statistics',
            meta: {
                keepAlive: true
            },
            component: (resolve) => require(['@/views/statistics'], resolve)
        },
        // 示例DEMO
        {
            path: '/demo',
            name: 'demo',
            meta: {
                keepAlive: true
            },
            component: (resolve) => require(['@/views/demo'], resolve)
        },
        {
            path: "*",
            name: "error",
            component: (resolve) => require(['@/views/error'], resolve)
        }
    ]
});

router.beforeEach((to, from, next) => {
    function Next() {
        store.state.nowTagName = to.name;
        //路由变化时根据 modulecode 请求 ws数据
        // console.log(to.name);

        let modulecode = Vue.prototype.modulecode[to.name];
        // console.log('modulecode:', modulecode);
        if (modulecode) {
            store.state.websocket = {};
            Vue.prototype.$getWebsocketData(modulecode);
            if (to.name !== "singleSite" && store.state.isClick) {
                //路由变化时重置地图高度
                Vue.prototype.$resetMapHeight();
                Vue.prototype.workCover ? Vue.prototype.workCover.revertBillboardsStatus() : null;
                store.state.selectId = 0;
                store.state.last = 0;
                store.dispatch("setNow", 0);
                store.state.loction = 0;
                store.state.selectBoolean = 'noSelect';
                //切换板块更换车站图标
                if (Vue.prototype.workCover && to.name !== 'alarm' && to.name !== 'statistics') {
                    Vue.prototype.$creatMapPoint(Vue.prototype.$that, to.name);
                }
            } else {
            }
        }
        window.localStorage.setItem("index", -1);
        window.sessionStorage.setItem("activeRouter", to.path);
        if (from.name != null && to.name !== 'alarm' && to.name !== 'statistics') {
            if ($('.alog_box').parent().position()) {
                setTimeout(() => {
                    if ($('.alog_box') && $('.alog_box').parent().position()) {
                        $('.alog_box').parent().css('height', $('.alog_box').parents('.wrapbox').height() - $('.alog_box').parent().position().top);
                    }
                }, 400)
            }
        } else if (to.name == 'singleSite') {
            next('/site')
        }
        next();
    }
    if (to.path != '/login') {
        if (sessionStorage.loginGJZ != undefined && sessionStorage.loginGJZ == 'true') {
            Next()
        } else {
            // next({name:'login',params:{reload:1}})
            next('/login')
        }
    } else if (sessionStorage.loginGJZ != undefined && sessionStorage.loginGJZ == 'true') {
        next('/')
    } else {
        Next()
    }
});

export default router

