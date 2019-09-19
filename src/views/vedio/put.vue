<template>
  <div class="app-container">
    <el-form :inline="true"
             class="demo-form-inline">
      <el-form-item>
        <el-button type="primary"
                   icon="el-icon-arrow-left"
                   @click="toList">返回</el-button>
      </el-form-item>
    </el-form>

    <el-form ref="form"
             :model="form"
             label-width="120px">

      <el-form-item label="id">
        <el-input v-model="form.id"
                  type="text"
                  :disabled="true" />
      </el-form-item>

      <el-form-item label="用户id"
                    :rules="[{ required: true, message: '姓名不能为空'}]">
        <el-input v-model="form.curriculumId"
                  type="text" />
      </el-form-item>

      <el-form-item label="章节id"
                    :rules="[{ required: true, message: '不能为空'}]">
        <el-input v-model="form.chapterId"
                  type="text" />
      </el-form-item>
      <el-form-item label="视频名称"
                    :rules="[{ required: true, message: '不能为空'}]">
        <el-input v-model="form.name"
                  type="text" />
      </el-form-item>
      <el-form-item label="排序"
                    :rules="[{ required: true, message: '不能为空'}]">
        <el-input v-model="form.sort"
                  type="text" />
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
                   :on-progress="uploadVideoProcess">
          <video v-if="form.video !='' && videoFlag == false"
                 :src="form.video"
                 class="avatar"
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
                   @click="onSubmit">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getVedio, putVedio } from "@/api/vedio";
import { getRequestUrl, getUploadUrl } from '@/utils/index'
import { getToken } from '@/utils/auth.js'


export default {
  data () {
    return {
      // upload_url: getRequestUrl() + "upload/picUpload", 
      upload_url: getUploadUrl(),  // 请求的url
      upload_head: {
        Authorization: getToken()
      }, // 上传请求头
      stander: '',
      form: {
        curriculumId: null,
        chapterId: null,
        name: null,
        video: null,
        sort: null
      },
      fileList: [],
      videoFlag: true,
      videoUploadPercent: null
    }
  },

  methods: {
    onSubmit () {
      console.log(this.form);
      putVedio(this.form).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.$router.push({ path: '/vedio/list' })
      }).catch((res) => {
        this.$message({
          type: 'warning',
          message: '修改失败'
        })
      })
    },

    init (id) {
      getVedio(id).then(res => {
        this.form.id = res.data.id
        this.form.curriculumId = res.data.curriculumId
        this.form.chapterId = res.data.chapterId
        this.form.name = res.data.name
        this.form.video = res.data.video
        this.form.sort = res.data.sort
      }).catch((res) => {
        this.$message({
          type: 'warning',
          message: '参数错误'
        })
        this.$router.push({ path: '/vedio/list' })
      });
    },

    //返回上一页
    toList () {
      this.$router.push({ path: '/vedio/list' })
    },

    // 验证视频格式和视频大小
    beforeUploadVideo (file) {
      // const isLt10M = file.size / 1024 / 1024 < 10;
      if (['video/mp4', 'video/3gp', 'video/m3u8'].indexOf(file.type) == -1) {
        this.$message.error('请上传正确的视频格式')
        return false
      }
      // if (!isLt10M) {
      //   this.$message.error('上传视频大小不能超过10MB哦!');
      //   return false;
      // }
    },
    // 上传进度显示
    uploadVideoProcess (event, file, fileList) {
      this.videoFlag = true
      // this.videoUploadPercent = 100
      this.videoUploadPercent = file.percentage.toFixed(0)
    },
    // 处理上传视频
    upload_success_video (response, file, fileList) {
      if (file.response.code == 200) {
        console.log(file.response.data)
        this.fileList = []
        this.form.video = file.response.data
        this.$message.success('上传成功')
      } else {
        console.log(file.response.data)
        this.$message.error('上传错误!请重试')
      }
    }
  },
  computed: {},
  mounted () {
    this.init(this.$route.params.id)
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}

.remarks {
  color: red;
  border: none;
  background: none;
  display: inline-block;
  height: 30px;
  margin: 0;
  padding: 0;
  font-size: 10px;
}
</style>

