<template>
  <div class="newsList-box">
    <div style="display: flex">
      <el-input
        v-model="inputText"
        placeholder="请输入标题"
        class="input-box"
      ></el-input>
      <el-button type="primary" @click="searchUser()">查询</el-button>
      <el-button type="primary" @click="jumpWirteNews()">手动编辑</el-button>
      <el-button type="primary" @click="handleSubmit()">上传文件</el-button>
      <el-dialog title="提示" :visible.sync="submitVisible" width="30%" center>
        <el-form :model="fileForm">
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
            <el-input
              v-model="fileForm.headline"
              placeholder="请输入标题"
              style="width: 80%"
            ></el-input>
          </el-form-item>
          <el-form-item label="标签">
            <el-select
              v-model="fileForm.classification"
              filterable
              placeholder="请选择"
              style="width: 80%"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
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
      <el-table :data="newsList" border style="width: 100%" align="center">
        <el-table-column prop="fileType" label="文件类型" min-width="10">
          <template slot-scope="scope">
            {{ type(scope.row.fileType) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          label="序号"
          min-width="10%"
        ></el-table-column>
        <el-table-column prop="headline" label="标题"></el-table-column>
        <el-table-column prop="classification" label="文章分类" min-width="10">
          <template slot-scope="scope">
            {{ cfLabel(scope.row.classification) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="30%">
          <template slot-scope="scope">
            <el-dialog
              title="文件编辑（仅修改标题）"
              :visible.sync="editVisible"
              width="30%"
              :before-close="handleClose"
            >
              <el-form :model="fileEditForm">
                <el-form-item label="标题" prop="headline">
                  <el-input
                    v-model="fileEditForm.headline"
                    placeholder="请输入标题"
                  ></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="determineEdit()"
                  >确 定</el-button
                >
                <el-button @click="editVisible = false">取 消</el-button>
              </span>
            </el-dialog>
            <el-button
              size="small"
              type="success"
              @click="handleView(scope.row)"
              >查看</el-button
            >

            <el-button
              size="small"
              type="info"
              @click="handleEdit(scope.$index, scope.row)"
              >修改内容</el-button
            >

            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
            <el-dialog
              title="提示"
              :visible.sync="delVisible"
              width="300px"
              center
            >
              <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
              </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script>
import sha256 from "sha256";
export default {
  name: "managerNews",
  data() {
    return {
      newsList: [],
      inputText: "",
      data: [],
      //campuses: [],
      //campuseSelection: '',
      //catObj: [],

      search: "",

      options: [
        {
          value: "ALL",
          label: "全部内容",
        },
        {
          value: "ARTICLE",
          label: "安宁文章",
        },
        {
          value: "PROFESSION",
          label: "专业知识",
        },
        {
          value: "EDUCATION",
          label: "安宁教育",
        },
        {
          value: "POLICY",
          label: "政策解读",
        },
        {
          value: "NEWS",
          label: "新闻资讯",
        },
        {
          value: "CELEBRITY",
          label: "名人事迹",
        },
        {
          value: "HORIZON",
          label: "安宁视界",
        },
        {
          value: "OTHER",
          label: "其他内容",
        },
      ],
      //文件上传
      fileForm: {
        headline: "",
        file: {},
        classification: "other",
      },
      //文件编辑
      fileEditForm: {
        id: null,
        file: {},
        headline: "",
        classification: "other",
      },
      submitVisible: false,

      formLabelWidth: "20%",
      dialogVisible: false,
      //user_permission
      permissionList: [],
      //deleteUser
      delVisible: false,
      delmsg: "", //记录每一条的信息，便于取id
      delarr: [], //存放删除的数据
      //editUser
      editUser: {}, //存放编辑的用户信息
      editVisible: false,
    };
  },
  computed: {
    type: () => {
      return (fileType) => {
        console.log(fileType);
        if (fileType == "PDF") {
          return "PDF文件";
        } else {
          return "富文本";
        }
      };
    },
    cfLabel: function () {
      return (cf) => {
        console.log(this.options);
        var val = "";
        this.options.forEach((option) => {
          if (option.value == cf) {
            console.log(option.label);
            val = option.label;
          }
        });
        console.log(val);
        return val;
      };
    },
  },
  created() {
    console.log(this.$route);
    this.getAllNews();
  },
  watch: {},
  methods: {
    async getAllNews() {
      var data = [];

      var getAllArticleInfo = await this.$axios.post(
        "/api/article/getAllArticleInfo"
      );
      var resData1 = getAllArticleInfo.data.data;
      resData1.forEach((item) => {
        item.fileType = "RTF";
      });
      data = data.concat(resData1);
      // .then(res => {
      //     console.log(res.data.data);
      //     var resData = res.data.data;
      //     resData.forEach((item) => {
      //       item.fileType = 'RTF';
      //     })
      //     data = data.concat(resData);
      //   })
      var getAllArticleFiles = await this.$axios.post("/api/article/getAllArticleFiles")
      var resData2 = getAllArticleFiles.data.data;
      resData2.forEach((item) => {
        item.fileType = "PDF";
      });
      data = data.concat(resData2);

      this.data = data;
      this.setNewsList(data);

        // .then((res) => {
        //   console.log(res.data.data);
        //   var resData = res.data.data;
        //   resData.forEach((item) => {
        //     item.fileType = "PDF";
        //   });
        //   data = data.concat(resData);
        // });
      // Promise.all([getAllArticleInfo, getAllArticleFiles]).then(() => {
      //   this.data = data;
      //   this.setNewsList(data);
      // });
    },
    setNewsList(list) {
      this.newsList = list;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleRemove() {
      this.fileForm.headline = "";
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
      console.log(this.fileForm.file);
      var formData = new FormData();
      formData.append("file", this.fileForm.file);
      formData.append("headline", this.fileForm.headline);
      formData.append("classification", this.fileForm.classification);
      this.$axios
        .post("/api/article/uploadArticleFile", formData, {
          headers: { "Content-Type": "multipart/form-data; boundary=xxxx" },
        })
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            this.$message.success("上传成功");
            this.submitVisible = false;
            this.getAllNews();
          } else {
            this.$message.error("上传失败");
          }
        });
    },

    searchUser() {
      if (this.inputText) {
        console.log(this.inputText);
        var slist = [];
        // 过滤需要的数据

        this.data.forEach((item) => {
          // 检测搜索关键字 和 判断是否删除的数据
          console.log(JSON.stringify(item.username).toLowerCase());
          if (
            JSON.stringify(item.username).indexOf(this.inputText) !== -1 ||
            JSON.stringify(item.nickName).indexOf(this.inputText) !== -1
          ) {
            slist.push(item);
          }
        });
        this.setNewsList(slist); // 将过滤后的数据给了newsList
      } else {
        // 没有搜索内容，则展示全部数据
        this.setNewsList(this.data);
      }
    },

    jumpWirteNews() {
      console.log(this.$route);
      this.$router.push({
        path: "/Manager/writeArticle",
        query: { from: this.$route.path, method: "INSERT" },
      });
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    //上传文件
    handleSubmit() {
      this.submitVisible = true;
    },
    //单行删除
    handleDelete(index, row) {
      this.delmsg = row; //每一条数据的记录
      this.delarr.push(this.delmsg); //把单行删除的每条数据的id添加进放删除数据的数组
      this.delVisible = true;
    },
    // 确定删除
    deleteRow() {
      console.log(1);
      var delapi = "";
      var delObj = {};
      if (this.delmsg.fileType == "PDF") {
        delapi = "/api/article/deleteArticleFile";
        delObj = { articleFileId: this.delmsg.id };
      } else {
        delapi = "/api/article/deleteArticle";
        delObj = { articleId: this.delmsg.id };
      }
      this.$axios
        .post(delapi, this.$qs.stringify(delObj))
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            this.$message.success("删除成功");
            this.getAllNews();
            this.delVisible = false;
          }
        })
        .catch((error) => {
          console.log(error);
          this.$message.error("删除失败");
        });
    },

    //编辑
    handleEdit(index, row) {
      if (row.fileType == "RTF") {
        this.$router.push({
          path: "/Manager/writeArticle",
          query: {
            from: this.$route.path,
            method: "UPDATE",
            article: JSON.stringify(row),
          },
        });
      } else {
        this.fileEditForm = row;
        this.editVisible = true;
      }
    },
    determineEdit() {
      if (!this.fileEditForm.headline) {
        this.$message.error("标题不能为空");
      } else {
        this.$axios
          .post(
            "/api/article/updateArticleFile",
            JSON.stringify(this.fileEditForm),
            { headers: { "Content-type": "application/json" } }
          )
          .then((res) => {
            console.log(res);
            this.editUser = {};
            if (res.status == 200) {
              this.$message.success("编辑成功");
              this.editVisible = false;
              window.location.reload();
            } else {
              this.$message.error("编辑失败");
            }
          });
      }
    },
    handleView(row) {
      if (row.fileType == "PDF") {
        window.open(path);
      } else {
        this.$router.push({
          path: "/RTFarticle",
          query: { from: this.$route.path, article: JSON.stringify(row) },
        });
      }
    },
  },
};
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