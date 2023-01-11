<template>
  <el-container>
    <el-aside width="200px">
      <el-button type="primary" @click="Jump1">志愿申请</el-button>
      <el-button type="warning" @click="Jump2">护工招聘</el-button>
      <el-button type="danger" @click="Jump3">加入我们</el-button>
    </el-aside>

    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>

</template>

<script>
export default {
  name: 'HumanResource',
  methods: {
    Jump1() {
      this.$router.push('/HumanResource/VolunteersApplication');
    },
    Jump2() {
      this.$router.push('/HumanResource/Recruitment');
    },
    Jump3() {
      this.$router.push('/HumanResource/Join');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-container {
  height: 600px;

}
.el-button {
  font-size: 17px;
  margin: 20px;
}

.el-aside {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  background-color:  rgba(255, 255, 255, 0.5);
  color: #333;
  text-align: center;
  line-height: 200px;

  }
.el-main {

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.381);;
  color: #333;
  text-align: center;
}
</style>
