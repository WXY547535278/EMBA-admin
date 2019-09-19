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

      <el-form-item label="章节姓名"
                    :rules="[{ required: true, message: '姓名不能为空'}]">
        <el-input v-model="form.name"
                  type="text" />
      </el-form-item>
      <el-form-item label="序号"
                    :rules="[{ required: true, message: '姓名不能为空'}]">
        <el-input v-model="form.sort"
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
import { getChapter, putChapter } from "@/api/chapter";
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
        id: null,
        name: null,
        sort: null
      },
      fileList: []
    }
  },

  methods: {
    onSubmit () {
      console.log(this.form);
      putChapter(this.form).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.$router.push({ path: '/chapter/list' })
      }).catch((res) => {
        this.$message({
          type: 'warning',
          message: '修改失败'
        });
      });
    },

    init (id) {
      getChapter(id).then(res => {
        this.form.id = res.data.id
        this.form.name = res.data.name
        this.form.sort = res.data.sort
      }).catch((res) => {
        this.$message({
          type: 'warning',
          message: '参数错误'
        })
        this.$router.push({ path: '/chapter/list' })
      });
    },

    //返回上一页
    toList () {
      this.$router.push({ path: '/chapter/list' })
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

