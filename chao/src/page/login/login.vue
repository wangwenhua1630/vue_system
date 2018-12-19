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
						<el-form-item prop="password" >
							<el-input  type="password" placeholder="登陆密码" v-model='ruleForm.password' prefix-icon="el-icon-view" ></el-input>
						</el-form-item>
						<el-form-item  >
							<el-checkbox v-model="ruleForm.checked">记住密码</el-checkbox>
							<p class='forget'><router-link to='/register' >忘记密码?</router-link></p>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submitForm('ruleForm')" class="submit_btn" round>登录</el-button>
						</el-form-item>
						<el-form-item>
							<p class='forget'><router-link to='/register' >注册账户</router-link></p>
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
	import {login} from '../../api/login';
	 var validPhone=(rule, value,callback)=>{
      if (!value){
          callback(new Error('请输入电话号码'))
      }else  if (!isvalidPhone(value)){
        callback(new Error('请输入正确的11位手机号码'))
      }else {
          callback()
      }
  	}
	export default{
		data(){
			return{
				ruleForm:{
					username:'',
					password:'',
					name:'',
					checked:false
				},
				rules:{
					username:[{required:true,trigger:'blur',validator: validPhone}],
					password:[{required:true,message:'请输入密码',trigger:'blur'}],
				}
			}
		},
		beforeMount(){
	    },
		methods:{
			submitForm(form){
				 var that=this;
				 this.$refs[form].validate((valid) => {
		          if (valid) {
		          	login(this.ruleForm.username,this.ruleForm.password).then(response=>{
		          		var data=response
		          		if(data.msg=='1'){
		          			this.$message.success('登录成功')
		          			setTimeout(function(){
		          				that.$router.push('/homes')
		          			},500)
		          		}else if(data.msg=='3'){
		          			this.$message.success('登录失败')
		          		}else if(data.msg==4){
		          			this.$router.push('/homes')
		          		}
		          	}).catch(error=>{

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
