import Vue from 'vue'
import Router from 'vue-router'

//时政要闻
import News from '@/pages/News'
//简介
import Introduction from '@/pages/Introduction'
//最新发布
import Announce from '@/pages/Announce'
//社会服务
import SocialService from '@/pages/SocialService'
//统战工作
import UnitedWork from '@/pages/UnitedWork'
//参政议政
import Participate from '@/pages/Participate.vue'
//友好往来
import FriendlyContacts from '@/pages/FriendlyContacts'
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
//我的民革-不是会员的不同状态
import NoMemberStatus from '@/pages/NoMemberStatus'
//我的民革
import Center from '@/pages/Center'
//我的民革--积分
import CenterPoint from '@/pages/CenterPoint'
//我的民革-个人中心
import CenterHome from '@/pages/CenterHome'
//我的留言
import CenterComment from '@/pages/CenterComment'
//我的作品
import CenterWorks from '@/pages/CenterWorks'
//添加感想
import CenterWorksAdd from '@/pages/CenterWorksAdd'
//我的感想
import CenterThoughts from '@/pages/CenterThoughts'
//添加感想
import CenterThoughtsAdd from '@/pages/CenterThoughtsAdd'
//我的图片
import CenterPicture from '@/pages/CenterPicture'
//添加图片
import CenterPictureAdd from '@/pages/CenterPictureAdd'
//我的视频
import CenterVideo from '@/pages/CenterVideo'
//我的视频-添加视频
import CenterVideoAdd from '@/pages/CenterVideoAdd'
//注册
import Register from '@/pages/Register'
//快速验证
import QuickValidate from '@/pages/QuickValidate'
//入党申请
import Apply from '@/pages/Apply'
//入党申请---工作经历
import ApplyWorkExp from '@/pages/ApplyWorkExp.vue'
//入党申请的审核
import CheckApply from '@/pages/CheckApply'
//读书邀请的审核
import CheckRead from '@/pages/CheckRead'
//提案的审核
import CheckProposal from '@/pages/CheckProposal'
//个人中心未处理列表
import CenterUnreadList from '@/pages/CenterUnreadList'

//书友会-公共
import Public from '@/pages/read/Public'
//图书中心
import BooksCenter from '@/pages/read/BooksCenter'
//心得笔记
import NotesCenter from '@/pages/read/NotesCenter'
//约伴读书
import ShareReadCenter from '@/pages/read/ShareReadCenter'
//心得笔记-详情
import NotesCenterDetail from '@/pages/read/NotesCenterDetail'
//心得笔记-留言
import NoteComment from '@/pages/read/NoteComment'

//书友会-个人
import Personal from '@/pages/read/Personal'
//我的图书
import BookList from '@/pages/read/BookList'
//我的私人图书详情
import BookDetail from '@/pages/read/BookDetail'
//公开图书详情
import BookDetailPublic from '@/pages/read/BookDetailPublic'
//添加图书
import AddBook from '@/pages/read/AddBook'
//我的笔记
import NoteList from '@/pages/read/NoteList'
//添加笔记
import AddNote from '@/pages/read/AddNote'
//我的笔记详情
import NoteDetail from '@/pages/read/NoteDetail'
//邀请读书
import AskRead from '@/pages/read/AskRead'

//入党申请书
import ApplicationOne from '@/pages/application/one'
import ApplicationTwo from '@/pages/application/two'
import ApplicationThree from '@/pages/application/three'
import ApplicationFour from '@/pages/application/four'
import ApplicationFive from '@/pages/application/five'
import ApplicationSix from '@/pages/application/six'
import ApplicationDegree from '@/pages/application/degree'
import ApplicationResume from '@/pages/application/resume'
import ApplicationAward from '@/pages/application/award'
import ApplicationPartyTeam from '@/pages/application/partyteam'
import ApplicationFamily from '@/pages/application/family'
import ApplicationRelationship from '@/pages/application/relationship'

//会议
import AddMeeting from '@/pages/meeting/AddMeeting'
import AddSummary from '@/pages/meeting/AddSummary'
import MeetingList from '@/pages/MeetingList'
import SummaryDetail from '@/pages/meeting/SummaryDetail'

Vue.use(Router)

