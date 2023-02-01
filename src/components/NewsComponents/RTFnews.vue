<template>
    <el-main>
      <div v-for="item in items" :key="item.id" style="margin-bottom: 1%">
        <el-card  :body-style="{ padding: '0'}">
          <el-button type="text" @click="Jump(item)" class="headline" >{{item.headline}}</el-button>
          <div>
            <span class="content">{{simpleContent(item.content)}}</span>
          </div>
        </el-card>
      </div>
    </el-main>
</template>

<script>
export default {
  data() {
    return {
      items:{},
      article: {},
      data:[],
      classification:'',
    };
  },
  methods: {
    Jump :function(item){
        this.article = item;
        this.$router.push({path:"/RTFarticle",query:{from:this.$route.path, article:JSON.stringify(this.article)}})
    },
    getAllArticleInfo() {
      this.$axios.post('/api/article/getAllArticles').then(res=>{
      // console.log(res);
      this.data = res.data.data;
      })
    },
    changeItemsList() {
      console.log(1)
      this.items = [];
      this.getAllArticleInfo();
      setTimeout(() => {
        this.classification = this.$route.query.classification;
        if(this.classification !== 'ALL') {
          this.data.forEach((element) => {
            if(element.classification === this.classification) {
              this.items.push(element);
            }
          })
        }
        else {
          this.items = this.data;
        }
        console.log(this.data)
        console.log(this.items)
      }, 500)
    },
    simpleContent(content) {
      // console.log(content)
      var simpleContent = content.replace(/<.*?>/g, '');
      if(simpleContent.length > 250) {
        return simpleContent.substr(0, 250) + '......'
      }
      else return simpleContent
    }
  },
  watch:{
    // 监听路由发生改变
    '$route': function(newVal){
      if (newVal.query.classification) this.changeItemsList();
    }
    // {
  	//   handler(newVal) {
  	// 	if(newVal.query.classification) this.changeItemsList();
	  // }
    // }
  },
  mounted() {

    this.changeItemsList()
  },
  computed: {
    
  },
}
</script>

<style scoped>
  .el-main {
    display: flex;
    flex-direction:column;
    justify-content: center;

  }
  .el-col {
    margin-bottom: 20px;
  }
  .headline {
  color: #409EFF;
  text-align: left;
  width: 100%;
  font-size: 1em;
 }
  .content {
  font-size: 0.8em;
  float: left;
  text-align: left;
  }
</style>
