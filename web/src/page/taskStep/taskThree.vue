<template>
	<div class='taskThree taskOne'>
		<div class='times'>
			<div class='times-fl'>
				此步任务剩余
				<span class='mint'>{{step_minute}}</span> 分
				<span class='mint'>{{step_second}}</span> 秒
			</div>
			<div class='times-fr'>
				<p class='times-fr-text'>任务总时长</p>
				<p class='times-fr-text'>
					<span class='second'>{{all_minute}}</span> 分
					<span class='second'>{{all_second}}</span> 秒
				</p>
			</div>
		</div>
		<div class='taskBox' v-bind:class="[lookMore?active:'']">
			<div class='taskInfo-banner'>
				<img :src="info.img"  class='banner' alt="">
			</div>
			<div class='taskInfo-message'>
				<p class='taskInfo-message-title' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">搜索关键词：{{info.keyword}}</p>
				<p class='taskInfo-list' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">商品单价：¥{{info.good_price}}</p>
        <p class='taskInfo-list taskInfo-search-info' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">商品总价：¥{{info.zong_moneys}}{{info.good_pai}}</p>
				<p class='taskInfo-list' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">佣金：<span class='style-color'>￥{{info.hand_moneys}}</span></p>
        <p class='taskInfo-list taskInfo-search-info' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">商品型号：{{info.kind}}</p>
				<div class='taskInfo-gray'>
					<p class='taskInfo-gray-text' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">任务类型：{{info.task_type}}</p>
					<p class='taskInfo-gray-text' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">入口：{{info.task_ru}}</p>
				</div>
				<p class='taskInfo-gray-text style-color' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">提示：请打开tb手机端App,手动输入以上关键字，并且找到上图的产品，以及店铺。</p>
				<div class='slideUp' @click='lookAll' v-if='lookMore' >查看全部<img src="../../assets/icon-more.png" alt="" class='icon-more' ></div>
				<div class='slideUp' @click='noLook' v-else >收起<img src="../../assets/icon-more.png" alt="" class='icon-mores' ></div>
			</div>
			<div class='taskInfo-message shadow' @click.prevent="notcopy">
				<p class='taskInfo-message-title'>搜索条件</p>
				<div class='taskInfo-search'>
					<p class='taskInfo-search-label'>排序方式</p>
					<p class='taskInfo-search-value'>{{info.sortords}}</p>
				</div>
				<div class='taskInfo-search'>
					<p class='taskInfo-search-label'>价格区间</p>
					<p class='taskInfo-search-value'>{{info.min_price}}-{{info.max_price}}</p>
				</div>
				<div class='taskInfo-search'>
					<p class='taskInfo-search-label'>发货地址</p>
					<p class='taskInfo-search-value'>{{info.ship_address}}</p>
				</div>
				<div class='taskInfo-search'>
					<p class='taskInfo-search-label'>其他说明</p>
					<p class='taskInfo-search-value'>{{info.others}}</p>
				</div>
				<p class='taskInfo-gray-text style-color'>提示：请按照卖家要求按照以上搜索条件搜索产品。</p>
				<div class="shadow_s1"></div>
			</div>
			<div class='taskInfo-message shadow' @click.prevent="notcopy">
				<p class='taskInfo-message-title'>任务说明</p>
				<div class='taskInfo-search-info'>
					{{info.explains}}
				</div>
				<div class="shadow_s1"></div>
			</div>
			<div class='taskInfo-message shadow' v-if='info.requires!=0' @click.prevent="notcopy">
				<p class='taskInfo-message-title'>任务要求</p>
				<div class='taskInfo-tags'>
					<p class='taskInfo-tags-list' v-if='info.requires==2'>拍两家同行不付款</p>
					<p class='taskInfo-tags-list' v-if='info.requires==1'>拍一家同行不付款</p>
				</div>
				<div class="shadow_s1"></div>
			</div>
		</div>
		<div class='taskSteps'>
			<div class='prove-title' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">
				<span class='prove-title-big'>
					第3步
				</span>
				/ 共3步
			</div>
			<div class='storeName-regx' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">提交淘宝订单编号</div>
			<p class='taskMiss-tips' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">请购买付款，在付款之后提交本订单的编号</p>
			<div class='InputRegx'>
				<input type="text" placeholder="在此输入您下单的淘宝订单编号" v-model='number' class='regx-inp' >
				<p class='regxTests' @click='mask=true'>查看示例</p>
			</div>
      <div class='InputRegx'>
        <input type="number"  min="0" placeholder="在此输入您实际付款金额" v-model='numbers' class='regx-inp' >
        <!--<p class='regxTests' @click='masks=true'>查看示例</p>-->
      </div>
		</div>
		<div class='style-btn next-btn' @click='next'>下一步</div>
		<div class='taskMiss'>
			<p class='taskInfo-gray-text style-color' style='padding:0 10px;' @touchstart.prevent="notcopy" @touchend.prevent="notcopy">提示：如果搜索到产品或者出现任何无法进行下去的情况，请点击任务纠错，我们会为您更换新任务。</p>
			<p class='taskMiss-title' @click='miss'><img src="../../assets/miss.png" alt="" class='miss-icon'>任务纠错</p>
			<p class='taskMiss-tips'@touchstart.prevent="notcopy" @touchend.prevent="notcopy">温馨提示：若支付金额与担保金额的差额>50元，在平台将无 法提交订单，遇到这种情况时，请勿在淘宝进行下单操作。</p>
		</div>
		<div class='upMask' v-if='mask' @click='mask=false' >
			<img :src="example_img" alt="" class='look-img' >
		</div>
    <!--<div class='upMask' v-if='masks' @click='masks=false' style="color:#fff;padding:0 30px;font-size: 26px;">-->
      <!--在宝贝详情页，点击右上角选择分享，然后选择复制链接即可得到淘口令，如：【毛衣男士秋冬季宽松2018新款高领针织衫韩版潮流个性线衣外套情侣】情侣】http://m.qobez.top/h.3Pd2dRC 点击链 点击链接，再选择浏览器咑閞；或復·制这段描述￥Iysbb8FQPZk￥后到淘♂寳♀-->
    <!--</div>-->
	</div>
