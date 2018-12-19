<template>
  <div class='ordersMessage'>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="store-inner">
          <p class='break'>刷手资金管理</p>
            <el-form ref="form" :model="form" class="queryBox" label-width="100px"  size="small" :inline="true">
              <el-form-item label="刷手手机号">
                <el-input v-model="form.num" ></el-input>
              </el-form-item>
              <el-form-item label="时间筛选">
                <el-date-picker v-model="form.date" type="daterange" :default-time="['00:00:00', '23:59:59']"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" round @click='search'>查询</el-button>
                <el-button type="success" round>导出</el-button>
              </el-form-item>
            </el-form>
            <el-table :data="tableData" style="width: 100%;background:#fff;" row-key="list"
                        header-row-class-name="table-header" border stripe>
              <el-table-column prop="account" label="刷手手机号" header-align="center" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="withdrawMoney" label="可提现佣金" header-align="center"  show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="moneysCold" label="冻结佣金" header-align="center"  show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="moneysTui" label="推荐总佣金" header-align="center"  show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="moneysTask" label="刷单完成总佣金" header-align="center"  show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="deposit" label="保证金" header-align="center" show-overflow-tooltip >
              </el-table-column>
            </el-table>
            <el-pagination @current-change="CurrentChange" layout="prev, pager, next" :total="totalPages">
            </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {handWater,formatDate} from '../../api/api'
  export default {
    data(){
      return {
        form:{
          num:'',
          date: '',
        },
        totalPages:0,
        currentPage:1,
        tableData: [{
          shua_phone:'15829792593',
          shua_ti:5000,
          shua_dong:5000,
          shua_tui:50,
          shua_shua:50,
          shua_bao:500
        }]
      };
    },
    mounted(){
      handWater('','','',1,10).then(response=>{
        var data=response
        if(data.page!=1){
           this.tableData=data.page.result
           this.totalPages=data.page.totalRow
        }else{
           this.tableData=[]
           this.totalPages=0
        }
      }).catch(error=>{

      })
    },
    methods: {
      search(){

        var date1 
        var date2
        console.log(this.form.date);
        if(this.form.date==null||this.form.date==''){
           date1=''
           date2=''
        }else{
          date1=formatDate(this.form.date[0])
          date2=formatDate(this.form.date[1])
        }
        console.log(1);
        handWater(this.form.num,date1,date2,this.currentPage,10).then(response=>{
          var data=response
          if(data.page!=1){
             this.tableData=data.page.result
             this.totalPages=data.page.totalRow
          }else{
             this.tableData=[]
             this.totalPages=0
          }
        }).catch(error=>{

        })
      },
      CurrentChange(e){
        this.currentPage=e
        var date1 
        var date2
        if(this.form.date==null||this.form.date==''){
           date1=''
           date2=''
        }else{
          date1=formatDate(this.form.date[0])
          date2=formatDate(this.form.date[1])
        }
        handWater(this.form.num,date1,date2,e,10).then(response=>{
          var data=response
          if(data.page!=1){
             this.tableData=data.page.result
             this.totalPages=data.page.totalRow
          }else{
             this.tableData=[]
             this.totalPages=0
          }
        }).catch(error=>{

        })
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
