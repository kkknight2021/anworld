<template>
  <div class='formBox'>
    <el-form ref="form" :model="form" :rules="rules" label-width="90px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="form.nickName"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="form.sex" placeholder="请选择性别"  style="width:100%">
          <el-option label="男" value=1></el-option>
          <el-option label="女" value=2></el-option>
          <el-option label="其他" value=3></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职业" prop="occupation">
        <el-input v-model="form.occupation"></el-input>
      </el-form-item>
      <el-form-item label="单位/团体" prop="unit">
        <el-input v-model="form.unit"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="申请原因" prop="reason">
        <el-input type="textarea" v-model="form.reason" placeholder="来说说你成为志愿者的原因吧！不少于五十字"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="change">申请</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "improveUserInfo",
  data() {
    return {
      form: {
        username:null,
        nickName:null,
        // profilePhotoLink:null,
        email:null,
        phone:null,
        sex:null,
        occupation:null,
        unit:null,
        address:null,

        reason:null
      },

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
      },
      reason: "",

      rules: {
        // username: [
        //   { required: true, message: '无法修改', trigger: 'blur' },
        // ],
        // email: [
        //   { required: true, message: '无法修改', trigger: 'blur' },
        // ],
        nickName: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        occupation: [
          { required: true, message: '请输入职业', trigger: 'blur' },
        ],
        address: [
          { required: true, message: '请输入联系地址', trigger: 'blur' },
        ],
        unit: [
          { required: true, message: '请输入团体/单位', trigger: 'blur' },
        ],
        reason: [
          { required: true, message: '请填写申请原因', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getMyInfo() {
      this.$axios.get("/api/user/getMyInfo").then(res=>{
        console.log(res)
        let myInfo = res.data.data;

        Object.keys(this.form).forEach(key=> {
          if(key in myInfo) {
            this.form[key] = myInfo[key]
          }
        })

      })
    },
    getMyReason() {
      this.$axios.post("/api/user/getVolunteerReasons").then(res=>{
        console.log(res)
      })
    },

    async change() {
      Object.keys(this.userInfo).forEach(key=> {
        if(key in this.form) {
          this.userInfo[key] = this.form[key]
        }
      })
      Object.keys(this.user).forEach(key=> {
        if(key in this.form) {
          this.user[key] = this.form[key]
        }
      })
      this.reason = this.form.reason

      let resUserInfo = await this.$axios.post("/api/user/changeMyInfo", JSON.stringify(this.userInfo), {headers: {"Content-type": "application/json"}})
      let resUser = await this.$axios.post("/api/user/updateUser", JSON.stringify(this.user), {headers: {"Content-type": "application/json"}})
      let resReason = await this.$axios.post("/api/user/postVolunteerReason", this.reason);

      console.log(resUserInfo)
      console.log(resUser)
      console.log(resReason)

      this.$router.push({path: "/User/volunteer/waitCheck"})

    }
  },
  created() {
    this.getMyInfo()
    this.getMyReason()
  }
}

</script>

<style scoped>
.formBox {
  width: 80%;
  height: 610px;
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
