<template>
  <div class="main">
    <div v-for="item in items" :key="item.id" class="good">
      <img :src = "item.pictureLink" alt="商品">
      <a :href="item.link" target="_blank">{{item.name}}</a>
    </div>
  </div>
</template>

<script>
  export default ({
    name: 'Goods',
    props:['id'],
    data () {
      return {
        items:{}
      }
    },
    watch: {
      id: {
        handler(newID) {
          this.items = {}
          console.log(newID)
          this.$axios.get("/api/goods/getGoods?"+"classification="+newID).then(res=>{//请求在这
          console.log(res)
          this.items = res.data.data;
          })
        },
        immediate: true
      },

    }
  })
</script>

<style scoped>
.good {
  height: 250px;
  width:  200px;
  margin: 20px;
  background-color: white;
}
.main {
  height: 100%;
  width:  100%;
  display: flex;
  flex-wrap: wrap;
}
img {
  height: 180px;
  width:  200px;
}
</style>

