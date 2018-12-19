<template>
	<div >
		<div class='sendOne'>
			<p class='sendOne-title'>选定商品 <el-button type='primary' round size='mini' class='send-btn style-btn'  @click='choosedialog=true'>选择商品</el-button> </p>
			<el-row class="contain" type="flex"  justify="center">
	      		<el-col :span='20'>
    					<ul class='sendBox' v-if='chooseIndex<0' >
    						<li class="send-list"><span class='send-label'>商品简称</span><span class='send-text' ></span></li>
    						<li class="send-list"><span class='send-label'>商品ID</span><span class='send-text' ></span></li>
    						<li class="send-list"><span class='send-label'>店铺名称</span><span class='send-text' ></span></li>
    						<li class="send-list"><span class='send-label'>商品标题</span><span class='send-text' ></span></li>
    						<li class="send-list"><span class='send-label'>商品链接</span><span class='send-text' ></span></li>
    					</ul>
    					<ul class='sendBox' v-if='chooseIndex>=0' >
    						<li class="send-list"><span class='send-label'>商品简称123</span><span class='send-text' >{{tableData[chooseIndex].goodNickname}}</span></li>
    						<li class="send-list"><span class='send-label'>商品ID</span><span class='send-text' >{{tableData[chooseIndex].goodId}}</span></li>
    						<li class="send-list"><span class='send-label'>店铺名称</span><span class='send-text' >{{tableData[chooseIndex].storeName}}</span></li>
    						<li class="send-list"><span class='send-label'>商品标题</span><span class='send-text' >{{tableData[chooseIndex].goodName}}</span></li>
    						<li class="send-list"><span class='send-label'>商品链接</span><span class='send-text' >{{tableData[chooseIndex].url}}</span></li>
    					</ul>
	      		</el-col>
	      		<el-col :span='4'>
					   <img :src='pro_imgs' alt="" class='send-img' @click='bigImg'>
	      		</el-col>
	      	</el-row>
		</div>
      	<el-button type='primary' class='next-btn style-btn' round @click='next' >下一步</el-button>
      	 <!--**图片放大**-->
	    <div class="mask" v-show="show" @click="small">
	      <img :src="bigsrc" alt="" class="bigimg">
	    </div>
	    <!-- 选择商品 -->
	    <el-dialog title='选择商品'  :visible.sync="choosedialog" >
			   <el-form ref="form" :model="form" class="queryBox" label-width="76px"  style='text-align:left;' size="small" :inline="true">
	            <el-form-item>
	              <el-select v-model="form.state" placeholder="所有店铺" >
	                <el-option :label="item.name" :value="item.id" v-for='item in storeList' :key='item.id'></el-option>
	              </el-select>
	            </el-form-item>
	            <el-form-item>
	              <el-select v-model="form.choose"  >
	                <el-option label="商品ID" value="1"></el-option>
	                <el-option label="商品名称" value="2"></el-option>
	              </el-select>
	            </el-form-item>
	            <el-form-item >
	              <el-input v-model="form.num" placeholder='查询条件' ></el-input>
	            </el-form-item>
	            <el-form-item>
	              <el-button type="primary" @click='search'>查询</el-button>
	            </el-form-item>
	        </el-form>
	        <el-table class='tabless' ref="multipleTable" :data="tableData" tooltip-effect="dark"  style="width: 100%" border  
            header-row-class-name="table-header">
	           	<el-table-column label="选择商品" width='100' header-align="center">
	           		 <template slot-scope="scope">
	           		 	<el-radio v-model="radio" :label="scope.$index" @change='choose' ></el-radio>
	           		 </template>
              	</el-table-column>
	            <el-table-column prop="storeName" label="店铺名称"  header-align="center" show-overflow-tooltip width='100' >
	            </el-table-column>
	            <el-table-column prop="goodNickname" label="商品简称" header-align="center"  show-overflow-tooltip >
	            </el-table-column>
              <el-table-column  label="商品主图" header-align="center" >
                  <template slot-scope="scope">
                    <img :src="scope.row.img" alt="" class='pro-img' @click='bigImg' >
                  </template>
              </el-table-column>
	            <el-table-column  prop="goodId" label="商品ID"  show-overflow-tooltip header-align="center">
	            </el-table-column>
	            <el-table-column prop="goodName" label="商品标题"  show-overflow-tooltip header-align="center" >
	            </el-table-column>
	        </el-table>
          <el-pagination layout="prev, pager, next" :total="totalPages"  @current-change="CurrentChange" >
          </el-pagination>
	        <el-button type='primary' class=' next-btn style-btn' round @click='goodsConfirm' >确定</el-button>
	    </el-dialog>
	    <!-- 店铺未来7日可发布数 -->
	    <el-dialog title='店铺未来7日可发布数'  :visible.sync="fadialog" width='40%' >
	        <el-table class='tabless' ref="multipleTable" :data="tableFa" tooltip-effect="dark"  style="width: 100%" border header-row-class-name="table-header">
	            <el-table-column prop="date" label="日期"  header-align="center" show-overflow-tooltip >
	            </el-table-column>
	            <el-table-column prop="residueNum" label="剩余可发布任务数" header-align="center"  show-overflow-tooltip >
	            </el-table-column>
	            <el-table-column  prop="num" label="发布上限"  show-overflow-tooltip header-align="center">
	            </el-table-column>
	        </el-table>
	        <p class='fa_bottom'>当前店铺每日可发布 {{dan_num}} 单任务，如需调整每日发布数量上限，请点击 
	        	<span class='fa-tiao' > <router-link to='/change' >调整单量</router-link> </span> 
             <el-button type='primary' size='mini' @click='fadialog=false' style='float:right;' >确定</el-button>
	        </p>
	    </el-dialog>
      <!-- 任务类型选择 -->
      <div class='typeTan' v-if='tanBox'>
        <sendType v-on:child="changeType" :tai="tai"></sendType>
      </div>
      <!-- 任务类型选择 -->
      <div class='typeTan' v-if='taiBox'>
        <sendTai v-on:taibox="types"></sendTai>
      </div>
	</div>
