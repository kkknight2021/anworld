<template>
  <!-- 主体div -->
  <div class="main" style="">
    <!-- <el-header style="height: 10%;">
      <div class="logo" >
        <h1>安宁世界 后台管理系统</h1>
      </div>
    </el-header> -->

    <el-container style="height: 90%;width: 100% ;margin-top:2%">
      <!--侧边栏-->
      <el-aside width="15%">
        <el-menu class="el-menu-vertical-demo" router="" default-active="$route.path" style="height: 100%;" background-color="transparent" text-color="black" >
  

            <el-submenu index="1">
              <template slot="title">用户管理平台</template>
              <el-menu-item index="/Manager/manageUser"><i class="el-icon-s-help"></i>用户管理</el-menu-item>
            </el-submenu>
            
            <el-submenu index="2">
              <template slot="title">专家讲坛/知识讲堂</template>
              <el-menu-item index="/Manager/manageLectureGroup"><i class="el-icon-s-help"></i>讲坛管理</el-menu-item>
            </el-submenu>


            <el-submenu index="3">
              <template slot="title">信息交流平台</template>
              <el-menu-item index="/Manager/manageNews" ><i class="el-icon-s-help"></i>文章管理</el-menu-item>
            </el-submenu>
            
            <el-submenu index="4">
              <template slot="title">专业知识咨询平台</template>
              <el-menu-item index="/Manager/manageQuestion"><i class="el-icon-s-help"></i>知识问答管理</el-menu-item>
            </el-submenu>
              

            <el-submenu index="5">
              <template slot="title">相关机构信息平台</template>
              <el-menu-item index="/Manager/manageInstitution"><i class="el-icon-s-help"></i>机构及地图管理</el-menu-item>
            </el-submenu>

            <el-submenu index="6">
              <template slot="title">商城管理平台</template>
              <el-menu-item index="/Manager/manageGoods"><i class="el-icon-s-help"></i>商城管理</el-menu-item>
            </el-submenu>

        </el-menu>
      </el-aside>
      <div class="main">
        <breadCrumb></breadCrumb>
        <router-view></router-view>
      </div>
    </el-container>
    </div>
</template>

<script>
import breadCrumb from './breadCrumb.vue';
  export default {
  components: { breadCrumb },
    data() {
      return {
        
      }
    },

    methods: {
      
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      
      
      updateUserPermissions() {
        var headers = {'Content-Type':'application/json'};
        var data = this.$qs.stringfy({
          "userId": sessionStorage.getItem('userName'),
        })
      }
    }
  }
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  width: 100% !important;
  height: 100% !important
}
</style>


