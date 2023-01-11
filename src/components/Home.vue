<template>
  <el-container>
    <carousel></carousel>
    <div class="box1">
      <div class="child1-box1">
        <el-tabs type="border-card" class="card1">
          <el-tab-pane label="公司概述">工作室名称“anworld”中的“an”既是“安宁”的拼音缩写，也是英语单
            词“一个”的意思。“anworld”既代表“安宁世界”，也寓意着我们和所有需
            要安宁疗护的人群都是处在同一个世界的，我们将会付诸行动，让安宁疗护行
            业更多与的人、事、物产生联结，让每个不幸面对危及生命的终末期疾病的公
            民，都能获得安宁缓和医疗服务所带来的身心安宁，得到最好的医疗照顾，达
            成善生，善终，善别。</el-tab-pane>
          <el-tab-pane label="公司愿景">我们将致力于：
            <ul>
              <li>支持相关专业教育和培训；</li>
              <li>提高公众对安宁疗护的认识和理解；</li>
              <li>推动安宁疗护真正成为一项社会运动；</li>
              <li>推广安宁疗护服务质量评鉴标准和指南；</li>
              <li>发动社会力量，帮助经济欠发达地区建立安宁疗护机构；</li>
              <li>为安宁疗护提供一站式服务和全方位支持，促进安宁疗护行业发展。</li>
            </ul>
                      我们认同 HospiceUK 组织和其他世界领先的安宁缓和医疗组织提出的理念：
              每个人在其整个生命重要的权利，直到他们临终，没有人应该忍受可以避免的
              痛苦；获得安宁缓和医疗服务，享有身心灵的全面关怀，是每一个人在生命终
              末期的基本人权。我们的愿景是，在不久的将来，安宁缓和医疗将纳入国家医
              疗卫生服务体系，得到全面的普及。
          </el-tab-pane>
          <el-tab-pane label="关注我们">
            <div>
              扫码关注微信公众号“安宁世界”，简书、小红书同名。
            </div>
            <img :src="imgs[1].src" class="img2" alt="图2">
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="child2-box1">
        <!-- <el-tabs type="border-card" class="card2">
          <el-tab-pane label="公告栏">网站正在建设中，已完成网站后台，知识讲坛，信息交流平台，机构信息平台的搭建</el-tab-pane>
        </el-tabs> -->
        <el-card class="card1">
          <div slot="header" class="clearfix">
            <span>公告栏</span>
          </div>
          网站正在建设中，已基本完成用户系统，后台管理系统，知识讲坛，信息交流平台，知识资讯平台、机构信息平台的搭建，安宁商城正在开发中......
        </el-card>
      </div>
    </div>

    <div class="box3">
      <img :src="imgs[0].src" class="img1" alt="图1">
    </div>

    <div class="box2">
      <div class="child1-box2">
        <el-tabs type="border-card">
          <el-tab-pane label="肿瘤科谱大咖说">
            <ul>
              <li v-for="lecture in lectures1" :key="lecture.id"><a href="javascript:void(0);" @click="jumpLecture(lecture)">{{lecture.headline}}</a></li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="MOOCs系列课堂">
            <ul>
              <li v-for="lecture in lectures2" :key="lecture.id"><a href="javascript:void(0);" @click="jumpLecture(lecture)">{{lecture.headline}}</a></li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="child2-box2">
        <el-tabs type="border-card">
          <el-tab-pane label="PDF | 信息交流平台">
            <ul>
              <li v-for="article in PDFArticle" :key="article.id"><a href="javascript:void(0);" @click="jumpPDF(article.file.path)">{{article.headline}}</a></li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="RTF | 信息交流平台">
            <ul>
              <li v-for="article in RTFArticle" :key="article.id"><a href="javascript:void(0);" @click="jumpRTF(article)">{{article.headline}}</a></li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="child3-box2">
        <el-tabs type="border-card">
          <el-tab-pane label="安宁疗护机构">
            <ul>
              <li v-for="institution in institutions" :key="institution.id"><a href="javascript:void(0);" @click="jumpInstitution(institution)">{{institution.name}}</a></li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </el-container>
