q
<template>
  <div style="width:90%;margin-left:5%;margin-top:1%">
    <!-- 搜索条件区域 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="产品名">
        <el-input v-model="formInline.name" placeholder="产品名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getProductList">查询</el-button>
      </el-form-item>
      <el-button type="primary" style="float: right" @click="toPost">新增</el-button>
    </el-form>

    <!-- 表格区 -->
    <el-table :data="tableData">
      <el-table-column  prop="id" label="id" width="150"></el-table-column>
      <el-table-column prop="name" label="产品名" width="150"></el-table-column>
      <el-table-column label="banner" width="150">
        <template slot-scope="scope"><img v-image-preview style="width: 35px; height: 35px" :src="scope.row.bannerOne" fit="fill"/></template>
      </el-table-column>
      <el-table-column prop="originalPrice" label="原价" width="70"></el-table-column>
      <el-table-column prop="price" label="实际价格"></el-table-column>
      <el-table-column prop="sales" label="销量" width="70"></el-table-column>
      <el-table-column prop="fightNum" label="已成团人数" width="80"></el-table-column>
      <el-table-column prop="stock" label="库存" width="80"></el-table-column>
      <el-table-column prop="needFight" label="成团所需人数" width="70"></el-table-column>
      <el-table-column label="拼团时限" width="150">  <template slot-scope="scope">{{pipeTimeLimit(scope.row.timeLimit)}}</template></el-table-column>
      <el-table-column prop="stock" label="库存" width="70"></el-table-column>
      <el-table-column label="拼团开始时间" width="150">
        <template slot-scope="scope">{{parseTime(scope.row.startTime)}}</template>
      </el-table-column>
      <el-table-column label="拼团结束时间" width="150">
        <template slot-scope="scope">{{parseTime(scope.row.stopTime)}}</template>
      </el-table-column>

      <el-table-column   label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="toPut(scope.row.id)" type="text" size="small">修改</el-button>
          <el-button @click.native.prevent="delProduct(scope.row.id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <!-- 列表分页区 -->
    <div class="blockpage" style="margin:0px auto">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>

  </div>
</template>

<script>
  import {getProductList, postProduct, putProduct, deleteProduct} from "@/api/product";
  import {parseTime} from "@/utils/index"

  export default {
    name: 'productlist',
    data() {
      return {
        tableData: [],
        pageindex: 0, // 当前页
        pageSize: 10, // 每页数量
        total: 0, // 数量总条数
        // 搜索内容
        formInline: {
          id: null, // 产品id
          name: null // 发起类型
        },
        tableData1: [], // 助力流水数据
        tableDataDetail: []//产品详情
      }
    },
    mounted() {
      this.getProductList()
    },


    methods: {
      // 选择当前页面显示多少条数据的选择框发生改变
      handleSizeChange(e) {
        // console.log('当前每页数量', e)
        this.pageSize = e
        this.getProductList()
      },
      // 分页改变 e点击的页码
      handleCurrentChange(e) {
        // console.log('当前页码', e)
        this.pageindex = e - 1
        this.getProductList()
      },
      // 流水分页改变
      handleSizeChange2(e) {
        // console.log('当前每页数量', e)
        this.data2.size = e
        this.getActivityLogList()
      },
      // 分页改变 e点击的页码
      handleCurrentChange2(e) {
        // console.log('当前页码', e)
        this.data2.page = e - 1
        this.getActivityLogList()
      },
      // 获取助力列表
      getProductList() {
        let query = {
          pageIndex: this.pageindex,
          pageSize: this.pageSize,
          name: this.formInline.name,
          id: this.formInline.id
        }


        // console.log(query)
        getProductList(query).then(res => {
          this.tableData = res.data
          this.total = res.pageTotal
        })
      },

      // 删除用户
      delProduct(id) {
        this.$confirm('此操作将永久删除该产品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          deleteProduct(id).then(res => {
            this.getProductList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //跳到修改页面
      toPost(){
        this.$router.push({path:'/product/post'})
      },
      toPut(id){
        this.$router.push({path:'/product/put/'+id})
      },


      // 格式化时间
      parseTime(time) {
        return parseTime(time)
      },
      pipeTimeLimit(timeLimit){
        var f = timeLimit%60;
        var h = timeLimit/60;
        var sh = parseInt(h%24);
        var d = parseInt(h/24);

        var timeStr = "";
        if(d && d>0){
          timeStr+= d+"天";
        }
        if(sh && sh>0){
          timeStr+= sh+"小时";
        }
        if(f && f>0){
          timeStr+= f+"分钟";
        }
        return timeStr;
      },

    }
  };
</script>

<style lang="scss" scoped>
  .blockpage {
    padding-top: 2%;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

</style>
