<template>
	<div class='prove'>
		<div class='prove-title'>
			<span class='prove-title-big'>
				第2步
			</span>
			/ 共5步
		</div>
		<div class='prove-tips'>认证可能会花费一些时间，请您耐心填写</div>
		<div class='prove-upBox'>
			<div v-if='!up'>
				<img src='../../assets/up-one.png' alt="" class='upImg' >
				<p class='up-texts'>手持身份证图</p>
			</div>
			<img :src='upimg' alt="" class='upImg' v-else>
			<input type="file" class='up-inp'  @change="upLoad">
		</div>
		<p class='look' @click='mask=true'>查看示例</p>
		<p class='moneyBind-btn style-btn' @click='next' >下一步</p>
		<div class='upMask' v-if='mask' @click='mask=false' >
			<img :src="example_img" alt="" class='look-img' >
		</div>
	</div>
</template>


<style>
	.prove-title{
		text-align:center;
		font-size:36px;/*px*/
		color:#FD950A;
		margin-top:20px;
		margin-bottom:10px;
	}
	.prove-title-big{
		font-size:48px;/*px*/
	}
	.prove-tips{
		text-align:center;
		font-size:20px;
		color:#a0a0a0;
		margin-bottom:50px;
	}
	.prove-upBox{
		width:560px;
		height:300px;
		background:#fff;
		border-radius:10px;
		margin:0 auto;
		margin-bottom:30px;
		overflow:hidden;
		position:relative;
	}
	.upImg{
		width:200px;
		height:133px;
		display:block;
		margin:0 auto;
		margin-top:60px;
		margin-bottom:20px;
	}
	.up-texts{
		text-align:center;
		font-size:28px;
		color:#a0a0a0;
	}
	.look{
		text-align:center;
		font-size:28px;
		color:#1890FF;
		margin-bottom:80px;
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
	.upMask{
		width:100%;
		height:100%;
		position:fixed;
		left:0;
		top:0;
		z-index:9;
		background:rgba(0,0,0,0.65);
		display:flex;
		justify-content:center;
		flex-direction:column;
	}
	.look-img{
		width:80%;
		margin:0 auto;
	}
</style>

<script>
	import {user_img,img_save} from '../../api/api'
	export default{
		data(){
			return{
				mask:false,
				upimg:'',
				upimgs:'',
				up:false,
				example_img:'',
			}
		},
		mounted(){
			user_img(2).then(response=>{
				var data=response
				this.example_img=data.example_img.card_hand
				if(data.info.card_hand!=1){
					this.upimg=data.info.card_hand
					this.up=true
				}

			}).catch(error=>{})
		},
		methods:{
			// 头像上传
			upLoad(e){
				var that=this;
				var files = e.target.files[0]
				if(files.size>1*1024*1024){
					let reader = new FileReader()
	       			reader.readAsDataURL(files)
	       			reader.onloadend = function () {
	       				that.up=true
			            that.upimg=this.result
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
				}else{
					let reader = new FileReader()
	       			reader.readAsDataURL(files)
	       			reader.onloadend = function (){
	       				that.up=true
				        that.upimg=this.result
				        that.upimgs=this.result
	       			}
				}
				
			},
			next(){
				if(this.upimg==''){
					this.$toast('请上传手持身份证图')
				}else{
					this.$indicator.open('上传中...');
					img_save(this.upimgs,'',2).then(response=>{
						var data=response
						this.$indicator.close();
						if(data.info==1){
							 this.$router.push('/proveThree')
						}
					}).catch(error=>{

					})	
				}	
			}
		}
	}
</script>