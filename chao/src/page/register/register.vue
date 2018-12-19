<template>
	<div  class="login-box">
		<div class="bg-img"></div>
		<el-row class="contain row-bg" type="flex"  justify="center">
	      <el-col :span='18'>
	      	<el-row class='loginBox'>
	      		<el-col :span='12'>
	      			<div class='login-bg'></div>
	      		</el-col>
	      		<el-col :span='12' class='col' >
	      			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="form"  >
						<el-form-item prop="username" >
							<el-input type="tel" placeholder="手机名" v-model='ruleForm.username' prefix-icon="el-icon-mobile-phone" ></el-input>

						</el-form-item>
						<el-form-item prop="yan" >
							<el-input  type="yan" placeholder="验证码" v-model='ruleForm.yan'  prefix-icon="el-icon-message"  class='inps' ></el-input>
							<span class='yans' @click="getyan">获取验证码</span>
						</el-form-item>
						<el-form-item prop="loginPassword" >
							<el-input  type="password" placeholder="设置密码(至少6位)" v-model='ruleForm.loginPassword' prefix-icon="el-icon-view" ></el-input>
						</el-form-item>
						<el-form-item prop="checkPass" >
							<el-input  type="password" placeholder="再次确认密码" v-model='ruleForm.checkPass' prefix-icon="el-icon-view" ></el-input>
						</el-form-item>
						<el-form-item >
							<el-checkbox v-model="ruleForm.checked">自动登录</el-checkbox>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submitForm('ruleForm')" class="submit_btn" round>注册</el-button>
						</el-form-item>
						<el-form-item>
							<p class='forget'><router-link to='/login' >登录账户</router-link></p>
						</el-form-item>
					</el-form>
	      		</el-col>
	      	</el-row>
	      </el-col>
	    </el-row>
	</div>
</template>
<script>
	import {isvalidPhone} from '../../until/regex';
	import { Message } from 'element-ui';
	import axios from 'axios'
	var qs = require('qs');
	export default{
		data(){
			var validPhone=(rule, value,callback)=>{
		      if (!value){
		          callback(new Error('请输入电话号码'))
		      }else  if (!isvalidPhone(value)){
		        callback(new Error('请输入正确的11位手机号码'))
		      }else {
		          callback()
		      }
		  	}
		  	 var validatePass2 = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请再次输入密码'));
		        } else if (value !== this.ruleForm.loginPassword) {
		          callback(new Error('两次输入密码不一致!'));
		        } else {
		          callback();
		        }
		      };
		     var validatePass = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请输入密码'));
		        } else {
		          if (this.ruleForm.checkPass !== '') {
		            this.$refs.ruleForm.validateField('checkPass');
		          }
		          callback();
		        }
		      };
			return{
				ruleForm:{
					username:'',
					loginPassword:'',
					checkPass:'',
					yan:'',
					checked:false
				},
				rules:{
					username:[{required:true,trigger:'blur',validator: validPhone}],
					yan:[{required:true,message:'请输入验证码',trigger:'blur'}],
					loginPassword:[{ required:true,trigger:'blur',validator: validatePass }],
					checkPass: [{ required:true,trigger:'blur',validator: validatePass2 }],
				}
			}
		},
		methods:{
			// 获取验证码
			getyan(){
		 		this.$message({
		          message: '已发送',
		          center: true
		        });
			},
			// 立即注册
			submitForm(form){
				 this.$refs[form].validate((valid) => {
		          if (valid) {
		          	axios.post("http://192.168.0.2:8080/sd-web/register_mer/ins_mer",qs.stringify({account:this.ruleForm.username,password:this.ruleForm.loginPassword,phone:this.ruleForm.username,pay:this.ruleForm.yan}))
			        .then(res => {
			        	console.log(res)
			         if(res.data.msg=='1'){
			         	this.$router.push('login')	
			         }else if(res.data.msg=='2'){
			         	this.$message.error('该手机号已被注册');
			         	this.$refs[form].resetFields();
			         }
			        }).catch(err=>{
			          console.log(err)
			        })
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
			}
		}
	}
</script>

<style>
.login-box{
	width:100%;
	height:100%;
	background:linear-gradient(-135deg,rgba(53,195,255,1),rgba(24,144,255,1));
	position:relative;
	display:flex;
	flex-direction:column;
	justify-content:center;
	position:relative;
}
.bg-img{
	width:100%;
	height:100%;
	position:absolute;
	left:0;
	top:0;
	background:url('../../assets/bg.png') no-repeat left top;
}
.loginBox{
	background:#fff;
	padding:60px;
}
.loginBox .inps{
	width:68%;
}
.yans{
	width:100px;
	height:36px;
	text-align:center;
	line-height:36px;
	color:#FFBF00;
	float:right;
	border:1px solid #FFBF00;
	border-radius:20px;
	display:inline-block;
	cursor:pointer;
}
.login-bg{
	width:410px;
	height:410px;
	background:url('../../assets/login.png') no-repeat left top;
}
.login-title{
	font-size:16px;
	color:#2b2b2b;
	margin-bottom:30px;
}
.loginBox .el-input__inner{
	border-left:none;
	border-top:none;
	border-right:none;
	border-radius: 0;
}
.loginBox .el-form-item__content{
	text-align:left;
}
.form{
	width:376px;
	background:#fff;
	margin:0 auto;
	padding:30px;
	border-radius:4px;
	font-size:14px;
}
.submit_btn{
	width:100%;
}
.loginBox  .el-button--primary{
	background:linear-gradient(-135deg,rgba(53,195,255,1),rgba(24,144,255,1));
	border:none;
	box-shadow:0px 5px 10px 0px rgba(33,160,255,0.25);
}
.forget{
	display:inline-block;
	float:right;
	font-size:14px;
}
.forget a{
	color:#1890FF;
}
</style>
