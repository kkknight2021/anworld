import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import HumanResource from '@/components/HumanResource'
import Store from '@/components/Store'
import User from '@/components/User'
import UserLogin from '@/components/UserLogin'
import UserInfo from '@/components/UserComponents/UserInfo'
import UserRegister from '@/components/UserComponents/UserRegister'
import VolunteersApplication from '@/components/HRComponents/VolunteersApplication'
import Recruitment from '@/components/HRComponents/Recruitment'
import RTFnews from '@/components/NewsComponents/RTFnews'
import RTFarticle from '@/components/NewsComponents/RTFarticle'
import Join from '@/components/HRComponents/JoinComponent'
import Manager from '@/components/ManagerComponents/Manager'
import manageUser from '@/components/ManagerComponents/manageUser'
import manageNews from '@/components/ManagerComponents/manageNews'
import writeArticle from '@/components/ManagerComponents/writeArticle'
import News from '@/components/NewsComponents/News'
import PDFnews from '@/components/NewsComponents/PDFnews'
import lectureGroups from '@/components/LectureComponents/lectureGroups'
import lecture from '@/components/LectureComponents/lecture'
import manageLecture from '@/components/ManagerComponents/manageLecture'
import manageLectureGroup from '@/components/ManagerComponents/manageLectureGroup'
import manageInstitution from '@/components/ManagerComponents/manageInstitution'
import MapTest from '@/components/MapTest'
import writeLecture from '@/components/ManagerComponents/writeLecture'
import QandAList from '@/components/QandAComponents/QandAList'
import QandA from '@/components/QandAComponents/QandA'
import manageQuestion from '@/components/ManagerComponents/manageQuestion'
import manageAnswer from '@/components/ManagerComponents/manageAnswer'
import manageGoods from '@/components/ManagerComponents/manageGoods'
import changeUserInfo from "@/components/UserComponents/changeUserInfo.vue";
import volunteer from "@/components/UserComponents/volunteer.vue";
import improveUserInfo from "@/components/UserComponents/ApplyVolunteer/improveUserInfo.vue";
import applyVolunteer from "@/components/managerComponents/applyVolunteer.vue";
import waitCheck from "@/components/UserComponents/ApplyVolunteer/waitCheck.vue";
import applySuccess from "@/components/UserComponents/ApplyVolunteer/applySuccess.vue";

// import VueRouter from "vue-router"
//import { resolve } from 'webpack'Home

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect:'/Home'
    },
    {
      path: '/Home',
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
        {
          path:'changeUserInfo',
          name: 'changeUserInfo',
          component: changeUserInfo,
          meta: {
            needLogin: true
          },
        },
        {
          path:'volunteer',
          name:'volunteer',
          component: volunteer,
          meta: {
            needLogin: true
          },
          children:[
            {
              path: 'improveUserInfo',
              name: 'improveUserInfo',
              component: improveUserInfo,
            },
            {
              path: 'waitCheck',
              name: 'waitCheck',
              component: waitCheck,
            },
            {
              path: 'applySuccess',
              name: 'applySuccess',
              component: applySuccess,
            }
          ]
        }
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
        {
          path: 'applyVolunteer',
          name: 'applyVolunteer',
          component: applyVolunteer,
          meta: {
            ChineseName: '志愿者申请',
            breadNumber: 1 ,
            needLogin: true
          }
        }
      ]
    }

  ]
})

// const originalReplace = VueRouter.prototype.replace
// VueRouter.prototype.replace = function (location) {
//   return originalReplace.call(this, location).catch(err => err)
// }
