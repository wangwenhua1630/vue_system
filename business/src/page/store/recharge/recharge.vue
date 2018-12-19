<template>
  <div class='chong'>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="all-box">
          <div class="recharge-info">
            <div class='info-fl'>
              <p class='icons '>i</p>
            </div>
            <ul class="info-box">
              <p class="rechare-title">充值说明</p>
              <li>1、转账备注务必正确填写，否则无法自动充值到账。</li>
              <li>2、如果备注填写错误或者忘记填写，可先尝试手动充值，如无效，请联系客服QQ：3250150163处理。</li>
              <li>3、企业支付宝转账<span>无法自动到账</span>请勿使用。</li>
            </ul>
          </div>
          <div class="recharge-pay">
            <el-row type="flex"  justify="space-between">
              <el-col :span='11' >
                <div class='chong-fl'>
                  <p class="rechare-title">充值说明</p>
                  <div class='chong-list'>
                    <div class='money-yu'>
                      <p class='moneyYutitle'>账户余额
                      <!--<span style= 'color:#1890ff;cursor:pointer;' @click="moneydialog=true" v-if='tuis!=1' >（退款）</span>-->
                      <!--<span style= 'color:#1890ff;cursor:pointer;' v-if='tuis==1' >（退款中）</span>-->
                      </p>
                      <p class='moneyYumoney'>￥{{info.moneysBalance}}</p>
                    </div>
                    <div class='money-yu'>
                      <p class='moneyYutitle'>发布点</p>
                      <p class='moneyYumoney'>{{info.issuePoint}}点</p>
                    </div>
                  </div>
                  <div class='chong-lists'>
                    <p class='chongNi'>支付宝昵称<span class='chong-label'>（支付宝昵称不是支付宝帐号！）</span></p>
                    <p class='chongNi'>{{info.alipayName}}<span class='chong-labels' @click="dialogFormVisible = true">修改</span></p>
                  </div>
                  <div class='chong-lists chong-listss'>
                    <p class='chongNi chongNiss'>转账备注</p>
                    <p class='chongNis'>1982</p>
                  </div>
                  <el-button class='style-btn long-btn ' round type='primary' size='small'  @click="moneyVisible = true">我要充值</el-button>
                </div>
              </el-col>
              <el-col :span='12'>
                <div class='chong-fl'>
                  <p class="rechare-title">充值方式<span class='rechare-span'>（请使用支付宝/银行卡转账至以下用户）</span></p>
                  <div class='chong-type'>
                    <img src="../../../assets/zhi.png" alt=""  class='zhi-icon' >
                    <div class='chong-message'>
                      <p>账号：<span class='chong-import'>{{ali.alipayAccount}}</span></p>
                      <p>开户人：{{ali.alipayNickname}}</p>
                    </div>
                  </div>
                  <div class='chong-type'>
                    <img src="../../../assets/back.png" alt=""  class='zhi-icons' >
                    <div class='chong-message'>
                      <p>所属银行：{{bankMessage.bankType}}</p>
                      <p>开户人：{{bankMessage.bankAccountName}}</p>
                    </div>
                    <div class='chong-message'>
                      <p>支行信息：{{bankMessage.bankSubBranch}}</p>
                    </div>
                    <div class='chong-message'>
                      <p>卡号：<span class='chong-import'>{{bankMessage.bankCard}}</span></p>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 退款弹框 -->
    <el-dialog  title="提醒" :visible.sync="moneydialog" width="30%" >
      <p class='loading-title' >余额不足将无法发布任务, 是否继续！！！</p>
      <el-input type='password' placeholder='请在此处输入支付密码' v-model='tuiPassword' ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type='primary'  @click="tui" size='small' >确定</el-button>
        <el-button @click="moneydialog = false" size='small' >取消</el-button>
      </span>
    </el-dialog>
    <!-- 修改昵称 -->
    <el-dialog title="修改支付宝昵称" :visible.sync="dialogFormVisible" width='30%' >
      <el-form :model="form">
        <el-form-item label="支付宝昵称">
          <el-input v-model="form.userName" auto-complete="off" placeholder='请输入支付宝昵称' ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 我要充值 -->
    <el-dialog title="我要充值" :visible.sync="moneyVisible" width='30%' >
      <el-form :model="forms" ref="forms"  :rules='rules' label-width='80px' >
        <el-form-item label="充值金额" prop='money' >
          <el-input v-model="forms.money" auto-complete="off" placeholder='请输入充值金额' ></el-input>
        </el-form-item>
        <el-form-item label="充值密码" prop='password'>
          <el-input v-model="forms.password" auto-complete="off" placeholder='请输入支付密码' type='password' ></el-input>
        </el-form-item>
        <el-form-item label="上传转账信息截图">
          <el-upload action="http://www.rwgh66.com/sd-web/merchant/upload" list-type="picture-card"
                    :on-remove="handleRemoves"
                     :on-success="bannerUp" :limit="1" :on-exceed="handleExceeds" class="up_load">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button @click="moneyVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('forms')">确 定</el-button>
        </el-form-item>
      </el-form>
     <!--  <div slot="footer" class="dialog-footer">
        <el-button @click="moneyVisible = false">取 消</el-button>
        <el-button type="primary" @click="chong('forms')">确 定</el-button>
      </div> -->
    </el-dialog>
  </div>
