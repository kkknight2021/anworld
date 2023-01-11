<template>
  <el-main>
    <el-card  class="box-card" :body-style="{ padding: '10px'}">
          <div style="margin-bottom: 1%">
            <h1>{{lecture.headline}}</h1>
            <span>{{lecture.source}}</span>
            <span>{{lecture.author}}</span>
            <time>{{lecture.updateTime}}</time>
            <p v-html="lecture.content" align="left"></p>
            <video width="640" height="480" controls v-if="lecture.classification == 'VIDEO'">
              <source :src="api + lecture.video.path"  type="video/mp4" >
            </video>
          </div>
        </el-card>
  </el-main>
</template>
<script>

export default {
  data() {
    return {
      api:'120.76.202.206:39394/',
      lecture:{},
    };
  },
  created() {
    console.log(this.$route.query.lecture)
    this.lecture = JSON.parse(this.$route.query.lecture);
    console.log(this.lecture)
  },
  methods: {

  },

}
</script>

<style scoped>
 .el-divider--horizontal{
     margin: 8px 0;
     background: 0 0;
     border-top: 1px dashed #e8eaec;
 }

  .el-main {
    display: flex;
    justify-content: center;
  }
  .box-card {
    width: 70%
  }
  .text {
    font-size: 14px;
  }
</style>
