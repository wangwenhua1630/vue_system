<template>
	<div class='homes'>
		<div class='home-list'>
			<div class='home-top'>
				<div class='homes-tipss'>
					<p class='tips-lists'>
						<span class='homes-text'>系统通知</span>
					</p>
					<p class='tips-lists'>
							<router-link :to="{path:'/notic',query:{type:2}}">查看更多</router-link>
					</p>
				</div>	
				<div class='home-notic'>
					<p class='home-notic-list' @click='noticmessages' v-for='item in infoList' :key='item.id' >{{item.title}}</p>
				</div>
				<div class='zhuanList zhuanLists'>
					<div class='zhuan-list-box'>
							<div class='homes-tipss'>
							<p class='tips-lists'>
								<span class='homes-text'>超时转账</span>
								<span class='homes-labels homes-labelss'>超时转账：{{info.overTimeTransferCount}}</span>
							</p>
						</div>	
						<div class='homes-btn middle-btns'><router-link to='/store/product'>马上处理</router-link></div>
					</div>
					<div class='zhuan-list-box'>
						<div class='homes-tipss'>
							<p class='tips-lists'>
								<span class='homes-text'>账户余额</span>
								<span class='homes-labels'>等待转账：{{info.waitingTransferCount}}</span>
							</p>
						</div>	
						<div class='homes-btn middle-btn'><router-link to='/store/product'>转账</router-link></div>
					</div>
				</div>
			</div>
			<div class='home-bottom'>
				<div class='homes-tipss'>
					<p class='tips-lists'>
						<span class='homes-text'>账户余额</span>
						<span class='homes-labels'>{{info.accountPoint}}点</span>
					</p>
					<p class='tips-lists'>
						合作愉快第<span class='tips-color'>{{info.createDateCount}}天</span>
					</p>
				</div>	
				<div class='homes-btn style-btn'><router-link to='/store/recharge'>马上充值</router-link></div>
				<div class='homes-di'>总消费点数　{{info.totalConsumePoint}}点 <span class='cao-tags'><router-link to='/store/ordersMessage'>查看消费详情</router-link></span></div>
			</div>
		</div>
		<div class='home-list'>
			<div class='home-top'>
				<div class='homes-tip'>
					<p class='tips-listss' v-bind:class="[tabIndex==1?active:'']" @click='tab(1)' >昨日任务</p>
					<p class='tips-listss' v-bind:class="[tabIndex==2?active:'']" @click='tab(2)'>过往任务</p>
				</div>	
				<div class='homes-canvers-zuo'>
					<div class='myChart'></div>
					<div class='cao-list'>
						<p class='cao-tags'><router-link to='/task'>查看详情</router-link></p>
						<p class='cao-tags'><router-link to='/comment'>待评价任务</router-link></p>
					</div>
				</div>
			</div>
			<div class='home-bottom'>
				<div class='homes-tipss'>
					<p class='tips-lists'>
						<span class='homes-text'>今日单量</span>
					</p>
					<p class='tips-lists'>
						总发布任务<span class='tips-color'>{{info.totalTaskCount}}条</span>
					</p>
				</div>	
				<p class='home-dan-list'>
					<span class='dan-dian'></span>
					今日可用单量
					<span class='dan-liang'>{{info.usableNum}}条</span>
				</p>
				<p class='home-dan-list'>
					<span class='dan-dians'></span>
					今日已用单量
					<span class='dan-liang'>{{info.usedNum}}条</span>
				</p>
				<p class='home-dan-list'>
					<span class='dan-dianss'></span>
					今日剩余单量
					<span class='dan-liang'>{{info.residueNum}}条</span>
				</p>
				<div class='homes-di homes-dis'>
					<div class='homes-btn style-btn'><router-link to='/send'>开始今日任务</router-link></div>
					<div class='homes-btn middle-btns'><router-link to='/change'>提升单量</router-link></div>
				</div>
			</div>
		</div>
		<div class='home-list'>
			<div class='home-top'>
				<div class='homes-tips'>
					<p class='tips-lists'>
						<span class='homes-text'>今日消费点数</span>
						<span class='homes-labels'>{{info.todayConsumePoint}}点</span>
					</p>
					<p class='tips-lists'>
						<span class='homes-text'>今日消费佣金</span>
						<span class='homes-labels'>￥{{info.todayConsumeMoney}}</span>
					</p>
				</div>	
				<div class='homes-canvers'>
					<div class='myChart'></div>
				</div>
				<div class='homes-cao'>
					<div class='cao-list'>
						<p class='cao-tags' @click='task(3)' >已完成</p>
						<p class='cao-tags' @click='task(2)'>已接手</p>
						<p class='cao-tags' @click='task(7)'>未接手</p>
					</div>
					<div class='cao-list'>
						<p class='cao-tags' @click='task(5)'>报错未完成</p>
						<p class='cao-tags' @click='task(6)'>超时未完成</p>
						<p class='cao-tags'><router-link to='/store/orders'>资金明细</router-link></p>
					</div>
				</div>
			</div>
			<div class='home-bottom'>
				<div class='homes-cao'>
					<p class='homes-messages'>平台资讯</p>
					<div class='zi-box'>
						<div class='zi-list'>
							<router-link :to="{path:'/notic',query:{type:1}}">
								<img src="../../assets/home-icon1.png" alt="" class='home-icon'>
								<p class='zi-text'>审核通知</p>
								<p class='zi-num'>{{info.auditCount}}</p>
							</router-link>
						</div>
						<div class='zi-list'>
							<img src="../../assets/home-icon2.png" alt="" class='home-icon'>
							<p class='zi-text'>新手教程</p>
						</div>
						<div class='zi-list'>
							<img src="../../assets/home-icon3.png" alt="" class='home-icon'>
							<p class='zi-text'>佣金标准</p>
						</div>
						<div class='zi-list'>
							<img src="../../assets/home-icon4.png" alt="" class='home-icon'>
							<p class='zi-text'>客服电话：17376877781</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--**公告详情**-->
   		<el-dialog :title='title' width='60%' :visible.sync="missdialog" >
			<div class='inner-cont' v-html='cont'></div>
		    <span slot="footer" class="dialog-footer">
		       <el-button type='primary' @click="missdialog = false"  size='small'>关闭</el-button>
		    </span>
	    </el-dialog>
	</div>
