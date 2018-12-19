<template>
	<div class='qian'>
		<div class='qian-day'>
			<img src="../../assets/qian-bg.png" alt="" class='qian-bg' >
			<p class='qian-day-num'>
				<span class='qian-day-nums' v-for='item in qian_day' :ket='item'>{{item}}</span>
			</p>
		</div>	
		<div class='qian-week'>
			<div class='qian-week-list' v-bind:class="[item.qian?active:'']" v-for='(item,index) in qians' >
				<p class='qian-week-day'>{{item.zhou}}</p>
				<p class='qian-week-covers'>+{{item.huo_covers}}</p>
			</div>
		</div>
		<div class='qian-btn'  @click='qianbtn' v-if='qianBtn==2' >
			已连续签到{{lian_qian}}天
		</div>
		<div class='qian-btn qianBtn' v-else >
			已连续签到{{lian_qian}}天
		</div>
		<div class='qian-rule' @click='rules'>签到规则说明></div>
	</div>
</template>

<style>
	.qian{
		background:#fff;
	}
	.qian-day{
		position:relative;
		height:350px;
		border-bottom:1px solid #eee;
	}
	.qian-bg{
		width:710px;
		height:300px;
		position:absolute;
		left:0;
		right:0;
		margin:auto;
		top:20px;
	}
	.qian-day-num{
		position:absolute;
		left:0;
		right:0;
		margin:auto;
		top:90px;
		width:250px;
		display:flex;
		justify-content:space-between;
	}
	.qian-day-nums{
		font-size:72px;
		color:#FE6476;
		font-weight:bold;
		display:block;
		width:70px;
		text-align:center;
		height:100px;
		line-height:100px;
	}
	.qian-week{
		display:flex;
		justify-content:space-around;
		padding:20px 0;
	}
	.qian-week-day{
		font-size:24px;
		color:#a0a0a0;
		margin-bottom:16px;
		text-align:center;
	}
	.qian-week-covers{
		font-size:36px;
		color:#a0a0a0;
		text-align:center;
	}
	.qian-week-list.active .qian-week-covers{
		color:#FD950A;
	}
	.qian-btn{
		width:260px;
		height:66px;
		background:linear-gradient(-135deg,rgba(253,149,10,1),rgba(253,80,2,1));
		border-radius:100px;
		text-align: center;
		line-height:66px;
		color:#fff;
		font-size:30px;
		margin:0 auto;
		margin-top:65px;
		margin-bottom:20px;
	}
	.qianBtn{
		background:#a0a0a0;
	}
	.qian-rule{
		text-align:center;
		font-size: 26px;
		color:#A0A0A0;
		padding-bottom:20px;
	}
</style>

<script>
	import {qian,qianBtn} from '../../api/api'
	export default{
		data(){
			return{
				active:'active',
				qianBtn:1,
				actives:'qianBtn',
				qians:[],
				lian_qian:'',
				qian_day:[],
				chuan_covers:'',
				lei_day:''
			}
		},
		mounted(){
			var that=this;
			this.$indicator.open('加载中...');
			qian().then(response=>{
				var data=response
        console.log(data);
				this.qianBtn=data.today_qian
				this.qians=data.week
				var qian_lei_day
				if(data.lei_qian_day==0){
					qian_lei_day=[0,0,0]
				}else{
					qian_lei_day=data.lei_qian_day.split('')
					if(1<=qian_lei_day.length<2){
						qian_lei_day.unshift('0','0')
					}else if(2<=qian_lei_day.length<3){
						qian_lei_day.unshift('0')
					}	
				}
				this.qian_day=qian_lei_day
				for(var i=0;i<data.week.length;i++){
					if(data.week[i].today==1){
						this.chuan_covers=data.week[i].huo_covers
					}
				}
				this.lei_day=data.lei_qian_day
				this.lian_qian=data.lian_qian
				setTimeout(function(){
					that.$indicator.close()
				},500)
			}).catch(error=>{
			})
		},
		methods:{
			qianbtn(){
				 qianBtn(this.chuan_covers,this.lei_day,this.lian_qian).then(response=>{
					var data=response
					if(data.today_qian==1){
						this.$toast('签到成功')
						var qian_lei_day
						if(data.lei_qian_day==0){
							qian_lei_day=[0,0,0]
						}else{
							qian_lei_day=data.lei_qian_day.split('')
							if(1<=qian_lei_day.length<2){
								qian_lei_day.unshift('0','0')
							}else if(2<=qian_lei_day.length<3){
								qian_lei_day.unshift('0')
							}	
						}
						for(var i=0;i<this.qians.length;i++){
							if(this.qians[i].today==1){
								this.qians[i].qian=true
							}
						}
						this.qian_day=qian_lei_day
						this.qianBtn=data.today_qian
						this.lian_qian=data.lian_qian
					}else{
						this.$toast('签到失败')
					}
				}).catch(error=>{
				})
			},
			rules(){
				this.$router.push({
					name:'规则协议',
					params:{
						types:1,
					}
				})
			}
		}
	}
</script>
