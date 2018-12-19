<template>
	<div class='details'>
		<p class='details-title'>{{message.title}}</p>
		<div v-html='message.content'></div>
		<video :src="message.url" class='video' controls="true" v-if='message.url!=1'  ></video>
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
	import {studyDetail} from '../../api/api'
	export default{
		data(){
			return{
				id:this.$route.params.id,
				message:''
			}
		},
		mounted(){
			studyDetail(this.id).then(response=>{
				var data=response
				this.message=data.info
			}).catch(error=>{

			})
		}
	}
</script>