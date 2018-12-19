<template>
	<div class='homes'>
		<mt-swipe :show-indicators="false" class='homes-swiper'>
		  <mt-swipe-item v-for='(item,index) in banner' v-bind:key="index">
		  	<img :src="item.img" alt="" class='banner-img' >
		  </mt-swipe-item>
		</mt-swipe>
		<div class='banner-mask'>
			<div class='year'>{{year}}</div>
			<div class='month'>{{month}}月{{day}}号</div>
		</div>
		<!--<div class='homes-qian'><router-link to='/qian'>每日签到</router-link></div>-->
		<div class='homes-message'>
			<img src="../../assets/homes-icon.png" alt="" class='message-icon'>
			<div class='swiper' v-bind:style="{ top: activeTop+'rem' }" >
				<p v-for='item in message' v-bind:key="item.id" @click='details(item.id)' >{{item.title}}</p>
			</div>
			<p class='message-more' @click='moreMessage'>更多</p>
		</div>
		<div class='homes-ting' v-if='taskWait==false'>
			<p class='homes-task-num'>您今天还剩<span class='style-color task-num-high'>{{jie_ci}}</span>次接取任务的机会</p>
			<p class='task-begin' @click='begin' >开始接单</p>
			<img src="../../assets/homes-line.png" alt="" class='homes-line'>
		</div>
		<div class='homes-ting' v-if='taskWait' >
			<p class='homes-task-num'>前边还有<span class='style-color task-num-high'>{{waitPeople}}</span>位小伙伴在排队</p>
			<div class='c1'>
				<div class='c2'>
					<div class='c3'></div>
				</div>
			</div>
			<p class='task-begin'>等待分配...</p>
			<p class='stop-task'  @click='stopTask' >停止接单</p>
		</div>
		<div class='main-self'>
			<div class='main-self-fl'>
				<p class='main-self-text'>开启自动接单</p>
				<p class='main-self-texts'>开启自动接单后会以短信的形式向您派单</p>
			</div>
			<div class='main-self-rt'>
				<mt-switch v-model="value" @change='autoTask' ></mt-switch>
			</div>
		</div>
		<!-- 匹配成功 -->
		<div class='task-hand-mask' v-if='taskMessage'>
			<div class='task-hand'>
				<p class='task-hand-close' @click='close'>&times</p>
				<img src="../../assets/task-icon.png" alt="" class='homes-task-icon' >
				<p class='task-hand-text'>系统为您匹配到<span class='style-color' >1</span>条新的任务</p>
				<p class='task-hand-look' @click='taskInfo'>查看详情</p>
			</div>
		</div>
		<!-- 匹配失败 -->
		<div class='task-hand-mask' v-if='taskMessages' >
			<div class='task-hand'>
				<p class='task-hand-close' @click='closes'>&times</p>
				<img src="../../assets/task-icon.png" alt="" class='homes-task-icon' >
				<p class='task-hand-text'>没有为您匹配到合适的任务</p>
			</div>
		</div>
    <!--签到图层-->
    <div class="qiandao" v-if="qian!=1&&pan==0">
      <img src="../../assets/qian.png" alt="" class='' style="width:250px;height:325px" @click="qians">
    </div>
	</div>
</template>

