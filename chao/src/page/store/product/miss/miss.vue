<template>
  <div class='back'>
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
                <el-date-picker v-model="form.date" type="daterange" :default-time="['00:00:00', '23:59:59']"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click='search'>查询</el-button>
              </el-form-item>
            </el-form>
            <div class="btnBox">
              <el-button type="primary" size="small" @click="excel_down()">批量导出</el-button>
              <el-button type="success" size="small" @click="zhuandialog = true,zhuan_type=1">一键转账成功</el-button>
              <el-button type="warning" size="small" @click="zhuandialog = true,zhuan_type=2">转账成功</el-button>
              <el-button type="danger" size="small" @click="zhuandialog = true,zhuan_type=3">转账失败</el-button>
            </div>
            <el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark"  style="width: 100%"  @selection-change='selection' header-row-class-name="table-header">
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
            </el-table>
            <el-pagination @current-change="CurrentChange" layout="prev, pager, next" :total="totalPages" v-if='totalPages!=0'>
            </el-pagination>
          </div>
        </el-col>
      </el-row>
       <!-- 一键转账成功 -->
      <el-dialog  title="一键转账" :visible.sync="zhuandialog" width="40%" >
        <div class="recharge-info">
          <div class='info-fl'><p class='icons'>i</p></div>
          <div class="infos-box" v-if='zhuan_type==1'>您将进行一键转账功能，请确认表格已导出已全部把本金返还给刷手</div>
          <div class="infos-box" v-if='zhuan_type==2'>您将进行转账成功操作，请确认表格已导出已全部把本金返还给刷手</div>
          <div class="infos-box" v-if='zhuan_type==3'>您将进行转账失败操作，是否确认</div>
        </div>
       <el-input v-model="password" type='password' placeholder="请输入操作密码" style='margin-bototm:30px;'></el-input>
        <el-input v-model="why" type='text' placeholder="请输入失败原因" v-if='zhuan_type==3'></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button type='primary'  @click="zhuans" size='small' >确定</el-button>
          <el-button @click="zhuandialog = false" size='small' >取消</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
  import {zip_down} from '../../../../until/common'
  import {findAllTransfer,transferSuccess,formatDate} from '../../../../api/api'
  export default {
    name: "back",
    data(){
      return{
        zhuan_type:'',
        zhuandialog:false,
        totalPages:0,
        currentPage:1,
        password:'',
         why:'',
        check:[],
        form:{
          num:'',
          state: '',
          date: '',
        },
        tableData:[]
      }
    },
    mounted(){
      findAllTransfer('',6,'','','',1,10).then(response=>{
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
      // 导出为表格
    excel_down(){
      var that=this;
      findAllTransfer('',6,'','','',1,10000).then(response=>{
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
           findAllTransfer(this.form.state,6,this.form.num,date1,date2,e,10).then(response=>{
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
         findAllTransfer(this.form.state,6,this.form.num,date1,date2,this.currentPage,10).then(response=>{
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

      // 复选框状态改变
      selection(val) {
        this.check = val;
      },
      zhuans(){
        var that=this;
        if(this.password==''){
          this.$message.warning('请填写操作密码')
        }else{
          var idList=[];
          for(var i=0;i<this.check.length;i++){
            idList.push(this.check[i].id)
          }
          transferSuccess(6,this.zhuan_type,idList,this.password,this.way).then(response=>{
           this.zhuandialog=false
            var data=response
            this.zhuandialog=true
            if(data.msg==3){
              this.$message.error('操作密码错误')
            }else if(data.msg==1){
              this.$message.success('操作成功')
              setTimeout(function(){
                that.$router.go(0)
              },500)
            }
          }).catch(error=>{

          })
        }
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
  .back .recharge-info{
    margin-bottom:20px;
    background:#E6F7FF;
    border-radius:4px;
    border:1px solid #91D5FF;
  }
  .back .rechare-title{
    font-size:16px;
    color:#000;
    font-weight:bold;
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
  .inputss{
    margin-bottom:30px;
  }
</style>
