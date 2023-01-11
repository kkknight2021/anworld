<template>

  <div class="lectureList-box">

    <div style="display: flex">
      <el-input
        v-model="inputText"
        placeholder="请输入标题"
        class="input-box"
      ></el-input>
      <el-button type="primary" @click="searchUser()">查询</el-button>
      <el-button type="primary" @click="jumpWriteLecture()">增加</el-button>
      <el-dialog title="提示" :visible.sync="submitVisible" width="50%" center>
         <el-form :model="fileForm">
          <el-radio-group v-model="classificationLabel" >
            <el-radio-button v-for="cf in classificationArr" :key="cf.id" :label="cf.id">{{cf.value}}</el-radio-button>
      
          </el-radio-group>
          <el-form-item label="文件">
            <el-upload
              class="upload-demo"
              ref="upload"
              action=""
              :on-remove="handleRemove"
              :on-preview="handlePreview"
              :on-change="handleChange"
              :on-exceed="handleExceed"
              accept="application/pdf,application/x-pdf"
              :limit="1"
              :auto-upload="false"
              >
              <el-button size="small" type="primary">选择文件</el-button>
              <div slot="tip" class="el-upload__tip">只能上传PDF文件</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="标题" prop="headline">
            <el-input v-model="fileForm.headline" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="作者" prop="author">
            <el-input v-model="fileForm.author" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="标题" prop="source">
            <el-input v-model="fileForm.headline" placeholder="请输入标题"></el-input>
          </el-form-item>
         </el-form>
         <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="determineSubmit()">确 定</el-button>
            <el-button @click="submitVisible = false">取 消</el-button>
          </span>
      </el-dialog>

    </div>
    

    <!-- 主体部分 -->
    <el-main>
      <el-table :data="lectureList" border style="width: 100%" align="center">

        <el-table-column prop="id" label="序号"  min-width="10%"></el-table-column>
        <el-table-column prop="author" label="作者"  min-width="20%"></el-table-column>
        <el-table-column prop="headline" label="标题"></el-table-column>
        <el-table-column prop="source" label="来源" min-width="23%"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" min-width="27%"></el-table-column>
        <el-table-column prop="classification" label="类型" min-width="18%">
          <template slot-scope="scope">
            {{type(scope.row.classification)}}
          </template>  
        </el-table-column>
        <el-table-column label="操作" min-width="50%">
          <template slot-scope="scope">
            <el-button size="small" type="success" @click="handleView(scope.row)">查看</el-button>
            

            <el-button size="small" type="info" @click="handleEdit(scope.$index, scope.row)">修改内容</el-button>
            <el-dialog
              title="文件编辑（仅修改标题）"
              :visible.sync="editVisible"
              width="30%"
              :before-close="handleClose">
              <el-form :model="fileEditForm">   
                <el-form-item label="标题" prop="headline">
                  <el-input v-model="fileEditForm.headline" placeholder="请输入标题"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="determineEdit()">确 定</el-button>
                    <el-button @click="editVisible = false">取 消</el-button>
                </span>
            </el-dialog>

            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
              <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow" >确 定</el-button>
            </span>
            </el-dialog>
            <!-- <el-button type="success" @click="editClick(scope.row)" size="mini">编辑</el-button>
            <el-button type="danger" size="mini">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>

</template>

