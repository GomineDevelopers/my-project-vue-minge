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
//编辑提案
import ProposalEdit from '@/pages/ProposalEdit'
//党员风采
import Member from '@/pages/Member'
//我的民革-不是会员
import NoMember from '@/pages/NoMember'
//我的民革
import Center from '@/pages/Center'
//我的民革-个人中心
import CenterHome from '@/pages/CenterHome'
//我的留言
import CenterComment from '@/pages/CenterComment'
//注册
import Register from '@/pages/Register'
//快速注册
import QuickRegister from '@/pages/QuickRegister'

Vue.use(Router)

export default new Router({
  routes: [{
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
      path: '/proposal/edit',
      name: 'ProposalEdit',
      component: ProposalEdit
    },
    {
      path: '/member',
      name: 'Member',
      component: Member
    },
    {
      path: '/noMember',
      name: 'NoMember',
      component: NoMember,
    },
    {
      path: '/center',
      name: 'Center',
      component: Center,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/center/comment',
      name: 'CenterComment',
      component: CenterComment,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/center/home',
      name: 'CenterHome',
      component: CenterHome,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/quickRegister',
      name: 'QuickRegister',
      component: QuickRegister
    },
  ]
})
