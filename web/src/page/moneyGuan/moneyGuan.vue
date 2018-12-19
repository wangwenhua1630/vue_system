<template>
	<div class='moneyGuan' >
		<div class='money-top'>
			<div class='money-day'>
				<img src="../../assets/money-bg.png" alt="" class='money-bg' >
				<p class='tiao' @click='tiXian'></p>
				<p class='money-day-num'>
					￥{{info.moneys_balance}}
				</p>
			</div>
			<p class='taskInfo-message-title style-color' style='padding:0 15px;'>提示：完成任务后，您的佣金会暂时冻结，冻结周期请查看基础教学里的冻结规则，时间过后自动解冻，则可以申请提现啦。</p>
			<div class='money-type'>
				<div class='money-type-list'>
					<p class='money-list-money'>￥{{info.moneys_task}}</p>
					<p class='money-list-test'>刷单佣金</p>
				</div>
				<p class='border'></p>
				<div class='money-type-list'>
					<p class='money-list-money'>￥{{info.moneys_tui}}</p>
					<p class='money-list-test'>推荐佣金</p>
				</div>
				<p class='border'></p>
				<div class='money-type-list'>
					<p class='money-list-money style-color'>￥{{info.moneys_cold}}</p>
					<p class='money-list-test'>冻结佣金</p>
				</div>
			</div>
			
		</div>
		<div class='moneyGuan-list-box'>
			<div class='moneyGuan-list'>
				<p class='moneyGuan-list-label'>支付宝账号</p>
				<p class='moneyGuan-list-value'>{{info.pay_nums}}</p>
			</div>
			<div class='moneyGuan-list'>
				<p class='moneyGuan-list-label'>银行卡号</p>
				<p class='moneyGuan-list-value'>{{info.bank_card}}</p>
			</div>
			<div class='moneyGuan-list' >
				<p class='moneyGuan-list-label' v-if='info.hand_bao_moneys!=1'><span class='moneyGuan-border'></span>担保金￥{{info.hand_bao_moneys}}</p>
				<p class='moneyGuan-list-label' v-else><span class='moneyGuan-border'></span>保证金不足</p>
				<p class='moneyGuan-list-value style-color ' v-if='info.hand_bao_moneys!=1' @click='tuiMoneys'>退还保证金></p>
			</div>
		</div>
		<div class='moneyGuan-remember'  v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" infinite-scroll-distance='10' infinite-scroll-immediate-check="false">
			<div class='moneyGuan-nav'>
				<p class='moneyGuan-nav-list'  v-bind:class="[tabIndex==1?active:'']" @click='tabNav(1)' >获取记录</p>
				<p class='moneyGuan-nav-list'  v-bind:class="[tabIndex==2?active:'']" @click='tabNav(2)'>提现记录</p>
			</div>
			<div class='moneyGuan-remember-list' v-for='item in list' :key='item.id' v-if='list!=1'>
				<div class='moneyGuan-remember-fl'>
					<p class='moneyGuan-remember-name'>{{item.type_name}}</p>
					<p class='moneyGuan-remember-time'>{{item.create_at}}</p>
				</div>
				<div class='moneyGuan-remember-rt style-color' v-if='tabIndex==1'>+{{item.moneys}}</div>
				<div class='moneyGuan-remember-rt style-color' v-if='tabIndex==2'>-{{item.moneys}}</div>
			</div>
			<div class='empty' v-else>
				<img src="../../assets/empty.png" alt="" class='empty-icon' >
			</div>
		</div>
		<!-- 保证金弹框 -->
		<div class='danMask' v-if='tanKuan'>
			<div class='danKuan'>
				<p class='task-hand-close' @click='tanKuan=false'>&times</p>
				<p class='danLabels'>退了保证金后，将不能进行任何操作，请确认您账户的余额是否已提现!!!</p>
				<p class='danLabel'>请输入操作密码</p>
				<input type="password" class='kuanInp' v-model='tanPassword'>
				<div class='kuanBottom'>
					<p class='cancels' @click='tanKuan=false'>取消</p>
					<p class='confirms' @click='tanConfirm'>确定</p>
				</div>
			</div>	
		</div>
	</div>
