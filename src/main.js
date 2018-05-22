// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Carousel,CarouselItem,Tabs,TabPane,Switch,Table,TableColumn} from 'element-ui';
import vueHeadful from 'vue-headful';
import VueScroller from 'vue-scroller';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App'
import router from './router'


Vue.config.productionTip = false
Vue.component('vue-headful', vueHeadful);
Vue.use(VueScroller);
Vue.use(VueAxios, axios);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Switch);
Vue.use(Table);
Vue.use(TableColumn);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
