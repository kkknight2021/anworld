<template>
    <el-descriptions class="margin-top" title="用户信息" :column="3" :size="size" border>
        <template slot="extra">
          <el-button type="primary" size="small" @click="logout">退出登录</el-button>
        </template>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            用户名
          </template>
          testUser
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            手机号
          </template>
          13434690890
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            居住地
          </template>
          广州市
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            备注
          </template>
          <el-tag size="small">暨南大学</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            联系地址
          </template>
          广东省广州市番禺区兴业大道855号暨南大学番禺校区
        </el-descriptions-item>
      </el-descriptions>
</template>

<script>
export default {
  name:'UserInfo',
  methods: {
    logout() {
      this.$axios.get("/api/logout");
      this.$router.push('/UserLogin');
      sessionStorage.setItem('isLogin',false);
      sessionStorage.removeItem('userName');
    }
  }
}
</script>

