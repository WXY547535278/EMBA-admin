<template>
  <!-- 资讯列表 -->
  <div style="width:90%;margin-left:5%;margin-top:1%" v-loading="loading1">
    <!-- 搜索条件区域 -->
    <el-form :inline="true"
             :model="formInline"
             class="demo-form-inline">
      <el-form-item label="课程id">
        <el-input v-model="curriculumId"
                  placeholder="curriculumId"></el-input>
      </el-form-item>
      <el-form-item label="章节id">
        <el-input v-model="id"
                  placeholder="id"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 新增章节 -->
    <el-form :inline="true"
             :model="formInline"
             class="demo-form-inline">
      <!-- <el-form-item style="float: right;">
        <el-button type="success"
                   @click="toPost">新增章节</el-button>
      </el-form-item> -->
    </el-form>

    <el-table :data="tableData">
      <el-table-column prop="id"
                       label="章节id"
                       width="150"></el-table-column>
      <el-table-column prop="curriculumId"
                       label="课程id"
                       width="300"></el-table-column>
      <el-table-column prop="name"
                       label="章节名称"
                       width="300"></el-table-column>
      <el-table-column prop="sort"
                       label="序号"
                       width="300"></el-table-column>

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
          <el-button @click.native.prevent="showVedio(scope.row.id)"
                     type="text"
                     size="small">查看章节视频</el-button>
          <el-button @click.native.prevent="addVedio(scope.row.id,scope.row.curriculumId)"
                     type="text"
                     size="small">添加视频</el-button>
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

    <!--  查看章节视频  -->
    <el-dialog title="章节视频列表"
               :visible.sync="showView"
               width="50%">
      <el-table :data="vedio">
        <el-table-column prop="id"
                         label="视频id"
                         width="300"></el-table-column>
        <el-table-column prop="name"
                         label="视频名称"
                         width="300"></el-table-column>

        <!-- <el-table-column fixed="right"
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
        </el-table-column> -->
      </el-table>
    </el-dialog>
    <!--  添加视频  -->
    <el-dialog title="添加视频"
               :visible.sync="showView1"
               width="80%"
               >
      <el-form ref="form"
               :model="form"
               label-width="120px"
               v-loading="loading"
               element-loading-text="等待后台存储视频">
        <el-form-item label="视频名称"
                      :rules="[{ required: true, message: '不能为空'}]">
          <el-input v-model="form.name"
                    type="text"
                    style="width:300px" />
        </el-form-item>

        <!-- action必选参数, 上传的地址 -->
        <el-form-item label="视频上传"
                      :rules="[{ required: true, message: '不能为空'}]">
          <el-upload class="avatar-uploader el-upload--text"
                     :action="upload_url"
                     :file-list="false"
                     :headers="upload_head"
                     :limit=1
                     :on-success="upload_success_video"
                     :before-upload="beforeUploadVideo"
                     :on-progress="uploadVideoProcess"
                     :on-change="uploadVedio">
            <video v-if="form.video !='' && videoFlag == false"
                   :src="form.video"
                   class="avatar"
                   width="300"
                   height="300"
                   controls="controls">您的浏览器不支持视频播放</video>
            <i v-else-if="form.video =='' && videoFlag == false"
               class="el-icon-plus avatar-uploader-icon"></i>
            <el-progress v-if="videoFlag == true"
                         type="circle"
                         :percentage="videoUploadPercent"
                         style="margin-top:30px;"></el-progress>
          </el-upload>
          <P class="text">支持mp4,3gp,m3u8格式</P>
        </el-form-item>

        <hr>
        <el-form-item>
          <el-button type="primary"
                     @click="onSubmit1">创建</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getChapterList, getVedioList, deleteChapter } from "@/api/chapter"
import { parseTime } from "@/utils/index"
import { postVedio } from "@/api/vedio"
import { getToken } from '@/utils/auth.js'
import { getRequestUrl, getUploadUrl } from '@/utils/index'

export default {
  name: 'complaintlist',
  data () {
    return {
      upload_url: getUploadUrl(),  // 请求的url
      // upload_url: getRequestUrl() + "upload/picUpload",  //请求的url
      upload_head: {
        Authorization: getToken()
      }, // 上传请求头
      stander: '',
      vedio: [],
      tableData: [],
      currentPage4: 1,
      formInline: {
        username: '',
        region: ''
      },
      form: {
        curriculumId: null,
        chapterId: null,
        name: null,
        video: null
      },
      pageindex: 0, // 当前页
      pageSize: 10, // 每页数量
      total: 0, // 数量总条数
      status: null,
      showView: false,
      showView1: false,
      videoFlag: true,
      videoUploadPercent: 0,
      // 搜索内容
      // openid: null
      curriculumId: null,
      id: null,
      loading: false,
      loading1: false
    }
  },

  mounted () {
    this.getChapterList()
  },
  created () {
  },


  methods: {
    addVedio (id, curriculumId) {
      this.form.curriculumId = curriculumId
      this.form.chapterId = id
      console.log("chapter", id, curriculumId)
      this.showView1 = true
    },
    onSubmit1 () {
      console.log(this.form)
      postVedio(this.form).then(res => {
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
    showVedio (id) {
      this.showView = true
      this.vedio = []
      console.log(id)
      getVedioList(id).then(res => {
        this.vedio = res.data
      })
    },
    // 选择当前页面显示多少条数据的选择框发生改变
    handleSizeChange (e) {
      this.pageSize = e
      this.getChapterList()
    },
    // 分页改变 e点击的页码  用户手动输入了页面然后go
    handleCurrentChange (e) {
      // console.log('当前页码', e)
      this.pageindex = e - 1
      this.getChapterList()
    },
    // 搜索
    onSubmit () {
      this.getChapterList()
    },

    getChapterList () {
      this.loading1 = true
      let query = {
        pageIndex: this.pageindex,
        pageSize: this.pageSize,
        curriculumId: this.curriculumId,
        id: this.id
      }
      getChapterList(query).then(res => {
        this.loading1 = false
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
      deleteChapter(id).then(res => {
        if (res.code === '200') {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.getChapterList()
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
    },
    // 验证视频格式和视频大小
    beforeUploadVideo (file) {
      // const isLt10M = file.size / 1024 / 1024 < 10;
      if (['video/mp4', 'video/3gp', 'video/m3u8'].indexOf(file.type) == -1) {
        this.$message.error('请上传正确的视频格式')
        return false;
      }
      // if (!isLt10M) {
      //   this.$message.error('上传视频大小不能超过10MB哦!');
      //   return false;
      // }
    },
    // 上传进度显示
   // 上传进度显示
    uploadVideoProcess (event, file, fileList) {
      this.videoFlag = true
      // this.videoUploadPercent= 100
      this.videoUploadPercent = file.percentage.toFixed(0)
      if(this.videoUploadPercent > 90) {
        this.loading = true
      }
    },
    uploadVedio (file, fileList) {
      
    },
    //处理上传视频
    upload_success_video (response, file, fileList) {
      this.videoUploadPercent = 0
      if (file.response.code == 200) {
        this.loading = false
        console.log('获取到的视频', file.response)
        this.$message.success('上传成功！')
        this.fileList = []
        this.form.video = file.response.data
      } else {
        console.log(file.response)
        this.$message.error('上传错误!请重试')
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.blockpage {
  padding-top: 2%;
}
</style>
