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

      <el-form-item label="点击量">
        <el-input v-model="form.click"
                  type="text"
                  :disabled="true" />
      </el-form-item>

      <el-form-item label="课程标题"
                    :rules="[{ required: true, message: '标题不能为空'}]">
        <el-input v-model="form.name"
                  type="text" />
      </el-form-item>

      <el-form-item label="Banner"
                    :rules="[{ required: true, message: 'banner不能为空'}]">
        <img style="width: 200px; height: 200px"
             :src="form.banner"
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
      </el-form-item>
      <el-form-item label="价格"
                    :rules="[{ required: true, message: '标题不能为空'}]">
        <el-input v-model="form.price"
                  type="text" />
      </el-form-item>
      <el-form-item label="课程概况"
                    :rules="[{ required: true, message: '标题不能为空'}]">
        <el-input v-model="form.survey"
                  type="text" />
      </el-form-item>
      <el-form-item label="课程介绍"
                    :rules="[{ required: true, message: '内容不能为空'}]">
        <el-input v-model="form.introduce"
                  type="textarea"
                  :autosize="{ minRows: 6, maxRows: 40 }" />
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
import { getCurriculum, putCurriculum } from "@/api/tutorClass";
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
        id: null,
        // time: null,
        click: 0,
        banner: null,
        name: null,
        price: null,
        survey: null,
        introduce: null
      },
      fileList: []
    }
  },

  methods: {
    onSubmit () {
      console.log(this.form);
      putCurriculum(this.form).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.$router.push({ path: '/tutorClass/list' })
      }).catch((res) => {
        this.$message({
          type: 'warning',
          message: '修改失败'
        });
      });
    },

    init (id) {
      getCurriculum(id).then(res => {
        this.form.id = res.data.id
        this.form.banner = res.data.banner
        this.form.name = res.data.name
        // this.form.time = res.data.time;
        this.form.click = res.data.click
        this.form.survey = res.data.survey
        this.form.price = res.data.price
        this.form.introduce = res.data.introduce
        this.form.free = res.data.free
      }).catch((res) => {
        this.$message({
          type: 'warning',
          message: '参数错误'
        })
        this.$router.push({ path: '/tutorClass/list' })
      })
    },

    //返回上一页
    toList () {
      this.$router.push({ path: '/tutorClass/list' })
    },

    //处理banner上传图片
    upload_success_banner (response, file, fileList) {
      if (file.response.code == 200) {
        this.fileList = []
        this.form.banner = file.response.data;
      } else {
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