</template>

<style>
	body{
		padding:0;
	}
	.money-top{
		background:#fff;
		margin-bottom:20px;
	}
	.money-day{
		position:relative;
		height:320px;
	}
	.taskInfo-message-title{
		font-size:30px;
		color:#2C2C2C;
		font-weight:bold;
		margin-bottom:16px;
	}
	.money-bg{
		width:710px;
		height:279px;
		position:absolute;
		left:0;
		right:0;
		margin:auto;
		top:20px;
	}
	.money-day-num{
		position:absolute;
		left:30px;
		right:0;
		top:96px;
		font-size:72px;
		color:#fff;
		width:60%;
	}
	.money-type{
		display: flex;
		padding:20px 0;
	}
	.money-type-list{
		flex-grow: 1;
		width: 33%;
	}
	.moneyGuan .border{
		width:1px;
		height:60px;
		background:#ddd;
		margin-top:16px;
	}
	.money-list-money{
		text-align:center;
		color:#2C2C2C;
		font-size:36px;
		margin-bottom:6px;
	}
	.money-list-test{
		text-align:center;
		font-size:26px;
		color:#a0a0a0;
	}
	.moneyGuan-list-box{
		background:#fff;
		padding:0 20px;
		margin-bottom:20px;
	}
	.moneyGuan-list{
		display:flex;
		justify-content:space-between;
		height:120px;
		border-bottom:1px solid #ddd;
	}
	.tiao{
		width:220px;
		height:66px;
		position:absolute;
		right:20px;
		top:102px;
	}
	.tiao a{
		width:100%;
		height:100%;
		display:block;
	}
	.moneyGuan-list:nth-last-child(1){
		border:none;
	}
	.moneyGuan-list-label{
		font-size:36px;
		color:#2C2C2C;
		line-height:120px;
	}
	.moneyGuan-list-value{
		font-size:26px;
		color:#A0A0A0;
		line-height:120px;
	}
	.moneyGuan-border{
		width:8px;
		height:28px;
		border-radius:10px;
		background:#4E9FFF;
		display:inline-block;
		margin-top:30px;
		margin-right:16px;
	}
	.moneyGuan-remember{
		background:#fff;
		height:450px;
		overflow:auto;
	}
	.moneyGuan-remember .moneyGuan-nav{
		display:flex;
		justify-content:space-around;
		height:90px;
	}
	.moneyGuan-nav-list{
		font-size:30px;
		color:#A0A0A0;
		line-height:90px;
	}
	.moneyGuan-nav-list.active{
		color:#2c2c2c;
		border-bottom:6px solid #4E9FFF;
	}
	.moneyGuan-remember-list{
		display:flex;
		justify-content:space-around;
		height:90px;
		border-bottom:1px solid #ddd;
	}
	.moneyGuan-remember-rt{
		line-height:90px;
		font-size:30px;
	}
	.moneyGuan-remember-fl{
		width:80%;
		display:flex;
		justify-content:space-around;
		flex-direction: column;
	}
	.moneyGuan-remember-name{
		font-size:30px;
		color:#494647;
	}
	.moneyGuan-remember-time{
		font-size:24px;
		color:#ADA6A8;
	}
	.danMask{
		width:100%;
		height:100%;
		background:rgba(0,0,0,0.6);
		position:fixed;
		left:0;
		top:0;
		display:flex;
		justify-content:center;
		flex-direction:column;
	}
	.danKuan{
		width:600px;
		height:550px;
		background:#fff;
		border-radius:10px;
		margin:0 auto;
		padding:20px;
		position:relative;
	}
	.danLabel{
		margin-left:10px;
		font-size:26px;/*px*/
		color:#2c2c2c;
		margin-bottom:20px;
	}
	.danLabels{
		margin-left:10px;
		font-size:30px;/*px*/
		color:#FF6C00;
		margin-top:90px;
		margin-bottom:20px;
	}
	.task-hand-close{
		font-size:70px;
		position:absolute;
		right:20px;
		top:0px;
		color:#FF6C00;
	}
	.kuanInp{
		display:block;
		width:100%;
		border:1px solid #eee;
		border-radius:4px;
		height:60px;
		line-height:60px;
		margin-bottom:80px;
		padding-left:10px;
	}
	.kuanBottom{
		width:100%;
		display:flex;
		justify-content:space-around;
	}
	.cancel{
		width:150px;
		height:60px;
		border-radius:40px;
		border:2px solid rgba(255,108,0,1);
		text-align:center;
		line-height:60px;
		font-size:26px;
		color:#FF6C00;
	}
	.confirm{
		width:150px;
		height:60px;
		border-radius:40px;
		text-align:center;
		line-height:60px;
		font-size:26px;
		background:linear-gradient(-135deg,rgba(253,149,10,1),rgba(253,80,2,1));;
		color:#fff;
	}
