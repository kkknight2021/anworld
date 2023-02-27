<template>
  <div class="changeUserInfo">
    <div class='formBox'>
      <el-form ref="form"  label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="user.username"></el-input>
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input v-model="user.email"></el-input>
        </el-form-item>

        <el-form-item label="昵称">
          <el-input v-model="user.nickName"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="userInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="性别" >
            <el-select v-model="userInfo.sex" placeholder="请选择性别"  style="width:100%">
              <el-option label="男" value=1></el-option>
              <el-option label="女" value=2></el-option>
              <el-option label="其他" value=3></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="职业">
          <el-input v-model="userInfo.occupation"></el-input>
        </el-form-item>
        <el-form-item label="团体">
          <el-input v-model="userInfo.unit"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="userInfo.address"></el-input>
        </el-form-item>


        <el-form-item>
          <el-button type="primary" @click="change">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import userInfo from "./UserInfo.vue";

export default {
  name: "changeUserInfo",
  data() {
    return {
      userInfo: {
        phone:null,
        sex:null,
        occupation:null,
        unit:null,
        address:null,
      },
      sexObj: {
        "Male": "男",
        "Female": "女",
        "Unknow": "其他"
      },
      user: {
        username:null,
        nickName:null,
        profilePhotoLink:null,
        email:null,
        // createTime:null,
        // permission:null,
      }
    }
  },
  methods: {
    getMyInfo() {
      this.$axios.get("/api/user/getMyInfo").then(res=>{
        console.log(res)
        let myInfo = res.data.data;
        Object.keys(this.userInfo).forEach(key=> {
          if(key in myInfo) {
            this.userInfo[key] = myInfo[key]
          }
        })
        Object.keys(this.user).forEach(key=> {
          if(key in myInfo) {
            this.user[key] = myInfo[key]
          }
        })
        console.log(this.userInfo)
      })

    },

    async change() {
      let resUserInfo = await this.$axios.post("/api/user/changeMyInfo", JSON.stringify(this.userInfo), {headers: {"Content-type": "application/json"}})
      let resUser = await this.$axios.post("/api/user/updateUser", JSON.stringify(this.user), {headers: {"Content-type": "application/json"}})

      console.log(resUserInfo)
      console.log(resUser)
      this.getMyInfo()
    }
  },
  created() {
    this.getMyInfo();
  }


}
</script>

<style scoped>
.changeUserInfo {
  margin: 1% 20%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.formBox {
  width: 80%;
  height: 550px;
  text-align: left;
  padding: 20px 15px;

  border-radius: 25px;
  backdrop-filter: blur(3px);
  background-color: rgba(255,255,255,0.5);
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
  border: 3px rgba(255,255,255,0.4) solid;
  border-bottom: 3px rgba(40,40,40,0.35) solid;
  border-right: 3px rgba(40,40,40,0.35) solid;
}
</style>
