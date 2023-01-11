<template>
  <el-container>
    <el-aside width="200px">
      <div class='left'>
        <el-link :underline="false" @click="id=1">书籍</el-link>
        <el-divider></el-divider>
        <el-link :underline="false"  @click="id=3">保健品</el-link>
        <el-divider></el-divider>
        <el-link :underline="false"  @click="id=2">医疗器械</el-link>
      </div>
    </el-aside>

    <el-main>
      <goods :id='id'></goods>
    </el-main>
  </el-container>
</template>


<script>
import goods from "./StoreComponents/Goods.vue"
export default {
  name: 'Store',
  components: {
    goods
  },
  data () {
    return {
      id: 1,
      data:{}
    }
  },
  created: function(){
      this.$axios.get("/api/goods/getClassification").then(res=>{
        console.log(res)
        this.data = res.data.data;
        //console.log(this.data)
      })
    },
}
</script>

<style scoped>
.el-container {
  height: 600px;

}
.el-divider--horizontal {
  display: inline-block;
  height: 2px;
  width: 80%;
  margin: 20px;
  background-color:#c6c8ce;
  position: relative;
}
.el-link {
  font-size:18px ;
}

.el-aside {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  /* background-color: #e2e7ed; */
  color: #333;
  text-align: center;

  }
.el-main {
  /* background-color: #E9EEF3; */
  background-color: rgba(255, 255, 255, 0.381);
  color: #333;
  text-align: center;
}
</style>