</style>

<script>
	import {moneys_guan,moneys_ti,moneys_la,out_bao_moneys} from '../../api/api'
	import Vue from 'vue'
	import { InfiniteScroll } from 'mint-ui';
	Vue.use(InfiniteScroll);
	export default{
		data(){
			return{
				tabIndex:'1',
				active:'active',
				info:'',
				list:[],
				currentPage:1,
				loading:false,
				tanKuan:false,
				tanPassword:'',
				cold:''
			}
		},
		mounted(){
			var that=this;
			this.$indicator.open('加载中...');
			moneys_guan().then(response=>{
				setTimeout(function(){
					that.$indicator.close()
				},500)
				var data=response
				this.info=data.user
				this.list=data.list
				this.cold=data.user.cold
			}).catch(error=>{

			})
		},
		methods:{
			tabNav(index){
				this.tabIndex=index
				this.$indicator.open('加载中...');
				moneys_ti(index).then(response=>{
					this.$indicator.close();
					var data=response
					if(data.list!=1){
						this.list=data.list
						this.currentPage=1
					}else{
						this.$toast('暂无数据')
					}
					
				}).catch(error=>{

				})
			},
			loadMore(){
				this.loading = true;
				var list=[];
				this.currentPage+=1
				this.$indicator.open('加载中...');
				moneys_la(this.tabIndex,this.currentPage).then(response=>{
					var data=response
					this.loading = false;
					this.$indicator.close()
					if(data.list!=1){
						for(var i=0;i<data.list.length;i++){
							this.list.push(data.list[i])
						}
					}else{
						this.$toast('没有更多数据了')
					}
				}).catch(error=>{

				})
			},
			tiXian(){
				if(this.info.moneys_balance==0){
					this.$toast('金额为0不能提现')
				}else if(this.cold==1){
					this.$toast('积分太低不能提现')
				}else if(this.info.hand_bao_moneys==1){
					this.$toast('保证金不能提现')
				}else{
					this.$router.push('/withdraw')
				}
			},
			tuiMoneys(){
				if(this.info.moneys_balance==0&&this.info.moneys_cold==0){
					this.tanKuan=true
				}else if(this.cold==1){
					this.$toast('积分太低不能退款')
				}else{
					this.$toast('您还有未提现金额')
				}
			},
			tanConfirm(){
				if(this.tanPassword==''){
					this.$toast('请输入提现密码')
				}else{
					this.tanKuan=false
					out_bao_moneys(this.tanPassword).then(response=>{
						var data=response
						if(data.info==1){
							this.$toast('保证金不足')
						}else if(data.info==3){
							this.$toast('提交成功,等待审核')
							this.$router.go(0)
						}else if(data.info==4){
							this.$toast('提交失败,重新提交')
						}else if(data.info==6){
							this.$toast('您存在尚未处理的提现申请')
						}
					}).catch(error=>{

					})
				}
				
			}
		}
	}
</script>