import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
//时政要闻
import News from '@/pages/News'
//最新发布
import Announce from '@/pages/Announce'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/news',
      name: 'News',
      component: News
    },
    {
      path: '/announce',
      name: 'Announce',
      component: Announce
    },
  ]
})
