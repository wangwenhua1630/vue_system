<template>
  <div class='goods'>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="first-box">
          <p class='break'>刷手信息审核</p>
          <el-form ref="form" :model="form" class="queryBox" label-width="76px"  size="mini" :inline="true">
            <el-form-item label="刷手账号">
              <el-input v-model="form.num" ></el-input>
            </el-form-item>
           <el-form-item label="标注状态">
              <el-select v-model="form.wei" placeholder="请选择" >
                <el-option label="已标注" value="1"></el-option>
                <el-option label="未标注" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="提交时间">
              <el-date-picker v-model="form.date" type="daterange" :default-time="['00:00:00', '23:59:59']" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click='search'>查询</el-button>
            </el-form-item>
             <el-form-item>
              <el-button type="danger" @click='shenHe'>批量通过审核</el-button>
            </el-form-item>
            <el-form-item>
               <el-button type="warning"  size="small" @click="zhuanjie" >任务转介</el-button>
            </el-form-item>
          </el-form>
          <el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark"  @selection-change='selection' style="width: 100%"  border  header-row-class-name="table-header">
            <el-table-column type="selection"  width="55" header-align="center">
            </el-table-column>
            <el-table-column prop="handAccount" label="账号"  header-align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="bankCard" label="银行卡号"  show-overflow-tooltip header-align="center">
            </el-table-column>
             <el-table-column prop="payNums" label="支付宝账号"  show-overflow-tooltip header-align="center">
            </el-table-column>
             <el-table-column prop="accountCreateAt" label="提交时间"  show-overflow-tooltip header-align="center">
            </el-table-column>
             <el-table-column prop="ids" label="标注状态"  show-overflow-tooltip header-align="center" v-if=''>
              <template slot-scope="scope">
                <p v-if='scope.row.sign==1'>已标注</p>
              </template>
            </el-table-column>
            <el-table-column label="刷手信息"  show-overflow-tooltip header-align="center">
              <template slot-scope="scope">
                <p @click='lookMessage(scope.$index)' style='cursor:pointer;'>查看资料</p>
              </template>
            </el-table-column>
            <el-table-column   label="操作"  header-align="center">
              <template slot-scope="scope">
                <el-dropdown @command="handleCommand">
                  <el-button type="primary">
                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command='{type:1,index:scope.$index}'>审核通过</el-dropdown-item>
                    <el-dropdown-item :command='{type:2,index:scope.$index}'>审核失败</el-dropdown-item>
                    <el-dropdown-item :command='{type:4,index:scope.$index}'>删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @current-change="CurrentChange" layout="prev, pager, next" :total="totalPages">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <!--**审核刷手**-->
    <el-dialog  title="审核" :visible.sync="dongdialog" width="30%" >
      <p class='hidde-title'>您将审核该刷手信息</p>
      <el-input  type='text' style="margin-bottom:10px;" v-if="whyStatus" v-model="whys" placeholder="请输入审核失败原因"></el-input>
      <el-input  type='password' v-model="input" placeholder="请输入操作密码"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type='primary' @click="heConfirm" size='small' >确定</el-button>
        <el-button  @click="dongdialog = false" size='small' >取消</el-button>
      </span>
    </el-dialog>
     <!--**删除刷手**-->
    <el-dialog  title="提示" :visible.sync="delsdialog" width="30%" >
      <p class='hidde-title'>您将删除该刷手</p>
      <el-input  type='password' v-model="delinput" placeholder="请输入操作密码"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type='primary' @click="delsConfirm" size='small' >确定</el-button>
        <el-button  @click="delsdialog = false" size='small' >取消</el-button>
      </span>
    </el-dialog>
    <!--**查看详情**-->
    <el-dialog  title="查看详情" :visible.sync="newdialog" width="50%" class='taskInfos'>
      <shuaMessage :info="Message"></shuaMessage>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newdialog = false" size='small'>关闭</el-button>
      </span>
    </el-dialog>
    <!--**任务转介**-->
    <el-dialog title='任务转介' width='30%' :visible.sync="taskdialog" >
      <ul class='touBox'>
        <li class='touList' style='margin-bottom:30px;'><span class='touLabel'>转接职位：</span>上级</li>
        <li class='touList' v-if='jies!=1'><span class='touLabel'>转接人：</span>
        <el-select v-model="jie" placeholder="请选择" class='danInp' size='small' >
          <el-option :label="item.realName" :value="item.id" v-for='item in options' :key='item.id' ></el-option>
        </el-select></li>
        <li v-else>暂无转接人</li>
      </ul>
      <span slot="footer" class="dialog-footer" v-if='jies!=1'>
        <el-button  type='primary' @click="taskZhuan" size='small' >确定</el-button>
        <el-button @click="taskdialog = false" size='small'>取消</el-button>
      </span>
    </el-dialog>
    <!--**图片放大**-->
      <div class="mask" v-show="show" @click="small">
        <img :src="bigsrc" alt="" class="bigimg">
      </div>
  </div>
