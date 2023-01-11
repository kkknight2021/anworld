<template>
  <div class="write-box">
    <el-card style="height: 100%;" :body-style="{height:'100%'}">
      <div class="box1">
        <el-form ref="form" :model="form" label-width="80px" >
          <el-form-item label="标题">
            <el-input v-model="form.headline" placeholder="请输入文章标题" style="width: 100%;">></el-input>
          </el-form-item>
          <el-form-item label="来源">
            <el-input v-model="form.source" placeholder="请输入文章来源" style="width: 100%;">></el-input>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker type="date" placeholder="选择发表日期" v-model="form.date1" style="width: 100%;" align="right" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="时间">
            <el-time-picker placeholder="选择发表时间" v-model="form.date2" style="width: 100%;" align="right" value-format="HH:mm:ss"></el-time-picker>
          </el-form-item>
          <el-form-item label="标签">
            <el-select v-model="form.classification" filterable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button  type="primary" @click="deliver()">发表</el-button>
            <el-button  @click="cancel()">取消</el-button>
          </el-form-item>
        </el-form>
        
      </div>
      <editor-bar class="box2" :content="this.Article.content" v-if="this.Article.content != null" @change="flash" ></editor-bar>
      
    </el-card>
  </div>
</template>

<script>
import qs from 'qs'
import EditorBar from '../../common/wangEditor.vue'
export default {
  data() {
    return {
      Article: {
        headline: '',
        content: null,
        source: '',
        postDateTime: '',
        classification: 'OTHER',
        id: null,
        imageIds:[]
      },
      form: {
        headline: '',
        source: '',
        date1: '',
        date2: '',
        classification: 'OTHER',
      },
      options: [
        {
          value: 'ALL',
          label: '全部内容',
        }, {
          value: 'ARTICLE',
          label: '安宁文章'
        }, {
          value: 'PROFESSION',
          label: '专业知识'
        },{
          value: 'EDUCATION',
          label: '安宁教育'
        }, {
          value: 'POLICY',
          label: '政策解读'
        }, {
          value: 'NEWS',
          label: '新闻资讯'
        },{
          value: 'CELEBRITY',
          label: '名人事迹'
        },{
          value: 'HORIZON',
          label: '安宁视界'
        }, {
          value: 'OTHER',
          label: '其他内容'
          
        }, 
      ],
    }
  },
  components: { EditorBar },
  created() {
    console.log(this.$route)
    if(this.$route.query.method == "UPDATE") {
      var article = JSON.parse(this.$route.query.article);
      this.getArticleContent(article.id);
      this.form.id = article.id;
      this.form.headline = article.headline;
      this.form.source = article.source;
      this.form.date1 = article.postDateTime.slice(0,10);
      this.form.date2 = article.postDateTime.slice(11);
      console.log(this.form.date2)
    }
    else {
      this.Article.content = '';
    }
    console.log(this.Article.content)
  },
  methods: {
    flash (val) {
      console.log(this.Article.content)
      this.Article.content = val.val;
      this.Article.imageIds = val.foreImageList;
    },
    getArticleContent(id) {
      this.$axios.post('/api/article/getArticleContent',this.$qs.stringify({articleId: id})).then(res=>{
        console.log(res)
        this.Article.content = res.data.data
        
      })
    },
    deliver() {
      this.Article.headline = this.form.headline
      this.Article.source = this.form.source
      this.Article.classification = this.form.classification
      if(this.form.date1 && this.form.date2) {
        console.log(this.form.date2)
        this.Article.postDateTime = this.form.date1 + ' ' + this.form.date2
      }
      console.log(typeof(this.Article.postDateTime), this.Article.postDateTime)
      console.log(this.Article)
      if(this.Article.content) {
        if(this.$route.query.method == 'UPDATE') {
          this.Article.id = this.form.id;
          this.$axios.post("/api/article/updateArticle",JSON.stringify(this.Article), {headers: {"Content-type": "application/json"}}).then(res =>{
          console.log(res)
          if(res.data.code == 200){
              this.$message.success('编辑成功')
              var fromPath = this.$route.query.from;
              //var fromGroup = this.$route.query.group;
              console.log(fromPath)
              //console.log(fromGroup)
              this.$router.push({path:fromPath});
            }
            else{
              this.$message.error('编辑失败')
              console.log(this.$refs.upload)
            }
          })
        }   
        else {
          this.$axios.post("/api/article/insertArticle",JSON.stringify(this.Article), {headers: {"Content-type": "application/json"}}).then(res =>{
            console.log(res)
            if(res.data.code == 201){
              this.$message.success('添加成功')
              var fromPath = this.$route.query.from;
              //var fromGroup = this.$route.query.group;
              console.log(fromPath)
              //console.log(fromGroup)
              this.$router.push({path:fromPath});
            }
            else{
              this.$message.error('添加失败')
              console.log(this.$refs.upload)
            }
          })
        }   
      }
      else {
        this.$message.error('内容不能为空')
      }
    },
    cancel() {
      this.$router.push('/forum')
    }
  }
}

</script>

<style scoped>
.el-main {
	
  height: 100%;
	padding: 0 20px;
	margin-top:0
}
.top {
  display: flex;
	justify-content: center;
  flex-direction: column;
  align-items: center;
}
el-card {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  margin: 0, 2%;
}
.el-card__body {
    height: 100%;
    margin: 0, 2%;
}
.box1 {
  padding-bottom: 2%;
  padding-top: 1%;
  float: left;
  width: 20%;
  position: relative;
}
.box2 {
  float: right;
  width: 75%;
  height: 100%;
  padding-bottom: 2%;
  padding-top: 1%;
  text-align: left;
}
.write-box {
  margin: 0, 10%;
}
</style>