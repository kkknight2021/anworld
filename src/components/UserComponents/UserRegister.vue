<template>
  <el-container>
    <div class='registerBox'>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <template v-if="this.classification === 'register'">
          <el-form-item label="用户名" prop="username" >
              <el-input type="username" v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="验证密码" prop="password2">
            <el-input type="password" v-model="ruleForm.password2" autocomplete="off"></el-input>
          </el-form-item>
        </template>
        <template v-if="this.classification === 'changePw'">
          <el-form-item label="新密码" prop="password">
              <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="验证新密码" prop="password2">
            <el-input type="password" v-model="ruleForm.password2" autocomplete="off"></el-input>
          </el-form-item>
        </template>
        <el-form-item label="邮箱" prop="email">
            <el-input type="email" v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="verificationCode" :inline="true">
            <el-input type="verificationCode" v-model="ruleForm.verificationCode" autocomplete="off" style="width:70%;float:left"></el-input>
            <el-button @click="getVerificationCode('ruleForm')" style="width:30%;float:right">获取验证码</el-button>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="enroll('ruleForm')" >确认</el-button>
            <el-button @click="returnFrom('ruleForm')">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-container>
</template>

<script>
  import qs from 'qs'
  import AES from "@/common/AES.js";
  import sha256 from 'sha256'
  export default {
    components:{
    //circles
    },
    created() {

    },
    data() {
      var validateUsername = (rule, value, callback) => {
        if (value === '' && this.classification === 'register') {
          callback(new Error('请输入用户名'));
          this.validForm.name = false
        }
        else if(value.length < 3){
          callback(new Error('用户名长度要大于或等于3'));
          this.validForm.name = false
        }
        else if(value.length > 10){
          callback(new Error('用户名长度要小于或等于10'));
          this.validForm.name = false
        }
        else {
          this.validForm.name = true
          callback();
        }
      };
      var validatePassword = (rule, value, callback) => {
        if (value === '') {
          this.validForm.password = false
          callback(new Error('请输入密码'));
        }
        else {
          var passwordreg = /(?=.*\d)(?=.*[a-zA-Z]).{6,16}/
          if (!passwordreg.test(value)) {
            this.validForm.password = false
            callback(new Error('密码必须由数字、字母组合,请输入6-16位'))
          }else{
            this.validForm.password = true
            callback()
          }
        }
      };
      var validatePassword2 = (rule,value,callback) => {
        if (value === '') {
          this.validForm.repassword = false
          callback(new Error('请再次输入密码'));
        }
        else{
          if(value !== this.ruleForm.password){
            this.validForm.repassword = false
            callback(new Error('两次密码不一致'))
          }
          else{
            this.validForm.repassword = true
            callback()
          }
        }
      };
      var validateEmail = (rule, value, callback) => {
        if (value === '') {
          this.validForm.email = false
          callback(new Error('请输入邮箱'));
        }
        else {
          const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
          setTimeout(() => {
            if (mailReg.test(value)) {
              this.validForm.email = true
              callback()
            } else {
              this.validForm.email = false
              callback(new Error('请输入正确的邮箱格式'))
            }
          }, 100)
        }
      };
      var validateVerificationCode = (rule, value, callback) => {
        if (value === '') {
          this.validForm.code = false
          callback(new Error('请输入验证码'));
        }
        else {
          this.validForm.code = true
          callback();
        }
      };
      return {
        classification: this.$route.query.classification,
        ruleForm: {
          username: '',
          password: '',
          password2:'',
          email: '',
          verificationCode: '',

        },
        validForm:{
          name:false,
          password:false,
          repassword:false,
          email:false,
          code:false
        },
        rules: {
          username: [
            { validator: validateUsername, trigger: 'blur' },
            {min: 3, max: 10, message: '长度在 3 到 10 个字符的账户', trigger: 'blur'}
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          password2: [
            {validator: validatePassword2,trigger: 'blur'}
          ],
          email: [
            { validator: validateEmail, trigger: 'blur'}
          ],
          verificationCode: [
            { validator: validateVerificationCode, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      getVerificationCode(formName) {
        //console.log(this.ruleForm.email)
        if (this.validForm.email) {
          this.$refs[formName].validateField('email', (emailError) => {//检测email是否合法
            if (!emailError) {
              if(this.classification === 'register') {
                var api = '/api/getEnrollVerificationCode';
              }
              else {
                var api = '/api/user/getChangePasswordVerificationCodeByEmail';
              }
              this.$axios.post(api, qs.stringify({email: this.ruleForm.email})).then(res => {
                console.log(res);
                alert("验证码已发送至"+this.ruleForm.email);
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          })
        }
        else{
          alert('请再次确认是否输入邮箱')
        }
      },
      enroll(formName) {
        console.log(123);
        this.$refs[formName].validate((valid) => {//检测输入是否合法
          if (valid) {
            var keyStr = this.ruleForm.verificationCode;
            var i;

            if (keyStr.length) {
              for (i = 0; i < 16-this.ruleForm.verificationCode.length; i++) {
                keyStr = keyStr + this.ruleForm.verificationCode[i];
              }
            }
            var verificationCode = AES.encrypt(this.ruleForm.verificationCode,keyStr);
            var password = AES.encrypt(sha256(this.ruleForm.password),keyStr);//密码加密
           // console.log(password);
            //console.log(keyStr);
            //console.log(verificationCode);
            if(this.classification === 'register') {
              var data = {username:this.ruleForm.username,
                          password:password,
                          email:this.ruleForm.email,
                          verificationCode:verificationCode};
              var api = '/api/enrollByEmail';
            }
            else {
              var data = {password:password,
                          email:this.ruleForm.email,
                          verificationCode:verificationCode};
              var api = '/api/user/changePasswordByEmail';
            }
            this.$axios.post(api ,qs.stringify(data)).then(res=>{
              console.log(res);
              if (res.data.code === 201) {
                alert(res.data.data);
                this.$router.push('/UserLogin');
              }
              else {
                alert(res.data.data);
              }
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      returnFrom() {
        this.$router.push({path:this.$route.query.from ,query:{from:this.$route.path, classification:this.classification}})
      },
    },
  }
</script>

<style scoped>
.el-container {
  height: 600px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  display: flex;
}
.registerBox {
  width: 40%;
  height: auto;
  padding: 10px;
  border-radius: 25px;
  backdrop-filter: blur(3px);
  background-color: rgba(255,255,255,0.5);
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
  border: 3px rgba(255,255,255,0.4) solid;
  border-bottom: 3px rgba(40,40,40,0.35) solid;
  border-right: 3px rgba(40,40,40,0.35) solid;
}
.el-form-item__content {
    display: flex;
}
.el-form-item {
  margin-right: 15%;
  margin-top: 5%;
}
</style>
