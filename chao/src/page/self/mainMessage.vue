<template>
  <div>
    <div class='ji'>
      <div class='vip-title' >
        基本资料
      </div>
      <ul>
        <li class='vip-list' >
          <span class='vip-label'>平台账号</span>
          <p class='vip-answer'>{{info.username}}</p>
        </li>
        <li class='vip-list' >
          <span class='vip-label'>平台角色</span>
          <p class='vip-answer' >{{info.role.roleName}}</p>
        </li>
        <li class='vip-list' >
          <span class='vip-label'>操作范围</span>
          <p class='vip-answer' >{{info.role.remark}}</p>
        </li>
        <li class='vip-list' >
          <span class='vip-label'>登录密码</span>
          <p class='vip-answer'>已设置 <span class='vip-xiu' @click="logindialog= true">修改</span> </p>
        </li>
        <li class='vip-list' >
          <span class='vip-label'>操作密码</span>
          <p class='vip-answer'>
            <span>已设置</span>
            <span class='vip-xiu' @click="zhifudialog= true">修改</span>
          </p>
        </li>
      </ul>
    </div>
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
    <el-dialog  title="操作密码" :visible.sync="zhifudialog" width="30%" >
      <el-form ref="form" :model="zhifuForm" :rules="zhirules" label-width="130px">
        <el-form-item label="账号" prop='account' >
          <el-input type='text' v-model="zhifuForm.account"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop='login' >
          <el-input type='password' v-model="zhifuForm.login"></el-input>
        </el-form-item>
        <el-form-item label="原操作密码" prop='old' >
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
        <el-button type='primary'  @click="zhifu" size='small' >确定</el-button>
        <el-button @click="zhifudialog = false" size='small' >取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {isvalidPhone} from '../../until/regex';
  import {loginPassword,caoPassword,mainInfo} from '../../api/api'
  import {logOut} from '../../api/login'
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
          logindialog:false,
          zhifudialog:false,
          info:'',
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
          loginrules:{
            account:[{required:true,trigger:'blur',validator: validPhone}],
            old:[{required:true,trigger:'blur',message:'请输入原始登录密码'}],
            new:[{required:true,trigger:'blur',message:'请输入新密码'}],
            que:[{required:true,trigger:'blur',message:'请确认新密码'}]
          },
          zhirules:{
            account:[{required:true,trigger:'blur',validator: validPhone}],
            login:[{required:true,trigger:'blur',message:'请输入登录密码'}],
            old:[{required:true,trigger:'blur',message:'请输入原始支付密码'}],
            new:[{required:true,trigger:'blur',message:'请输入新密码'}],
            que:[{required:true,trigger:'blur',message:'请确认新密码'}]
          }
        }
      },
      mounted(){
        mainInfo().then(response=>{
          var data=response
          this.info=data.user
        }).catch(error=>{

        })
      },
      methods:{
        // 修改登录密码
        loginChange(){
          var that=this;
          loginPassword(this.loginForm.account,this.loginForm.old,this.loginForm.new).then(response=>{
            var data=response
            this.logindialog = false
            if(data.msg==1){
              this.$message.success('修改成功')
              logOut().then(response=>{}).catch(error=>{})
              setTimeout(function(){
                that.$router.push('/login')
              },500)
            }else if(data.msg==3){
              this.$message.error('原密码错误')
            }else if(data.msg==4){
              this.$message.error('该账户不是当前账号')
            }
          }).catch(error=>{

          })
        },
        // 设置支付或更改密码
        zhifu(){
            var that=this;
            caoPassword(this.zhifuForm.account,this.zhifuForm.login,this.zhifuForm.old,this.zhifuForm.new).then(response=>{
              var data=response
              this.zhifudialog=false
              if(data.msg==1){
                this.$message.success('修改成功')
                logOut().then(response=>{}).catch(error=>{})
                setTimeout(function(){
                  that.$router.push('/login')
                },500)
              }else if(data.msg==3){
                this.$message.error('账号错误')
              }else if(data.msg==4){
                this.$message.error('登录密码错误')
              }else if(data.msg==5){
                this.$message.error('原操作密码错误')
              }else if(data.msg==6){
                this.$message.error('操作密码错误不能小于6，且不能大于22')
              }
            }).catch(error=>{

            })
        }
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
