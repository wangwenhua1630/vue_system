<template>
	<div class='taskOne taskTwo' onselectstart="return false"  oncopy="return false;" oncut="return false;">
		<div class='times'>
			<div class='times-fl'>
				此步任务剩余
				<span class='mint'>{{step_minute}}</span> 分
				<span class='mint'>{{step_second}}</span> 秒
			</div>
			<div class='times-fr'>
				<p class='times-fr-text'>任务总时长</p>
				<p class='times-fr-text'>
					<span class='second'>{{all_minute}}</span> 分
					<span class='second'>{{all_second}}</span> 秒
				</p>
			</div>
		</div>
		<div class='taskBox' v-bind:class="[lookMore?active:'']">
			<div class='taskInfo-banner'>
				<img :src="info.img"  class='banner' alt="">
			</div>
			<div class='taskInfo-message'>
				<p class='taskInfo-message-title' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">搜索关键词：{{info.keyword}}</p>
				<p class='taskInfo-list' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">商品单价：¥{{info.good_price}}</p>
        <p class='taskInfo-list taskInfo-search-info' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">商品总价：¥{{info.zong_moneys}}{{info.good_pai}}</p>
				<p class='taskInfo-list' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">佣金：<span class='style-color'>￥{{info.hand_moneys}}</span></p>
        <p class='taskInfo-list taskInfo-search-info' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">商品型号：{{info.kind}}</p>
				<div class='taskInfo-gray'>
					<p class='taskInfo-gray-text' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">任务类型：{{info.task_type}}</p>
					<p class='taskInfo-gray-text' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">入口：{{info.task_ru}}</p>
				</div>
				<p class='taskInfo-gray-text style-color' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">提示：请打开tb手机端App,手动输入以上关键字，并且找到上图的产品，以及店铺。</p>
				<div class='slideUp' @click='lookAll' v-if='lookMore' >查看全部<img src="../../assets/icon-more.png" alt="" class='icon-more' ></div>
				<div class='slideUp' @click='noLook' v-else >收起<img src="../../assets/icon-more.png" alt="" class='icon-mores' ></div>
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
				<div class="shadow_s1"></div>
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
		</div>
		<div class='taskSteps'>
			<div class='prove-title' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">
				<span class='prove-title-big'>
					第2步
				</span>
				/ 共3步
			</div>
			<div class='prove-upBox' v-if='!up'>
				<img src="../../assets/up-three.png" alt="" class='upImg' >
				<p class='up-text' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">请按照要求搜索关键字，如有不明，请看示例</p>
				<input type="file" class='up-inp'  @change="upLoad" multiple="multiple">
			</div>
			<div class='prove-upBox proves-upBoxs' v-if='up'>
				<div class='prove-upBoxs' v-for='item in upimg'>
					<img :src='item' alt=""  class='upImg-upBox' >
					<input type="file" class='up-inp'  @change="upLoad" multiple="multiple">
				</div>
			</div>
			<p class='look' @click='example(1)'>查看示例</p>
			<div class='prove-upBox' v-if='!ups'>
				<img src="../../assets/up-three.png" alt="" class='upImg' >
				<p class='up-text' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">请把商品加入购物车以及收藏，并且进行一段简短的聊天，如有不明，请看示例</p>
				<input type="file" class='up-inp'  @change="upLoads" multiple="multiple">
			</div>
			<div class='prove-upBox proves-upBoxs' v-if='ups'>
				<div class='prove-upBoxs' v-for='item in upimgs'>
					<img :src='item' alt=""  class='upImg-upBox' >
					<input type="file" class='up-inp'  @change="upLoads" multiple="multiple">
				</div>
			</div>
			<p class='look' @click='example(2)'>查看示例</p>
      <div class='prove-upBox' v-if='!payUp'>
        <img src="../../assets/up-three.png" alt="" class='upImg' >
        <p class='up-text' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">请按照要求上传支付金额截图，如有不明，请看示例</p>
        <input type="file" class='up-inp'  @change="payUpLoad" multiple="multiple">
      </div>
      <div class='prove-upBox proves-upBoxs' v-if='payUp'>
        <div class='prove-upBoxs' v-for='item in payImg'>
          <img :src='item' alt=""  class='upImg-upBox' >
          <input type="file" class='up-inp'  @change="payUpLoad" multiple="multiple">
        </div>
      </div>
      <p class='look' @click='example(3)'>查看示例</p>
		</div>
		<div class='upMask' v-if='mask' @click='mask=false' >
			<img :src="example_img" alt="" class='look-img' >
		</div>
		<div class='style-btn next-btn' @click='next'>下一步</div>
		<div class='taskMiss' >
			<p class='taskInfo-gray-text style-color' style='padding:0 10px;' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">提示：如果搜索到产品或者出现任何无法进行下去的情况，请点击任务纠错，我们会为您更换新任务。</p>
			<p class='taskMiss-title' @click='miss'><img src="../../assets/miss.png" alt="" class='miss-icon'>任务纠错</p>
			<p class='taskMiss-tips' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">温馨提示：若支付金额与担保金额的差额>50元，在平台将无 法提交订单，遇到这种情况时，请勿在淘宝进行下单操作。</p>
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
	}
	.taskBox.active{
		height:1150px;
	}
	.taskOne .prove-title{
		text-align:left;
		font-size:36px;/*px*/
		color:#FD950A;
		margin-top:20px;
		margin-bottom:50px;
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
	.prove-upBoxs{
		width:560px;
		height:300px;
		background:#fff;
		border-radius:10px;
		margin:0 auto;
		margin-bottom:30px;
		overflow:hidden;
		position:relative;
	}
	.taskTwo .proves-upBoxs{
		height:auto;
	}
	.upImg{
		width:200px;
		height:133px;
		display:block;
		margin:0 auto;
		margin-top:60px;
		margin-bottom:20px;
	}
	.upImg-upBox{
		width:100%;
		height:100%;
		display:block;
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
  .taskInfo-list.taskInfo-search-info{color:red}
	/****遮罩岑****/
	.shadow{position:relative;}
	.shadow_s1{position:absolute;top:0;left:0;right:0;bottom:0;background-color: rgba(0,0,0,0);}
	.shadow_s2{position:absolute;top:0;left:0;right:0;bottom:50px;background-color: rgba(0,0,0,0);}
</style>
<script>
	document.oncopy = function(e){
  		e.preventDefault();
	}
	import {task_two,task_two_save} from '../../api/api'
	var two_timer
	export default{
		data(){
			return{
				lookMore:true,
				active:'active',
				mask:false,
				id:this.$route.params.id,
				ups:false,
				upimgs:[],
				up:false,
				upimg:[],
				info:'',
				step_minute:'',
				step_second:'',
				all_minute:'',
				all_second:'',
				store_names:'',
				task_type:'',
				example_img:'',
				example_img1:'',
				example_img2:'',
        payUp:false,
        payImg:[],
        example_img3:''
			}
		},
		mounted(){
			this.$indicator.open('加载中...');
			if(this.id==undefined){
				this.$toast('此步任务不可逆，请重新开始')
				setTimeout(function(){
					that.$router.push('/taskBox')
				},500)
			}else{
				task_two(this.id).then(response=>{
					this.$indicator.close();
					var data=response
					if(data.guo==1){
						this.$router.push({
							name:'过期任务',
							params:{
								id:this.id,
							}
						})
					}else{
						var that=this;
						this.info=data.info[0]
						this.task_type=data.info[0].type
						this.id=data.info[0].id
						this.example_img1=data.example_img.task_img
						this.example_img2=data.example_img.collect_img
            this.example_img3=data.example_img.pay_img
						if(data.user!=1){
							this.upimg=data.user.task_img
							this.up=true
							if(data.user.collect_car_img!=1){
								this.upimgs=data.user.collect_car_img
								this.ups=true
							}
							if(data.user.pay_img!=1){
							  this.payImg=data.user.pay_img;
							  this.payUp=true
              }
						}
						two_timer=setInterval(function(){
							data.overs_time=data.overs_time-1
							data.sheng_time=data.sheng_time-1
							that.step_minute=Math.floor(data.overs_time/60)
							that.step_second=data.overs_time%60
							that.all_minute=Math.floor(data.sheng_time/60)
							that.all_second=data.sheng_time%60
							if(that.step_minute<=0&&that.step_second<=0){
								clearInterval(two_timer)
							}
						},1000)
					}
				}).catch(error=>{

				})
			}
			
		},
		methods:{
			notcopy(){
  				return false;
			},
			lookAll(){
				this.lookMore=false
			},
			noLook(){
				this.lookMore=true
			},
			upLoad(e){
				this.upimg=[];
				var that=this;
				var files = e.target.files
				for(var i=0;i<files.length;i++){
					let reader = new FileReader()
	       			reader.readAsDataURL(files[i])
	       			reader.onloadend = function () {
			          //that.upimg.push(this.result)
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
								that.upimg.push(canvas.toDataURL('image/jpeg', 0.7))
				        }
			        }
				}
			},
			upLoads(e){
				var that=this;
				var files = e.target.files
				for(var i=0;i<files.length;i++){
					let reader = new FileReader()
	       			reader.readAsDataURL(files[i])
	       			reader.onloadend = function () {
			          //that.upimgs.push(this.result)
			          that.ups=true
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
								that.upimgs.push(canvas.toDataURL('image/jpeg', 0.7))
				        }
			        }
				}
			},
      payUpLoad(e){
        var that=this;
        var files = e.target.files
        for(var i=0;i<files.length;i++){
          let reader = new FileReader()
          reader.readAsDataURL(files[i])
          reader.onloadend = function () {
            //that.upimgs.push(this.result)
            that.payUp=true
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
              that.payImg.push(canvas.toDataURL('image/jpeg', 0.7))
            }
          }
        }
        console.log(that.payImg);
        console.log(e);
      },
			example(type){
				this.mask=true
				if(type==1){
					this.example_img=this.example_img1
				}else if(type==2){
					this.example_img=this.example_img2
				}else{
          this.example_img=this.example_img3
        }
			},
			next(){
				console.log(this.upimg.length,this.upimgs.length)
				var that=this;
				if(this.upimg.length==0){
					this.$toast('请上传搜索关键字的截图')
				}else if(this.upimgs.length==0&&this.task_type!=1){
					this.$toast('请上传商家要求截图')
				}else if(this.payImg.length==0){
          this.$toast('请上传下单支付截图')
        }else{
					this.$indicator.open('上传中...');
					task_two_save(this.upimg,this.upimgs,this.payImg,this.id).then(response=>{
						var data=response
            this.$indicator.close();
            if(data==''){
              that.$toast('此任务已经过期');
              that.$router.push('/main');
            }else{
              if(data.info==1){
                this.$toast('保存成功')
                setTimeout(function(){
                  that.$router.push({
                    name:'开始任务3',
                    params:{
                      id:that.id,
                    }
                  })
                },500)
              }else if(data.info==2){
                this.$toast('保存失败')
              }else if(data.info==3){
                this.$toast('任务已过期')
              }
            }
					}).catch(error=>{
						
					})	
				}
				
			},
			// 任务纠错
			miss(){
				this.$router.push({
					name:'纠错任务',
					params:{
						id:this.id,
					}
				})
			}
		}
	}
</script>
