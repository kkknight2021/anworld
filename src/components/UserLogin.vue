<template>
  <el-container>
    <!-- <circles></circles> -->
    <div class='LoginBox'>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" @keyup.native.enter="submitForm('ruleForm')">
          <el-form-item label="账号" prop="Username">
              <el-input type="username" v-model="ruleForm.Username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="Pass">
              <el-input type="password" v-model="ruleForm.Pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
              <el-button @click="register('register')">注册</el-button>
              <el-button @click="register('changePw')">忘记密码？</el-button>
          </el-form-item>
      </el-form>
    </div>
  </el-container>
</template>

<script>
  //import circles from './BackgroundComponents/circles'
  import sha256 from 'sha256'
  export default {
    components:{
    //circles
    },
    data() {
      var validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } else {

          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }
        else {
          callback();
        }
      };
      return {
        permissionList:{},
        salt : '',
        ruleForm: {
          Username: '',
          Pass: '',
        },
        rules: {
          Username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          Pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {//检测输入是否合法
          if (valid) {
            var username = this.ruleForm.Username;
            console.log(username)
            console.log(this.ruleForm.Pass)
            var password = sha256(sha256(this.ruleForm.Pass)+this.salt);//密码加密
            console.log(password)
            this.$axios.get("/api/login?"+"username="+username+"&password="+password).then(res=>{//发送账号密码
              console.log(res)
              if (res.data.code === 200 ) {
                this.isLoginAndJump(res)
              }
              else if (res.data.code === 303) {
                this.$axios.get("/api/logout").then(logoutRes => {
                  console.log(logoutRes)
                  this.isLoginAndJump(res)
                });

              }
              else {
                alert('username or password error');
                this.$axios.get("/api/login").then(res=>{//重新获取salt
                  console.log(res)
                  this.salt = res.data.data
                  console.log(this.salt)
                  }).catch(err=>{
                  console.log(err)
                  })
              }
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      isLoginAndJump(res) {
        var permissions = res.data.data.permissions;
          console.log(permissions)
          this.$axios.get("/api/user/getPermissions").then(res=>{
            this.permissionList = res.data.data
            console.log(this.permissionList)
          }).finally(() => {
            console.log(permissions)
            var permissionsId = []
            for(let i = 0; i < permissions.length; i++) {
              for(let j = 0; j < this.permissionList.length; j++) {
                console.log(j)
                if(this.permissionList[j]["enum"] === permissions[i]) {
                  permissionsId.push(this.permissionList[j]["id"])
                }
              }
            }
          sessionStorage.setItem('permissionsId',permissionsId)
          sessionStorage.setItem('isLogin',true); // 存入一个值
          sessionStorage.setItem('userName',this.ruleForm.Username);
          alert('submit!');
          this.$router.push('/User/UserInfo');
          })

      },
      register(classification) {
        this.$router.push({path:"/UserRegister",query:{from:this.$route.path, classification:classification}})
      },

      getMyInfo() {
        this.$axios.get("/api/user/getMyInfo").then(res=>{
          console.log(res)
        })
      }
    },
    created: function () {  //获取第一次salt
      this.$axios.get("/api/login").then(res=>{
            console.log(res)
            this.salt = res.data.data
            console.log(this.salt)
          }).catch(err=>{
            console.log(err)
          })
    }
  }
</script>

<style scoped>
.el-container {
  height: 600px;
  justify-content: center;
  flex-direction: column;
  align-items: center
}
.LoginBox {
  padding: 10px;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); */

  border-radius: 25px;
  backdrop-filter: blur(3px);
  background-color: rgba(255,255,255,0.5);
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
  border: 3px rgba(255,255,255,0.4) solid;
  border-bottom: 3px rgba(40,40,40,0.35) solid;
  border-right: 3px rgba(40,40,40,0.35) solid;
}
.el-form-item__label {
  color: #303133;
}
.el-form-item {
  margin-right: 70px;
  margin-top: 22px;
}
.LoginBox {
  position: absolute;
}

</style>
