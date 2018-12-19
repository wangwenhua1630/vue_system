<template>
  <div>
    <div class='ji'>
      <div class='vip-title' >
        基本资料
        <el-button type="primary"  round class='style-btn shen-btn ' size='mini'  @click='submitMessage' v-if='he_status==0||he_status==2'  >提交审核</el-button>
        <div class='steps'>
          <div class='steps-list active'>
            <span class='step-num' >1</span>
            <span class='step-text'>填写资料</span>
            <p class='step-line'></p>
          </div>
          <div class='steps-list'  v-bind:class="[he_status==4||he_status==1||he_status==2?active:'']">
            <span class='step-num'>2</span>
            <span class='step-text'>审核中</span>
            <p class='step-line'></p>
          </div>
          <div class='steps-list'  v-bind:class="[he_status==1||he_status==2?active:'']">
            <span class='step-num'>3</span>
            <span class='step-text' v-if='he_status==1'>完成</span>
            <span class='step-text' v-if='he_status==2'>未通过</span>
          </div>
        </div>
      </div>
      <ul>
        <li class='vip-list' >
          <span class='vip-label'>商户昵称</span>
          <p class='vip-answer'>{{account}}</p>
        </li>
        <!--<li class='vip-list' >-->
          <!--<span class='vip-label'>店铺类型</span>-->
          <!--<p class='vip-answer' v-if='he_status==0||he_status==2'>-->
            <!--<span v-if='storeType==1'>阿里</span>-->
            <!--<span v-else>{{storeType}}</span>-->
            <!--<span class='vip-xiu' @click='storedialog=true'>选择</span> -->
          <!--</p>-->
          <!--<p class='vip-answer' v-else>{{storeType}}</p>-->
        <!--</li>-->
        <li class='vip-list' >
          <span class='vip-label'>店铺名称</span>
          <p class='vip-answer' v-if='he_status==0||he_status==2'>
          <span v-if='pan_store==1'>未绑定</span>
          <span v-else>{{storeForm.storeName}}</span>
          <span class='vip-xiu'@click='newstoredialog=true' >添加店铺</span> </p>
          <p class='vip-answer' v-else><span>{{storeName}}</span></p>
        </li>
        <!--<li class='vip-list' >-->
          <!--<span class='vip-label'>保证金</span>-->
          <!--<p class='vip-answer' >1000<span class='vip-xiu' @click='moneydialog=true' v-if='he_status==1' >退款</span> </p>-->
        <!--</li>-->
        <li class='vip-list' >
          <span class='vip-label'>银行卡绑定</span>
          <p class='vip-answer' v-if='he_status==0||he_status==2' >
            <span v-if='pan_card==1'>未绑定</span>
            <span v-else>已添加</span>
            <span class='vip-xiu' @click="carddialog = true">添加</span> 
          </p>
          <p class='vip-answer' v-else >
            <span>已绑定</span>
            <span class='vip-xiu' @click="carddialog = true">修改</span> 
          </p>
        </li>
         <li class='vip-list' >
          <span class='vip-label'>支付宝绑定</span>
          <p class='vip-answer' v-if='he_status==0||he_status==2'>
          <span v-if='pan_zhi==1' >未绑定</span>
          <span v-else>已添加</span>
          <span class='vip-xiu' @click="zhidialog = true">添加</span> </p>
          <p class='vip-answer' v-else>
          <span>已添加</span>
          <span class='vip-xiu' @click="zhidialog = true">修改</span> </p>
        </li>
        <li class='vip-list' >
          <span class='vip-label'>登录密码</span>
          <p class='vip-answer'>已设置 <span class='vip-xiu' @click="logindialog= true">修改</span> </p>
        </li>
        <li class='vip-list' >
          <span class='vip-label'>支付密码</span>
          <p class='vip-answer' v-if='he_status==0||he_status==2'>
            <span v-if='pan_zhi_password==1'>未设置</span>
            <span v-else>已设置</span>
            <span class='vip-xiu' @click="zhifudialog= true">设置</span>
          </p>
          <p class='vip-answer' v-else >
            <span>已设置</span>
            <span class='vip-xiu' @click="zhifudialog= true">修改</span>
          </p>
        </li>
      </ul>
      <!--<div class='ren-box' >-->
        <!--<p class='ren-title'>负责人身份证正反面照片</p>-->
        <!--<div class='upBox'>-->
          <!--<div class="up-img" @click="bigImg('https://www.bozhiyingxiao.com/task_program/imgs/up-one.png')">-->
            <!--<img src="../../assets/up-one.png" alt="" class="up-imgs" @click="bigImg">-->
            <!--<p class="upmask-img">正面</p>-->
          <!--</div>-->
           <!--<div class="up-img" @click="bigImg('https://www.bozhiyingxiao.com/task_program/imgs/up-two.png')">-->
            <!--<img src="../../assets/up-two.png" alt="" class="up-imgs" @click="bigImg">-->
            <!--<p class="upmask-img">反面</p>-->
          <!--</div>-->
          <!--<el-upload action="http://www.rwgh66.com/sd-web/merchant/upload" list-type="picture-card"-->
                    <!--:on-remove="handleRemoves"-->
                     <!--:with-credentials="true"-->
                     <!--:on-success="bannerUp" :limit="2" :on-exceed="handleExceeds" class="up_load">-->
            <!--<i class="el-icon-plus"></i>-->
          <!--</el-upload>-->
        <!--</div>-->
      <!--</div>-->
    </div>
     <!--**图片放大**-->
    <div class="mask" v-show="show" @click="small">
      <img :src="bigsrc" alt="" class="bigimg">
    </div>
    <!-- 选择店铺类型 -->
    <el-dialog  title="选择店铺类型" :visible.sync="storedialog" width="30%" >
      <el-select v-model="storeType" placeholder="请选择店铺类型">
        <el-option label="阿里" value="1"></el-option>
        <el-option label="京东" value="2" disabled ></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button type='primary'  @click="storedialog = false" size='small' >确定</el-button>
        <el-button @click="storedialog = false" size='small' >取消</el-button>
      </span>
    </el-dialog>
    <!-- 充值/退款弹框 -->
    <el-dialog  title="提醒" :visible.sync="moneydialog" width="30%" >
      <p class='loading-title' >您将进行保证金退还操作，保证金退还后您将不能进行发布任务，请输入支付/退款密码确认！！！</p>
      <el-input type='password' placeholder='请在此处输入密码' v-model='baoPassword' ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type='primary'  @click="tuiBao" size='small' >确定</el-button>
        <el-button @click="moneydialog = false" size='small' >取消</el-button>
      </span>
    </el-dialog>
    <!-- 银行卡弹框 -->
    <el-dialog  title="银行卡绑定" :visible.sync="carddialog" width="30%" >
      <el-form ref="form" :model="form" :rules="rules" label-width="140px">
        <!-- <el-form-item label="选择银行">
          <el-select  placeholder="请选择" class="select" v-model='form.hang' style='width:100%;' >
            <el-option label="招商银行" value="招商银行"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="开户行" prop='bankType'>
          <el-input v-model="form.bankType"></el-input>
        </el-form-item>
        <el-form-item label="支行名称" prop='cardName'>
          <el-input v-model="form.cardName"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号" prop='cardCard'>
          <el-input v-model="form.cardCard"></el-input>
        </el-form-item>
        <!--<el-form-item label="开户人姓名" prop='cardUsername'>-->
          <!--<el-input v-model="form.cardUsername"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="开户人身份证号" prop='cardUsercard'>-->
          <!--<el-input v-model="form.cardUsercard"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="银行卡绑定手机号" prop='cardPhone'>-->
          <!--<el-input v-model="form.cardPhone"></el-input>-->
        <!--</el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type='primary'  @click="card('form')" size='small' >确定</el-button>
        <el-button @click="carddialog = false" size='small' >取消</el-button>
      </span>
    </el-dialog>
    <!-- 支付宝弹框 -->
    <el-dialog  title="支付宝绑定" :visible.sync="zhidialog" width="30%" >
      <el-form ref="zhiForm" :model="zhiForm" :rules="zhirules" label-width="130px">
        <el-form-item label="支付宝账号" prop='card' >
          <el-input v-model="zhiForm.card"></el-input>
        </el-form-item>
        <el-form-item label="支付宝昵称" prop='username'>
          <el-input v-model="zhiForm.username"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type='primary'  @click="zhi('zhiForm')" size='small' >确定</el-button>
        <el-button @click="zhidialog = false" size='small' >取消</el-button>
      </span>
    </el-dialog>
    <!-- 登录密码弹框 -->
    <el-dialog  title="登录密码" :visible.sync="logindialog" width="30%" >
      <el-form ref="form" :model="loginForm" :rules="loginrules" label-width="130px">
        <el-form-item label="账号" prop='account' >
          <el-input type='text' v-model="loginForm.account"></el-input>
        </el-form-item>
        <el-form-item label="原登录密码" prop='old' >
          <el-input type='password' v-model="loginForm.old"></el-input>
        </el-form-item>
        <el-form-item label="修改密码" prop='new' >
          <el-input type='password' v-model="loginForm.new"></el-input>
        </el-form-item>
        <el-form-item label="再次确认密码" prop='que' >
          <el-input type='password' v-model="loginForm.que"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type='primary'  @click="loginChange" size='small' >确定</el-button>
        <el-button @click="logindialog = false" size='small' >取消</el-button>
      </span>
    </el-dialog>
    <!-- 支付密码弹框 -->
    <el-dialog  title="支付密码" :visible.sync="zhifudialog" width="30%" >
      <el-form ref="zhifuForm" :model="zhifuForm" :rules="zhiruless" label-width="130px">
        <el-form-item label="账号" prop='account' >
          <el-input type='text' v-model="zhifuForm.account"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop='login' >
          <el-input type='password' v-model="zhifuForm.login"></el-input>
        </el-form-item>
        <el-form-item label="原支付密码" prop='old' v-if='pay_flag!=null' >
          <el-input type='password' v-model="zhifuForm.old"></el-input>
        </el-form-item>
        <el-form-item label="设置密码" prop='new'>
          <el-input type='password' v-model="zhifuForm.new"></el-input>
        </el-form-item>
        <el-form-item label="再次确认密码" prop='que'>
          <el-input type='password' v-model="zhifuForm.que"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type='primary'  @click="zhifu('zhifuForm')" size='small' >确定</el-button>
        <el-button @click="zhifudialog = false" size='small' >取消</el-button>
      </span>
    </el-dialog>
    <!-- 绑定店铺 -->
    <el-dialog  title="添加店铺" :visible.sync="newstoredialog" width="70%" >
      <newStore v-on:storeMessage="storeMessages"></newStore>
    </el-dialog>
    <div class='mask-masks' v-if='he_status==4'>
     资料审核需要一点时间，请耐心等待，如有问题请联系客服QQ：672232561 或者电话：18049292694
    </div>
  </div>
