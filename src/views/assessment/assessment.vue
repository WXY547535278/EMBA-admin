<template>
  <!-- 资讯列表 -->
  <div style="width:90%;margin-left:5%;margin-top:1%">
    <!-- 搜索条件区域 -->

    <el-table :data="tableData">
      <el-table-column prop="name"
                       label="姓名"
                       width="150"></el-table-column>
      <el-table-column label="学生头像"
                       width="150">
        <template slot-scope="scope">
          <img v-image-preview
               style="width: 50px; height: 50px"
               :src="scope.row.headImg"
               fit="fill" />
        </template>
      </el-table-column>                 
      <el-table-column prop="teacherName"
                       label="教师名"
                       width="300"></el-table-column>
      <el-table-column label="教师头像"
                       width="150">
        <template slot-scope="scope">
          <img v-image-preview
               style="width: 50px; height: 50px"
               :src="scope.row.teacherHeadImg"
               fit="fill" />
        </template>
      </el-table-column>
      <el-table-column prop="age"
                       label="年龄"
                       width="300"></el-table-column>
      <el-table-column prop="phone"
                       label="手机号"
                       width="300"></el-table-column>
      <el-table-column prop="company"
                       label="公司"
                       width="300"></el-table-column>
      <el-table-column prop="duties"
                       label="职位"
                       width="300"></el-table-column>
      <el-table-column prop="workingYears"
                       label="工作时间"
                       width="300"></el-table-column>
      <el-table-column prop="problem"
                       label="问题"
                       width="300"></el-table-column> 
      <el-table-column label="提交时间" width="200">
        <template slot-scope="scope">{{parseTime(scope.row.time)}}</template>
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="120">
        <template slot-scope="scope">
          <el-button @click.native.prevent="toPut(scope.row.id)"
                     type="text"
                     size="small">查看详情</el-button>
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
import { getAssessmentList, deleteAssessment } from "@/api/assessment"
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
      openid: null//
    }
  },


  mounted () {
    this.getAssessmentList()
  },
  created () {
  },

  methods: {
    // 选择当前页面显示多少条数据的选择框发生改变
    handleSizeChange (e) {
      this.pageSize = e
      this.getAssessmentList()
    },
    // 分页改变 e点击的页码  用户手动输入了页面然后go
    handleCurrentChange (e) {
      // console.log('当前页码', e)
      this.pageindex = e - 1
      this.getAssessmentList()
    },
    // 搜索
    onSubmit () {
      this.getAssessmentList()
    },

    getAssessmentList () {
      let query = {
        pageIndex: this.pageindex,
        pageSize: this.pageSize
      }
      getAssessmentList(query).then(res => {
        console.log(res)
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
      deleteAssessment(id).then(res => {
        if (res.code === '200') {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.getAssessmentList()
        } else {
          this.$message({
            type: 'warning',
            message: '操作失败'
          })
        }
      })
    },
    // toPost () {
    //   this.$router.push({ path: './new' })
    // },
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
