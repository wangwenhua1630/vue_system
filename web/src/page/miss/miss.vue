<template>
	<div class='complain'>
		<div class='complain-inner'>
			<div class='complain-type' v-if='tagList!=1'>
				<div class='complain-title'>选择类型<span class='complain-title-high'>(多选)</span></div>
				<div class='complain-tag-box'>
					<div class='complain-tag-list' v-bind:class="[item.choose?tag_active:'']" v-for='(item,index) in tagList ' @click='tags(index)' >{{item.name}}</div>
				</div>
			</div>
			<div class='complain-type'>
				<div class='complain-title'>纠错内容</div>
				<div class='complain-task-box'>
					<mt-field  placeholder="在此输入纠错内容" type="textarea" rows="4" v-model="content"></mt-field>
				</div>
			</div>
			<div class='complain-type'>
				<div class='complain-title'>纠错图片<span class='complain-title-high'>(必填)</span></div>
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
			<div class='main-self'>
				<div class='main-self-fl'>
					<p class='main-self-text'>不再接收此店铺任务</p>
					<p class='main-self-texts'>开启之后系统将不会再为您推送此店铺任务</p>
				</div>
				<div class='main-self-rt'>
					<mt-switch v-model="value"></mt-switch>
				</div>
			</div>
			<div class='btnBox'>
				<p class='btnList'>取消</p>
				<p class='btnList' @click='submit'>提交</p>
			</div>
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

	.main-self{
		background:#fff;
		margin-bottom:20px;
		height:120px;
		padding:20px;
		display:flex;
		justify-content:space-between;
	}
	.main-self-text{
		font-size:36px;/*px*/
		color:#2C2C2C;
	}
	.main-self-texts{
		font-size:26px;/*px*/
		color:#A0A0A0;
	}
	.main-self-rt{
		width:120px;
		height:100%;
	}
	.mint-switch{
		width:120px;
		height:70px;
	}
	.mint-switch-core{
		transform:scale(2);
	}
	.mint-switch-input:checked + .mint-switch-core{
		border-color:#FD950A;
		background: #FD950A;
	}
	.btnBox{
		display:flex;
		justify-content:space-around;
		margin:50px;
	}
	.btnList{
		width:250px;
		height:80px;
		text-align:center;
		line-height:80px;
		border-radius:100px;
		font-size:36px;/*px*/
		color:#FD950A;
		border:2px solid #FD950A;
	}
	.btnList:nth-child(2){
		border:none;
		background:linear-gradient(-135deg,rgba(253,149,10,1),rgba(253,80,2,1));
		color:#fff;
	}
</style>

<script>
	import {task_mistake,task_mistake_save} from '../../api/api'
	export default{
		data(){
			return{
				tabIndex:'1',
				active:'active',
				tag_active:'tag_active',
				he_active:'he_active',
				heIndex:1,
				upimg:'../../assets/up.png',
				upimgs:'',
				content:'',
				id:this.$route.params.id,
				up:false,
				value:false,
				tagList:[{'text':'价格不匹配',choose:false},{'text':'通过关键字找不到目标商品',choose:false},{'text':'图片不匹配',choose:false},{'text':'其他',choose:false}]
			}
		},
		mounted(){
			var that=this;
			this.$indicator.open('加载中...');
			task_mistake().then(response=>{
				setTimeout(function(){
					that.$indicator.close()
				},500)
				var data=response
				this.tagList=data.info
			}).catch(error=>{

			})
		},
		methods:{
			tabNav(index){
				this.tabIndex=index
			},
			tags(index){
				this.tagList[index].choose=!this.tagList[index].choose;
			},
			heTag(index){
				this.heIndex=index
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

			// 提交信息
			submit(){
				var miss_id=[]
				var that=this;
				var types=1
				if(this.tagList!=1){
					for(var i=0;i<this.tagList.length;i++){
						if(this.tagList[i].choose){
							miss_id.push(this.tagList[i].id)
						}
					}
				}
				if(this.value){
					types=2
				}else{
					types=1
				}
				if(this.content==''){
					this.$toast('请填写内容')
				}else if(this.upimg==''){
					this.$toast('请上传截图')
				}else{
					task_mistake_save(this.id,this.content,this.upimgs,miss_id,types).then(response=>{
						var data=response
						if(data.info==1){
							this.$toast('提交成功')
							setTimeout(function(){
								that.$router.push('/homes')
							},500)
						}else if(data.info==3){
							this.$toast('此任务已过期')
						}
					}).catch(error=>{

					})
				}
			}
		}
	}
</script>