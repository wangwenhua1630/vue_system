<template>
  <div class='back'>
    <el-row class="row-bg" type="flex"  justify="center">
      <el-col>
        <div class="queryBoxs">
          <div class="recharge-info">
            <div class='info-fl'>
              <p class='icons '>i</p>
            </div>
            <ul class="info-box">
              <p class="rechare-title">下方表格记录的是买家已在购物平台<span class="high">退款成功</span>的订单。对于以下情况的订单，买家有权利到购物平台进行退款：</p>
                 <li>1、卖家长时间未转账;</li>
                <li>2、卖家频繁操作转账失败的订单。</li>
                <li>退款成功后，管理员会将订单状态变更为"已退款"。</li>
            </ul>
          </div>
          <el-form ref="form" :model="form" class="queryBox" label-width="70px"  size="small" :inline="true">
            <el-form-item label="订单编号">
              <el-input v-model="form.num" ></el-input>
            </el-form-item>
            <el-form-item label="截止时间">
              <el-date-picker type="daterange"  v-model='form.date' :default-time="['00:00:00', '23:59:59']" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click='search'>查询</el-button>
            </el-form-item>
          </el-form>
          <el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark"  style="width: 100%"   header-row-class-name="table-header">
           
            <el-table-column prop="idNum" label="订单编号"  header-align="center">
            </el-table-column>
            <el-table-column  prop="transferMoney" label="转账金额" header-align="center">
            </el-table-column>
            <el-table-column prop="bankName" label="提现人"  show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column prop="bankCard" label="提现人银行卡号"  show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column prop="cardState" label="转账状态"  show-overflow-tooltip header-align="center">
              <template slot-scope="scope">
                  <p>买家已退款</p>
              </template>
            </el-table-column>
            <el-table-column prop="closingAt" label="转账截止时间"  show-overflow-tooltip header-align="center">
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
  import {zhuan} from '../../../../api/money';
  export default {
    name: "back",
    data(){
      return{
        form:{
          num:'',
          state: '',
          date: '',
        },
        totalPages:0,
        tableData:[]
      }
    },
    mounted(){
      zhuan(1,10,4).then(response => {
        const data = response;
         if(data.msg==1){
            this.tableData=data.page.result
            this.totalPages=data.page.totalRow
         }
      }).catch(error => {
        reject(error);
      }); 
    },
     methods:{
       // 条件查询
      search(){
        var date1 
        var date2
        if(this.form.date==null){
           date1=null
           date2=null
        }else{
          date1=this.form.date[0]
          date2=this.form.date[1]
        }
        zhuan(1,10,4,this.form.num,date1,date2).then(response => {
          const data = response;
           if(data.msg==1){
              this.tableData=data.page.result
              this.totalPages=data.page.totalPages
           }else if(data.msg==3){
             this.tableData=[]
              this.totalPages=0
           }
        }).catch(error => {
          reject(error);
        }); 
      },
      // 分页查询
      CurrentChange(e){
        zhuan(e,10,4).then(response => {
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
  .btnBox{text-align: left;margin-bottom:20px;}
  .row-bg .el-table .table-header{
    background:#f8f8f8;
  }
  .back .recharge-info{
    margin-bottom:20px;
    background:#E6F7FF;
    border-radius:4px;
    border:1px solid #91D5FF;
  }
  .back .rechare-title{
    font-size:16px;
    color:#000;
    text-align: left;
  }
  .back .rechare-span{
    font-size:14px;
    color:rgba(0,0,0,0.45);
  }
  .back .info-box{
    padding:15px;
    font-size:14px;
    text-align: left;
    line-height:30px;
  }
  .back .info-fl{
    float:left;
    width:8%;
    position:relative;
    height:144px;
  }
  .back .icons{
    width:24px;
    height:24px;
    display:block;
    border:2px solid #1890FF;
    color:#1890FF;
    font-size:20px;
    text-align:center;
    line-height:24px;
    border-radius:50%;
    font-weight:bold;
    position:absolute;
    left:0;
    right:0;
    margin:auto;
    top:20px;
  }
  .info-box .high{
    color:#F5222D;
  }
</style>
