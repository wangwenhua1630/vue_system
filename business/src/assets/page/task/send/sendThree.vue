<template>
	<div class='three'>
		<div>
			<p class='sendTwo-title'  >定价类型
				<el-radio v-model="radio" label="1" class='radios' @change='xings' >单型号</el-radio>
  				<el-radio v-model="radio" label="2" @change='xings'>多型号</el-radio>
				<el-button type='primary' round size='mini' class='send-btn style-btn'  @click='addTable' v-if='radio==2' >新增</el-button> 
			</p>
			<el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark"  style="width: 100%" border header-row-class-name="table-header" class='tables' >
	            <el-table-column prop="type" label="商品单价"  header-align="center">
	             <template slot-scope="scope">
	                <el-input type='number' size='small' v-model='scope.row.pro_money' @blur='dan(scope.$index)' ></el-input>
	              </template>
	            </el-table-column>
	            <el-table-column label="快递费(选填)" header-align="center"   >
	              <template slot-scope="scope">
	                <el-input type='text' size='small' v-model='scope.row.kuaidi' @blur='kuai(scope.$index)'></el-input>
	              </template>
	            </el-table-column>
	            <el-table-column label="指定型号" header-align="center"   >
	              <template slot-scope="scope">
	                <el-input type='text' size='small' v-model='scope.row.pro_types'></el-input>
	              </template>
	            </el-table-column>
	            <el-table-column label="拍下件数" header-align="center"  >
	              <template slot-scope="scope">
	                <el-input v-model="scope.row.pro_num" size='small' @blur='jian(scope.$index)'></el-input>
	              </template>
	            </el-table-column>
	            <el-table-column  label="任务数量"   header-align="center"  width='160' >
	              <template slot-scope="scope">
	              	<el-input-number v-model='scope.row.task_num' size='small' :min="0" @change='tasks(scope.$index)' ></el-input-number>
	              </template>
	            </el-table-column>
	            <el-table-column  label="单任务成交金额"  prop='task_money' header-align="center">
	            </el-table-column>
	            <el-table-column  label="单任务佣金"  prop='task_yong' header-align="center">
	            </el-table-column>
	            <el-table-column  label="任务快递费" prop='task_kuai'  header-align="center">
	            </el-table-column>
	            <el-table-column  label="合计" prop='all'  header-align="center">
	            </el-table-column>
	            <el-table-column label="操作"  header-align="center">
	              <template slot-scope="scope">
	                <el-button type="danger" plain round size="mini"  @click='del(scope.$index)'>删除</el-button>
	              </template>
	            </el-table-column>
	        </el-table>
	        <ul class='all-money'>
	        	<li class='all-list'>成交总金额：{{money_all}}元</li>
	        	<li class='all-list'>佣金总金额：{{yong_all}}元</li>
	        	<li class='all-list'>快递费总金额 ：{{all_kuais}}元</li>
	        	<li class='all-list'>合计：{{all}}元</li>
	        </ul>
		</div>
		<div>
			<p class='sendTwo-title'  >发布时间
				<el-radio v-model="radios" label="1" class='radios' @change='changefa' >立即发布</el-radio>
  				<el-radio v-model="radios" label="2" @change='changefa'>今天平均发布</el-radio>
			</p>
			<el-table  ref="multipleTable" :data="tableDatas" tooltip-effect="dark"  style="width: 100%" border header-row-class-name="table-header" class='tables' >
	            <el-table-column prop="type" label="日期（剩余可发布数）"  header-align="center">
	             <template slot-scope="scope">
	                2.10（20）
	              </template>
	            </el-table-column>
	            <el-table-column label="任务数"  prop='task_nums' header-align="center" >
	            </el-table-column>
	            <el-table-column label="开始时间" header-align="center"   >
	              <template slot-scope="scope">
	                <el-time-select placeholder="起始时间" v-model="scope.row.start_time" :picker-options="{start: '00:00', step: '00:15',end: '23:45',minTime: scope.row.kai_time}" :disabled='disabled' size='small'>
  					</el-time-select>
	              </template>
	            </el-table-column>
	            <el-table-column label="结束时间" header-align="center"  >
		            <template slot-scope="scope">
		            	<el-time-select placeholder="结束时间"  v-model="scope.row.end_time" :picker-options="{start: '00:00', step: '00:15',end: '23:45',minTime: scope.row.start_time}" :disabled='disabled' size='small'>
  						</el-time-select>
		            </template>
	            </el-table-column>
	            <el-table-column  label="超时取消"   header-align="center"  >
	               <template slot-scope="scope">
		            	<el-time-select placeholder="超时取消"  :disabled='disabled' v-model="scope.row.chao_time" :picker-options="{start: '00:00', step: '00:15',end: '23:45',minTime: scope.row.end_time}" size='small'>
  						</el-time-select>
	              </template>
	            </el-table-column>
	        </el-table>
		</div>
        <el-button type='primary' class='next-btn style-btn style-btns' round @click='next' >下一步</el-button>
	</div>
