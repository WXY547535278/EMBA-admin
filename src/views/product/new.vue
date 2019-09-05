<template>
  <div class="app-container">

    <el-form :inline="true"   class="demo-form-inline">
      <el-form-item  >
        <el-button type="primary"  icon="el-icon-arrow-left"   @click="toList">返回</el-button>
      </el-form-item>
    </el-form>


    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="产品名"  :rules="[{ required: true, message: '产品名不能为空'}]">
        <el-input v-model="form.name"/>
      </el-form-item>

      <el-form-item label="原价" :rules="[{ required: true, message: '原价不能为空'}]">
        <el-input v-model.number="form.originalPrice" type="number"/>
      </el-form-item>
      <el-form-item label="实际价格" :rules="[{ required: true, message: '实际价格不能为空'}]">
        <el-input v-model.number="form.price" type="number"/>
      </el-form-item>
      <el-form-item label="库存" :rules="[{ required: true, message: '库存标题不能为空'}]">
        <el-input v-model.number="form.stock" type="number"/>
      </el-form-item>
      <el-form-item label="成团所需人数" :rules="[{ required: true, message: '成团所需人数不能为空'}]">
        <el-input v-model.number="form.needFight" type="number"/>
      </el-form-item>
      <el-form-item label="拼团开始时间" :rules="[{ required: true, message: '拼团开始时间不能为空'}]">
        <el-date-picker v-model="form.startTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="拼团结束时间" :rules="[{ required: true, message: '拼团结束时间不能为空'}]">
        <el-date-picker v-model="form.stopTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>

      <el-form-item label="拼团时限" :rules="[{ required: true, message: '拼团时限不能为空'}]">
        <!--<el-input v-model="form.timeLimit" type="textarea"/>-->
        <el-input placeholder="请输入内容" style="width: 20%;" v-model="form.limit" type="text" class="input-with-select">
        </el-input>
        <!-- slot="append" -->
        <el-select v-model.number="form.timeLimitSelect" placeholder="请选择" style="width: 10%;" @change="upd_s">
          <el-option label="单位:分钟" value="1" ></el-option>
          <el-option label="单位:小时" value="2" ></el-option>
          <el-option label="单位:天" value="3" ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Banner" :rules="[{ required: true, message: 'Banner不能为空'}]">
        <el-upload class="upload-demo" :action="upload_url" :on-remove="handleRemoveBanner" :file-list="bannerList"
                   :headers="upload_head" :on-success="upload_success_banner" list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="详情图" :rules="[{ required: true, message: '详情图不能为空'}]">
        <el-upload class="upload-demo" :action="upload_url" :on-remove="handleRemoveDetail" :file-list="detailList"
                   :headers="upload_head" :on-success="upload_success_detail" list-type="picture" :limit=10>
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <hr>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {getProduct, postProduct} from "@/api/product";
  import {getRequestUrl} from '@/utils/index';
  import {getToken} from '@/utils/auth.js';
  import {parseTime} from "@/utils/index"


  export default {
    data() {
      return {
        upload_url: getRequestUrl() + "upload/picUpload",  //请求的url
        upload_head: {
          Authorization: getToken()
        }, // 上传请求头

        form: {
          timeLimitSelect: "1",
          name: null,//产品名
          originalPrice: null,//原价
          stock: null,//库存
          price: null,//实际价格/最小sku实际价格
          banner: '',//banner
          detailImg: '',
          fightNum: null,
          startTime: null,
          stopTime: null,
          needFight: null,
          limit: null,
          timeLimit: null
        },
        bannerList: [],
        bannerArray: [],
        detailList: [],
        detailArray: []
      }
    },

    methods: {
      upd_s(){
        var s = this.form.timeLimitSelect;
        this.form.timeLimitSelect=s+"";
      },
      onSubmit() {
        this.form.detailImg = this.listToStr(this.detailArray);
        this.form.banner = this.listToStr(this.bannerArray);
        var limit = this.form.limit;
        var timeLimitSelect = this.form.timeLimitSelect;
        var timeLimit = 0;
        if (timeLimitSelect === '1') {
          timeLimit = limit;
        } else if (timeLimitSelect === '2') {
          timeLimit = limit * 60;
        } else if (timeLimitSelect === '3') {
          timeLimit = limit * 60 * 24;
        }
        this.form.timeLimit = timeLimit;


        postProduct(this.form).then(res => {
          this.$message({
            type: 'success',
            message: '新增成功!'
          })
          this.$router.push({path: '/product/list'});
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '新增失败'
          });
        });
      },




      //处理banner上传图片
      upload_success_banner(response, file, fileList) {
        if (file.response.code == 200) {
          this.bannerArray.push(response.data)
        } else {
          this.$message.error('上传错误!请重试');
        }


      },
      //删除banner列表
      handleRemoveBanner(file, fileList) {
        this.bannerList = JSON.parse(JSON.stringify(fileList))
        var url = file.response.data;
        var list = [];
        for (var i = 0; i < this.bannerArray.length; i++) {
          if (this.bannerArray[i] !== url) {
            list.push(this.bannerArray[i])
          }
        }
        this.bannerArray = list;

      },
      //处理detail上传图片
      upload_success_detail(response, file, fileList) {
        if (file.response.code == 200) {
          this.detailArray.push(response.data)
        } else {
          this.$message.error('上传错误!请重试');
        }
      },
      //删除detail列表
      handleRemoveDetail(file, fileList) {
        this.detailList = JSON.parse(JSON.stringify(fileList))
        var url = file.response.data;
        var list = [];
        for (var i = 0; i < this.detailArray.length; i++) {
          if (this.detailArray[i] !== url) {
            list.push(this.detailArray[i])
          }
        }
        this.detailArray = list;
      },


      listToStr(list) {
        var s = '';
        if (!list || list.length < 1) {
          return s;
        }
        for (var i = 0; i < list.length; i++) {
          if (list[i]) {
            s += list[i];
            if (i !== (list.length - 1)) {
              s += ",";
            }
          }
        }
        return s;
      },
      strToList(str) {
        var list = [];
        if (!str) {
          return list;
        }
        var sp = str.split(",");
        if (!sp || sp.length < 1) {
          return list;
        }
        for (var i = 0; i < sp.length; i++) {
          if (sp[i]) {
            list.push(sp[i]);
          }
        }
        return list;
      },

  //返回上一页
      toList(){
        this.$router.push({path:'/product/list'})
      },
    },

  };
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>

