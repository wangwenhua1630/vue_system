<template>
	<div class='dialog-mask'>
		<div class='dialog-box'>
			<p class='dialog-title'>{{options.title}}</p>
			<div class='dialog-inner'>
				{{options.inner}}
			</div>
			<div class='dialog-footer'>
				<span class='cancel' @click='cancel' >取消</span>
				<span class='confirm' @click='submit'>确定</span>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.dialog-mask{
		width:100%;
		height:100%;
		background:rgba(0,0,0,0.5);
		position:fixed;
		left:0;
		top:0;
		z-index:99999;
		display:flex;
		justify-content:center;
		flex-direction:column;
	}
	.dialog-box{
		width:80%;
		border-radius:10px;
		background:#fff;
		margin:0 auto;

	}
	.dialog-title{
		width:100%;
		text-align:center;
		font-size:36px;/*px*/
		color:#2c2c2c;
		line-height:100px;
	}
	.dialog-inner{
		padding:30px;
		font-size:26px;/*px*/
		color:#2c2c2c;
		line-height:1.2;
		margin-bottom:60px;
	}
	.dialog-footer{
		width:100%;
		height:100px;
		line-height:100px;
		text-align:center;
		font-size:26px;
		color:#FD950A;
		border-top:1px solid #eee;
		display:flex;
	}
	.cancel{
		flex-grow: 1;
		color:#A0A0A0;
		text-align: center;
		border-right:1px solid #eee;
	}
	.confirm{
		flex-grow: 1;
		color:#FD950A;
		text-align: center;
	}
</style>

<script>
	export default{
		name: 'dialog',
		data(){
			return{
				resolve: '',
	            reject: '',
	            promise: '', // 保存promise对象
			}
		},
		props:{
	        options:{
	          type:Object,
	          required:true
	        }
      	},
	    methods:{
	    	cancel(){
	    		 this.reject('cancel');
	    	},
	    	submit(){
	    		this.resolve('submit');
	    	},
	    	confirm() {
	            this.promise = new Promise((resolve, reject) => {
	                this.resolve = resolve;
	                this.reject = reject;
	            });
	            return this.promise; //返回promise对象,给父级组件调用
	        }
	    }

	}
</script>