<template>
  <!-- 客服电话列表 -->
  <div style="width:90%;margin-left:5%;margin-top:1%">

    <el-table :data="tableData">
      <el-table-column prop="id"
                       label="客服id"
                       width="150"></el-table-column>
      <el-table-column prop="text"
                       fixed="right"
                       label="客服电话"
                       width="600"></el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="120">
        <template slot-scope="scope">
          <el-button @click.native.prevent="toPut(scope.row.id)"
                     type="text"
                     size="small">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区

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
    </div> -->

  </div>
</template>

<script>
import { getKefuList } from "@/api/kefu"
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
      // openid: null
      curriculumId: null,
      id: null
    }
  },

  mounted () {
    this.getKefuList()
  },
  created () {
  },


  methods: {
    // 选择当前页面显示多少条数据的选择框发生改变
    handleSizeChange (e) {
      this.pageSize = e
      this.getKefuList()
    },
    // 分页改变 e点击的页码  用户手动输入了页面然后go
    handleCurrentChange (e) {
      // console.log('当前页码', e)
      this.pageindex = e - 1
      this.getKefuList()
    },
    // 搜索
    onSubmit () {
      this.getKefuList()
    },

    getKefuList () {
      let query = {
        pageIndex: this.pageindex,
        pageSize: this.pageSize,
        curriculumId: this.curriculumId,
        id: this.id
      }
      getKefuList(query).then(res => {
        console.log(res)
        this.tableData = res.data
        this.total = res.pageTotal
      })
    },
    // 格式化时间
    parseTime (time) {
      return parseTime(time)
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
