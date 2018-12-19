<template>
	<div class='details'>
		<div v-html='message'></div>
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
	import {complain_info} from '../../api/api'
	export default{
		data(){
			return{
				id:this.$route.params.id,
				message:''
			}
		},
		mounted(){
			complain_info(this.id).then(response=>{
				var data=response
				this.message=data.info
			}).catch(error=>{

			})
		}
	}
</script>