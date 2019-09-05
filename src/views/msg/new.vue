<template>
  <div class="app-container">

    <el-form :inline="true"   class="demo-form-inline">
      <el-form-item  >
        <el-button type="primary"  icon="el-icon-arrow-left"   @click="toList">返回</el-button>
      </el-form-item>
    </el-form>


    <el-form ref="form" :model="form" label-width="120px">

      <el-form-item label="系统消息标题" :rules="[{ required: true, message: '标题不能为空'}]">
        <el-input v-model="form.title" type="text"/>
      </el-form-item>


      



      <el-form-item label="系统消息内容" :rules="[{ required: true, message: '内容不能为空'}]">
        <el-input v-model="form.text" type="textarea"   :autosize="{ minRows: 6, maxRows: 20 }"     />
      </el-form-item>

      <hr>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {postMsg} from "@/api/msg";
  import {getRequestUrl} from '@/utils/index'
  import {getToken} from '@/utils/auth.js'


  export default {
    data() {
      return {
 
        upload_head: {
          Authorization: getToken()
        }, // 上传请求头
        stander: '',
        form: {
          banner: null,
          title: null,
          text: null
        },
        fileList:  []
      }
    },

    methods: {



      onSubmit() {
        console.log(this.form);

        postMsg(this.form).then(res => {
          this.$message({
            type: 'success',
            message: '新增成功!'
          })
          this.$router.push({path:'/msg/list'})
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '新增失败'
          });
        });
      },

      show() {
        console.log(this.bannerList)
      },

      //返回上一页
      toList(){
        this.$router.push({path:'/system/msg'})
      },




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

