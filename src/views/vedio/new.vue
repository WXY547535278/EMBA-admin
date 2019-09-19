<template>
  <div class="app-container">
    <el-form ref="form"
             :model="form"
             label-width="120px">
      <el-form-item label="所属课程id"
                    :rules="[{ required: true, message: '不能为空'}]">
        <el-input v-model="form.curriculumId"
                  type="text"
                  style="width:300px" />
      </el-form-item>
      <el-form-item label="所属章节id "
                    :rules="[{ required: true, message: '不能为空'}]">
        <el-input v-model="form.chapterId"
                  type="text"
                  style="width:300px" />
      </el-form-item>
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
                   @click="onSubmit">创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { postVedio } from "@/api/vedio"
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
        video: null
      },
      fileList: [],
      videoFlag: true,
      videoUploadPercent: 0
    }
  },

  methods: {

    onSubmit () {
      console.log(this.form)
      postVedio(this.form).then(res => {
        this.$message({
          type: 'success',
          message: '新增成功!'
        })
        this.$router.push({ path: '/vedio/list' })
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '新增失败'
        })
      })
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
      this.videoUploadPercent = 100
    },
    //处理上传视频
    upload_success_video (response, file, fileList) {
      console.log(file.response);
      if (file.response.code == 200) {
        console.log(file.response)
        this.fileList = []
        this.form.video = file.response.data
      } else {
        console.log(file.response.data)
        this.$message.error('上传错误!请重试')
      }
    }
  },
  // upload_success_put (response, file, fileList) {
  //   if (file.response.code === '200') {
  //     this.fileList = []
  //     this.putForm.img = file.response.data;
  //   } else {
  //     this.$message.error('上传错误!请重试');
  //   }
  // },
  computed: {}
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

