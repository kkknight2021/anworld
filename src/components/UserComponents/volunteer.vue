<template>
  <div class="volunteer">
    <router-view @listenPercentage="changePercentage"></router-view>
    <div  style=" line-height:50px ;margin: 0 2%">
      <el-progress type="circle" :percentage="percentage" :status="status"></el-progress>
      <div>申请进度</div>
    </div>

  </div>
</template>

<script>
export default {
  name: "volunteer",
  data() {
    return {
      percentage: 0,
      status: ""
    }
  },
  methods: {
    changePercentage(newPercentage) {
      console.log(newPercentage)
      this.percentage = newPercentage
      this.$forceUpdate();
    }
  },
  created() {
    this.$axios.post("/api/user/getVolunteerReasons").then(res=>{
      console.log(res)
      const state = res.data.data.pop().state
      console.log(state)
      if(state === "Wait") {
        console.log((res))
        this.$router.push({path: "/User/volunteer/waitCheck"})
        this.percentage = 50
        this.status = "warning"
        console.log(this.percentage)
      }
      else if(state === "Pass") {
        this.$router.push({path: "/User/volunteer/applySuccess"})
        this.percentage = 100
        this.status = "success"
        console.log(this.percentage)
      }
      else {
        this.$router.push({path: "/User/volunteer/improveUserInfo"})
      }
    })

  }
}
</script>

<style scoped>
.volunteer {
  margin: 2% 0%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
}
</style>
