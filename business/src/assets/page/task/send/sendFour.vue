<template>
	<div class='four'>
		<div class='fourBox fourBoxs'>
			<p class='sendTwo-title'  >置顶费用<span class='sendTwo-label'>（制定费用越高，任务越快被分配）</span></p>
			<div class='taskBox'>
				<p class='erTitles'>请选择置顶费用：</p>
				<div class='tagBox tagBoxss'>
					<el-radio v-model="radio" label="0" @change='ding_moneys'>0元</el-radio>
					<el-radio v-model="radio" label="3" @change='ding_moneys'>3元</el-radio>
  					<el-radio v-model="radio" label="5" @change='ding_moneys'>5元</el-radio>
  					<el-radio v-model="radio" label="8" @change='ding_moneys'>8元</el-radio>
				</div>
			</div>
			<div class='taskBox'>
				<p class='erTitles'>请输入置顶单数：</p>
				<el-input v-model="input" size='small' placeholder="在此输入单数" class='huan-inps' @blur='ding'></el-input>
			</div>
			<div class='taskBox'>
				<p class='erTitles'>共计：</p>
				<div class='topAll'>
					{{ding_money}}元
				</div>
			</div>
		</div>
		<div class='fourBox'>
			<p class='sendTwo-title'  >基本任务要求<span class='sendTwo-label'>（下方提供常见的备注选项，如有需要请点击勾选）</span></p>
			<div class='taskBox'>
				<div class='tagBox tagBoxs'>
					<span class='tagList tagLists' v-bind:class="[item.choose?active:'']" v-for='(item,index) in task_info' @click='tags(index)'>{{item.text}}</span>
				</div>
			</div>
			<div class='taskBox'>
				<el-input v-model="info" placeholder="其他说明内容，最多不超过150个字符" maxlength='150' ></el-input>
			</div>
		</div>
		<div class='fourBox'>
			<p class='sendTwo-title'  >特殊任务要求<span class='sendTwo-labels'>（拍一家收费2元，拍两家收费3元）</span></p>
			<div class='taskBox'>
				<p class='erTitles'>拍同行宝贝：</p>
				<div class='tagBox tagBoxss'>
					<el-radio v-model="radios" label="0">不需要</el-radio>
  					<el-radio v-model="radios" label="1">拍一家同行不付款</el-radio>
  					<el-radio v-model="radios" label="2">拍两家同行不付款</el-radio>
				</div>
			</div>
		</div>
		<div class='fourBox'>
			<p class='sendTwo-title'  >深度精准刷手匹配<span class='sendTwo-labels'>（可选，勾选一个收费0.5元）</span></p>
			<div class='taskBox'>
				<p class='erTitles'>性别：</p>
				<div class='tagBox tagBoxs'  >
					<span class='tagList tagLists' v-bind:class="[item.choose?active:'']" v-for='(item,index) in xing' @click='xings(index)'>{{item.text}}</span>
				</div>
			</div>
			<div class='taskBox'>
				<p class='erTitles'>年龄范围：</p>
				<div class='tagBox tagBoxs'  >
					<span class='tagList tagLists' v-bind:class="[item.choose?active:'']" v-for='(item,index) in age' @click='ages(index)'>{{item.age}}</span>
				</div>
			</div>
			<div class='taskBox'>
				<p class='erTitles'>消费者地区：</p>
				<div class='tagBox tagBoxs' style='width:30%' >
				    <el-select  placeholder="请选择"   v-model="pro_value">
	                    <el-option v-for="item in pro" :key="item" :label="item" :value="item"></el-option>
	                </el-select>
	                <el-select  placeholder="请选择"  v-model="city_value">
	                    <el-option v-for="item in city" :key="item" :label="item" :value="item"></el-option>
	                </el-select>
				</div>
			</div>
		</div>
		<div class='fourBox'>
			<p class='sendTwo-title'  >转账方式<span class='sendTwo-labels'>（自行转账）</span></p>
			<div class='taskBox'>
				<p class='erTitles'>只需支付佣金，由商家自行向买家返还垫付的货款，平台不收取转账费用。</p>
			</div>
		</div>
        <el-button type='primary' class='next-btn style-btn' round @click='next' >下一步</el-button>
        <!-- 任务预览 -->
        <el-dialog title='确认任务信息'  :visible.sync="setdialog" width='80%' >
			<sendFive :message='over_message'></sendFive>
	    </el-dialog>
	</div>
</template>

