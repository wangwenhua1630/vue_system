<template>
	<div class='taskOne taskComment'>
		<div class='taskBox' v-bind:class="[lookMore?active:'']">
			<div class='taskInfo-banner'>
				<img :src="info.img"  class='banner' alt="">
				<p class='taskInfo-store'>店铺名称：{{info.store_name}}</p>
			</div>
			<div class='taskInfo-message'>
				<p class='taskInfo-message-title'>搜索关键词：{{info.keyword}}</p>
				<p class='taskInfo-list'>商品单价：¥{{info.good_price}}</p>
				<p class='taskInfo-list' v-if='type==2'>佣金：<span class='style-color'>￥{{info.good_moneys}}</span></p>
				<p class='taskInfo-list' v-if='type==3'>佣金：<span class='style-color'>￥{{info.add_moneys}}</span></p>
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
 		<div class='taskSteps'>
			<div class='storeName-regx'>图文评价<span class='lookImg'  @click='lookImg(1)' v-if='info.evaluate_type==2'>查看图片</span></div>
			<div class='commentText'>
				要求评价内容：<span class='commentLabel'>{{info.good_evaluate}}</span>
			</div>
		</div>
		<div class='prove-upBox'>
			<img :src='upimg' alt="" class='upImg' v-if='up'>
			<div v-if='!up'>
				<img src="../../assets/up-three.png" alt="" class='upImg' >
				<p class='up-text'>上传任务完成截图</p>
			</div>
			<input type="file" class='up-inp'  @change="upLoad">
		</div>
		<p class='look'  @click='lookImg(2)'>查看示例</p>
		<div class='style-btn next-btn' @click='submit'>提交</div>
		<div class='taskMiss'>
			<p class='taskMiss-tips'>请按照上面给的信息对该任务购买的商品进行评价</p>
		</div>
		<div class='upMask' v-if='mask' @click='mask=false' >
			<img :src="imgSrc" alt="" class='look-img' >
		</div>
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
		margin-bottom:20px;
	}
	.taskBox.active{
		height:1050px;
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
		height:50px;
		line-height:50px;
	}
	.taskInfo-search-label{
		font-size:30px;
		color:#a0a0a0;
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
	.taskComment .storeName-regx{
		padding:0 20px;
		color:#2C2C2C;
		font-size:30px;
		margin-bottom:20px;
		display:flex;
		justify-content:space-between;
	}
	.taskComment .lookImg{
		color:#1890ff;
		font-size:28px;/*px*/
	}
	.commentText{
		background:#fff;
		padding:20px;
		display:flex;
		margin-bottom:80px;
		color:#9C9C9C;
		font-size:26px;/*px*/
	}
	.commentLabel{
		color:#2C2C2C;
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
	.up-text{
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
	import {taskInfo,task_jie} from '../../api/api';
	export default{
		data(){
			return{
				lookMore:true,
				active:'active',
				mask:false,
				id:this.$route.params.id,
				type:this.$route.params.type,
				info:'',
				imgSrc:'',
				upimg:'',
				up:false,
			}
		},
		mounted(){
			var that=this;
			this.$indicator.open('加载中...');
			taskInfo(this.id,this.type).then(response=>{
				setTimeout(function(){
					that.$indicator.close()
				},500)
				var data=response
				this.info=data.list[0]
			}).catch(error=>{

			})
		},
		methods:{
			// 截图上传
			upLoad(e){
				var that=this;
				var files = e.target.files[0]
				let reader = new FileReader()
       			reader.readAsDataURL(files)
       			reader.onloadend = function () {
       				that.up=true
		            that.upimg=this.result
		        }
			},
			lookAll(){
				this.lookMore=false
			},
			noLook(){
				this.lookMore=true
			},
			lookImg(type){
				if(type==1){
					this.imgSrc=this.info.good_evaluate_pic
				}else{
					this.imgSrc=this.info.example_img
				}
				this.mask=true
			},
			submit(){
				var types=''
				if(this.type==2){
					types=1
				}else{
					types=2
				}
				if(this.upimg){
          this.$indicator.open('加载中...');
          task_jie(this.id,types,this.upimg).then(response=>{
            this.$indicator.close()
            var data=response
            if(data.info==1){
              this.$toast('图片保存失败')
            }else if(data.info==2){
              this.$toast('图片格式有误')
            }else if(data.info==3){
              this.$toast('提交成功，等待审核')
            }else if(data.info==4){
              this.$toast('提交失败，重新提交')
            }
          }).catch(error=>{

          })
        }else{
				  this.$toast('请上传图片')
        }

			}
		}
	}
</script>