</template>
<script>

  import {zhiName,moneys,recharge,tui} from '../../../api/money';
  export default {
    data(){
      return {
        dialogFormVisible:false,
        moneyVisible:false,
        moneydialog:false,
        banner:[],
        imgs:'',
        info:'',
        tuis:0,
        bankMessage:'',
        ali:'',
        tuiPassword:'',
        form:{
          userName:''
        },
        forms:{
          money:'',
          password:''
        },
        rules:{
          money:[{required:true,trigger:'blur',message:'请输入充值金额'}],
          password:[{required:true,trigger:'blur',message:'请输入支付密码'}]
        },
      }
    },
    mounted(){
      moneys().then(response => {
        const data = response;
         if(data.msg==1){
            this.info=data.businessAccount
            this.bankMessage=data.adminBank
            this.ali=data.adminAlipay
            this.tuis=data.refund
         }
      }).catch(error => {
        reject(error);
      }); 
    },
    methods: {
      //展示图的操作
      bannerUp(response, file, fileList){
        this.banner.push(file.url);
        this.imgs=response.src
      },
      handleRemoves(file){
        let that=this;
        this.banner.forEach(function(item,index){
          if(file.url==item){
            that.banner.splice(index,1)
          }
        });
      },
      handleExceeds(){
        this.$alert('只能上传1张图片', '充值凭证', {
          confirmButtonText: '确定',
          callback: action => {

          }
        });
      },
      // 修改支付宝昵称
      confirm(){
        if(this.form.userName==''){
           this.$message.warning('请填写支付宝昵称');
        }else{
          zhiName(this.form.userName).then(response => {
                const data = response;
                 this.loading=false
                 if(data.msg==1){
                    this.info.alipayName=data.businessAccount.alipayName
                 }
              }).catch(error => {
                reject(error);
            }); 
        }
      },
      // 充值
      submitForm(formName){
        var that=this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 选判断截图是否上传
            if(that.banner==''){
              that.$message.error('请上传充值凭证');
            }else if(Number(this.forms.money)>99999){
              that.$message.error('最多只能充值99999');
            }else if(Number(this.forms.money)<0){
              that.$message.error('请输入正确的金额');
            }else{
              this.moneyVisible=false;
              recharge(this.forms.money,this.imgs,this.forms.password).then(response => {
                  const data = response;
                  if(data.msg==1){
                      this.$message.success('提交成功，等待审核');
                  }else if(data.msg==3){
                      this.$message.error('支付密码错误');
                  }else if(data.msg==4){
                      this.$message.error('需将发布点兑换金额后在退款');
                  }
                }).catch(error => {
                  reject(error);
                }); 
             }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 退款
      tui(){
        var that=this;
        if(this.tuiPassword!=''){
           tui(this.tuiPassword).then(response => {
                const data = response;
                  this.moneydialog=false
                  if(data.msg==1){
                      this.$message.success('退款中');
                      setTimeout(function(){
                        that.$router.go(0)
                      },500)
                  }else if(data.msg==3){
                      this.$message.error('支付密码错误');
                  }else if(data.msg==4){
                      this.$message.error('您还有未使用完的发布点');
                  }
              }).catch(error => {
                reject(error);
            }); 
        }else{
          this.$message.warning('请输入支付密码')
        }
      }
    }
  }
</script>

<style>
  .all-box{
    padding:20px;
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
    height:500px;
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
    height:220px;
    border-bottom:1px solid #e9e9e9;
  }
  .chong-type:nth-last-child(1){
    border:none;
  }
  .zhi-icon{
    display:block;
    margin-top:30px;
    margin-bottom:14px;
    width:80px;
    height:24px;
  }
  .zhi-icons{
    display:block;
    margin-top:30px;
    margin-bottom:14px;
    width:103px;
    height:24px;
  }
  .chong-message{
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
  .loading-title{
    text-align: left;
    margin-bottom:20px;
    color:#1890FF;
  }
</style>
