import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const state = {
  mainState: true,
  toggle: false,
  websocket: {},
  loction: 0,
  compontIsShow: false,
  transitObj: {
    transitId: null,
    time: null
  }, //点击底部，公交站Id
  isnum: 0,
  last: 0,
  now: 0,
  selectId: null,
  selectBoolean: "noSelect",
  checkedArray: {},
  isClick: false,
  nowTagName: "",
  btnSwitch: true,
  haveLcd: 0,
  nowSiteName: ""
};
const getters = {
  getMain(state) {
    return state.mainState;
  },
  websocketData(state) {
    return state.websocket;
  },
  getLoction(state) {
    return state.loction;
  },
  getterisnum(state) {
    return state.isnum;
  },
  getcheckedArray(state) {
    return state.checkedArray;
  },
  getNow(state) {
    return state.now;
  }
};
const mutations = {
  changeNow(state, data) {
    state.now = data;
  },
  changeMain(state) {
    state.mainState = !state.mainState;
  },
  toggleNav(state) {
    state.toggle = !state.toggle;
  },
  get_WebsocketData(state, data) {
    if (data.msgid == "" || data.msg == undefined) return false;
    var compare = function(obj1, obj2) {
      if (obj1.id) {
        var val1 = obj1.id;
        var val2 = obj2.id;
      } else if (obj1.lamphouseid) {
        var val1 = obj1.lamphouseid;
        var val2 = obj2.lamphouseid;
      } else if (obj1.stationid) {
        var val1 = obj1.stationid;
        var val2 = obj2.stationid;
      }
      if (val1 < val2) {
        return -1;
      } else if (val1 > val2) {
        return 1;
      } else {
        return 0;
      }
    };
    for (let key of Object.keys(data.msg)) {
      let n = data.msgcode + "";
      let a = 0;
      n = n.charAt(n.length - 1);
      if (
        n.search("4") != -1 ||
        (n.search("5") != -1 && data.msgcode != 202005)
      ) {
        if (typeof data.msg[key] == "object") {
          // data.msg[key].sort(compare)
        }
      }
    }
    state.websocket[data.msgcode] = {};
    state.websocket[data.msgcode] = data;
    Vue.set(state.websocket, 0, data);
    delete state.websocket[0];
    // console.log(state.websocket)
    if (data.msgcode == 204004) {
      for (let i = 0; i < data.msg.lcds.length; i++) {
        for (let s = 0; s < Vue.prototype.$arrMapPoint.all.length; s++) {
          if (
            data.msg.lcds[i].stationid ==
            Vue.prototype.$arrMapPoint.all[s].siteid
          ) {
            Vue.prototype.$arrMapPoint.all[s].haveLcd = 1;
          }
        }
      }
      window.sessionStorage.setItem(
        "filtersMap",
        JSON.stringify(Vue.prototype.$arrMapPoint.all)
      );
    }
  },
  LOCTION(state, data) {
    state.loction = data;
  },
  changeTransitId(state, data) {
    state.transitObj = data;
  },
  changeisnum(state, data) {
    state.isnum = data;
  },
  LAST(state, data) {
    state.last = data;
  }
};
const actions = {
  comMain(context) {
    context.commit("true");
  },
  getWebsocketData({ commit }, data) {
    commit("get_WebsocketData", data);
  },
  setLoction({ commit }, data) {
    commit("LOCTION", data);
  },
  setisnum({ commit }, data) {
    commit("changeisnum", data);
  },
  setLast({ commit }, data) {
    commit("LAST", data);
  },
  setNow({ commit }, data) {
    commit("changeNow", data);
  }
};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

export default store;
