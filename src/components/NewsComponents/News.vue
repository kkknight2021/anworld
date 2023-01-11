<template>
    <el-container class="box" style="">
      <!--侧边栏-->
      <el-aside width="200px">
        <el-menu class="el-menu-vertical-demo" :default-openeds="['RTF', 'RTF-ALL']" default-active="RTF-ALL" :unique-opened="true"  @select="getList" @open="selectFileType" style="height: 100%;" background-color="transparent" text-color="black" >
          <el-submenu index="RTF" >
            <template slot="title">
              RTF类型
            </template>
            <el-menu-item :index="option.value" v-for="option in options" :key="option.index" >
              <i class="el-icon-s-help"></i>
                {{option.label}}
            </el-menu-item>
          </el-submenu>
          <el-submenu index="PDF">
              <template slot="title">PDF类型</template>
            <el-menu-item :index="option.value" v-for="option in options" :key="option.index" :default-active="'PDF-' + option.value">
              <i class="el-icon-s-help"></i>
                {{option.label}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <router-view :classification="classification"></router-view>
    </el-container>
</template>

<script>
export default {
  data() {
    return {
      fileType: 'RTF',
      classification: 'ALL',
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
  methods: {
    selectFileType(index) {
      this.fileType = index;
    },
    getList(index) {
      this.classification = index;
      console.log(this.classification)
      if(this.fileType === 'RTF') {
        this.$router.push({path:'/News/RTFnews', query:{from:this.$route.path,classification:this.classification}})
      }
      else {
        this.$router.push({path:'/News/PDFnews', query:{from:this.$route.path,classification:this.classification}})
      }
    }
  },
  mounted() {
    this.$router.push({path:'/News/RTFnews', query:{from:this.$route.path,classification:this.classification}})
  }
}
</script>

<style scoped>
.box {
  height: 90%;
  margin-top:2%;

}
</style>
