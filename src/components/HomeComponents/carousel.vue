<template>

  <el-carousel :interval="4000" type="card">
    <el-carousel-item class="image" v-for="item in items" :key="item.id">
      <img :src="item.src" width="100%" height="100%" alt="无图片"/>
    </el-carousel-item>
    
  </el-carousel>

</template>

<script>
export default {
  name:'Carousel',
  data () {
    return {
      items: [{id:1, src:require("@/assets/主题教育宣传/1.jpg")},
              {id:2, src:require("@/assets/主题教育宣传/2.jpg")},
              {id:3, src:require("@/assets/主题教育宣传/3.jpg")},
              {id:4, src:require("@/assets/主题教育宣传/4.jpg")},
              {id:5, src:require("@/assets/主题教育宣传/5.jpg")},
              {id:6, src:require("@/assets/主题教育宣传/6.jpg")},
              {id:7, src:require("@/assets/主题教育宣传/7.jpg")},
              {id:8, src:require("@/assets/主题教育宣传/8.jpg")},
              {id:9, src:require("@/assets/主题教育宣传/9.jpg")},]
    }
  }
    
}
</script>


<style scoped>

  .el-carousel {
    margin-top: 30px;
    width: 80%;
    height: 350px;
    
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
    height: 320px;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>