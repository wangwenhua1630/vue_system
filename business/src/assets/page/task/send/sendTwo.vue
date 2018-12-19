<template>
	<div class='sendTwo'>
		<div>
			<p class='sendTwo-title' v-if='task_type==1' >来路设置<el-button type='primary' round size='mini' class='send-btn style-btn'  @click='addTable(1)'>新增</el-button> </p>
			<p class='sendTwo-title' v-if='task_type==2'>加入购物车<el-button type='primary' round size='mini' class='send-btn style-btn'  @click='addTable(1)'>新增</el-button> </p>
			<p class='sendTwo-title' v-if='task_type==3'>商品复购<span class='sendTwo-titles' >(针对商品--指定买过该商品的买手接手任务)</span><el-button type='primary' round size='mini' class='send-btn style-btn'  @click='addTable(1)'>新增</el-button> </p>
			<el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark"  style="width: 100%" border header-row-class-name="table-header" class='tables' >
	            <el-table-column prop="type" label="流量入口"  header-align="center" show-overflow-tooltip>
	            	 <template slot-scope="scope">
	            	 	<p>淘宝APP自然搜索</p>
	            	 </template>
	            </el-table-column>
	            <el-table-column label="关键字" header-align="center"   >
	              <template slot-scope="scope">
	                <el-input type='text' size='small' v-model='scope.row.keyword' placeholder='请设置关键字' @blur='blur(scope.$index,1)' ></el-input>
	              </template>
	            </el-table-column>
	            <el-table-column label="复购周期" header-align="center" v-if='task_type==3'>
	              <template slot-scope="scope">
	                <el-select v-model="scope.row.repurCycle" placeholder="请选择复购周期"  @change='repeat(scope.row.repurCycle,scope.$index,1)' >
				       <el-option :label="item.cycleStr" :value="item.id" v-for='item in options' :key='item.id' ></el-option>
				    </el-select>
	              </template>
	            </el-table-column>
	            <el-table-column  label="潜在用户"  prop='potentialUser' header-align="center" v-if='task_type==3'>
	            </el-table-column>
	            <el-table-column  label="数量"   header-align="center">
	              <template slot-scope="scope">
	                <el-input type='text' size='small' v-model='scope.row.num'></el-input>
	              </template>
	            </el-table-column>
	            <el-table-column label="其他搜索条件"  show-overflow-tooltip header-align="center" >
	              <template slot-scope="scope">
	                 <el-button type="primary" plain round size="mini"  @click='setting(scope.$index,1)'  >设置</el-button>
	              </template>
	            </el-table-column>
	            <el-table-column label="操作"  show-overflow-tooltip header-align="center"width='140' >
	              <template slot-scope="scope">
	                <el-button type="danger" plain round size="mini" @click='del(scope.$index,1)'>删除</el-button>
	              </template>
	            </el-table-column>
	        </el-table>
		</div>
		<div v-if='task_type!=1'>
			<p class='sendTwo-title' v-if='task_type==2'>收藏商品
				<el-button type='primary' round size='mini' class='send-btn style-btn'  @click='addTable(2)'>新增</el-button> 
			</p>
			<p class='sendTwo-title' v-if='task_type==3' >店铺复购<span class='sendTwo-titles' >(针对店铺--指定买过该店铺商品的买手接手任务)</span>
				<el-button type='primary' round size='mini' class='send-btn style-btn'  @click='addTable(2)'>新增</el-button> 
			</p>
			<el-table ref="multipleTable" :data="tableDatas" tooltip-effect="dark" style="width: 100%" border header-row-class-name="table-header" class='tables' >
	            <el-table-column prop="type" label="流量入口"  header-align="center" show-overflow-tooltip>
	            	<template slot-scope="scope">
	            	 	<p>淘宝APP自然搜索</p>
	            	 </template>
	            </el-table-column>
	            <el-table-column label="关键字" header-align="center"   >
	              <template slot-scope="scope">
	                <el-input type='text' size='small' v-model='scope.row.keyword' placeholder='请设置关键字' @blur='blur(scope.$index,2)' ></el-input>
	              </template>
	            </el-table-column>
	            <el-table-column label="复购周期" header-align="center" v-if='task_type==3' >
	              <template slot-scope="scope">
	                <el-select v-model="scope.row.repurCycle" placeholder="请选择复购周期"  @change='repeat(scope.row.repurCycle,scope.$index,2)'>
				      <el-option :label="item.cycleStr" :value="item.id" v-for='item in options' :key='item.id' ></el-option>
				    </el-select>
	              </template>
	            </el-table-column>
	            <el-table-column  label="潜在用户"  prop='potentialUser' header-align="center" v-if='task_type==3'>
	            </el-table-column>
	            <el-table-column  label="数量"   header-align="center">
	              <template slot-scope="scope">
	                <el-input type='text' size='small' v-model='scope.row.num'></el-input>
	              </template>
	            </el-table-column>
	            <el-table-column label="其他搜索条件"  show-overflow-tooltip header-align="center" >
	              <template slot-scope="scope">
	                 <el-button type="primary" plain round size="mini" @click='setting(scope.$index,2)' >设置</el-button>
	              </template>
	            </el-table-column>
	            <el-table-column label="操作"  show-overflow-tooltip header-align="center"width='140' >
	              <template slot-scope="scope">
	                <el-button type="danger" plain round size="mini" @click='del(scope.$index,2)'>删除</el-button>
	              </template>
	            </el-table-column>
	        </el-table>
		</div>
        <el-button type='primary' class='next-btn style-btn' round @click='next' >下一步</el-button>
        <!-- 其他搜索条件-->
	    <el-dialog title='其他搜索条件'  :visible.sync="setdialog" width='50%' >
	        <el-form :form='form' label-width="80px"  size="small"  >
	        	<el-form-item label="排序方式">
				    <el-checkbox-group v-model="form.sortord">
				      <el-checkbox label="综合" name="sortord"></el-checkbox>
				      <el-checkbox label="销量" name="sortord"></el-checkbox>
				      <el-checkbox label="价格从高到低" name="sortord"></el-checkbox>
				      <el-checkbox label="价格从低到高" name="sortord"></el-checkbox>
				      <el-checkbox label="包邮" name="sortord"></el-checkbox>
				      <el-checkbox label="天猫" name="sortord"></el-checkbox>
				      <el-checkbox label="消费者保障" name="sortord"></el-checkbox>
				      <el-checkbox label="全球购" name="sortord"></el-checkbox>
				      <el-checkbox label="公益宝贝" name="sortord"></el-checkbox>
				      <el-checkbox label="淘金币抵钱" name="sortord"></el-checkbox>
				      <el-checkbox label="7天内退货" name="sortord"></el-checkbox>
				      <el-checkbox label="货到付款" name="sortord"></el-checkbox>
				      <el-checkbox label="花呗分期" name="sortord"></el-checkbox>
				    </el-checkbox-group>
	        	</el-form-item>
	        	<el-form-item label="价格区间">
	        		<el-col :span="11">
				      <el-input v-model='form.minPrice'></el-input>
				    </el-col>
				    <el-col class="line" :span="2">-</el-col>
				    <el-col :span="11">
				      <el-input v-model='form.maxPrice' ></el-input>
				    </el-col>
	        	</el-form-item>
	        	<el-form-item label="发货地">
	        		<el-input v-model='form.shipAddress'></el-input>
	        	</el-form-item>
	        	<el-form-item label="其他">
	        		<el-input v-model='form.others'></el-input>
	        		 <p style='text-align:left;font-size:12px;color:rgba(0,0,0,0.65)'> 填写其他选项需要收费1元</p> 
	        	</el-form-item>
	        	<el-form-item >
	        		<el-button type='primary' class='style-btn next-btn'  round @click='set'>确定</el-button>
	        	</el-form-item>
	        </el-form>
	    </el-dialog>
	</div>
