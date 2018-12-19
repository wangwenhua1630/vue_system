<template>
  <div class='accounts'>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="first-box">
          <p class='break'>多账号管理</p>
          <el-form ref="form" :model="form" class="queryBox" label-width="76px"  size="mini" :inline="true">
            <el-form-item label="所属平台">
              <el-select v-model="form.tai" placeholder="所属平台">
                <el-option :label="item.name" :value="item.id" v-for="(item,index) in tai" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="刷手账号">
              <el-input v-model="form.num" ></el-input>
            </el-form-item>
            <el-form-item label="审核状态">
              <el-select v-model="form.wei" placeholder="请选择" >
                <el-option label="审核中" value="1"></el-option>
                <el-option label="审核完成" value="2"></el-option>
                <el-option label="审核失败" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="提交时间">
              <el-date-picker v-model="form.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click='search'>查询</el-button>
            </el-form-item>
          </el-form>
          <el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark"  style="width: 100%"  border  header-row-class-name="table-header">
            <el-table-column label="账号"  header-align="center" show-overflow-tooltip>
              <template slot-scope="scope" v-if="scope.row.handInfo">
                <p>{{scope.row.handInfo.account}}</p>
              </template>
            </el-table-column>
            <el-table-column label="所属平台"  header-align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <p v-if="scope.row.accountType==1">淘宝</p>
                <p v-if="scope.row.accountType==2">京东</p>
                <p v-if="scope.row.accountType==3">拼多多</p>
              </template>
            </el-table-column>
            <el-table-column prop="taoAccount" label="账号名称"  show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column prop="createAt" label="提交时间"  show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column label="审核状态"  show-overflow-tooltip header-align="center" v-if=''>
              <template slot-scope="scope">
                <p v-if='scope.row.status==1'>审核中</p>
                <p v-if='scope.row.status==2'>审核完成</p>
                <p v-if='scope.row.status==3'>审核失败</p>
              </template>
            </el-table-column>
            <el-table-column label="刷手信息"  show-overflow-tooltip header-align="center">
              <template slot-scope="scope">
                <p @click='lookMessage(scope.row.id)' style='cursor:pointer;'>查看资料</p>
              </template>
            </el-table-column>
            <el-table-column   label="操作"  header-align="center">
              <template slot-scope="scope">
                <el-dropdown @command="handleCommand" v-if="scope.row.status==1">
                  <el-button type="primary">
                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command='{type:2,id:scope.row.id,index:scope.$index}'>审核通过</el-dropdown-item>
                    <el-dropdown-item :command='{type:3,id:scope.row.id,index:scope.$index}'>审核失败</el-dropdown-item>
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
    <!--**查看详情**-->
    <el-dialog  title="查看详情" :visible.sync="newdialog" width="50%" class='taskInfos'>
      <accountMessage :message="info"></accountMessage>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newdialog = false" size='small'>关闭</el-button>
      </span>
    </el-dialog>
    <!--**图片放大**-->
    <!--<div class="mask" v-show="show" @click="small">-->
      <!--<img :src="bigsrc" alt="" class="bigimg">-->
    <!--</div>-->
  </div>
</template>

<script>
  import accountMessage from './accountMessage'
  import {formatDate} from '../../api/api'
  import {accounts,accountsShen,accountsCha} from '../../api/userConller'
  export default {
    name: "goods",
    data(){
      return{
        tai:'',
        form:{
          tai:'',
          num:'',
          date:'',
          wei:''
        },
        tableData:[],
        input:'',
        newdialog:false,
        dongdialog:false,
        show:false,
        bigsrc:'',
        totalPages:0,
        currentPage:1,
        shen:'',
        ids:'',
        index:'',
        info:'',
        whys:'',
        whyStatus:false
      }
    },
    mounted(){
      accounts(1,10,'','','','','').then(response=>{
        var data=response
        console.log(data);
        if(data.msg==1){
          this.tai=data.types;
          this.tableData=data.page.result
          this.totalPages=data.page.totalRow
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
         this.dongdialog=true
         this.shen=command.type;
         this.ids=command.id;
         this.index=command.index;
         if(command.type==3){
           this.whyStatus=true;
         }else if(command.type==2){
           this.whyStatus=false;
         }
        console.log(command);
      },
      // 分页查询
      CurrentChange(e){
        var date1
        var date2
        if(this.form.date==null){
          date1=null
          date2=null
        }else{
          date1=formatDate(new Date(this.form.date[0]));
          date2=formatDate(new Date(this.form.date[1]));
        }
        this.currentPage=e
        accounts(e,10,this.form.wei,this.form.tai,this.form.num,date1,date2).then(response=>{
          var data=response
          if(data.msg==1){
            console.log(data.page.result);
            this.tableData=data.page.result
            console.log(this.tableData);
            this.totalPages=data.page.totalRow
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
          date1=formatDate(new Date(this.form.date[0]));
          date2=formatDate(new Date(this.form.date[1]));
        }
        accounts(1,10,this.form.wei,this.form.tai,this.form.num,date1,date2).then(response=>{
          var data=response
          if(data.msg==1){
            this.tableData=data.page.result
            this.totalPages=data.page.totalRow
          }else if(data.msg==4){
            this.tableData=[]
            this.totalPages=0
          }
        }).catch(error=>{})
      },
      heConfirm(){
        var that=this;
        if(this.input==''){
          this.$message.warning('请填写操作密码')
        }else if(this.whys==''&&this.shen==3){
          this.$message.warning('请填写审核失败原因')
        }
        else{
          accountsShen(this.ids,this.shen,this.input,this.whys).then(response=>{
            this.dongdialog=false
            this.whys=''
            this.whyStatus=false;
            var data=response
            if(data.msg==4){
              this.$message.error('密码错误')
            }else if(data.msg==1){
              this.$message.success('操作成功')
              this.tableData.splice(this.index,1);
              this.totalPages-=1;
            }
          }).catch(error=>{

          })
        }
      },
      // 查看资料
      lookMessage(id){
        accountsCha(id).then(response=>{
          const data=response;
          console.log(data);
          if(data.msg==1){
            this.info=data.detail
            this.newdialog=true;
          }
        }).catch()
        // this.newdialog=true;
        // this.ids=id;
      }
    },
    components:{
      accountMessage
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
