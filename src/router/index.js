import Vue from 'vue'
import Router from 'vue-router'
const HelloWorld = () => import('@/components/HelloWorld')
const Home = () => import('@/components/Home')
const HumanResource = () => import('@/components/HumanResource')
const Store = () => import('@/components/Store')
const User = () => import('@/components/User')
const UserLogin = () => import('@/components/UserLogin')
const UserInfo = () => import('@/components/UserComponents/UserInfo')
const UserRegister = () => import('@/components/UserComponents/UserRegister')
const VolunteersApplication = () => import('@/components/HRComponents/VolunteersApplication')
const Recruitment = () => import('@/components/HRComponents/Recruitment')
const RTFnews = () => import('@/components/NewsComponents/RTFnews')
const RTFarticle = () => import('@/components/NewsComponents/RTFarticle')
const Join = () => import('@/components/HRComponents/JoinComponent')
const Manager = () => import('@/components/ManagerComponents/Manager')
const manageUser = () => import('@/components/ManagerComponents/manageUser')
const manageNews = () => import('@/components/ManagerComponents/manageNews')
const writeArticle = () => import('@/components/ManagerComponents/writeArticle')
const News = () => import('@/components/NewsComponents/News')
const PDFnews = () => import('@/components/NewsComponents/PDFnews')
const lectureGroups = () => import('@/components/LectureComponents/lectureGroups')
const lecture = () => import('@/components/LectureComponents/lecture')
const manageLecture = () => import('@/components/ManagerComponents/manageLecture')
const manageLectureGroup = () => import('@/components/ManagerComponents/manageLectureGroup')
const manageInstitution = () => import('@/components/ManagerComponents/manageInstitution')
const MapTest = () => import('@/components/MapTest')
const writeLecture = () => import('@/components/ManagerComponents/writeLecture')
const QandAList = () => import('@/components/QandAComponents/QandAList')
const QandA = () => import('@/components/QandAComponents/QandA')
const manageQuestion = () => import('@/components/ManagerComponents/manageQuestion')
const manageAnswer = () => import('@/components/ManagerComponents/manageAnswer')
const manageGoods = () => import('@/components/ManagerComponents/manageGoods')

// import VueRouter from "vue-router"
//import { resolve } from 'webpack'Home

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/Home',
      redirect: {name: "Home"}
    },
    {
      path: '/',
      name: 'Home',
      component: Home
      //component: resolve => require(['@/components/Home.vue'],resolve)
    },
    {
      path: '/QandAList',
      name: 'QandAList',
      component: QandAList
    },
    {
      path: '/MapTest',
      name: 'MapTest',
      component: MapTest
    },
    {
      path: '/lectureGroups',
      name: 'lectureGroups',
      component: lectureGroups,
    },
    {
      path: '/lecture',
      name: 'lecture',
      component: lecture,
    },
    
    {
      path: '/QandA',
      name: 'QandA',
      component: QandA,
    },
    {
      path: '/News',
      name: 'News',
      component: News,
      children:[
        {
          path: 'RTFnews',
          name: 'RTFnews',
          component: RTFnews,
        },
        {
          path: 'PDFnews',
          name: 'PDFnews',
          component: PDFnews,
        }
      ],
    },
    {
      path: '/RTFarticle',
      name: 'RTFarticle',
      component: RTFarticle,
    },
    {
      path: '/Store',
      name: 'Store',
      component: Store,
    },
    {
      path: '/HumanResource',
      name: 'HumanResource',
      component: HumanResource,
      children:[
        {
          path: 'VolunteersApplication',
          name: 'VolunteersApplication',
          component: VolunteersApplication,
        },
        {
          path: 'Recruitment',
          name: 'Recruitment',
          component: Recruitment,
        },
        {
          path: 'Join',
          name: 'Join',
          component: Join,
        }
      ],
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/UserLogin',
      name: 'UserLogin',
      component: UserLogin
    },
    {
      path:'/UserRegister',
      name: 'UserRegister',
      component: UserRegister
    },
    {
      path: '/User',
      name: 'User',
      component: User,
      children:[
        {
          path:'UserInfo',
          name: 'UserInfo',
          component: UserInfo,
          meta: {
            needLogin: true
          },
        },
        
      ]
    },
    {
      path: '/Manager',
      name: 'Manager',
      component: Manager,
      meta: {
        ChineseName: '首页',
        breadNumber: 0,
        needLogin: true
      },
      children:[
        {
          path: 'manageQuestion',
          name: 'manageQuestion',
          component: manageQuestion,
          meta: {
            ChineseName: '问题管理',
            breadNumber: 1,
            needLogin: true
          },
        },
        {
          path:'writeArticle',
          name:'writeArticle',
          component: writeArticle,
          meta: {
            ChineseName: '文章编辑',
            breadNumber: 2 ,
            needLogin: true
          },
        },
        {
          path:'manageAnswer',
          name: 'manageAnswer',
          component: manageAnswer,
          meta: {
            ChineseName: '回答管理',
            breadNumber: 2,
            needLogin: true
          },
        },
       
        {
          path:'manageUser',
          name: 'manageUser',
          component: manageUser,
          meta: {
            ChineseName: '用户管理',
            breadNumber: 1,
            needLogin: true
          },
        },
        {
          path:'manageNews',
          name:'manageNews',
          component: manageNews,
          meta: {
            ChineseName: '新闻管理',
            breadNumber: 1,
            needLogin: true
          },
        },
        {
          path:'writeArticle',
          name:'writeArticle',
          component: writeArticle,
          meta: {
            ChineseName: '文章编辑',
            breadNumber: 2 ,
            needLogin: true
          },
        },
        {
          path:'manageLectureGroup',
          name:'manageLectureGroup',
          component: manageLectureGroup,
          meta: {
            ChineseName: '讲坛分组',
            breadNumber: 1 ,
            needLogin: true
          },
        },
        {
          path:'manageLecture',
          name:'manageLecture',
          component: manageLecture,
          meta: {
            ChineseName: '分组内容',
            breadNumber: 2 ,
            needLogin: true
          },
        },
        {
          path:'writeLecture',
          name:'writeLecture',
          component: writeLecture,
          meta: {
            ChineseName: '讲坛编辑',
            breadNumber: 3 ,
            needLogin: true
          },
        },
        {
          path:'manageInstitution',
          name: 'manageInstitution',
          component: manageInstitution,
          meta: {
            ChineseName: '机构及地图管理',
            breadNumber: 1,
            needLogin: true
          },
        },
        {
          path:'manageGoods',
          name:'manageGoods',
          component: manageGoods,
          meta: {
            ChineseName: '商品编辑',
            breadNumber: 1 ,
            needLogin: true
          },
        },
      ]
    }

  ]
})

// const originalReplace = VueRouter.prototype.replace
// VueRouter.prototype.replace = function (location) {
//   return originalReplace.call(this, location).catch(err => err)
// }