<template>
<el-main>
  <el-card class="box-card">
    <h1>{{article.headline}}</h1>
    <span>{{article.source}}</span>
    <time>{{article.postDateTime}}</time>
    <p v-html="content" align="left"></p>
  </el-card>
</el-main>
</template>

<script>
import qs from 'qs'
export default ({
  name: 'Article',
  data () {
    return{
      content:'',
      article:{},
    }
  },
  created() {
    this.article = JSON.parse(this.$route.query.article)
    this.$axios.post('/api/article/getArticleContent',qs.stringify({articleId:this.article.id})).then(res=>{
      console.log(res)
      this.content = res.data.data
    })
  },
})
</script>


<style>
  .el-main {
    display: flex;
    justify-content: center;
  }
  .box-card {
    width: 70%
  }

</style>
