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
//我的作品
import CenterWorks from '@/pages/CenterWorks'
//我的感想
import CenterFeedback from '@/pages/CenterFeedback'
//我的图片
import CenterPicture from '@/pages/CenterPicture'
//我的视频
import CenterVideo from '@/pages/CenterVideo'
//注册
import Register from '@/pages/Register'
//快速验证
import QuickValidate from '@/pages/QuickValidate'
//入党申请
import Apply from '@/pages/Apply'
//入党申请的审核
import CheckApply from '@/pages/CheckApply'

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
      meta: {
        requiresNoAuth: true
      }
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
        requiresAuth: false
      }
    },
    {
      path: '/center/works',
      name: 'CenterWorks',
      component: CenterWorks,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/center/feedback',
      name: 'CenterFeedback',
      component: CenterFeedback,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/center/picture',
      name: 'CenterPicture',
      component: CenterPicture,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/center/video',
      name: 'CenterVideo',
      component: CenterVideo,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/center/checkApply',
      name: 'CheckApply',
      component: CheckApply,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        requiresNoAuth: false
      }
    },
    {
      path: '/quickValidate',
      name: 'QuickValidate',
      component: QuickValidate,
      meta: {
        requiresNoAuth: false
      }
    },
    {
      path: '/apply',
      name: 'Apply',
      component: Apply,
      meta: {
        requiresNoAuth: false
      }
    },
  ]
})
