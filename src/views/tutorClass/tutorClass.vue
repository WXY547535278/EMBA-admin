<template>
  <!-- 资讯列表 -->
  <div style="width:90%;margin-left:5%;margin-top:1%">
    <!-- 搜索条件区域 -->
    <el-form :inline="true"
             :model="formInline"
             class="demo-form-inline">
      <el-form-item label="课程id">
        <el-input v-model="id"
                  placeholder="课程id"></el-input>
      </el-form-item>
      <el-form-item label="课程名">
        <el-input v-model="name"
                  placeholder="name"></el-input>
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
      <el-form-item style="float: right;">
        <el-button type="success"
                   @click="toPost">新增课程</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData">
      <el-table-column prop="id"
                       label="id"
                       width="150"></el-table-column>
      <el-table-column prop="name"
                       label="课程名"
                       width="300"></el-table-column>
      <el-table-column label="banner图"
                       width="150">
        <template slot-scope="scope">
          <img v-image-preview
               style="width: 50px; height: 50px"
               :src="scope.row.banner"
               fit="fill" />
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true"
                       prop="introduce"
                       label="课程介绍"
                       width="300"></el-table-column>
      <el-table-column :show-overflow-tooltip="true"
                       prop="survey"
                       label="课程概况"
                       width="300"></el-table-column>
      <el-table-column prop="price"
                       label="价格"
                       width="300"></el-table-column>
      <el-table-column prop="click"
                       label="点击量"
                       width="100"></el-table-column>
      <!-- <el-table-column label="发布时间"
                       width="200">
        <template slot-scope="scope">{{parseTime(scope.row.time)}}</template>
      </el-table-column> -->

      <el-table-column fixed="right"
                       label="操作"
                       width="300">
        <template slot-scope="scope">
          <el-button @click.native.prevent="toPut(scope.row.id)"
                     type="text"
                     size="small">修改</el-button>
          <el-button @click.native.prevent="deleteThis(scope.row.id,1)"
                     type="text"
                     size="small">删除</el-button>
          <el-button @click.native.prevent="getUserList(scope.row.id)"
                     type="text"
                     size="small">给用户添加该课程</el-button>
          <el-button @click.native.prevent="addChapter(scope.row.id)"
                     type="text"
                     size="small">添加章节</el-button>
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
    <!--  查看用户列表区域  -->
    <el-dialog title="用户列表"
               :visible.sync="showView"
               width="80%">
      <!-- 搜索条件区域 -->
      <el-form :inline="true"
               :model="userData"
               class="demo-form-inline">
        <el-form-item label="openid">
          <el-input v-model="openid"
                    placeholder="openid"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="name"
                    placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="phone"
                    placeholder="电话号码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="onSubmit1">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="userData">
        <el-table-column prop="openid"
                         label="openid"
                         width="250"></el-table-column>
        <el-table-column prop="nickName"
                         label="昵称"
                         width="200"></el-table-column>
        <!-- <el-table-column prop="balance"
                       label="余额"
                       width="150"></el-table-column> -->
        <el-table-column prop="phone"
                         label="电话"
                         width="150"></el-table-column>
        <el-table-column prop="name"
                         label="真实姓名"
                         width="150"></el-table-column>
        <el-table-column label="头像"
                         width="150">

          <template slot-scope="scope"><img v-image-preview
                 style="width: 35px; height: 35px"
                 :src="scope.row.headImg"
                 fit="fill" /></template>
        </el-table-column>
        <el-table-column prop="address"
                         label="用户地址"
                         width="170"></el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         width="120">
          <template slot-scope="scope">
            <el-button @click.native.prevent="addClass(scope.row.openid)"
                       type="text"
                       size="small">添加课程</el-button>
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
                       :total="total1">
        </el-pagination>
      </div>
    </el-dialog>

    <!--  添加章节区域  -->
    <el-dialog title="添加章节"
               :visible.sync="showView1"
               width="80%">
      <el-form ref="form"
               :model="postForm"
               label-width="120px">
        <el-form-item label="章节名称:">
          <el-input v-model="postForm.name"
                    style="width: 300px;"
                    type="text" />
        </el-form-item>
        <hr>
        <el-form-item>
          <el-button type="primary"
                     @click="postThis(postForm)">添加</el-button>
        </el-form-item>

      </el-form>

    </el-dialog>

  </div>
</template>

<script>
import { getCurriculumList, getChapterList, deleteCurriculum } from "@/api/tutorClass"
import { getUserList } from "@/api/user"
import { postOrder } from "@/api/userClass"
import { postChapter } from "@/api/chapter"
import { parseTime } from "@/utils/index"

export default {
  name: 'complaintlist',
  data () {
    return {
      form: {
        obj: null,
        openid: null,
        adminId: '121044709700001'
      },
      userData: [],
      tableData: [],
      currentPage4: 1,
      formInline: {
        username: '',
        region: ''
      },
      showView1: false,
      showView: false,
      pageindex: 0, // 当前页
      pageSize: 10, // 每页数量
      total: 0, // 数量总条数
      status: null,
      postForm: {
        name: null,
        curriculumId: null
      },
      // 搜索内容
      name: null,
      id: null,
      phone: null,
      total1: 0,
      pageindex1: 0, // 当前页
      pageSize1: 10 // 每页数量

    }
  },

  mounted () {
    this.getCurriculumList()
  },
  created () {
  },


  methods: {
    //添加章节
    addChapter (id) {
      this.postForm.curriculumId = id
      console.log("curriculumId", this.postForm.curriculumId)
      this.showView1 = true
    },
    postThis (data) {
      postChapter(data).then(res => {
        this.$message({
          type: 'success',
          message: '新增成功!'
        })
        this.showView1 = false
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '新增失败'
        })
      })
    },
    // 选择当前页面显示多少条数据的选择框发生改变
    handleSizeChange (e) {
      this.pageSize = e
      this.getCurriculumList()
    },
    // 分页改变 e点击的页码  用户手动输入了页面然后go
    handleCurrentChange (e) {
      // console.log('当前页码', e)
      this.pageindex = e - 1
      this.getCurriculumList()
    },
    // 搜索
    onSubmit1 () {
      this.getUserList()
    },
    //添加课程
    addClass (id) {
      this.form.openid = id
      postOrder(this.form).then(res => {
        this.$message({
          type: 'success',
          message: '新增成功!'
        })
        this.showView = false
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '新增失败'
        })
      })
    },
    // 获取用户列表
    getUserList (id) {
      this.form.obj = id
      console.log('curriculumId', this.form.obj)
      let query = {
        pageIndex: this.pageindex1,
        pageSize: this.pageSize1,
        name: this.name,
        openid: this.openid,
        phone: this.phone
      }
      this.showView = true
      this.userData = []
      getUserList(query).then(res => {
        console.log('user', res)
        this.userData = res.data
        this.total1 = res.pageTotal
        console.log('total1', this.total1)
      })
    },
    // 搜索
    onSubmit () {
      this.getCurriculumList()
    },

    getCurriculumList () {
      let query = {
        pageIndex: this.pageindex,
        pageSize: this.pageSize,
        openid: this.openid,
        name: this.name,
        id: this.id
      }
      getCurriculumList(query).then(res => {
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
      deleteCurriculum(id).then(res => {
        if (res.code === '200') {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.getCurriculumList();
        } else {
          this.$message({
            type: 'warning',
            message: '操作失败'
          })
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
