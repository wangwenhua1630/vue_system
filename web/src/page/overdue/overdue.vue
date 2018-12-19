<template>
	<div class='taskOne'>
		<div class='taskBox' v-bind:class="[lookMore?active:'']">
			<div class='taskInfo-banner'>
				<img :src="info.img"  class='banner' alt="">
				<p class='taskInfo-store'>店铺名称：{{info.store_name}}</p>
			</div>
			<div class='taskInfo-message'>
				<p class='taskInfo-message-title'>搜索关键词：{{info.keyword}}</p>
				<p class='taskInfo-list'>商品单价：¥{{info.good_price}}</p>
				<p class='taskInfo-list'>佣金：<span class='style-color'>￥{{info.hand_moneys}}</span></p>
				<div class='taskInfo-gray'>
					<p class='taskInfo-gray-text'>任务类型：{{info.task_type}}</p>
					<p class='taskInfo-gray-text'>入口：{{info.task_ru}}</p>
				</div>
				<div class='slideUp' @click='lookAll' v-if='lookMore' >查看全部<img src="../../assets/icon-more.png" alt="" class='icon-more' ></div>
				<div class='slideUp' @click='noLook' v-else >收起<img src="../../assets/icon-more.png" alt="" class='icon-mores' ></div>
			</div>
			<div class='taskInfo-message'>
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
			</div>
			<div class='taskInfo-message'>
				<p class='taskInfo-message-title'>任务说明</p>
				<div class='taskInfo-search-info'>
					{{info.explains}}
				</div>
			</div>
		</div>
		<div class='overdue style-color'>很抱歉该任务已过期</div>
	</div>
</template>
<style>
	.times{
		width:100%;
		display:flex;
		height:120px;
		background:linear-gradient(-135deg,rgba(253,149,10,1),rgba(253,80,2,1));
	}
	.times-fl{
		width:470px;
		line-height:120px;
		color:#fff;
		font-size:36px;
		font-weight:bold;
		text-align:center;
	}
	.times-fl .mint{
		width:48px;
		height:48px;
		text-align:center;
		line-height:48px;
		border-radius:8px;
		color:#FF6C00;
		background:#fff;
		font-weight:bold;
		display:inline-block;
		font-size:28px;/*px*/
	}
	.times-fr{
		width:280px;
		text-align:center;
		background:rgba(243,243,243,0.5);
	}
	.times-fr-text{
		width:280px;
		text-align:center;
		font-size:24px;
		color:#2C2C2C;
		font-weight:bold;
		margin-top:20px;
		margin-bottom:20px;
	}
	.second{
		width:36px;
		height:36px;
		background:rgba(44,44,44,1);
		border-radius:8px;
		color:#fff;
		text-align:center;
		line-height:36px;
		font-size:22px;/*px*/
	}
	.taskBox{
		overflow:hidden;
	}
	.taskBox.active{
		height:1150px;
	}
	.taskOne .prove-title{
		text-align:left;
		font-size:36px;/*px*/
		color:#FD950A;
		margin-top:20px;
		margin-bottom:10px;
		padding-left:20px;
	}
	.prove-title-big{
		font-size:48px;/*px*/
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
		color:#a0a0a0;
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
	.slideUp{
		width:100%;
		height:50px;
		text-align:center;
		font-size:22px;
		color:#1890ff;
		margin-top:20px;
		position:relative;
	}
	.icon-more{
		width:30px;
		height:20px;
		position:absolute;
		left:0;
		right:0;
		margin:0 auto;
		bottom:0;
	}
	.icon-mores{
		width:30px;
		height:20px;
		position:absolute;
		left:0;
		right:0;
		margin:0 auto;
		bottom:0;
		transform:rotate(180deg)
	}
	.storeName-regx{
		padding-left:20px;
		color:#2C2C2C;
		font-size:30px;
		margin-bottom:20px;
	}
	.storeName-regx-label{
		color:#a0a0a0;
	}
	.InputRegx{
		height:98px;
		background:#fff;
		padding:0 20px;
		display:flex;
		justify-content:space-between;
		margin-bottom:80px;
	}
	.regxTest{
		width:150px;
		height:50px;
		border-radius:25px;
		border:2px solid rgba(253,149,10,1);
		text-align:center;
		line-height:50px;
		color:rgba(253,149,10,1);
		font-size:26px;/*px*/
		margin-top:24px;
	}
	.regx-inp{
		display:block;
		width:500px;
		height:98px;
		line-height:98px;
		border:none;
		outline:none;
		font-size:26px;/*px*/
	}
	.next-btn{
		width:660px;
		height:80px;
		border-radius:100px;
		text-align:center;
		line-height:80px;
		color:#fff;
		font-size:36px;/*px*/
		margin:0 auto;
		margin-bottom:107px;
	}
	.next-btn a{
		color:#fff;
	}
	.taskMiss-title{
		width:100%;
		display:flex;
		justify-content:center;
		font-size:30px;/*px*/
		color:#1890FF;
	}
	.miss-icon{
		width:30px;
		height:30px;
		margin-top:5px;
		margin-right:10px;
		margin-bottom:20px;
	}
	.taskMiss-tips{
		color:#a0a0a0;
		width:600px;
		margin:0 auto;
		margin-bottom:50px;
		font-size:24px;/*px*/
	}
	.overdue{
		text-align:center;
		font-size:28px;/*px*/
		margin-top:50px;
	}
</style>
<script>
	import {task_one} from '../../api/api'
	export default{
		data(){
			return{
				lookMore:true,
				active:'active',
				id:this.$route.params.id,
				info:'',
			}
		},
		mounted(){
			var that=this;
			this.$indicator.open('加载中...');
			task_one(this.id).then(response=>{
				setTimeout(function(){
					that.$indicator.close()
				},500)
				var data=response
				this.info=data.info[0]
				this.id=data.info[0].id
			}).catch(error=>{

			})
		},
		methods:{
			lookAll(){
				this.lookMore=false
			},
			noLook(){
				this.lookMore=true
			}
		}
	}
</script>