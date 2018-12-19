<template>
	<div class='complain'>
		<div class='complain-nav'>
			<p class='complain-nav-list'  v-bind:class="[tabIndex==1?active:'']" @click='tabNav(1)' >申诉</p>
			<p class='complain-nav-list'  v-bind:class="[tabIndex==2?active:'']" @click='tabNav(2)'>申诉记录</p>
		</div>
		<div class='complain-inner' v-if='tabIndex==1'>
			<div class='complain-type'>
				<div class='complain-title'>选择申诉类型<span class='complain-title-high'>(每次只能选择一种)</span></div>
				<div class='complain-tag-box'>
					<div class='complain-tag-list' v-bind:class="[item.choose?tag_active:'']" v-for='(item,index) in tagList ' @click='tags(index)' >{{item.name}}</div>
				</div>
			</div>
			<div class='complain-type'>
				<div class='complain-title'>任务编号<span class='complain-title-high'>(选填)</span></div>
				<div class='complain-task-box'>
					<mt-field  placeholder="在此输入任务编号" type="textarea" rows="4" v-model="task_num"></mt-field>
				</div>
			</div>
			<div class='complain-type'>
				<div class='complain-title'>商品差价<span class='complain-title-high'>(选填)</span></div>
				<div class='complain-task-box'>
					<mt-field  placeholder="在此输入商品差价" type="textarea" rows="2" v-model="task_moneys"></mt-field>
				</div>
			</div>
			<div class='complain-type'>
				<div class='complain-title'>申诉图片<span class='complain-title-high'>(必填)</span></div>
				<div class='complain-task-box'>
					<div class='complain-up'>
						<img src="../../assets/up.png" alt="" class='up-img' v-if='!up' >
						<img :src='upimg' alt="" class='up-img' v-else >
						<img src="../../assets/close.png" alt="" class='up-close' v-if='up' @click.stop='del' >
						<input type="file" class='up-inp'  @change="upLoads">
					</div>
					<div class='up-text'>上传图片，用于辅助说明</div>
				</div>
			</div>
			<div class='complain-submit style-btn ' @click='submit'>提交</div>
		</div>
		<div class='complain-inner' v-if='tabIndex==2'>
			<div class='complain-he-type'>
				<div class='complain-he-list' v-bind:class="[heIndex==1?he_active:'']" @click='heTag(1)' >等待审核</div>
				<div class='complain-he-list'v-bind:class="[heIndex==2?he_active:'']" @click='heTag(2)'>已处理</div>
			</div>
			<div class='complain-inner-notic' v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" infinite-scroll-distance='10' infinite-scroll-immediate-check="false" v-if='list!=1' >
				<div class='notic-list' @click='details(item.id)' v-for='item in list' :key='item.id' >
					<div class='notic-title'>
						<span class='notic-ti'></span>
						<div class='complain-notic-fl'>
							<p class='notic-title-text'>申诉类型：{{item.title}}</p>
							<p class='notic-title-time'>送审时间：{{item.create_at}}</p>
						</div>
						<div class='complain-notic-rt'>
							查看详情>
						</div>
					</div>
				</div>
			</div>
			<div class='empty' v-else>暂无内容</div>
		</div>
	</div>
</template>

