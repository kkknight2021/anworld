<template>
  <div class="write-box">
    <el-card style="height: 100%;" :body-style="{height:'100%'}">
      <div class="box1">
        <el-form ref="form" :model="form" label-width="80px" >
          <el-form-item label="类型">
            <el-radio-group v-model="form.classification" size="small" @change="changeCf">
              <div >
                <template v-for="cf in classificationArr">
                  <el-radio-button   :key="cf.id" v-if="cf.id<2" :label="cf.label" >{{cf.value}}</el-radio-button>
                </template>
              </div>
              <div >
                <template v-for="cf in classificationArr">
                  <el-radio-button   :key="cf.id" v-if="cf.id>=2" :label="cf.label">{{cf.value}}</el-radio-button>
                </template>
              </div>
            </el-radio-group>
          </el-form-item>

          
          <el-form-item label="标题">
            <el-input v-model="form.headline" placeholder="请输入文章标题" style="width: 100%;">></el-input>
          </el-form-item>
          <template  v-if="form.classification != 'LINK'">
            <el-form-item label="作者">
              <el-input v-model="form.author" placeholder="请输入文章作者" style="width: 100%;">></el-input>
            </el-form-item>
            <el-form-item label="来源">
              <el-input v-model="form.source" placeholder="请输入文章来源" style="width: 100%;">></el-input>
            </el-form-item>
            <el-form-item label="视频链接"  v-if="form.classification == 'REMOTE_VIDEO'">
              <el-input v-model="form.reference" placeholder="请输入视频链接" style="width: 100%;">></el-input>
            </el-form-item>
            <el-form-item label="视频文件" id="video">
              <el-upload
                class="avatar-uploader"
                ref="upload"
                action=""
                :on-remove="handleRemove"
                :on-preview="handlePreview"
                :on-change="handleChange"
                :on-exceed="handleExceed"
                accept="video/mp4"
                :limit="1"
                :auto-upload="false"
                >
                <!-- <el-button size="small" type="primary">选择视频文件</el-button> -->
                <i class="el-icon-plus"></i>
                <div slot="tip" class="el-upload__tip">只能上传MP4文件</div>
              </el-upload>
            </el-form-item>
          </template>
           <el-form-item label="网址链接" v-if="form.classification == 'LINK'" >
              <el-input v-model="form.reference" placeholder="请输入网址链接" style="width: 100%;">></el-input>
            </el-form-item>
          <!-- <el-form-item label="日期">
            <el-date-picker type="date" placeholder="选择发表日期" v-model="form.date1" style="width: 100%;" align="right" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item> -->
          <!-- <el-form-item label="时间">
            <el-time-picker placeholder="选择发表时间" v-model="form.date2" style="width: 100%;" align="right" value-format="HH:mm:ss"></el-time-picker>
          </el-form-item> -->
          
          <el-form-item>
            <el-button  type="primary" @click="deliver()">发表</el-button>
            <el-button  @click="cancel()">取消</el-button>
          </el-form-item>
        </el-form>
        
      </div>
      <editor-bar id="editor" class="box2" :content="this.form.content" v-if="this.form.content != null" @change="flash" ></editor-bar>
      
    </el-card>
  </div>
</template>

