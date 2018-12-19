<template>
	<div class='mainMessage'>
		<div class='mainMessage-box'>
			<div class='mainMessage-title'>基本资料</div>
			<div class='study-list'>
				<img :src="upImgs" class='main-photo' alt="" v-if='!up'>
				<img :src='upimg' alt="" class='main-photo' v-else >
				<p class='study-message'>上传头像<img src="../../assets/icon_in.png" alt="" class='study-icon'></p>
				<input type="file" class='up-inp'  @change="upLoads">
			</div>	
			<div class='study-list' @click='chooses(1)'>
				<p class='study-label'>性别</p>
				<p class='study-message'>{{form.sex}} <img src="../../assets/icon_in.png" alt="" class='study-icon'></p>
			</div>	
			<div class='study-list' @click='chooses(2)'>
				<p class='study-label'>出生年月</p>
				<p class='study-message'>{{form.birthday}} <img src="../../assets/icon_in.png" alt="" class='study-icon'></p>
			</div>	
			<div class='study-list' @click='chooses(3)'>
				<p class='study-label'>所在地区</p>
				<p class='study-message'>{{form.province}}-{{form.city}}-{{form.area}}<img src="../../assets/icon_in.png" alt="" class='study-icon'></p>
			</div>	
			<!-- <div class='study-list'>
				<p class='study-label'>职业</p>
				<p class='study-message'><input type="text" v-model='form.jobs' placeholder="填写" class='mainMessage-inp' ><img src="../../assets/icon_in.png" alt="" class='study-icon'></p>
			</div>	 -->
			<!-- <div class='study-list'>
				<p class='study-label'>每单可承受价格</p>
				<p class='study-message'><input type="number" v-model='form.moneys' placeholder="填写" class='mainMessage-inp' ><img src="../../assets/icon_in.png" alt="" class='study-icon'></p>
			</div>	 -->
			<div class='study-list'>
				<p class='study-label'>淘宝会员名</p>
				<p class='study-message'><input type="text" v-model='form.tao_account' placeholder="支付宝个人信息内查看" class='mainMessage-inp' ><img src="../../assets/icon_in.png" alt="" class='study-icon'></p>
			</div>	
			<div class='study-list' @click='classFlag=true'>
				<p class='study-label'>关注类目</p>
				<p class='study-message' v-if='choose==1'>选择 <img src="../../assets/icon_in.png" alt="" class='study-icon'></p>
				<p class='study-message' v-if='choose==2'>已选择 <img src="../../assets/icon_in.png" alt="" class='study-icon'></p>
			</div>	
			<div class='study-list'>
				<p class='study-label'>提现密码</p>
				<p class='study-message'><input type="password" v-model='form.pay' placeholder="填写" class='mainMessage-inp' > <img src="../../assets/icon_in.png" alt="" class='study-icon'></p>
			</div>	
		</div>
		<div class='tips-title'>提示：为了不影响您每天获取任务赚取佣金，以上信息请务必真实填写（提现密码为提取佣金时所输入的密码，请慎重记录）</div>
		<p class='moneyBind-btn style-btn' @click='next' >下一步</p>
		<mt-popup v-model="flag" position="bottom">
			<div class='caozuo'>
				<p class='cancel' @click='cancel' >取消</p>
				<p class='confirm' @click='confirm'>确定</p>
			</div>
		    <mt-picker :slots="slots" @change="onsexChange"></mt-picker>
		</mt-popup>
		<mt-popup v-model="areaflag" position="bottom">
			<div class='caozuo'>
				<p class='cancel' @click='cancel'>取消</p>
				<p class='confirm' @click='confirm'>确定</p>
			</div>
		    <mt-picker :slots="areaslots"ref="picker" @change="onareaChange"></mt-picker>
		</mt-popup>
		<mt-datetime-picker type="date" ref="picker" v-model="pickerVisible"  year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" 
		:startDate="startDate" @confirm="handleConfirm" >
		</mt-datetime-picker>
		<div class='classBox-mask' v-if='classFlag'>
			<div class='classBox'>
				<div class='classBox-close' @click='classObject(1)'>&times</div>
				<div class='classBox-confirm' @click='classObject(2)'>确定</div>
				<p class='classBox-list' v-bind:class="[item.select?class_active:'']" v-for='(item,index) in classBox' @click='classList(index)' >{{item.name}}</p>
			</div>
		</div>
		<div class='shenhe-mask' v-if='shen_he_status==3'>您的资料审核需要一点时间，请耐心等待，为了不影响您的操作，请审核通过后刷新下您的页面或者重新登录！</div>
	</div>
