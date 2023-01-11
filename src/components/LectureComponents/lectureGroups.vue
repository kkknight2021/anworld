<template>
    <el-container class="box" style="">
      <!--侧边栏-->
      <el-aside width="200px">
        <el-menu class="el-menu-vertical-demo" :default-active="activeIndex" style="height: 100%;" background-color="transparent" text-color="black" @select="getLecturesByGroupId">
            <el-menu-item :index="group.id" v-for="group in groups" :key="group.id" >
              <i class="el-icon-s-help"></i>
                {{group.name}}
            </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <el-card  :body-style="{ padding: '10px'}" v-if="group.content != ''" style="margin-bottom: 1%">
          <p v-html="group.content"></p>
        </el-card>
        <div v-for="lecture in lectures" :key="lecture.index" style="margin-bottom: 1%">
          <el-card  :body-style="{ padding: '0'}">
            <el-button type="text" @click="jumpLecture(lecture)" class="headline" >{{lecture.headline}}</el-button>
            <div>
              <span class="content">{{simpleContent(lecture.content)}}</span>
            </div>
          </el-card>
        </div>
      </el-main>
    </el-container>
</template>

<script>

export default {
  data() {
    return {
      group:{},
      groups:[],
      lectures:[],
      activeIndex: '1'
    }
  },
  created() {
    this.$axios.post('/api/lecture/getAllLectureGroups').then(res=>{
        this.groups = res.data.data;
        console.log(this.groups)
        this.getLecturesByGroupId(this.groups[0].id)
    })
  },
  computed: {
    simpleContent: () => {
      return (content) => {
        console.log(content)
        var simpleContent = content.replace(/<.*?>/g, '');
        if(simpleContent.length > 250) {
          return simpleContent.substr(0, 250) + '......'
        }
        else return simpleContent
      }
    }
  },
  methods: {
    getLecturesByGroupId(id) {
      var index = id - 1 ;
      console.log(this.groups[index])
      this.group = this.groups[index];
      console.log(this.group)
      this.$axios.post('/api/lecture/getLecturesByGroupId', this.$qs.stringify({groupId:this.group.id})).then(res=>{
        console.log(res)
        this.lectures = res.data.data;
      });
    },

    jumpLecture(lecture) {
      if(lecture.classification === 'LINK') {
        window.open(lecture.reference)
      }
      else {
        this.$router.push({path:'/lecture', query:{from:this.$route.path,lecture:JSON.stringify(lecture)}})
      }
    }
  }
}
</script>

<style scoped>
 .el-divider--horizontal{
     margin: 8px 0;
     background: 0 0;
     border-top: 1px dashed #e8eaec;
 }
 .el-button--text {
  color: #409EFF;
 }
 .el-main {
   display: flex;
    flex-direction:column;
    justify-content: center;

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
