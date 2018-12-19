<template>
  <div class='miss'>
    <el-row class="row-bg" type="flex"  justify="center">
        <el-col>
          <div class="queryBoxs">
            <el-form ref="form" :model="form" class="queryBox" label-width="70px"  size="small" :inline="true">
              <!-- <el-form-item label="转账状态">
                <el-select v-model="form.state" placeholder="请选择" >
                  <el-option label="等待转账" value="1"></el-option>
                  <el-option label="已导出" value="2"></el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="订单编号">
                <el-input v-model="form.num" ></el-input>
              </el-form-item>
              <el-form-item label="截止时间">
                <el-date-picker type="daterange"  v-model='form.date' :default-time="['00:00:00', '23:59:59']"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click='search'>查询</el-button>
              </el-form-item>
            </el-form>
            <div class="btnBox">
              <el-button type="primary" size="small" @click="excel_down()">批量导出</el-button>
              <el-button type="success" size="small" @click="zhuandialog = true,zhuan_type=1">一键转账成功</el-button>
              <el-button type="warning" size="small" @click="zhuans(2)">转账成功</el-button>
              <el-button type="danger" size="small" @click="zhuans(3)">转账失败</el-button>
            </div>
            <el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark"  style="width: 100%"   header-row-class-name="table-header" @selection-change='selection'>
              <el-table-column type="selection"  width="55" header-align="center">
              </el-table-column>
               <el-table-column prop="idNum" label="订单编号"  header-align="center">
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
              <el-table-column prop="cardState" label="转账状态"  show-overflow-tooltip header-align="center">
                <template slot-scope="scope">
                    转账失败
                </template>
              </el-table-column>
              <el-table-column prop="cardTime" label="转账截止时间"  show-overflow-tooltip header-align="center">
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
      <!-- 一键转账成功 -->
      <el-dialog  title="提示" :visible.sync="zhuandialog" width="40%" >
        <div class="recharge-info">
          <div class='info-fl'><p class='icons'>i</p></div>
          <div class="infos-box" v-if='zhuan_type==1'>您将进行一键转账功能，请确认表格已导出已全部把本金返还给刷手</div>
          <div class="infos-box" v-if='zhuan_type==2'>您将进行转账成功操作，请确认表格已导出已全部把本金返还给刷手</div>
          <div class="infos-box" v-if='zhuan_type==3'>您将进行转账失败操作，是否确认</div>
        </div>
         <el-input v-model="passwords" auto-complete="off" placeholder='请输入支付密码' type='password' ></el-input>
         <el-input v-model="way" auto-complete="off" placeholder='请输入失败原因' v-if='zhuan_type==3' ></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button type='primary'  @click="confirm" size='small' >确定</el-button>
          <el-button @click="zhuandialog = false" size='small' >取消</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
  import {zip_down} from '../../../../until/common'
  import {zhuan,zhuanStatus} from '../../../../api/money';
  export default {
    name: "miss",
    data(){
      return{
        form:{
          num:'',
          state: '',
          date: '',
        },
        way:'',
        passwords:'',
        totalPages:0,
        check:[],
        zhuan_type:'',
        zhuandialog:false,
        tableData:[]
      }
    },
    mounted(){
      zhuan(1,10,6).then(response => {
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
        zhuan(1,10,6,this.form.num,date1,date2).then(response => {
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
        zhuan(e,10,6).then(response => {
          const data = response;
           if(data.msg==1){
              this.tableData=data.page.result
              this.totalPages=data.page.totalRow
           }
        }).catch(error => {
          reject(error);
        }); 
      },
       excel_down(){
        var that=this;
        zhuan(1,10000,6).then(response => {
          const data = response;
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
        }).catch(error => {
          reject(error);
        }); 
        
      },
      formatJson(filterVal, jsonData){
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      // 复选框状态改变
      selection(val) {
        this.check = val;
      },
      zhuans(types){
        this.zhuan_type=types
        if(this.check==''){
          this.$message.warning('请至少选择一条信息')
        }else{
          this.zhuandialog=true
        }
      },
      // 一键转账成功
      confirm(){
        this.zhuandialog=false
        if(this.passwords==''){
          this.$message.warning('请输入登录密码')
        }else{
          var idList=[];
          for(var i=0;i<this.check.length;i++){
            idList.push(this.check[i].id)
          }
          zhuanStatus(6,this.zhuan_type,idList,this.passwords,this.way).then(response => {
            const data = response;
             if(data.msg==1){
                this.$message.success('成功')
                this.$router.go(0)
                this.tableData=[]
                this.totalPages=0
             }else if(data.msg==3){
                this.$message.error('支付密码错误')
             }
          }).catch(error => {
            reject(error);
          }); 
        }
      }
    }
  }
</script>

<style>
  .btnBox{text-align: left;margin-bottom:20px;}
  .queryBox{
    display:block;
    text-align:left;
  }
  .row-bg .el-table .table-header{
    background:#f8f8f8;
  }
  .miss .recharge-info{
    margin-bottom:20px;
    background:#E6F7FF;
    border-radius:4px;
    border:1px solid #91D5FF;
  }
  .miss .rechare-title{
    font-size:16px;
    color:#000;
    text-align: left;
  }
  .miss .rechare-span{
    font-size:14px;
    color:rgba(0,0,0,0.45);
  }
  .miss .info-box{
    padding:15px;
    font-size:14px;
    text-align: left;
    line-height:30px;
  }
  .miss .info-fl{
    float:left;
    width:8%;
    position:relative;
    height:144px;
  }
  .miss .icons{
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
  .miss .recharge-info{
    border:1px solid #91D5FF;
    background:#E6F7FF;
    border-radius:4px;
    width:100%;
    margin-bottom:30px;
  }
  .miss .info-fl{
    float:left;
    width:6%;
    position:relative;
    height:40px;
  }
  .miss .icons{
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
    top:0;
    bottom:0;
    margin:auto;
  }
  .miss .infos-box{
    padding:0;
    font-size:14px;
    text-align: left;
    line-height:40px;
  }
</style>
