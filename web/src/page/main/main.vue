<template>
	<div class='main'>
		<div class='main-top'>
			<img :src="info.avatar" alt="" class='main-photo' >
			<div class='main-top-right'>
				<div class='main-right-top'>
					<div class='main-right-fl'>
						<p class='main-account'>
              {{info.tao_account}}
              <img src="../../assets/tao-m.png" alt="" class='diff-icon' v-if="info.account_type==1">
              <img src="../../assets/jd-m.png" alt="" class='diff-icon' v-if="info.account_type==2">
              <img src="../../assets/pdd-m.png" alt="" class='diff-icon' v-if="info.account_type==3">
            </p>
						<p class='main-vip'>{{info.grade}}</p>
					</div>
					<!--<div class='main-right-ri'><router-link to='/qian'>每日签到</router-link></div>-->
          <div class='main-right-ri' @click="goXuan">
            <!--<router-link to='/xuan'>-->
            <img src="../../assets/qie.png" alt="" class='qie-icon' >
            切换账号
          <!--</router-link>-->
          </div>
				</div>
				<div class='main-right-bottom'>
					<div class='main-money'>
						<p class='main-money-money'>￥{{info.moneys_balance}}</p>
						<p class='main-money-tips'>可提现佣金</p>
					</div>
					<div class='main-money'>
						<p class='main-money-money'>￥{{info.today_moneys}}</p>
						<p class='main-money-tips'>今日收入佣金</p>
					</div>
				</div>
			</div>
		</div>
		<div class='main-covers'>
			<mt-swipe :auto="5000">
			  <mt-swipe-item v-for='item in vip' :key='item.id'>
			  	<div class='main-covers-box'>
			  		<p class='main-covers-now'>当前：{{info.covers}}</p>
			  		<p class='main-covers-cha'>再获取<span class='main-cover-high' >{{item.cha_covers}}积分</span>升级成为{{item.name}}</p>
			  	</div>
				<mt-progress :value="item.cha_percent" :bar-height="5"></mt-progress>
				<div class='main-covers-number'>
					<p class='main-covers-num'>{{item.num_top}}</p>
					<p class='main-covers-num'>{{item.num_buttom}}</p>
				</div>
			  </mt-swipe-item>
			</mt-swipe>
		</div>
		<div class='main-task'>
			<router-link to='/moneyGuan'>
				<img src="../../assets/money-guan.png" alt="" class='main-task-img' >
			</router-link>	
			<router-link to='/taskBox'>
				<img src="../../assets/task.png" alt="" class='main-task-img' >
			</router-link>
      <div class="task-budge" v-if="task!=0">{{task}}</div>
		</div>
		<div class="main-nav">
			<div class='main-nav-top'>
				<div class='main-nav-list'>
					<router-link to='/mainMessage'>
						<img src="../../assets/main-icon1.png" alt="" class='main-icon' >
						<p class='main-icon-text'>个人资料</p>
					</router-link>
				</div>
				<div class='main-nav-list'>
					<router-link to='/messageBox'>
						<img src="../../assets/main-icon2.png" alt="" class='main-icon' >
						<p class='main-icon-text'>消息提醒</p>
					</router-link>
          <div class="nav-list-budge"  v-if="infoBudge!=0">{{infoBudge}}</div>
				</div>
				<div class='main-nav-list'>
					<router-link to='/share'>
						<img src="../../assets/main-icon3.png" alt="" class='main-icon' >
						<p class='main-icon-text'>推荐分享</p>
					</router-link>
				</div>
			</div>
			<div class='main-nav-bottom'>
				<div class='main-nav-list'>
					<router-link to='/complain'>
						<img src="../../assets/main-icon4.png" alt="" class='main-icon' >
						<p class='main-icon-text'>我要申诉</p>
					</router-link>
				</div>
				<div class='main-nav-list'>
					<router-link to='/study'>
						<img src="../../assets/main-icon5.png" alt="" class='main-icon' >
						<p class='main-icon-text'>基础教学</p>
					</router-link>
				</div>
				<div class='main-nav-list' @click='loginOut'>
					<img src="../../assets/main-icon6.png" alt="" class='main-icon' >
					<p class='main-icon-text'>退出登录</p>
				</div>
			</div>
		</div>
		<div class='main-self'>
			<div class='main-self-fl'>
				<p class='main-self-text'>开启自动接单</p>
				<p class='main-self-texts'>开启自动接单后会以短信的形式向您派单</p>
			</div>
			<div class='main-self-rt'>
				<mt-switch v-model="value" @change='autoTask'></mt-switch>
			</div>
		</div>
	</div>
</template>