</template>

<style>
	.moneyBind-btn{
		width:660px;
		height:80px;
		text-align:center;
		line-height:80px;
		color:#fff;
		font-size:36px;
		margin:0 auto;
		margin-top:80px;
		margin-bottom:20px;
	}
	.mainMessage-box{
		background:#fff;
		margin-bottom:30px;
		padding:0 20px;
		padding-top:20px;
	}
	.mainMessage-title{
		font-size:48px;
		color:#FD950A;
		margin-bottom:10px;
	}
	.mainMessage .study-list{
		display:flex;
		height:120px;
		border-bottom:1px solid #ddd;
		justify-content:space-between;
		position:relative;
	}
	.up-inp{
		display:block;
		width:100%;
		height:100%;
		opacity:0;
		position:absolute;
		left:0;
		top:0;
	}
	.study-list a{
		width:100%;
		height:100%;
		display:flex;
		justify-content:space-between;
	}
	.mainMessage .study-label{
		width:50%;
		overflow:hidden;
		white-space:nowrap;
		text-overflow:ellipsis;
		line-height:120px;
		color:#2c2c2c;
		font-size:36px;/*px*/
	}
	.mainMessage .study-message{
		line-height:120px;
		font-size:26px;/*px*/
		color:#a0a0a0;
		position:relative;
		padding-right:20px;
	}
	.study-message a{
		color:#a0a0a0;
	}
	.mainMessage .study-icon{
		width:13px;
		height:24px;
		position:absolute;
		right:0;
		top:48px;
	}
	.mainMessage-inp{
		display:block;
		width:100%;
		height:100%;
		text-align:right;
		font-size:26px;
		color:#A0A0A0;
		border:none;
		outline:none;
	}
	#app .picker-toolbar{
		height:100px;
	}
	#app .mint-datetime-action{
		line-height:100px;
		font-size:26px;/*px*/
	}
	#app .mint-datetime-cancel{
		text-align:left;
		padding-left: 20px;
	}
	#app .mint-datetime-confirm{
		text-align:right;
		padding-right: 20px;
	}
	#app .picker-item{
		font-size:30px;/*px*/
	}
	.mainMessage .classBox{
		width:100%;
		height:800px;
		border-top-left-radius:50px;
		border-top-right-radius:50px;
		background:#fff;
		position:absolute;
		left:0;
		bottom:0;
		display:flex;
		flex-wrap:wrap;
		padding-left:20px;
		padding-top:100px;
		overflow:auto;
	}
	.mainMessage .classBox-list{
		padding:0 15px;
		height:50px;
		line-height:50px;
		background:#eee;
		font-size:26px;/*px*/
		color:#2c2c2c;
		margin-right:20px;
		margin-bottom:20px;
		border-radius:100px;
	}
	.mainMessage .classBox-list.class_active{
		background:linear-gradient(-135deg,rgba(253,149,10,1),rgba(253,80,2,1));
		color:#fff;
	}
	.mainMessage .classBox-close{
		width:100%;
		height:100px;
		position:absolute;
		left:0;
		top:0;
		font-size:70px;
		text-align:left;
		padding-left:20px;
	}
	.classBox-confirm{
		width:120px;
		height:50px;
		text-align:center;
		line-height:50px;
		color:#FD950A;
		border:1px solid #FD950A;
		border-radius:60px;
		font-size:26px;/*px*/
		position:absolute;
		right:30px;
		top:30px;

	}
	.classBox-mask{
		width:100%;
		height:100%;
		position:fixed;
		left:0;
		top:0;
		background:rgba(0,0,0,0.5);
	}
	.main-photo{
		display:block;
		width:100px;
		height:100px;
		border-radius:50%;
	}
	.shenhe-mask{
		width:100%;
		height:100%;
		position:fixed;
		left:0;
		top:0;
		background:rgba(0,0,0,0.5);
		text-align:center;
		display:flex;
		justify-content:center;
		flex-direction:column;
		color:#fff;
		font-size:36px;/*px*/
	}
	.tips-title{
		width:100%;
		text-align:center;
		color:#f00;
		/*color:26px;!*px*!*/
	}
  .mint-msgbox-btn{
    text-align:center;
  }
