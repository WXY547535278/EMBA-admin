<template>
  <div class="app-container">

    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" icon="el-icon-arrow-left" @click="toList">返回</el-button>
      </el-form-item>
    </el-form>


    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="id">
        <el-input v-model="form.id"  :disabled="true" />
      </el-form-item>

      <el-form-item label="已成团人数">
        <el-input v-model="form.fightNum"/>
      </el-form-item>
      <el-form-item label="销量">
        <el-input v-model="form.sales"/>
      </el-form-item>




      <el-form-item label="产品名">
        <el-input v-model="form.name"/>
      </el-form-item>

      <el-form-item label="原价">
        <el-input v-model.number="form.originalPrice" type="number"/>
      </el-form-item>
      <el-form-item label="实际价格">
        <el-input v-model.number="form.price" type="number"/>
      </el-form-item>
      <el-form-item label="库存">
        <el-input v-model.number="form.stock" type="number"/>
      </el-form-item>
      <el-form-item label="成团所需人数">
        <el-input v-model.number="form.needFight" type="number"/>
      </el-form-item>
      <el-form-item label="拼团开始时间">
        <el-date-picker v-model="form.startTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="拼团结束时间">
        <el-date-picker v-model="form.stopTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>

      <el-form-item label="拼团时限">
        <!--<el-input v-model="form.timeLimit" type="textarea"/>-->
        <el-input placeholder="请输入内容" style="width: 20%;" v-model="form.limit" type="text" class="input-with-select">
        </el-input>
        <!-- slot="append" -->
        <el-select v-model.number="form.timeLimitSelect" placeholder="请选择" style="width: 10%;" @change="upd_s">
          <el-option label="单位:分钟" value="1"></el-option>
          <el-option label="单位:小时" value="2"></el-option>
          <el-option label="单位:天" value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Banner">
        <el-upload class="upload-demo" :action="upload_url" :on-remove="handleRemoveBanner" :file-list="bannerList"
                   :headers="upload_head" :on-success="upload_success_banner" list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="详情图">
        <el-upload class="upload-demo" :action="upload_url" :on-remove="handleRemoveDetail" :file-list="detailList"
                   :headers="upload_head" :on-success="upload_success_detail" list-type="picture"  >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <hr>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>

      </el-form-item>
    </el-form>
  </div>
</template>


<script>
  import {getProduct, putProduct} from "@/api/product";
  import {getRequestUrl} from '@/utils/index'
  import {getToken} from '@/utils/auth.js'


  export default {
    data() {
      return {
        upload_url: getRequestUrl() + "upload/picUpload",  //请求的url
        upload_head: {
          Authorization: getToken()
        }, // 上传请求头
        form: {
          id: null,
          time: null,
          sales: null,
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
      upd_s() {
        var s = this.form.timeLimitSelect;
        this.form.timeLimitSelect = s + "";
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

        putProduct(this.form).then(res => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.$router.push({path: '/product/list'})
        }).catch((res) => {
          this.$message({
            type: 'warning',
            message: '修改失败'
          });
        });
      },

      init(id) {
        getProduct(id).then(res => {
          this.form.id = res.data.id;
          this.form.name = res.data.name;
          this.form.banner = res.data.banner;
          this.form.detailImg = res.data.detailImg;
          this.form.fightNum = res.data.fightNum;
          this.form.originalPrice = res.data.originalPrice;
          this.form.price = res.data.price;
          this.form.startTime = res.data.startTime;
          this.form.stopTime = res.data.stopTime;
          this.form.needFight = res.data.needFight;
          this.form.time = res.data.time;
          this.form.timeLimit = res.data.timeLimit;
          this.form.stock = res.data.stock;
          this.form.sales = res.data.sales;


          //格式化时间
          this.form.limit = res.data.timeLimit;
          this.form.timeLimitSelect = "1";

          //文件

          var detailList = this.strToList(this.form.detailImg);
          this.detailArray = detailList;
          for (var i = 0; i < detailList.length; i++) {
            this.detailList.push({name: "", url: detailList[i]})
          }


          var bannerList = this.strToList(this.form.banner);
          this.bannerArray = bannerList;
          for (var i = 0; i < bannerList.length; i++) {
            this.bannerList.push({name: "", url: bannerList[i]})
          }



        }).catch((res) => {
          this.$message({
            type: 'warning',
            message: '参数错误'
          });
          this.$router.push({path: '/product/list'})
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
        console.log("**");
        var url = file.url;
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
        var url = file.url;
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
      toList() {
        this.$router.push({path: '/product/list'})
      },

    },

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

