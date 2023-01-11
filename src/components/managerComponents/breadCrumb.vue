<template>

  <!--面包屑-->
  <div class="breadcrumb">
    <el-breadcrumb  separator="/">
      <!--默认给一个首页的跳转，如果不需要可以去掉-->
      <el-breadcrumb-item :to="{ path: '/Manager' }">首页</el-breadcrumb-item>
      <!--面包屑列表-->
      <el-breadcrumb-item
        v-for='(item,index) in breadList'
        :key='index'
        @click.native="breadCrumbClick(item)"
        style="cursor: pointer">
        {{item.name}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  
</template>

<script>
export default {
  name: 'breadCrumb',
  data() {
    return {
      breadList: [],
    }
  },
  watch: {
    $route () {
      console.log(this.$route)
      this.getBreadCrumb();
    }
  },
  methods: {
    getBreadCrumb() {
      
      if(sessionStorage.getItem("breadList")) {
        this.breadList =  JSON.parse(sessionStorage.getItem("breadList"))
      }
      var newBreadCrumb = {name: this.$route.meta.ChineseName, path: this.$route.path};
      console.log(newBreadCrumb)
      var breadNumber = this.$route.meta.breadNumber
      
      if(breadNumber > this.breadList.length) {
        this.breadList.push(newBreadCrumb);
      }
      else if(breadNumber < this.breadList.length) {
        console.log(2)
        this.breadList.splice(breadNumber, this.breadList.length - breadNumber )
      }
      else {
        this.breadList.pop();
        this.breadList.push(newBreadCrumb);
      }
      console.log(this.breadList,'now')
      sessionStorage.setItem("breadList", JSON.stringify(this.breadList))
      console.log(this.breadList)
    },

    breadCrumbClick(item) {
      this.$router.push({path:item.path, query:{from:this.$route.path}})
    }
  }
}
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 1%;
  width: 100%;
  padding-left: 2%;
}
</style>