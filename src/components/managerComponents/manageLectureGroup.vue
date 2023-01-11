<template>

  <div class="lectureGroupList-box">

    <div style="display: flex">
      <el-input
        v-model="inputText"
        placeholder="请输入标题"
        class="input-box"
      ></el-input>
      <el-button type="primary" @click="searchGroup()">查询</el-button>

      <el-button type="primary" @click="handleSubmit()">新增分组</el-button>
      <el-dialog title="提示" :visible.sync="submitVisible" width="60%" center>
         <el-form :model="groupForm">
          <el-form-item label="标题" prop="name">
            <el-input v-model="groupForm.name" placeholder="请输入标题"></el-input>
          </el-form-item>
          
          <el-form-item label="内容" prop="content">
            <editor-bar class="editor-box" v-if="isReloadData" :content="this.groupForm.content" @change="flash" ></editor-bar>
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
      <el-table :data="lectureGroupList" border style="width: 100%" align="center">

        <el-table-column prop="id" label="序号"  min-width="10%"></el-table-column>
        <el-table-column prop="name" label="标题" min-width="20%"></el-table-column>
        <el-table-column prop="content" label="内容">
          <template slot-scope="scope">
            <div v-html="scope.row.content"></div>
          </template>  
        </el-table-column>
        <el-table-column label="操作" min-width="30">
          <template slot-scope="scope">
            <el-button size="small" type="success" @click="handleView(scope.row)">查看</el-button>
            
    
            <el-button size="small" type="info" @click="handleEdit(scope.$index, scope.row)">修改内容</el-button>

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
import EditorBar from '../../common/wangEditor.vue'
export default {
  name: "managerLectureGroup",
  components: { EditorBar },
  data() {
    return {
      isReloadData: false,
      lectureGroupList: [],
      inputText: "",
      data: [],
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
      groupForm: {
        id: null,
        name:'',
        content: '',
      },
      //文件编辑
      groupEditorForm: {
        id: 0,
        name:'',
        content: '',
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
    type: () => {
      return (classification) => {
        console.log(classification)
        if(classification == "NEWS") {
          return 'PDF文件'
        }
        else {
          return '富文本'
        }
      }
    }
  },
  created() {
    console.log(this.$route)
    this.getAllLectureGroups();
  },
  watch: {},
  methods: {
    flash (val) {
      console.log(this.groupForm.content)
      this.groupForm.content = val.val
    },

    getAllLectureGroups() {
      this.$axios.post('/api/lecture/getAllLectureGroups').then(res => {
        console.log(res.data.data);
        this.data = res.data.data;
        this.setlectureGroupList(this.data);
      }) 
    },

    setlectureGroupList(list) {
      this.lectureGroupList = list
    },


    beforeRemove(file, fileList) {
          return this.$confirm(`确定移除 ${ file.name }？`);
        },
    handleRemove() {
      this.groupForm.headline = '';
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
      this.groupForm.headline = filename;
    },
    
  

  searchGroup() {
    if (this.inputText) {
      console.log(this.inputText)
      var slist = [];
      // 过滤需要的数据
      
      this.data.forEach((item) => {
        // 检测搜索关键字 和 判断是否删除的数据
        console.log(JSON.stringify(item.name).toLowerCase())
        if ( JSON.stringify(item.name).indexOf(this.inputText) !== -1) {
          slist.push(item);
        }
      });
      this.setlectureGroupList(slist); // 将过滤后的数据给了lectureGroupList
    }
    else {
      // 没有搜索内容，则展示全部数据
      this.setlectureGroupList(this.data)
    }
    },


    jumpWirteNews() {
      console.log(this.$route)
      this.$router.push({path:"/Manager/writeArticle",query:{from:this.$route.path, method:'INSERT'}})
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
    reloadEditor () {
      this.isReloadData = false
      this.$nextTick(() => {
        this.isReloadData = true
      })
    },

    handleSubmit() {
      this.submitVisible = true;
      this.groupForm.id = null;
      this.reloadEditor();
    },
    determineSubmit() {
      console.log(this.groupForm);
      if(this.groupForm.id == null) {
        let groupForm = {};
        groupForm.name = this.groupForm.name;
        groupForm.content = this.groupForm.content;
        console.log(groupForm);
        this.$axios.post('/api/lecture/insertLectureGroup',JSON.stringify(groupForm), {headers: {"Content-type": "application/json"}
          }).then(res => {
            console.log(res)
            if(res.data.code == 200){
                this.$message.success('添加成功')
                this.submitVisible = false
                this.getAllLectureGroups();
              }
            else {
              this.$message.error('添加失败')
            }
          }).catch(error => {
            console.log(error);
            this.$message.error('添加失败')
          })
      }
      else {
        
        this.$axios.post('/api/lecture/updateLectureGroup',JSON.stringify(this.groupForm), {headers: {"Content-type": "application/json"}
          }).then(res => {
            console.log(res)
            if(res.data.code == 200){
                this.$message.success('编辑成功')
                this.submitVisible = false
                this.getAllLectureGroups();
              }
            else {
              this.$message.error('编辑失败')
            }
          }).catch(error => {
            console.log(error);
            this.$message.error('编辑失败')
          })
      }
    },
    //单行删除
    handleDelete(index, row) {
      this.delmsg = row;//每一条数据的记录
      this.delarr.push(this.delmsg);//把单行删除的每条数据的id添加进放删除数据的数组
      this.delVisible = true;
    },
    // 确定删除
    deleteRow() {
      this.$axios.post("/api/lecture/deleteLectureGroup",
        this.$qs.stringify({groupId: this.delmsg.id,})).then(res => {
        console.log(res.data)
        if(res.data.data == true){
          this.$message.success('删除成功')
          this.getAllLectureGroups();
          this.delVisible = false
        }
      }).catch(error => {
        console.log(error);
        this.$message.error('删除失败')
      })
    },
    //编辑
    handleEdit(index,row) {
      this.groupForm = row
      console.log(this.groupForm)
      this.reloadEditor();
      this.submitVisible = true;
    },
    determineEdit() {
      if(!this.groupEditorForm.headline) {
        this.$message.error('标题不能为空')
      }
      else {
      
        this.$axios.post('/api/article/updateArticleFile',JSON.stringify(this.groupEditorForm),{headers: {"Content-type": "application/json"}})
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
      this.$router.push({path:"/Manager/manageLecture",query:{from:this.$route.path, group:JSON.stringify(row)}})
    }
  }
}
</script>

<style scoped>
.lectureGroupList-box {
  width: 100%;
  padding-right: 5%;
}
.input-box {
  width: 20%;
  margin: 0 2%;
}
.editor-box {
  float: right;
  width: 100%;
  height: 100%;
  padding-bottom: 2%;
  padding-top: 1%;
  text-align: left;
}
</style>