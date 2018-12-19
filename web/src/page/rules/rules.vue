<template>
	<div class='details'>
		<p class='details-title'>{{message.title}}</p>
		<div>{{message.content}}</div>
	</div>
</template>

<style>
	.details{
		background:#fff;
		height:100%;
	}
	.details-title{
		text-align: center;
		font-size:36px;
		color:#2c2c2c;
		margin-bottom:20px;
	}
	.video{
		width:100%;
	}
</style>

<script>
	import {rules_description} from '../../api/api'
	export default{
		data(){
			return{
				message:'',
				types:this.$route.params.types,
			}
		},
		mounted(){
			rules_description(this.types).then(response=>{
				var data=response
				this.message=data.info
			}).catch(error=>{

			})
		}
	}
</script>