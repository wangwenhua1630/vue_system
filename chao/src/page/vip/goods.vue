<template>
  <div class='goods'>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="first-box">
          <p class='break'>刷手管理</p>
          <el-form ref="form" :model="form" class="queryBox" label-width="76px"  size="mini" :inline="true">
            <el-form-item label="刷手等级">
              <el-select v-model="form.state" placeholder="请选择" >
                <el-option :label="item.name" :value="item.id" v-for='item in options' :key='item.id'></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="刷手账号">
              <el-input v-model="form.num" ></el-input>
            </el-form-item>
            <el-form-item label="在线天数">
               <el-date-picker  v-model="form.date" type="daterange"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
           <el-form-item label="刷手状态">
              <el-select v-model="form.status" placeholder="请选择" >
                <el-option label="正常" value="1"></el-option>
                <el-option label="冻结" value="2"></el-option>
                <el-option label="待审核" value="3"></el-option>
                <el-option label="审核失败" value="4"></el-option>
              </el-select>
            </el-form-item>
           <el-form-item label="违规行为">
              <el-select v-model="form.wei" placeholder="请选择" >
                <el-option label="存在" value="1"></el-option>
                <el-option label="不存在" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click='search'>查询</el-button>
            </el-form-item>
             <el-form-item>
              <el-button type="danger" @click='dong(2,1)'>批量冻结</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click='dong(1,1)'>批量解冻</el-button>
            </el-form-item>
          </el-form>
          <el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark"  @selection-change='selection' style="width: 100%"  border  header-row-class-name="table-header">
            <el-table-column type="selection"  width="55" header-align="center">
            </el-table-column>
            <el-table-column prop="handAccount" label="账号"  header-align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column  prop="gradeName" label="等级" header-align="center"  show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="totalNum" label="总单量"  show-overflow-tooltip header-align="center">
            </el-table-column>
             <el-table-column prop="taskNum" label="剩余单量"  show-overflow-tooltip header-align="center">
            </el-table-column>
             <el-table-column prop="moneysTotal" label="可提现佣金数"  show-overflow-tooltip header-align="center">
            </el-table-column>
             <el-table-column prop="moneysCold" label="冻结佣金数"  show-overflow-tooltip header-align="center">
            </el-table-column>
             <el-table-column prop="count" label="在线天数(30天)"  show-overflow-tooltip header-align="center">
            </el-table-column>
             <el-table-column prop="status" label="状态"  show-overflow-tooltip header-align="center">
               <template slot-scope="scope">
                <p v-if='scope.row.status==4'>审核失败</p>
                <p v-if='scope.row.status==3'>审核中</p>
                <p v-if='scope.row.status==2'>冻结中</p>
                <p v-if='scope.row.status==1'>正常</p>
              </template>
            </el-table-column>
            <el-table-column   label="操作"  header-align="center">
              <template slot-scope="scope">
                <el-dropdown @command="handleCommand">
                  <el-button type="primary">
                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command='{type:1,index:scope.$index}'>冻结</el-dropdown-item>
                    <el-dropdown-item :command='{type:2,index:scope.$index}'>解冻</el-dropdown-item>
                    <el-dropdown-item :command='{type:5,index:scope.$index}'>删除</el-dropdown-item>
                    <el-dropdown-item :command='{type:3,index:scope.$index}'>查看资料</el-dropdown-item>
                    <el-dropdown-item :command='{type:4,index:scope.$index}'>编辑私信</el-dropdown-item>
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

    <!--**冻结，解冻刷手**-->
    <el-dialog  title="提示" :visible.sync="dongdialog" width="30%" >
      <p class='hidde-title'>您将冻结/解冻该刷手</p>
      <el-input  type='password' v-model="input" placeholder="请输入操作密码"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type='primary' @click="dongConfirm" size='small' >确定</el-button>
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
    <!--**编辑私信**-->
    <el-dialog  title="私信编辑" :visible.sync="xindialog" width="60%" >
      <p class='hidde-title'>您将发送私信给该刷手</p>
      <el-input  type='text' v-model="title" placeholder="请输入标题"></el-input>
      <div class='uess'>
         <UE id="ueditor" :value="ueditor.value" :config="ueditor.config" ref="ue"></UE>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type='primary' @click="messageConfirm" size='small' >确定</el-button>
        <el-button  @click="xindialog = false" size='small' >取消</el-button>
      </span>
    </el-dialog>
    <!--**查看详情**-->
    <el-dialog  title="查看详情" :visible.sync="newdialog" width="50%" class='taskInfos'>
      <shuaMessage :info="Message"></shuaMessage>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newdialog = false" size='small'>关闭</el-button>
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
   import {manage,grade,cold,messages,handDels} from '../../api/userConller'
   import UE from '../ue/ue.vue';
    export default {
        name: "goods",
        data(){
          return{
            form:{
              num:'',
              state: '',
              status:'',
              wei:'',
              date:''
            },
            ueditor: {
              value: '',
              config: {
                initialFrameWidth: '',
                initialFrameHeight: 220
              }
            },
            Message:'',
            title:'',
            dongType:'',
            tableData:[],
            options:[],
            check:[],
            delinput:'',
            newdialog:false,
            dongdialog:false,
            xindialog:false,
            delsdialog:false,
            show:false,
            duo:'',
            input:'',
            bigsrc:'',
            totalPages:0,
            currentPage:1,
          }
        },
        mounted(){
          grade().then(response=>{
            var data=response
            this.options=data.list
          }).catch(error=>{
          })
          console.log(this.$route.params);
          if(this.$route.params){
            if(this.$route.params.tel){
              var tel=this.$route.params.tel;
            }else{
              var tel=''
            }
          }
          manage('',tel,'','','','',1,10).then(response=>{
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
              this.duo=2
              this.dongType=2
            }else if(command.type==2){
               this.dongdialog=true
               this.duo=2
               this.dongType=1
            }else if(command.type==3){
              this.newdialog=true;
              this.Message=this.tableData[command.index]
            }else if(command.type==4){
              this.xindialog=true;
            }else if(command.type==5){
              this.delsdialog=true;
            }
          },
          // 复选框状态改变
          selection(val) {
            this.check = val;
          },
          addGoods(){
            this.$router.push('/newGoods')
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
            manage(this.form.state,this.form.num,date1,date2,this.form.status,this.form.wei,e,10).then(response=>{
              var data=response
              if(data.msg==1){
                this.tableData=data.page.result
                this.totalPages=data.page.totalRow
              }else if(data.msg==4){
                this.tableData=[]
                this.totalPages=0
              }
            }).catch(error=>{

            })
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
            manage(this.form.state,this.form.num,date1,date2,this.form.status,this.form.wei,this.currentPage,10).then(response=>{
              var data=response
              if(data.msg==1){
                this.tableData=data.page.result
                this.totalPages=data.page.totalRow
              }else if(data.msg==4){
                this.tableData=[]
                this.totalPages=0
              }
            }).catch(error=>{

            })
          },
          // 批量冻结
          dong(dongType,status){
            this.dongType=dongType
            this.duo=status
            if(this.check.length==0){
              this.$message.warning('至少选择一项')
            }else{
              this.dongdialog=true
            }
          },
          dongConfirm(){
            var that=this;
            var idList=[];
            if(this.duo==1){
               for(var i=0;i<this.check.length;i++){
                idList.push(this.check[i].id)
              }
            }else{
              idList.push(this.Ids)
            }
            if(this.input==''){
              this.$message.warning('请填写密码')
            }else{

              cold(idList,this.dongType,this.input).then(response=>{
                var data=response
                this.dongdialog=false
                if(data.msg==1){
                  this.$message.success('操作成功')
                  setTimeout(function(){
                    that.$router.go(0)
                  },500)
                }else if(data.msg==4){
                  this.$message.eroor('密码错误')
                }else if(data.msg==5){
                  this.$message.warning('列表中存在不能操作的对象')
                  setTimeout(function(){
                    that.$router.go(0)
                  },500)
                }
              }).catch(error=>{

              })
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
          // 发送私信
          messageConfirm(){
            if(this.$refs.ue.getUEContent()==''){
              this.$message.warning('请填写内容')
            }else{
              messages(this.Ids,this.$refs.ue.getUEContent(),this.title).then(response=>{
                this.xindialog=false
                var data=response
                if(data.msg==1){
                  this.$message.success('发送成功')
                }
              }).catch(error=>{

              })
            }
          }
        },
        components:{
          shuaMessage,
          UE
        }
    }
</script>

<style>
  .first-box{
    background:#fff;
    padding:20px;
  }
  .uess{
    width:100%;
    margin-top:30px;
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
