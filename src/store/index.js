import Vue from "vue"
import Vuex from "vuex"
 
Vue.use(Vuex);
 
export default new Vuex.Store({
    state:{
        userName: "asas",
        isLogin: false
    },
    mutations:{
        save_userName(state,userName){
            state.userName = userName;
        },
        save_isLogin(state,isLogin){
            state.isLogin = isLogin;
        },
    }
})