export default new Router({

  routes: [{
      path: '/intro',
      name: 'Introduction',
      component: Introduction
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
      path: '/unitedWork',
      name: 'UnitedWork',
      component: UnitedWork
    },
    {
      path: '/friendlycontacts',
      name: 'FriendlyContacts',
      component: FriendlyContacts
    },
    {
      path: '/participate',
      name: 'Participate',
      component: Participate
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
      path: '/noMemberStatus/:statusId',
      name: 'NoMemberStatus',
      component: NoMemberStatus,
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
      path: '/center/centerpoint',
      name: 'CenterPoint',
      component: CenterPoint,
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
      path: '/center/works',
      name: 'CenterWorks',
      component: CenterWorks,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/center/addworks/:workId',
      name: 'CenterEditAddWorks',
      component: CenterWorksAdd,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/center/addworks',
      name: 'CenterAddWorks',
      component: CenterWorksAdd,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/center/thoughts',
      name: 'CenterThoughts',
      component: CenterThoughts,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/center/addthoughts/:thoughtId',
      name: 'CenterEditThoughts',
      component: CenterThoughtsAdd,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/center/addthoughts',
      name: 'CenterAddThoughts',
      component: CenterThoughtsAdd,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/center/picture',
      name: 'CenterPicture',
      component: CenterPicture,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/center/addpicture',
      name: 'CenterPictureAdd',
      component: CenterPictureAdd,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/center/video',
      name: 'CenterVideo',
      component: CenterVideo,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/center/addvideo',
      name: 'CenterVideoAdd',
      component: CenterVideoAdd,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/center/checkApply/:id',
      name: 'CheckApply',
      component: CheckApply,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/center/checkRead',
      name: 'CheckRead',
      component: CheckRead,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/center/checkProposal/:id',
      name: 'CheckProposal',
      component: CheckProposal,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/center/centerUnreadList/:type',
      name: 'CenterUnreadList',
      component: CenterUnreadList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        requiresNoAuth: true
      }
    },
    {
      path: '/quickValidate',
      name: 'QuickValidate',
      component: QuickValidate,
      meta: {
        requiresNoAuth: true
      }
    },
    {
      path: '/apply',
      name: 'Apply',
      component: Apply,
      meta: {
        requiresNoAuth: true
      }
    },{
      path: '/applyworkexp',
      name: 'ApplyWorkExp',
      component: ApplyWorkExp,
      meta: {
        requiresNoAuth: false
      }
    },
    {
      path: '/public/',
      component: Public,
      children: [{
          path: 'booksCenter',
          component: BooksCenter,
          name: 'BooksCenter'
        },
        {
          path: 'notesCenter',
          component: NotesCenter,
          name: 'NotesCenter'
        },
        {
          path: 'shareReadCenter',
          component: ShareReadCenter,
          name: 'ShareReadCenter'
        },
        {
          path: 'notesCenterDetail/:noteId',
          component: NotesCenterDetail,
          name: 'NotesCenterDetail'
        },
        {
          path: 'bookDetailPublic/:id',
          component: BookDetailPublic,
          name: 'BookDetailPublic'
        }
      ],
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/personal/',
      component: Personal,
      children: [{
          path: 'bookList',
          component: BookList,
          name: 'BookList'
        },
        {
          path: 'bookDetail/:id',
          component: BookDetail,
          name: 'BookDetail'
        },
        {
          path: 'addBook/:id',
          component: AddBook,
          name: 'EditBook'
        }, {
          path: 'addBook',
          component: AddBook,
          name: 'AddBook'
        },
        {
          path: 'noteList',
          component: NoteList,
          name: 'NoteList'
        },
        {
          path: 'addNote',
          component: AddNote,
          name: 'AddNote'
        },
        {
          path: 'noteDetail/:noteId',
          component: NoteDetail,
          name: 'NoteDetail'
        },
        {
          path: 'askRead',
          component: AskRead,
          name: 'AskRead'
        }
      ],
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/noteComment/:id/:typeId',
      component: NoteComment,
      name: 'NoteComment',
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/application/one',
      component: ApplicationOne,
      name: 'ApplicationOne',
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/application/two',
      component: ApplicationTwo,
      name: 'ApplicationTwo',
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/application/three',
      component: ApplicationThree,
      name: 'ApplicationThree',
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/application/four',
      component: ApplicationFour,
      name: 'ApplicationFour',
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/application/five',
      component: ApplicationFive,
      name: 'ApplicationFive',
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/application/six',
      component: ApplicationSix,
      name: 'ApplicationSix',
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/application/degree',
      component: ApplicationDegree,
      name: 'ApplicationDegree',
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/application/resume',
      component: ApplicationResume,
      name: 'ApplicationResume',
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/application/award',
      component: ApplicationAward,
      name: 'ApplicationAward',
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/application/partyteam',
      component: ApplicationPartyTeam,
      name: 'ApplicationPartyTeam',
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/application/family',
      component: ApplicationFamily,
      name: 'ApplicationFamily',
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/application/relationship',
      component: ApplicationRelationship,
      name: 'ApplicationRelationship',
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/meeting/addmeeting',
      name: 'AddMeeting',
      component: AddMeeting,
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/meetinglist',
      name: 'MeetingList',
      component: MeetingList,
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/meetinglist/addsummary',
      name: 'AddSummary',
      component: AddSummary,
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/meetinglist/summarydetail',
      name: 'SummaryDetail',
      component: SummaryDetail,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
