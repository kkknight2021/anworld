<template>
  <div class='recruitBox'>
    <div class='recruitElment' v-for="item in items" :key='item.id' @click="jump(item.id)">
      <img :src="item.src">
      <h1>高级安宁照看</h1>
      <span>护工等级{{item.grade}}&nbsp;&nbsp;&nbsp;&nbsp;剩余：{{item.num}}人</span>
      <el-divider></el-divider>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Recruitment',
  data() {
    return {
      items: [
        {id:1, grade:'高级', num:0, src:require('@/assets/人力资源之护工招聘/A.png')},
        {id:2, grade:'中级', num:0, src:require('@/assets/人力资源之护工招聘/B.png')},
        {id:3, grade:'低级', num:0, src:require('@/assets/人力资源之护工招聘/C.png')}
      ]
    }
  },
  methods: {
    jump (id) {
      alert('正在开发中······');
    }
  }
}
</script>

<style scoped>
.recruitBox {
  display: flex;
  height: 80%;
  width: 80%;
  justify-content: center;
  flex-direction: column;
  align-items: left
}
.recruitElment {
  margin-right: 0px;
  cursor:pointer;
}
img {
  position: relative;
  float: left;                                                                                                       
}
</style>
