<template>
	<div class='taskInfo' onselectstart="return false"  oncopy="return false;" oncut="return false;">
		<div class='taskInfo-banner'>
			<img :src="info.img"  class='banner' alt="">
			<p class='taskInfo-store'>店铺名称：{{info.store_name}}</p>
		</div>
		<div class='taskInfo-message'>
			<p class='taskInfo-message-title' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">搜索关键词：{{info.keyword}}</p>
			<p class='taskInfo-list' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">商品单价：¥{{info.good_price}}</p>
      <p class='taskInfo-list taskInfo-search-info' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">商品总价：¥{{info.zong_moneys}}{{info.good_pai}}</p>
			<p class='taskInfo-list' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">佣金：<span class='style-color'>￥{{info.hand_moneys}}</span></p>
      <p class='taskInfo-list taskInfo-search-info' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">商品型号：{{info.kind}}</p>
			<!-- <p class='taskInfo-list'>任务编号：{{info.}}</p> -->
			<div class='taskInfo-gray'>
				<p class='taskInfo-gray-text' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">任务类型：{{info.task_type}}</p>
				<p class='taskInfo-gray-text' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">入口：{{info.task_ru}}</p>
			</div>
			<p class='taskInfo-gray-text style-color' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">提示：请打开tb手机端App,手动输入以上关键字，并且找到上图的产品，以及店铺。</p>
		</div>
		<div class='taskInfo-message shadow' @click.prevent="notcopy">
			<p class='taskInfo-message-title'>搜索条件</p>
			<div class='taskInfo-search'>
				<p class='taskInfo-search-label'>排序方式</p>
				<p class='taskInfo-search-value'>{{info.sortords}}</p>
			</div>
			<div class='taskInfo-search'>
				<p class='taskInfo-search-label'>价格区间</p>
				<p class='taskInfo-search-value'>{{info.min_price}}-{{info.max_price}}</p>
			</div>
			<div class='taskInfo-search'>
				<p class='taskInfo-search-label'>发货地址</p>
				<p class='taskInfo-search-value'>{{info.ship_address}}</p>
			</div>
			<div class='taskInfo-search'>
				<p class='taskInfo-search-label'>其他说明</p>
				<p class='taskInfo-search-value'>{{info.others}}</p>
			</div>
			<p class='taskInfo-gray-text style-color'>提示：请按照卖家要求按照以上搜索条件搜索产品。</p>
			<div class="shadow_s1">
				
			</div>
		</div>
		<div class='taskInfo-message shadow' @click.prevent="notcopy">
			<p class='taskInfo-message-title'>任务说明</p>
			<div class='taskInfo-search-info'>
				{{info.explains}}
			</div>
			<div class="shadow_s1"></div>
		</div>
		<div class='taskInfo-message shadow' v-if='info.requires!=0' @click.prevent="notcopy">
			<p class='taskInfo-message-title'>任务要求</p>
			<div class='taskInfo-tags'>
				<p class='taskInfo-tags-list' v-if='info.requires==2'>拍两家同行不付款</p>
				<p class='taskInfo-tags-list' v-if='info.requires==1'>拍一家同行不付款</p>
			</div>
			<div class="shadow_s1"></div>
		</div>
		<div class='taskInfo-bar'>
			<div class='taskInfo-bar-list' @click='tanConfirms'>放弃任务</div>
			<div class='taskInfo-bar-list'><p class='taskInfo-begin' @click='tanConfirm'>立即开始</p></div>
		</div>
		<!-- 弹框 -->
		<div class='danMask' v-if='tanKuan'>
			<div class='danKuan'>
				<p class='task-hand-close' @click='tanKuan=false'>&times</p>
				<p class='danLabels'>是否确定任务开始？开始之后,任务过程中无法放弃任务</p>
				<div class='kuanBottom'>
					<p class='cancels' @click='tanKuan=false'>取消</p>
					<p class='confirms' @click='tanConfirm'>确定</p>
				</div>
			</div>	
		</div>
		<!-- 拒绝弹框 -->
		<div class='danMask' v-if='tanKuans'>
			<div class='danKuan'>
				<p class='task-hand-close' @click='tanKuans=false'>&times</p>
				<p class='danLabels'>是否确定拒绝该任务？</p>
				<div class='kuanBottom'>
					<p class='cancels' @click='tanKuans=false'>取消</p>
					<p class='confirms' @click='tanConfirms'>确定</p>
				</div>
			</div>	
		</div>
	</div>
