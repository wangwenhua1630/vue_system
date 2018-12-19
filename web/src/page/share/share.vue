<template>
	<div class='shareBox'>
		<div class='complain-nav'>
			<p class='complain-nav-list'  v-bind:class="[tabIndex==1?active:'']" @click='tabNav(1)' >我的推荐</p>
			<p class='complain-nav-list'  v-bind:class="[tabIndex==2?active:'']" @click='tabNav(2)'>我的名片</p>
		</div>
		<div v-if='tabIndex==1'>
			<div class='shareBox-search'>
				<div class='share-search-box'>
					<div class='share-search-top'>
						<img src="../../assets/search.png" alt="" class='search-icon' >
						<input type="text" class='search-inp' placeholder="请输入推荐人手机号" >
						<p class='search-btn'>查询</p>
					</div>
					<div class='shais' @click='date=true' >{{dates}}<img src="../../assets/i-la.png" alt="" class='shai-icon' ></div>
				</div>
				<div class='shareBox-all-moneys'>
					<div class='shareBox-all-list'>
						<p class='shareBox-all-top'>本月推荐人数：<span class='style-color'>{{user.moth_people}}</span> </p>
						<p class='shareBox-all-bottom'>推荐总人数：{{user.zong_people}}</p>
					</div>
					<div class='shareBox-all-list'>
						<p class='shareBox-all-top'>本月获取佣金：<span class='style-color'>￥{{user.ben_moneys}}</span> </p>
						<p class='shareBox-all-bottom'>总佣金：￥{{user.zong_moneys}}</p>
					</div>
				</div>
			</div>
			<div class='share-list-box'  v-if='list!=1' v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" infinite-scroll-distance='10' infinite-scroll-immediate-check="false">
				<div class='share-list' v-for='item in list' :key='item.id'>
					<div class='main-top'>
						<img :src="item.avatar" alt="" class='main-photo' >
						<div class='main-top-right'>
							<div class='main-right-top'>
								<div class='main-right-fl'>
									<p class='main-account'>{{item.account}}</p>
									<p class='share-time'>推荐时间：{{item.create_at}}</p>
								</div>
								<div class='main-right-ri'>
									<p class='style-color'>本月赚取佣金</p>
									<p  class='style-color'>￥{{item.ben_moneys}}</p>
								</div>
							</div>
							<div class='main-right-bottom'>
								<div class='main-money'>
									<p class='main-money-money'>本月刷单完成数</p>
									<p class='main-money-tips'>{{item.ben_shua_nums}}单</p>
								</div>
								<div class='main-money main-moneys'>
									<p class='main-money-money'>刷单所获得的佣金数</p>
									<p class='main-money-tips'>￥{{item.zong_moneys}}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class='empty' v-else>
				<img src="../../assets/empty.png" alt="" class='empty-icon' >
			</div>
			<mt-popup v-model="date" position="bottom">
				<div class='caozuo'>
					<p class='cancel' @click='cancel' >取消</p>
					<p class='confirm' @click='confirm'>确定</p>
				</div>
			    <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
			</mt-popup>
		</div>
		<div v-if='tabIndex==2'>
			<img :src="weChat" alt="" class='share-bg' >
			<div class='keep-img'>长按保存图片</div>
		</div>
	</div>
</template>

