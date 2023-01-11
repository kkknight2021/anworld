<template>
  <el-footer>
    <el-divider></el-divider>
    <div>{{msg}}</div>
  </el-footer>
</template>

<script>
  export default {
    data () {
      return {
        msg:'Copyright © 2022 HospiceWorld. All rights reserved.'
      }
    },
  }
</script>

<style scoped>
.el-footer{
  background-color: rgb(255, 255, 255, 0);
  height: 50px;
  text-align: center;
  line-height: 50px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  /* bottom: 0; */
}
.el-divider--horizontal {
  display: inline-block;
  height: 2px;
  margin: 0;
  background-color:#c6c8ce;
  position: relative;
}
</style>
