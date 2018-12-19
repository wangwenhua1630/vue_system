<template>
	<div class='moneyBind'>
		<div class='mainMessage-box'>
			<div class='mainMessage-title'>
				<img src="../../assets/zhi.png" alt="" class='zhi-icon' >
			</div>
			<div class='study-list'>
				<p class='study-label'>支付宝昵称</p>
				<p class='study-message'><input type="text" v-model='zhiform.username' placeholder="请输入您的支付宝昵称 " class='mainMessage-inp' ><img src="../../assets/icon_in.png" alt="" class='study-icon'></p>
			</div>	
			<div class='study-list'>
				<p class='study-label'>支付宝账号</p>
				<p class='study-message'><input type="text" v-model='zhiform.account' placeholder="请输入您的支付宝账号 " class='mainMessage-inp' ><img src="../../assets/icon_in.png" alt="" class='study-icon'></p>
			</div>	
			<div class='study-list'>
				<p class='study-label'>手机号</p>
				<p class='study-message'><input type="text" v-model='zhiform.phone' placeholder="请输入您的支付宝绑定的手机号 " class='mainMessage-inp' ><img src="../../assets/icon_in.png" alt="" class='study-icon'></p>
			</div>	
		</div>
		<div class='mainMessage-box'>
			<div class='mainMessage-title'><img src="../../assets/bank.png" alt="" class='zhi-icon' ></div>
			<div class='study-list'>
				<p class='study-label'>开户人</p>
				<p class='study-message'><input type="text" v-model='form.username' placeholder="请输入开户人的姓名 " class='mainMessage-inp'><img src="../../assets/icon_in.png" alt="" class='study-icon'></p>
			</div>	
			<div class='study-list'>
				<p class='study-label'>银行卡号</p>
				<p class='study-message'><input type="text" v-model='form.card' placeholder="请输入银行卡号 " class='mainMessage-inp' ><img src="../../assets/icon_in.png" alt="" class='study-icon'></p>
			</div>	
			<div class='study-list'>
				<p class='study-label'>手机号</p>
				<p class='study-message'><input type="text" v-model='form.phone' placeholder="请输入开户时预留的手机号 " class='mainMessage-inp' ><img src="../../assets/icon_in.png" alt="" class='study-icon'></p>
			</div>	
			<div class='study-list' @click='choose'>
				<p class='study-label'>开户行</p>
				<p class='study-message study-messages' >
					<span>{{form.bank_of_name}}</span>
				<img src="../../assets/icon_in.png" alt="" class='study-icon'></p>
			</div>	
			<div class='study-list'>
				<p class='study-label'>开户所在支行</p>
				<p class='study-message'><input type="text" v-model='form.bank' placeholder="请输入开户所在支行名称 " class='mainMessage-inp' ><img src="../../assets/icon_in.png" alt="" class='study-icon'></p>
			</div>	
		</div>
		<p class='tips-title'>提示：支付宝与开户行信息必须真实有效，否则无法收到货款本金</p>
		<p class='moneyBind-btn style-btn' @click='submit'>下一步</p>
		<mt-popup v-model="flag" position="bottom">
			<div class='caozuo'>
				<p class='cancel' @click='cancel' >取消</p>
				<p class='confirm' @click='confirm'>确定</p>
			</div>
		    <mt-picker :slots="slots" @change="onsexChanges"></mt-picker>
		</mt-popup>
	</div>
</template>

<style>
	.mainMessage-box{
		background:#fff;
		margin-bottom:30px;
		padding:0 20px;
		padding-top:20px;
	}
	.moneyBind .mainMessage-title{
		margin-bottom:0;
	}
	.zhi-icon{
		width:50px;
		height:50px;
	}
	.moneyBind .study-list{
		display:flex;
		height:120px;
		border-bottom:1px solid #ddd;
		justify-content:space-between;
	}
	.moneyBind .study-list:nth-last-child(1){
		border:none;
	}
	.moneyBind .study-label{
		width:50%;
		overflow:hidden;
		white-space:nowrap;
		text-overflow:ellipsis;
		line-height:120px;
		color:#2c2c2c;
		font-size:36px;/*px*/
	}
	.moneyBind .study-message{
		line-height:120px;
		font-size:26px;/*px*/
		color:#a0a0a0;
		position:relative;
		padding-right:20px;
	}
	.moneyBind .study-icon{
		width:13px;
		height:24px;
		position:absolute;
		right:0;
		top:48px;
	}
	.mainMessage-inp{
		display:block;
		width:100%;
		height:100%;
		text-align:right;
		font-size:26px;
		color:#A0A0A0;
		border:none;
		outline:none;
	}
	.moneyBind-btn{
		width:660px;
		height:80px;
		text-align:center;
		line-height:80px;
		color:#fff;
		font-size:36px;
		margin:0 auto;
		margin-top:80px;
	}
	.tips-title{
		width:100%;
		text-align:center;
		color:#f00;
		color:26px;/*px*/
	}
	.study-messages{
		text-align:right;
		font-size:20px;
		color:#A0A0A0;
		line-height:80px;
	}
</style>

<script>
	import {user_pay,card_save} from '../../api/api'
	import { Picker } from 'mint-ui';
	export default{
		data(){
			return{
				zhiform:{
					username:'',
					account:'',
					phone:''
				},
				form:{
					username:'',
					card:'',
					phone:'',
					bank:'',
					bank_of_name:'选择',
					bank_of_names:''
				},
				flag:false,
				value:'',
				slots:[{
		          flex: 1,
		          values: [],
		          className: 'slot1',
		          textAlign: 'right'
		        }]
			}
		},
		components: {
	      'mt-picker': Picker
	    },
		mounted(){
			var that=this;
			user_pay().then(response=>{
				var data=response
				for(var i=0;i<data.bank_info.length;i++){
					this.slots[0].values.push(data.bank_info[i].name)
				}
				this.form.card=data.info.bank_card
				this.form.username=data.info.bank_name
				this.form.phone=data.info.bank_phone
				this.form.bank=data.info.bank_area
				this.form.bank_of_name=data.info.bank_of_name
				this.zhiform.username=data.info.pay_name
				this.zhiform.account=data.info.pay_nums	
				this.zhiform.phone=data.info.pay_phone
			}).catch(error=>{

			})
		},
		methods:{
			choose(){
				this.flag=true
			},
			// 选择开户行
			onsexChanges(e){
				this.value=e.values[0]
			},
			cancel(){
				this.flag=false
			},
			confirm(){
				this.flag=false
				this.form.bank_of_name=this.value
			},
			submit(){
				if(this.form.username==''){
					this.$toast('请填写开户人姓名')
				}else if(this.form.card==''){
					this.$toast('请填写银行卡号')
				}else if(this.form.phone==''){
					this.$toast('请填写预留手机号')
				}else if(this.form.bank_of_name=='选择'){
					this.$toast('请填写开户行名称')
				}else if(this.form.bank==''){
					this.$toast('请填写开户所在支行名称')
				}else if(this.zhiform.username==''){
					this.$toast('请填写您的支付宝昵称')
				}else if(this.zhiform.account==''){
					this.$toast('请填写支付宝账号')
				}else if(this.zhiform.phone==''){
					this.$toast('请填写支付宝绑定的手机号')
				}else{
					card_save(this.form.card,this.form.username,this.form.phone,this.form.bank,this.zhiform.username,this.zhiform.account,
						this.zhiform.phone,this.form.bank_of_name).then(response=>{
						var data=response
						if(data.info==1){
							this.$router.push('/prove')
						}
					}).catch(error=>{

					})
				}
				
			}
		}
	}
</script>