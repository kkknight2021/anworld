<template>
  <div class="userinfo">
    <div class="headPhoto" >
      <img
        style="width:100%;height: 100%;border-radius: 100px"
        :src="userInfo.headPhoto"
        class="image"
      >
    </div>

    <el-descriptions :column="1" border>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          用户名
        </template>
        {{userInfo.username}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user-solid"></i>
          昵称
        </template>
        {{userInfo.nickName}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-view"></i>
          性别
        </template>
        {{sexObj[userInfo.sex]}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-phone"></i>
          手机号
        </template>
        {{userInfo.phone}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-message"></i>
          电子邮箱
        </template>
        {{userInfo.email}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-s-custom"></i>
          职业
        </template>
        {{userInfo.occupation}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          团体/单位
        </template>
        <el-tag size="small">{{userInfo.unit}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location"></i>
          联系地址
        </template>
        {{userInfo.address}}

      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        headPhoto: require("@/assets/个人中心/R-C.png"),
        username: "kkknight",
        nickName: "AAA",
        phone: "13434690890",
        email: "1367512023@qq.com",
        occupation: "学生",
        unit: "暨南大学",
        address: "广东省广州市番禺区兴业大道855号暨南大学番禺校区",

        sex: "",
      },
      sexObj: {
        "Male": "男",
        "Female": "女",
        "Unknow": "其他"
      }
    }
  },
  name:'UserInfo',
  methods: {
    logout() {
      this.$axios.get("/api/logout");
      this.$router.push('/UserLogin');
      sessionStorage.setItem('isLogin',false);
      sessionStorage.removeItem('userName');
    },
    getMyInfo() {
      this.$axios.get("/api/user/getMyInfo").then(res=>{
        console.log(res)
        let myInfo = res.data.data;
        Object.keys(myInfo).forEach(key=> {
          this.userInfo[key] = myInfo[key]
        })
        console.log(this.userInfo)
      })
    }
  },
  created() {
    this.getMyInfo();
  }
}
</script>

<style scoped>
.userinfo {
  margin: 1% 20%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

 .headPhoto {
   float: left;
   width: 130px;
   height: 130px;
   border-radius: 100px;
   /*display:inline-block;*/
   margin-bottom: 30px;
 }
</style>
