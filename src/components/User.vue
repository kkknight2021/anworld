<template>
  <el-container>
    <el-aside width="200px">
      <el-menu :default-openeds="['1', '3']" :default-active="$route.path" router="">
<!--      <el-submenu index="1">-->
<!--        <template slot="title"><i class="el-icon-message"></i>用户中心</template>-->
        <el-menu-item-group>
          <el-menu-item index="/User/UserInfo">个人信息</el-menu-item>
          <el-menu-item index="/User/changeUserInfo">修改信息</el-menu-item>
          <el-menu-item index="">修改密码</el-menu-item>
          <el-menu-item index="/User/volunteer">安宁志愿者</el-menu-item>
          <el-menu-item index="">退出登录</el-menu-item>
        </el-menu-item-group>
<!--        <el-submenu index="">-->
<!--          <template slot="title">志愿者服务</template>-->
<!--          <el-menu-item index="">选项4-1</el-menu-item>-->
<!--        </el-submenu>-->
<!--      </el-submenu>-->
<!--      <el-submenu index="">-->
<!--        <template slot="title"><i class="el-icon-menu"></i>导航二</template>-->
<!--        <el-menu-item-group>-->
<!--          <template slot="title">分组一</template>-->
<!--          <el-menu-item index="">选项1</el-menu-item>-->
<!--          <el-menu-item index="">选项2</el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--        <el-menu-item-group title="分组2">-->
<!--          <el-menu-item index="">选项3</el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--        <el-submenu index="">-->
<!--          <template slot="title">选项4</template>-->
<!--          <el-menu-item index="">选项4-1</el-menu-item>-->
<!--        </el-submenu>-->
<!--      </el-submenu>-->
<!--      <el-submenu index="">-->
<!--        <template slot="title"><i class="el-icon-setting"></i>导航三</template>-->
<!--        <el-menu-item-group>-->
<!--          <template slot="title">分组一</template>-->
<!--          <el-menu-item index="">选项1</el-menu-item>-->
<!--          <el-menu-item index="">选项2</el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--        <el-menu-item-group title="分组2">-->
<!--          <el-menu-item index="">选项3</el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--        <el-submenu index="">-->
<!--          <template slot="title">选项4</template>-->
<!--          <el-menu-item index="">选项4-1</el-menu-item>-->
<!--        </el-submenu>-->
<!--      </el-submenu>-->
    </el-menu>
    </el-aside>

    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>

</template>

<script>
export default {
  name: 'user',

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-container {
  height: 770px;
}
.el-menu {
  background-color: rgba(255, 255, 255, 0);
  border-right: solid 1px #FFFFFF;
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
}
.el-aside {
  background-color:  rgba(255, 255, 255, 0.5);
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-main {
  background-color: rgba(255, 255, 255, 0.381);;
  color: #333;
  text-align: center;
  line-height: 160px;

}
</style>
