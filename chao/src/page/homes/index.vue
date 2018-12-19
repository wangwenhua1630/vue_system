<template>
	<div class='homes'>
		<div class='home-list'>
			<div class='home-top'>
				<div class='homes-tips'>
					<p class='tips-lists'>
						<span class='homes-text'>刷手在线人数</span>
					</p>
				</div>	
				<div class='homes-canvers'>
					<div class='myChart'></div>
				</div>
        <div class="homes_total">总人数:{{message.handTotalCount}}</div>
			</div>
			<div class='home-bottom'>
				<div class='zhuanList'>
					<div class='homes-tipss'>
						<p class='tips-lists'>
							<span class='homes-text'>账户余额</span>
							<span class='homes-labels'>等待转账：{{message.waitTransferCount}}</span>
						</p>
					</div>	
					<div class='homes-btn middle-btn'><router-link to='/store/product'>转账</router-link></div>
				</div>
				<div class='zhuanList zhuanLists'>
					<div class='homes-tipss'>
						<p class='tips-lists'>
							<span class='homes-text'>超时转账</span>
							<span class='homes-labels homes-labelss'>超时转账：{{message.overTransferCount}}</span>
						</p>
					</div>	
					<div class='homes-btn middle-btns'><router-link to='/store/product'>马上处理</router-link></div>
				</div>
			</div>
		</div>
		<div class='home-list'>
			<div class='home-top'>
				<div class='homes-tips'>
					<p class='tips-lists'>
						<span class='homes-text'>商家在线人数</span>
					</p>
				</div>	
				<div class='homes-canvers homes-shang-canvers'>
					<div class='myChart'></div>
				</div>
        <div class="homes_total">总人数:{{message.merchantTotalCount}}</div>
			</div>
			<div class='home-bottom'>
				<div class='homes-tipss'>
					<p class='tips-lists'>
						<span class='homes-text'>刷手消息管理</span>
					</p>
				</div>	
				<p class='home-dan-list'>
					<span class='dan-dian'></span>
					投诉问题
					<span class='dan-liang'>{{message.handComplainCount}}条</span>
				</p>
				<p class='home-dan-list'>
					<span class='dan-dians'></span>
					转账问题
					<span class='dan-liang'>{{message.handTransferCount}}条</span>
				</p>
				<p class='home-dan-list'>
					<span class='dan-dianss'></span>
					保证金退款
					<span class='dan-liang'>{{message.handDepositCount}}条</span>
				</p>
				<p class='home-dan-list'>
					<span class='dan-dian'></span>
					刷手佣金提现
					<span class='dan-liang'>{{message.handWithdrawCount}}条</span>
				</p>
				<div class='homes-di homes-dis'>
					<div class='homes-btn style-btn'><router-link to='/innerHand'>查看详情</router-link></div>
				</div>
			</div>
		</div>
		<div class='home-list'>
			<div class='home-top'>
				<div class='homes-tip'>
					<p class='tips-lists'>
						<span class='homes-text'>任务详情</span>
					</p>
					<p class='cao-tags'><router-link to='/task'>查看详情</router-link></p>
				</div>	
				<div class='homes-canvers-zuo'>
					<div class='myChart'></div>
				</div>
			</div>
			<div class='home-bottom'>
				<div class='homes-tipss'>
					<p class='tips-lists'>
						<span class='homes-text'>商家消息管理</span>
					</p>
				</div>	
				<p class='home-dan-list'>
					<span class='dan-dian'></span>
					投诉问题
					<span class='dan-liang'>{{message.merchantComplainCount}}条</span>
				</p>
				<p class='home-dan-list'>
					<span class='dan-dians'></span>
					转账问题
					<span class='dan-liang'>{{message.merchantTransferCount}}条</span>
				</p>
				<p class='home-dan-list'>
					<span class='dan-dianss'></span>
					商家单量调整
					<span class='dan-liang'>{{message.merchantTaskNumCount}}条</span>
				</p>
				<p class='home-dan-list'>
					<span class='dan-dian'></span>
					保证金充值退款
					<span class='dan-liang'>{{message.merchantDepositCount}}条</span>
				</p>
				<p class='home-dan-list'>
					<span class='dan-dians'></span>
					商家资金提现
					<span class='dan-liang'>{{message.merchantWithdrawCount}}条</span>
				</p>
				<p class='home-dan-list'>
					<span class='dan-dianss'></span>
					商家/店铺信息审核
					<span class='dan-liang'>{{message.merchantInfoCount}}条</span>
				</p>
				<p class='home-dan-list'>
					<span class='dan-dian'></span>
					商家资金充值
					<span class='dan-liang'>{{message.merchantRechargeCount}}条</span>
				</p>
				<div class='homes-di homes-dis'>
					<div class='homes-btn style-btn'><router-link to='/innerStore'>查看详情</router-link></div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
	.homes{
		display:flex;
		justify-content:space-between;
		width:100%;
		height:100%;
	}
	.home-list{
		width:32%;
	}
	.home-top{
		height:300px;
		background:#fff;
		padding:15px;
		border-radius:4px;
		margin-bottom:20px;
    position:relative;
	}
  .homes_total{position:absolute;bottom:10px;left:20px;color:#1890FF;
    font-size:14px;}
	.home-bottom{
		height:350px;
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
	}
	.homes-labels{
		display:block;
		color:#F5222D;
		font-size:24px;
	}
	.homes-labelss{
		color:rgba(0,0,0,0.85);
	}
	.homes-canvers-zuo .myChart{
		height:240px;
		width:100%;
	}
	.myChart{
	    width:100%;
	    height:200px;
	 }
	 .homes-messages{
	 	color:#1890FF;
	 	font-size:14px;
	 	margin-bottom:6px;
	 	text-align:left;
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
	 	line-height:24px;
	 	margin-bottom:4px;
	 	height:24px;
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
	 	line-height:24px;
	 }
	 .tips-listss{
	 	font-size:14px;
	 	color:rgba(0,0,0,0.85);
	 	margin-right:20px;
	 	cursor:pointer;
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
	 	margin-top:20px;
	 }
	 .zi-list{
	 	display:flex;
	 	width:45%;
	 	margin-bottom:20px;
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
<script>
	import echarts from 'echarts';
	import {homeMessage} from '../../api/api';
	export default{
		name:'homes',
		data(){
			return{
				message:''
			}
		},
		mounted(){
			var store_line=''
			var store_no=''
			var hand_line=''
			var hand_no=''
			var done=[]
			var undone=[]
			homeMessage().then(response=>{
				var data=response
				this.message=data

				store_line=data.merchantOnlineCount
				store_no=data.merchantTotalCount-data.merchantOnlineCount
				hand_line=data.handOnlineCount
				hand_no=data.handTotalCount-data.handOnlineCount
				done=data.taskCount.done
				undone=data.taskCount.undone
	        let myChart = echarts.init(document.querySelector('.homes-canvers .myChart')); //刷手
	        let myCharts = echarts.init(document.querySelector('.homes-canvers-zuo .myChart'));//商家
	        let myChartss = echarts.init(document.querySelector('.homes-shang-canvers .myChart'));
	        myChart.setOption({
	          tooltip : {
	            trigger: 'item',
	            formatter: "{a} <br/>{b}: {c} ({d}%)"
	          },
	          label: {
				    textStyle: {
				        color: 'rgba(0, 0, 0, 0.85)'
				    }
				},
	          calculable : true,
	          series : [
	            {
	              name:'',
	              type:'pie',
	              itemStyle: {   
	                //通常情况下：
	                normal:{  
	　　　　　　　　　　　　//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
	                    color: function (params){
	                        var colorList = ['#37CBCB','#FAD337'];
	                        return colorList[params.dataIndex];
	                    }
	                }
	            },
	             data:[{value:hand_line, name:'在线人数'},
                		{value:hand_no, name:'未在线人数'},]
	            }
	          ]
	        });
	        myChartss.setOption({
	          tooltip : {
	            trigger: 'item',
	            formatter: "{a} <br/>{b}: {c} ({d}%)"
	          },
	          label: {
				    textStyle: {
				        color: 'rgba(0, 0, 0, 0.85)'
				    }
				},
	          calculable : true,
	          series : [
	            {
	              name:'',
	              type:'pie',
	              itemStyle: {   
	                //通常情况下：
	                normal:{  
	　　　　　　　　　　　　//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
	                    color: function (params){
	                        var colorList = ['#1890FF','#36CBCB'];
	                        return colorList[params.dataIndex];
	                    }
	                }
	            },
	             data:[{value:store_line, name:'在线人数'},{value:store_no, name:'未在线人数'},]
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
	              data : ['当天','前14天','前30天']
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
	              		color:'#e8e8e8',
	              		type:'dashed',
	              		width:1
	              	}
	              }
	            }
	          ],
	          series : [
	            {
	              name:'已接手任务',
	              type:'bar',
	              barWidth:30,
	              legendHoverLink:false,
	              itemStyle:{
	              	normal:{  
	                    color:'#37CBCB'
	                }
	              },
	              data:done
	            },
	            {
	              name:'未接手任务',
	              type:'bar',
	              barWidth:30,
	               legendHoverLink:false,
	              itemStyle:{
	              	normal:{  
	                    color:'#F2637B'
	                }
	              },
	              data:undone
	            }
	          ]
	        });
			}).catch(error=>{

			})
	     }
	}
</script>
