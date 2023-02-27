<template>
  <el-container>
    <el-aside width="200px">
      <div class='left'>

      </div>
    </el-aside>

    <el-main>
      <div v-for="question in questionsList" :key="question.index" style="margin-bottom: 1%">
        <el-card  :body-style="{ padding: '0'}">
          <el-button type="text" @click="jumpQandA(question)" class="headline" style="float: left;">{{question.headline}}</el-button>
        </el-card>
      </div>
    </el-main>
  </el-container>
</template>


<script>
export default {

  data () {
    return {
      questionsList: [],
    }
  },
  methods: {
    getAllQuestions() {
      this.$axios.post("/api/QandA/getAllQuestions").then(res=>{
        console.log(res)
        this.questionsList = res.data.data;
        //console.log(this.data)
      })
    },
    jumpQandA(qustion) {
      console.log(qustion)
      this.$router.push({path:'/QandA', query:{from:this.$route.path,qustion:JSON.stringify(qustion)}})
    }
  },
  created() {
    console.log(1)
    this.getAllQuestions();
  },
}
</script>