</template>

<style>
	.homes{
		display:flex;
		justify-content:space-between;
		width:100%;
		height:100%;
	}
	.home-notic{
		height:280px;
		overflow:hidden;
	}
	.home-notic-list{
		width:100%;
		height:50px;
		text-align:left;
		line-height:50px;
		font-size:14px;
		color:rgba(0,0,0,0.85);
		cursor:pointer;
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
	}
	.home-notic-list:hover{
		background:#F5FCFF;
	}
	.home-list{
		width:32%;
	}
	.home-top{
		height:470px;
		background:#fff;
		padding:15px;
		border-radius:4px;
		margin-bottom:20px;
	}
	.home-bottom{
		height:210px;
		background:#fff;
		padding:15px;
		border-radius:4px;
		position:relative;
		margin-bottom:20px;
	}
	.homes-tips{
		display:flex;
	}
	.homes-tipss{
		display:flex;
		justify-content:space-between;
	}
	.homes-tip{
		display:flex;
	}
	.homes-text{
		display:block;
		color:#1890FF;
		font-size:14px;
		margin-bottom:10px;
		text-align:left;
		font-weight:bold;
	}
	.homes-text a{
		color:#1890FF;
	}
	.homes-labels{
		display:block;
		color:#F5222D;
		font-size:24px;
	}
	.homes-labelss{
		color:rgba(0,0,0,0.85);
	}
	.homes-canvers{
		height:300px;
	}
	.homes-canvers-zuo{
		height:300px;
		margin-bottom:10px;
		margin-top:40px;
	}
	.homes-canvers-zuo .myChart{
		width:100%;
	    height:300px;
	}
	.myChart{
	    width:105%;
	    height:300px;
	 }
	 .homes-messages{
	 	color:#1890FF;
	 	font-size:14px;
	 	margin-bottom:6px;
	 	text-align:left;
	 	font-weight:bold;
	 }
	 .cao-list{
	 	display:flex;
	 	margin-bottom:6px;
	 }
	 .cao-tags{
	 	border-radius:50px;
	 	background:#E6F7FF;
	 	border:1px solid #91D5FF;
	 	color:#1890FF;
	 	text-align:center;
	 	margin-right:10px;
	 	font-size:12px;
	 	width:80px;
	 	line-height:20px;
	 	margin-bottom:15px;
	 }
	 .cao-tags a{
		color:#1890FF;
	 }
	 .cao-tags:hover{
	 	background:linear-gradient(-135deg,rgba(53,195,255,1),rgba(24,144,255,1));
	 	color:#fff;
	 }
	 .cao-tags:hover a{
	  color:#fff;
	 }
	 .tips-lists{
	 	font-size:12px;
	 	color:rgba(0,0,0,0.85);
	 	margin-right:50px;
	 }
	 .tips-lists a{
	 	color:rgba(0,0,0,0.85);
	 }
	  .tips-lists:hover a{
	  	color:#1890ff;
	  	border-bottom:1px solid #1890ff;
	  }
	 .tips-listss{
	 	font-size:14px;
	 	color:rgba(0,0,0,0.85);
	 	margin-right:20px;
	 	cursor:pointer;
	 	font-weight:bold;
	 }
	 .tips-listss.active{
	 	color:#1890ff;
	 	border-bottom:2px solid #1890ff;
	 	font-weight:bold;
	 }
	 .tips-color{
	 	color:#F5222D;
	 }
	 .homes-btn{
	 	width:80px;
	 	background:linear-gradient(-135deg,rgba(53,195,255,1),rgba(24,144,255,1));
	 	color:#fff;
	 	font-size:12px;
	 	border-radius:50px;
	 	height:24px;
	 	line-height:24px;
	 	margin-top:14px;
	 	cursor:pointer;
	 	text-align:center;
	 }
	 .homes-btn a{
		color:#fff;
	  }
	  .middle-btn{
	  	background:#FFF1F0;
	  	border:1px solid #FFA39E;
	  }
	  .middle-btn a{
	  	color:#F5222D;
	  }
	  .middle-btns{
	  	background:#E6F7FF;
	  	border:1px solid #91D5FF;
	  }
	  .middle-btns a{
	  	color:#1890ff;
	  }
	 .homes-di{
	 	height:42px;
	 	border-top:1px solid #e8e8e8;
	 	position:absolute;
	 	bottom:0;
	 	width:94%;
	 	line-height:42px;
	 	font-size:14px;
	 	text-align:left;
	 }
	 .homes-di .cao-tags{
		display:inline-block;
		width:100px;
		margin-left:20px;
	 }
	 .homes-dis{
	 	display:flex;
	 }
	 .homes-dis .homes-btn{
		margin-top:10px;
		margin-right:20px;
		width:100px;
	 }
	 .zhuanLists{
	 	border-top:1px dashed #e8e8e8;
	 	padding-top:10px;
	 	display:flex;
	 }
	 .zhuan-list-box{
	 	flex-grow: 1;
	 }
	 .zhuanList{
	 	height:50%;
	 }
	 .home-dan-list{
	 	text-align:left;
	 	font-size:14px;
	 	color:rgba(0,0,0,0.85);
	 	line-height:36px;
	 }
	 .dan-dian{
	 	display:inline-block;
	 	width:10px;
	 	height:10px;
	 	border-radius:50%;
	 	background:#1890ff;
	 	margin-right:10px;
	 }
	 .dan-dians{
	 	display:inline-block;
	 	width:10px;
	 	height:10px;
	 	border-radius:50%;
	 	background:#37CBCB;
	 	margin-right:10px;
	 }
	 .dan-dianss{
	 	display:inline-block;
	 	width:10px;
	 	height:10px;
	 	border-radius:50%;
	 	background:#F2637B;
	 	margin-right:10px;
	 }
	 .dan-liang{
	 	color:#F5222D;
	 	display:inline-block;
	 	margin-left:10px;
	 }
	 .zi-box{
	 	display:flex;
	 	justify-content:space-between;
	 	flex-wrap:wrap;
	 	margin-top:30px;
	 }
	 .zi-list{
	 	display:flex;
	 	width:45%;
	 	margin-bottom:20px;
	 }
	 .zi-box .zi-list a{
	 	display:flex;
	 	width:100%;
	 	height:100%;
	 }
	 .home-icon{
	 	display:block;
	 	width:30px;
	 	height:30px;
	 }
	 .zi-text{
	 	line-height:30px;
	 	text-align:left;
	 	font-size:14px;
	 	color:rgba(0,0,0,0.85);
	 	margin-left:10px;
	 }
	 .zi-num{
	 	width:16px;
	 	height:16px;
	 	border-radius:50%;
		text-align:center;
		line-height:16px;
		color:#fff;
		font-size:12px;
		margin-left:10px;
		background:#F5222D;
		margin-top:7px;
	 }
