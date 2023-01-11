<template>

  <div class="questionsList-box">

    <div style="display: flex">
      <el-input
        v-model="inputText"
        placeholder="请输入标题"
        class="input-box"
      ></el-input>
      <el-button type="primary" @click="searchQuestion()">查询</el-button>

      <el-button type="primary" @click="handleSubmit()">新增问题</el-button>
      <el-dialog title="提示" :visible.sync="submitVisible" width="50%" center>
         <el-form :model="questionForm">
          <el-form-item label="标题" prop="headline">
            <el-input v-model="questionForm.headline" placeholder="请输入问题标题"></el-input>
          </el-form-item>
          
          <el-form-item label="简介" prop="content">
            <el-input type="textarea" :rows="5" placeholder="请输入问题简介" v-model="questionForm.content"></el-input>

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
      <el-table :data="questionsList" border style="width: 100%" align="center">

        <el-table-column prop="id" label="序号"  min-width="10%"></el-table-column>
        <el-table-column prop="headline" label="标题" min-width="20%"></el-table-column>
        <el-table-column prop="content" label="标题内容">
          <template slot-scope="scope">
            <div v-html="scope.row.content"></div>
          </template>  
        </el-table-column>
        <el-table-column label="操作" min-width="30">
          <template slot-scope="scope">
            <el-button size="small" type="success" @click="handleView(scope.row)">查看</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
              <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow" >确 定</el-button>
            </span>
            </el-dialog>
    
            <el-button size="small" type="info" @click="handleEdit(scope.$index, scope.row)">修改内容</el-button>
            
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
      questionsList: [],
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
      questionForm: {
        id: null,
        headline:'',
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
    
  },
  created() {
    console.log(this.$route)
    this.getAllQuestions();
  },
  watch: {},
  methods: {
    getAllQuestions() {
      this.$axios.post("/api/QandA/getAllQuestions").then(res=>{
        console.log(res)
        this.questionsList = res.data.data;
        //console.log(this.data)
      })
    },

    setquestionsList(list) {
      this.questionsList = list
    },

  searchQuestion() {
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
      this.setquestionsList(slist); // 将过滤后的数据给了questionsList
    }
    else {
      // 没有搜索内容，则展示全部数据
      this.setquestionsList(this.data)
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
    

    handleSubmit() {
      this.submitVisible = true;
      this.questionForm.id = null;
      this.questionForm.name = '';
      this.questionForm.content = '';
    },
    determineSubmit() {
      console.log(this.questionForm);
      if(this.questionForm.id == null) {   
        if(this.questionForm.headline) {
          this.$axios.post('/api/QandA/insertQuestion',JSON.stringify(this.questionForm), {headers: {"Content-type": "application/json"}
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
          this.$message.error('标题不能为空')
        }
      }
      else {
       if(this.questionForm.headline) {
          this.$axios.post('/api/QandA/updateQuestion',JSON.stringify(this.questionForm), {headers: {"Content-type": "application/json"}
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
          this.$message.error('标题不能为空')
        }
      }
    },
    //单行删除
    handleDelete(index, row) {
      this.delmsg = row;//每一条数据的记录
      //this.delarr.push(this.delmsg);//把单行删除的每条数据的id添加进放删除数据的数组
      this.delVisible = true;
    },
    // 确定删除
    deleteRow() {
      this.$axios.post("/api/QandA/deleteQuestion",this.$qs.stringify({questionId: this.delmsg.id,})).then(res => {
        console.log(res.data)
        if(res.data.data == true){
          this.$message.success('删除成功')
          window.location.reload();
          this.delVisible = false
        }
      }).catch(error => {
        console.log(error);
        this.$message.error('删除失败')
      })
    },
    //编辑
    handleEdit(index,row) {
      this.questionForm = row
      console.log(this.questionForm)
      this.submitVisible = true;
    },
    
    //查看
    handleView(row) {
      this.$router.push({path:"/QandA",query:{from:this.$route.path, question:JSON.stringify(row)}})
    }
  }
}
</script>

<style scoped>
.newsList-box {
  width: 100%;
  padding-right: 5%;
}
.input-box {
  width: 20%;
  margin: 0 2%;
}
</style>