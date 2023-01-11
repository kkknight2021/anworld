<template>

  <div class="goodsList-box">

    <div style="display: flex">
      <el-input
        v-model="inputText"
        placeholder="请输入标题"
        class="input-box"
      ></el-input>
      <el-button type="primary" @click="searchGroup()">查询</el-button>

      <el-button type="primary" @click="handleAdd()">新增商品</el-button>
      <el-dialog title="提示" :visible.sync="submitVisible" width="50%" center>
         <el-form :model="goodsForm" label-position="right" label-width="10%">
          <el-form-item label="名称" prop="name">
            <el-input v-model="goodsForm.name" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="网址链接" prop="link">
            <el-input v-model="goodsForm.link" placeholder="请输入网址链接"></el-input>
          </el-form-item>
          <el-form-item label="图片链接" prop="pictureLink">
            <el-input v-model="goodsForm.pictureLink" placeholder="请输入图片链接"></el-input>
          </el-form-item>
          <el-form-item label="来源" prop="source">
            <el-input  v-model="goodsForm.source" placeholder="请输入来源"></el-input>
          </el-form-item>
          <el-form-item label="分类" prop="classification" >
            <el-select v-model="goodsForm.classification" placeholder="请选择分类"  style="width:100%;">
               <el-option
                v-for="item in classification"
                :key="item.id"
                :label="item.name"
                :value="item.enum">
              </el-option>
            </el-select>
          </el-form-item>
         </el-form>
         <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="determineSubmit()">确 定</el-button>
            <el-button @click="handleClose()">取 消</el-button>
          </span>
      </el-dialog>

    </div>
    

    <!-- 主体部分 -->
    <el-main>
      <el-table :data="goodsList" border style="width: 100%" align="center">
        
        <el-table-column prop="id" label="序号"  min-width="5%"></el-table-column>
        <el-table-column  label="图片" min-width="10%">
          <template slot-scope="scope">
            <img :src = "scope.row.pictureLink" height="120" width="100">
          </template>  
        </el-table-column>
        <el-table-column prop="name" label="名称" min-width="18%"></el-table-column>
        <el-table-column prop="link" label="链接" min-width="20%"></el-table-column>
        <el-table-column prop="source" label="来源" min-width="12%"></el-table-column>
        <el-table-column label="分类" min-width="13%">
          <template slot-scope="scope">
            {{type(scope.row.classification)}}
          </template> 
        </el-table-column>
        <el-table-column label="操作" min-width="22%">
          <template slot-scope="scope">
            <el-button size="small" type="success" @click="handleView(scope.row)">查看</el-button>
            
            <el-button size="small" type="info" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
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
import cityData from '../../common/cityOptions.js'
import EditorBar from '../../common/wangEditor.vue'
export default {
  name: "managerLectureGroup",
  components: { EditorBar },
  data() {
    return {
      
      goodsList: [],
      inputText: "",
      data: [],

      search: '',
      classification:[1],
      
      goodsForm: {
        id: null,
        name:'',
        link:'',
        pictureLink:'',
        source: '',
        classification: '',
      },
      InsFormBack: {
        id: null,
        name:'',
        content: '',
        email:'',
        officeHours:'',
        province:'',
        prefecture:'',
        county:'',
        township:'',
        lng:'',
        lat:'',
        selectOption:[],
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
    type: function()  {
      return (classification) => {
        console.log(this.classification)
        for(var i = 0; i < this.classification.length; i++) {
          if(this.classification[i].enum ==classification) {
            return this.classification[i].name;
          }
        }
      }
    }
  },
  created() {
    console.log(this.cityOptions)
    this.getGoodsClassification();
    this.getGoodsList();
  },
  mounted() {
    console.log(1)
    this.$bus.$on('lng',(lng) => {
      console.log(this.$bus)
      this.goodsForm.lng = lng });
  },
  methods: {
    
    getGoodsClassification() {
      this.$axios.get("/api/goods/getClassification").then(res=>{
        console.log(res)
        this.classification = res.data.data;
        console.log(this.classification)
      })
    },

    getGoodsList() {
        this.$axios.post('/api/goods/getGoods').then(res => {
          this.data = res.data.data;
          console.log(res)
          this.setGoodsList(this.data)
        })
      },

    setGoodsList(list) {
      this.goodsList = list
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
      this.setcareInstitutionsList(slist); // 将过滤后的数据给了careInstitutionsList
    }
    else {
      // 没有搜索内容，则展示全部数据
      this.setcareInstitutionsList(this.data)
    }
    },


    handleClose(done) {
      if(this.goodsForm.id == null) {
        this.InsFormBack = this.goodsForm;
      }
      this.submitVisible = false;
    },
    
    //添加或修改
    handleAdd() {
      this.submitVisible = true;
      this.goodsForm = this.InsFormBack;
      
    },
    determineSubmit() {
      console.log(this.goodsForm);
      if(this.goodsForm.id == null) {
        this.$axios.post('/api/manager/goods/insertGoods',JSON.stringify(this.goodsForm), {headers: {"Content-type": "application/json"}
          }).then(res => {
            console.log(res)
            if(res.data.code == 200){
                this.$message.success('添加成功')
                this.submitVisible = false
                this.getGoodsList();
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
        this.$axios.post('/api/manager/goods/updateGoods',JSON.stringify(this.goodsForm), {headers: {"Content-type": "application/json"}
          }).then(res => {
            console.log(res)
            if(res.data.code == 200){
                this.$message.success('编辑成功')
                this.submitVisible = false
                this.getGoodsList();
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
      this.$axios.post("/api/manager/goods/deleteGoods",this.$qs.stringify({goodsId: this.delmsg.id,})).then(res => {
        console.log(res.data)
        if(res.data.data == true){
          this.$message.success('删除成功')
          this.getGoodsList();
          this.delVisible = false
        }
      }).catch(error => {
        console.log(error);
        this.$message.error('删除失败')
      })
    },
    //编辑
    handleEdit(index,row) {
      this.goodsForm = row;
      console.log(this.goodsForm)
      this.submitVisible = true;
    },
    
    //查看
    handleView(row) {
      this.$router.push({path:'/MapTest', query:{from:this.$route.path,lng:row.coordinateX,lat:row.coordinateY}})
    }
  }
}
</script>

<style scoped>
.goodsList-box {
  width: 100%;
  padding-right: 5%;
}
.input-box {
  width: 20%;
  margin: 0 2%;
}
.line {
  text-align: center;
}
.img {
  height: 100px;
  width:  80px;
}
</style>