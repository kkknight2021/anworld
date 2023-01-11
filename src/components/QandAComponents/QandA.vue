<template>
  <el-main>
    <el-card  class="box-card" :body-style="{ padding: '10px'}">
      <div   style="margin-bottom: 1%">
        <h1>{{question.headline}}</h1>
        <p v-html="question.content" align="left"></p>
        <el-divider></el-divider>
        <p v-html="answer.content" align="left"></p>
      </div>
    </el-card>
  </el-main>
</template>


<script>

export default {
  data() {
    return {
      question:{},
      answer: {}
    };
  },
  created() {
    console.log(this.$route.query.question)
    this.question = JSON.parse(this.$route.query.question);
    console.log(this.question)
  },
  methods: {
    getAnswersByQuestionId(questionId) {
      this.$axios.get("/api/QandA/getAnswersByQuestionId",this.$qs.stringify({})).then(res=>{
        console.log(res)
        this.questionsList = res.data.data;
        //console.log(this.data)
      })
    }
  },
  
}
</script>