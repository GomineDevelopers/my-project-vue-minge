// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Carousel,CarouselItem,Tabs,TabPane,Switch,Table,TableColumn,Col,Row} from 'element-ui';
import vueHeadful from 'vue-headful';
import VueScroller from 'vue-scroller';
import {formatDate,formatHour,g_restUrl} from '../static/js/common';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App'
import router from './router'

import '../static/css/list.css' /*引入公共样式*/
import '../static/css/carousel.css' /*引入公共样式*/

Vue.config.productionTip = false
Vue.component('vue-headful', vueHeadful);

Vue.prototype.$formatDate = formatDate;
Vue.prototype.$formatHour = formatHour;

Vue.use(VueScroller);
Vue.use(VueAxios, axios);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Tabs);
Vue.use(Row);
Vue.use(Col);
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
