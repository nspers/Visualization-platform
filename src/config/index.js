const axios = require("axios");
import { baseUrl } from "./env";
import { Message, Notification, MessageBox } from "element-ui";
import qs from "qs";
axios.default.timeout = 5000;
axios.default.baseUrl = baseUrl;

//axios.defaults.withCredentials = true
//axios.default.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
let msgType = {
  1003: {
    1: "开启",
    2: "关闭"
  },
  1004: {
    1: "开启",
    2: "关闭",
    3: "重启",
    4: "亮度",
    5: "音量调节"
  },
  1005: {
    1: "开启",
    2: "关闭",
    3: "重启",
    4: "亮度调节",
    5: "音量调节",
    6: "自动调光"
  },
  1006: {
    1: "闭合回路",
    2: "读取回路",
    0: "断开回路"
  }
};
//请求拦截
axios.interceptors.request.use(
  config => {
    if (config.data != null && config.data.msg != undefined) {
      let varctorl = msgType[config.data.modulecode][config.data.msg.cmdtype];
      return MessageBox.confirm(
        "确定要进行" + varctorl + "操作吗？",
        "操作提醒",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        return config;
      });
    } else {
      return config;
    }
  },
  error => {
    return Promise.error(error);
  }
);

//响应拦截
axios.interceptors.response.use(
  response => {
    // console.log(response);

    if (response.data.code == 7) {
      sessionStorage.clear();
      location.reload();
    } else if (response.data.code == 401) {
      Message({
        message: response.data.message,
        type: "warning",
        duration: 3000,
        offset: 150
      });
      return Promise.resolve(response);
    }
    if (response.status === 200) {
      if (response.data.code && response.data.code == 502) {
        Notification({
          title: "警告",
          message: "登录信息已过期，请重新登录！",
          type: "warning"
        });
        sessionStorage.clear();
        setTimeout(() => {
          location.reload();
        }, 2000);
        return;
      }
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    if (error) {
      // console.log(error.response);
      if (error.response.data.code === 501) {
        Notification({
          title: "警告",
          message: "登录信息已过期，请重新登录！",
          type: "warning"
        });
        sessionStorage.clear();
        setTimeout(() => {
          location.reload();
        }, 2000);
        return;
      } else if (error.response.data.code === 500) {
        Notification({
          title: "警告",
          message: error.response.data.message,
          type: "warning"
        }).then(() => {
          return Promise.reject(error);
        });
      } else if (error.response.data == "坏的凭证") {
        Notification({
          title: "警告",
          message: "账号密码错误！请重试",
          type: "warning"
        }).then(() => {
          return Promise.reject(error);
        });
      }
      Notification({
        title: "警告",
        message: "服务器错误，请重试！",
        type: "warning"
      }).then(() => {
        return Promise.reject(error);
      });
    } else {
      // console.log(error);
    }
  }
);

// 自定义判断元素类型JS
function toType(obj) {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase();
}
// 参数过滤函数
function filterNull(o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key];
    }
    if (toType(o[key]) === "string") {
      o[key] = o[key].trim();
    } else if (toType(o[key]) === "object") {
      o[key] = filterNull(o[key]);
    } else if (toType(o[key]) === "array") {
      o[key] = filterNull(o[key]);
    }
  }
  return o;
}

function apiAxios(method, url, params) {
  return new Promise((resolve, reject) => {
    // if (params) {
    //   params = filterNull(params)
    // }
    axios({
      method: method,
      url: url,
      data: method === "POST" || method === "PUT" ? params : null,
      params: method === "GET" || method === "DELETE" ? params : null,
      baseURL: axios.default.baseUrl,
      withCredentials: true
    })
      .then(res => {
        if (params && params.msg) {
          let varctorl = "";
          for (var key in msgType) {
            if (key == params.modulecode) {
              varctorl = msgType[key][params.msg.cmdtype];
            }
          }
          if (res != undefined && res.data.code == 1) {
            Message({
              message: varctorl + "命令已发送！等待设备响应",
              type: "success",
              duration: 3000,
              offset: 150
            });
          }
        }
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// 返回在vue模板中的调用接口
export default {
  get: function(url, params) {
    return apiAxios("GET", url, params);
  },
  post2: function(url, params) {
    return apiAxios("POST", url, qs.stringify(params));
  },
  post: function(url, params) {
    return apiAxios("POST", url, params);
  },
  put: function(url, params) {
    return apiAxios("PUT", url, params);
  },
  delete: function(url, params) {
    return apiAxios("DELETE", url, params);
  }
};
