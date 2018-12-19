<template>
  <div class='goods'>
    <el-row class="contain row-bg" type="flex"  justify="center">
      <el-col>
        <div class="first-box">
          <p class='break'>商家管理</p>
          <el-form ref="form" :model="form" class="queryBox" label-width="80px"  size="mini" :inline="true">
            <el-form-item label="商家账号">
              <el-input v-model="form.num" ></el-input>
            </el-form-item>
           <el-form-item label="标注状态">
              <el-select v-model="form.wei" placeholder="请选择" >
                <el-option label="已标注" value="1"></el-option>
                <el-option label="未标注" value="2"></el-option>
              </el-select>
            </el-form-item>
           <el-form-item label="注册时间">
              <el-date-picker  v-model="form.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click='search'>查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click='tonghe'>批量通过审核</el-button>
            </el-form-item>
            <el-form-item>
               <el-button type="warning"  size="small" @click="zhuanjie" >任务转介</el-button>
            </el-form-item>
          </el-form>
          <el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark"  style="width: 100%" @selection-change='selection' border  header-row-class-name="table-header">
            <el-table-column type="selection"  width="55" header-align="center">
            </el-table-column>
            <el-table-column prop="account" label="账号"  header-align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column  prop="name" label="店铺资料" header-align="center"  show-overflow-tooltip>
              <template slot-scope="scope">
                <p @click="storesLook(scope.row.id)" style='cursor:pointer;color:#1890FF' >查看</p>
              </template>
            </el-table-column>
            <el-table-column prop="ids" label="商家资料"  show-overflow-tooltip header-align="center">
              <template slot-scope="scope">
                <p @click="businessLook(scope.row.id)" style='cursor:pointer;color:#1890FF' >查看</p>
              </template>
            </el-table-column>
             <el-table-column prop="createAt" label="提交时间"  show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column prop="sign" label="标注"  show-overflow-tooltip header-align="center">
              <template slot-scope="scope">
                <p v-if='scope.row.sign==1'>已标注</p>
                <p v-else>未标注</p>
              </template>
            </el-table-column>
            <el-table-column   label="操作"  header-align="center" width='250'>
              <template slot-scope="scope">
                <el-button type="primary" plain round size="mini" @click="dongdialog = true,heTypes=1,duo=1,Ids=scope.row.id">通过</el-button>
                <el-button type="danger" plain round size="mini" @click="dongdialog = true,heTypes=2,duo=1,Ids=scope.row.id">不通过</el-button>
                <el-button type="danger" plain round size="mini" @click="delsdialog = true,delIds=scope.row.userId">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @current-change="CurrentChange" layout="prev, pager, next" :total="totalPages">
          </el-pagination>
        </div>
      </el-col>
    </el-row>

    <!--**通过商家**-->
    <el-dialog  title="提示" :visible.sync="dongdialog" width="30%" >
      <p class='hidde-title'>确认商家资料，店铺资料没有问题了吗？</p>
      <el-input  type='text' v-model="pass" placeholder="请输入不通过原因" class='he' v-if='heTypes==2' ></el-input>
      <el-input  type='password' v-model="input" placeholder="请输入操作密码"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type='primary' @click="confirm" size='small' >确定</el-button>
        <el-button  @click="dongdialog = false" size='small' >取消</el-button>
      </span>
    </el-dialog>
    <!--**任务转介**-->
    <el-dialog title='任务转介' width='30%' :visible.sync="taskdialog" >
      <ul class='touBox'>
        <li class='touList'><span class='touLabel'>转接职位：</span>上级</li>
        <li class='touList' v-if='jies!=1'><span class='touLabel'>转接人：</span>
        <el-select v-model="jie" placeholder="请选择" class='danInp' size='small' >
          <el-option :label="item.realName" :value="item.id" v-for='item in options' :key='item.id' ></el-option>
        </el-select></li>
        <li v-else>暂无转接人</li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button  type='primary' @click="taskZhuan" size='small' >确定</el-button>
        <el-button @click="taskdialog = false" size='small'>取消</el-button>
      </span>
    </el-dialog>
    <!--**删除商家**-->
    <el-dialog  title="提示" :visible.sync="delsdialog" width="30%" >
      <p class='hidde-title'>您将删除该商家</p>
      <el-input  type='password' v-model="delinput" placeholder="请输入操作密码"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type='primary' @click="delsConfirm" size='small' >确定</el-button>
        <el-button  @click="delsdialog = false" size='small' >取消</el-button>
      </span>
    </el-dialog>
    <!--**查看商家详情**-->
    <el-dialog  title="商家资料" :visible.sync="newdialog" width="50%" class='taskInfos'>
      <storeMessage :info='businessMessage'></storeMessage>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newdialog = false" size='small'>关闭</el-button>
      </span>
    </el-dialog>
    <!-- **查看店铺资料** -->
    <el-dialog  title="店铺详情" :visible.sync="diandialog" width="50%" class='taskInfos'>
      <newStore :info='storeMessage'></newStore>
      <span slot="footer" class="dialog-footer">
        <el-button @click="diandialog = false" size='small'>关闭</el-button>
      </span>
    </el-dialog>
    <!--**图片放大**-->
      <div class="mask" v-show="show" @click="small">
        <img :src="bigsrc" alt="" class="bigimg">
      </div>
  </div>
