<template>
  <div class="app-container">
    <el-form :inline="true"   class="demo-form-inline">
      <el-form-item  >
        <el-button type="primary"  icon="el-icon-arrow-left"   @click="toList">返回</el-button>
      </el-form-item>
    </el-form>

    <el-form ref="form" :model="form" label-width="120px">

      <el-form-item label="id"  >
        <el-input v-model="form.id" type="text" :disabled="true" />
      </el-form-item>

      <el-form-item label="点击量"  >
        <el-input v-model="form.click" type="text" :disabled="true" />
      </el-form-item>

      <el-form-item label="资讯标题" :rules="[{ required: true, message: '标题不能为空'}]">
        <el-input v-model="form.title" type="text"/>
      </el-form-item>

      <el-form-item label="资讯内容" :rules="[{ required: true, message: '内容不能为空'}]">
        <el-input v-model="form.text" type="textarea"   :autosize="{ minRows: 6, maxRows: 40 }"     />
      </el-form-item>

      <hr>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {putMsg,getMsg} from "@/api/msg";
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
          id: null,
          time: null,
          click: 0,
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
        putMsg(this.form).then(res => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.$router.push({path:'/msg/list'})
        }).catch((res) => {
          this.$message({
            type: 'warning',
            message: '修改失败'
          });
        });
      },

      init(id){
        getMsg(id).then(res => {
        this.form.id = res.data.id;
          this.form.title = res.data.title;
          this.form.time = res.data.time;
          this.form.click = res.data.click;
          this.form.text = res.data.text;


        }).catch((res) => {
          this.$message({
            type: 'warning',
            message: '参数错误'
          });
          this.$router.push({path:'/msg/list'})
        });
      },


      //返回上一页
      toList(){
        this.$router.push({path:'/system/msg'})
      },


    },
    computed: {},
    mounted() {
      this.init(this.$route.params.id);
    },
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

