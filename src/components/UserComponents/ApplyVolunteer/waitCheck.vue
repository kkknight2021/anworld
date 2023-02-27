<template>
  <div class="formBox">
    <p>申请已提交，请耐心等待审核</p>
  </div>
</template>

<script>
export default {
  name: "waitCheck",
  created() {
    this.$emit("listenPercentage", 50)
  }
}
</script>

<style scoped>
.formBox {
  width: 80%;
  height: 610px;
  line-height: 610px;
  text-align: center;
  padding: 20px 15px;

  border-radius: 25px;
  backdrop-filter: blur(3px);
  background-color: rgba(255,255,255,0.5);
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
  border: 3px rgba(255,255,255,0.4) solid;
  border-bottom: 3px rgba(40,40,40,0.35) solid;
  border-right: 3px rgba(40,40,40,0.35) solid;
}
</style>
