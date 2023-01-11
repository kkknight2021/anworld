<template>

  <div class="careInstitutionsList-box">

    <div style="display: flex">
      <el-input
        v-model="inputText"
        placeholder="请输入标题"
        class="input-box"
      ></el-input>
      <el-button type="primary" @click="searchGroup()">查询</el-button>

      <el-button type="primary" @click="handleSubmit()">新增机构</el-button>
      <el-dialog title="提示" :visible.sync="submitVisible" width="50%" center>
         <el-form :model="InsForm" label-position="right" label-width="10%">
          <el-form-item label="机构名" prop="name">
            <el-input v-model="InsForm.name" placeholder="请输入机构名（必填）"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="InsForm.phone" placeholder="请输入电话"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="InsForm.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="营业时间" prop="officeHours">
            <el-input  v-model="InsForm.officeHours" placeholder="请输入营业时间"></el-input>
          </el-form-item>
          <el-form-item label="区划" prop="" >
            <el-cascader  v-if="InsForm.selectOption" ref="cascader" style="width:100%" id="selectBox" size="large" :options="cityOptions" v-model="InsForm.selectOption" :props="cityProps" @change="getSelection()"></el-cascader>
          </el-form-item>
          <el-form-item label="坐标" prop="">
            <el-col :span="9">
              <el-input style="width: 100%;" v-model="InsForm.coordinateX" placeholder="请输入经度"></el-input>
            </el-col>
            <el-col class="line" :span="1">-</el-col>
            <el-col :span="9">
              <el-input v-model="InsForm.coordinateY" placeholder="请输入纬度"></el-input>
            </el-col>
            <el-col class="line" :span="1">&nbsp</el-col>
            <el-col :span="4">
              <el-button type="primary" @click="getLngLat()">获取经纬度</el-button>
            </el-col>
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
      <el-table :data="careInstitutionsList" border style="width: 100%" align="center">
        
        <el-table-column prop="id" label="序号"  min-width="5%"></el-table-column>
        <el-table-column prop="name" label="名称" min-width="15%"></el-table-column>
        <el-table-column prop="officeHours" label="营业时间" min-width="12%"></el-table-column>
        <el-table-column  label="区划" min-width="20%">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>坐标: {{scope.row. coordinateX}}，{{scope.row. coordinateY}}</p>
              <div slot="reference" class="name-wrapper">
                {{scope.row.province}}{{scope.row.prefecture}}{{scope.row.county}}{{scope.row.township}}
              </div>
            </el-popover>
          </template>  
        </el-table-column>
        <el-table-column prop="phone" label="联系电话" min-width="13%"></el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="13%"></el-table-column>
        <el-table-column label="操作" min-width="22%">
          <template slot-scope="scope">
            <el-button size="small" type="success" @click="handleView(scope.row)">查看位置</el-button>
            
            <el-button size="small" type="info" @click="handleEdit(scope.$index, scope.row)">修改信息</el-button>
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

</template>n

<script>
import cityData from '../../common/cityOptions.js'
import EditorBar from '../../common/wangEditor.vue'
export default {
  name: "managerLectureGroup",
  components: { EditorBar },
  data() {
    return {
      cityOptions:cityData,
      cityProps: {
        value: 'name',
        label: 'name',
        children: 'children'
      },
      careInstitutionsList: [],
      inputText: "",
      data: [],
      //campuses: [],
      //campuseSelection: '',
      //catObj: [],

      search: '',

      
      InsForm: {
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
    console.log(this.cityOptions)
    this.getCareInstitutionsByLocation();
  },
  mounted() {
    console.log(1)
    this.$bus.$on('lng',(lng) => {
      console.log(this.$bus)
      this.InsForm.lng = lng });
  },
  methods: {
    getLngLat() {
      var route = this.$router.resolve({path:'/MapTest', query:{from:this.$route.path,name:this.InsForm.name}});
      window.open(route.href, '_blank');
    },
    getSelection() {
      console.log(2)
      console.log(this.InsForm.selectOption)
      this.InsForm.province = this.$refs.cascader.getCheckedNodes()[0].pathLabels[0];
      this.InsForm.prefecture = this.$refs.cascader.getCheckedNodes()[0].pathLabels[1];
      this.InsForm.county = this.$refs.cascader.getCheckedNodes()[0].pathLabels[2];
      this.InsForm.township = this.$refs.cascader.getCheckedNodes()[0].pathLabels[3];
    },


    getCareInstitutionsByLocation() {
        this.$axios.post('/api/careInstitution/getCareInstitutionsByLocation', this.$qs.stringify()).then(res => {
          this.data = res.data.data;
          console.log(res)
          this.setCareInstitutionsList(this.data)
        })
      },

    setCareInstitutionsList(list) {
      this.careInstitutionsList = list
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
      if(this.InsForm.id == null) {
        this.InsFormBack = this.InsForm;
      }
      this.submitVisible = false;
    },
    
    //添加或修改
    handleSubmit() {
      this.submitVisible = true;
      this.InsForm = this.InsFormBack;
      
    },
    determineSubmit() {
      console.log(this.InsForm);
      var {selectOption, ...InsForm} = this.InsForm;
      console.log(InsForm)
      if(InsForm.id == null) {
        console.log(InsForm);
        this.$axios.post('/api/careInstitution/insertCareInstitution',JSON.stringify(InsForm), {headers: {"Content-type": "application/json"}
          }).then(res => {
            console.log(res)
            if(res.data.code == 200){
                this.$message.success('添加成功')
                this.submitVisible = false
                this.getCareInstitutionsByLocation();
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
        this.$axios.post('/api/careInstitution/updateCareInstitution',JSON.stringify(InsForm), {headers: {"Content-type": "application/json"}
          }).then(res => {
            console.log(res)
            if(res.data.code == 200){
                this.$message.success('编辑成功')
                this.submitVisible = false
                this.getCareInstitutionsByLocation();
                // setTimeout(() => console.log(1), 1000)
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
      this.$axios.post("/api/careInstitution/deleteCareInstitution",this.$qs.stringify({ciId: this.delmsg.id,})).then(res => {
        console.log(res.data)
        if(res.data.data == true){
          this.$message.success('删除成功')
          this.getCareInstitutionsByLocation();
          this.delVisible = false
        }
      }).catch(error => {
        console.log(error);
        this.$message.error('删除失败')
      })
    },
    //编辑
    handleEdit(index,row) {
      var selectOption = [row.province, row.prefecture, row.county, row.township];
      this.InsForm = {selectOption, ...row};
      console.log(this.InsForm)
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
.careInstitutionsList-box {
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
</style>