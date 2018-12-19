<template>
  <div class='wait' >
      <el-row class="row-bg row-bgs" type="flex"  justify="space-between">
        <el-col :span="11">
          <div class="zhuan-step">
            <p class="step-title">批量转账流程(只支持招商银行)</p>
            <el-steps :active="4" align-center>
              <el-step title="步骤 1" description="导出转账信息"></el-step>
              <el-step title="步骤 2" description="在网银进行转账操作"></el-step>
              <el-step title="步骤 3" description="返回平台标记转账失败订单"></el-step>
              <el-step title="步骤 4" description="最后标记转账成功订单"></el-step>
            </el-steps>
          </div>
          <div class="zhuan-step">
            <p class="step-title">默认转账银行卡</p>
            <div class="card">
              <p class="card-title"></p>
              <p class="card-num">**** **** **** ***7628</p>
              <div class="card-user">
                <span class="card-name">开户人:***</span>
                <p class='card-btn' @click="change"></p>
                <!--<p class='card-btn' @click="carddialog = true"></p>-->
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="11">
          <div class="money-rule">
            <p class="rule-title">转账相关规定</p>
            <ul class="rule-list">
              <li>1、必须在每天15：00前完成前一天的所有转账，否则任务将被隐藏；</li>
              <li>2、严禁使用支付宝转账，一经发现将终止合作；</li>
              <li>3、对于超时未转账的订单，买家有权申请退款；</li>
              <li>4、对于多次超时的卖家，平台有权终止合作。</li>
            </ul>
            <div class="ruleBox">
              <ul class="rule-list rule-lists">
                <li><i class="el-icon-bell"></i>招商银行批量转账教程</li>
                <li><i class="el-icon-bell"></i>招商银行批量转账教程</li>
                <li><i class="el-icon-bell"></i>招商银行批量转账教程</li>
              </ul>
              <ul class="rule-list rule-lists">
                <li><i class="el-icon-bell"></i>招商银行批量转账教程</li>
                <li><i class="el-icon-bell"></i>招商银行批量转账教程</li>
                <li><i class="el-icon-bell"></i>招商银行批量转账教程</li>
              </ul>
            </div>
          </div>
        </el-col>
      </el-row>
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
                <el-date-picker type="daterange"  v-model='form.date' :default-time="['00:00:00', '23:59:59']" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click='search' >查询</el-button>
              </el-form-item>
            </el-form>
            <div class="btnBox">
              <el-button type="primary" size="small" @click="excel_down()">批量导出</el-button>
              <el-button type="success" size="small" @click="zhuandialog=true,zhuan_type=1">一键转账成功</el-button>
              <el-button type="warning" size="small" @click="zhuans(2)">转账成功</el-button>
              <el-button type="danger" size="small" @click="zhuans(3)">转账失败</el-button>
            </div>
            <el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark"  style="width: 100%"   header-row-class-name="table-header" @selection-change='selection'>
              <el-table-column type="selection"  width="55" header-align="center" >
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
                    <p v-if='scope.row.transferStatus==1'>等待转账</p>
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
      <!-- 修改银行卡信息 -->
      <el-dialog  title="银行卡修改" :visible.sync="carddialog" width="30%" >
        <el-form ref="formcard" :model="formcard" :rules="rules" label-width="140px">
    <!--       <el-form-item label="选择银行">
            <el-select  placeholder="请选择" class="select" v-model='formcard.hang' style='width:100%;' >
              <el-option label="招商银行" value="1"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="开户行" prop='bankType'>
            <el-input v-model="formcard.bankType"></el-input>
          </el-form-item>
          <el-form-item label="支行名称" prop='cardName'>
            <el-input v-model="formcard.cardName"></el-input>
          </el-form-item>
          <el-form-item label="银行卡号" prop='cardCard'>
            <el-input v-model="formcard.cardCard"></el-input>
          </el-form-item>
          <!--<el-form-item label="开户人姓名" prop='cardUsername'>-->
            <!--<el-input v-model="formcard.cardUsername"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="开户人身份证号" prop='cardUsercard'>-->
            <!--<el-input v-model="formcard.cardUsercard"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="银行卡绑定手机号" prop='cardPhone'>-->
            <!--<el-input v-model="formcard.cardPhone"></el-input>-->
          <!--</el-form-item>-->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type='primary'  @click="cardChange('formcard')" size='small' >确定</el-button>
          <el-button @click="carddialog = false" size='small' >返回</el-button>
        </span>
      </el-dialog>
      <!-- 一键转账成功 -->
      <el-dialog  title="提示" :visible.sync="zhuandialog" width="40%" >
        <div class="recharge-info">
          <div class='info-fl'><p class='icons'>i</p></div>
          <div class="infos-box" v-if='zhuan_type==1'>您将进行一键转账功能，请确认表格已导出已全部把本金返还给刷手</div>
          <div class="infos-box" v-if='zhuan_type==2'>您将进行转账成功操作，请确认表格已导出已全部把本金返还给刷手</div>
          <div class="infos-box" v-if='zhuan_type==3'>您将进行转账失败操作，是否确认</div>
        </div>
        <el-input v-model="passwords" auto-complete="off" placeholder='请输入支付密码' type='password' ></el-input>
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
  import {bankInfo,vipBank} from '../../../../api/vip';
  import {formatDate} from '../../../../api/task';
  export default {
    name: "wait",
    data(){
        return{
          carddialog:false,
          password:'',
          passwords:'',
          zhuandialog:false,
          zhuan_type:'',
          totalPages:0,
          check:[],
          form:{
            num:'',
            date: '',
          },
          formcard:{
            cardName:'',
            cardCard:'',
            cardUsername:'',
            cardUsercard:'',
            cardPhone:'',
            bankType:''
          },
          rules:{
            bankType:[{required:true,trigger:'blur',message:'请输入开户行名称'}],
            cardName:[{required:true,trigger:'blur',message:'请输入支行名称'}],
            cardCard:[{required:true,trigger:'blur',message:'请输入银行卡号'}],
            // cardUsername:[{required:true,trigger:'blur',message:'请输入开户人名称'}],
            // cardUsercard:[{required:true,trigger:'blur',message:'请输入开户人身份证号'},{ min: 18, max: 18, message: '请输入18位身份证号', trigger: 'blur' }],
            // cardPhone:[{required:true,trigger:'blur',message:'请输入银行卡绑定手机号'}],
          },
          tableData:[],
          tableDatass:[]
        }
    },
    mounted(){
      zhuan(1,10,1).then(response => {
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
      /******修改银行卡资料*****/
      change(){
        var that=this;
        bankInfo().then(response=>{
            const data=response;
            that.formcard.bankType=data.businessAccount.bankType;
            that.formcard.cardName=data.businessAccount.subBranchName;
            that.formcard.cardCard=data.businessAccount.bankCard;
            that.carddialog=true;
        })
      },
      // 导出为表格
      excel_down(){
        var that=this;
        zhuan(1,10000,1).then(response => {
          const data = response;
          // console.log(data);
          var datas=data.page.result
           if(data.msg==1){
              require.ensure([], () => {
                const { export_json_to_excel } = require('@/vendor/Export2Excel')
                const tHeader = ['收款账户列','收款户名列','转账金额列','备注列','收款银行列','收款银行支行列','收款省/直辖市列','收款市县列','转出账号/卡','转账模式','淘宝ID(转账前请删除此列信息)','订单编号(转账前请删除此列信息)','刷手电话(转账前请删除此列信息)','刷手实际支付金额']
                const filterVal = ['bankCard','bankName','transferMoney','','bankType','subBranchName','','','formBankCard','','taoAccount','taoOrderNum','handPhone','countMoneys']
                const list = datas
                const data = that.formatJson(filterVal, list)
                export_json_to_excel(tHeader, data, '等待转账导出文本', '压缩文本')
              })
           }
        }).catch(error => {
          reject(error);
        }); 
        
      },
      formatJson(filterVal, jsonData){
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      // 条件查询
      search(){
        var date1 
        var date2
        if(this.form.date==''){
           date1=''
           date2=''
        }else{
          date1=formatDate(this.form.date[0])
          date2=formatDate(this.form.date[1])
        }
        zhuan(1,10,1,this.form.num,date1,date2).then(response => {
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
        zhuan(e,10,1).then(response => {
          const data = response;
           if(data.msg==1){
              this.tableData=data.page.result
              this.totalPages=data.page.totalRow
           }
        }).catch(error => {
          reject(error);
        }); 
      },
      // 修改银行卡信息
      cardChange(formName){
         this.carddialog=true;
         this.$refs[formName].validate((valid) => {
          if (valid) {
            // 请求
            vipBank(this.formcard.bankType,this.formcard.cardName,this.formcard.cardCard,this.formcard.cardUsername,this.formcard.cardUsercard,this.formcard.cardPhone).then(response => {
              const data = response;
              this.carddialog=false;
              if(data.msg==1){
                this.$message.success('银行卡更改成功更改成功');
              }else if(data.msg==2){
                this.$message.error('系统内部发生错误');
              }else if(data.msg==3){
                this.$message.error('您还没有添加银行卡信息');
              }
            }).catch(error => {
              reject(error);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
          zhuanStatus(1,this.zhuan_type,idList,this.passwords,'原因').then(response => {
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
  .row-bg{
    margin-bottom:30px;
  }
  .row-bgs{
    border-bottom:1px dashed rgba(0,0,0,0.35);
    padding-bottom:40px;
  }
  .wait .el-table{
    margin-bottom:30px;
  }
.step-title{
  text-align:left;
  font-size:14px;
  font-weight:bold;
  line-height:60px;
}
  .card{
    width:200px;
    height:106px;
    background:url('../../../../assets/card.png') no-repeat left center;
    background-size:contain;
    border-radius:4px;
    padding:10px;
  }
  .card-title{
    font-size:14px;
    color:#fff;
    height:38px;
    text-align: left;
  }
  .card-num{
    text-align: left;
    color:#fff;
    font-size:16px;
    line-height:30px;
  }
  .card-user{
    font-size:12px;
    color:#fff;
    text-align: left;
  }
  .card-btn{
    float:right;
    display:block;
    width:41px;
    height:18px;
    text-align:center;
    line-height:18px;
    cursor:pointer;
  }
  .money-rule{
    padding:10px;
    background:#f8f8f8;
  }
  .rule-title{
    font-size:14px;
    font-weight:bold;
    text-align: left;
  }
  .rule-list{
    text-align: left;
    font-size:14px;
    line-height:26px;
    border-bottom:1px dashed #ccc;
    padding-bottom:10px;
  }
  .ruleBox{
    overflow:hidden;
    margin-top:20px;
  }
  .rule-lists{
    padding:0;
    border:none;
    line-height:40px;
    float:left;
    margin-right:40px;
  }
  .rule-lists i{
    color:#f90;
    margin-right:6px;
  }
  .rule-lists li:hover{
    color:#1890FF;
    cursor:pointer;
  }
  .queryBox{
    display:block;
    text-align:left;
  }
  .btnBox{text-align: left;margin-bottom:20px;}
  .row-bg .el-table .table-header{
    background:#f5f7fa;
  }
  .el-table th, .el-table tr.table-header{
    background:#f5f7fa;
  }
  .wait .recharge-info{
    border:1px solid #91D5FF;
    background:#E6F7FF;
    border-radius:4px;
    width:100%;
    margin-bottom:30px;
  }
  .wait .info-fl{
    float:left;
    width:6%;
    position:relative;
    height:40px;
  }
  .wait .icons{
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
  .wait .infos-box{
    padding:0;
    font-size:14px;
    text-align: left;
    line-height:40px;
  }
</style>
