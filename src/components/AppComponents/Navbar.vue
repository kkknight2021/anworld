// components/AppComponents/Navbar.vue
<template>
  <el-menu theme="dark" :default-active="$route.path" router="" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <img class="logo" src="../../assets/logo.png" alt="安宁世界">
    <el-menu-item index="/Home">网站首页</el-menu-item>
    <el-submenu index="/User" >
      <template slot="title" >相关资讯</template>
      <el-menu-item index="/NEWS">新闻动态</el-menu-item>
      <el-menu-item index="/lectureGroups">专家讲坛</el-menu-item>
      <el-menu-item index="/QandAList">知识咨询</el-menu-item>
    </el-submenu>
    <el-menu-item index="/HumanResource/VolunteersApplication">人力资源</el-menu-item>
    <el-menu-item index="/Store">安宁商城</el-menu-item>
    <el-menu-item index="/HelloWorld">关于我们</el-menu-item>
    <el-menu-item index="/MapTest">机构查询</el-menu-item>
    <el-menu-item index="/Manager" style="display: none" id="manage">后台管理</el-menu-item>


    <el-menu-item index="/User/UserInfo" style="float:right; color:white;display: none" id="user">个人中心</el-menu-item>
    <el-menu-item index="/UserLogin" style="float:right; color:white" id="login">登录</el-menu-item>
  </el-menu>

</template>

<script>
  export default {
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      },
      jump () {
        alert('正在开发中······');
      }
    },
    updated()  {
      console.log(sessionStorage)
      if(sessionStorage.getItem('isLogin') == 'true') {
        console.log(1)
        document.getElementById('login').style['display'] = 'none';
        document.getElementById('user').style['display'] = 'list-item';
        if(sessionStorage.getItem('permissionsId').search("99") != -1 ) {
          console.log(2)
          document.getElementById('manage').style['display'] = 'list-item';
        }
        else {

          document.getElementById('manage').style['display'] = 'none';
        }
      }
      else {
        document.getElementById('login').style['display'] = 'list-item';
        document.getElementById('user').style['display'] = 'none';
        document.getElementById('manage').style['display'] = 'none';
      }
    }

  }
</script>

<style scoped>
.el-menu {
  color:white;
  background-color: rgba(255, 255, 255, 0);
}
.logo {
  float: left;
  height: 60px;
  width: 60px;
  margin-right: 10px;
}
</style>
