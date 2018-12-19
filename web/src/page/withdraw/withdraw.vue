<template>
	<div class='withdraw'>
		<div class='withdraw-money'>
			<div class='withdraw-top'>
				<p class='withdraw-card'>到银行卡</p>
				<img src="../../assets/bank.png" alt="" class='withdraw-img' >
				<p class='withdraw-card-num'>招商银行（{{info.bank_card}}）</p>
			</div>
			<div class='inp-money'>
				<span class='money-fu'>￥</span>
				<mt-field  placeholder="输入提现金额" type="number" v-model="number"></mt-field>
			</div>
			<div class='withdraw-ti-money'>可提现金额：￥{{info.moneys_balance}}</div>
		</div>
		<div class='inp-moneys'>
			<span class='money-fu'>提现密码</span>
			<mt-field placeholder="输入提现密码>" type="password" v-model="password"></mt-field>
		</div>
		<div class='complain-submit style-btn ' @click='submit' >提交</div>
	</div>
</template>

<style>
	.withdraw-money{
		padding:0 20px;
		background:#fff;
		margin-bottom:20px;
		padding-top:50px;
	}
	.withdraw-top{
		display:flex;
		margin-bottom:20px;
	}s
	.withdraw-card{
		font-size:30px;
		color:#2c2c2c;
		margin-right:20px;
		line-height:50px;
	}
	.withdraw-img{
		width:50px;
		height:50px;
		border-radius:50%;
		margin-right:20px;
	}
	.withdraw-card-num{
		font-size:30px;
		color:#2C2C2C;
		line-height:50px;
	}
	.inp-money{
		border-bottom:1px solid #ddd;
		display:flex;
	}
	.inp-moneys{
		background:#fff;
		height:120px;
		display:flex;
		padding:0 20px;
	}
	.inp-moneys .money-fu{
		line-height:120px;
		font-size:36px;
		color:#2c2c2c;
		font-weight:0;
	}
	.inp-moneys .mint-field-core{
		text-align:right;
		font-size:26px;
	}
	.money-fu{
		font-size:72px;
		font-weight:bold;
	}
	.mint-field{
		width:78%;
	}
	.mint-field-core{
		font-size:48px;
		color:#a0a0a0;
	}
	.withdraw-ti-money{
		height:86px;
		line-height:86px;
		font-size:26px;
		color:#A0A0A0;
	}
	.withdraw .complain-submit{
		width:660px;
		height:80px;
		line-height:80px;
		margin:0 auto;
		font-size:36px;
		margin-top:600px;
	}
</style>

<script>
	import {out_balance_info,out_balance_moneys} from '../../api/api'
	export default{
		data(){
			return{
				number:'',
				password:'',
				info:''
			}
		},
		mounted(){
			this.$indicator.open('加载中...');
			out_balance_info().then(response=>{
				this.$indicator.close();
				var data=response
				this.info=data.info
			}).catch(error=>{

			})
		},
		methods:{
			submit(){
				var that=this;
				if(this.number=='0'||this.number==undefined){
					this.$toast('请输入正确提现金额')
				}else if(this.password==''){
					this.$toast('请输入提现密码')
				}else  if(this.number>this.info.moneys_balance){
					this.$toast('请输入正确提现金额')
				}else{
					out_balance_moneys(this.password,this.number).then(response=>{
						var data=response
						if(data.info==2){
							this.$toast('提现金额不符')
						}else if(data.info==1){
							this.$toast('提现密码错误')
						}else if(data.info==3){
							this.$toast('提交成功,等待审核')
							setTimeout(function(){
								that.$router.push('/moneyGuan')
							},500)
						}else if(data.info==5){
							this.$toast('您存在尚未处理的提现申请')
						}else{
							this.$toast('提交失败,重新提交')
						}
					}).catch(error=>{

					})
				}
			}
		}
	}
</script>