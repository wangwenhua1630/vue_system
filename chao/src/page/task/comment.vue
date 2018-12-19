<template>
  <div>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="first-box">
          <p class='break'>当前任务评价管理</p>
          <el-form ref="form" :model="form" class="queryBox" label-width="76px"  size="mini" :inline="true">
            <el-form-item>
              <el-select v-model="form.tai" placeholder="所属平台">
                <el-option :label="item.name" :value="item.id" v-for="(item,index) in tai" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input v-model="form.account" placeholder='商家手机号' ></el-input>
            </el-form-item>
            <el-form-item >
              <el-input v-model="form.storeName" placeholder='店铺名称' ></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="form.state" placeholder="好评状态" >
                <el-option label="等待刷手接单" value="1"></el-option>
                <el-option label="刷手已接单" value="2"></el-option>
                <el-option label="等待商家审核" value="3"></el-option>
                <el-option label="好评审核通过" value="4"></el-option>
                <el-option label="好评审核不通过" value="5"></el-option>
                <el-option label="超时未完成" value="7"></el-option>
                <el-option label="佣金可提现" value="8"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="form.states" placeholder="追评状态" >
                <el-option label="等待刷手接单" value="1"></el-option>
                <el-option label="刷手已接单" value="2"></el-option>
                <el-option label="等待商家审核" value="3"></el-option>
                <el-option label="好评审核通过" value="4"></el-option>
                <el-option label="好评审核不通过" value="5"></el-option>
                <el-option label="超时未完成" value="7"></el-option>
                <el-option label="佣金可提现" value="8"></el-option>
              </el-select>
            </el-form-item>
             <el-form-item >
              <el-select v-model="form.cha" >
                <el-option label="任务编号" value="1"></el-option>
                <el-option label="订单编号" value="2"></el-option>
                <el-option label="商品名称" value="3"></el-option>
                <el-option label="刷手账号" value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item >
              <el-input v-model="form.num" placeholder='查询条件' ></el-input>
            </el-form-item>
            <el-form-item label="发布时间">
              <el-date-picker type="daterange" :default-time="['00:00:00', '23:59:59']" v-model='form.date' range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" round size='mini' class='style-btn' @click='search' >查询</el-button>
            </el-form-item>
          </el-form>
          <el-table  ref="multipleTable" :data="tableData" :row-class-name="tableRowClassName" tooltip-effect="dark"  style="width: 100%"  header-row-class-name="table-header">
            <el-table-column prop="account" label="商家手机号"  header-align="center" show-overflow-tooltip  width='120' >
            </el-table-column>
            <el-table-column label="所属平台" header-align="center"  show-overflow-tooltip width="100">
              <template slot-scope="scope">
                <p class='task-list' v-if="scope.row.adminStoreType"><span class='table-label'>{{scope.row.adminStoreType.name}}</span></p>
              </template>
            </el-table-column>
            <el-table-column prop="task_num" label="任务/订单编号" header-align="center"  show-overflow-tooltip >
             <template slot-scope="scope">
                <p class='task-list'>任务编号：<span class='table-label'>{{scope.row.idNum}}</span></p>
                <p class='task-list'>订单编号：<span class='table-label'>{{scope.row.orderId}}</span></p>
              </template>
            </el-table-column>
            <el-table-column  label="买号/商品信息"  show-overflow-tooltip header-align="center">
              <template slot-scope="scope">
                <p class='task-list'>买号：<span class='table-label'>{{scope.row.handPhone}}</span></p>
                <p class='task-list'>店铺名称：<span class='table-label'>{{scope.row.storeName}}</span></p>
              </template>
            </el-table-column>
            <el-table-column label="好评内容"  prop='good' header-align="center" >
              <template slot-scope="scope">
                  <p class='ping-text'>{{scope.row.goodEvaluate}}</p>
                  <p class='ping-tu' v-if='scope.row.goodStatus==3||scope.row.goodStatus==4||scope.row.goodStatus==5||scope.row.goodStatus==8'>图片评价：已完成</p>
                  <p class='ping-tu' v-if='scope.row.goodStatus==7'>图片评价：未完成</p>
                  <p class='ping-tu' v-if='scope.row.goodStatus>0' @click="kan(scope.row.id,1)">查看图片</p>
              </template>
            </el-table-column>
            <el-table-column label="追评内容"  prop='zhui' header-align="center" >
              <template slot-scope="scope">
                  <p class='ping-text'>{{scope.row.addEvaluate}}</p>
                  <p class='ping-tu' v-if='scope.row.addStatus==3||scope.row.addStatus==4||scope.row.addStatus==5||scope.row.addStatus==8'>图片评价：已完成</p>
                  <p class='ping-tu' v-if='scope.row.addStatus==7'>图片评价：未完成</p>
                <p class='ping-tu' v-if='scope.row.goodStatus>0' @click="kan(scope.row.id,2)">查看图片</p>
              </template>
            </el-table-column>
            <el-table-column label="评价状态"  show-overflow-tooltip header-align="center" width='160' >
              <template slot-scope="scope">
                <p class='task-listss' v-if='scope.row.goodStatus==1'>已设置好评，等待刷手接单 </p>
                <p class='task-listss' v-if='scope.row.goodStatus==2'>刷手已接单</p>
                <p class='task-listss' v-if='scope.row.goodStatus==3'>刷手完成任务，等待商家审核</p>
                <p class='task-listss' v-if='scope.row.goodStatus==4||scope.row.goodStatus==8'>好评审核通过</p>
                <p class='task-listss' v-if='scope.row.goodStatus==5'>好评审核不通过</p>
                <p class='task-listss' v-if='scope.row.goodStatus==7'>超时未完成</p>
                <p class='task-listss' v-if='scope.row.addStatus==1'>已设置追评评，等待刷手接单 </p>
                <p class='task-listss' v-if='scope.row.addStatus==2'>刷手已接单</p>
                <p class='task-listss' v-if='scope.row.addStatus==3'>刷手完成任务，等待商家审核</p>
                <p class='task-listss' v-if='scope.row.addStatus==4||scope.row.addStatus==8'>追评评审核通过</p>
                <p class='task-listss' v-if='scope.row.addStatus==5'>追评审核不通过</p>
                <p class='task-listss' v-if='scope.row.addStatus==7'>超时未完成</p>
                <p class='task-lists'>发布时间：<span class='table-label'>{{scope.row.issueAt}}</span></p>
                <p class='task-lists'>接收时间：<span class='table-label'>{{scope.row.overAt}}</span></p>
              </template>
            </el-table-column>
            <el-table-column   label="操作"  header-align="center" width='140'>
              <template slot-scope="scope">
                <el-button type="primary" plain round size="mini" @click="lookImg(1,scope.$index)" v-if='scope.row.goodStatus==3||scope.row.goodStatus==4||scope.row.goodStatus==5||scope.row.goodStatus==8'>查看好评截图</el-button>
                <el-button type="primary" plain round size="mini" @click="lookImg(2,scope.$index)" v-if='scope.row.addStatus==3||scope.row.addStatus==4||scope.row.addStatus==5||scope.row.addStatus==8'>查看追评截图</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @current-change="CurrentChange" layout="prev, pager, next"  :total="totalPages"></el-pagination>
        </div>
      </el-col>
    </el-row>
    <!--查看图片-->
    <el-dialog title='查看好评图片' width='30%' :visible.sync="kandialog" >
      <img :src="kanImg" alt="" class='ups-img'>
      <span slot="footer" class="dialog-footer">
        <el-button type='primary' @click="kandialog = false" size="small">关闭</el-button>
      </span>
    </el-dialog>
    <!--**查看好评截图**-->
    <el-dialog title='查看好评截图' width='30%' :visible.sync="missdialog" >
      <img :src="bigsrcs" alt="" class='ups-img' @click="bigImg" >
      <span slot="footer" class="dialog-footer">
        <el-button @click="missdialog = false" size='small'>关闭</el-button>
      </span>
    </el-dialog>
    <!--**图片放大**-->
    <div class="mask" v-show="show" @click="small">
      <img :src="bigsrc" alt="" class="bigimg">
    </div>
  </div>
