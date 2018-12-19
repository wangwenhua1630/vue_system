<template>
	<div class='messageBox' onselectstart="return false" onpaste="return false" oncopy="return false;" oncut="return false;">
		<div class='message-nav'>
			<p class='message-nav-list' v-bind:class="[navIndex==index?active:'']"  v-for='(item,index) in navList'  @click='tanFun(index)'>{{item}}</p>
		</div>
		<div class='tagBox'>
			<p class='tagList' v-bind:class="[tagIndex==index?actives:'']"    v-if='navIndex==0' v-for='(item,index) in tagList' @click='tag(index)'>{{item}}</p>
			<p class='tagList' v-bind:class="[tagIndexs==index?activess:'']"  v-if='navIndex==1' v-for='(item,index) in tagLists' @click='tag(index)'>{{item}}</p>
		</div>
		<div class='message-inner-ping' v-if='list!=1' v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" infinite-scroll-distance='10' infinite-scroll-immediate-check="false">
			<div class='ping-list' v-for='item in list'>
				<div class='ping-top' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">
					<img :src="item.img" alt="" class='ping-img' >
					<div class='ping-right'>
						<p class='ping-right-list' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">关键词：{{item.keyword}}</p>
						<p class='ping-right-list'>商品单价：￥{{item.good_price}}</p>
						<p class='ping-right-list'>佣金：<span class='style-color'>￥{{item.hand_moneys}}</span></p>
						<p class='ping-right-time'>接单时间：{{item.create_at}}</p>
					</div>
				</div>
				<div class='ping-bottom'>
					<p class='style-btn ping-btn' v-if='item.hand_task_status==2'  @click='taskinfos(item.id)'>查看</p>
					<p class='ping-btns ping-btn' v-if='item.hand_task_status==3&&navIndex==0'>已完成</p>
					<p class='ping-btns ping-btn' v-if='item.hand_task_status==9&&navIndex==0'>申诉中</p>
					<p class='ping-btns ping-btn' v-if='item.hand_task_status==8&&navIndex==0'>已处理</p>
					<p class='ping-btns' v-if='navIndex==0&&item.hand_task_status==3'><router-link to='/complain'>申诉</router-link></p>
					<p class='ping-btns' v-if='item.hand_task_status==5&&navIndex==0||item.hand_task_status==6&&navIndex==0'><router-link to='/overdue'>未完成</router-link></p>
					<p class='style-btn ping-btn'  @click='comment(item.id,2)'
						v-if='item.good_status==1&&navIndex==1&&tagIndexs==0||
						  	  item.good_status==2&&navIndex==1&&tagIndexs==0'>
						 去评价
					</p>
					<p class='style-btn ping-btn ping-btnss'   @click='comment(item.id,3)'
						v-if='item.add_status==1&&navIndex==1&&item.good_status==3&&tagIndexs==0||
							  item.add_status==1&&navIndex==1&&item.good_status==4&&tagIndexs==0||
							  item.add_status==1&&navIndex==1&&item.good_status==5&&tagIndexs==0'>
						去追评
					</p>
					<p class='ping-btns' v-if='item.good_status==3&&tagIndexs==1||item.add_status==3&&tagIndexs==1'>已评价</p>
					<p class='ping-btns' v-if='navIndex==1&&tagIndexs==2&&item.hand_task_status==3||
											   navIndex==1&&tagIndexs==2&&item.hand_task_status==10||
											   navIndex==1&&tagIndexs==2&&item.good_status==4||
											   navIndex==1&&tagIndexs==2&&item.add_status==4'>
						<router-link to='/complain'>申诉</router-link>
					</p>
					<p class='ping-btns' v-if='item.hand_task_status==8&&navIndex==1&&tagIndexs==2'>申诉中</p>
					<p class='ping-btns' v-if='item.hand_task_status==9&&navIndex==1&&tagIndexs==2'>已处理</p>
					<p class='ping-btns'  @click='taskinfos(item.id)' v-if='item.good_status==5&&navIndex==1&&tagIndexs==3||item.add_status==5&&navIndex==1&&tagIndexs==3'>未完成</p>
				</div>
        <div class="ping-tai">
          <img src="../../assets/tao-m.png" alt="" class='diff-icon' v-if="item.hand_status==1" style="width:25px;height:25px;">
          <img src="../../assets/jd-m.png" alt="" class='diff-icon' v-if="item.hand_status==2"  style="width:25px;height:25px;">
          <img src="../../assets/pdd-m.png" alt="" class='diff-icon' v-if="item.hand_status==3"  style="width:25px;height:25px;">
        </div>
			</div>
		</div>
		<div class='empty' v-else>
			<img src="../../assets/empty.png" alt="" class='empty-icon' >
		</div>
	</div>
