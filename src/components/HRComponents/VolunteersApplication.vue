<template>
  <div class='formBox'>
    <!-- <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      
    </el-form> -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
      <el-row>
        <el-col :span="13">
          <el-form-item label="姓名"  prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="性别"  prop="sex" >
            <el-select v-model="ruleForm.sex">
              <el-option label="男" value="man"></el-option>
              <el-option label="女" value="woman"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="电子邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="居住地址" prop="address">
        <el-input v-model="ruleForm.address"></el-input>
      </el-form-item>
      <el-form-item label="申请原因" prop="reason" >
        <el-input type="textarea" v-model="ruleForm.reason" placeholder="来说说你成为志愿者的原因吧！不少于五十字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" v-html="'申&nbsp;&nbsp;&nbsp;&nbsp;请'"></el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
      <!-- <el-form-item label="特殊资源" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item> -->
    </el-form> 
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          sex: '',
          email: '',
          address: '',
          //resource: '',
          reason: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          email: [
            { required: true, message: '请输入电子邮箱', trigger: 'blur' },
          ],
          address: [
            { required: true, message: '请输入居住地址', trigger: 'blur' },
          ],
          // resource: [
          //   { required: true, message: '请选择活动资源', trigger: 'change' }
          //],
          reason: [
            { required: true, message: '请填写申请原因', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
.formBox {
  width: 600px;
  height: 300px;
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
