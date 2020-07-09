let baseUrl = "",
  BaseWs = "";

if (process.env.NODE_ENV == "development") {
  /***本地***/
  baseUrl = "/api";
  //   BaseWs = "ws://192.168.7.50:9100/websocket";
  BaseWs = "ws://118.190.55.119:9100/websocket";
} else if (process.env.NODE_ENV == "test") {
  /***TEST***/
  baseUrl = "/scs";
  BaseWs = "ws://118.190.55.119:9100/websocket";
} else if (process.env.NODE_ENV == "production") {
  /***生产***/
  baseUrl = "/scs";
  BaseWs = "ws://223.0.8.11:9100/websocket";
}
// BaseWs = "ws://223.0.8.11:9100/websocket";
export { baseUrl, BaseWs };
