// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

import  qs from 'qs'

//import store from './store/index.js'

// import Global from '../config/Global'//引用文件
// Vue.prototype.GLOBAL = Global//挂载到Vue实例上面

Vue.use(ElementUI);
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
//axios.defaults.baseURL = '/api'
//axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue() // event Bus 用于无关系组件间的通信。

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<app></app>',
  //store
})


router.beforeEach(function(to, from, next) {
  if (to.meta.needLogin) {
    //页面是否需要登录
    if (window.sessionStorage.getItem('isLogin') == 'true') {
      
      next(); //表示已经登录
    } else {
      //next可以传递一个路由对象作为参数L 表示需要跳转到的页面
      next({
        name: "UserLogin"
      });
    }
  } else {
    //表示不需要登录
    next(); //继续往后走
  }
});