</template>

<script>
	import {mapState} from "vuex";
	import {saveTaskAndRequire,searchReplay,searchReplaynum} from '../../../api/task';
	export default{
		data(){
			return{
				tableData:[{
	              'keyword':'',
	              'num':'',
	              'repurCycle':'',
	              'form':{},
	              'potentialUser':'',
	              'type':''
	            }],
	            tableDatas:[{
	              'keyword':'',
	              'num':'',
	              'repurCycle':'',
	              'form':{},
	              'potentialUser':'',
	              'type':''
	            }],
	            n:1,
	            checkOne:false,
	            checkTwo:false,
	            ids:this.$route.params.id,
	            setdialog:false,
	            rowIndex:'',
	            tabelIndex:'',
	            task_type:'',
	            produect_title:'',
	            checkKeys:[],
	            options:[],
	            form:{
	            	'sortord':[],
	            	'minPrice':'',
	            	'maxPrice':'',
	            	'shipAddress':'',
	            	'others':''
	            }
			}
		},
        mounted(){
        	searchReplay().then(response=>{
        		var data=response
        		this.options=data.list
        	}).catch(error=>{})
        	this.task_type=localStorage.getItem('changeType')
        	this.produect_title=localStorage.getItem('changeTypeTitle')
        	for(var i=0;i<this.tableData.length;i++){
				if(this.task_type==1){
					this.tableData[i].type=1
				}else if(this.task_type==2){
					this.tableData[i].type=2
				}else if(this.task_type==3){
					this.tableData[i].type=4
				}	
			}
			for(var i=0;i<this.tableDatas.length;i++){
				if(this.task_type==2){
					this.tableDatas[i].type=3
				}else if(this.task_type==3){
					this.tableDatas[i].type=5
				}	
			}
        },
		methods:{
			// 增加
			addTable(index){
				let b=this.n++
				if(index==1){
					this.tableData.push({'keyword':'','num':'', 'repurCycle':'',
	              'form':{},
	              'potentialUser':'',
	              'type':''})
				}else{
					this.tableDatas.push({'keyword':'','num':'', 'repurCycle':'',
	              'form':{},
	              'potentialUser':'',
	              'type':''})
				}
			},
			// 删除
			del(rowIndex,index){
				if(index==1){
					if(rowIndex>0){
						this.tableData.splice(rowIndex,1)
					}
				}else{
					if(rowIndex>0){
						this.tableDatas.splice(rowIndex,1)
					}
				}
				
			},
			// 复购周期
			repeat(e,index,type){
				searchReplaynum(this.ids,e,type).then(response=>{
					var data=response
					if(type==1){
						this.tableData[index].potentialUser=data.count
						console.log(this.tableData[index].potentialUser)
					}else{
						this.tableDatas[index].potentialUser=data.count
					}
				}).catch(error=>{

				})
			},
			// 设置其他条件(添加到tableData中)
			set(){
				if(this.tabelIndex==1){
					this.tableData[this.rowIndex].form=this.form
				}else{
					this.tableDatas[this.rowIndex].form=this.form
				}
				this.setdialog=false
			},
			// 设置下标存储
			setting(rowIndex,index){
				this.setdialog=true
				this.rowIndex=rowIndex
				this.tabelIndex=index
				this.form.sortord=[]
				this.form.minPrice=''
				this.form.maxPrice=''
				this.form.shipAddress=''
				this.form.others=''
			},
			// 匹配关键字
			blur(rowIndex,index){
				// if(index==1){
				// 	var arr=this.tableData[rowIndex].keyword
				// 	this.checkOne=true
				// }else{
				// 	var arr=this.tableDatas[rowIndex].keyword
				// 	this.checkTwo=true
				// }
				// var strs=arr.replace(/\s+/g,"");
				// var arrs=strs.split('')
				// if(strs==''){
				// 	this.$message.error({
				// 		message:'关键字中包含标题中没有的字符，请检查确认。'
				// 	});
				// 	this.tableData[rowIndex].keyword=''
				// 	this.tableDatas[rowIndex].keyword=''
				// }else{
				// 	for(var i=0;i<arrs.length;i++){
				// 		if(this.produect_title.indexOf(arrs[i])<0){
				// 			this.$message.error({
				// 				message:'关键字中包含标题中没有的字符，请检查确认。'
				// 			});
				// 			this.tableData[rowIndex].keyword=''
				// 			this.tableDatas[rowIndex].keyword=''
				// 			break;
				// 		}
				// 	}
				// }
				
			},
			// 下一步，检查数量
			next(){
				var tableone=false
				if(this.checkOne){
					for(var i=0;i<this.tableData.length;i++){
						if(this.tableData[i].num==''){
							this.$message.warning('数量必须大于0小于等于100的整数')
						}else if(this.tableData[i].num>100){
							this.$message.warning('数量必须大于0小于等于100的整数')
						}else{
							tableone=true
						}
					}
				}
				if(this.checkTwo){
					tableone=false
					for(var i=0;i<this.tableDatas.length;i++){
						if(this.tableDatas[i].num==''){
							this.$message.warning('数量必须大于0小于等于100的整数')
						}else if(this.tableDatas[i].num>100){
							this.$message.warning('数量必须大于0小于等于100的整数')
						}else{
							tableone=true
						}
					}
				}
				// if(this.checkOne==false&&this.checkTwo==false){
				// 	this.$message.warning('关键字不能为空')	
				// }
				// if(tableone){
				// 	var require1 //来路设置
				// 	var require2 //加入购物车
				// 	var require3 //收藏任务
				// 	var require4 //指定商品复购
				// 	var require5 //指定店铺复购
				// 	if(this.task_type==1){
				// 		require1=this.tableData
				// 		require2=null
				// 		require3=null
				// 		require4=null
				// 		require5=null
				// 	}else if(this.task_type==2){
				// 		require1=null
				// 		require2=this.tableData
				// 		require3=this.tableDatas
				// 		require4=null
				// 		require5=null
				// 	}else if(this.task_type==3){
				// 		require1=null
				// 		require2=null
				// 		require3=null
				// 		require4=this.tableData
				// 		require5=this.tableDatas
				// 	}
				// 	var id={taskIdDto:this.ids}
				// 	  saveTaskAndRequire(id,require1,require2,require3,require4,require5).then(response => {
				//         const data = response;
				//         if(data.msg==1){
				//         	this.$router.push({
			 //                 name:'sendThree',
			 //                  params: {
			 //                    id:data.task.id
			 //                  }
			 //              	})
				//         	localStorage.setItem('taskNum',data.task.totalNum);
				//         }else if(data.msg==3){
				//         	this.$message.error('当前店铺单量不够')
				//         }
				//       }).catch(error => {
				//         reject(error);
				//       }); 
				// }
				var require1 //来路设置
				var require2 //加入购物车
				var require3 //收藏任务
				var require4 //指定商品复购
				var require5 //指定店铺复购
				if(this.task_type==1){
					require1=this.tableData
					require2=null
					require3=null
					require4=null
					require5=null
				}else if(this.task_type==2){
					require1=null
					require2=this.tableData
					require3=this.tableDatas
					require4=null
					require5=null
				}else if(this.task_type==3){
					require1=null
					require2=null
					require3=null
					require4=this.tableData
					require5=this.tableDatas
				}
				var id={taskIdDto:this.ids}
				  saveTaskAndRequire(id,require1,require2,require3,require4,require5).then(response => {
			        const data = response;
			        if(data.msg==1){
			        	this.$router.push({
		                 name:'sendThree',
		                  params: {
		                    id:data.task.id
		                  }
		              	})
			        	localStorage.setItem('taskNum',data.task.totalNum);
			        }else if(data.msg==3){
			        	this.$message.error('当前店铺单量不够')
			        }
			      }).catch(error => {
			        reject(error);
			      }); 
			}
		}
	}
</script>

<style>
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
	.sendTwo .el-checkbox{
		width:150px;
		text-align:left;
	}
	.sendTwo .el-checkbox-group{
		text-align:left;
	}
	.sendTwo .el-checkbox+.el-checkbox{
		margin:0;
	}
	.tables{
		margin-bottom:100px;
	}
  .sendTwo .recharge-info{
    border:1px solid #91D5FF;
    background:#E6F7FF;
    border-radius:4px;
    width:100%;
    margin-bottom:30px;
  }
  .sendTwo .info-fl{
    float:left;
    width:8%;
    position:relative;
    height:40px;
  }
  .sendTwo .icons{
    width:24px;
    height:24px;
    display:block;
    border:2px solid #1890FF;
    color:#1890FF;
    font-size:20px;
    text-align:center;
    line-height:24px;
    border-radius:50%;
    font-weight:bold;
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin:auto;
  }
  .sendTwo .infos-box{
    padding:0;
    font-size:14px;
    text-align: left;
    line-height:40px;
  }
  .next-btn{
  	width:300px;
  }
</style>