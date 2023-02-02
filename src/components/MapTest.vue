<template>
  <TdtMap v-bind:tdtLoaded="tdtLoaded"></TdtMap>
</template>

<script>
  /* 导入组件 */
  import TdtMap from '../common/TdtMap.vue'
  // const TdtMap = ()=>import('../common/TdtMap.vue')

  
  
  export default {
    name: 'MapTest',
    components: {
      /* 注册组件 */
      TdtMap,
    },
    data() {
      return {
        tdtLoaded: false,
      }
    },
    beforeCreate(){
      
    },
    created() {
      // 懒加载天地图接口
      const tdtScriptId = 'dynamic-tdt-imp';
      // console.log('beforeCreateMapTest');

      if (!document.getElementById(tdtScriptId)){
        // console.log('init tdt script!')
        // 操作Dom插入标签
        // this.initTdtScript(tdtScriptId);

        let script = document.createElement('script');
        script.type = "text/javascript";
        script.src = 'http://api.tianditu.gov.cn/api?v=4.0&tk=5017a8687f519b8ae81717aa42f706ff';
        script.id = tdtScriptId;
        document.body.appendChild(script);
        script.onload = ()=>{this.tdtLoaded = true;}
        script.onerror = ()=>{console.log("获取失败!")}

      }else{
        // 存在标签, 则默认已加载接口
        this.tdtLoaded = true;
      }
      // console.log('created: '+this.$bus.tdtLoaded);

    },
    mounted(){
    },
    beforeUnmount(){
    },
    
    watch: {
    },
    methods: {
    },
  }
</script>

<style scoped>

</style>