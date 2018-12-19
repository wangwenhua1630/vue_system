<template>
	<div class='msgBoxs' v-if='msgboxShow'>
		<div class='msgbox-mask'>
			<div class='msgbox'>
				<p class='msgbox-title'>{{title}}</p>
				<div class='msgbox-message'>
					{{message}}
				</div>
				<input type="text" class='msgbox-inp' v-model='inpValue' v-if='showInp' >
				<div class='msgbox-footer'>
					<div class='msgbox-cancel' v-if='showCancelBtn'  @click='close("cancel")' >{{cancelText}}</div>
					<div class='msgbox-confirm' v-if='showConfirmBtn' @click='close("confirm")'>{{confirmText}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
	.msgBoxs{
		width:100%;
		height:100%;
		background:rgba(0,0,0,0.65);
		position:fixed;
		left:0;
		top:0;
		z-index:9999;
	}
	.msgbox-mask{
		width:100%;
		height:100%;
		display:flex;
		justify-content:center;
		flex-direction:column;
	}
	.msgbox{
		width:80%;
		padding:20px;
		background:#fff;
		border-radius:10px;
		position:relative;
		margin:0 auto;
		padding-bottom:80px;
	}
	.msgbox-title{
		width:100%;
		text-align:center;
		font-size:30px;/*px*/
		margin-bottom:30px;
		color:#2c2c2c;
	}
	.msgbox-message{
		width:100%;
		font-size:28px;/*px*/
		color:#2c2c2c;
		line-height:1.2;
		margin-bottom:30px;
	}
	.msgbox-inp{
		width:100%;
		display:block;
		border-radius:6px;
		height:40px;
		line-height:40px;
		padding-left:10px;
		outline:inherit;
	}
	.msgbox-footer{
		width:100%;
		height:80px;
		position:absolute;
		left:0;
		bottom:0;
		display:flex;
		border-top:1px solid #eee;
	}
	.msgbox-cancel{
		flex-grow: 1;
		line-height:80px;
		text-align:center;
		font-size:28px;/*px*/
		color:#a0a0a0;
		border-right:1px solid #eee;
	}
	.msgbox-confirm{
		flex-grow: 1;
		line-height:80px;
		text-align:center;
		font-size:28px;/*px*/
		color:#FD5002;
	}
</style>

<script>
	export default{
		data(){
			return{
				msgboxShow:false,
				title:'提示',
				message:'',
				inpValue:'',
				showInp:false,
				showCancelBtn:'',
				showConfirmBtn:'',
				cancelText:'',
				confirmText:'',
				resolve:'',
				reject:'',
				promise:'',
				model:''
			}
		},
		methods:{
			close(state){
				this.msgboxShow=false
				if(this.model.callback){
					this.model.callback(state)
				}
			}
		}
	}
</script>