</template>

<script>
	import {mapState} from "vuex";
	import {saveTaskAndPrice} from '../../../api/task';
	export default{
		data(){
			return{
				tableData:[{
	              'pro_money':0,
	              'kuaidi':0,
	              'pro_types':'',
	              'pro_num':0,
	              'task_num':0,
	              'task_money':'',
	              'task_yong':'',
	              'task_kuai':'',
	              'all':''
	            }],
	            tableDatas:[{
	            	today:'',
	            	sheng:'',
	            	task_nums:'',
	            	start_time:'',
	            	end_time:'',
	            	chao_time:'',
	            	kai_time:''
	            }],
	            disabled:true,
	            ids:this.$route.params.id,
	            radio:'1',
	            radios:'1',
	            rowIndex:'',
	            task_number:0, //任务总数
	            task_numbers:0,//任务总数减去填写的任务书
	            money_all:0,
	            yong_all:0,
	            all_kuais:0,
	            all:0,
	            tiaoOne:false, //判断进行下一步的依据
	            tiaoTwo:false //判断进行下一步的依据
			}
		},
        mounted(){
        	var myDate = new Date();//获取系统当前时间
        	var h=myDate.getHours(); //获取小时   
			var m=myDate.getMinutes(); //获取分钟 
        	this.task_type=localStorage.getItem('changeType')
        	this.produect_title=localStorage.getItem('changeTypeTitle')
        	this.task_number=localStorage.getItem('taskNum')
        	this.task_numbers=localStorage.getItem('taskNum')
        	this.tableDatas[0].task_nums=localStorage.getItem('taskNum')
        	this.tableDatas[0].kai_time=h+':'+m
        },
		methods:{
			// 增加
			addTable(){
				this.tableData.push({'pro_money':0,'kuaidi':0,'pro_types':'','pro_num':0,'task_num':0,'task_money':'','task_yong':'','task_kuai':'','all':''})
			},
			// 删除
			del(rowIndex){
				if(rowIndex>0){
					this.task_numbers=this.task_numbers+Number(this.tableData[rowIndex].task_num)
					this.tableData.splice(rowIndex,1)
					this.alls()
				}
			},
			// 商品单价
			dan(indexs){
				this.suan(indexs)
			},
			// 快递费
			kuai(indexs){
				this.suan(indexs)
			},
			// 商品件数
			jian(indexs){
				this.suan(indexs)
			},
			// 任务数量
			tasks(indexs){
				if(this.task_numbers-Number(this.tableData[indexs].task_num)<0){
				 	this.$alert('发布任务第一步所设置的任务数量为'+this.task_number, '该处设置的任务总数必须与之相等。', {
			          confirmButtonText: '关闭',
			          callback: action => {
			            if(this.radio==1){
							this.task_numbers=this.task_number
			            }else{
			            	var task_numberss=this.task_number
			            	for(var i=0;i<this.tableData.length;i++){
								if(i!=indexs){
									task_numberss=task_numberss-Number(this.tableData[i].task_num)
									this.task_numbers=task_numberss
								}
							}
			            }
			            this.tableData[indexs].task_num=0
			            this.suan(indexs)
			          }
			        });
				}else{
					if(this.radio==1){
						this.task_numbers=this.task_number
					}else{
						for(var i=0;i<this.tableData.length;i++){
							if(i!=indexs){
								this.task_numbers=this.task_numbers-Number(this.tableData[i].task_num)
							}
						}
					}
				}
				this.suan(indexs)
			},
			// 发布时间改变
			changefa(e){
				if(e==2){
					this.disabled=false
				}else{
					this.disabled=true
				}
			},
			//选择型号
			xings(e){
				if(e==1){
					this.tableData=[{
		              'pro_money':0,
		              'kuaidi':0,
		              'pro_types':'',
		              'pro_num':0,
		              'task_num':0,
		              'task_money':'',
		              'task_yong':'',
		              'task_kuai':'',
		              'all':''
		            }]
		            this.task_number=3;
		            this.task_numbers=3;
		            this.suan(0)
				}
			},
			// 计算价格
			suan(index){
				// 单任务佣金
				var task_yongs
				if(this.task_type==1||this.task_type==3){
					if(this.tableData[index].pro_money<=0||this.tableData[index].pro_money==''){
						task_yongs=0
					}else if(this.tableData[index].pro_money>0&&this.tableData[index].pro_money<100){
						task_yongs=14
					}else if(this.tableData[index].pro_money>=100&&this.tableData[index].pro_money<200){
						task_yongs=15
					}else if(this.tableData[index].pro_money>=200&&this.tableData[index].pro_money<300){
						task_yongs=16
					}else if(this.tableData[index].pro_money>=300){
						task_yongs=17
					}
				}else if(this.task_type==2){
					if(this.tableData[index].pro_money<=0||this.tableData[index].pro_money==''){
						task_yongs=0
					}else if(this.tableData[index].pro_money>0&&this.tableData[index].pro_money<100){
						task_yongs=15
					}else if(this.tableData[index].pro_money>=100&&this.tableData[index].pro_money<200){
						task_yongs=16
					}else if(this.tableData[index].pro_money>=200&&this.tableData[index].pro_money<300){
						task_yongs=17
					}else if(this.tableData[index].pro_money>=300){
						task_yongs=18
					}
				}
				// 单任务成交金额
				var task_moneys=this.tableData[index].pro_money*this.tableData[index].pro_num
				// 单任务快递费
				var task_kuais=this.tableData[index].kuaidi*this.tableData[index].task_num

				var money_all=0
				var yong_all=0
				var all_kuais=0
				
				for(var i=0;i<this.tableData.length;i++){
					// 成交总金额
					money_all+=this.tableData[i].pro_money*this.tableData[i].pro_num*this.tableData[i].task_num
					// 佣金总金额
					yong_all+=this.tableData[i].task_yong*this.tableData[i].task_num
					// 总快递费
					all_kuais+=this.tableData[i].kuaidi*this.tableData[i].task_num
				}
				
				this.money_all= money_all.toFixed(2)
				this.yong_all=yong_all
				this.all_kuais=all_kuais
				// 合计
				var all=Number(money_all)+Number(yong_all)+Number(all_kuais)
				this.all=all.toFixed(2)
				this.tableData[index].task_yong=task_yongs
				this.tableData[index].task_money=task_moneys
				this.tableData[index].task_kuai=task_kuais
				this.tableData[index].all=Number(task_yongs)+Number(task_moneys)+Number(task_kuais)
			},
			// 删除算总价
			alls(){
				var money_all=0
				var yong_all=0
				var all_kuais=0
				for(var i=0;i<this.tableData.length;i++){
					// 成交总金额
					money_all+=this.tableData[i].pro_money*this.tableData[i].pro_num*this.tableData[i].task_num
					// 佣金总金额
					yong_all+=this.tableData[i].task_yong*this.tableData[i].task_num
					// 总快递费
					all_kuais+=this.tableData[i].kuaidi*this.tableData[i].task_num
				}
				// 合计
				var all=Number(money_all)+Number(yong_all)+Number(all_kuais)

				this.money_all=money_all
				this.yong_all=yong_all
				this.all_kuais=all_kuais
				this.all=all
			},
			// 下一步，检查数量
			next(){
				var tabs=[];
				var allNumbers=0;
				for(var i=0;i<this.tableData.length;i++){
					allNumbers+=this.tableData[i].task_num
					if(this.tableData[i].pro_money<=0){
						 this.$message.error('商品单价必须大于0');
						 break;
					}else if(this.tableData[i].pro_num<=0){
						this.$message.error('拍下件数必须大于0');
						break;
					}else if(this.tableData[i].task_num<=0){
						this.$message.error('任务数量必须大于0');
						break;
					}else{
						this.tiaoOne=true
					}
					tabs.push({goodPrice:this.tableData[i].pro_money,expressPrice:this.tableData[i].kuaidi,
						kind:this.tableData[i].pro_types,aucNum:this.tableData[i].pro_num,taskNum:this.tableData[i].task_num
					})
				}
				if(allNumbers!=this.task_number){
					this.$message.error('定价类型任务数量必须等于任务总数');
					this.tiaoOne=false
				}else{
					this.tiaoOne=true
				}
				if(this.radios==2){
					this.tiaoTwo=false
					if(this.tableDatas[0].start_time==''){
						this.$message.warning('请设置开始时间');
					}else if(this.tableDatas[0].end_time==''){
						this.$message.warning('请设置结束时间');
					}else if(this.tableDatas[0].chao_time==''){
						this.$message.warning('请设置超时取消时间');
					}else{
						this.tiaoTwo=true
					}
				}else{
					this.tiaoTwo=true
				}
				if(this.tiaoOne&&this.tiaoTwo){
					var id={
						id:this.ids,
						taskType:this.task_type
					}
					var price={
						goodsTotalPrice:this.money_all,
						expressPrice:this.all_kuais,
						commissionPrice:this.yong_all
					}
					saveTaskAndPrice(id,price,tabs,this.tableDatas[0].start_time,this.radios,this.tableDatas[0].end_time,this.tableDatas[0].chao_time).then(response => {
				        const data = response;
				        if(data.msg==1){
				        	this.$router.push({
			                 name:'sendFour',
			                  params: {
			                    id:data.task.id
			                  }
			              	})
				        }else if(data.msg==4){
				        	this.$message.error('任务数量不匹配')
				        }else if(data.msg==5){
				        	this.$message.error('请重新填写价格')
				        }
				    }).catch(error => {
				        reject(error);
				    }); 
					//this.$router.push('sendFour')
				}
			}
		}
	}
</script>

<style>
	.three .el-radio+.el-radio{
		margin-left:30px;
	}
	.sendTwo-title{
		text-align:left;
		font-size:16px;
		line-height:50px;
		padding-left:20px;
		border:1px solid #f5f7fa;
		border-bottom:none;
		color:#1890FF;
	}
	.sendTwo-titles{
		font-size:12px;
		color:rgba(0,0,0,0.8);
	}
	.sendTwo-title .send-btn{
		float:right;
		margin-top:10px;
		margin-right:30px;
	}
	.three .tables{
		margin-bottom:0;
	}
  .next-btn{
  	width:300px;
  }
  .style-btns{
  	margin-top:100px;
  }
  .all-money{
  	width:100%;
  	height:60px;
  	line-height:60px;
  	display:flex;
  	justify-content:space-between;
  	border-left:2px solid #f5f7fa;
  	border-bottom:2px solid #f5f7fa;
  	margin-bottom:100px;
  }
  .all-list{
  	flex-grow: 1;
  	border-right:2px solid #f5f7fa;
  }
  .radios{
  	margin-left:100px;
  }
</style>