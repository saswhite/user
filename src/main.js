import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import moment from "moment";
moment.locale("zh-cn");

Vue.use(ElementUI);

import { post, get, put, del } from "./utils/request";
Vue.prototype.routerPost = post;
Vue.prototype.routerGet = get;
Vue.prototype.routerPut = put;
Vue.prototype.routerDel = del;

Vue.prototype.getUserInfo = function() {
  let userid = localStorage.getItem("userid");
  let userInfo = get("/user/userinfo", {
    params: {
      id: userid
    }
  });
  return userInfo;
};

Vue.config.productionTip = false;

Vue.filter("timeFilter", value => {
  return moment(value).format("MMMM Do YYYY, h:mm:ss a");
});

Vue.filter("genderFilter", value => {
  if (value == 1) {
    return "男";
  } else {
    return "女";
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