</template>

<script>
  import newStore from './newStore'
  import {loginChange,payChange} from '../../api/change';
  import {vipMessagess,vipBank,vipZhi,vipStatus,vipZhiChange,returnDeposit} from '../../api/vip';
  import {isvalidPhone} from '../../until/regex';
  var validPhone=(rule, value,callback)=>{
    if (!value){
        callback(new Error('请输入电话号码'))
    }else  if (!isvalidPhone(value)){
      callback(new Error('请输入正确的11位手机号码'))
    }else {
        callback()
    }
  }
    export default {
        name: "vip-message",
        data(){
          return{
            he_status:0,  //审核状态 0未审核 1通过 2未通过 3删除 4审核中
            bigsrc:'',//放大图片的地址
            show:false,  //放大图片的遮造层
            moneydialog:false,
            carddialog:false,
            zhidialog:false,
            logindialog:false,
            zhifudialog:false,
            storedialog:false,
            newstoredialog:false,
            pay_flag:'',
            account:'',
            storeType:'未选择',
            userInfo:'',
            storeForm:'',
            storeName:'',
            pan_card:1,
            pan_zhi:1,
            baoPassword:'',
            active:'active',
            pan_zhi_password:1,
            pan_store:1,
            banner:[],
            main_id:'',
            form:{
              cardName:'',
              cardCard:'',
              cardUsername:'',
              cardUsercard:'',
              cardPhone:'',
              bankType:''
            },
            zhiForm:{
              card:'',
              username:''
            },
            loginForm:{
              account:'',
              old:'',
              new:'',
              que:''
            },
            zhifuForm:{
              account:'',
              login:'',
              old:'pay',
              new:'',
              que:''
            },
            rules:{
              bankType:[{required:true,trigger:'blur',message:'请输入开户行名称'}],
              cardName:[{required:true,trigger:'blur',message:'请输入支行名称'}],
              cardCard:[{required:true,trigger:'blur',message:'请输入银行卡号'}],
              // cardUsername:[{required:true,trigger:'blur',message:'请输入开户人名称'}],
              // cardUsercard:[{required:true,trigger:'blur',message:'请输入开户人身份证号'},{ min: 15, max: 18, message: '请输入15或18位身份证号', trigger: 'blur' }],
              // cardPhone:[{required:true,trigger:'blur',message:'请输入银行卡绑定手机号'}],
            },
            zhirules:{
              card:[{required:true,trigger:'blur',message:'请输入支付宝账号'}],
              username:[{required:true,trigger:'blur',message:'请输入支付宝昵称'}]
            },
            loginrules:{
              account:[{required:true,trigger:'blur',validator: validPhone}],
              old:[{required:true,trigger:'blur',message:'请输入原始登录密码'}],
              new:[{required:true,trigger:'blur',message:'请输入新密码'}],
              que:[{required:true,trigger:'blur',message:'请确认新密码'}]
            },
            zhiruless:{
              account:[{required:true,trigger:'blur',validator: validPhone}],
              login:[{required:true,trigger:'blur',message:'请输入登录密码'}],
              old:[{required:true,trigger:'blur',message:'请输入原始支付密码'}],
              new:[{required:true,trigger:'blur',message:'请输入新密码'}],
              que:[{required:true,trigger:'blur',message:'请确认新密码'}]
            }
          }
        },
        mounted(){
          // let userInfos =JSON.parse(localStorage.getItem('userInfo'))
          // this.pay_flag=userInfos.pay
           vipStatus().then(response => {
              const data = response;
              if(data.status==2){
                   this.$alert('您提交的资料审核失败，请检查您填写的信息是否有误', '审核失败', {
                    confirmButtonText: '确定',
                    callback: action => {}
                  });
              }
              this.he_status=data.status
              this.storeType='阿里'
              this.account=data.username
              this.storeName=data.storeName

              this.form.bankType=data.account.bankType
              this.form.cardName=data.account.subBranchName
              this.form.cardCard=data.account.bankCard
              this.form.cardUsername=data.account.bankName
              this.form.cardUsercard=data.account.idCard
              this.form.cardPhone=data.account.bankPhone
              this.zhiForm.card=data.account.alipayAccount
              this.zhiForm.username=data.account.alipayName
              this.account=data.username
              this.loginForm.account=data.username
              this.zhifuForm.account=data.username
              this.main_id=data.account.id
            }).catch(error => {
              reject(error)
            })
        },
        methods:{
          //查看原图
          bigImg(src){
            this.show=true;
            this.bigsrc=src;
          },
          //隐藏原图
          small(){
            this.show=false;
          },
          //展示图的操作
          bannerUp(response, file, fileList){
            this.banner.push(response.src);
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
            this.$alert('只能上传2张图片', '身份证', {
              confirmButtonText: '确定',
              callback: action => {

              }
            });
          },
          // 店铺信息提交
          storeMessages(storemessages){
            this.newstoredialog=false
            this.pan_store=2
            this.storeForm=storemessages
          },
          // 修改登录密码
          loginChange(){
            loginChange(this.loginForm.account, this.loginForm.old,this.loginForm.new).then(response => {
                const data = response;
                this.logindialog=false
                if(data.msg==1){
                  this.$message.success('密码修改成功');
                  localStorage.removeItem('userInfo',data.user_info);
                  this.$router.push('/login')
                }else if(data.msg==2){
                  this.$message.error('原密码错误');
                }else if(data.msg==4){
                  this.$message.error('新密码长度应在6-20之间');
                }
              }).catch(error => {
                reject(error);
              });          },
          // 设置支付或更改密码
          zhifu(formName){
            this.$refs[formName].validate((valid) =>{
              console.log(formName)
              if(valid){
                if(this.he_status==0||this.he_status==2){
                  this.pan_zhi_password=2;
                  this.zhifudialog=false
                }else{
                  vipZhi(this.zhifuForm.account,this.zhifuForm.login,this.zhifuForm.old,this.zhifuForm.new).then(response => {
                    const data = response;
                    this.zhifudialog=false
                    if(data.msg==1){
                      this.$message.success('支付密码添加或更改成功');

                    }else if(data.msg==2){
                      this.$message.error('登陆密码或支付密码错误；3');
                    }else if(data.msg==3){
                      this.$message.error('支付密码不能为空；');
                    }else if(data.msg==4){
                      this.$message.error('支付密码应6-20之间；');
                    }
                  }).catch(error => {
                    reject(error);
                  });
                }
              }else{
                console.log('error submit!!');
                return false;
              }
            })
           
          },
          // 银行卡绑定
          card(formName){
           this.$refs[formName].validate((valid) => {
              if (valid) {
                if(this.he_status==0||this.he_status==2){
                  this.pan_card=2;
                  this.carddialog=false
                }else{
                  // 请求
                  vipBank(this.form.bankType,this.form.cardName,this.form.cardCard,this.form.cardUsername,this.form.cardUsercard,this.form.cardPhone).then(response => {
                    this.carddialog=false;
                    const data = response;
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
                }
              } else {
                console.log('error submit!!');
                return false;
              }
            }); 
            
          },
          // 支付宝设置
          zhi(formNames){
            this.$refs[formNames].validate((valid) => {
              if (valid) {
                if(this.he_status==0||this.he_status==2){
                  this.pan_zhi=2;
                  this.zhidialog=false
                }else{
                  // 请求
                  vipZhiChange(this.zhiForm.card,this.zhiForm.username).then(response => {
                    const data = response;
                     this.zhidialog=false
                    if(data.msg==1){
                      this.$message.success('更改支付宝信息成功');

                    }else if(data.msg==2){
                      this.$message.error('系统内部发生错误');
                    }else if(data.msg==3){
                      this.$message.error('该用户没有账户信息或有多条信息');
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
          // 退保证金
          tuiBao(){
            if(this.baoPassword==''){
              this.$message.warning('请输入支付密码')
            }else{
              returnDeposit(this.baoPassword).then(response => {
                const data = response;
                this.moneydialog=false
                if(data.msg==1){
                  this.$message.success('提交成功');
                }else if(data.msg==2){
                  this.$message.error('系统内部发生错误');
                }else if(data.msg==4){
                  this.$message.error('支付密码错误');
                }else if(data.msg==3){
                  this.$message.error('保证金为0');
                }
              }).catch(error => {
                reject(error);
              });
            }
          },
          // 提交审核
          submitMessage(){
            var that=this;
             if(this.storeType==''){
                this.$message.error('请选择店铺类型');
             }else if(this.pan_card==1){
                this.$message.error('请添加银行卡');
             }else if(this.pan_zhi==1){
                this.$message.error('请添加支付宝');
             }else if(this.pan_zhi_password==1){
                this.$message.error('请添加支付宝密码');
             }else if(this.pan_store==1){
                this.$message.error('请添加店铺');
             }else{
                vipMessagess(
                  this.storeType,
                  this.storeForm.types,
                  this.storeForm.storeName,
                  this.storeForm.name,
                  this.storeForm.type_value,
                  this.storeForm.tao,
                  this.storeForm.nong,
                  this.storeForm.faName,
                  this.storeForm.phone,
                  this.storeForm.city,
                  this.storeForm.pro,
                  this.storeForm.area,
                  this.storeForm.info,
                  1,
                  this.form.bankType,
                  this.form.cardName,
                  this.form.cardCard,
                  this.form.cardUsername,
                  this.form.cardUsercard,
                  this.form.cardPhone,
                  this.zhiForm.card,
                  this.zhiForm.username,
                  this.banner[0],
                  this.banner[1],
                  this.storeForm.can,
                  this.storeForm.shou,
                  this.zhifuForm.new,
                  this.main_id)
                .then(response => {
                  const data = response;
                  if(data.msg==1){
                    this.$message.success('添加成功')
                    setTimeout(function(){
                      that.$router.go(0)
                    },500)
                  }else if(data.msg==3){
                    this.$message.error('已存在该账号信息')
                  }
                }).catch(error => {
                  reject(error);
                });
             }
          }
        },
        components:{
          newStore
        }
    }
</script>

<style>
  .ji{
    padding-bottom:30px;
    margin-bottom:30px;
    background:#fff;
    border-radius:4px;
  }
  .mask-masks{
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.5);
    color:#fff;
    font-size:30px;
    text-align:center;
    line-height:1000px;
    position:fixed;
    left:0;
    top:0;
    z-index:333;
  }
  .vip-title{
    height:55px;
    padding:0 30px;
    border-bottom:1px solid #e9e9e9;
    font-size:16px;
    color:#000;
    text-align:left;
    line-height:55px;
    margin-bottom:20px;
    font-weight:bold;
  }
  .vip-list{
    padding:0 30px;
    height:57px;
    line-height:56px;
    overflow:hidden;
  }
  .vip-list .vip-label{
    width:10%;
    display:inline-block;
    text-align:left;
    color:rgba(0,0,0,0.45);
    float:left;
  }
  .vip-list .vip-answer{
    width:90%;
    text-align:left;
    color:rgba(0,0,0,1);
    border-bottom:1px solid #E9E9E9;
    float:left;
  }
  .vip-xiu{
    float:right;
    color: #1890FF;
    cursor:pointer;
  }
  .shen-btn{
    float:right;
    margin-top:16px;
  }
  .steps{
    overflow:hidden;
    float:right;
    margin-right:6%;
    width:60%;
    height:16px;
    margin-top:20px;
    display:flex;
  }
  .steps-list{
    flex-grow:1
  }
  .steps-list.active .step-num{
    color:#1890FF;
    border:1px solid #1890FF;
  }
  .steps-list.active .step-line{
    background:#1890FF;
  }
  .steps-list.active .step-text{
    color:#1890FF;
  }
  .step-num{
    width:16px;
    height:16px;
    border-radius:50%;
    text-align:center;
    line-height:16px;
    color:rgba(0,0,0,0.45);
    border:1px solid rgba(0,0,0,0.45);
    float:left;
    margin-right:3px;
    font-size:12px;
  }
  .step-text{
    font-size:12px;
    color:rgba(0,0,0,0.45);
    float:left;
    margin-right:3px;
    line-height:16px;
  }
  .step-line{
    width:71%;
    height:1px;
    background:rgba(0,0,0,0.45);
    float:left;
    margin-top:8px;
     margin-right:3px;
  }
  .ren-box{
    padding:0 30px;
  }
  .ren-title{
    height:40px;
    line-height:40px;
    color:rgba(0,0,0,0.45);
    text-align:left;
    font-size:16px;
  }
  .upBox{
    overflow:hidden;
  }
  .up-img{
    width:148px;
    height:148px;
    float:left;
    border-radius:4px;
    margin-right:30px;
    position: relative;
    overflow:hidden;
  }
  .up-imgs{
    width:100%;
    height:100%;
  }
  .upmask-img{
    width:100%;
    text-align: center;
    line-height:148px;
    color:#fff;
    font-size:16px;
    background:rgba(0,0,0,0.5);
    position: absolute;
    left:0;
    top:0;
    cursor:pointer;
  }
  .up_load{
    float:left;
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
  .loading-title{
    text-align: left;
    margin-bottom:20px;
    color:#1890FF;
  }
</style>
