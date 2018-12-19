<template>
  <div class='ordersMessage'>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="store-inner">
          <p class='break'>消费详情</p>
            <el-form ref="form" :model="form" class="queryBox" label-width="70px"  size="small" :inline="true">
              <el-form-item label="统计时间">
                <el-date-picker type="daterange" v-model='form.date' :default-time="['00:00:00', '23:59:59']" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" round @click='search' >查询</el-button>
                <el-button type="success" round>导出</el-button>
              </el-form-item>
            </el-form>
            <el-table :data="tableData" style="width: 100%;background:#fff;" row-key="list"
                        header-row-class-name="table-header" border stripe>
              <el-table-column prop="idNum" label="任务号 " header-align="center" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="orderId" label="订单编号" header-align="center"  show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="goodNickname" label="商品简称" header-align="center"  show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="store_name" label="店铺名称" header-align="center"  show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="goodId" label="商品ID" header-align="center"  show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="water_yuan" label="任务类型" header-align="center" show-overflow-tooltip >
                <template slot-scope="scope">
                    <p v-if='scope.row.taskType==1'>销量任务</p>
                    <p v-if='scope.row.taskType==2'>指定推送任务</p>
                    <p v-if='scope.row.taskType==3'>复购任务</p>
                </template>
              </el-table-column>
              <el-table-column prop="keyword" label="关键字" header-align="center"  show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="water_sheng" label="实际金额" header-align="center" show-overflow-tooltip >
              </el-table-column>
              <el-table-column prop="issuePrice" label="发布点" header-align="center">
              </el-table-column>
              <el-table-column prop="payAt" label="支付时间" header-align="center">
              </el-table-column>
            </el-table>
            <el-pagination
              @current-change="CurrentChange"
              layout="prev, pager, next"
              :total="totalPages">
            </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {consumptionDetails} from '../../api/money';
  import {formatDate} from '../../api/task';
  export default {
    data(){
      return {
        form:{
          date: '',
        },
        totalPages:0,
        tableData: []
      };
    },
    mounted(){
     consumptionDetails(1,10).then(response => {
        const data = response;
         if(data.msg==1){
            this.tableData=data.page.result
            for(var i=0;i<data.page.result.length;i++){
              this.tableData[i].store_name=data.page.result[i].store.name
              this.tableData[i].keyword=data.page.result[i].require.keyword
            }
            this.totalPages=data.page.totalRow
         }
      }).catch(error => {
        reject(error);
      }); 
    },
    methods: {
      search(){
        var date1 
        var date2
        if(this.form.date==''||this.form.date==null){
           date1=''
           date2=''
        }else{
          date1=formatDate(this.form.date[0])
          date2=formatDate(this.form.date[1])
        }
         consumptionDetails(1,10,date1 ,date2).then(response => {
            const data = response;
             if(data.msg==1){
                this.tableData=data.page.result
                this.totalPages=data.page.totalRow
             }
          }).catch(error => {
            reject(error);
          })
      },
      CurrentChange(e){
        var date1 
        var date2
        if(this.form.date==''||this.form.date==null){
           date1=''
           date2=''
        }else{
          date1=formatDate(this.form.date[0])
          date2=formatDate(this.form.date[1])
        }
        consumptionDetails(e,10,date1 ,date2).then(response => {
          const data = response;
           if(data.msg==1){
              this.tableData=data.page.result
              this.totalPages=data.page.totalRow
           }
        }).catch(error => {
          reject(error);
        }); 
      }
    }
  }
</script>

<style>
  .el-radio+.el-radio{
    margin:0;
  }
  .el-radio__label{
    padding-left:5px;
  }
  .el-table .table-header {
    background-color:#f5f7fa;
    color:#000;
  }
  .queryBox{
    display:block;
    text-align:left;
  }
  /*.el-tabs__item.is-active{*/
    /*color:RGB(87,88,190);*/
  /*}*/
  /*.el-tabs__item:hover{*/
    /*color:RGB(87,88,190);*/
  /*}*/
  /*.el-tabs__nav-wrap::after{*/
    /*background-color:RGB(87,88,190);*/
  /*}*/
  .el-tabs__item{
    font-size:16px;
  }
  .store-inner{
    background:#fff;
    padding:20px;
  }
  .store-type{
    width:100%;
    height:60px;
  }
  .intro{
    width:100%;
    height:50px;
    overflow: hidden;
  }
  .intro .title-intro{
    display:block;
    line-height:50px;
    font-size:12px;
    color:#333;
    float:left;
  }
 /* .el-button--primary.is-plain{
    margin-top:10px;
  }
  .el-button--success.is-plain{
    margin-top:10px;
  }
  .el-button--danger.is-plain{
    margin-top:10px;
  }*/
  .intro .cun{
    width:20px;
    height:20px;
    background:oldlace;
    border:1px solid #faebcc;
    margin-top:15px;
    margin-right:10px;
    margin-left:10px;
  }
  .intro .xia{
    width:20px;
    height:20px;
    background:#f0f9eb;
    border:1px solid #d6e9c6;
    margin-top:15px;
    margin-right:10px;
    margin-left:10px;
  }
  .img{
    width:calc(200px * 0.1);
    height:auto;
    cursor: pointer;
  }
  .imgs{
    width:calc(750px * 0.05);
    height:auto;
    cursor: pointer;
  }
  .mask{
    width:100%;
    height:100%;
    position: absolute;
    left:0;
    top:0;
    background:rgba(0,0,0,0.6);
    z-index:3000;
    overflow: hidden;
  }
  .bigimg{
    transform: scale(1);
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin:auto;
  }
  .size{
    overflow: hidden;
  }
  .type-name{
    font-size:12px;
    color:#000;
  }
  .type-money{
    font-size:12px;
    color:#f00;
  }
  .el-table .warning-row {
    background:  oldlace;
  }
  .el-table .success-row {
    background: #f0f9eb ;
  }
  .ordersMessage .el-button+.el-button{
    margin:0;
  }
  .jia{
    color:#f00;
  }
</style>
