<template>
  <div class='orders'>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="store-inner">
          <p class='break'>商家资金管理</p>
            <el-form ref="form" :model="form" class="queryBox" label-width="100px"  size="small" :inline="true">
              <el-form-item label="商家手机号">
                <el-input v-model="form.num" ></el-input>
              </el-form-item>
              <el-form-item label="统计时间">
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
              <el-table-column prop="account" label="商家手机号 " header-align="center" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="formerPoint" label="原发布点" header-align="center"  show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="consumePoint" label="消费发布点" header-align="center"  show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="residuePoint" label="剩余发布点" header-align="center"  show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="formerDeposit" label="原金额" header-align="center"  show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="consumeDeposit" label="消费金额" header-align="center" show-overflow-tooltip >
              </el-table-column>
               <el-table-column prop="residueDeposit" label="剩余金额" header-align="center"  show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="createAt" label="时间" header-align="center"  show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="remark" label="备注" header-align="center"  show-overflow-tooltip>
              </el-table-column>
            </el-table>
            <el-pagination @current-change="CurrentChange" layout="prev, pager, next" :total="totalPages">
            </el-pagination>
        </div>
      </el-col>
    </el-row>
    <!--**充值凭证**-->
    <el-dialog title='充值操作' width='30%' :visible.sync="chongdialog" >
      <ul class='touBox'>
        <li class='touList'><span class='touLabel'>充值金额：</span>500元</li>
        <li class='touList'><span class='touLabel'>付款凭证：</span><img src="../../../assets/banner1.png" alt="" class='tou-img' @click="bigImg" ></li>
        <li class='touList'><span class='touLabel'>操作密码：</span><el-input v-model="password" type='password' class='danInp' size='small' ></el-input></li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button  type='primary' @click="chongdialog = false">确定</el-button>
        <el-button @click="chongdialog = false">取消</el-button>
      </span>
    </el-dialog>
    <!--**图片放大**-->
    <div class="mask" v-show="show" @click="small">
      <img :src="bigsrc" alt="" class="bigimg">
    </div>
  </div>
</template>
<script>
  import {bussinessWater,formatDate} from '../../../api/api'
  export default {
    data(){
      return {
        chongdialog:false,
        password:'',
        bigsrc:'',
        show:false,
        totalPages:0,
        currentPage:1,
        form:{
          num:'',
          state: '',
          date: ''
        },
        tableData: []
      };
    },
    mounted(){
      bussinessWater('','','',1,10).then(response=>{
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
      //查看原图
      bigImg(e){
        this.show=true;
        this.bigsrc=e.target.currentSrc;
      },
      //隐藏原图
      small(){
        this.show=false;
      },
       search(){
        var date1=''
        var date2=''
        if(this.form.date==null){
           date1=null
           date2=null
        }else{
          date1=formatDate(new Date(this.form.date[0]));
          date2=formatDate(new Date(this.form.date[1]));
        }
        bussinessWater(this.form.num,date1,date2,this.currentPage,10).then(response=>{
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
        var date1=''
        var date2=''
        if(this.form.date==null){
           date1=null
           date2=null
        }else{
          date1=formatDate(new Date(this.form.date[0]));
          date2=formatDate(new Date(this.form.date[1]));
        }
        bussinessWater(this.form.num,date1,date2,e,10).then(response=>{
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
  .orders .el-button+.el-button{
    margin:0;
  }
  .jia{
    color:#f00;
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
    width:80%;
  }
  .orders .el-tabs__content{
    position:static;
  }
</style>
