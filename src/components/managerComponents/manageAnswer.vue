<template>

  <div class="answerList-box">

    <div style="display: flex">
      <el-input
        v-model="inputText"
        placeholder="请输入标题"
        class="input-box"
      ></el-input>
      <el-button type="primary" @click="searchAnswer()">查询</el-button>

      <el-button type="primary" @click="handleSubmit()">新增回答</el-button>
      <el-dialog title="提示" :visible.sync="submitVisible" width="50%" center>
         <el-form :model="answerForm">

          <el-form-item label="答案内容" prop="content">
            <editor-bar v-if="isReloadData" :content="this.answerForm.content" @change="flash" ></editor-bar>
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
      <el-table :data="answerList" border style="width: 100%" align="center">

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
      answerList: [],
      inputText: "",
      data: [],


      search: '',
      //createuser
      addUser: {
        username: '',
        password: '',
        email: '',
        permission: '',
      },
      //文件上传
      answerForm: {
        id: null,
        questionId:JSON.parse(this.$route.query.question).id,
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
    this.questions = JSON.parse(this.$route.query.question)
    console.log(this.$route)
    this.getAnswersByQuestionId();
  },
  watch: {},
  methods: {
    flash (val) {
      console.log(this.answerForm.content)
      this.answerForm.content = val.val
    },

    getAnswersByQuestionId(question) {
      this.$axios.post("/api/QandA/getAnswersByQuestionId", this.$qs.stringify({questionId: question.id,})).then(res=>{
        console.log(res)
        this.answerList = res.data.data;
        //console.log(this.data)
      })
    },

    setanswerList(list) {
      this.answerList = list
    },

  searchAnswer() {
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
      this.setanswerList(slist); // 将过滤后的数据给了answerList
    }
    else {
      // 没有搜索内容，则展示全部数据
      this.setanswerList(this.data)
    }
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
    this.answerForm.id = null;
    //this.reloadEditor();
  },
  determineSubmit() {
    console.log(this.answerForm);
    if(this.answerForm.id == null) {
      let answerForm = {};

      answerForm.content = this.answerForm.content;
      console.log(answerForm);
      this.$axios.post('/api/QandA/insertAnswer',JSON.stringify(answerForm), {headers: {"Content-type": "application/json"}
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
      this.$axios.post('/api/QandA/updateAnswer',JSON.stringify(this.answerForm), {headers: {"Content-type": "application/json"}
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
    this.$axios.post("/api/QandA/deleteAnswer",this.$qs.stringify({questionId: this.delmsg.id,})).then(res => {
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
    this.answerForm = row
    console.log(this.answerForm)
    this.reloadEditor();
    this.submitVisible = true;
  },

  },
  //查看
  handleView(row) {
    this.$router.push({path:'/QandA', query:{from:this.$route.path,qustion:JSON.stringify(row)}})

  }
}
</script>
