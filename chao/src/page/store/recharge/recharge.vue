<template>
  <div class='chong chongs'>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="all-box">
          <div class="recharge-pay">
            <el-row type="flex"  justify="space-between">
              <el-col :span='11' >
                <div class='chong-fl'>
                  <p class="rechare-title" v-if='zhis==1'>账户信息<span class='rechare-change' @click='dialogFormVisible=true'>添加</span></p>
                  <p class="rechare-title" v-else>账户信息<span class='rechare-change' @click='dialogFormVisible=true'>修改</span></p>
                  <div class='chong-type'>
                    <img src="../../../assets/zhi.png" alt=""  class='zhi-icon' >
                    <div class='chong-message'>
                      <p>账号：{{zhis.alipayAccount}}</p>
                      <p>开户人：{{zhis.alipayNickname}}</p>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span='12'>
                <div class='chong-fl'>
                  <p class="rechare-title" v-if='banks==1'>账户信息<span class='rechare-change' @click='carddialog=true' >添加</span></p>
                  <p class="rechare-title" v-else>账户信息<span class='rechare-change' @click='carddialog=true' >修改</span></p>
                  <div class='chong-type'>
                    <img src="../../../assets/back.png" alt=""  class='zhi-icon' >
                    <div class='chong-message'>
                      <p>所属银行：{{banks.bankType}}</p>
                      <p>开户人：{{banks.bankAccountName}}</p>
                    </div>
                    <div class='chong-message'>
                      <p>支行信息：{{banks.bankSubBranch}}</p>
                    </div>
                    <div class='chong-message'>
                      <p>卡号：{{banks.bankCard}}</p>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="all-box all-boxs">
          <el-table :data="tableData" style="width: 100%;background:#fff;" row-key="list"
                        header-row-class-name="table-header" border>
              <el-table-column prop="username" label="修改人" header-align="center" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="roleName" label="修改角色" header-align="center"  show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="createAt" label="修改时间" header-align="center"  show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="change_types" label="账户分类" header-align="center"  show-overflow-tooltip>
                <template slot-scope="scope">
                  <p v-if='scope.row.type==1'>支付宝</p>
                  <p v-else>银行卡</p>
                </template>
              </el-table-column>
              <el-table-column prop="content" label="修改信息" header-align="center"  show-overflow-tooltip>
              </el-table-column>
          </el-table>
          <el-pagination @current-change="CurrentChange" layout="prev, pager, next" :total="totalPages">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <!-- 修改支付宝账户 -->
    <el-dialog title="修改支付宝账户" :visible.sync="dialogFormVisible" width='30%' >
      <el-form :model="zhiForm" ref="zhiForm" :rules="zhirules" label-width="100px" >
        <el-form-item label="支付宝昵称" prop='alipayNickname'>
          <el-input v-model="zhiForm.alipayNickname" auto-complete="off" placeholder='' ></el-input>
        </el-form-item>
        <el-form-item label="支付宝账号" prop='alipayAccount'>
          <el-input v-model="zhiForm.alipayAccount" auto-complete="off" placeholder='' ></el-input>
        </el-form-item>
        <el-form-item label="操作密码" prop='password'>
          <el-input type='password' v-model="zhiForm.password" auto-complete="off" placeholder='' ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="zhi('zhiForm')" size='small'>确 定</el-button>
        <el-button @click="dialogFormVisible = false" size='small'>取 消</el-button>
      </div>
    </el-dialog>
    <!-- 修改银行卡 -->
    <el-dialog  title="修改银行卡" :visible.sync="carddialog" width="30%" >
      <el-form :model="bankForm" ref="bankForm" :rules='bankrules' label-width="140px">
        <el-form-item label="选择银行">
          <el-input placeholder='招商银行' :disabled='true'></el-input>
        </el-form-item>
        <el-form-item label="支行名称" prop='bankSubBranch'>
          <el-input v-model="bankForm.bankSubBranch"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号" prop='bankCard'>
          <el-input v-model="bankForm.bankCard"></el-input>
        </el-form-item>
        <el-form-item label="开户人姓名" prop='bankAccountName'>
          <el-input v-model="bankForm.bankAccountName"></el-input>
        </el-form-item>
        <el-form-item label="开户人身份证号" prop='bankIdCard'>
          <el-input v-model="bankForm.bankIdCard"></el-input>
        </el-form-item>
        <el-form-item label="银行卡绑定手机号" prop='bankPhone'>
          <el-input v-model="bankForm.bankPhone"></el-input>
        </el-form-item>
        <el-form-item label="操作密码" prop='password'>
          <el-input type='password' v-model="bankForm.password"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type='primary'  @click="card('bankForm')" size='small' >确定</el-button>
          <el-button @click="carddialog = false" size='small' >返回</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import {changeSearch,alipay,addBank} from '../../../api/api';
  export default {
    data(){
      return {
        dialogFormVisible:false,
        carddialog:false,
        banner:[],
        zhis:'',
        banks:'',
        totalPages:0,
        currentPage:1,
        zhiForm:{
          id:'',
          alipayNickname:'',
          alipayAccount:'',
          password:''
        },
        bankForm:{
          id:'',
          bankSubBranch:'',
          bankCard:'',
          bankAccountName:'',
          bankIdCard:'',
          bankPhone:'',
          hang:'招商银行',
          password:''
        },
        tableData:[],
        bankrules:{
          bankSubBranch:[{required:true,trigger:'blur',message:'请输入支行名称'}],
          bankCard:[{required:true,trigger:'blur',message:'请输入银行卡号'}],
          bankAccountName:[{required:true,trigger:'blur',message:'请输入开户人名称'}],
          bankIdCard:[{required:true,trigger:'blur',message:'请输入开户人身份证号'},{ min: 15, max: 18, message: '请输入15或18位身份证号', trigger: 'blur' }],
          password:[{required:true,trigger:'blur',message:'请输入操作密码'}],
          bankPhone:[{required:true,trigger:'blur',message:'请输入银行卡绑定手机号'}],
        },
        zhirules:{
          alipayAccount:[{required:true,trigger:'blur',message:'请输入支付宝账号'}],
          password:[{required:true,trigger:'blur',message:'请输入操作密码'}],
          alipayNickname:[{required:true,trigger:'blur',message:'请输入支付宝昵称'}]
        },
      }
    },
    mounted(){
      changeSearch(1,10).then(response=>{
        var data=response
        this.zhis=data.pay
        this.banks=data.bank
        this.zhiForm=data.pay
        this.bankForm=data.bank
         if(data.record!=1){
            this.tableData=data.record.result
            this.totalPages=data.record.totalRow
         }else{
            this.tableData=[]
            this.totalPages=0
         }
        
      }).catch(error=>{

      })
    },
    methods: {
      CurrentChange(e){
        this.currentPage=e
        changeSearch(e,10).then(response=>{
          var data=response
          if(data.record!=1){
             this.tableData=data.record.result
          }else{
            this.tableData=[]
             this.totalPages=0
          }
         
        }).catch(error=>{
        })
      },
      // 银行卡绑定
      card(formName){
          var that=this;
         this.$refs[formName].validate((valid) => {
          if (valid) {
             this.carddialog=false
             addBank(this.bankForm.id,'招商银行',this.bankForm.bankCard,this.bankForm.bankSubBranch,this.bankForm.bankAccountName,this.bankForm.bankIdCard,this.bankForm.bankPhone,this.bankForm.password).then(response=>{
              var data=response
              if(data.msg==1){
                this.$message.success('设置成功')
                setTimeout(function(){
                  that.$router.go(0)
                },500)
              }else if(data.msg==3){
                this.$message.error('已经存在支付宝信息，不能重复添加')
              }else if(data.msg==4){
                this.$message.error('操作密码错误')
              }
            }).catch(error=>{

            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
       // 支付宝设置
      zhi(formName){
        var that=this;
         this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogFormVisible=false
            alipay(this.zhiForm.id,this.zhiForm.alipayAccount,this.zhiForm.alipayNickname,this.zhiForm.password).then(response=>{
              var data=response
              if(data.msg==1){
                this.$message.success('设置成功')
                setTimeout(function(){
                  that.$router.go(0)
                },500)
              }else if(data.msg==3){
                this.$message.error('已经存在支付宝信息，不能重复添加')
              }else if(data.msg==4){
                this.$message.error('操作密码错误')
              }
            }).catch(error=>{

            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>

<style>
  .all-box{
    margin-bottom:30px;
  }
  .all-boxs{
    background:#fff;
  }
  .chong .recharge-pay{
    background:none;
    padding:0;
  }
  .recharge-info{
    margin-bottom:20px;
    background:#E6F7FF;
    border-radius:4px;
    border:1px solid #91D5FF;
  }
  .rechare-change{
    float:right;
    font-size:14px;
    color:#F5222D;
    font-weight:bold;
    cursor:pointer;
  }
  .rechare-title{
    font-size:16px;
    color:#000;
    font-weight:bold;
    text-align: left;
  }
  .rechare-span{
    font-size:14px;
    color:rgba(0,0,0,0.45);
  }
  .info-box{
    padding:15px;
    font-size:14px;
    text-align: left;
    line-height:30px;
  }
  .chong-fl{
    background:#fff;
    padding:20px;
  }
  .chong .info-fl{
    float:left;
    width:8%;
    position:relative;
    height:144px;
  }
  .chong .icons{
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
  .chong-list{
    width:100%;
    height:120px;
    border-bottom:1px solid #E9E9E9;
    display:flex;
  }
  .chong-lists{
    width:100%;
    height:150px;
    border-bottom:1px solid #E9E9E9;
    overflow:hidden;
  }
  .chong-listss{
    border:none;
    height:120px;
  }
  .chong-list .money-yu{
    text-align:left;
    flex-grow:1
  }
  .money-yu .moneyYutitle{
    font-size:14px;
    color:#000;
    display:block;
    width:100%;
    margin-top:30px;
  }
  .money-yu .moneyYumoney{
    font-size:24px;
    color:#F5222D;
    display:block;
    width:100%;
  }
  .chongNi{
    width:52%;
    text-align:left;
    font-size:14px;
    color:#000;
    margin-top:60px;
    margin-bottom:10px;
    display:block;
  }
  .chongNiss{
    margin-top:30px;
  }
  .chongNis{
    font-size:14px;
    text-align:left;
    color:#F5222D;
  }
  .chongNi:nth-last-child(1){
    margin:0;
  }
  .chong-label{
    color:rgba(0,0,0,0.45);
  }
  .chong-labels{
    float:right;
    color:#1890FF;
    cursor:pointer;
  }
  .long-btn{
    width:160px;
  }
  .chong-type{
    height:120px;
    border-bottom:1px solid #e9e9e9;
  }
  .chong-type:nth-last-child(1){
    border:none;
  }
  .zhi-icon{
    display:block;
    margin-top:30px;
    margin-bottom:14px;
  }
  .chongs .chong-message{
    width:100%;
    display:flex;
    justify-content:space-between;
    font-size:14px;
    text-align:left;
    color:#000;
    margin-bottom:6px;
  }
  .chong-import{
    color:#F5222D;
  }
</style>