</template>

<script>
    import {commentList,formatDate,kanImg} from '../../api/api'
    export default {
        name: "goods",
        data(){
          return{
            tai:'',
            form:{
              tai:'',
              num:'',
              state: '',
              states:'',
              date: '',
              cha:'',
              account:'',
              storeName:''
            },
            forms:{
              resource:'',
              inner:'',
              card:''
            },
            tableData:[],
            totalPages:0,
            kanImg:'',
            missdialog:false,
            kandialog:false,
            show:false,
            currentPage:1,
            dialogImageUrl: '',
            dialogVisible: false,
            input:'',
            bigsrc:'',
            bigsrcs:''
          }
        },
        mounted(){
          commentList('','','','','','','','','','','',1,1,10).then(response=>{
              var data=response
              if(data.msg==1){
                this.tai=data.types;
                this.tableData=data.page.result
                this.totalPages=data.page.totalRow
                for(var i=0;i<data.page.result.length;i++){
                   this.tableData[i].orderId=data.page.result[i].handTaskEvaluateImg.tradeNo
                 if(data.page.result[i].handInfo!=null ){
                  this.tableData[i].handPhone=data.page.result[i].handInfo.account
                 }
                 if(data.page.result[i].merchant!=null){
                  this.tableData[i].account=data.page.result[i].merchant.account
                 }
                 if(data.page.result[i].store!=null){
                  this.tableData[i].storeName=data.page.result[i].store.name
                 }
                 if(data.page.result[i].handTaskEvaluateImg!=null){
                    this.tableData[i].orderId=data.page.result[i].handTaskEvaluateImg.tradeNo
                  } 
                }
                this.totalPages=data.page.totalRow
              }else{
                this.tableData=[]
                this.totalPages=0
              }    
          }).catch(error=>{

          })
        },
        methods:{
          //查看评论图片
          kan(id,status){
            var that=this;
            kanImg(id,status).then(response=>{
              const data=response;
              if(data.msg==1){
                that.kanImg=data.pic.goodEvaluatePic;
                this.kandialog=true;
              }
              else if(data.msg==3){
                that.kanImg='';
              }
            })
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
           // 表格颜色
          tableRowClassName({row, rowIndex}){
            if (rowIndex %2 == 1) {
              return 'warning-row';
            }
            return '';
          },
          // 查看图片评价
          lookImg(type,index){
            this.missdialog=true
            if(type==1){
              this.bigsrcs=this.tableData[index].handTaskEvaluateImg.goodImg
            }else{
              this.bigsrcs=this.tableData[index].handTaskEvaluateImg.addImg
            }
          },
          // 条件查询
          search(){
            var result=''
            var results=''
            var resultss=''
            var resultsss=''
            if(this.form.cha==1){
              result=this.form.num
              results=''
              resultss=''
            }else if(this.form.cha==2){
              result=''
              results=this.form.num
              resultss=''
            }else if(this.form.cha==3){
              result=''
              results=''
              resultss=this.form.num
            }else if(this.form.cha==4){
              result=''
              results=''
              resultss=''
              resultsss=this.form.num
            }
            var date1 
            var date2
            if(this.form.date==null){
               date1=null
               date2=null
            }else{
              date1=formatDate(new Date(this.form.date[0]));
              date2=formatDate(new Date(this.form.date[1]));
            }
              commentList(this.form.tai,result,results,resultss,date1,date2,this.form.state,this.form.states,this.form.account,this.form.storeName,resultsss,1,this.currentPage,10).then(response=>{
                  var data=response
                  if(data.msg==1){
                    this.tableData=data.page.result
                    this.totalPages=data.page.totalRow
                    for(var i=0;i<data.page.result.length;i++){
                     if(data.page.result[i].handInfo!=null ){
                      this.tableData[i].handPhone=data.page.result[i].handInfo.account
                     }
                     if(data.page.result[i].merchant!=null){
                      this.tableData[i].account=data.page.result[i].merchant.account
                     }
                     if(data.page.result[i].store!=null){
                      this.tableData[i].storeName=data.page.result[i].store.name
                     }
                     if(data.page.result[i].handTaskEvaluateImg!=null){
                        this.tableData[i].orderId=data.page.result[i].handTaskEvaluateImg.tradeNo
                      } 
                    }
                    this.totalPages=data.page.totalRow
                  }else{
                    this.tableData=[]
                    this.totalPages=0
                  }
              }).catch(error=>{
              })
          },
          // 分页查询
          CurrentChange(e){
            this.currentPage=e
            var result=''
            var results=''
            var resultss=''
            var resultsss=''
            if(this.form.cha==1){
              result=this.form.num
              results=''
              resultss=''
            }else if(this.form.cha==2){
              result=''
              results=this.form.num
              resultss=''
            }else if(this.form.cha==3){
              result=''
              results=''
              resultss=this.form.num
            }else if(this.form.cha==4){
              result=''
              results=''
              resultss=''
              resultsss=this.form.num
            }
            var date1 
            var date2
            if(this.form.date==null){
               date1=null
               date2=null
            }else{
              date1=formatDate(new Date(this.form.date[0]));
              date2=formatDate(new Date(this.form.date[1]));
            }
              commentList(this.form.tai,result,results,resultss,date1,date2,this.form.state,this.form.states,this.form.account,this.form.storeName,resultsss,1,e,10).then(response=>{
                  var data=response
                  if(data.msg==1){
                    this.tableData=data.page.result
                    this.totalPages=data.page.totalRow
                    for(var i=0;i<data.page.result.length;i++){
                     if(data.page.result[i].handInfo!=null ){
                      this.tableData[i].handPhone=data.page.result[i].handInfo.account
                     }
                     if(data.page.result[i].merchant!=null){
                      this.tableData[i].account=data.page.result[i].merchant.account
                     }
                     if(data.page.result[i].store!=null){
                      this.tableData[i].storeName=data.page.result[i].store.name
                     }
                     if(data.page.result[i].handTaskEvaluateImg!=null){
                        this.tableData[i].orderId=data.page.result[i].handTaskEvaluateImg.tradeNo
                      }
                    }
                    this.totalPages=data.page.totalRow
                  }else{
                    this.tableData=[]
                    this.totalPages=0
                  }
                  
              }).catch(error=>{
              })
          },
        }
    }
</script>

<style>
  .ping-text{
    text-align:left;
  }
  .ping-tu{
    color:#1890ff;
  text-align:left;
  }
  .first-box{
    background:#fff;
    padding:20px;
  }
  .table-label{
    color:rgba(0,0,0,0.45);
  }
  .commentForm .el-form-item__content{
    text-align:left;
  }
  .step{
    position: relative;
    margin-bottom:50px;
  }
  .step .step-title{
    font-size:14px;
    position: absolute;
    left:0;
  }
  .hidde-title{
    text-align:left;
    margin-bottom:20px;
  }
  .task-list{
    text-align:left;
  }
  .task-title{
    color:#1890FF;
  }
  .first-box .task-lists{
    text-align:left;
    font-size:14px;
  }
  .task-listss{
    text-align:left;
    color:#F5222D;
  }
  .task-look{
    text-align:left;
    color:#1890FF;
    font-size:12px;
    cursor:pointer;
  }
  .queryBox{
    display:block;
    text-align:left;
  }
  .expandBox{
    width:100%;
    text-align:left;
    line-height:30px;
    overflow:hidden;
  }
  .expandBox .expand-list{
    width:50%;
    float:left;
  }
  .expandBox .expand-label{
    color: #99a9bf;
    width:100px;
    display:inline-block;
  }
  #app .first-box .el-table .table-header{
    background:#f5f7fa;
  }
  .el-table th, .el-table tr.table-header{
    background:#f5f7fa;
  }
  .loading-tips{
    text-align:left;
    font-size:14px;
    line-height:30px;
    overflow:hidden;
  }
  .loading-tips .loading-list{
    width:50%;
    float:left;
  }
  .loading-tips .alert-label{
    margin-right:10px;
  }
  .loading-tipss{
    display:flex;
  }
  .loading-tipss .alert-label{
     display:block;
     width:140px;
  }
  .ups-img{
    width:100px;
    height:100px;
    cursor: pointer;
  }
  .up-imgs{
    width:100px;
    height:160px;
    cursor: pointer;
    margin-right:20px;
  }
  .mask{
    width:100%;
    height:100%;
    position:fixed;
    left:0;
    top:0;
    background:rgba(0,0,0,0.6);
    z-index:3000;
    overflow:auto;
  }
  .bigimg{
    transform: scale(0.5);
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin:auto;
  }
</style>