<style>
/*top*/
	body{
		/*padding-bottom:140px;*/
	}
	.main{
		padding-bottom:140px;
	}
	.main .main-top{
		height:300px;
		padding:20px;
		background:#fff;
		display:flex;
		padding-top:40px;
		margin-bottom:20px;
	}
	.main .main-photo{
		width:88px;
		height:88px;
		margin-right:20px;
		border-radius:50%;
	}
	.main .main-top-right{
		width:600px;
		position:relative;
	}
	.main .main-right-top{
		display:flex;
		height:88px;
		justify-content:space-between;
	}
	.main .main-account{
		font-size:36px;/*px*/
		color:#2C2C2C;
    display:flex;
    justify-content: center;
    align-items: center;
	}
	.main .main-vip{
		background:linear-gradient(-135deg,rgba(142,121,255,1),rgba(102,146,255,1),rgba(72,162,255,1));
		width:88px;
		height:40px;
		text-align:center;
		line-height:40px;
		font-size:26px; /*px*/ 
		color:#fff;
		border-radius:100px;
	}
	.main .main-right-ri{
		width:180px;
		height:50px;
		text-align:center;
		line-height:50px;
		color:#fff;
		font-size: 26px;
		background:linear-gradient(-135deg,rgba(253,149,10,1),rgba(253,80,2,1));
		border-radius:25px;
		margin-top:19px;
	}
	.main .main-right-ri a{
		color:#fff;
	}
	.main .main-right-bottom{
		display:flex;
		width:600px;
		position:absolute;
		right:0;
		bottom:20px;
	}
	.main .main-money{
		margin-right:120px;
	}
	.main .main-money-money{
		font-size:36px;
		color:#2c2c2c;
	}
	.main .main-money-tips{
		font-size:26px;
		color:#a0a0a0;
	}
/*covers*/
	.main-covers{
		height:180px;
		background:#fff;
		padding:30px;
		padding-bottom:10px;
		margin-bottom:20px;
	}
	.main-covers-box{
		display:flex;
		margin-bottom:4px;
	}
	.main-covers-now{
		width:152px;
		height:36px;
		background:linear-gradient(-135deg,rgba(255,140,24,1),rgba(255,188,33,1));
		border-radius:4px;
		text-align: center;
		line-height:36px;
		color:#fff;
		font-size:26px;
		margin-right:10px;
	}
	.main-covers-cha{
		font-size:30px;
		color:#3E3E3E;
	}
	.main-cover-high{
		color:#FC8F3E;
	}
	#app .mt-progress-progress{
		background:linear-gradient(-135deg,rgba(255,140,24,1),rgba(255,188,33,1));
		border-radius:8px;
	}
	#app .mt-progress-runway{
		border-radius:8px;
	}
	.main-covers-number{
		display:flex;
		justify-content:space-between;
	}
	.main-covers-num{
		font-size:30px;
		color:#2C2C2C;
	}
	#app .mint-swipe-indicator{
		width:30px;
		height:4px;
		background:rgba(252,143,62,0.3);
		border-radius:0;
	}
	#app .mint-swipe-indicator.is-active{
		background:rgba(252,143,62,1);
	}
	.mint-switch-input:checked + .mint-switch-core{
		border-color:#FD950A;
		background: #FD950A;
	}
/*task*/
	.main-task{
		padding:30px;
		display:flex;
		justify-content:space-between;
		background:#fff;
		margin-bottom:20px;
    position:relative;
	}
	.main-task-img{
		width:314px;
		height:160px;
	}
  .task-budge{
    position:absolute;
    top:30px;right:300px;
    width:50px;height:50px;
    border-radius: 50%;
    background-color: red;color:#fff;
    font-size:24px;
    text-align: center;
    line-height: 50px;
  }
/*nav*/
	.main-nav{
		background:#fff;
		margin-bottom:20px;
	}
	.main-nav-top{
		display:flex;
		border-bottom:1px solid #DDDDDD;
	}
	.main-nav-bottom{
		display:flex;
	}
	.main-nav-list{
		height:170px;
		padding:25px 0;
		display:flex;
		justify-content:space-around;
		flex-direction:column;
		flex-grow: 1;
    position: relative;
	}
	.main-icon{
		width:60px;
		height:60px;
		margin:0 auto;
		display:block;
	}
	.main-icon-text{
		font-size:28px;
		color:#2C2C2C;
		text-align:center;
	}
/*self*/
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
  .qie-icon{
    width:28px;
    height:24px;
  }
  .diff-icon{
    width:48px;
    height:44px;
  }
  div.nav-list-budge{
    position:absolute;top:30px;left:90px;
    width:40px;height:40px;border-radius: 20px;
    background-color: red;
    text-align: center;
    line-height: 40px;
    color:#fff;
    font-size:20px;
  }
</style>

<script>
	import {main,she_zhi} from '../../api/api';
	import {login_out} from '../../api/login'
	export default{
		data(){
			return{
				value:false,
				info:'',
				vip:[],
				covers:'',
        flag:1,
        task:'',
        infoBudge:''
			}
		},
		mounted(){
			var that=this
			this.$indicator.open('加载中...');
      main().then(response =>{
        var data=response;
        this.info=data.info;
        this.task=data.task;
        this.infoBudge=data.infomation;
        this.vip=data.grades
        this.covers=Number(data.info.covers)
        setTimeout(function(){
          that.$indicator.close()
        },500)
        if(data.info.on_off==1){
          this.value=false
        }else{
          this.value=true
        }
      }).catch(error =>{

      })
		},
		methods:{
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
				}).catch(error=>{

				})
			},
			loginOut(){
				login_out().then(response=>{

				}).catch(error=>{

				})
				this.$router.push('/login')
			},
      goXuan(){
			  sessionStorage.types=this.info.account_type;
        this.$router.push('/xuan');
      }
		}
	}
</script>
