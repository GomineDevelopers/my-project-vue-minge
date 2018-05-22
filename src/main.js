// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Carousel,CarouselItem,Tabs,TabPane,Switch} from 'element-ui';
import vueHeadful from 'vue-headful';
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.component('vue-headful', vueHeadful);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Switch);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