<script>
import sha256 from "sha256";
export default {
  name: "managerLecture",
  data() {
    return {
      group:{},
      lectureList: [],
      inputText: "",
      data: [],
      classificationObj: {
        'ARTICLE':'纯文本',
        'VIDEO':'含视频',
        'LINK':'含网址链接',
        'REMOTE_VIDEO':'含视频链接',
      },
      classificationArr: [{id:0,value:'纯文本'},{id:1,value:'含视频'},{id:2,value:'含网址链接'},{id:3,value:'含视频链接'}],
      classificationLabel: "",
      //campuses: [],
      //campuseSelection: '',
      //catObj: [],

      search: '',
      //createuser
      addUser: {
        username: '',
        password: '',
        email: '',
        permission: '',
      },
      //文件上传
      fileForm: {
        headline:'',
        file: {},
        classification: 'NEWS',
      },
      //文件编辑
      fileEditForm: {
        id: null,
        file: {},
        headline:'',
        classification: 'NEWS',
      },
      submitVisible: false,


      formLabelWidth: '20%',
      dialogVisible: false,
      //user_permission
      permissionList: [],
      //deleteUser
      delVisible: false,
      delmsg: "",//记录每一条的信息，便于取id
      delarr: [],//存放删除的数据
      //editUser
      editUser:{},//存放编辑的用户信息
      editVisible:false,

    };
  },
  computed: {
    type: function() {
      // console.log(this.classification)
      return (classification) => {
        console.log(this.classificationObj[classification])
        return this.classificationObj[classification];
      }
    }
  },
  created() {
    this.group = JSON.parse(this.$route.query.group);
    console.log(this.$route.query)
    this.getLecturesByGroupId(this.group.id);
  },
  methods: {
  getLecturesByGroupId(groupId) {
    this.$axios.post('/api/lecture/getLecturesByGroupId',this.$qs.stringify({groupId:groupId})).then(res => {
      console.log(res.data.data);
      this.data = res.data.data;
      this.setlectureList(this.data);
    }) 
  },


  setlectureList(list) {
    this.lectureList = list
  },
  beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
  handleRemove() {
    this.fileForm.headline = '';
  },
  handlePreview(file) {
    console.log(file);
  },
  handleExceed(files, fileList) {
    this.$message.warning(`当前限制选择 1 个文件`);
  },
  handleChange() {
    var filename = this.$refs.upload.uploadFiles[0].name;
    filename = filename.substring(0, filename.lastIndexOf("."));
    this.fileForm.headline = filename;
  },
  determineSubmit() {
    this.fileForm.file = this.$refs.upload.uploadFiles[0].raw;
    console.log(this.fileForm.file)
    var formData = new FormData();
    formData.append("file", this.fileForm.file);
    formData.append("headline", this.fileForm.headline);
    formData.append("classification", this.fileForm.classification)
    this.$axios.post('/api/article/uploadArticleFile',formData,{headers:{"Content-Type": "multipart/form-data; boundary=xxxx"}
      }).then(res => {
        console.log(res)
        if(res.data.code == 200){
            this.$message.success('上传成功')
            this.submitVisible = false
          }
        else {
          this.$message.error('上传失败')
        }
      }).catch(error => {
        console.log(error);
        this.$message.error('上传失败')
      })
  },
  

    searchUser() {
      if (this.inputText) {
        console.log(this.inputText)
        var slist = [];
        // 过滤需要的数据
        
        this.data.forEach((item) => {
          // 检测搜索关键字 和 判断是否删除的数据
          console.log(JSON.stringify(item.username).toLowerCase())
          if ( JSON.stringify(item.username).indexOf(this.inputText) !== -1 || JSON.stringify(item.nickName).indexOf(this.inputText) !== -1) {
            slist.push(item);
          }
        });
        this.setlectureList(slist); // 将过滤后的数据给了lectureList
      }
      else {
        // 没有搜索内容，则展示全部数据
        this.setlectureList(this.data)
      }
    },


    jumpWriteLecture() {

      console.log(this.group)
      this.$router.push({path:"/Manager/writeLecture",query:{from:this.$route.path, group:JSON.stringify(this.group), methor:'INSERT'}})
    },

    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done();
        })
        .catch(() => {
        });
    },
    //上传文件
    handleSubmit() {
      this.submitVisible = true;
    },
    //单行删除
    handleDelete(index, row) {
      this.delmsg = row;//每一条数据的记录
      this.delarr.push(this.delmsg);//把单行删除的每条数据的id添加进放删除数据的数组
      this.delVisible = true;
    },
    // 确定删除
    deleteRow() {
      this.$axios.post("/api/lecture/deleteLecture",this.$qs.stringify({lectureId: this.delmsg.id})).then(res => {
        console.log(res.data)
        if(res.data.code == 200){
          this.$message.success('删除成功')
          this.delVisible = false
          this.getLecturesByGroupId(this.group.id);
        }
      }).catch(error => {
        console.log(error);
        this.$message.error('删除失败')
      })
    },
    //编辑
    handleEdit(index,row) {
      console.log(row)
      this.$router.push({path:"/Manager/writeLecture",query:{from:this.$route.path, method:'UPDATE', group:JSON.stringify(this.group), lecture:JSON.stringify(row)}})
      
    },
    determineEdit() {
      if(!this.fileEditForm.headline) {
        this.$message.error('标题不能为空')
      }
      else {
      
        this.$axios.post('/api/article/updateArticleFile',JSON.stringify(this.fileEditForm),{headers: {"Content-type": "application/json"}})
        .then(res => {
          console.log(res)
          this.editUser = {}
          if(res.status == 200){
            this.$message.success('编辑成功')
            this.editVisible=false
            window.location.reload(); 
          }
          else{
            this.$message.error('编辑失败')
          }
        })
        .catch(error =>{
          console.log('editerr' + error)
          this.$message.error('编辑失败')
        })
      }

    },
    //查看
    handleView(row) {
      if(row.classification == 'LINK') {
        window.open(row.reference)
      }
      else {
        this.$router.push({path:'/lecture', query:{from:this.$route.path,lecture:JSON.stringify(row)}})
      }
    }
  }
}
</script>

<style scoped>
.lectureList-box {
  width: 100%;
  padding-right: 5%;
}
.input-box {
  width: 20%;
  margin: 0 2%;
}
</style>