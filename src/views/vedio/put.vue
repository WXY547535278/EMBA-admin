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

      <el-form-item label="教师姓名"
                    :rules="[{ required: true, message: '姓名不能为空'}]">
        <el-input v-model="form.name"
                  type="text" />
      </el-form-item>

      <el-form-item label="头像"
                    :rules="[{ required: true, message: '头像不能为空'}]">
        <img style="width: 200px; height: 200px"
             :src="form.headImg"
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
      <el-form-item label="微信号"
                    :rules="[{ required: true, message: '不能为空'}]">
        <el-input v-model="form.wechat"
                  type="text" />
      </el-form-item>
      <el-form-item label="电话"
                    :rules="[{ required: true, message: '不能为空'}]">
        <el-input v-model="form.phone"
                  type="text" />
      </el-form-item>
      <el-form-item label="邮箱"
                    :rules="[{ required: true, message: '内容不能为空'}]">
        <el-input v-model="form.mail"
                  type="text" />
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
import { getTeacher, putTeacher } from "@/api/teacher";
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
        headImg: null,
        name: null,
        wechat: null,
        phone: null,
        mail: null
      },
      fileList: []
    }
  },

  methods: {
    onSubmit () {
      console.log(this.form);
      putTeacher(this.form).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.$router.push({ path: '/teacher/list' })
      }).catch((res) => {
        this.$message({
          type: 'warning',
          message: '修改失败'
        });
      });
    },

    init (id) {
      getTeacher(id).then(res => {
        this.form.id = res.data.id
        this.form.headImg = res.data.headImg
        this.form.name = res.data.name
        this.form.wechat = res.data.wechat
        this.form.phone = res.data.phone
        this.form.mail = res.data.mail
      }).catch((res) => {
        this.$message({
          type: 'warning',
          message: '参数错误'
        })
        this.$router.push({ path: '/teacher/list' })
      });
    },

    //返回上一页
    toList () {
      this.$router.push({ path: '/teacher/list' })
    },

    //处理banner上传图片
    upload_success_banner (response, file, fileList) {
      if (file.response.code == 200) {
        this.fileList = []
        this.form.headImg = file.response.data
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

