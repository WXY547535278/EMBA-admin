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

      <el-form-item label="资讯标题"
                    :rules="[{ required: true, message: '标题不能为空'}]">
        <el-input v-model="form.title"
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

      <el-form-item label="资讯内容"
                    :rules="[{ required: true, message: '内容不能为空'}]">
        <!-- <el-input v-model="form.text" type="textarea"   :autosize="{ minRows: 6, maxRows: 40 }"/> -->
        <quill-editor v-model="form.text"
                      ref="myQuillEditor"
                      :options="editorOption"
                      >
        </quill-editor>
        <el-upload class="avatar-uploader"
                   ref="upload"
                   :action="upload_url"
                   :on-success="uploadSuccess"
                   :headers="upload_head">
        </el-upload>
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
import { putInformation, getInformation } from "@/api/information";
import { getRequestUrl, getUploadUrl } from '@/utils/index'
import { getToken } from '@/utils/auth.js'


export default {
  data () {
    let container = [
      ['bold', 'italic', 'underline'],
      [{ 'align': [] }],
      // [{ 'size': ['small', false, 'large', 'huge'] }], // 文字大小
      ['image'], // 图片
      [{ 'color': [] }, { 'background': [] }],
      // [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'header': 1 }, { 'header': 2 }] 
    ]
    return {
      // upload_url: getRequestUrl() + "upload/picUpload", 
      upload_url: getUploadUrl(),  // 请求的url
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
      fileList: [],
      // 富文本框
      content: '',
      editorOption: {
        modules: {
          toolbar: {
            container: container,
            handlers: {
              'image': function (value) {
                if (value) {
                  document.querySelector('.avatar-uploader input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      }
    }
  },

  methods: {
    // 富文本框图片上传显示
    uploadSuccess (response, file, fileList) {
      // 清除加载动画条
      this.$refs.upload.clearFiles()
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill
      // 如果上传成功
      if (file.response.code == 200) {
        console.log('返回的图片地址', file.response.data)
        //获取光标所在位置
        let length = quill.getSelection().index
        // 插入图片  res.info为服务器返回的图片地址
        quill.insertEmbed(length, 'image', file.response.data)
        // 调整光标到最后
        quill.setSelection(length + 1)
      } else {
        this.$message.error('图片插入失败')
      }
    },
    onSubmit () {
      console.log(this.form);
      putInformation(this.form).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.$router.push({ path: '/information/list' })
      }).catch((res) => {
        this.$message({
          type: 'warning',
          message: '修改失败'
        });
      });
    },

    init (id) {
      getInformation(id).then(res => {
        this.form.id = res.data.id;
        this.form.banner = res.data.banner;
        this.form.title = res.data.title;
        this.form.time = res.data.time;
        this.form.click = res.data.click;
        this.form.text = res.data.text;


      }).catch((res) => {
        this.$message({
          type: 'warning',
          message: '参数错误'
        });
        this.$router.push({ path: '/information/list' })
      });
    },


    //返回上一页
    toList () {
      this.$router.push({ path: '/information/list' })
    },

    //处理banner上传图片
    upload_success_banner (response, file, fileList) {
      if (file.response.code == 200) {
        this.fileList = [];
        this.form.banner = file.response.data;
      } else {
        this.$message.error('上传错误!请重试');
      }
    },
  },
  computed: {},
  mounted () {
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