<style scoped>
	.homes{
		padding-bottom:80px;
	}
	#app .homes-swiper{
		height:280px;
	}
	.banner-img{
		display:block;
		width:100%;
		height:100%;
	}
	.banner-mask{
		width:220px;
		height:280px;
		background:linear-gradient(-90deg,rgba(0,0,0,0),rgba(0,0,0,0.6));
		position:absolute;
		left:0;
		top:0;
	}
	.year{
		color:#fff;
		font-size:24px;/*px*/
		border-bottom:3px solid #fff;
		width:70px;
		text-align:center;
		margin-left:20px;
		margin-top:100px;
	}
	.month{
		color:#fff;
		font-size:36px;/*px*/
		padding-left: 20px;
	}
	.homes-qian{
		width:180px;
		height:50px;
		text-align:center;
		line-height:50px;
		color:#fff;
		font-size: 26px;/*px*/
		background:linear-gradient(-135deg,rgba(253,149,10,1),rgba(253,80,2,1));
		border-radius:25px;
		position:absolute;
		right:20px;
		top:110px;
	}
	.homes-qian a{
		color:#fff;
	}
	.message-icon{
		width:72px;
		height:72px;
		margin-top:14px;
	}
	.homes-message{
		display:flex;
		padding:0 20px;
		background:#fff;
		margin-bottom:20px;
		height:100px;
		overflow:hidden;
		position:relative;
	}
	.swiper{
		width:560px;
		line-height:100px;
		font-size:30px;
		color:#2C2C2C;
		padding-left:20px;
		transition: all 0.5s linear;
		position:absolute;
		left:92px;
		top:0;
	}
	.message-more{
		font-size:28px;
		color:#A0A0A0;
		height:30px;
		border-left:1px solid #a0a0a0;
		line-height:30px;
		padding-left:10px;
		position:absolute;
		right:20px;
		top:35px;
	}
	.homes-ting{
		width:100%;
		height:540px;
		background:#fff;
		margin-bottom:20px;
		position:relative;
	}
	.homes-task-num{
		text-align:center;
		font-size:36px;/*px*/
		color:#2C2C2C;
	}
	.task-num-high{
		font-size:64px;
	}
	.task-begin{
		width:190px;
		height:190px;
		border-radius:50%;
		background:linear-gradient(-135deg,rgba(253,149,10,1),rgba(253,80,2,1));
		box-shadow:0px 8px 20px 0px rgba(253,92,3,0.4);
		font-size:34px;
		color:#fff;
		text-align:center;
		line-height:190px;
		margin:0 auto;
		margin-top:110px;
	}
	.homes-line{
		width:100%;
		height:52px;
		position:absolute;
		lefT:0;
		bottom:0;
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
	#app .homes .mint-switch-input:checked + .mint-switch-core{
		border-color:#FD950A !important;
		background: #FD950A !important;
	}
	.stop-task{
		width:180px;
		height:60px;
		border-radius:30px;
		border:2px solid #1890ff;
		text-align:center;
		line-height:60px;
		color:#1890ff;
		font-size:26px;/*px*/
		position:absolute;
		left:0;
		right:0;
		margin:0 auto;
		bottom:20px;
	}
	.c1{
		width:310px;
		height:310px;
		border:1px solid rgba(253,149,10,0.5);
		border-radius:50%;
		margin:0 auto;
		display:flex;
		position:absolute;
		left:0;
		right:0;
		margin:auto;
		top:130px;
		justify-content:center;
		flex-direction: column;
		animation:flash 1.5s 0.5s linear infinite;
		-webkit-animation:flash 1.5s 0.5s linear infinite;
		-moz-animation:flash 1.5s 0.5s linear infinite;  
	}
	.c2{
		width:270px;
		height:270px;
		border:1px solid rgba(253,149,10,0.8);
		border-radius:50%;
		margin:0 auto;
		display:flex;
		justify-content:center;
		flex-direction: column;
		animation: flash 1.5s 0.8s linear infinite;
		-webkit-animation:flash 1.5s 0.8s linear infinite;
		-moz-animation:flash 1.5s 0.8s linear infinite;  
	}
	.c3{
		width:230px;
		height:230px;
		border:1px solid rgba(253,149,10,1);
		border-radius:50%;
		margin:0 auto;
		display:flex;
		justify-content:center;
		flex-direction: column;
		animation: flash 1.5s 1.5s linear infinite;
		-webkit-animation:flash 1.5s 1.5s linear infinite;
		-moz-animation:flash 1.5s 1.5s linear infinite;  
	}
	@keyframes flash {
	     0%{opacity:0;}
	    100%{opacity: 1;}
	}
	@-moz-keyframes flash{
	    0%{opacity:0;}
	    100%{opacity: 1;}
	}
	@-webkit-keyframes flash{
	    0%{opacity:0;}
	    100%{opacity:1;}
	}
	.task-hand-mask{
		width:100%;
		height:100%;
		background:rgba(0,0,0,0.6);
		position:fixed;
		left:0;
		top:0;
		display: flex;
		justify-content:center;
		flex-direction:column;
	}
	.task-hand{
		width:600px;
		height:550px;
		border-radius:10px;
		background:#fff;
		margin:0 auto;
		position:relative;
	}
	.task-hand-text{
		text-align:center;
		color:#2C2C2C;
		padding-top:220px;
		font-weight:bold;
		font-size:38px;/*px*/
	}
	.homes-task-icon{
		width:332px;
		height:332px;
		position:absolute;
		left:0;
		right:0;
		margin:auto;
		top:-180px;
	}
	.task-hand-look{
		width:470px;
		height:80px;
		background:linear-gradient(-135deg,rgba(253,149,10,1),rgba(253,80,2,1));
		border-radius:40px;
		text-align: center;
		line-height:80px;
		color:#fff;
		font-size:36px;/*px*/
		margin:0 auto;
		margin-top:100px;
	}
	.task-hand-look a{
		color:#fff;
	}
	.task-hand-close{
		font-size:70px;
		position:absolute;
		right:20px;
		top:0px;
	}
  .qiandao{
    position: fixed;
    top:0;left: 0;right:0;bottom:0;
    background: rgba(0,0,0,.3);
    z-index:100;
    display:flex;
    justify-content: center;
    align-items: center;
  }
