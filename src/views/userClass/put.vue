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

      <el-form-item label="课程id"
                    :rules="[{ required: true, message: '标题不能为空'}]">
        <el-input v-model="form.obj"
                  type="text" />
      </el-form-item>
      <el-form-item label="用户openid"
                    :rules="[{ required: true, message: '标题不能为空'}]">
        <el-input v-model="form.openid"
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
import { getOrder, putOrder } from "@/api/userClass";
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
        openid: null,
        obj: null,
        adminId: '121044709700001',
        id: null
      },
      fileList: []
    }
  },

  methods: {
    onSubmit () {
      console.log(this.form)
      putOrder(this.form).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.$router.push({ path: '/userClass/list' })
      }).catch((res) => {
        this.$message({
          type: 'warning',
          message: '修改失败'
        })
      })
    },

    init (id) {
      getOrder(id).then(res => {
        this.form.openid = res.data.openid
        this.form.obj = res.data.obj
        this.form.id = res.data.id
      }).catch((res) => {
        this.$message({
          type: 'warning',
          message: '参数错误'
        })
        this.$router.push({ path: '/userClass/list' })
      })
    },

    //返回上一页
    toList () {
      this.$router.push({ path: '/userClass/list' })
    }

    //处理banner上传图片
    // upload_success_banner (response, file, fileList) {
    //   if (file.response.code == 200) {
    //     this.fileList = []
    //     this.form.banner = file.response.data;
    //   } else {
    //     this.$message.error('上传错误!请重试')
    //   }
    // }
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

