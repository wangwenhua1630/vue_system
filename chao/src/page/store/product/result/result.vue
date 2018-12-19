<template>
  <div class='result'>
    <el-row class="row-bg" type="flex"  justify="center">
      <el-col>
        <div class="queryBoxs">
          <el-form ref="form" :model="form" class="queryBox" label-width="70px"  size="small" :inline="true">
            <el-form-item label="订单编号">
              <el-input v-model="form.num" ></el-input>
            </el-form-item>
             <el-form-item label="端口来源">
                <el-select v-model="form.state" placeholder="请选择" >
                  <el-option label="商家" value="1"></el-option>
                  <el-option label="刷手" value="2"></el-option>
                </el-select>
              </el-form-item>
            <el-form-item label="截止时间">
              <el-date-picker v-model="form.date" type="daterange"  :default-time="['00:00:00', '23:59:59']"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click='search'>查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="danger"  size="small"  @click="excel_down()">导出</el-button>
            </el-form-item>
          </el-form>
          <el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark"  style="width: 100%"   header-row-class-name="table-header">
            <el-table-column type="selection"  width="55" header-align="center">
            </el-table-column>
            <el-table-column prop="idNum" label="订单编号"  header-align="center">
              <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
            </el-table-column>
            <el-table-column  prop="transferMoney" label="转账金额" header-align="center">
              </el-table-column>
              <el-table-column prop="bankName" label="提现人"  show-overflow-tooltip header-align="center">
              </el-table-column>
              <el-table-column prop="bankCard" label="银行卡号"  show-overflow-tooltip header-align="center">
              </el-table-column>
              <el-table-column prop="bankType" label="开户行"  show-overflow-tooltip header-align="center">
              </el-table-column>
              <el-table-column prop="subBranchName" label="支行名称"  show-overflow-tooltip header-align="center">
              </el-table-column>
              <el-table-column prop="closingAt" label="转账截止时间"  show-overflow-tooltip header-align="center">
              </el-table-column>
            <el-table-column  label="操作"  show-overflow-tooltip header-align="center">
              <template slot-scope="scope">
                <el-button type="success" plain  size="mini" @click="lookPing(scope.row.transferPic)">查看凭证</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @current-change="CurrentChange" layout="prev, pager, next" :total="totalPages" v-if='totalPages!=0'>
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <!--**转账成功凭证**-->
    <el-dialog title='转账成功凭证' width='30%' :visible.sync="chongdialog" >
      <ul class='touBox'>
        <li class='touList'><span class='touLabel'>转账成功凭证：</span><img :src="pingImg" alt="" class='tou-img' @click="bigImg" ></li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button  type='primary' @click="chongdialog = false" size='small' >关闭</el-button>
      </span>
    </el-dialog>
    <!--**图片放大**-->
    <div class="mask" v-show="show" @click="small">
      <img :src="bigsrc" alt="" class="bigimg">
    </div>
  </div>
</template>

<script>
    import {findAllTransfer,formatDate} from '../../../../api/api'
    export default {
        name: "result",
        data(){
          return{
            chongdialog:false,
            bigsrc:'',
            show:false,
            pingImg:'',
            totalPages:0,
            currentPage:1,
            form:{
              num:'',
              state: '',
              date1: '',
              date2: ''
            },
            tableData:[]
          }
        },
        mounted(){
          findAllTransfer('',2,'','','',1,10).then(response=>{
            var data=response
            if(data.msg==3){
                this.tableData=[]
                 this.totalPages=0
            }else if(data.msg==1){
              this.tableData=data.page.result
              this.totalPages=data.page.totalRow
            }
          }).catch(error=>{

          })
        },
       methods:{
         excel_down(){
           var that=this;
           findAllTransfer('',2,'','','',1,10000).then(response=>{
             var data=response
             var datas=data.page.result;
             if(data.msg==1){
               require.ensure([], () => {
                 const { export_json_to_excel } = require('@/vendor/Export2Excel')
                 const tHeader = ['收款账户列','收款户名列','转账金额列','备注列','收款银行列','收款银行支行列','收款省/直辖市列','收款市县列','转出账号/卡','转账模式']
                 const filterVal = ['bankCard','bankName','transferMoney','','bankType','subBranchName','','','formBankCard','']
                 const list = datas
                 const data = that.formatJson(filterVal, list)
                 export_json_to_excel(tHeader, data, '列表文本', '压缩文本')
               })
             }
           }).catch(error=>{})
         },
         formatJson(filterVal, jsonData){
           return jsonData.map(v => filterVal.map(j => v[j]))
         },
          //查看原图
          bigImg(e){
            this.show=true;
            this.bigsrc=e.target.currentSrc;
          },
          //隐藏原图
          small(){
            this.show=false;
          },
          // 查看转账成功图片
          lookPing(img){
            console.log(img)
            this.pingImg=img
            this.chongdialog = true
          },
          CurrentChange(e){
            this.currentPage=e
              var date1 
              var date2
              if(this.form.date==null){
                 date1=null
                 date2=null
              }else{
                date1=formatDate(new Date(this.form.date[0]));
                date2=formatDate(new Date(this.form.date[1]));
              }
             findAllTransfer(this.form.state,2,this.form.num,date1,date2,e,10).then(response=>{
              var data=response
              if(data.msg==3){
                  this.tableData=[]
                   this.totalPages=0
              }else if(data.msg==1){
                this.tableData=data.page.result
                this.totalPages=data.page.totalRow
              }
            }).catch(error=>{
            })
          },
          search(){
              var date1 
              var date2
              if(this.form.date==null){
                 date1=null
                 date2=null
              }else{
                date1=formatDate(new Date(this.form.date[0]));
                date2=formatDate(new Date(this.form.date[1]));
              }
             findAllTransfer(this.form.state,2,this.form.num,date1,date2,this.currentPage,10).then(response=>{
              var data=response
              if(data.msg==3){
                  this.tableData=[]
                   this.totalPages=0
              }else if(data.msg==1){
                this.tableData=data.page.result
                this.totalPages=data.page.totalRow
              }
            }).catch(error=>{

            })
          }
        }
    }
</script>

<style>
  .btnBox{text-align: left;margin-bottom:20px;}
  .queryBox{
     display: block;
      text-align:left;
  }
  .row-bg .el-table .table-header{
    background:#f8f8f8;
  }
    .touBox{
    width:100%;
  }
  .touBox .touList{
    margin-bottom: 10px;
    text-align:left;
    font-size:14px;
    color:rgba(0,0,0,0.45);
     vertical-align:text-top;
  }
  .touLabel{
    color:#000;
    margin-right:10px;
  }
  .tou-img{
    width:100px;
    height:160px;
    cursor: pointer;
     vertical-align:text-top;
  }
  .danInp{
    width:60%;
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
  .result .el-tabs__content{
    position:static;
  }
  .el-tabs__content{
    position:static;
  }
</style>
