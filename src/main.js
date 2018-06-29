// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Element from 'element-ui';
import vueHeadful from 'vue-headful';
import VueScroller from 'vue-scroller';
import VDistpicker from 'v-distpicker';
import {commonTools} from '../static/js/common';
import axios from 'axios';
import qs from 'qs';
import VueAxios from 'vue-axios';
import gallery from 'img-vuer';
import VueClipboard from 'vue-clipboard2'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import '../static/css/list.css'
/*引入公共样式*/
import '../static/css/carousel.css'
/*引入公共样式*/
import '../static/css/iconfont.css'

Vue.config.productionTip = false;
Vue.component('vue-headful', vueHeadful);
Vue.component('v-distpicker', VDistpicker);
Vue.prototype.$commonTools = commonTools;
Vue.prototype.$qs = qs;
Vue.use(VueScroller);
Vue.use(gallery);
Vue.use(Element, {size: 'small'});
Vue.use(VueClipboard)


// 超时时间
axios.defaults.timeout = 5000;
// http请求拦截器
var loadinginstace;
axios.interceptors.request.use(config => {
  // element ui Loading方法
  if (config.params.showLoading) {
    loadinginstace = Element.Loading.service({fullscreen: true})
  }
  return config
}, error => {
  loadinginstace.close();
  Element.Message.error({
    message: '加载超时'
  });
  return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {// 响应成功关闭loading
  if (loadinginstace) {
    loadinginstace.close()
  }
  return data
}, error => {
  if (loadinginstace) {
    loadinginstace.close()
  }
  Element.Message.error({
    message: '加载失败'
  })
  return Promise.reject(error)
})

Vue.use(VueAxios, axios);

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    axios(commonTools.g_restUrl, {
      params: {
        i: "8",
        c: "entry",
        p: "user",
        do: "shop",
        m: "ewei_shop",
        ac: "is_leather"
      }
    })
      .then(function (response) {
        if (response.data && response.data.result && response.data.result.is_registered == "0") {
          next({
            path: '/register',
            query: {redirect: to.fullPath}
          })
        } else if (response.data && response.data.result && response.data.result.is_leather == "0") {
          next({
            path: '/noMember',
            query: {redirect: to.fullPath}
          })
        }
        else {
          next()
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  else if (to.matched.some(record => record.meta.requiresNoAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    axios(commonTools.g_restUrl, {
      params: {
        i: "8",
        c: "entry",
        p: "user",
        do: "shop",
        m: "ewei_shop",
        ac: "is_leather"
      }
    })
      .then(function (response) {
        if (response.data && response.data.result && response.data.result.is_registered == "1" && response.data.result.is_leather == "1") {
          next({
            name: 'Center',
          })
        }
        else if (response.data && response.data.result && response.data.result.is_registered == "1" && response.data.result.is_leather == "0" && to.name != "NoMember" && to.name != "Apply" && to.name != "QuickValidate" && response.data.result.check_status == 0) {
          next({
            name: 'NoMember',
          })
        }
        else if (response.data && response.data.result && response.data.result.is_registered == "1" && response.data.result.is_leather == "0" &&  response.data.result.check_status != 0 && (to.name != "NoMemberStatus" || (to.name == "NoMemberStatus" && to.params.statusId !=response.data.result.check_status))) {
          let sId = response.data.result.check_status;
          next({
            name: 'NoMemberStatus',
            params: {'statusId': sId}
          })
        }
        else if (response.data && response.data.result && response.data.result.is_registered == "0" && to.name != "Register") {
          next({
            name: 'Register',
          })
        }
        else {
          next()
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  else {
    next() // 确保一定要调用 next()
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
