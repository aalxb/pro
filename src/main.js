// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import lrz from 'lrz'
import router from './router'
import App from './App'
import store from './assets/vuex/store'
import {BASE_URL, IMG_URL} from "./assets/axios/https"
import axios from 'axios'
import  { LoadingPlugin, ToastPlugin, WechatPlugin, ConfirmPlugin, AlertPlugin } from 'vux'
import qs from 'qs'
import {formatTimestamp} from './assets/common'

Vue.use(LoadingPlugin);
Vue.use(ToastPlugin);
Vue.use(WechatPlugin);
Vue.use(ConfirmPlugin);
Vue.use(AlertPlugin);


Vue.prototype.$http = axios;
Vue.prototype.BASE_URL = BASE_URL;
Vue.prototype.IMG_URL = IMG_URL;
Vue.prototype.lrz = lrz;
Vue.prototype.qs = qs;
Vue.prototype.formatTimestamp = formatTimestamp;
FastClick.attach(document.body);

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  Vue.$vux.alert.hide();
  Vue.$vux.confirm.hide();
  Vue.$vux.loading.hide();
  Vue.$vux.toast.hide();
  if (to.hasOwnProperty('meta') && to.meta.hasOwnProperty('title')) {
    document.title = to.meta.title;
  } else {
    document.title = '';
  }
  next();
});

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app-box');