</style>

<script>
	import {homes,user_jie,she_zhi,qianBtns} from '../../api/api'
	var timer;
	let waitPeople=Math.floor(Math.random()*10+90)
	export default{
		data(){
			return{
				taskMessage:false,
				taskMessages:false,
				taskWait:false,
				waitPeople:'',
				value:false,
				banner:[],
				message:[],
				jie_ci:0,
				activeTop:0,
				id:'',
				year:'',
				month:'',
				day:'',
        qian:1,
        pan:''
			}
		},
		mounted(){
			this.$indicator.open('加载中...');
			var that=this
			this.waitPeople=Math.floor(Math.random()*10+90)
			homes().then(response=>{
				var data=response
				if(data.user_study==2){
					this.$router.push('/study')
				}else{
					
				setTimeout(function(){
					that.$indicator.close()
				},500)
				var that=this;
				var n=0;
				this.year=data.day[0]
				this.month=data.day[1]
				this.day=data.day[2]
				this.banner=data.info.banner
				this.message=data.news
				this.jie_ci=data.info.jie_nums
        this.qian=data.today_qian
        this.pan=data.user_pan
				if(data.info.on_off==1){
					this.value=false
				}else{
					this.value=true
				}
				// if(data.today_qian!=1&&data.user_pan==0){
				//   console.log(1);
				// 	this.$msgbox({
				// 	  title: '提示',
				// 	  message: '您今天还未签到',
				// 	  callback:function(res){
				// 	    if(res=='confirm'){
				// 	    	// that.$router.push('/qian')
        //         qianBtns().then(response=>{
        //           const data=response;
        //           console.log(data);
        //           if(data==1){
        //             this.$msgbox().close();
        //           }else{
        //             this.$toast('签到失败')
        //           }
        //         }).catch()
				// 	    }
				// 	  }
				// 	})
				// }
				setInterval(function(){
					n++
					if(n==data.news.length){
						n=0
					}
					that.activeTop=-1.3*n
				},2000)
				}
			}).catch(error=>{
			})
		},
		methods:{
			close(){
				this.taskMessage=false
				this.taskWait=false
			},
			closes(){
				this.taskMessages=false
				this.taskWait=false
			},
			begin(){
				var that=this;
				if(this.jie_ci==0){
					this.$toast('您今日的接单次数已用完')
				}else{
					this.taskWait=true
					timer=setInterval(function(){
						that.waitPeople=that.waitPeople-13
						if(that.waitPeople<=0){
							that.waitPeople=0
							user_jie().then(response=>{
								var data=response
								if(data.info==1){
									that.$msgbox({
									  title: '提示',
									  message: '您的任务已经被抢，请短暂等待之后再试。',
									  callback:function(res){
									    that.waitPeople=Math.floor(Math.random()*10+90)
									  }
									})
									that.taskWait=false
								}else if(data.info==8||data.info==3||data.info==4){
								  that.$toast('该账号暂不可接单！')
                  that.waitPeople=Math.floor(Math.random()*10+90)
                  that.taskWait=false
                }
								else{
									that.taskMessage=true
									that.id=data.info.id
								}
							}).catch(error=>{})
							clearInterval(timer)
						}
					},2000)
					if(that.waitPeople<=0){
						clearInterval(timer)
					}	
				}
			},
			autoTask(){
				she_zhi().then(response=>{
					var data=response
					if(data.info==1){
						this.$toast('已取消自动接单')
					}else if(data.info==2){
						this.$toast('设取消失败')
						this.value=true
					}else if(data.info==3){
						this.$toast('已设置自动接单')
					}else if(data.info==4){
						this.$toast('设置自动接单失败')
						this.value=false
					}
				}).catch(error=>{})
			},
			stopTask(){
				var that=this;
				clearInterval(timer)
				this.taskWait=false
				this.waitPeople=Math.floor(Math.random()*10+90)
				setTimeout(function(){
					that.$router.go(0)
				},500)
			},
			details(id){
				this.$router.push({
					name:'详情查看',
					params:{
						id:id
					}
				})
			},
			//任务详情查看
			taskInfo(){
				this.$router.push({
					name:'任务详情',
					params:{
						id:this.id,
						type:1
					}
				})
			},
			// 查看更多
			moreMessage(){
				this.$router.push('/messageBox')
			},
      //签到
      qians(){
			  console.log(1);
        qianBtns().then(response=>{
                    const data=response;
                    console.log(data);
                    if(data==1){
                      this.$toast('签到成功');
                      this.qian=1
                    }else{
                      this.$toast('签到失败')
                    }
                  }).catch()
      }
		}
	}
</script>
