<template>
  <div style="width:90%;margin-left:5%;margin-top:1%">
    <!-- 搜索条件区域 -->

    <el-form :inline="true"
             :model="formInline"
             class="demo-form-inline">

      <!-- <el-form-item label="轮播图类型">
        <el-select v-model="formInline.type"
                   placeholder="轮播图类型"
                   @change="onSubmit">
          <el-option label="首页"
                     value="1"></el-option>
          <el-option label="热门页"
                     value="2"></el-option>
        </el-select>
      </el-form-item> -->

      <!-- <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">查询</el-button>
      </el-form-item> -->

      <el-form-item style="float: right;">
        <el-button type="success"
                   @click="showPost">新增面试</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData">
      <el-table-column prop="id"
                       label="id"
                       width="250"></el-table-column>
      <el-table-column label="图片"
                       width="250">
        <template slot-scope="scope"><img style="width: 100px; height: 100px"
               :src="scope.row.banner"
               fit="fill" />
        </template>
      </el-table-column>
      <el-table-column prop="title"
                       label="标题"
                       width="500"></el-table-column>
      <el-table-column prop="text"
                       :show-overflow-tooltip="true"
                       label="内容"
                       width="500"></el-table-column>
      <el-table-column prop="click"
                       :show-overflow-tooltip="true"
                       label="点击量"
                       width="300"></el-table-column>

      <el-table-column fixed="right"
                       label="操作"
                       width="120">
        <template slot-scope="scope">
          <el-button @click.native.prevent="showPut(scope.row.id)"
                     type="text"
                     size="small">修改</el-button>
          <el-button @click.native.prevent="deleteThis(scope.row.id)"
                     type="text"
                     size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区 -->

    <div class="blockpage"
         style="margin:0px auto">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage4"
                     :page-sizes="[10, 20, 30, 40]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>

    <!--  新增区  -->
    <el-dialog title="列表"
               :visible.sync="postView"
               width="80%">
      <el-form ref="form"
               :model="postForm"
               label-width="120px">

        <el-form-item label="标题:">
          <el-input v-model="postForm.title"
                    style="width: auto;"
                    type="text" />
        </el-form-item>

        <el-form-item label="图片:">
          <template>
            <img style="width: 100px; height: 100px"
                 :src="postForm.banner"
                 fit="fill" />
          </template>
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

        <el-form-item label="内容:">
          <!-- <el-input v-model="postForm.text"
                    style="width: 600px"
                    type="textarea" /> -->
          <quill-editor v-model="postForm.text"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @change="onEditorChange($event)">
          </quill-editor>
          <el-upload class="avatar-uploader"
                     ref="upload"
                     :action="upload_url"
                     :on-success="uploadSuccess"
                     :on-error="uploadError">
          </el-upload>
        </el-form-item>
        <hr>
        <el-form-item>
          <el-button type="primary"
                     @click="postThis(postForm)">提交</el-button>
        </el-form-item>

      </el-form>

    </el-dialog>

    <!--  修改区  -->
    <el-dialog title="列表"
               :visible.sync="putView"
               width="80%">
      <el-form ref="form"
               :model="putForm"
               label-width="120px">

        <el-form-item label="id:">
          <el-input v-model="putForm.id"
                    style="width: auto;"
                    type="text"
                    :disabled="true" />
        </el-form-item>

        <el-form-item label="标题:">
          <el-input v-model="putForm.title"
                    style="width: auto;"
                    type="nummber" />
        </el-form-item>

        <el-form-item label="图片:">
          <template>
            <img style="width: 100px; height: 100px"
                 :src="putForm.banner"
                 fit="fill" />
          </template>
          <el-upload class="upload-demo"
                     :action="upload_url"
                     :headers="upload_head"
                     :multiple=false
                     :limit=1
                     :on-success="upload_success_put"
                     :file-list="fileList">
            <el-button size="small"
                       type="primary">点击上传</el-button>
            <div slot="tip"
                 class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="内容:">
          <!-- <el-input v-model="putForm.text"
                    style="width: auto;"
                    type="textarea" /> -->
          <quill-editor v-model="putForm.text"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @change="onEditorChange($event)">
          </quill-editor>
          <el-upload class="avatar-uploader"
                     ref="upload"
                     :action="upload_url"
                     :on-success="uploadSuccess"
                     :on-error="uploadError">
          </el-upload>
        </el-form-item>

        <hr>
        <el-form-item>
          <el-button type="primary"
                     @click="putThis(putForm)">保存</el-button>
        </el-form-item>

      </el-form>

    </el-dialog>

  </div>