</template>

<script>
   import storeMessage from './storeMessage'
   import newStore from './newStore'
   import {businessInfomerchant,businessHe,businessInfo,businessadmins,businessZhuan} from '../../api/userConller'
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
            jies:'',
            jie:'',
            options:[],
            tableData:[],
            region:'',
            input:'',
            pass:'',
            heTypes:'',
            taskdialog:false,
            newdialog:false,
            dongdialog:false,
            show:false,
            diandialog:false,
            delsdialog:false,
            delinput:'',
            bigsrc:'',
            delIds:'',
            totalPages:0,
            currentPage:1,
            check:[],
            duo:'',
            Ids:'',
            businessMessage:'',
            storeMessage:'',
          }
        },
        mounted(){
          businessadmins().then(response=>{
            var data=response
            if(data.msg==3){
              this.jies=1
            }else if(data.msg==1){
              this.options=data.list
            }
          }).catch(error=>{})
          businessInfomerchant('','','','',1,10).then(response=>{
            var data=response
            var data=response
            if(data.msg==1){
              this.tableData=data.page.result
              this.totalPages=data.page.totalRow
            }else if(data.msg==3){
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
          // 复选框状态改变
          selection(val) {
            this.check = val;
          },
          // 分页查询
          CurrentChange(e){
            this.currentPage=e
            var date1 
            var date2
            if(this.form.date==null){
               date1=null
               date2=null
            }else{
              date1=this.form.date[0]
              date2=this.form.date[1]
            }
            businessInfomerchant(this.form.num,this.form.wei,date1,date2,e,10).then(response=>{
              var data=response
              var data=response
              if(data.msg==1){
                this.tableData=data.page.result
                this.totalPages=data.page.totalRow
              }else if(data.msg==3){
                this.tableData=[]
                this.totalPages=0
              }
            }).catch(error=>{

            })
          },
          // 条件查询
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
            businessInfomerchant(this.form.num,this.form.wei,date1,date2,this.currentPage,10).then(response=>{
              var data=response
              var data=response
              if(data.msg==1){
                this.tableData=data.page.result
                this.totalPages=data.page.totalRow
              }else if(data.msg==3){
                this.tableData=[]
                this.totalPages=0
              }
            }).catch(error=>{

            })
          },
           // 删除商家
          delsConfirm(){
            var that=this;
            if(this.delinput==''){
              this.$message.warning('请输入操作密码')
            }else{
              businessDels(this.delIds,this.delinput).then(response=>{
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
          // 批量审核
          tonghe(){
            this.duo=2
            this.heTypes=1
            if(this.check==''){
              this.$message.warning('请至少选择一条数据')
            }else{
              this.dongdialog=true
            }
          },
          // 审核商家
          confirm(){
            this.dongdialog=false;
            var that=this;
            console.log(this.heTypes)
            // 1 通过 2不通过 刷新表格
            var idList=[];
            if(this.duo==1){
               idList.push(this.Ids)
            }else{
              for(var i=0;i<this.check.length;i++){
                idList.push(this.check[i].id)
              }
            }
            if(this.input==''){
              this.$message.warning('请输入操作密码')
            }else{
              businessHe(idList,this.heTypes,this.input,this.pass).then(response=>{
                var data=response
                if(data.msg==1){
                  this.$message.success('操作成功')
                  setTimeout(function(){
                    that.$router.go(0)
                  },500)
                }else if(data.msg==3){
                  this.$message.error('操作密码错误')
                }
              }).catch(error=>{})
            }
          },
          // 店铺资料
          storesLook(id){
            businessInfo(id,2).then(response=>{
              this.diandialog=true;
              var data=response
              this.storeMessage=data.stores
            }).catch(error=>{})
          },
          // 商家资料
          businessLook(id){
            businessInfo(id,2).then(response=>{
               this.newdialog=true;
              var data=response
              this.businessMessage=data
            }).catch(error=>{})
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
            businessZhuan(idList,this.jie).then(response=>{
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
        },
        components:{
          storeMessage,
          newStore
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
  .selects{
    width:100%;
    margin-bottom:20px;
  }
  .store_list{
    text-align:left;
    color:#1890FF;
    font-size:12px;
    margin-bottom:6px;
    cursor:pointer;
  }
  .he{
    margin-bottom:20px;
  }
</style>