<style>
	.complain-nav{
		display:flex;
		justify-content:space-around;
		height:90px;
		background:#fff;
		box-shadow:0px 10px 14px 0px rgba(0,0,0,0.05);
		margin-bottom:60px;
		position:fixed;
		left:0;
		top:0;
		width:100%;
	}
	.complain-nav-list{
		font-size:30px;
		color:#A0A0A0;
		line-height:90px;
	}
	.complain-nav-list.active{
		color:#FD950A;
		border-bottom:6px solid #FD950A;
	}
	.complain-title{
		font-size:30px;
		color:#2c2c2c;
		padding-left:20px;
		margin-bottom:20px;
		font-weight:bold;
	}
	.complain-title-high{
		color:#a0a0a0;
		margin-left:10px;
		font-weight:0;
	}
	.complain-tag-box{
		background:#fff;
		padding:0 20px;
		display:flex;
		flex-wrap: wrap;
		padding-top: 30px;
		padding-bottom: 0;
	}
	.complain-task-box{
		padding:20px;
		background:#fff;
		display:flex;
		flex-wrap: wrap;
	}
	.complain-type{
		margin-bottom:60px;
	}
	.complain-tag-list{
		padding:0 15px;
		border-radius:60px;
		text-align:center;
		line-height:60px;
		background:#F0F2F5;
		color:#2C2C2C;
		font-size:26px;
		margin-right:20px;
		margin-bottom:30px;
	}
	.complain-tag-list.tag_active{
		background:linear-gradient(-135deg,rgba(253,149,10,1),rgba(253,80,2,1));
		color:#fff;
	}
	.mint-field.is-textarea{
		width:100%;
	}
	.mint-field-core{
		font-size:26px;
		color:#9C9C9C;
	}
	/*上传*/
	.complain-up{
		width:140px;
		height:140px;
		position:relative;
		margin-right:30px;
	}
	.up-img{
		width:140px;
		height:140px;
		position:absolute;
		left:0;
		top:0;
	}
	.up-close{
		width:30px;
		height:30px;
		position:absolute;
		right:-10px;
		top:-10px;
	}
	.up-text{
		line-height:140px;
		font-size:26px;
		color:#9C9C9C;
	}
	.up-inp{
		display:block;
		width:100%;
		height:100%;
		opacity:0;
	}
	.complain .complain-submit{
		width:660px;
		height:80px;
		line-height:80px;
		margin:0 auto;
		font-size:36px;
	}
	/*记录*/
	.complain-inner{
		margin-top:120px;
	}
	.complain-inner-notic{
		height:1000px;
		overflow:auto;
	}
	.complain-he-type{
		display: flex;
		padding:0 20px;
		margin-bottom:60px;
	}
	.complain-he-list{
		padding:0 20px;
		height:60px;
		line-height:60px;
		font-size:30px;
		color:#a0a0a0;
		margin-right:30px;
		border-radius:60px;
		background:#fff;
	}
	.complain-he-list.he_active{
		color:#fff;
		background:linear-gradient(-135deg,rgba(253,149,10,1),rgba(253,80,2,1));
	}
	.complain .notic-list{
		background:#fff;
		padding:20px;
		margin-bottom:20px;
	}
	.complain .notic-title{
		display:flex;
		position:relative;
		height:100px;
		overflow:hidden;
	}
	.complain .notic-ti{
		width:10px;
		height:10px;
		border-radius:50%;
		background:#FF2613;
		display:block;
		margin-top:15px;
		margin-right:14px;
	}
	.complain-notic-fl{
		width:70%;
	}
	.complain-notic-rt{
		font-size:26px;
		color:#A0A0A0;
		line-height:100px;
		position:absolute;
		right:0;
		top:0;
	}
	.complain .notic-title-text{
		font-size:30px;
		line-height:40px;
		color:#2C2C2C;
		width:100%;
		overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    margin-bottom:20px;
	    font-weight:bold;
	}
	.complain .notic-title-time{
		display:block;
		font-size:24px;
		color:#A0A0A0;
		line-height:40px;
	}
	.complain .notic-message{
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
</style>

<script>
	import {complain,complainList,complainList_la,complain_ti} from '../../api/api'
	export default{
		data(){
			return{
				tabIndex:'1',
				active:'active',
				tag_active:'tag_active',
				he_active:'he_active',
				heIndex:1,
				upimg:'',
				upimgs:'',
				task_num:'',
				task_moneys:'',
				up:false,
				tagList:[],
				list:[],
				loading:false,
				currentPage:1
			}
		},
		mounted(){
			var that=this
			this.$indicator.open('加载中...');
			complain().then(response=>{
				var data=response
				this.tagList=data.info
				setTimeout(function(){
					that.$indicator.close()
				},500)
			}).catch(error=>{

			})
		},
		methods:{
			tabNav(index){
				this.tabIndex=index
				if(index==2){
					this.$indicator.open('加载中...');
					complainList(1).then(response=>{
						this.$indicator.close()
						var data=response
						this.list=data.info
					}).catch(error=>{
					})
				}
			},
			tags(index){
				for(var i=0;i<this.tagList.length;i++){
					this.tagList[i].choose=false;
					this.tagList[index].choose=true;
				}
			},
			heTag(index){
				this.heIndex=index
				this.currentPage=1
				this.$indicator.open('加载中...');
				complainList(index).then(response=>{
					this.$indicator.close()
					var data=response
					this.list=data.info
				}).catch(error=>{
				})
			},	
			// 图片上传
			upLoads(e){
				var that=this;
				var files = e.target.files[0]
				let reader = new FileReader()
       			reader.readAsDataURL(files)
       			reader.onloadend = function () {
		          that.upimg = this.result
		          that.up=true
		          var image=new Image()
			      image.src=this.result;
			      var canvas = document.createElement("canvas"); 
			      image.onload = function(){
			            	if(image.width>750){
				            	canvas.width = 1000;  
				            	canvas.height = canvas.width * (image.height / image.width);;  
				            }else{
				            	canvas.width = image.width; 
				            	canvas.height = image.height;  
				            }
							canvas.getContext("2d").drawImage(image, 0, 0,canvas.width,canvas.height);  
							canvas.toDataURL('image/jpeg', 0.7)
							that.upimgs=canvas.toDataURL('image/jpeg', 0.7)
			       }
		        }
			},
			// 删除上传图片
			del(){
				this.upimg=''
				this.up=false
			},
			loadMore(){
				this.loading = true;
				var list=[];
				this.currentPage+=1
				this.$indicator.open('加载中...');
				complainList_la(this.heIndex,this.currentPage).then(response=>{
					var data=response
					this.loading = false;
					this.$indicator.close()
					if(data.info!=1){
						for(var i=0;i<data.info.length;i++){
							this.list.push(data.info[i])
						}
					}else{
						this.$toast('没有更多数据了')
					}
				}).catch(error=>{

				})
			},
			// 申诉提交
			submit(){
				var id=''
				var types
				for(var i=0;i<this.tagList.length;i++){
					if(this.tagList[i].choose){
						id=this.tagList[i].id
						types=this.tagList[i].type
					}
				}
				if(id==''){
					this.$toast('请选择申诉类型')
				}else if(this.task_num==''&&types==2||this.task_num==''&&types==4){
					this.$toast('请输入任务编号')
				}else if(this.money==''&&types==3||this.money==''&&types==4){
					this.$toast('请输入差价金额')
				}else if(this.upimg==''){
					this.$toast('请上传申诉图片')
				}else{
					this.$indicator.open('加载中...');
					complain_ti(id,this.task_num,this.upimgs,this.task_moneys).then(response=>{
						var data=response
						this.$indicator.close()
						if(data.info==3){
							this.$toast('提交成功')
							this.$router.push('/main')
						}else if(data.info==4){
							this.$toast('提交失败')
						}else if(data.info==1){
							this.$toast('图片保存失败')
						}else if(data.info==2){
							this.$toast('图片格式有误')
						}
					}).catch(error=>{

					})
				}
			},
			// 查看详情
			details(id){
				this.$router.push({
					name:'申诉详情',
					params:{
						id:id
					}
				})
			}
		}
	}
</script>