</template>

<script>
   import shuaMessage from './shuaMessage'
   import {audit,admins,handZhuan,handSuceess} from '../../api/userConller'
    export default {
        name: "goods",
        data(){
          return{
            form:{
              num:'',
              state: '',
              status:'',
              date:'',
              wei:''
            },
            tableData:[],
            Message:'',
            input:'',
            taskdialog:false,
            newdialog:false,
            dongdialog:false,
            delsdialog:false,
            show:false,
            bigsrc:'',
            jies:'',
            jie:'',
            duo:'',
            delinput:'',
            options:[],
            totalPages:0,
            currentPage:1,
            check:[],
            heType:'',
            Ids:'',
            whys:'',
            whyStatus:false
          }
        },
        mounted(){
          admins().then(response=>{
            var data=response
            if(data.msg==3){
              this.jies=1
            }else if(data.msg==1){
              this.options=data.list
            }
          }).catch(error=>{})
          audit('','','','','',1,10).then(response=>{
            var data=response
            if(data.msg==1){
              this.tableData=data.page.result
              this.totalPages=data.page.totalRow
              this.Message=data.page.result[0]
            }else if(data.msg==4){
              this.tableData=[]
              this.totalPages=0
            }
          }).catch(error=>{

          })
        },
        methods:{
           //查看原图
          bigImg(e){
            this.show=true;
            this.bigsrc=e.target.currentSrc;
          },
          //隐藏原图
          small(){
            this.show=false;
          },
          // 操作按钮
          handleCommand(command){
            this.Ids=this.tableData[command.index].id
            if(command.type==1){
              this.dongdialog=true
              this.whyStatus=false
              this.duo=2
              this.heType=1
            }else if(command.type===2){
               this.dongdialog=true
              this.whyStatus=true
               this.duo=2
               this.heType=2
            }else if(command.type===3){
               this.dongdialog=true
              this.whyStatus=false
            }else if(command.type===4){
               this.delsdialog=true
              this.whyStatus=false
            }
          },
          addGoods(){
            this.$router.push('/newGoods')
          },
          // 复选框状态改变
          selection(val) {
            this.check = val;
          },
          // 分页查询
          CurrentChange(e){
            var date1
            var date2
            if(this.form.date==null){
               date1=null
               date2=null
            }else{
              date1=this.form.date[0]
              date2=this.form.date[1]
            }
            this.currentPage=e
            audit('',this.form.num,this.form.wei,date1,date2,e,10).then(response=>{
              var data=response
              if(data.msg==1){
                this.tableData=data.page.result
                this.totalPages=data.page.totalRow
                this.Message=data.page.result[0]
              }else if(data.msg==4){
                this.tableData=[]
                this.totalPages=0
              }
            }).catch(error=>{})
          },
          // 条件搜索
          search(){
            var date1
            var date2
            if(this.form.date==null){
               date1=null
               date2=null
            }else{
              date1=this.form.date[0]
              date2=this.form.date[1]
            }
            audit('',this.form.num,this.form.wei,date1,date2,this.currentPage,10).then(response=>{
              var data=response
              if(data.msg==1){
                this.tableData=data.page.result
                this.totalPages=data.page.totalRow
                this.Message=data.page.result[0]
              }else if(data.msg==4){
                this.tableData=[]
                this.totalPages=0
              }
            }).catch(error=>{})
          },
          // 批量审核
          shenHe(){
            this.heType=1
            this.duo=1
            if(this.check==''){
              this.$message.warning('请至少选择一条数据')
            }else{
              this.dongdialog=true
            }
          },
          // 删除刷手
          delsConfirm(){
            var that=this;
            if(this.delinput==''){
              this.$message.warning('请输入操作密码')
            }else{
              handDels(this.Ids,this.delinput).then(response=>{
                var data=response
                this.delsdialog=false
                if(data.msg==1){
                  this.$message.success('删除成功')
                  setTimeout(function(){
                    that.$router.go(0)
                  },500)
                }else if(data.msg==4){
                   this.$message.error('密码错误')
                }
              }).catch(error=>{})
            }
          },
          heConfirm(){
            var that=this;
            if(this.input==''){
              this.$message.warning('请填写操作密码')
            }else if(this.whys==''&&this.heType==2){
              this.$message.warning('请填写审核失败原因')
            }
            else{
              var idList=[];
              if(this.duo==1){
                 for(var i=0;i<this.check.length;i++){
                  idList.push(this.check[i].id)
                }
              }else{
                idList.push(this.Ids)
              }
              handSuceess(idList,this.heType,this.input,this.whys).then(response=>{
                this.dongdialog=false
                this.whys=''
                this.whyStatus=''
                var data=response
                if(data.msg==4){
                  this.$message.error('密码错误')
                }else if(data.msg==1){
                  this.$message.success('操作成功')
                  setTimeout(function(){
                    that.$router.go(0)
                  },800)
                }
              }).catch(error=>{

              })
            }
          },
          // 任务转介
          zhuanjie(){
            if(this.check==''){
              this.$message.warning('请至少选择一条数据')
            }else{
              this.taskdialog=true
            }
          },
          taskZhuan(){
            var idList=[];
            var that=this;
            for(var i=0;i<this.check.length;i++){
              idList.push(this.check[i].id)
            }
            handZhuan(idList,this.jie).then(response=>{
              this.taskdialog=false
              var data=response
              if(data.msg==1){
                this.$message.success('操作成功')
                setTimeout(function(){
                  that.$router.go(0)
                },500)
              }
            }).catch(error=>{

            })
          },
          // 查看资料
          lookMessage(index){
            this.newdialog=true
            this.Message=this.tableData[index]
          }
        },
        components:{
          shuaMessage
        }
    }
