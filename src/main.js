// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Element from 'element-ui';
import vueHeadful from 'vue-headful';
import VueScroller from 'vue-scroller';
import {commonTools} from '../static/js/common';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import '../static/css/list.css'
/*引入公共样式*/
import '../static/css/carousel.css'
/*引入公共样式*/
import '../static/css/iconfont.css'

Vue.config.productionTip = false
Vue.component('vue-headful', vueHeadful);
Vue.prototype.$commonTools = commonTools;
Vue.use(VueScroller);
Vue.use(Element, {size: 'small'});

// 超时时间
axios.defaults.timeout = 5000;
// http请求拦截器
var loadinginstace
axios.interceptors.request.use(config => {
  // element ui Loading方法
  if (config.params.showLoading) {
    loadinginstace = Element.Loading.service({fullscreen: true})
  }
  return config
}, error => {
  loadinginstace.close()
  Element.Message.error({
    message: '加载超时'
  })
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    let pass=false;
    if (!pass) {
      next({
        path: '/noMember',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

Vue.use(VueAxios, axios);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
