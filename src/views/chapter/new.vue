<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">

      <el-form-item label="课程id" :rules="[{ required: true, message: '不能为空'}]">
        <el-input v-model="form.curriculumId" style="width:300px" type="text"/>
      </el-form-item>
      <el-form-item label="章节名字" :rules="[{ required: true, message: '内容不能为空'}]">
        <el-input v-model="form.name" style="width:300px" type="text"/>
      </el-form-item>

      <hr>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {postChapter} from "@/api/chapter";
  import {getRequestUrl} from '@/utils/index'
  import {getToken} from '@/utils/auth.js'


  export default {
    data() {
      return {
        upload_url: getRequestUrl() + "upload/picUpload",  //请求的url
        upload_head: {
          Authorization: getToken()
        }, // 上传请求头
        stander: '',
        form: {
          curriculumId: null,
          name: null
        },
        fileList: []
      }
    },

    methods: {
      onSubmit() {
        console.log(this.form)
        postChapter(this.form).then(res => {
          this.$message({
            type: 'success',
            message: '新增成功!'
          })
          this.$router.push({path: '/chapter/list'})
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '新增失败'
          })
        })
      }
    },
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

