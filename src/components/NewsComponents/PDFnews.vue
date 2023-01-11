<template>
  <el-main>
    <div v-for="item in items" :key="item.index" style="margin-bottom: 1%">
      <el-card  :body-style="{ padding: '0'}">
        <el-button type="text" @click="jumpPDF(item.file.path)" class="headline" style="float: left;">{{item.headline}}</el-button>
      </el-card>
    </div>
  </el-main>
</template>

<script>

export default {
  data() {
    return {
      items:{},
    };
  },
  created() {
    this.getAllArticleFiles()
  },
  
  methods: {
    getAllArticleFiles() {
      this.$axios.post('/api/article/getAllArticleFiles').then(res => {
        console.log(res.data.data);
        this.items = res.data.data
      })
    },
    jumpPDF(path) {
      window.open(path);
    }
  },
  
}
</script>

<style scoped>
  .el-main {
   display: flex;
    flex-direction:column;
    justify-content: flex-start;

  }
/* el-divider 修改高度&虚线效果 */
 .el-divider--horizontal{
     margin: 8px 0;
     background: 0 0;
     border-top: 1px dashed #e8eaec;
 } 
 .el-button--text {
  color: black;
 }
</style>