</template>
<style>
	.taskInfo{
		padding-bottom:120px;
	}
	.taskInfo-banner{
		width:750px;
		height:750px;
		position:relative;
	}
	.banner{
		width:750px;
		height:750px; 
		position:absolute;
		left:0;
		top:0;
	}
	.taskInfo-store{
		position:absolute;
		left:0;
		bottom:0;
		height:80px;
		background:linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,0.3));
		color:#fff;
		font-size:28px;/*px*/
		padding-left:20px;
		line-height:80px;
		width:100%;
	}
	.taskInfo-message{
		background:#fff;
		padding:20px;
		margin-bottom:30px;
	}
	.taskInfo-list{
		font-size:30px;/*px*/
		color:#2C2C2C;
		text-align:left;
		line-height:50px;
	}
	.taskInfo-gray{
		display:flex;
	}
	.taskInfo-gray-text{
		color:#a0a0a0;
		font-size:26px;/*px*/
	}
	.taskInfo-gray-text:nth-child(1){
		margin-right:50px;
	}
	.taskInfo-message-title{
		font-size:30px;
		color:#2C2C2C;
		font-weight:bold;
		margin-bottom:16px;
	}
	.taskInfo-search{
		display:flex;
		justify-content:space-between;
	}
	.taskInfo-search-label{
		font-size:30px;
		color:#a0a0a0;
		width:160px;
	}
	.taskInfo-search-value{
		font-size:30px;
		color:#2c2c2c;
	}
	.taskInfo-search-info{
		font-size:30px;
    background: yellow;
		color:red;
	}
	.taskInfo-tags{
		display:flex;
		flex-wrap: wrap;
	}
	.taskInfo-tags-list{
		padding:0 15px;
		height:50px;
		line-height:50px;
		color:#211300;
		font-size:26px;/*px*/
		background:linear-gradient(-135deg,rgba(253,149,10,0.2),rgba(253,80,2,0.2));
		border-radius:25px;
		margin-bottom:20px;
		margin-right:30px;
	}
	.taskInfo-bar{
		width:100%;
		height:98px;
		background:#fff;
		box-shadow:0px -5px 10px 0px rgba(0,0,0,0.05);
		display:flex;
		position:fixed;
		left:0;
		bottom:0;
	}
	.taskInfo-bar-list{
		width:50%;
		font-size:34px;/*px*/
		color:#1890FF;
		text-align:center;
		line-height:98px;
	}
	.taskInfo-bar-list .taskInfo-begin{
		width:355px;
		height:66px;
		background:linear-gradient(-135deg,rgba(253,149,10,1),rgba(253,80,2,1));
		border-radius:33px;
		text-align:center;
		line-height:66px;
		color:#fff;
		font-size:34px;/*px*/
		margin-top:16px;
	}
	.taskInfo-begin a{
		color:#fff;
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
	.taskInfo .danKuan{
		width:600px;
		height:250px;
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
		margin-top:20px;
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
	.kuanBottom .cancels{
		width:150px;
		height:60px;
		border-radius:40px;
		border:2px solid rgba(255,108,0,1);
		text-align:center;
		line-height:60px;
		font-size:26px;
		color:#FF6C00;
	}
	.kuanBottom .confirms{
		width:150px;
		height:60px;
		border-radius:40px;
		text-align:center;
		line-height:60px;
		font-size:26px;
		background:linear-gradient(-135deg,rgba(253,149,10,1),rgba(253,80,2,1));;
		color:#fff;
	}
  .taskInfo-list.taskInfo-search-info{color:red}
	/****遮罩岑****/
	.shadow{position:relative;}
	.shadow_s1{position:absolute;top:0;left:0;right:0;bottom:0;background-color: rgba(0,0,0,0);}
</style>
<script>
	document.oncopy = function(e){
  		e.preventDefault();
	}
	import {taskInfo,task_out,task_begin} from '../../api/api';
	export default{
		data(){
			return{
				id:this.$route.params.id,
				type:this.$route.params.type,
				info:'',
				tanKuan:false,
				tanKuans:false,
				no_nums:''
			}
		},
		mounted(){
			this.$indicator.open('加载中...');
			var that=this;
			if(this.id==undefined){
				this.$toast('此步任务不可逆，请重新开始')
				setTimeout(function(){
					that.$router.push('/taskBox')
				},500)
			}else{
				taskInfo(this.id,this.type).then(response=>{
					setTimeout(function(){
						that.$indicator.close()
					},500)
					var data=response
					this.info=data.list[0]
					this.id=data.list[0].id
					this.no_nums=data.out_orders
				}).catch(error=>{})
			}
			
		},
		methods:{
			notcopy(){
  				return false;
			},
			tanConfirm(){
				var that=this;
				this.$msgbox({
					title:'提示',
					message:'确定开始吗?',
					callback:function(res){
						if(res=='confirm'){
							task_begin(that.id).then(response=>{
							var data=response
                if(data==''){
                  that.$toast('此任务已经过期');
                  that.$router.push('/main');
                }else{
                  if(data.info==2){
                    that.$router.push({
                      name:'开始任务1',
                      params:{
                        id:that.id,
                      }
                    })
                  }else if(data.info==1){
                    that.$toast('任务已超时')
                  }
                }
							}).catch(error=>{

							})
						}
					}
				})
			},
			tanConfirms(){
				var that=this;
				this.$msgbox({
					title:'提示',
					message:'您还有'+that.no_nums+'放弃任务的机会',
					callback:function(res){
						if(res=='confirm'){
							task_out(that.id).then(response=>{
								var data=response
								if(data.info==1){
									that.$toast('不可以拒绝任务')
								}else if(data.info==2){
									that.$toast('您已拒绝该任务')
									setTimeout(function(){
										that.$router.push('/homes')
									},500)
								}else if(data.info==3){
									that.$toast('未拒绝该任务，请重试')
								}else if(data.info==4){
									that.$toast('任务已开始，不可以放弃')
								}
							}).catch(error=>{})
						}
					}
				})
			}
		}
	}
</script>
