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

      <el-form-item label="学生姓名">
        <el-input v-model="form.name"
                  type="text"
                  :disabled="false" />
      </el-form-item>

      <el-form-item label="头像"
                    :rules="[{ required: true, message: '头像不能为空'}]">
        <img style="width: 50px; height: 50px"
             :src="form.headImg"
             fit="fill" />
        <el-avatar :src="form.headImg"></el-avatar>
      </el-form-item>

      <el-form-item label="教师姓名"
                    :rules="[{ required: true, message: '姓名不能为空'}]">
        <el-input v-model="form.teacherName"
                  type="text" />
      </el-form-item>
      <el-form-item label="教师头像"
                    :rules="[{ required: true, message: '头像不能为空'}]">
        <img style="width: 50px; height: 50px"
             :src="form.teacherHeadImg"
             fit="fill" />
        <el-avatar :src="form.headImg"></el-avatar>
      </el-form-item>
      <el-form-item label="年龄"
                    :rules="[{ required: true, message: '不能为空'}]">
        <el-input v-model="form.age"
                  type="text" />
      </el-form-item>
      <!-- name: '',
        headImg: '',
        teacherName: '',
        teacherHeadImg: '',
        age: '',
        company: '',
        duties: '',
        education: '',
        phone: '',
        workingYears: '',
        problem: '' -->
      <el-form-item label="公司"
                    :rules="[{ required: true, message: '不能为空'}]">
        <el-input v-model="form.company"
                  type="text" />
      </el-form-item>
      <el-form-item label="职位"
                    :rules="[{ required: true, message: '内容不能为空'}]">
        <el-input v-model="form.duties"
                  type="text" />
      </el-form-item>
      <el-form-item label="教育"
                    :rules="[{ required: true, message: '内容不能为空'}]">
        <el-input v-model="form.education"
                  type="text" />
      </el-form-item>
      <el-form-item label="电话"
                    :rules="[{ required: true, message: '内容不能为空'}]">
        <el-input v-model="form.phone"
                  type="text" />
      </el-form-item>
      <el-form-item label="工作时间"
                    :rules="[{ required: true, message: '内容不能为空'}]">
        <el-input v-model="form.workingYears"
                  type="text" />
      </el-form-item>
      <el-form-item label="提交时间"
                    :rules="[{ required: true, message: '内容不能为空'}]">
        <el-input v-model="form.time"
                  type="text" />
      </el-form-item>
      <el-form-item label="问题"
                    :rules="[{ required: true, message: '内容不能为空'}]">
        <el-input v-model="form.problem"
                  type="textarea"
                  :autosize="{ minRows: 6, maxRows: 20 }" />
      </el-form-item>
      <hr>
    </el-form>
  </div>
</template>

<script>
import { getAssessment } from "@/api/assessment"
import { getRequestUrl } from '@/utils/index'
import { getToken } from '@/utils/auth.js'
import { parseTime } from "@/utils/index"


export default {
  data () {
    return {
      upload_url: getRequestUrl() + "upload/picUpload",  //请求的url
      upload_head: {
        Authorization: getToken()
      }, // 上传请求头
      stander: '',
      form: {
        name: '',
        headImg: '',
        teacherName: '',
        teacherHeadImg: '',
        age: '',
        company: '',
        duties: '',
        education: '',
        phone: '',
        workingYears: '',
        problem: '',
        time: ''
      },
      fileList: []
    }
  },

  methods: {
    init (id) {
      getAssessment(id).then(res => {
        this.form.name = res.data.name
        this.form.headImg = res.data.headImg
        this.form.teacherName = res.data.teacherName
        this.form.teacherHeadImg = res.data.teacherHeadImg
        this.form.company = res.data.company
        this.form.age = res.data.age
        this.form.duties = res.data.duties
        this.form.education = res.data.education
        this.form.phone = res.data.phone
        this.form.workingYears = res.data.workingYears
        this.form.problem = res.data.problem
        this.form.time = parseTime(res.data.time)
      }).catch((res) => {
        this.$message({
          type: 'warning',
          message: '参数错误'
        })
        this.$router.push({ path: '/assessment/list' })
      })
    },

    //返回上一页
    toList () {
      this.$router.push({ path: '/assessment/list' })
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