</template>
<style>
	.messageBox .message-nav{
		height:84px;
		display:flex;
		justify-content:space-around;
		line-height:84px;
		color:#A0A0A0;
		font-size:30px;/*px*/
		background:#fff;
		margin-bottom:30px;
		box-shadow:0px 10px 14px 0px rgba(0,0,0,0.05);
	}
	.messageBox .message-nav .message-nav-list{
		color:#a0a0a0;
		font-size:30px;/*px*/
	}
	.messageBox .message-nav-list.active{
		color:#FD950A;
		border-bottom:6px solid #FD950A;
	}
	.messageBox .tagBox{
		display:flex;
		flex-wrap:wrap;
		width:730px;
		margin-left:20px;
	}
	.tagBox .tagList{
		width:160px;
		height:60px;
		text-align: center;
		line-height:60px;
		color:#a0a0a0;
		font-size:30px;/*px*/
		background:#fff;
		border-radius:30px;
		margin-right:20px;
		margin-bottom:30px;
	}
	.tagBox .tagList.tag_active{
		background:linear-gradient(-135deg,rgba(253,149,10,1),rgba(253,80,2,1));
		color:#fff;
	}
	.message-inner-ping{
		height:1000px;
		overflow:auto;
	}
	.messageBox .ping-list{
		padding:20px;
		background:#fff;
		margin-bottom:20px;
    position:relative;
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
	.ping-btn a{
		color:#fff;
	}
	.messageBox .ping-btns{
		width:150px;
		height:50px;
		line-height:50px;
		float:right;
		margin-top:15px;
		color:#FD950A;
		border-radius:100px;
		text-align:center;
		border:2px solid #FD950A;
	}
	.ping-btns a{
		color:#FD950A;
	}
	.messageBox .ping-btnss{
		background:linear-gradient(-135deg,rgba(53,195,255,1),rgba(24,144,255,1));
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
		flex-grow:1
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
		background:#989898;
		display:block;
		margin-top:15px;
		margin-right:14px;
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
		text-overflow: ellipsis;
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.empty{
		width:100%;
		height:100%;
		text-align:center;
		line-height:1000px;
		font-size:40px;
		color:#2c2c2c;
	}
  .ping-tai{position: absolute;top:15px;right:15px;width:60px;height:60px}
</style>
<script>
	document.oncopy = function(e){
  		e.preventDefault();
	}
	import {lookTask,taskStatus,taskStatus_la} from '../../api/api'
	export default{
		name:'message',
		data(){
			return{
				navList:['今日任务','过往任务'],
				tagList:['待处理','已完成','未完成'],
				tagLists:['待评价','已评价','已完成','未完成'],
				list:[],
				navIndex:0,
				tagIndex:0,
				tagIndexs:0,
				active:'active',
				actives:'tag_active',
				activess:'tag_active',
				loading:false,
				currentPage:1
			}
		},
		mounted(){
			var that=this;
			this.$indicator.open('加载中...');
			lookTask().then(response=>{
				setTimeout(function(){
					that.$indicator.close()
				},500)
				var data=response
				this.list=data.list
			}).catch(error=>{

			})
		},
		methods:{
			notcopy(){
  				return false;
			},
			tanFun(index){
				this.navIndex=index
				this.tagIndex=0
				this.tagIndexs=0
				this.$indicator.open('加载中...');
				taskStatus(index+1,1).then(response=>{
					this.$indicator.close();
					var data=response
					this.list=data.list
				}).catch(error=>{

				})
			},
			tag(index){
				this.tagIndex=index
				this.tagIndexs=index
				this.$indicator.open('加载中...');
				taskStatus(this.navIndex+1,index+1).then(response=>{
					this.$indicator.close();
					var data=response
					this.list=data.list
				}).catch(error=>{

				})
			},
			loadMore(){
				this.loading = true;
				var list=[];
				var index
				if(this.navIndex==0){
					index=this.tagIndex
				}else{
					index=this.tagIndexs
				}
				this.currentPage+=1
				this.$indicator.open('加载中...');
				taskStatus_la(this.navIndex+1,index+1,this.currentPage).then(response=>{
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
			// 详情
			taskinfos(id){
				this.$router.push({
					name:'任务详情',
					params:{
						id:id,
						type:1
					}
				})
			},
			// 评价任务
			comment(id,type){
				this.$router.push({
					name:'评价任务',
					params:{
						id:id,
						type:type
					}
				})
			}
		}
	}
</script>
