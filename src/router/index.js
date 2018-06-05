import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
//时政要闻
import News from '@/pages/News'
//最新发布
import Announce from '@/pages/Announce'
//社会服务
import SocialService from '@/pages/SocialService'
//各种详情页面
import NewsDetail from '@/pages/NewsDetail'
//新闻评论页面
import NewsComment from '@/pages/NewsComment'
//我的提案
import Proposal from '@/pages/Proposal'
//党员风采
import Member from '@/pages/Member'
//我的民革
import Center from '@/pages/Center'

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
    {
      path: '/socialService',
      name: 'SocialService',
      component: SocialService
    },
    {
      path: '/newsDetail/:id',
      name: 'NewsDetail',
      component: NewsDetail
    },
    {
      path: '/newsComment/:id/:typeId',
      name: 'NewsComment',
      component: NewsComment
    },
    {
      path: '/proposal',
      name: 'Proposal',
      component: Proposal
    },
    {
      path: '/member',
      name: 'Member',
      component: Member
    },
    {
      path: '/center',
      name: 'Center',
      component: Center
    },
  ]
})
