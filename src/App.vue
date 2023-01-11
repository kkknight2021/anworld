// App.vue

<template>
  <div id="app">
    <el-header class="header-parent-class">
      <mynavbar></mynavbar>
    </el-header>
    
    <div class="contain">
      <router-view></router-view>
    </div>
    
    <!-- <router-view></router-view> -->
    <myfooter></myfooter>
  </div>
</template>


<script>
import mynavbar from './components/AppComponents/Navbar.vue'
import myfooter from './components/AppComponents/footer.vue'

export default {
  name: 'app',
  components: {
    mynavbar,
    myfooter
  },
  created () {
    sessionStorage.setItem('isLogin',false); 
    sessionStorage.setItem('permissionsId','')
  }
}
</script>

<style scoped>
#app {
  background-image: url(assets/background.png);
	background-repeat: no-repeat;
	background-size: cover;

  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  
  /* height:auto !important;
  height:100vh;
  min-height:100vh */
}
.contain {
  height:auto !important;
  /* height:80vh; */
  min-height:80vh
}
.el-footer {
  display: flex;
  height: 4vh;
  width: 100%;
  align-items: center;
  display: flex;
  background-color: rgba(255, 255, 255, 0);
}


</style> 