</style>
<!-- <script src="http://18038000877.ewei.com/portal/19636/DO4Sb8EoYHtydmglgQZoBc5LXfuqTMLR.js"></script> -->
<script>
	import echarts from 'echarts';
	import {homesMessage,previousTasks,businessInfo} from '../../api/home';
	import axios from 'axios';
	export default{
		name:'homes',
		data(){
			return{
				info:'',
				tabIndex:1,
				active:'active',
				missdialog:true,
				title:'',
				cont:'',
				infoList:[]
			}
		},
		methods:{
			noticmessages(){
				this.$router.push('/notic')
			},
			tab(index){
				this.tabIndex=index
				  previousTasks(index).then(response => {
			        const data = response;
			        const task2=[];
		        	const task2s=[];
		        	if(data.msg==1){
		        		for(var item in data.homePage.previousTask){
				        	task2.push(item)
				        	task2s.push(data.homePage.previousTask[item])
				        }
				        let myCharts = echarts.init(document.querySelector('.homes-canvers-zuo .myChart'));
				        myCharts.setOption({
					          tooltip : {
					            trigger: 'axis'
					          },
					          label: {
								    textStyle: {
								        color: 'rgba(0, 0, 0, 0.85)'
								    }
								},
					          calculable : true,
					          xAxis : [
					            {
					              type : 'category',
					              data : task2
					            }
					          ],
					          yAxis : [
					            {
					              type : 'value',
					              axisTick:{
					              	show:false
					              },
					              axisLine:{
					              	show:false
					              },
					              splitLine:{
					              	show:true,
					              	lineStyle:{
					              		ccolor:'#e8e8e8',
					              		type:'dashed',
					              		width:1
					              	}
					              }
					            }
					          ],
					          series : [
					            {
					              name:'',
					              type:'bar',
					              barWidth:30,
					              itemStyle: {   
					                //通常情况下：
					                normal:{  
					　　　　　　　　　　　　//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
					                    color: function (params){
					                        var colorList = ['#1890FF','#37CBCB','#4DCB73','#FAD337'];
					                        return colorList[params.dataIndex];
					                    }
					                }
					            },
					             data:task2s
					            }
					          ]
					        });
		        	}
			      }).catch(error => {
			        reject(error);
			      }); 
			},
			task(index){
				this.$router.push({
                 name:'task',
                  params: {
                    id:index
                  }
              	})
			}
		},
		mounted(){
			businessInfo(1).then(response=>{
				var data=response
				this.title=data.notice.title
				this.cont=data.notice.content
				if(data.notice.content==null){
					this.missdialog=false
				}
			}).catch(error=>{

			})
			 homesMessage().then(response => {
		        const data = response;
		        const task1=[];
		        const task1s=[];
		        const task2=[];
		        const task2s=[];
		         if(data.msg==1){
		            this.info=data.homePage
		            this.infoList=data.homePage.sysMessage
		             for(var item in data.homePage.todayTask){
			        	task1.push(item)
			        	task1s.push(data.homePage.todayTask[item])
			        }
			        for(var item in data.homePage.previousTask){
			        	task2.push(item)
			        	task2s.push(data.homePage.previousTask[item])
			        }
			        let myChart = echarts.init(document.querySelector('.homes-canvers .myChart'));
			        let myCharts = echarts.init(document.querySelector('.homes-canvers-zuo .myChart'));
			        myChart.setOption({
			          tooltip : {
			            trigger: 'axis'
			          },
			          label: {
						    textStyle: {
						        color: 'rgba(0, 0, 0, 0.85)'
						    }
						},
			          calculable : true,
			          xAxis : [
			            {
			              type : 'category',
			              data : ["超时未完成","报错未完成","已接手","已完成","未接手"]
			            }
			          ],
			          yAxis : [
			            {
			              type : 'value',
			              axisTick:{
			              	show:false
			              },
			              axisLine:{
			              	show:false
			              },
			              splitLine:{
			              	show:true,
			              	lineStyle:{
			              		ccolor:'#e8e8e8',
			              		type:'dashed',
			              		width:1
			              	}
			              }
			            }
			          ],
			          series : [
			            {
			              name:'',
			              type:'bar',
			              barWidth:30,
			              itemStyle: {   
			                //通常情况下：
			                normal:{  
			　　　　　　　　　　　　//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
			                    color: function (params){
			                        var colorList = ['#1890FF','#37CBCB','#4DCB73','#FAD337','#F2637B'];
			                        return colorList[params.dataIndex];
			                    }
			                }
			            },
			             data:task1s
			            }
			          ]
			        });
			        myCharts.setOption({
			          tooltip : {
			            trigger: 'axis'
			          },
			          label: {
						    textStyle: {
						        color: 'rgba(0, 0, 0, 0.85)'
						    }
						},
			          calculable : true,
			          xAxis : [
			            {
			              type : 'category',
			              data : task2
			            }
			          ],
			          yAxis : [
			            {
			              type : 'value',
			              axisTick:{
			              	show:false
			              },
			              axisLine:{
			              	show:false
			              },
			              splitLine:{
			              	show:true,
			              	lineStyle:{
			              		ccolor:'#e8e8e8',
			              		type:'dashed',
			              		width:1
			              	}
			              }
			            }
			          ],
			          series : [
			            {
			              name:'',
			              type:'bar',
			              barWidth:30,
			              itemStyle: {   
			                //通常情况下：
			                normal:{  
			　　　　　　　　　　　　//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
			                    color: function (params){
			                        var colorList = ['#1890FF','#37CBCB','#4DCB73','#FAD337'];
			                        return colorList[params.dataIndex];
			                    }
			                }
			            },
			             data:task2s
			            }
			          ]
			        });
		         }
		      }).catch(error => {
		        reject(error);
		      }); 
	     }
	}
</script>