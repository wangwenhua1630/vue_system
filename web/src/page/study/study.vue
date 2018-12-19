<template>
	<div class='study'>
		<div class='study-list' v-for='item in list' :key='item.id' @click='detail(item.id)'>
			<p class='study-label'>{{item.title}}</p>
			<p class='study-message'>查看详情 <img src="../../assets/icon_in.png" alt="" class='study-icon'></p>
		</div>
	</div>
</template>

<style>
	.study{
		background:#fff;
		padding:0 20px;
	}
	.study .study-list{
		display:flex;
		height:120px;
		border-bottom:1px solid #ddd;
		justify-content:space-between;
	}
	.study .study-list a{
		width:100%;
		display:flex;
		justify-content:space-between;
	}
	.study .study-label{
		width:70%;
		overflow:hidden;
		white-space:nowrap;
		text-overflow:ellipsis;
		line-height:120px;
		color:#2c2c2c;
		font-size:36px;/*px*/
	}
	.study .study-message{
		line-height:120px;
		font-size:26px;/*px*/
		color:#a0a0a0;
	}
	.study .study-icon{
		width:13px;
		height:24px;
	}
</style>

<script>
	import {study} from '../../api/api'
	export default{
		data(){
			return{
				list:[]
			}
		},
		mounted(){
			var that=this;
			this.$indicator.open('加载中...');
			study().then(response=>{
				setTimeout(function(){
					that.$indicator.close()
				},500)
				var data=response
				this.list=data.info
			}).catch(error=>{

			})
		},
		methods:{
			detail(id){
				this.$router.push({
					name:'新手引导',
					params:{
						id:id
					}
				})
			}
		}
	}
</script>