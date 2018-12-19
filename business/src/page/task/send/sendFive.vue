<template>
	<div class='five'>
		<div class='sendOne'>
			<el-row class="contain" type="flex"  justify="center">
    		<el-col :span='20'>
					<ul class='sendBox'>
						<li class="send-list"><span class='send-label'>商品简称</span><span class='send-text' >{{message.goods.goodNickname}}</span></li>
						<li class="send-list"><span class='send-label'>商品ID</span><span class='send-text' >{{message.goods.goodId}}</span></li>
						<li class="send-list"><span class='send-label'>店铺名称</span><span class='send-text' >{{message.storeName}}</span></li>
						<li class="send-list"><span class='send-label'>商品标题</span><span class='send-text' >{{message.goods.goodName}}</span></li>
						<li class="send-list"><span class='send-label'>商品链接</span><span class='send-text' >{{message.goods.url}}</span></li>
					</ul>
    		</el-col>
    		<el-col :span='4'>
			   <img :src='message.goods.img' alt="" class='send-img'>
    		</el-col>
    	</el-row>
		</div>
    <el-table :data="message.requires" border style="width: 100%;margin-bottom:30px;">
      <el-table-column label='关键字设置'  header-align="center">
         <el-table-column prop="task_type" label="任务分类" header-align="center"  show-overflow-tooltip >
          <template slot-scope="scope">
            <p v-if='scope.row.type==1'>来路设置</p>
            <p v-if='scope.row.type==2'>加入购物车</p>
            <p v-if='scope.row.type==3'>收藏商品</p>
            <p v-if='scope.row.type==4'>商品复购</p>
            <p v-if='scope.row.type==5'>店铺复购</p>
          </template>
        </el-table-column>
        <el-table-column label="流量入口"  header-align="center"  show-overflow-tooltip>
           <template slot-scope="scope">
            <p>自然购买</p>
          </template>
        </el-table-column>
        <el-table-column prop="keyword" label="关键字" header-align="center"  show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="num" label="数量" header-align="center"  show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="repurCycle" label="复购周期"  header-align="center"  show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="potentialUser" label="潜在用户" header-align="center"  show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="其他搜索条件" header-align="center"  show-overflow-tooltip>
          <template slot-scope="scope">
            <p class='table-list'>排序方式：{{scope.row.sortords}}</p>
            <p class='table-list'>价格区间：{{scope.row.minPrice}}-{{scope.row.maxPrice}}</p>
            <p class='table-list'>发货地：{{scope.row.shipAddress}}</p>
            <p class='table-list'>其他：{{scope.row.others}}</p>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-table :data="message.prices" border style="width: 100%" >
      <el-table-column label='成交金额'  header-align="center">
         <el-table-column prop="kind" label="型号" header-align="center"  show-overflow-tooltip >
        </el-table-column>
        <el-table-column prop="taskTotalPrice" label="成交金额"  header-align="center"  show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="taskNum" label="任务数量" header-align="center"  show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="commissionTotalPrice" label="任务佣金" header-align="center"  show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="expressTotalPrice" label="任务快递费"  header-align="center"  show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="totalPrice" label="合计" header-align="center"  show-overflow-tooltip>
        </el-table-column>
      </el-table-column>
    </el-table>
    <ul class='all-money' style='margin-bottom:30px;' >
      <li class='all-list'>成交总金额：{{message.costPrice.goodsTotalPrice}}元</li>
      <li class='all-list'>佣金总金额：{{message.costPrice.commissionPrice}}元</li>
      <li class='all-list'>快递费总金额 ：{{message.costPrice.expressPrice}}元</li>
      <li class='all-list'>合计：{{message.costPrice.totalPrice}}元</li>
    </ul>
     <div class='fourBox'>
      <p class='sendTwo-title'  >任务说明</p>
      <div class='taskBox'>
        <div class='tagBox tagBoxs'>
          {{message.task.explains}}
        </div>
      </div>
    </div>
    <div class='fourBox'>
      <p class='sendTwo-title'  >任务要求</span></p>
      <div class='taskBox'>
        <div class='tagBox tagBoxss'>
          <span v-if='message.task.requires==1'>拍一家同行</span>
          <span v-if='message.task.requires==2'>拍两家同行</span>
          <span v-if='message.task.requires==0'>不需要</span>
        </div>
      </div>
    </div>
    <div class='fourBox'>
      <p class='sendTwo-title'  >任务匹配条件添加</p>
      <div class='taskBox'>
        <p class='erTitles'>性别：</p>
        <div class='tagBox tagBoxs' style='width:14%' >
          <span class='tagList tagLists active' v-for='item in message.conditions'  v-if='item.sex==1'>男</span>
           <span class='tagList tagLists active' v-for='item in message.conditions' v-if='item.sex==2'>女</span>
        </div>
      </div>
      <div class='taskBox'>
        <p class='erTitles'>年龄范围：</p>
        <div class='tagBox tagBoxs' style='width:30%' >
          <span class='tagList tagLists active' v-for='item in message.conditions' v-if='item.age==1'>18-29</span>
          <span class='tagList tagLists active' v-for='item in message.conditions' v-if='item.age==2'>30-39</span>
          <span class='tagList tagLists active' v-for='item in message.conditions' v-if='item.age==3'>40-59</span>
          <span class='tagList tagLists active' v-for='item in message.conditions' v-if='item.age==4'>60-69</span>
        </div>
      </div>
      <div class='taskBox'>
        <p class='erTitles'>消费者地区：</p>
        <div class='tagBox tagBoxs' style='width:30%'  v-for='item in message.conditions' v-if='item.province!=null'>
          山西
        </div>
      </div>
    </div>
    <div class='task_all_box'>
      <ul class='task-que'>
        <li>货款：<span class='task-high'>{{message.costPrice.goodsTotalPrice}}元</span></li>
        <li>快递：<span class='task-high'>{{message.costPrice.expressPrice}}元</span></li>
        <li>佣金：<span class='tasks-high'>{{message.costPrice.commissionPrice}}元</span></li>
        <li>置顶费：<span class='tasks-high'>{{message.costPrice.stickTotalPrice}}元</span></li>
        <li>任务匹配条件费：<span class='tasks-high'>{{message.costPrice.conditionPrice}}元</span></li>
        <li>任务筛选费：<span class='tasks-high'>{{message.costPrice.screenPrice}}元</span></li>
        <li>任务要求费：<span class='tasks-high'>{{message.costPrice.requirePrice}}元</span></li>
        <li>本次需要支付给平台：<span class='tasks-high'>{{message.costPrice.mediatorPrice}}元</span></li>
      </ul>
    </div>
    <el-input v-model="input" type='password' placeholder="请输入支付密码" class='fiveInp' ></el-input>
    <el-button type='primary' class='next-btn style-btn' round @click='confirm(message.task.id)' >确认发布</el-button>
	</div>
