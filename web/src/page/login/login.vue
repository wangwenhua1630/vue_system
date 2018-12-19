<template>
	<div class='register'>
		<img src="../../assets/bg.png" alt="" class='shua-bg' >
		<div class='shuaBox'>
			<div class='shuaTitle'>用户登录</div>
			<div class='loginList'>
				<img src="../../assets/login-icon2.png" alt="" class='login-icon' >
				<input type="number" v-model='form.admin' placeholder="用户账号" class='login-inp' >
			</div>
			<div class='loginList'>
				<img src="../../assets/login-icon3.png" alt="" class='login-icon' >
				<input type="password" v-model='form.password' placeholder="密码" class='login-inp' >
			</div>
			<div class='forget' @click='forget'>忘记密码</div>
			<div class='login-register'>还没有账号？<span class='login-register-style' @click='register' >立即注册</span></div>
			<p class='style-btn login-btn' @click='login' >登录 →</p>
		</div>
	</div>
</template>

<style>
	.register{
		background:#fff;
		width:100%;
		height:100%;
	}
	.shua-bg{
		width:100%;
		height:366px;
		position:fixed;
		top:0;
		left:0;
	}
	.shuaBox{
		padding:40px 80px;
		background:#fff;
		height:902px;
		width:710px;
		border-radius:6px;
		box-shadow:0px 13px 25px 0px rgba(137,96,78,0.15);
		position:absolute;
		left:0;
		right:0;
		margin:0 auto;
		top:220px;
	}
	.shuaTitle{
		font-size:48px;
		color:#FD950A;
		margin-bottom:80px;
	}
	.loginList{
		border-bottom:1px solid #ddd;
		display:flex;
		height:120px;
		padding-top:30px;
		position:relative;
	}
	.login-icon{
		width:30px;
		height:30px;
		margin-right:10px;
		margin-top:30px;
	}
	.login-inp{
		display:block;
		width:90%;
		height:100%;
		border:none;
		outline:none;
		font-size:30px;
		color:rgba(0,0,0,0.45);
		background:none;
		line-height:90px;
	}
	.yan-btn{
		width:189px;
		height:60px;
		border-radius:30px;
		border:2px solid rgba(253,149,10,1);
		text-align:center;
		line-height:60px;
		color:#FD950A;
		font-size:26px;
		position:absolute;
		right:0;
		top:50px;
	}
	.login-tips{
		display:flex;
		color:#1890FF;
		font-size:26px;
		margin-top:30px;
		justify-content:center;
		margin-bottom:60px;
	}
	.login-check{
		width:30px;
		height:30px;
		display:block;
		border-color:#1890FF;
		background:none;
		margin-right:10px;
	}
	.login-btn{
		width:350px;
		height:66px;
		color:#fff;
		line-height:66px;
		margin:0 auto;
	}
	.forget{
		text-align:right;
		font-size:26px;
		color:#1890FF;
		line-height:60px;
	}
	.login-register{
		font-size:26px;
		color:rgba(0,0,0,0.45);
		text-align:center;
		margin:50px;
	}
	.login-register-style{
		color:#FD950A;
	}
</style>

<script>
	import {login,check_login} from '../../api/login'
	export default{
		name:'login',
		data(){
			return{
				form:{
					admin:'',
					password:''
				},
			}
		},
		mounted(){
			check_login().then(response=>{
				var data=response
				if(data.info==1){
					this.$router.push('/homes')
				}
			}).catch(error=>{})
		},
		methods:{

			login(){
				if(this.form.admin==''){
					this.$toast('请填写账号')
				}else if(this.form.password==''){
					this.$toast('请填写密码')
				}else{
					login(this.form.admin,this.form.password).then(response=>{
						var data=response
						if(data.data==1){
							this.$toast('账号或密码有误')
						}else if(data.data==2){
							this.$router.push('/homes')
						}else if(data.data==3){
							this.$toast('您的账号已被冻结')
						}
					}).catch(error=>{})
				}
			},

			register(){
				this.$router.push('/register')
			},
			forget(){
				this.$router.push('/forget')
			}
		}
	}
</script>