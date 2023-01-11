<template>

  <div class="userList-box">

    <div style="display: flex">
      <el-input
        v-model="inputText"
        placeholder="请输入昵称或用户名"
        class="input-box"
      ></el-input>
      <el-button type="primary" @click="searchUser">查询</el-button>
    </div>

    <!-- 主体部分 -->
    <el-main>
      <el-table :data="userList" border style="width: 100%" align="center">
        <el-table-column prop="id" label="序号"  ></el-table-column>
        <el-table-column label="头像" >
          <template slot-scope="scope">
            <img src="scope.row.profilePhotoLink">
          </template>
        </el-table-column>
        <el-table-column prop="nickName" label="昵称"></el-table-column>
        <el-table-column prop="username" label="用户名" ></el-table-column>
        <el-table-column prop="email" label="邮箱" ></el-table-column>
        <el-table-column prop="createTime" label="创建时间" ></el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">

          
            <!-- <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
              <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow" >确 定</el-button>
            </span>
            </el-dialog> -->

            <el-button size="small" type="info" @click="handleEdit(scope.$index, scope.row)">修改权限</el-button>
            <el-dialog
              title="编辑信息"
              :visible.sync="editVisible"
              width="30%"
              :before-close="handleClose">
              <el-form :model="editUser">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                  <el-input v-model="editUser.username" autocomplete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="昵称" :label-width="formLabelWidth">
                  <el-input v-model="editUser.nickName" autocomplete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                  <el-input v-model="editUser.email" autocomplete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="权限" :label-width="formLabelWidth">
                  <el-checkbox-group v-model="editUser.permissions">
                    <el-checkbox v-for="item in permissionList" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="determineEdit()">确 定</el-button>
                    <el-button @click="editVisible = false">取 消</el-button>
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
  name: "managerUser",
  data() {
    return {
      userList: [],
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
  created() {
    this.getUserInfo();
    this.getPermissions();
    // this.setuserList(this.data)
  },
  watch: {},
  methods: {
    getPermissions() {
      this.$axios.get("/api/user/getPermissions").then(res=>{
        this.permissionList = res.data.data
        console.log(this.permissionList)
        console.log(2)
      })
    },

    getUserInfo() {
      var api='/api/manager/user/getAllUsers';
      this.$axios.post(api, {headers: {'Content-Type': 'application/json'}}).then(res => {
        console.log(res);
        this.data = res.data.data;
        this.setuserList(this.data)
        console.log(1)
        // res.data.data.forEach((item) => {
        //   if (item.usable == 1) {
        //     this.data.push(item)
        //   }
        // })
      })
    },
    setuserList(list) {
      this.userList = list
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
        this.setuserList(slist); // 将过滤后的数据给了userList
      }
      else {
        // 没有搜索内容，则展示全部数据
        this.setuserList(this.data)
      }
    },
//createUser
    // createUser() {

    //   if (this.addUser.username === '' || this.addUser.password === '') {
    //     alert("请输入用户名或密码");
    //   } else {
    //     this.addUser.password = sha256(this.addUser.password);
    //     // console.log(this.addUser.permission + ' ' + this.addUser.username)
    //     this.$axios.post('/api/manager/insertUser',
    //       this.$qs.stringify({
    //         username: this.addUser.username,
    //         password: this.addUser.password,
    //         email: this.addUser.email,
    //         permissions: this.addUser.permission
    //         }
    //       )
    //     )
    //       .then((v) => {
    //         console.log(v.data);
    //         window.location.reload();
    //         this.$message.success("添加成功")
    //         this.dialogVisible = false
    //       })
    //       .catch();
    //   }
    // },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done();
        })
        .catch(() => {
        });
    },
    //单行删除
    handleDelete(index, row) {
      this.delmsg = row;//每一条数据的记录
      this.delarr.push(this.delmsg);//把单行删除的每条数据的id添加进放删除数据的数组
      this.delVisible = true;
    },
    // 确定删除
    deleteRow() {
      this.$axios.post("/api/manager/updateUser",
        this.$qs.stringify({
          id: this.delmsg.id,
          permissions: this.delmsg.permissions.join(','),
          usable:0
        }), {headers: {'Content-Type': 'application/json'}}
        ).then(res => {
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
      this.editUser = row;
      var i = 0;
      this.permissionList.forEach((item) => {
        if(item.enum == this.editUser.permissions[i]) {
          this.editUser.permissions[i] = item.id;
          i++;
        }
      }) 
      this.editVisible = true;
      console.log(this.editUser)
      console.log(this.permissionList)
    },
    determineEdit() {
      if(this.editUser.permissions == []) {
        this.$message.error('请选择选择权限')
      }
      else {
        console.log(this.editUser)
        var data = this.$qs.stringify({userId: this.editUser.id, "permissions[]": this.editUser.permissions.join(",")})
        console.log(data)
        this.$axios.post('/api/manager/user/updateUserPermissions',
          data,
           {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        )
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
  }
}
</script>

<style scoped>
.userList-box {
  width: 100%;
  padding-right: 5%;
}
.input-box {
  width: 20%;
  margin: 0 2%;
}
</style>