</template>
<script>
 import {issueNow} from '../../../api/task';
 export default {
    data(){
      return {
        input:'',

      };
    },
    props:['message'],
    // =======方法列表
    methods: {
      confirm(id){
        var that=this;
        if(this.input==''){
          this.$message.error('请输入支付密码')
        }else{
          issueNow(id,this.input).then(response => {
              const data = response;
              if(data.msg==1){
                this.$message.success('发布成功')
                setTimeout(function(){
                  that.$router.push('/homes')
                },500)
              }else if(data.msg==3){
                this.$message.error('该账户发布点不足')
              }else if(data.msg==4){
                this.$message.error('密码错误')
              }
          }).catch(error => {
              reject(error);
          }); 
        }
      }
    }
}
</script>
<style>
.five{
  padding-bottom:80px;
}
.five .el-table{
  margin:0;
}
.five .sendOne{
  border:1px solid #ccc;
  margin-bottom:30px;
}
.tabless .el-radio__label{
	display:none;
}
.sendOne-title{
	text-align:left;
	font-size:16px;
	line-height:50px;
	padding-left:20px;
	border-bottom:1px solid #ccc;
}
.send-btn{
	float:right;
	margin-top:10px;
	margin-right:30px;
}
.sendBox{
	width:100%;
	border-right:1px solid #ccc;
	text-align:left;
}
.send-list{
	line-height:50px;
	border-bottom:1px solid #ccc;
	overflow:hidden;
}
.send-list:nth-last-child(1){
	border:none;
}
.send-label{
	width:12%;
	background:#f8f8f8;
	display:block;
	text-align:center;
	border-right:1px solid #ccc;
	float:left;
}
.send-text{
	text-align:center;
	display:block;
	text-align:center;
	float:left;
	width:88%;
}
.send-img{
	width:100%;
	display:block;
	cursor:pointer;
}
.five .next-btn{
	width:300px;
  float:right;
  margin-right:140px;
  margin-bottom:30px;
  clear:both;
}
.table-list{
  text-align:left;
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
.task_all_box{
  overflow:hidden;
  margin-bottom:30px;
}
.task-que{
  width:30%;
  text-align:left;
  font-size:16px;
  line-height:26px;
  float:right;
}
.task-high{
  color:#1890FF;
  font-weight:bold;
}
.tasks-high{
  color:#F5222D;
  font-weight:bold;
}
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
    padding:0 14px;
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
    width:60%;
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
  .fiveInp{
    width:30%;
    float:right;
    margin-bottom:10px;
    clear:both;
    margin-right:30px;
  }
</style>
