<template>
<el-main>
  <el-card class="box-card">
    <h1>{{article.headline}}</h1>
    <span>{{article.source}}</span>
    <time>{{article.postDateTime}}</time>
    <!-- TODO: 若Article可能来源于用户, 则此处存在XSS攻击 -->
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
    // this.article = this.$bus["RTF-Article"] ? JSON.parse(this.$bus["RTF-Article"]):{};
    this.$axios.post('/api/article/getArticleById',qs.stringify({articleId:this.$route.query.id}))
    .then(res=>{
      // console.log(res)
      this.article = res.data.data
      this.content = this.article.content;
    });
    
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