</template>
<style>
	.times{
		width:100%;
		display:flex;
		height:120px;
		background:linear-gradient(-135deg,rgba(253,149,10,1),rgba(253,80,2,1));
	}
	.times-fl{
		width:470px;
		line-height:120px;
		color:#fff;
		font-size:36px;
		font-weight:bold;
		text-align:center;
	}
	.times-fl .mint{
		width:48px;
		height:48px;
		text-align:center;
		line-height:48px;
		border-radius:8px;
		color:#FF6C00;
		background:#fff;
		font-weight:bold;
		display:inline-block;
		font-size:28px;/*px*/
	}
	.times-fr{
		width:280px;
		text-align:center;
		background:rgba(243,243,243,0.5);
	}
	.times-fr-text{
		width:280px;
		text-align:center;
		font-size:24px;
		color:#2C2C2C;
		font-weight:bold;
		margin-top:20px;
		margin-bottom:20px;
	}
	.second{
		width:36px;
		height:36px;
		background:rgba(44,44,44,1);
		border-radius:8px;
		color:#fff;
		text-align:center;
		line-height:36px;
		font-size:22px;/*px*/
	}
	.taskBox{
		overflow:hidden;
	}
	.taskBox.active{
		height:1150px;
	}
	.taskOne .prove-title{
		text-align:left;
		font-size:36px;/*px*/
		color:#FD950A;
		margin-top:20px;
		margin-bottom:10px;
		padding-left:20px;
	}
	.prove-title-big{
		font-size:48px;/*px*/
	}
	.taskInfo-banner{
		width:750px;
		height:750px;
		position:relative;
	}
	.banner{
		width:750px;
		height:750px;
		position:absolute;
		left:0;
		top:0;
	}
	.taskInfo-store{
		position:absolute;
		left:0;
		bottom:0;
		height:80px;
		background:linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,0.3));
		color:#fff;
		font-size:28px;/*px*/
		padding-left:20px;
		line-height:80px;
		width:100%;
	}
	.taskInfo-message{
		background:#fff;
		padding:20px;
		margin-bottom:30px;
    position: relative;
	}
	.taskInfo-list{
		font-size:30px;/*px*/
		color:#2C2C2C;
		text-align:left;
		line-height:50px;
	}
	.taskInfo-gray{
		display:flex;
	}
	.taskInfo-gray-text{
		color:#a0a0a0;
		font-size:26px;/*px*/
	}
	.taskInfo-gray-text:nth-child(1){
		margin-right:50px;
	}
	.taskInfo-message-title{
		font-size:30px;
		color:#2C2C2C;
		font-weight:bold;
		margin-bottom:16px;
	}
	.taskInfo-search{
		display:flex;
		justify-content:space-between;
		height:50px;
		line-height:50px;
	}
	.taskInfo-search-label{
		font-size:30px;
		color:#a0a0a0;
	}
	.taskInfo-search-value{
		font-size:30px;
		color:#2c2c2c;
	}
	.taskInfo-search-info{
		font-size:30px;
    background: yellow;
    color:red;
	}
  div.taskInfo-search-info{
    color:red
  }
	.taskInfo-tags{
		display:flex;
		flex-wrap: wrap;
	}
	.taskInfo-tags-list{
		padding:0 15px;
		height:50px;
		line-height:50px;
		color:#211300;
		font-size:26px;/*px*/
		background:linear-gradient(-135deg,rgba(253,149,10,1),rgba(253,80,2,1));
		border-radius:25px;
		margin-bottom:20px;
		margin-right:30px;
	}
	.slideUp{
		width:100%;
		height:50px;
		text-align:center;
		font-size:22px;
		color:#1890ff;
		margin-top:20px;
		position:relative;
	}
	.icon-more{
		width:30px;
		height:20px;
		position:absolute;
		left:0;
		right:0;
		margin:0 auto;
		bottom:0;
	}
	.icon-mores{
		width:30px;
		height:20px;
		position:absolute;
		left:0;
		right:0;
		margin:0 auto;
		bottom:0;
		transform:rotate(180deg)
	}
	.storeName-regx{
		padding-left:20px;
		color:#2C2C2C;
		font-size:30px;
		margin-bottom:20px;
	}
	.storeName-regx-label{
		color:#a0a0a0;
	}
	.InputRegx{
		height:98px;
		background:#fff;
		padding:0 20px;
		display:flex;
		justify-content:space-between;
		margin-bottom:80px;
	}
	.regxTests{
		width:150px;
		height:50px;
		border-radius:25px;
		border:2px solid rgba(253,149,10,1);
		text-align:center;
		line-height:50px;
		color:rgba(253,149,10,1);
		background:#fff;
		font-size:26px;/*px*/
		margin-top:24px;
	}
	.regx-inp{
		display:block;
		width:500px;
		height:98px;
		line-height:98px;
		border:none;
		outline:none;
		font-size:26px;/*px*/
	}
	.next-btn{
		width:660px;
		height:80px;
		border-radius:100px;
		text-align:center;
		line-height:80px;
		color:#fff;
		font-size:36px;/*px*/
		margin:0 auto;
		margin-bottom:107px;
	}
	.next-btn a{
		color:#fff;
	}
	.taskMiss-title{
		width:100%;
		display:flex;
		justify-content:center;
		font-size:30px;/*px*/
		color:#1890FF;
	}
	.miss-icon{
		width:30px;
		height:30px;
		margin-top:5px;
		margin-right:10px;
		margin-bottom:20px;
	}
	.taskMiss-tips{
		color:#a0a0a0;
		width:600px;
		margin:0 auto;
		margin-bottom:50px;
		font-size:24px;/*px*/
	}
  .taskInfo-list.taskInfo-search-info{color:red}
	/****遮罩岑****/
	.shadow{position:relative;}
	.shadow_s1{position:absolute;top:0;left:0;right:0;bottom:0;background-color: rgba(0,0,0,0);}
	.shadow_s2{position:absolute;top:0;left:0;right:0;bottom:50px;background-color: rgba(0,0,0,0);}