</script>

<style>
  .first-box{
    background:#fff;
    padding:20px;
  }
  .hidde-title{
    text-align:left;
    margin-bottom:20px;
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
  .queryBox{
    display:block;
    text-align:left;
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
  }
  .loading-tips .alert-label{
    margin-right:10px;
  }
  .loading-tipss{
    display:flex;
  }
  .loading-tipss .alert-label{
     display:block;
  }
  .ups-img{
    width:100px;
    height:100px;
    cursor: pointer;
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
    width:30%;
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin:auto;
  }
  .loading-tips{
    text-align:left;
    font-size:14px;
    line-height:30px;
    overflow:hidden;
  }
  .loading-ge{
    border-bottom:1px solid rgba(0,0,0,0.09);
    padding:10px 0;
  }
  .loading-tips .loading-list{
    width:50%;
    float:left;
    color:rgba(0,0,0,0.45);
  }
  .loading-tips .alert-label{
    margin-right:10px;
    color:#000;
  }
  .loading-tipss{
    display:flex;
  }
  .loading-tipss .alert-label{
     display:block;
  }
  .taskInfos .el-dialog__header{
    border:1px solid rgba(0,0,0,0.09);
  }
  .taskInfos .loading-ge .up-imgs{
    width:160px;
    height:100px;
    cursor: pointer;
    margin-right:20px;
  }
  .taskInfos .tipBox{
    display:flex;
    width:75%;
    flex-wrap:wrap;
  }
  .taskInfos .loading-ge .tipBox .up-imgs{
    margin-bottom:20px;
  }
  .goods .el-dialog{
    position:static;
  }
</style>