<script>
import qs from 'qs'
import EditorBar from '../../common/wangEditor.vue'
export default {
  data() {
    return {
      // classificationObj: {
      //   'ARTICLE':'纯文本':,
      //   'VIDEO':'含视频':,
      //   'LINK':'含网址链接:',
      //   'REMOTE_VIDEO':'含视频链接':,
      // },
      classificationArr: [{id:0,label:'ARTICLE',value:'纯文本'},
                          {id:2,label:'VIDEO', value:'含视频'},
                          {id:1,label:'LINK', value:'含网址链接'},
                          {id:3,label:'REMOTE_VIDEO', value:'含视频链接'}],
      form: {
        content: '',
        classification: 'ARTICLE',
        headline: '',
        author: '',
        source: '',
        reference: '',
        video: {},
        id: null,
        groupId:JSON.parse(this.$route.query.group).id,
        imageIds:[]
      },
      
      
    }
  },
  components: { EditorBar },
  created() {
    if(this.$route.query.method == "UPDATE") {
      var {updateTime, ...form} = JSON.parse(this.$route.query.lecture);
      this.form = form;
      console.log(this.form)
    }
    console.log(this.form)
  },
  mounted() {
    console.log(this.$refs)
    this.changeCf(this.form.classification);
    if(this.$route.query.method == "UPDATE") {
      setTimeout(() => {
        console.log(this.form.video)
        var video = {uid:this.form.video.id, name:this.form.video.oldName}
        this.$refs.upload.uploadFiles.push(video);
        
　　　　}, 500)
      
    }
    console.log(this.form)
  },
  methods: {
    changeCf(cf) {
      console.log(this.$refs.upload)
      // if(cf == 'LINK'){
      //   document.getElementById('editor').style['pointer-events'] = 'none';
      //   return
      // }
      // else {
      //   document.getElementById('editor').style['pointer-events'] = 'auto';
      // }
      if(cf == 'VIDEO') {
        document.getElementById('video').style['display'] = 'block';
      }
      else {
        document.getElementById('video').style['display'] = 'none';
      }
      
    },
    flash (val) {
      this.form.content = val.val;
      this.form.imageIds = val.foreImageList;
      console.log(val.foreImageList)
    },
    getArticleContent(id) {
      this.$axios.post('/api/article/getArticleContent',this.$qs.stringify({articleId: id})).then(res=>{
        console.log(res)
        this.Article.content = res.data.data
        
      })
    },
    async deliver() {
      //var this = this;
      //async function deliverLecture() {
      if(this.form.classification == 'VIDEO') {
        if(this.$refs.upload.uploadFiles[0].raw) {       
            console.log(this.$refs.upload)
            var file = this.$refs.upload.uploadFiles[0].raw;
            var formData = new FormData();
            formData.append("file", file);
            var uploadVideoRes = await this.$axios.post("/api/file/uploadVideo", formData, {headers:{"Content-Type": "multipart/form-data; boundary=xxxx"}})
            if(uploadVideoRes.data.code == 200) {
              this.$message.success(`视频上传成功`)
              this.form.video = uploadVideoRes.data.data;
              console.log(this.form)
            }
            else {
              this.$message.error('视频上传失败')
              this.$refs.upload.uploadFiles.splice(0,1)
              console.log(this.$refs.upload.uploadFiles)
            }
            console.log(1)
          }
        }
        if(this.form.video) {
          var {reference, ...form} = this.form;
          console.log(form)
        }
      
      else if(this.form.classification == 'REMOTE_VIDEO') { 
        var {video, ...form} = this.form;
        console.log(form)
      }
      else if(this.form.classification == 'LINK') { 
        var form = {};
        form.reference = this.form.reference;
        form.headline = this.form.headline;
        form.classification = this.form.classification;
        form.groupId = this.form.groupId;
        form.id  = this.form.id;
        form.content = this.form.content;
        form.author = '';
        form.source = '';
        console.log(form)
      }
      else{
        var {reference, video, ...form} = this.form;
      }

      console.log(this.form)
      if(this.$route.query.method == 'UPDATE') {
        var that = this;
        function updateLecture() {
          console.log(form)
          that.$axios.post('/api/lecture/updateLecture',JSON.stringify(form),{headers: {"Content-type": "application/json"}}).then(res => {
            console.log(res)
            if(res.data.code == 200){
                that.$message.success('修改成功')
                var fromPath = that.$route.query.from;
                var fromGroup = that.$route.query.group;
                console.log(fromPath)
                console.log(fromGroup)
                that.$router.push({path:fromPath ,query:{group:fromGroup}});
              }
              else{
                that.$message.error('修改失败')
                console.log(that.$refs.upload)
              }
          }) 
        }
        if(JSON.parse(this.$route.query.lecture).classification == 'VIDEO' && this.form.classification != 'VIDEO') {
          this.$confirm('此操作将永久删除原视频文件, 是否继续?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}).then(
            () => {
              console.log(1)
              updateLecture()
            }
          ).catch(() => {
            return          
          })
        }
        else {
          console.log(2)
          updateLecture()
        }
      }
    
      else {
        console.log(2)
        this.$axios.post('/api/lecture/insertLecture',JSON.stringify(form),{headers: {"Content-type": "application/json"}}).then(res => {
          console.log(res)
          if(res.data.code == 200){
              this.$message.success('添加成功')
              var fromPath = this.$route.query.from;
              var fromGroup = this.$route.query.group;
              console.log(fromPath)
              console.log(fromGroup)
              this.$router.push({path:fromPath ,query:{group:fromGroup}});
            }
            else{
              this.$message.error('添加失败')
            }
          })
        };
    },
    cancel() {
      this.$router.push('/forum')
    },


    beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
    handleRemove() {
      
    },
    handlePreview(file) {
      
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`);
    },
    handleChange() {
      
      console.log(this.$refs.upload)
      // var filename = this.$refs.upload.uploadFiles[0].name;
      // filename = filename.substring(0, filename.lastIndexOf("."));
      // this.fileForm.headline = filename;
    },

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

/deep/ .el-radio{
  display: block;
  line-height: 23px;
  white-space: normal;
  margin-right: 0;
}

 .avatar-uploader{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
</style>