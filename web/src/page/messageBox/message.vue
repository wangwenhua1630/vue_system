<template>
	<div class='messageBox'>
		<div class='message-nav'>
			<p class='message-nav-list' v-bind:class="[navIndex==index?active:'']"  v-for='(item,index) in navList'  @click='tanFun(index)'>{{item}}</p>
		</div>
		<div v-if='list!=1' class='message-inner-box'>
			<div class='message-inner-ping'  v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" infinite-scroll-distance='10' infinite-scroll-immediate-check="false" v-if='navIndex==2' >
				<div class='ping-list' v-for='item in list' :key='item.id'>
					<div class='ping-top'>
						<img :src="item.img" alt="" class='ping-img' >
						<div class='ping-right'>
							<p class='ping-right-list'>关键词：{{item.keyword}}</p>
							<p class='ping-right-list'>商品单价：￥{{item.good_price}}</p>
							<p class='ping-right-list'>佣金：<span class='style-color'>￥{{item.hand_moneys}}</span></p>
							<p class='ping-right-time'>接单时间：{{item.create_at}}</p>
						</div>
					</div>
					<div class='ping-bottom'>
						<p class='style-btn ping-btn'>评价</p>
					</div>
				</div>
			</div>
			<div class='message-inner-notic' v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" infinite-scroll-distance='10' infinite-scroll-immediate-check="false" v-if='navIndex!=2'>
				<div class='notic-list' @click='details(item.id)' v-for='item in list' :key='item.id'>
					<div class='notic-title'>
						<span class='notic-ti' :class="item.look==2?'notice-tis':''"></span>
						<p class='notic-title-text'>{{item.title}}</p>
						<p class='notic-title-time'>{{item.create_at}}</p>
					</div>
					<div class='notic-message' v-html='item.content'>
					</div>
				</div>
			</div>	
		</div>
		<div v-else class='empty' >
			<img src="../../assets/empty.png" alt="" class='empty-icon' >
		</div>
	</div>
</template>
<style>
	.messageBox {
		height:100%;
	}
	.messageBox .message-nav{
		height:84px;
		display:flex;
		justify-content:space-around;
		line-height:84px;
		color:#A0A0A0;
		font-size:30px;/*px*/
		background:#fff;
		margin-bottom:20px;
		box-shadow:0px 10px 14px 0px rgba(0,0,0,0.05);
		width:100%;
	}
	.messageBox .message-nav .message-nav-list{
		color:#a0a0a0;
		font-size:30px;/*px*/
	}
	.messageBox .message-nav-list.active{
		color:#FD950A;
		border-bottom:6px solid #FD950A;
	}
	.messageBox .message-inner-notic{
		height:1000px;
		overflow:auto;
	}
	.messageBox .message-inner-ping{
		height:1000px;
		overflow:auto;
	}
	.messageBox .ping-list{
		padding:20px;
		background:#fff;
		margin-bottom:20px;
	}
	.messageBox .ping-top{
		height:230px;
		border-bottom:1px solid #ddd;
	}
	.messageBox .ping-bottom{
		overflow:hidden;
	}
	.messageBox .ping-btn{
		width:150px;
		height:50px;
		line-height:50px;
		float:right;
		margin-top:15px;
	}
	.messageBox .ping-top{
		display:flex;
	}
	.messageBox .ping-img{
		display:block;
		width:210px;
		height:210px;
		margin-right:20px;
		border-radius:8px;
	}
	.messageBox .ping-right{
		position:relative;
		flex-grow:1;
	}
	.messageBox .ping-right-time{
		position:absolute;
		bottom:20px;
		text-align:left;
		font-size:26px;
		color:#a0a0a0;
	}
	.messageBox .ping-right-list{
		font-size:30px;
		text-align:left;
		margin-bottom:16px;
	}
	.messageBox .notic-list{
		background:#fff;
		padding:20px;
		margin-bottom:20px;
	}
	.messageBox .notic-title{
		display:flex;
		position:relative;
		height:40px;
		overflow:hidden;
	}
	.messageBox .notic-ti{
		width:10px;
		height:10px;
		border-radius:50%;
		/*background:#989898;*/
    background: red;
		display:block;
		margin-top:15px;
		margin-right:14px;
	}
  .messageBox .notic-ti.notice-tis{
    background: #989898;
  }
	.messageBox .notic-title-text{
		font-size:30px;
		line-height:40px;
		color:#2C2C2C;
		width:70%;
		overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	}
	.messageBox .notic-title-time{
		display:block;
		font-size:24px;
		color:#A0A0A0;
		line-height:40px;
		position:absolute;
		top:0;
		right:20px;
	}
	.messageBox .notic-message{
		font-size:26px;
		color:#a0a0a0;
		text-align:left;
		padding-left:24px;
		height:70px;
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp:2;
		-webkit-box-orient:vertical;
	}
	.empty{
	    width:100%;
	    height:100%;
	    text-align:center;
	    line-height:1000px;
	    font-size:40px;
	    color:#2c2c2c;
	  }
</style>
<script>
	import {Infomations,Infomations_la} from '../../api/api'
	export default{
		name:'message',
		data(){
			return{
				navList:['我的私信','系统公告','评价任务','客服工单'],
				navIndex:0,
				active:'active',
				list:[],
				loading:false,
				currentPage:1
			}
		},
		mounted(){
			var that=this;
			this.$indicator.open('加载中...');
			Infomations(1).then(response=>{
				var data=response
				this.list=data.list
				setTimeout(function(){
					that.$indicator.close()
				},500)
			}).catch(error=>{

			})
		},
		methods:{
			tanFun(index){
				this.$indicator.open('加载中...');
				this.navIndex=index
				this.currentPage=1
				Infomations(index+1).then(response=>{
					this.$indicator.close()
					var data=response
					this.list=data.list
				}).catch(error=>{

				})
			},
			loadMore(){
				this.loading = true;
				var list=[];
				this.currentPage+=1
				this.$indicator.open('加载中...');
				Infomations_la(this.navIndex+1,this.currentPage).then(response=>{
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
			details(id){
				this.$router.push({
					name:'详情查看',
					params:{
						id:id
					}
				})
			}
		}
	}
</script>
