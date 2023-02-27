<template>
  <div class="applyList-box">
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
      <el-table :data="applyList"  style="width: 100%" :row-class-name="tableRowClassName">

        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="用户名">
                <span>{{ props.row.user.username }}</span>
              </el-form-item>
              <el-form-item label="电子邮箱">
                <span>{{ props.row.user.email }}</span>
              </el-form-item>
              <el-form-item label="昵称">
                <span>{{ props.row.user.nickName }}</span>
              </el-form-item>
              <el-form-item label="性别">
                <span>{{ props.row.user.sex }}</span>
              </el-form-item>
              <el-form-item label="职业">
                <span>{{ props.row.user.occupation }}</span>
              </el-form-item>
              <el-form-item label="单位/团体">
                <span>{{ props.row.user.unit }}</span>
              </el-form-item>
              <el-form-item label="联系地址">
                <span>{{ props.row.user.address }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column prop="id" label="序号"  min-width="5"></el-table-column>
        <el-table-column prop="createTime" label="申请时间" min-width="15"></el-table-column>
        <el-table-column prop="content" label="申请理由" min-width="60"></el-table-column>
        <el-table-column label="状态"  min-width="5">
          <template slot-scope="scope">
            {{applicationReasonState[scope.row.state][1]}}
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="10">
          <template slot-scope="scope">
            <el-button size="small" type="success" @click="pass(scope.row.id)">通过</el-button>
            <el-button size="small" type="danger" @click="reject(scope.row.id)">拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script>
export default {
  name: "applyVolunteer",
  data() {
    return {
      applyList:[],
      inputText: "",
      applicationReasonState: {
        "Unknown": [0, "未知"],
        "Wait": [1, "待审核"],
        "Pass": [2, "已通过"],
        "Reject": [3, "已拒绝"]
      }
    }
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      if (row.state == "Reject") {
        return 'warning-row';
      } else if (row.state == "Pass") {
        return 'success-row';
      }
      return '';
    },
    getAllVolunteerReason() {
      this.$axios.post("/api/manager/reason/getAllVolunteerReason").then(res=>{
        console.log(res)
        this.applyList = res.data.data
        console.log(this.applyList)
      })
    },
    setUserList(list) {
      this.applyList = list
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
        this.setUserList(slist); // 将过滤后的数据给了userList
      }
      else {
        // 没有搜索内容，则展示全部数据
        this.setUserList(this.data)
      }
    },
    pass(id) {
      this.updateVolunteerReasonState(id, "Pass");
    },
    reject(id) {
      this.updateVolunteerReasonState(id, "Reject");
    },
    updateVolunteerReasonState(id, state) {
      // const params = new URLSearchParams()
      // params.append(id, id)
      // params.append(state, this.applicationReasonState[state])
      const params = {id: id, state: state}
      console.log(params)
      this.$axios.post("/api/manager/reason/updateVolunteerReasonState",this.$qs.stringify(params)).then(res=>{
        console.log(res)
        this.getAllVolunteerReason();
      })

    }

  },
  created() {
    this.getAllVolunteerReason();
  }
}
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand /deep/ label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  margin-left: 4%;
  width: 46%;
}
.applyList-box {
  width: 100%;
  padding-right: 5%;
}
.input-box {
  width: 20%;
  margin: 0 2%;
}
.el-table /deep/ .warning-row {
  background: oldlace;
}

.el-table /deep/ .success-row {
  background: #f0f9eb;
}
</style>
