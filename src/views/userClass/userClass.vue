<template>
  <!-- 资讯列表 -->
  <div style="width:90%;margin-left:5%;margin-top:1%">
    <!-- 搜索条件区域 -->
    <el-form :inline="true"
             :model="formInline"
             class="demo-form-inline">
      <el-form-item label="用户openid">
        <el-input v-model="openid"
                  placeholder="openid"></el-input>
      </el-form-item>
      <el-form-item label="课程id">
        <el-input v-model="obj"
                  placeholder="obj"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 新增课程区域 -->
    <el-form :inline="true"
             :model="formInline"
             class="demo-form-inline">
      <!-- <el-form-item style="float: right;">
        <el-button type="success"
                   @click="toPost">新增用户课程</el-button>
      </el-form-item> -->
    </el-form>

    <el-table :data="tableData">
      <el-table-column prop="id"
                       label="id"
                       width="150"></el-table-column>
      <el-table-column prop="openid"
                       label="用户openid"
                       width="300"></el-table-column>
      <el-table-column prop="obj"
                       label="课程id"
                       width="300"></el-table-column>
      <el-table-column prop="adminId"
                       label="操作人id"
                       width="300"></el-table-column>
      <el-table-column prop="adminName"
                       label="操作人姓名"
                       width="300"></el-table-column>
      <el-table-column label="操作时间"
                       width="200">
        <template slot-scope="scope">{{parseTime(scope.row.adminTime)}}</template>
      </el-table-column>

      <el-table-column fixed="right"
                       label="操作"
                       width="120">
        <template slot-scope="scope">
          <el-button @click.native.prevent="toPut(scope.row.id)"
                     type="text"
                     size="small">修改</el-button>
          <el-button @click.native.prevent="deleteThis(scope.row.id,1)"
                     type="text"
                     size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区 -->

    <div class="blockpage"
         style="margin:0px auto">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage4"
                     :page-sizes="[10, 20, 30, 40]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import { getOrderList, deleteOrder } from "@/api/userClass"
import { parseTime } from "@/utils/index"

export default {
  name: 'complaintlist',
  data () {
    return {
      tableData: [],
      currentPage4: 1,
      formInline: {
        username: '',
        region: ''
      },
      pageindex: 0, // 当前页
      pageSize: 10, // 每页数量
      total: 0, // 数量总条数
      status: null,

      // 搜索内容
      openid: null,
      // name: null,
      obj: null
    }
  },

  mounted () {
    this.getOrderList()
  },
  created () {
  },


  methods: {
    // 选择当前页面显示多少条数据的选择框发生改变
    handleSizeChange (e) {
      this.pageSize = e
      this.getOrderList()
    },
    // 分页改变 e点击的页码  用户手动输入了页面然后go
    handleCurrentChange (e) {
      // console.log('当前页码', e)
      this.pageindex = e - 1
      this.getOrderList()
    },
    // 搜索
    onSubmit () {
      this.getOrderList()
    },

    getOrderList () {
      let query = {
        pageIndex: this.pageindex,
        pageSize: this.pageSize,
        openid: this.openid,
        obj: this.obj
      }
      getOrderList(query).then(res => {
        // console.log(res)
        this.tableData = res.data
        this.total = res.pageTotal
      })
    },
    // 格式化时间
    parseTime (time) {
      return parseTime(time)
    },

    // 删除资讯
    deleteThis (id) {
      deleteOrder(id).then(res => {
        if (res.code === '200') {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.getOrderList();
        } else {
          this.$message({
            type: 'warning',
            message: '操作失败'
          });
        }
      })
    },
    toPost () {
      this.$router.push({ path: './new' })
    },

    toPut (id) {
      this.$router.push({ path: './put/' + id })
    }

  }
}
</script>

<style lang="scss" scoped>
.blockpage {
  padding-top: 2%;
}
</style>
