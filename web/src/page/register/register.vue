<template>
	<div class='register'>
		<img src="../../assets/bg.png" alt="" class='shua-bg' >
		<div class='shuaBox'>
			<div class='shuaTitle'>注册账号</div>
			<div class='loginList' v-if='tui_id'>
				<img src="../../assets/login-icon1.png" alt="" class='login-icon' >
				<input type="text" disabled="true" v-model='tui_ids'  class='login-inp' >
			</div>
			<div class='loginList'>
				<img src="../../assets/login-icon2.png" alt="" class='login-icon' >
				<input type="number" v-model='form.phone' placeholder="手机号" class='login-inp' >
				<p class='yan-btn' @click='getKey' v-if='times' >获取验证码</p>
				<p class='seconds' v-else>{{second}}s</p>
			</div>
			<div class='loginList'>
				<img src="../../assets/login-icon3.png" alt="" class='login-icon' >
				<input type="number" v-model='form.key' placeholder="验证码" class='login-inp' >
			</div>
			<div class='loginList'>
				<img src="../../assets/login-icon3.png" alt="" class='login-icon' >
				<input type="password" v-model='form.password' placeholder="登录密码" class='login-inp' >
			</div>
			<div class='login-tips'>
				<input type="checkbox" v-model='form.user_know' class='login-check' >
				<span @click='xu'>
					用户须知
				</span>
			</div>
			<p class='style-btn login-btn' @click='register' >注册 →</p>
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
	.seconds{
		color:#a0a0a0;
		line-height:120px;
		font-size:30px;/*px*/
	}
</style>

<script>
	import {register,register_key,register_rules,check_login} from '../../api/login'
	export default{
		data(){
			return{
				form:{
					phone:'',
					key:'',
					password:'',
					user_know:''
				},
				second:60,
				tui_ids:'',
				times:true,
				tui_id:false
			}
		},
		mounted(){
			check_login().then(response=>{
				var data=response
				if(data.info==1){
					this.$router.push('/homes')
				}
			}).catch(error=>{})
			this.tui_ids='推荐人ID：'+this.$route.query.codes
			register_rules().then(response=>{
				var data=response
				if(data.info.on_off==1){
					this.tui_id=true
				}else if(data.info.on_off==2){
					this.tui_id=false
				}
			}).catch(error=>{
			})
		},
		methods:{
			register(){
				var that=this;
				if(this.form.phone==''){
					this.$toast('请填写手机号');
				}else if(this.form.key==''){
					this.$toast('请填写验证码');
				}else if(this.form.password==''){
					this.$toast('请填写登录密码');
				}else if(this.form.user_know==''){
					this.$toast('请阅读用户须知');
				}else{
					register(this.form.key,this.$route.query.codes,this.form.phone,this.form.password)
					.then(response =>{
						var data=response
						if(data.data==1){
							this.$toast('验证码有误')
						}else if(data.data==2){
							this.$toast('推荐码有误')
						}else if(data.data==3){
							this.$toast('注册成功')
							setTimeout(function(){
								that.$router.push('/login')
							},500)
						}else if(data.data==4){
							this.$toast('注册失败')
						}else if(data.data==5){
							this.$toast('验证码已过期')
						}else if(data.data==6){
							this.$toast('手机号已被注册')
						}else if(data.data==7){
							this.$toast('必须有推荐码')
						}
					})
					.catch(error=>{

					})
				}
			},
			getKey(){
				if(this.second==60){
					var that=this;
					if(this.form.phone==''){
						this.$toast('请填写手机号')
					}else{
						this.times=false
						var timer=setInterval(function(){
							that.second=that.second-1
							if(that.second==0){
								that.times=true
								that.second=60
								clearInterval(timer)
							}
						},1000)
						if(that.second==0){
							clearInterval(timer)
						}
						console.log(this.$route.query.codes);
						register_key(1,this.form.phone,this.$route.query.codes).then(response=>{
							var data=response
							if(data.data==2){
								this.$toast('该手机号已被注册')
							}else if(data.data==1){
                this.$toast('获取短信失败')
							}else if(data.data==3){
                this.$toast('该推荐码已无法使用')
              }else{
								this.$toast('手机号有误')
							}
						}).catch(error=>{
						})
					}
				}
			},
			//用户须知
			xu(){
				this.$router.push({
					name:'规则协议',
					params:{
						types:2,
					}
				})
			}
		}
	}
</script>
