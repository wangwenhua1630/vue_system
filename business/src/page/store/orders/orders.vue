<template>
  <div class='orders'>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="store-inner">
          <p class='break'>流水明细</p>
            <el-form ref="form" :model="form" class="queryBox" label-width="70px"  size="small" :inline="true">
              <el-form-item label="统计时间">
                <el-date-picker type="daterange" v-model='form.date' :default-time="['00:00:00', '23:59:59']" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="类型">
                <el-select v-model="form.state" placeholder="请选择" >
                  <el-option label="发布任务" value="1"></el-option>
                  <el-option label="取消任务" value="2"></el-option>
                  <el-option label="充值" value="3"></el-option>
                  <el-option label="多退少补" value="4"></el-option>
                  <el-option label="财务增" value="5"></el-option>
                  <el-option label="财务扣" value="6"></el-option>
                  <el-option label="购买发布点" value="7"></el-option>
                  <el-option label="工单处罚" value="8"></el-option>
                  <el-option label="任务处罚" value="9"></el-option>
                  <el-option label="购买评价" value="10"></el-option>
                  <el-option label="取消评价" value="11"></el-option>
                  <el-option label="提现" value="12"></el-option>
                  <el-option label="超时未完成" value="13"></el-option>
                  <el-option label="报错未完成" value="14"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="任务编号">
                <el-input v-model="form.num" ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" round @click='search' >查询</el-button>
                <!--<el-button type="success" round>导出</el-button>-->
              </el-form-item>
            </el-form>
            <el-table :data="tableData" style="width: 100%;background:#fff;" row-key="list"
                        header-row-class-name="table-header" border stripe>
              <el-table-column prop="idNum" label="消费ID " header-align="center" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="capitalType" label="类型" header-align="center"  show-overflow-tooltip>
                <template slot-scope="scope">
                    <p v-if='scope.row.capitalType==1'>发布任务</p>
                    <p v-if='scope.row.capitalType==2'>取消任务</p>
                    <p v-if='scope.row.capitalType==3'>充值</p>
                    <p v-if='scope.row.capitalType==4'>多退少补</p>
                    <p v-if='scope.row.capitalType==5'>财务增</p>
                    <p v-if='scope.row.capitalType==6'>财务扣</p>
                    <p v-if='scope.row.capitalType==7'>购买发布点</p>
                    <p v-if='scope.row.capitalType==8'>工单处罚</p>
                    <p v-if='scope.row.capitalType==9'>任务处罚</p>
                    <p v-if='scope.row.capitalType==10'>购买评价</p>
                    <p v-if='scope.row.capitalType==11'>取消评价</p>
                    <p v-if='scope.row.capitalType==12'>提现</p>
                    <p v-if='scope.row.capitalType==13'>超时未完成</p>
                </template>
              </el-table-column>
              <el-table-column prop="consumeDeposit" label="消费存款" header-align="center"  show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="consumePoint" label="消费发布点" header-align="center"  show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="formerDeposit" label="原存款" header-align="center"  show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="formerPoint" label="原发布点" header-align="center" show-overflow-tooltip >
              </el-table-column>
              <el-table-column prop="residueDeposit" label="剩余存款" header-align="center"  show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="residuePoint" label="剩余发布点" header-align="center" show-overflow-tooltip >
              </el-table-column>
              <el-table-column prop="remark" label="备注" header-align="center">
              </el-table-column>
              <el-table-column prop="createAt" label="消费时间" header-align="center">
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
  import {waterList} from '../../../api/money';
  import {formatDate} from '../../../api/task';
  export default {
    data(){
      return {
        form:{
          num:'',
          state: '',
          date: '',
        },
        totalPages:12,
        tableData: [{
          water_id: '韵卡琳企业店',
          water_type: '155',
          water_hua: '赵雨蕾',
          cun_xiao:'500',
          cun_yuan:'1000',
          cun_sheng:'500',
          water_yuan: '15895887525658743599',
          water_sheng: '招商',
          water_bei: '招商',
          water_time: '2018-5-9'
        }]
      };
    },
    mounted(){
      waterList(1,10).then(response => {
        const data = response;
        console.log(data)
         if(data.msg==1){
            this.tableData=data.page.result
            this.totalPages=data.page.totalRow
         }
      }).catch(error => {
        reject(error);
      }); 
    },
    methods: {
      // 查询
      search(){
        var date1 
        var date2
        if(this.form.date==''||this.form.date==null){
           date1=''
           date2=''
        }else{
          date1=formatDate(new Date(this.form.date[0]))
          date2=formatDate(new Date(this.form.date[1]))
        }
        waterList(1,10,date1,date2,this.form.state,this.form.num).then(response => {
          const data = response;
           if(data.msg==1){
              if(data.page!=null){
                this.tableData=data.page.result
                this.totalPages=data.page.totalRow
              }else{
                this.tableData=[]
                this.totalPages=0
              }
           }
        }).catch(error => {
          reject(error);
        }); 
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
        waterList(e,10,date1,date2,this.form.state,this.form.num).then(response => {
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
  .orders .el-button+.el-button{
    margin:0;
  }
  .jia{
    color:#f00;
  }
</style>
