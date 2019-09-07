<template>
  <div class="app-container">
    <el-form ref="form"
             :model="form"
             label-width="120px">
      <el-form-item label="所属课程id"
                    :rules="[{ required: true, message: '不能为空'}]">
        <el-input v-model="form.curriculumId"
                  type="text" />
      </el-form-item>
      <el-form-item label="所属章节id "
                    :rules="[{ required: true, message: '不能为空'}]">
        <el-input v-model="form.chapterId"
                  type="text" />
      </el-form-item>
      <el-form-item label="视频名称"
                    :rules="[{ required: true, message: '不能为空'}]">
        <el-input v-model="form.name"
                  type="text" />
      </el-form-item>

      <!-- <el-form-item label="视频"
                    :rules="[{ required: true, message: '头像不能为空'}]">
        <img style="width: 200px; height: 200px"
             :src="form.video"
             fit="fill" />
        <el-upload class="upload-demo"
                   :action="upload_url"
                   :headers="upload_head"
                   :multiple=false
                   :limit=1
                   :on-success="upload_success_banner"
                   :file-list="fileList">
          <el-button size="small"
                     type="primary">点击上传</el-button>
          <div slot="tip"
               class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item> -->

      <hr>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { postVedio } from "@/api/vedio";
import { getRequestUrl } from '@/utils/index'
import { getToken } from '@/utils/auth.js'


export default {
  data () {
    return {
      upload_url: getRequestUrl() + "upload/picUpload",  //请求的url
      upload_head: {
        Authorization: getToken()
      }, // 上传请求头
      stander: '',
      form: {
        curriculumId: null,
        chapterId: null,
        name: null,
        video: "123"
      },
      fileList: []
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

    //处理banner上传图片
    upload_success_banner (response, file, fileList) {
      if (file.response.code == 200) {
        this.fileList = []
        this.form.headImg = file.response.data
      } else {
        this.$message.error('上传错误!请重试');
      }
    }
  },
  computed: {}
};
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

