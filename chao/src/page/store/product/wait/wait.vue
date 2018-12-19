<template>
  <div class='wait' >
      <el-row class="row-bg" type="flex"  justify="center">
        <el-col>
          <div class="queryBoxs">
            <el-form ref="form" :model="form" class="queryBox" label-width="70px"  size="small" :inline="true">
              <el-form-item label="端口来源">
                <el-select v-model="form.state" placeholder="请选择" >
                  <el-option label="商家" value="1"></el-option>
                  <el-option label="刷手" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="订单编号">
                <el-input v-model="form.num" ></el-input>
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
              <el-button type="success" size="small" @click="zhuan(zhuan_type=1)">一键转账成功</el-button>
              <el-button type="warning" size="small" @click="zhuan(zhuan_type=2)">转账成功</el-button>
              <el-button type="danger" size="small" @click="zhuan(zhuan_type=3)">转账失败</el-button>
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
        <el-input v-model="password" type='password' placeholder="请输入操作密码" class='inputss'></el-input>
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
    name: "wait",
  data(){
      return{
        carddialog:false,
        zhuan_type:'',
        password:'',
        zhuandialog:false,
        totalPages:0,
        currentPage:1,
        why:'',
        check:[],
        form:{
          num:'',
          state: '',
          date: '',
        },
        formcard:{
          cardName:'',
          cardCard:'',
          cardUsername:'',
          cardUsercard:'',
          cardPhone:'',
          hang:'1'
        },
        rules:{
          cardName:[{required:true,trigger:'blur',message:'请输入支行名称'}],
          cardCard:[{required:true,trigger:'blur',message:'请输入银行卡号'}],
          cardUsername:[{required:true,trigger:'blur',message:'请输入开户人名称'}],
          cardUsercard:[{required:true,trigger:'blur',message:'请输入开户人身份证号'},{ min: 18, max: 18, message: '请输入18位身份证号', trigger: 'blur' }],
          cardPhone:[{required:true,trigger:'blur',message:'请输入银行卡绑定手机号'}],
        },
        tableData:[]
      }
  },
  mounted(){
    findAllTransfer('',1,'','','',1,10).then(response=>{
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
      findAllTransfer('',1,'','','',1,10000).then(response=>{
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
       findAllTransfer(this.form.state,1,this.form.num,date1,date2,e,10).then(response=>{
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
        findAllTransfer(this.form.state,1,this.form.num,date1,date2,this.currentPage,10).then(response=>{
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
    // 转账
    zhuan(type){
      this.zhuan_type=type
      if(type!=1){
        if(this.check==''){
          this.$message.warning('请至少选择一项')
        }else{
          this.zhuandialog=true
        }
      }else{
          this.zhuandialog=true
      }
    },
    // 复选框状态改变
    selection(val) {
      this.check = val;
    },
    zhuans(){
      var that=this;
      var idList=[];
      for(var i=0;i<this.check.length;i++){
        idList.push(this.check[i].id)
      }
      if(this.password==''){
        this.$message.warning('请填写操作密码')
      }else{
        transferSuccess(1,this.zhuan_type,idList,this.password,this.way).then(response=>{
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
  .row-bg{
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
    display: block;
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
  .inputss{
    margin-bottom:30px;
  }
</style>
