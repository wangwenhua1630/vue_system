<template>
	<div class='first'>
		<router-view></router-view>
		<mt-tabbar v-model="selected" :fixed='true'>
		  <mt-tab-item id="1">
		  	<img slot="icon" src="../../assets/tab-icon1.png"  v-if='selected==1' class='tab-icon' >
		    <img slot="icon" src="../../assets/tab-icon1-1.png" class='tab-icon' v-else>
		    首页
		  </mt-tab-item>
		  <mt-tab-item id="2">
		  	<img slot="icon" src="../../assets/tab-icon5.png" class='tab-icon' v-if='selected==2' >
		    <img slot="icon" src="../../assets/tab-icon5-5.png"class='tab-icon'  v-else>
		    个人中心
		  </mt-tab-item>
		</mt-tabbar>
	</div>
</template>
<script>
	export default{
		name:'first',
		data(){
			return{
				selected:'1'
			}
		},
		mounted(){
			localStorage.getItem('selected')
			this.selected=localStorage.getItem('selected')
		},
		watch:{
			selected(e){
				if(e==1){
					this.$router.push('/homes')
				}else{
					this.$router.push('/main')
				}
			} 
		}
	}
</script>
<style>
	.first{
		height:100%;
	}

	#app .mint-tabbar{
		height:97px;
		background:#fff;
		box-shadow:0px -10px 14px 0px rgba(0,0,0,0.05);
	}
	#app .mint-tab-item-icon{
		height:54px;
		width:54px;
	}
	.mint-tab-item-label{
		text-align:center;
		font-size:20px;/*px*/
	}
	.mint-tab-item{
		color:#2E2E2E;
	}
	#app .mint-tabbar>.mint-tab-item.is-selected{
		color:#FD950A;
		background:none;
	}
	#app .tab-icon{
		width:50px;
		height:50px;
	}
</style>