</template>


<script>
import Carousel from './HomeComponents/carousel.vue'

export default {
  name:'Home',
  components:{
    Carousel
  },
  data() {
    return {
      lectures1: [],
      lectures2: [],
      RTFArticle: [],
      PDFArticle: [],
      institutions: [],
      imgs: [
        {src:require("@/assets/首页/1.png")},
        {src:require("@/assets/首页/2.jpg")}
      ]
    }
  },
  created() {
    this.getLectures1()
    this.getLectures2()
    this.getRTFArticle()
    this.getPDFArticle()
    this.getCareInstitutionsByLocation()
  },
  methods: {
    getLectures1() {
      this.$axios.post('/api/lecture/getLecturesByGroupId',this.$qs.stringify({groupId:1})).then(res => {
        this.lectures1 = res.data.data;
      })
    },
     getLectures2() {
      this.$axios.post('/api/lecture/getLecturesByGroupId',this.$qs.stringify({groupId:2})).then(res => {
        this.lectures2= res.data.data;
      })
    },
    getRTFArticle() {
      this.$axios.post("/api/article/getAllArticleInfo").then(res => {
        this.RTFArticle = res.data.data;
        console.log(res.data.data)
      })
    },
    getPDFArticle() {
      this.$axios.post("/api/article/getAllArticleFiles").then(res => {
        this.PDFArticle = res.data.data;
      })
    },
    getCareInstitutionsByLocation() {
      this.$axios.post('/api/careInstitution/getCareInstitutionsByLocation', this.$qs.stringify()).then(res => {
        this.institutions = res.data.data;
        console.log(res)
      })
    },
    jumpLecture(lecture) {
      if(lecture.classification === 'LINK') {
        window.open(lecture.reference)
      }
      else {
        this.$router.push({path:'/lecture', query:{from:this.$route.path,lecture:JSON.stringify(lecture)}})
      }
    },
    jumpRTF(article) {
      this.$router.push({path:"/RTFarticle",query:{from:this.$route.path, article:JSON.stringify(article)}})
    },
    jumpPDF(path) {
      window.open(path);
    },
    jumpInstitution(ins) {
      this.$router.push({path:'/MapTest', query:{from:this.$route.path,lng:ins.coordinateX,lat:ins.coordinateY}})
    }
  }

}
</script>


<style scoped>
  .el-container {
    /* background-color: #ffffff; */
    height: 100%;
    color: #333;
    text-align: left;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    background-color: rgba(255, 255, 255, 0);
  }

  .box1{
    width: 80%;
  }
  .child1-box1{
    width: 62%;
    float: left;
  }
  .card1 {
    height: 100%;
  }
  .child2-box1 {
    height: 320px;
    width: 35%;
    float: right;
  }
  .box1 .el-tab-pane {
    height: 250px;
  }

  .box2{
    width: 80%;
    margin-top: 20px;
    display: flex;

  }
  .child1-box2 {
    width:35%
  }
  .child2-box2 {
    width:35%
  }
  .box2 .el-tab-pane {
    height: 300px;
  }

  .box3 {
    width: 80%;
    margin-top: 20px
  }
  .img1 {
    width: 100%;
    height: auto;
  }
  .img2 {
    height: 80%;
    width: auto;
  }

  a {
    text-decoration: none;
    color: #000;
}

/* 状态一: 未被访问过的链接 */
a:link {
    text-decoration: none;
    color: #000;
}

/* 状态二: 已经访问过的链接 */
a:visited {
    text-decoration: none;
    color: rgb(218, 203, 203);
}

/* 状态三: 鼠标划过(停留)的链接(默认红色) */
a:hover {
    text-decoration: none;
    color: #409EFF;
}
/* 状态四: 被点击的链接 */
a:active {
    text-decoration: none;
    color: #409EFF;
}

</style>