<script>
	import {mapState} from "vuex";
	import sendFive from './sendFive';
	import {saveTaskAndCondition} from '../../../api/task';
	import arrAll from '../../../until/city'
	export default{
		data(){
			return{
				tagIndexf:false,
				tagIndexs:false,
				tagIndext:false,
				setdialog:false,
				ids:this.$route.params.id,
				region:'',
				active:'active',
				age:[{age:'18-29',choose:false,id:'1'},{age:'30-39',choose:false,id:'2'},{age:'40-59',choose:false,id:'3'},{age:'60-69',choose:false,id:'4'}],
				xing:[{text:'只要男',choose:false,id:'1'},{text:'只要女',choose:false,id:'2'}],
				radio:'', //任务置顶单数
				radios:'', //同行宝贝
				info:'',//其他任务说明
				input:'', //输入只订单数
				task_num:0,
				ding_money:0,
				pro:'',
		        city:'',
		        area:'',
		        city:[],
		        pro:[],
		        pro_value:'',
		        city_value:'',
		        over_message:{},
		        task_info:[{text:'尽快确认收货',choose:false},{text:'下单时请不要勾选上门安装',choose:false},{text:'付款时不要勾选支付宝红包',choose:false}]
			}
		},
	 mounted(){
        	this.task_num=localStorage.getItem('taskNum')
        	for(let i=0;i<arrAll.length;i++){
		        this.pro.push(arrAll[i].name)
		    }
        },
		methods:{
			// 选择任务说明
			tags(index){
				this.task_info[index].choose=!this.task_info[index].choose
			},
			// 选择年龄
			ages(index){
				this.age[index].choose=!this.age[index].choose
			},
			// 选择男女
			xings(index){
				this.xing[index].choose=!this.xing[index].choose
			},
			// 置顶单数
			ding(){
				if(Number(this.input)>Number(this.task_num)){
					this.input=this.task_num
					this.$message.warning('置顶数量不能大于任务数量');
				}else if(this.input<0){
					this.input=0
					this.$message.warning('请输入正确的单量');
				}
				this.ding_money=this.input*this.radio
			},
			ding_moneys(e){
				console.log(e)
				this.ding_money=this.input*this.radio
			},
			next(){
				var explain=''
				var sex=[]
				var age=[]
				for(var i=0;i<this.task_info.length;i++){
					if(this.task_info[i].choose){
						explain+=this.task_info[i].text+','
					}
				}
				explain=explain+this.info
				for(var i=0;i<this.xing.length;i++){
					if(this.xing[i].choose){
						sex.push(this.xing[i].id)
					}
				}
				for(var i=0;i<this.age.length;i++){
					if(this.age[i].choose){
						age.push(this.age[i].id)
					}
				}
				var task={
					id:this.ids,
					stickPrice:this.radio,
					stickNum:this.input,
					explains:explain,
					requires:this.radios
				};
				saveTaskAndCondition(task,sex,age,this.pro_value,this.city_value).then(response => {
			        const data = response;
			        if(data.msg==1){
			        	this.setdialog=true
			        	this.over_message.conditions=data.conditions;
			        	this.over_message.costPrice=data.costPrice;
			        	this.over_message.prices=data.prices;
			        	this.over_message.requires=data.requires;
			        	this.over_message.task=data.task;
			        	this.over_message.storeName=data.storeName;
			        	this.over_message.goods=data.goods;
			        	console.log(this.over_message)
			        }
			    }).catch(error => {
			        reject(error);
			    }); 
			}
		},
		components:{
	     sendFive
	    },
	    watch: {
	      // 省
	      pro_value(e){
	        this.city=[];
	        for(let i=0;i<arrAll.length;i++){
	          if(this.pro_value==arrAll[i].name){
	            for(let j=0;j<arrAll[i].city.length;j++){
	              this.city.push(arrAll[i].city[j].name)
	            }
	          }
	        }
	      }
	    },
	}
</script>

<style>
	.fourBox{
		width:100%;
		border:1px solid #f5f7fa;
		overflow:hidden;
		margin-bottom:30px;
		background:#fff;
		padding-bottom:20px;
	}
	.four .sendTwo-title{
		text-align:left;
		font-size:16px;
		line-height:50px;
		padding-left:20px;
		border-bottom:1px solid #f5f7fa;
		color:#1890FF;
		background:#f5f7fa;
	}
	.sendTwo-label{
		font-size:14px;
		color:rgba(0,0,0,0.45);
	}
	.sendTwo-labels{
		color:#F5222D;
		font-size:14px;
	}
	.taskBox{
		overflow:hidden;
		padding:0 20px;
		margin-top:20px;
	}
	.tagBoxss{
		margin-top:7px;
	}
	.erTitles{
		line-height:30px;
		font-size:14px;
		text-align:left;
		float:left;
		margin-right:14px;
	}
	.tagBox{
		width:20%;
		display:flex;
		float:left;
	}
	.tagBox .tagList{
		padding:0 15px;
		height:30px;
		display:block;
		border-radius:50px;
		text-align:center;
		line-height:30px;
		background:#F0F2F5;
		color:rgba(0,0,0,0.45);
		font-size:14px;
		cursor:pointer;
		margin-right:20px;
	}
	.tagBoxs{
		width:80%;
	}
	.tagList.active{
		background:#1890FF;
		color:#fff;
	}
	.fourBoxs .el-input__inner{
	    border:none;
	}
	.huan-inps{
	    border-bottom:1px solid #1890FF;
	    width:140px;
	    float:left;
	}
	.topAll{
		font-size:14px;
		color:#000;
		font-weight:bold;
		line-height:30px;
		text-align:left;
	}
	.four .el-radio+.el-radio{
		margin-left:30px;
	}

</style>