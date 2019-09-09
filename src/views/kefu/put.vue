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

      <el-form-item label="客户号码"
                    :rules="[{ required: true, message: '姓名不能为空'}]">
        <el-input v-model="form.text"
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
import { getKefu, putKefu } from "@/api/kefu";
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
        text: null
      },
      fileList: []
    }
  },

  methods: {
    onSubmit () {
      console.log(this.form)
      putKefu(this.form).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.$router.push({ path: '/kefu/list' })
      }).catch((res) => {
        this.$message({
          type: 'warning',
          message: '修改失败'
        })
      })
    },

    init (id) {
      getKefu(id).then(res => {
        this.form.id = res.data.id
        this.form.text = res.data.text
      }).catch((res) => {
        this.$message({
          type: 'warning',
          message: '参数错误'
        })
        this.$router.push({ path: '/kefu/list' })
      });
    },

    //返回上一页
    toList () {
      this.$router.push({ path: '/kefu/list' })
    },
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