<style>
	#app .shareBox .complain-nav{
		display:flex;
		justify-content:space-around;
		height:90px;
		background:#fff;
		box-shadow:0px 10px 14px 0px rgba(0,0,0,0.05);
		margin-bottom:30px;
		position:relative;
	}
	.complain-nav-list{
		font-size:30px;/*px*/
		color:#A0A0A0;
		line-height:90px;
	}
	.complain-nav-list.active{
		color:#FD950A;
		border-bottom:6px solid #FD950A;
	}
	.shareBox-search{
		background:#fff;
		margin-bottom:30px;
		padding:20px;
	}
	.share-list-box{
		height:600px;
		overflow:auto;
	}
	.share-search-box{
		height:120px;
		border-bottom:1px solid #ddd;
		display:flex;
		justify-content:space-between;
		margin-bottom:30px;
	}
	.share-search-top{
		width:560px;
		height:80px;
		margin-top:20px;
		border-radius:60px;
		background:#F8F8F8;
		padding:0 20px;
		display:flex;
	}
	.search-icon{
		width:30px;
		height:30px;
		display:block;
		margin-top:25px;
		margin-right:10px;
	}
	.search-inp{
		display:block;
		width:80%;
		height:100%;
		font-size:30px;/*px*/
		color:#a0a0a0;
		background:#f8f8f8;
		outline:none;
	}
	.search-inp::-webkit-input-placeholder { /* Chrome/Opera/Safari */
	  	font-size:30px;/*px*/
		color:#a0a0a0;
	}
	.search-inp::-moz-placeholder { /* Firefox 19+ */
	  	font-size:30px;/*px*/
		color:#a0a0a0;
	}
	.search-inp:-ms-input-placeholder { /* IE 10+ */
	  	font-size:30px;/*px*/
		color:#a0a0a0;
	}
	.search-inp:-moz-placeholder { /* Firefox 18- */
	  	font-size:30px;/*px*/
		color:#a0a0a0;
	}
	.search-btn{
		width:120px;
		border-left:1px solid #FD950A;
		color:#FD950A;
		text-align:center;
		font-size:30px;/*px*/
		height:30px;
		line-height:30px;
		margin-top:25px;
	}
	.mint-popup-bottom{
		width:100%;
	}
	.picker-item{
		text-align:center;
	}
	.shais{
		font-size:30px;/*px*/
		color:#a0a0a0;
		width:100px;
		position:relative;
		line-height:120px;
	}
	.shai-icon{
		width:24px;
		height:24px;
		position:absolute;
		right:0;
		top:45px;
	}
	.caozuo{
		width:100%;
		padding:0 20px;
		display:flex;
		justify-content:space-between;
		font-size:30px;
	}
	.cancel{
		height:60px;
		line-height:60px;
		color:#a0a0a0;
	}
	.confirm{
		height:60px;
		line-height:60px;
		color:#FD950A;
	}
	.shareBox-all-moneys{
		width:100%;
		display:flex;
	}
	.shareBox-all-list{
		flex-grow: 1
	}
	.shareBox-all-top{
		font-size:34px;/*px*/
		color:#2C2C2C;
		margin-bottom:10px;
	}
	.shareBox-all-bottom{
		font-size:30px;/*px*/
		color:#a0a0a0;
		margin-bottom:10px;
	}
	.share-list{
		width:710px;
		margin:0 auto;
		background:#fff;
		margin-bottom:30px;
	}
	.main-top{
		height:260px;
		padding:20px;
		background:#fff;
		display:flex;
		margin-bottom:20px;
	}
	.main-photo{
		width:88px;
		height:88px;
		margin-right:20px;
		border-radius:50%;
	}
	.main-top-right{
		width:600px;
		position:relative;
	}
	.main-right-top{
		display:flex;
		height:88px;
	}
	.shareBox .main-account{
		font-size:36px;/*px*/
		color:#2C2C2C;
		margin-bottom:10px;
	}
	.main-vip{
		background:linear-gradient(-135deg,rgba(142,121,255,1),rgba(102,146,255,1),rgba(72,162,255,1));
		width:88px;
		height:40px;
		text-align:center;
		line-height:40px;
		font-size:26px; /*px*/ 
		color:#fff;
		border-radius:100px;
	}
	.shareBox .main-right-fl{
		margin-right:60px;
		width:50%;
	}
	.shareBox .main-right-ri{
		text-align:center;
		color:#fff;
		font-size:30px;
	}
	.main-right-ri a{
		color:#fff;
	}
	.shareBox .main-right-bottom{
		display:flex;
		position:absolute;
		right:0;
		bottom:20px;
		width:100%;
	}
	.shareBox .main-money{
		margin-right:60px;
	}
	.shareBox .main-moneys{
		margin-right:0;
		border-left:1px solid #ddd;
		padding-left:60px;
	}
	.main-money-money{
		font-size:26px;
		color:#a0a0a0;
	}
	.main-money-tips{
		font-size:26px;
		color:#a0a0a0;
	}
	.share-time{
		font-size:24px;
		color:#a0a0a0;
	}
	.picker-item{
		font-size:30px;/*px*/
	}
	.share-bg{
		width:620px;
		height:828px;
		display:block;
		margin:0 auto;
		margin-bottom:88px;
	}
	.keep-img{
		width:660px;
		height:80px;
		border-radius:100px;
		border:2px solid rgba(255,108,0,1);
		margin:0 auto;
		color:#FF6C00;
		font-size:36px;/*px*/
		text-align:center;
		line-height:80px;
	}
</style>

<script>
	import {sharePeople,sharePeople_la,shareEr} from '../../api/api'
	export default{
		data(){
			return{
				tabIndex:'1',
				active:'active',
				date:false,
				dates:'筛选',
				slots:[{
		          flex: 1,
		          values: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
		          className: 'slot1',
		          textAlign: 'right'
		        }],
		        loading:false,
				currentPage:1,
				list:[],
				user:'',
				weChat:''
			}
		},
		mounted(){
			var that=this;
			this.$indicator.open('加载中...');
			sharePeople().then(response=>{
				setTimeout(function(){
					that.$indicator.close()
				},500)
				var data=response
				this.user=data.user
				this.list=data.info
			}).catch(error=>{

			})
		},
		methods:{
			tabNav(index){
				this.tabIndex=index
				if(this.tabIndex==2){
					this.$indicator.open('加载中...');
					shareEr().then(response=>{
						this.$indicator.close()
						var data=response
						this.weChat=data.do
					}).catch(error=>{

					})
				}
			},
			// 筛选
			onValuesChange(e){
				this.dates=e.values[0]
			},
			// 取消
			cancel(){
				this.dates='筛选'
				this.date=false
			},
			// 确定
			confirm(){
				this.date=false
			},
			loadMore(){
				this.loading = true;
				var list=[];
				this.currentPage+=1
				this.$indicator.open('加载中...');
				sharePeople_la(this.currentPage).then(response=>{
					var data=response
					this.loading = false;
					this.$indicator.close()
					if(data.info!=1){
						for(var i=0;i<data.info.length;i++){
							this.list.push(data.info[i])
						}
					}else{
						this.$toast('没有更多数据了')
					}
				}).catch(error=>{

				})
			},
		}
	}
</script>