</template>
<script>
import {mapActions} from "vuex";
import sendType from './sendType'
import sendTai from './sendTai'
import {prodeuceList,prodeuceListTai} from '../../../api/vip';
import {sevenDay,addTask,bussinessStatus,searchTask} from '../../../api/task';
 export default {
    data(){
      return {
        tai:'',
      	bigsrc:'',
      	show:false,
      	choosedialog:false,
      	fadialog:false,
        taiBox:true,
        tanBox:false,
        totalPages:0,
      	form:{
      		state:'',
      		choose:'',
      		num:''
      	},
      	radio:'',
      	radio2:'',
        dan_num:"",
      	chooseIndex:'-1',
        sendTypeIndex:'',
      	pro_imgs:'',
      	tableData:[],
      	tableFa:[],
        storeList:[],
        currentPage:1,
      };
    },
    mounted(){
      searchTask().then(response=>{
        var data=response
        if(data.storeStatus==2){
          this.$message.warning('还没有添加店铺')
        }
        if(data.moneys==2){
          this.$message.warning('您的发布点为0')
        }
        if(data.goodsStatus==2){
          this.$message.warning('还没有添加商品')
        }
      }).catch(error=>{

      })
    },
    // =======方法列表
    methods: {
      types(index){
        this.taiBox=false;
        if(index==0){
          this.$router.push('/homes')
        }else{
          this.tanBox=true;
          this.tai=index;
          //展示该平台下所有的商品
          prodeuceListTai(this.tai,1,10).then(response => {
            const data = response;
            this.tableData=data.page.result
            this.totalPages=data.page.totalRow
            this.storeList=data.stores
          }).catch(error => {
            reject(error);
          });
        }
      },
      //查看原图
      bigImg(e){
        this.show=true;
        this.bigsrc=e.target.currentSrc;
      },
     //隐藏原图
      small(){
        this.show=false;
      },
      // 确定商品
      goodsConfirm(){
        this.choosedialog=false;
        sevenDay(this.tableData[this.chooseIndex].storeId).then(response => {
          const data = response;
          if(data.msg==1){
             this.fadialog=true;
            this.tableFa=data.storeNums
            this.dan_num=data.storeNums[0].num
          }
        }).catch(error => {
          reject(error);
        }); 
      },
      // 下一步
      next(){
        if(this.chooseIndex<0){
          this.$message.warning('请选择商品');
        }else{
          addTask(this.tai,this.tableData[this.chooseIndex].storeId,this.tableData[this.chooseIndex].id,this.sendTypeIndex).then(response => {
            const data = response;
            if(data.msg==1){
              localStorage.setItem('changeType',this.sendTypeIndex);
              localStorage.setItem('changeTypeTitle',this.tableData[this.chooseIndex].goodName);
              this.$router.push({
                 name:'sendTwo',
                  params: {
                    id:data.task.id
                  }
              })
            }
          }).catch(error => {
            reject(error);
          });
        }
      },
      // 选择商品
  	  choose(e) {
  	    	this.chooseIndex=e
          this.pro_imgs=this.tableData[e].img
  	      this.$store.dispatch("choose", this.tableData[e].goodName)
  	  },
  	  // 选择任务类型
  	  changeType(index){
        var that=this
        this.tanBox=false
        if(index==0){
          this.$router.push('/homes')
        }else{
          this.sendTypeIndex=index
          this.$store.dispatch("changeType", index)
          bussinessStatus().then(response=>{
            var data=response
            if(data.userStatus.hideStatus==1){
              this.$message.error('您有未转账信息')
              setTimeout(function(){
                that.$router.push('/homes')
              },500)
            }else if(data.userStatus.status==2){
              this.$message.error('您的账号已被冻结')
              setTimeout(function(){
                that.$router.push('/homes')
              },500)
            }
          }).catch(error=>{})
        }
  	  },
      // 条件查询
      search(){
        var goods=''
        var goodsName=''
        if(this.form.choose==1){
          goods=this.form.num
          goodsName=''
        }else{
          goods=''
          goodsName=this.form.num
        }
        prodeuceList(goods,this.form.state,goodsName,1,10).then(response => {
          const data = response;
          this.tableData=data.page.result
          this.totalPages=data.page.totalRow
          // this.storeList=data.stores
        }).catch(error => {
          reject(error);
        }); 
      },
      // 分页查询
      CurrentChange(e){
        this.currentPage=e
        var goods=''
        var goodsName=''
        if(this.form.choose==1){
          goods=this.form.num
          goodsName=''
        }else{
          goods=''
          goodsName=this.form.num
        }
        prodeuceList(goods,this.form.state,goodsName,e,10).then(response => {
          const data = response;
          this.tableData=data.page.result
          this.totalPages=data.page.totalRow
          this.storeList=data.stores
        }).catch(error => {
          reject(error);
        }); 
      }
    },
    components:{
     sendType,
      sendTai
    }
}
</script>
<style>
.sendOne{
  border:1px solid #ccc;
  margin-bottom:100px;
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
  margin-top:20px;
}
.pro-img{
    width:calc(400px * 0.1);
    height:auto;
    cursor: pointer;
}
  .mask{
    width:100%;
    height:100%;
    position: absolute;
    left:0;
    top:0;
    background:rgba(0,0,0,0.6);
    z-index:3000;
    overflow: hidden;
  }
  .bigimg{
    transform: scale(1);
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin:auto;
  }
  .next-btn{
  	width:300px;
  }
  .tabless{
  	margin-bottom:30px;
  }
  .fa_bottom{
  	text-align:left;
  	font-size:14px;
  }
  .fa-tiao{
  	cursor:pointer
  }
  .fa-tiao a{
  	color:#1890FF;
  }
  .typeTan{
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.6);
    position:absolute;
    left:0;
    top:0;
    display:flex;
    flex-direction: column;
    justify-content:center;
    z-index:3000;
  }
</style>