</style>

<script>
	import cityData from '../../config/city1.json'
	import {mainMessage,info_save} from '../../api/api'
	import { Picker } from 'mint-ui';
	export default{
		data(){
			return{
				form:{
					sex:'选择',
					birthday:'选择',
					address:'选择',
					province:'',
					city:'',
					area:'',
					jobs:'',
					moneys:'',
					lei_type:'',
					pay:'',
					tao_account:''
				},
				class_active:'class_active',
				flag:false,
				up:false,
				areaflag:false,
				pickerVisible:null,
				date_flag:false,
				classBox:[],
				classFlag:false,
				startDate: new Date(1940,1,1),
				type:'',
				upimg:'',
				upImgs:'../../assets/tab-icon5-5.png',
				proIndex:'',
				cityIndex:'',
				shen_he_status:'',
				choose:1,
				slots:[{
		          flex: 1,
		          values: ['男','女'],
		          className: 'slot1',
		          textAlign: 'right'
		        }],
		        areaslots:[{
		        	flex: 1,
		          values: ['请选择'],
		          className: 'slot1',
		          textAlign: 'center'
		        },{
		        	flex: 1,
		          values: ['请选择'],
		          className: 'slot1',
		          textAlign: 'center'
		        },{
		        	flex: 1,
		          values: ['请选择'],
		          className: 'slot1',
		          textAlign: 'center'
		        }]
			}
		},
		components: {
	      'mt-picker': Picker
	    },
		mounted(){
			var that=this;
			this.$indicator.open('加载中...');
			mainMessage().then(response=>{
				var data=response
				this.classBox=data.types
				this.shen_he_status=data.user_pan
				setTimeout(function(){
					that.$indicator.close()
				},500)
				if(data.info!=1){
					this.form=data.info
					if(this.form.sex==1){
						this.form.sex='男'
					}else{
						this.form.sex='女'
					}
					this.upImgs=data.info.avatar
					this.up=false
				}
			}).catch(error=>{

			})
		},
		methods:{
			chooses(type){
				this.type=type
				if(type==1){
					this.flag=true
				}else if(type==2){
					this.$refs.picker.open()
				}else if(type==3){
					this.areaflag=true
					this.initCity()
				}
			},
			// 初始化省市区
			initCity(){
				for(var i=0;i<cityData.length;i++){
					this.areaslots[0].values.push(cityData[i].name)
				}
				for(var i=0;i<cityData[0].city.length;i++){
					this.areaslots[1].values.push(cityData[0].city[i].name)
				}
				for(var i=0;i<cityData[0].city[0].area.length;i++){
					this.areaslots[2].values.push(cityData[0].city[0].area[i])
				}
			},
			// 选择
			onareaChange(picker,values){
				var areas=[];
				var citys=[];
				var pro_indexs=0;
				var city_indexs=0;
				var areas_index=0;
				this.form.province=values[0];
				this.form.city=values[1];
				this.form.area=values[2];
				for(var i=0;i<cityData.length;i++){
					if(cityData[i].name==values[0]){
						this.proIndex=i
						pro_indexs=i
					}
				}
				for(var i=0;i<cityData[pro_indexs].city.length;i++){
					citys.push(cityData[pro_indexs].city[i].name)
					if(cityData[pro_indexs].city[i].name==values[1]){
						city_indexs=i
					}
				}
				picker.setSlotValues(1,citys);
				for(var i=0;i<cityData[pro_indexs].city[city_indexs].area.length;i++){
					areas.push(cityData[pro_indexs].city[city_indexs].area[i])
				}
          		picker.setSlotValues(2,areas);
			},
			// 选择男女
			onsexChange(e){
				this.form.sex=e.values[0]
			},
			classObject(type){
				this.classFlag=false
				if(type==1){
					this.choose=1
					for(var i=0; i<this.classBox.length;i++){
						this.classBox[i].select=false
					}
				}else{
					this.choose=2
				}
			},
			// 选择关注类目
			classList(index){
				this.classBox[index].select=!this.classBox[index].select
			},
			// 头像上传
			upLoads(e){
				var that=this;
				var files = e.target.files[0]
				let reader = new FileReader()
       			reader.readAsDataURL(files)
       			reader.onloadend = function () {
		          that.upimg = this.result
		          that.upImgs=this.result
		          that.up=true
		        }
			},
			// 取消
			cancel(){
				if(this.type==1){
					this.form.sex='选择'
					this.flag=false
				}else if(this.type==3){
					this.form.pro='选择'
					this.form.city='选择'
					this.form.area='选择'
					this.areaflag=false
				}else if(this.type==2){
					this.form.birthday='选择'
				}
				
			},
			// 确定
			confirm(){
				if(this.type==1){
					this.flag=false
				}else if(this.type==3){
					this.areaflag=false
				}
				
			},
			// 转换时间
			formatDate(date) {
			 const y = date.getFullYear()
			 let m = date.getMonth() + 1
			 m = m < 10 ? '0' + m : m
			 let d = date.getDate()
			 d = d < 10 ? ('0' + d) : d
			 return y + '-' + m + '-' + d
			},
			handleConfirm (data) {
			     this.form.birthday =this.formatDate(data);   //获取的时间为时间戳，getdata是自己写的一个转换时间的方法
			},
			// 保存第一步，跳转第二部
			next(){
				var pay_type=[];
				var that=this;
				for(var i=0;i<this.classBox.length;i++){
					if(this.classBox[i].select){
						pay_type.push(this.classBox[i].id)
					}
				}
				if(this.upImgs==''){
					this.$toast('请上传头像')
				}else if(this.form.sex=='选择'){
					this.$toast('请选择性别')
				}else if(this.form.birthday=='选择'){
					this.$toast('请选择生日')
				}else if(this.form.province=='请选择'||this.form.province==''){
					this.$toast('请选择省')
				}else if(this.form.city=='请选择'||this.form.city==''){
					this.$toast('请选择市')
				}else if(this.form.area=='请选择'||this.form.area==''){
					this.$toast('请选择区')
				}else if(this.form.pay==''){
					this.$toast('请填写提现密码')
				}else if(pay_type==''){
					this.$toast('请选择关注类目')
				}else if(this.form.tao_account==''){
					this.$toast('请填写淘宝账号')
				}else{
					info_save(this.upImgs,this.form.sex,this.form.birthday,this.form.province,this.form.area,this.form.city,this.form.jobs,'',pay_type,this.form.pay,this.form.tao_account).then(response=>{
			          	var data=response
			          	if(data.info==3){
			          		setTimeout(function(){
			          			that.$router.push('/moneyBind')
			          		},500)
			          	}else if(data.info==2){
			          		this.$toast('图片格式有误')
			          	}else if(data.info==1){
			          		this.$toast('图片保存失败')
			          	}
			        }).catch(error=>{

			        })
				}
				
			}
		}
	}
</script>