</template>

<script>
import { getSubjectList, deleteSubject, putSubject, postSubject } from "@/api/subject";
import { parseTime } from "@/utils/index"
import { getRequestUrl, getUploadUrl } from '@/utils/index'
import { getToken } from '@/utils/auth.js'


export default {
  name: 'complaintlist',
  data () {
    let container = [
      ['bold', 'italic', 'underline'],
      [{ 'align': [] }],
      // [{ 'size': ['small', false, 'large', 'huge'] }], // 文字大小
      ['image'], // 图片
      [{ 'color': [] }, { 'background': [] }], // 字体颜色
      // [{ 'indent': '-1'}, { 'indent': '+1' }]
      [{ 'header': 1 }, { 'header': 2 }] 
    ]
    return {
      // upload_url: getRequestUrl() + "upload/picUpload", 
      upload_url: getUploadUrl(),  // 请求的url
      upload_head: {
        Authorization: getToken()
      }, // 上传请求头
      tableData: [],
      currentPage4: 1,
      formInline: {
        type: '1'
      },
      pageindex: 0, // 当前页
      pageSize: 10, // 每页数量
      total: 0, // 数量总条数
      status: null,
      postView: false,
      postForm: {
        title: null,
        banner: null,
        type: '1',
        text: null
      },
      fileList: [],
      putView: false,
      putForm: {
        id: null,
        title: null,
        banner: null,
        type: '1',
        text: null
      },
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


  mounted () {
    this.getSubjectList()
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
    // 选择当前页面显示多少条数据的选择框发生改变
    handleSizeChange (e) {
      this.pageSize = e
      this.getSubjectList()
    },
    // 分页改变 e点击的页码  用户手动输入了页面然后go
    handleCurrentChange (e) {
      // console.log('当前页码', e)
      this.pageindex = e - 1
      this.getSubjectList()
    },
    // 搜索
    onSubmit () {
      this.getSubjectList()
    },

    getSubjectList () {
      let query = {
        pageIndex: this.pageindex,
        pageSize: this.pageSize,
        type: this.formInline.type
      }
      getSubjectList(query).then(res => {
        // console.log(res)
        this.tableData = res.data;
        this.total = res.pageTotal;
      })
    },
    // 格式化时间
    parseTime (time) {
      return parseTime(time)
    },


    //
    deleteThis (id) {
      deleteSubject(id).then(res => {
        if (res.code === '200') {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.getSubjectList();
        } else {
          this.$message({
            type: 'warning',
            message: '操作失败'
          })
        }
      })
    },
    //新增相关
    showPost () {
      // title: null,
      //   banner: null,
      //   type: '1',
      //   text: null
      this.postView = true
      this.postForm.title = null
      this.postForm.banner = null
      this.postForm.text = null
      this.postForm.type = '1'
    },
    postThis (data) {
      data.type = parseInt(this.formInline.type)
      postSubject(data).then(res => {
        this.$message({
          type: 'success',
          message: '新增成功!'
        })
        this.postView = false
        this.getSubjectList()
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '新增失败'
        })
      })

    },
    //处理banner上传图片
    upload_success_banner (response, file, fileList) {
      if (file.response.code === '200') {
        this.fileList = []
        this.postForm.banner = file.response.data
      } else {
        this.$message.error('上传错误!请重试');
      }
    },


    //修改相关
    showPut (id) {
      var thisBean = {};
      for (var i = 0; i < this.tableData.length; i++) {
        if (id === this.tableData[i].id) {
          thisBean = this.tableData[i]
          break;
        }
      }
      this.putView = true
      this.putForm.id = thisBean.id
      this.putForm.banner = thisBean.banner
      this.putForm.text = thisBean.text
      this.putForm.title = thisBean.title
      this.putForm.click = thisBean.click
    },
    putThis (data) {

      putSubject(data).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.putView = false
        this.getSubjectList()
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '修改失败'
        })
      })
    },
    upload_success_put (response, file, fileList) {
      if (file.response.code === '200') {
        this.fileList = []
        this.putForm.banner = file.response.data
      } else {
        this.$message.error('上传错误!请重试')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.blockpage {
  padding-top: 2%;
}
</style>