</style>
<script>
	import {task_three,task_three_save} from '../../api/api'
	var three_timer
	export default{
		data(){
			return{
				lookMore:true,
				active:'active',
				id:this.$route.params.id,
				info:'',
				step_minute:'',
				step_second:'',
				all_minute:'',
				all_second:'',
				example_img:'',
				mask:false,
        // masks:false,
				number:'',
        numbers:''
			}
		},
		mounted(){
		  var that=this;
			this.$indicator.open('加载中...');
			if(this.id==undefined){
				this.$toast('此步任务不可逆，请重新开始')
				setTimeout(function(){
					that.$router.push('/taskBox')
				},500)
			}else{
				task_three(this.id).then(response=>{
					this.$indicator.close();
					var data=response
					if(data.guo==1){
						this.$router.push({
							name:'过期任务',
							params:{
								id:this.id,
							}
						})
					}else{
						var that=this;
						this.info=data.info[0]
						this.id=data.info[0].id
						this.example_img=data.example_img.trade_no_img
						three_timer=setInterval(function(){
							data.overs_time=data.overs_time-1
							data.sheng_time=data.sheng_time-1
							that.step_minute=Math.floor(data.overs_time/60)
							that.step_second=data.overs_time%60
							that.all_minute=Math.floor(data.sheng_time/60)
							that.all_second=data.sheng_time%60
							if(that.step_minute<=0&&that.step_second<=0){
								clearInterval(three_timer)
							}
						},1000)
					}
				}).catch(error=>{

				})
			}
		},
		methods:{
			notcopy(){
  				return false;
			},
			lookAll(){
				this.lookMore=false
			},
			noLook(){
				this.lookMore=true
			},
			next(){
				var that=this;
				if(this.number==''){
					this.$toast('请输入商品编号')
				}else if(this.numbers==''){
          this.$toast('请输入实际付款金额')
        }
				else{
					task_three_save(this.id,this.number,this.numbers).then(response=>{
						var data=response
            if(data==''){
              that.$toast('此任务已经过期');
              that.$router.push('/main');
            }else{
              if(data.info==1){
                this.$toast('任务提交成功')
                setTimeout(function(){
                  that.$router.push('/homes')
                },500)
              }else if(data.info==2){
                this.$toast('任务提交失败')
              }else if(data.info==3){
                this.$toast('任务已过期')
              }else if(data.info==11){
                this.$toast('订单编号或价格有误')
              }
              else if(data.info==12){
                this.$toast('支付宝绑定的旺旺号与平台绑定的旺旺号不符')
              }
              // else if(data.info==10){
              //   console.log(1);
              //   this.$toast('淘宝口令有误')
              // }
            }
					}).catch(errror=>{

					})	
				}
				
			},
			// 任务纠错
			miss(){
				this.$router.push({
					name:'纠错任务',
					params:{
						id:this.id,
					}
				})
			}
		}
	}
</script>
